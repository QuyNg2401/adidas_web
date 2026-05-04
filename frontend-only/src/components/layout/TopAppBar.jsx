import { Link, NavLink } from 'react-router-dom'

export function TopAppBar({ links, cartCount }) {
  return (
    <header className="bg-white dark:bg-black sticky top-0 w-full z-50 border-b-2 border-black dark:border-white">
      <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
        <Link
          to="/"
          className="text-3xl font-black italic tracking-tighter text-black dark:text-white uppercase"
        >
          STRIDE
        </Link>

        <nav className="hidden md:flex items-center gap-gutter">
          {links.map((l, idx) => (
            <NavLink
              key={`${l.label}-${idx}`}
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
          <Link
            to="/account"
            className="material-symbols-outlined text-black dark:text-white p-2 hover:bg-black hover:text-white transition-all active:scale-95"
            aria-label="Account"
          >
            person
          </Link>
        </div>
      </div>
    </header>
  )
}

