import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../contexts/useAuth'

export function TopAppBar({ links, cartCount }) {
  const { user, loading, logout } = useAuth()
  const nav = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileWrapRef = useRef(null)
  const accountPath = !loading && !user ? '/login' : '/account'

  useEffect(() => {
    function closeOnOutside(e) {
      if (!profileWrapRef.current?.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  useEffect(() => {
    if (!profileOpen) return undefined
    function onKey(e) {
      if (e.key === 'Escape') setProfileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [profileOpen])

  async function handleLogout() {
    setProfileOpen(false)
    await logout()
    nav('/')
  }

  return (
    <header className="bg-white dark:bg-black sticky top-0 w-full z-50 border-b-2 border-black dark:border-white">
      <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
        <Link
          to="/"
          className="text-3xl font-black italic tracking-tighter text-black dark:text-white uppercase"
        >
          ADIDAS
        </Link>

        <nav className="hidden md:flex items-center gap-gutter">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to ?? l.href ?? '#'}
              className={({ isActive }) =>
                (l.active ?? isActive)
                  ? 'font-black uppercase tracking-tighter text-black dark:text-white border-b-4 border-black dark:border-white pb-1 transition-all duration-75 active:scale-95 px-2 py-1'
                  : 'uppercase tracking-tighter text-zinc-500 dark:text-zinc-400 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-75 active:scale-95 px-2 py-1'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-md">
          <button className="material-symbols-outlined text-black dark:text-white p-2 hover:bg-black hover:text-white transition-all active:scale-95">
            search
          </button>
          <Link
            to="/cart"
            className="material-symbols-outlined text-black dark:text-white p-2 hover:bg-black hover:text-white transition-all active:scale-95 relative"
            aria-label="Cart"
          >
            shopping_cart
            {typeof cartCount === 'number' && cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            ) : null}
          </Link>
          {!loading && user ? (
            <div className="relative" ref={profileWrapRef}>
              <button
                type="button"
                className="material-symbols-outlined text-black dark:text-white p-2 hover:bg-black hover:text-white transition-all active:scale-95"
                aria-label="Tài khoản"
                aria-expanded={profileOpen}
                aria-haspopup="true"
                onClick={() => setProfileOpen((o) => !o)}
              >
                person
              </button>
              {profileOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-52 border-2 border-black bg-white dark:bg-black dark:border-white z-[60] flex flex-col shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]"
                >
                  <Link
                    role="menuitem"
                    to="/account"
                    className="px-md py-sm text-label-bold uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    Tài khoản
                  </Link>
                  {user.role === 'admin' ? (
                    <Link
                      role="menuitem"
                      to="/admin"
                      className="px-md py-sm text-label-bold uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors border-t-2 border-black dark:border-white"
                      onClick={() => setProfileOpen(false)}
                    >
                      Quản trị
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    role="menuitem"
                    className="text-left px-md py-sm text-label-bold uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors border-t-2 border-black dark:border-white"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              to={accountPath}
              className="material-symbols-outlined text-black dark:text-white p-2 hover:bg-black hover:text-white transition-all active:scale-95"
              aria-label="Đăng nhập / Tài khoản"
            >
              person
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

