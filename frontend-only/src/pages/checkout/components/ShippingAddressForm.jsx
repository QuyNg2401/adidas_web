export function ShippingAddressForm({ section, data }) {
  const [first, last] = data.fields
  const [addr1, addr2] = data.fields.slice(2, 4)
  const [city] = data.fields.slice(4, 5)
  const [state, zip] = data.fields.slice(5, 7)

  const Input = ({ label, placeholder }) => (
    <div className="space-y-xs">
      <label className="text-label-bold uppercase">{label}</label>
      <input
        className="w-full border-b border-black bg-transparent py-sm px-0 focus:border-b-4 focus:ring-0 transition-all text-body-md"
        placeholder={placeholder}
        type="text"
      />
    </div>
  )

  return (
    <section>
      <div className="space-y-xl mt-xxl">
        <div className="flex items-center gap-sm">
          <span className="bg-black text-white px-xs text-label-bold">
            {section.step}
          </span>
          <h2 className="text-headline-sm uppercase">{section.title}</h2>
        </div>

        <form className="grid grid-cols-2 gap-lg">
          <Input label={first.label} placeholder={first.placeholder} />
          <Input label={last.label} placeholder={last.placeholder} />

          <div className="col-span-2">
            <Input label={addr1.label} placeholder={addr1.placeholder} />
          </div>
          <div className="col-span-2">
            <Input label={addr2.label} placeholder={addr2.placeholder} />
          </div>

          <Input label={city.label} placeholder={city.placeholder} />

          <div className="col-span-1 grid grid-cols-2 gap-md">
            <Input label={state.label} placeholder={state.placeholder} />
            <Input label={zip.label} placeholder={zip.placeholder} />
          </div>
        </form>
      </div>
    </section>
  )
}

