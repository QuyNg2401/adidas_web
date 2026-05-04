import { useCallback, useEffect, useState } from 'react'
import { Footer } from '../../components/layout/Footer'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { useCart } from '../../contexts/useCart'
import { api } from '../../lib/api'
import { formatUsdFromCents } from '../../lib/money'
import { ADMIN_FOOTER, ADMIN_NAV_LINKS } from './adminData'
import { validateHttpUrl } from '../../lib/validation'

const ORDER_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']

export function AdminPage() {
  const { cartCount } = useCart()
  const [tab, setTab] = useState('overview')
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [inventoryQuery, setInventoryQuery] = useState('')

  const [catForm, setCatForm] = useState({ slug: '', name: '' })
  const [editCat, setEditCat] = useState({ id: '', slug: '', name: '' })
  const [patchProd, setPatchProd] = useState({ id: '', priceUsd: '' })
  const [prodForm, setProdForm] = useState({
    slug: '',
    name: '',
    meta: '',
    priceUsd: '',
    imageUrl: '',
    imageAlt: '',
    categoryId: '',
  })

  const fetchAdminPayload = useCallback(async () => {
    const [st, cats, prods, ords] = await Promise.all([
      api.admin.stats(),
      api.admin.categories(),
      api.admin.products(),
      api.admin.orders(),
    ])
    return {
      stats: st.stats ?? null,
      categories: cats.items ?? [],
      products: prods.items ?? [],
      orders: ords.items ?? [],
    }
  }, [])

  const refresh = useCallback(async () => {
    try {
      setError('')
      const data = await fetchAdminPayload()
      setStats(data.stats)
      setCategories(data.categories)
      setProducts(data.products)
      setOrders(data.orders)
    } catch (e) {
      setError(e.message ?? 'Không tải được dữ liệu admin')
    }
  }, [fetchAdminPayload])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await fetchAdminPayload()
        if (cancelled) return
        setError('')
        setStats(data.stats)
        setCategories(data.categories)
        setProducts(data.products)
        setOrders(data.orders)
      } catch (e) {
        if (!cancelled) setError(e.message ?? 'Không tải được dữ liệu admin')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [fetchAdminPayload])

  async function onCreateCategory(e) {
    e.preventDefault()
    setError('')
    const slug = catForm.slug.trim()
    const name = catForm.name.trim()
    if (!slug || !name) {
      setError('Slug và tên danh mục không được để trống.')
      return
    }
    try {
      await api.admin.createCategory({
        slug,
        name,
      })
      setCatForm({ slug: '', name: '' })
      await refresh()
    } catch (e) {
      setError(e.message ?? 'Tạo danh mục thất bại')
    }
  }

  async function onUpdateCategory(e) {
    e.preventDefault()
    setError('')
    const idTrim = editCat.id.trim()
    const slug = editCat.slug.trim()
    const name = editCat.name.trim()
    const catId = Number(idTrim)
    if (!idTrim || !Number.isFinite(catId) || catId <= 0) {
      setError('ID danh mục không hợp lệ.')
      return
    }
    if (!slug || !name) {
      setError('Slug và tên danh mục không được để trống.')
      return
    }
    try {
      await api.admin.updateCategory(idTrim, {
        slug,
        name,
      })
      setEditCat({ id: '', slug: '', name: '' })
      await refresh()
    } catch (e) {
      setError(e.message ?? 'Cập nhật danh mục thất bại')
    }
  }

  async function onPatchProductPrice(e) {
    e.preventDefault()
    setError('')
    const idTrim = patchProd.id.trim()
    const priceTrim = patchProd.priceUsd.trim()
    if (!idTrim || !priceTrim) {
      setError('ID sản phẩm và giá mới không được để trống.')
      return
    }
    const id = Number(idTrim)
    const dollars = Number(priceTrim)
    if (!Number.isFinite(id) || id <= 0) {
      setError('Product ID không hợp lệ')
      return
    }
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setError('Giá USD không hợp lệ')
      return
    }
    try {
      await api.admin.updateProduct(id, { priceCents: Math.round(dollars * 100) })
      setPatchProd({ id: '', priceUsd: '' })
      await refresh()
    } catch (e) {
      setError(e.message ?? 'Cập nhật giá thất bại')
    }
  }

  async function onDeleteCategory(id) {
    if (!confirm('Xóa danh mục này?')) return
    setError('')
    try {
      await api.admin.deleteCategory(id)
      await refresh()
    } catch (e) {
      setError(e.message ?? 'Xóa danh mục thất bại')
    }
  }

  async function onCreateProduct(e) {
    e.preventDefault()
    setError('')
    const slug = prodForm.slug.trim()
    const name = prodForm.name.trim()
    const meta = prodForm.meta.trim()
    const imageUrl = prodForm.imageUrl.trim()
    const imageAlt = prodForm.imageAlt.trim()
    const priceRaw = prodForm.priceUsd.trim()
    if (!slug || !name || !meta || !imageUrl || !imageAlt || !priceRaw) {
      setError(
        'Slug, tên, meta, URL ảnh, alt ảnh và giá không được để trống.'
      )
      return
    }
    const urlErr = validateHttpUrl(imageUrl)
    if (urlErr) {
      setError(urlErr)
      return
    }
    const dollars = Number(priceRaw)
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setError('Giá USD không hợp lệ')
      return
    }
    const priceCents = Math.round(dollars * 100)
    const categoryIdRaw = prodForm.categoryId.trim()
    try {
      await api.admin.createProduct({
        slug,
        name,
        meta,
        priceCents,
        imageUrl,
        imageAlt,
        categoryId: categoryIdRaw ? Number(categoryIdRaw) : null,
      })
      setProdForm({
        slug: '',
        name: '',
        meta: '',
        priceUsd: '',
        imageUrl: '',
        imageAlt: '',
        categoryId: '',
      })
      await refresh()
    } catch (e) {
      setError(e.message ?? 'Tạo sản phẩm thất bại')
    }
  }

  async function onDeleteProduct(id) {
    if (!confirm('Xóa sản phẩm này?')) return
    setError('')
    try {
      await api.admin.deleteProduct(id)
      await refresh()
    } catch (e) {
      setError(e.message ?? 'Xóa sản phẩm thất bại')
    }
  }

  async function onOrderStatus(id, status) {
    setError('')
    try {
      await api.admin.updateOrderStatus(id, status)
      await refresh()
    } catch (e) {
      setError(e.message ?? 'Cập nhật đơn thất bại')
    }
  }

  const tabBtn = (id, label) => (
    <button
      key={id}
      type="button"
      onClick={() => setTab(id)}
      className={`px-md py-sm text-label-bold uppercase border-2 border-black ${
        tab === id ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'
      }`}
    >
      {label}
    </button>
  )

  const filteredProducts = products.filter((p) => {
    const q = inventoryQuery.trim().toLowerCase()
    if (!q) return true
    return (
      String(p.name ?? '').toLowerCase().includes(q) ||
      String(p.slug ?? '').toLowerCase().includes(q) ||
      String(p.categorySlug ?? '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="bg-background text-on-background font-sans text-body-md antialiased min-h-screen">
      <TopAppBar links={ADMIN_NAV_LINKS} cartCount={cartCount} />

      <main className="max-w-[1440px] mx-auto px-margin py-xl space-y-xl">
        <header className="border-b-2 border-black pb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <p className="text-label-bold uppercase text-secondary mb-xs">Administration</p>
            <h1 className="text-display uppercase">System overview</h1>
            <div className="flex flex-wrap gap-sm mt-lg">{tabBtn('overview', 'Overview')}</div>
            <div className="flex flex-wrap gap-sm mt-sm">
              {tabBtn('categories', 'Categories')}
              {tabBtn('products', 'Products')}
              {tabBtn('orders', 'Orders')}
            </div>
          </div>
          <div className="flex gap-base">
            <button
              type="button"
              className="bg-black text-white px-lg py-md text-label-bold uppercase hover:bg-zinc-800 transition-colors"
            >
              Generate report
            </button>
            <button
              type="button"
              className="bg-white border-2 border-black text-black px-lg py-md text-label-bold uppercase hover:bg-black hover:text-white transition-colors"
            >
              Export CSV
            </button>
          </div>
        </header>

        {error ? (
          <div role="alert" className="border-2 border-black bg-white p-md text-red-800">
            {error}
          </div>
        ) : null}

        {tab === 'overview' ? (
          stats ? (
            <section className="space-y-xl">
              <div className="grid grid-cols-12 gap-gutter">
                <div className="col-span-12 md:col-span-3 border-2 border-black p-lg bg-white">
                  <div className="flex justify-between items-start mb-md">
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <span className="text-label-bold text-green-600">—</span>
                  </div>
                  <p className="text-label-bold text-secondary uppercase mb-xs">Total revenue</p>
                  <p className="text-headline-md">{formatUsdFromCents(stats.revenueCents)}</p>
                </div>

                <div className="col-span-12 md:col-span-3 border-2 border-black p-lg bg-white">
                  <div className="flex justify-between items-start mb-md">
                    <span className="material-symbols-outlined text-primary">shopping_bag</span>
                    <span className="text-label-bold text-green-600">—</span>
                  </div>
                  <p className="text-label-bold text-secondary uppercase mb-xs">Total orders</p>
                  <p className="text-headline-md">{String(stats.ordersTotal)}</p>
                </div>

                <div className="col-span-12 md:col-span-3 border-2 border-black p-lg bg-white">
                  <div className="flex justify-between items-start mb-md">
                    <span className="material-symbols-outlined text-primary">hourglass_empty</span>
                    <span className="text-label-bold text-primary">—</span>
                  </div>
                  <p className="text-label-bold text-secondary uppercase mb-xs">Pending orders</p>
                  <p className="text-headline-md">{String(stats.ordersPending)}</p>
                </div>

                <div className="col-span-12 md:col-span-3 border-2 border-black p-lg bg-white">
                  <div className="flex justify-between items-start mb-md">
                    <span className="material-symbols-outlined text-primary">inventory_2</span>
                    <span className="text-label-bold text-primary">—</span>
                  </div>
                  <p className="text-label-bold text-secondary uppercase mb-xs">Products</p>
                  <p className="text-headline-md">{String(stats.productsTotal)}</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-gutter">
                <div className="col-span-12 lg:col-span-8 border-2 border-black bg-white p-lg relative overflow-hidden">
                  <div className="flex justify-between items-center mb-xl gap-md">
                    <h2 className="text-headline-sm uppercase">Revenue performance</h2>
                    <div className="flex gap-base">
                      <span className="text-label-bold bg-black text-white px-md py-xs uppercase">
                        Weekly
                      </span>
                      <span className="text-label-bold bg-surface-container px-md py-xs uppercase">
                        Monthly
                      </span>
                    </div>
                  </div>

                  <div className="h-[300px] w-full flex items-end gap-base border-b border-l border-black p-md">
                    <div
                      className="w-full bg-black h-[40%]"
                      style={{
                        clipPath:
                          'polygon(0 80%, 20% 60%, 40% 70%, 60% 30%, 80% 40%, 100% 10%, 100% 100%, 0% 100%)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-md text-label-bold uppercase">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
                  <div className="border-2 border-black bg-black text-white p-lg">
                    <h3 className="text-headline-sm uppercase mb-md">Quick totals</h3>
                    <div className="space-y-md">
                      <div className="border border-zinc-700 p-md">
                        <p className="text-label-bold text-zinc-400 mb-xs uppercase">Categories</p>
                        <p className="text-body-md">{String(stats.categoriesTotal)}</p>
                      </div>
                      <div className="border border-zinc-700 p-md">
                        <p className="text-label-bold text-zinc-400 mb-xs uppercase">Customers</p>
                        <p className="text-body-md">—</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 border-2 border-black bg-white">
                  <div className="px-lg py-lg border-b-2 border-black flex flex-col md:flex-row justify-between items-center bg-white gap-md">
                    <h2 className="text-headline-sm uppercase">Inventory management</h2>
                    <div className="relative w-full md:w-96">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-secondary">
                        search
                      </span>
                      <input
                        value={inventoryQuery}
                        onChange={(e) => setInventoryQuery(e.target.value)}
                        className="w-full pl-xl pr-md py-md border-2 border-black focus:ring-0 focus:border-black text-label-bold uppercase bg-white"
                        placeholder="Search products..."
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-body-sm">
                      <thead className="bg-surface-container border-b-2 border-black">
                        <tr>
                          <th className="px-lg py-md text-label-bold uppercase">Product</th>
                          <th className="px-lg py-md text-label-bold uppercase">Category</th>
                          <th className="px-lg py-md text-label-bold uppercase">Price</th>
                          <th className="px-lg py-md text-label-bold uppercase text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10">
                        {filteredProducts.slice(0, 6).map((p) => (
                          <tr key={p.id}>
                            <td className="px-lg py-lg">
                              <div className="flex items-center gap-md">
                                <div className="w-12 h-12 bg-surface-container flex-shrink-0 overflow-hidden border border-black">
                                  {p.imageUrl ? (
                                    <img
                                      className="w-full h-full object-cover"
                                      alt={p.imageAlt ?? p.name}
                                      src={p.imageUrl}
                                      loading="lazy"
                                    />
                                  ) : null}
                                </div>
                                <span className="text-label-bold uppercase">{p.name}</span>
                              </div>
                            </td>
                            <td className="px-lg py-lg uppercase text-secondary">
                              {p.categorySlug ?? '—'}
                            </td>
                            <td className="px-lg py-lg">{formatUsdFromCents(p.priceCents)}</td>
                            <td className="px-lg py-lg text-right">
                              <button
                                type="button"
                                className="material-symbols-outlined hover:text-primary transition-colors"
                                aria-label="Edit"
                                title="Edit"
                                onClick={() => setTab('products')}
                              >
                                edit
                              </button>
                            </td>
                          </tr>
                        ))}
                        {!filteredProducts.length ? (
                          <tr>
                            <td className="px-lg py-lg text-secondary" colSpan={4}>
                              Không có sản phẩm phù hợp.
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-6 border-2 border-black bg-white p-lg">
                  <h2 className="text-headline-sm uppercase mb-xl">Recent orders</h2>
                  <div className="space-y-md">
                    {orders.slice(0, 3).map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center justify-between border-b border-black/10 pb-md"
                      >
                        <div>
                          <p className="text-label-bold uppercase">Order #{o.id}</p>
                          <p className="text-body-sm text-secondary">
                            {o.userEmail} • Total {formatUsdFromCents(o.totalCents)}
                          </p>
                        </div>
                        <span className="px-md py-xs bg-surface-container text-label-bold text-[10px] uppercase">
                          {o.status}
                        </span>
                      </div>
                    ))}
                    {!orders.length ? (
                      <p className="text-secondary text-body-sm">Chưa có đơn hàng.</p>
                    ) : null}
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-6 border-2 border-black bg-surface-container p-lg">
                  <h2 className="text-headline-sm uppercase mb-xl">System logs</h2>
                  <div className="space-y-md">
                    <div className="flex gap-md">
                      <div className="w-1 bg-black self-stretch" />
                      <div>
                        <p className="text-body-sm">
                          Đồng bộ dữ liệu sản phẩm hoàn tất.
                        </p>
                        <p className="text-label-md text-secondary uppercase mt-xs">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-md">
                      <div className="w-1 bg-black self-stretch" />
                      <div>
                        <p className="text-body-sm">
                          Cập nhật trạng thái đơn hàng được ghi nhận.
                        </p>
                        <p className="text-label-md text-secondary uppercase mt-xs">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-md">
                      <div className="w-1 bg-black self-stretch" />
                      <div>
                        <p className="text-body-sm">
                          Phiên admin đang hoạt động bình thường.
                        </p>
                        <p className="text-label-md text-secondary uppercase mt-xs">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <p className="text-secondary uppercase text-label-bold">Đang tải thống kê…</p>
          )
        ) : null}

        {tab === 'categories' ? (
          <section className="space-y-lg">
            <form
              onSubmit={onCreateCategory}
              className="grid grid-cols-1 md:grid-cols-12 gap-md border-2 border-black p-lg bg-surface-container-low"
            >
              <p className="md:col-span-12 text-label-bold uppercase">Thêm danh mục</p>
              <input
                className="md:col-span-5 border-2 border-black px-md py-sm bg-white"
                placeholder="slug"
                value={catForm.slug}
                onChange={(e) => setCatForm((s) => ({ ...s, slug: e.target.value }))}
              />
              <input
                className="md:col-span-5 border-2 border-black px-md py-sm bg-white"
                placeholder="name"
                value={catForm.name}
                onChange={(e) => setCatForm((s) => ({ ...s, name: e.target.value }))}
              />
              <button
                type="submit"
                className="md:col-span-2 bg-black text-white uppercase text-label-bold py-sm"
              >
                Create
              </button>
            </form>

            <form
              onSubmit={onUpdateCategory}
              className="grid grid-cols-1 md:grid-cols-12 gap-md border-2 border-black p-lg bg-white"
            >
              <p className="md:col-span-12 text-label-bold uppercase">
                Cập nhật danh mục (PATCH)
              </p>
              <input
                className="md:col-span-2 border-2 border-black px-md py-sm bg-white"
                placeholder="id"
                value={editCat.id}
                onChange={(e) => setEditCat((s) => ({ ...s, id: e.target.value }))}
              />
              <input
                className="md:col-span-4 border-2 border-black px-md py-sm bg-white"
                placeholder="slug"
                value={editCat.slug}
                onChange={(e) => setEditCat((s) => ({ ...s, slug: e.target.value }))}
              />
              <input
                className="md:col-span-4 border-2 border-black px-md py-sm bg-white"
                placeholder="name"
                value={editCat.name}
                onChange={(e) => setEditCat((s) => ({ ...s, name: e.target.value }))}
              />
              <button
                type="submit"
                className="md:col-span-2 bg-black text-white uppercase text-label-bold py-sm"
              >
                Update
              </button>
            </form>

            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black bg-white">
                    <th className="p-md text-label-bold uppercase">ID</th>
                    <th className="p-md text-label-bold uppercase">Slug</th>
                    <th className="p-md text-label-bold uppercase">Name</th>
                    <th className="p-md text-label-bold uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-b border-black">
                      <td className="p-md">{c.id}</td>
                      <td className="p-md">{c.slug}</td>
                      <td className="p-md">{c.name}</td>
                      <td className="p-md text-right">
                        <button
                          type="button"
                          className="text-label-bold uppercase border-2 border-black px-md py-xs hover:bg-black hover:text-white"
                          onClick={() => onDeleteCategory(c.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {tab === 'products' ? (
          <section className="space-y-lg">
            <form
              onSubmit={onCreateProduct}
              className="grid grid-cols-1 md:grid-cols-12 gap-md border-2 border-black p-lg bg-surface-container-low"
            >
              <p className="md:col-span-12 text-label-bold uppercase">Thêm sản phẩm</p>
              <input
                className="md:col-span-4 border-2 border-black px-md py-sm bg-white"
                placeholder="slug"
                value={prodForm.slug}
                onChange={(e) => setProdForm((s) => ({ ...s, slug: e.target.value }))}
              />
              <input
                className="md:col-span-4 border-2 border-black px-md py-sm bg-white"
                placeholder="name"
                value={prodForm.name}
                onChange={(e) => setProdForm((s) => ({ ...s, name: e.target.value }))}
              />
              <input
                className="md:col-span-4 border-2 border-black px-md py-sm bg-white"
                placeholder="meta"
                value={prodForm.meta}
                onChange={(e) => setProdForm((s) => ({ ...s, meta: e.target.value }))}
              />
              <input
                className="md:col-span-3 border-2 border-black px-md py-sm bg-white"
                placeholder="price USD"
                value={prodForm.priceUsd}
                onChange={(e) => setProdForm((s) => ({ ...s, priceUsd: e.target.value }))}
              />
              <input
                className="md:col-span-5 border-2 border-black px-md py-sm bg-white"
                placeholder="image URL (https…)"
                value={prodForm.imageUrl}
                onChange={(e) => setProdForm((s) => ({ ...s, imageUrl: e.target.value }))}
              />
              <input
                className="md:col-span-2 border-2 border-black px-md py-sm bg-white"
                placeholder="image alt"
                value={prodForm.imageAlt}
                onChange={(e) => setProdForm((s) => ({ ...s, imageAlt: e.target.value }))}
              />
              <select
                className="md:col-span-2 border-2 border-black px-md py-sm bg-white"
                value={prodForm.categoryId}
                onChange={(e) => setProdForm((s) => ({ ...s, categoryId: e.target.value }))}
              >
                <option value="">category (optional)</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="md:col-span-12 bg-black text-white uppercase text-label-bold py-md max-w-xs"
              >
                Create product
              </button>
            </form>

            <form
              onSubmit={onPatchProductPrice}
              className="grid grid-cols-1 md:grid-cols-12 gap-md border-2 border-black p-lg bg-white"
            >
              <p className="md:col-span-12 text-label-bold uppercase">
                Cập nhật giá sản phẩm (PATCH)
              </p>
              <input
                className="md:col-span-4 border-2 border-black px-md py-sm bg-white"
                placeholder="product id"
                value={patchProd.id}
                onChange={(e) => setPatchProd((s) => ({ ...s, id: e.target.value }))}
              />
              <input
                className="md:col-span-4 border-2 border-black px-md py-sm bg-white"
                placeholder="new price USD"
                value={patchProd.priceUsd}
                onChange={(e) => setPatchProd((s) => ({ ...s, priceUsd: e.target.value }))}
              />
              <button
                type="submit"
                className="md:col-span-4 bg-black text-white uppercase text-label-bold py-sm"
              >
                Update price
              </button>
            </form>

            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse text-body-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-white">
                    <th className="p-md text-label-bold uppercase">ID</th>
                    <th className="p-md text-label-bold uppercase">Slug</th>
                    <th className="p-md text-label-bold uppercase">Name</th>
                    <th className="p-md text-label-bold uppercase">Price</th>
                    <th className="p-md text-label-bold uppercase">Cat</th>
                    <th className="p-md text-label-bold uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-black align-top">
                      <td className="p-md">{p.id}</td>
                      <td className="p-md">{p.slug}</td>
                      <td className="p-md">{p.name}</td>
                      <td className="p-md">{formatUsdFromCents(p.priceCents)}</td>
                      <td className="p-md">{p.categorySlug ?? '—'}</td>
                      <td className="p-md text-right">
                        <button
                          type="button"
                          className="text-label-bold uppercase border-2 border-black px-md py-xs hover:bg-black hover:text-white"
                          onClick={() => onDeleteProduct(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {tab === 'orders' ? (
          <section className="overflow-x-auto border-2 border-black">
            <table className="w-full text-left border-collapse text-body-sm">
              <thead>
                <tr className="border-b-2 border-black bg-white">
                  <th className="p-md text-label-bold uppercase">ID</th>
                  <th className="p-md text-label-bold uppercase">Customer</th>
                  <th className="p-md text-label-bold uppercase">Total</th>
                  <th className="p-md text-label-bold uppercase">Status</th>
                  <th className="p-md text-label-bold uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-black align-top">
                    <td className="p-md">{o.id}</td>
                    <td className="p-md">
                      <div>{o.userFullName}</div>
                      <div className="text-secondary">{o.userEmail}</div>
                    </td>
                    <td className="p-md">{formatUsdFromCents(o.totalCents)}</td>
                    <td className="p-md">
                      <select
                        value={o.status}
                        onChange={(e) => onOrderStatus(o.id, e.target.value)}
                        className="border-2 border-black bg-white px-sm py-xs uppercase"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-md">
                      {o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}
      </main>

      <Footer data={ADMIN_FOOTER} />
    </div>
  )
}
