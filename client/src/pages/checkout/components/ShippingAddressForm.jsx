import { LabeledUnderlineInput } from './LabeledUnderlineInput'

export function ShippingAddressForm({ section, data, values, onFieldChange, errors }) {
  return (
    <section>
      <div className="space-y-xl mt-xxl">
        <div className="flex items-center gap-sm">
          <span className="bg-black text-white px-xs text-label-bold">
            {section.step}
          </span>
          <h2 className="text-headline-sm uppercase">{section.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-lg max-w-xl">
          {data.fields.map((field) => (
            <LabeledUnderlineInput
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              multiline={field.multiline}
              rows={field.rows}
              inputMode={field.inputMode}
              value={values[field.name]}
              onChange={(v) => onFieldChange(field.name, v)}
              error={errors[field.name]}
              id={`checkout-${field.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
