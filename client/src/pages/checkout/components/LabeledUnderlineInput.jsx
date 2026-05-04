export function LabeledUnderlineInput({
  label,
  placeholder,
  multiline = false,
  rows = 3,
  inputMode,
  value,
  onChange,
  error,
  id,
}) {
  const fieldClass =
    'w-full border-b border-black bg-transparent py-sm px-0 focus:border-b-4 focus:ring-0 transition-all text-body-md outline-none'

  const inputId =
    id ??
    `field-${String(label)
      .toLowerCase()
      .replace(/\s+/g, '-')}`

  const invalid = Boolean(error)

  return (
    <div className="space-y-xs">
      <label className="text-label-bold uppercase" htmlFor={inputId}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={inputId}
          className={`${fieldClass} resize-none leading-snug min-h-0 max-h-24 overflow-y-auto`}
          placeholder={placeholder}
          rows={rows}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          aria-invalid={invalid}
        />
      ) : (
        <input
          id={inputId}
          className={fieldClass}
          placeholder={placeholder}
          type="text"
          inputMode={inputMode}
          autoComplete="off"
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          aria-invalid={invalid}
        />
      )}
      {error ? <p className="text-red-700 text-body-sm">{error}</p> : null}
    </div>
  )
}
