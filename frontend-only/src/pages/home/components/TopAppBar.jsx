export function TopAppBar({ links }) {
  return (
    <header className="bg-white dark:bg-black fixed top-0 w-full z-50 border-b-2 border-black dark:border-white">
      <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
        <div className="text-3xl font-black italic tracking-tighter text-black dark:text-white uppercase">
          STRIDE
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={
                l.active
                  ? 'font-black uppercase tracking-tighter text-black dark:text-white border-b-4 border-black dark:border-white pb-1 transition-all duration-75 active:scale-95'
                  : 'font-bold uppercase text-zinc-500 dark:text-zinc-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-75 active:scale-95'
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <button className="material-symbols-outlined text-black dark:text-white transition-all duration-75 active:scale-95">
            search
          </button>
          <button className="material-symbols-outlined text-black dark:text-white transition-all duration-75 active:scale-95">
            shopping_cart
          </button>
          <button className="material-symbols-outlined text-black dark:text-white transition-all duration-75 active:scale-95">
            person
          </button>
        </div>
      </div>
    </header>
  )
}

