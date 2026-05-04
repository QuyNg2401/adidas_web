export function LoginFooter({ data }) {
  return (
    <footer className="bg-white dark:bg-black docked full-width bottom-0 border-t-2 border-black dark:border-white">
      <div className="grid grid-cols-12 gap-6 w-full px-10 py-12 max-w-[1440px] mx-auto">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="text-xl font-black tracking-widest uppercase">
            {data.brandTitle}
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm uppercase font-bold">
            {data.copyright}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 flex flex-wrap gap-x-12 gap-y-4 lg:justify-end items-center">
          {data.links.map((l) => (
            <a
              key={l}
              className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-sm hover:text-black dark:hover:text-white transition-colors duration-200"
              href="#"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

