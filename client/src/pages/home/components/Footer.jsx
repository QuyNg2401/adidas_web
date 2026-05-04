export function Footer({ data }) {
  return (
    <footer className="bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div className="grid grid-cols-12 gap-6 w-full px-10 py-12 max-w-[1440px] mx-auto">
        <div className="col-span-12 md:col-span-4">
          <div className="text-xl font-black tracking-widest uppercase mb-6">
            {data.brandTitle}
          </div>
          <p className="font-bold uppercase text-sm text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
            {data.brandDescription}
          </p>
        </div>

        {data.columns.map((col) => (
          <div key={col.title} className="col-span-12 md:col-span-2">
            <h5 className="font-bold uppercase text-sm mb-6 underline decoration-2">
              {col.title}
            </h5>
            <ul className="space-y-3 font-bold uppercase text-sm text-zinc-600 dark:text-zinc-400">
              {col.links.map((label) => (
                <li key={label}>
                  <a
                    className="hover:text-black dark:hover:text-white transition-colors duration-200"
                    href="#"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
          <h5 className="font-bold uppercase text-sm mb-6 underline decoration-2">
            NEWSLETTER
          </h5>
          <p className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-xs mb-4 md:text-right">
            SIGN UP FOR EXCLUSIVE DROPS AND ELITE TRAINING CONTENT.
          </p>
          <div className="flex gap-4">
            {data.socialIcons.map((icon) => (
              <a
                key={icon}
                className="material-symbols-outlined text-black dark:text-white"
                href="#"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-12 pt-12 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold uppercase text-sm text-zinc-600 dark:text-zinc-400">
            {data.copyright}
          </div>
          <div className="flex gap-8 font-bold uppercase text-sm text-zinc-600 dark:text-zinc-400">
            {data.legalLinks.map((label) => (
              <a
                key={label}
                className="hover:text-black dark:hover:text-white transition-colors duration-200"
                href="#"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

