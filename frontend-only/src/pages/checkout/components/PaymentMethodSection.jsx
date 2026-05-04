export function PaymentMethodSection({ section, data }) {
  const [methodA, methodB] = data.methods
  const [cardNumber, exp, cvv] = data.cardFields

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
    <section className="space-y-xl">
      <div className="flex items-center gap-sm">
        <span className="bg-black text-white px-xs text-label-bold">
          {section.step}
        </span>
        <h2 className="text-headline-sm uppercase">{section.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="border-2 border-black p-lg bg-white flex flex-col justify-between aspect-[1.6/1]">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-3xl">
              {methodA.icon}
            </span>
            <div className="bg-black text-white px-xs text-label-bold">ACTIVE</div>
          </div>
          <div>
            <p className="text-label-bold mb-xs">{methodA.title}</p>
            <p className="text-body-sm text-secondary">{methodA.description}</p>
          </div>
        </div>

        <div className="border border-surface-variant p-lg bg-white opacity-50 flex flex-col justify-between aspect-[1.6/1] cursor-pointer hover:border-black transition-all">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-3xl">
              {methodB.icon}
            </span>
          </div>
          <div>
            <p className="text-label-bold mb-xs">{methodB.title}</p>
            <p className="text-body-sm text-secondary">{methodB.description}</p>
          </div>
        </div>
      </div>

      <form className="space-y-lg mt-xl bg-white border border-black p-lg">
        <Input label={cardNumber.label} placeholder={cardNumber.placeholder} />
        <div className="grid grid-cols-2 gap-lg">
          <Input label={exp.label} placeholder={exp.placeholder} />
          <Input label={cvv.label} placeholder={cvv.placeholder} />
        </div>
      </form>
    </section>
  )
}

