export function Footer({ data }) {
  return (
    <footer className="bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div className="grid grid-cols-12 gap-6 w-full px-10 py-12 max-w-[1440px] mx-auto">
        <div className="col-span-12 md:col-span-4 space-y-md">
          <div className="text-xl font-black tracking-widest text-black dark:text-white">
            {data.brandTitle}
          </div>
          <p className="text-secondary text-body-sm">{data.brandDescription}</p>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {data.columns.map((col) => (
            <div key={col.title} className="space-y-sm">
              <h4 className="text-label-bold uppercase">{col.title}</h4>
              {col.links ? (
                <ul className="space-y-xs">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        className="text-label-md text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                        href={l.href ?? '#'}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              {col.socialIcons ? (
                <div className="flex gap-sm">
                  {col.socialIcons.map((icon) => (
                    <span
                      key={icon}
                      className="material-symbols-outlined text-black dark:text-white cursor-pointer"
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="col-span-12 pt-12 border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="font-bold uppercase text-sm text-zinc-600 dark:text-zinc-400">
            {data.copyright}
          </div>
          {data.bottomLinks?.length ? (
            <div className="flex gap-gutter">
              {data.bottomLinks.map((l) => (
                <a
                  key={l.label}
                  className="text-label-bold hover:underline decoration-2"
                  href={l.href ?? '#'}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

