export default function Field({ label, required = false, error, placeholder, type = 'text', className = '', ...inputProps }) {
  return (
    <label className={`field ${className} ${error ? 'has-error' : ''}`}>
      <span>{label}{required && <> <b>*</b></>}</span>
      <input
        type={type}
        placeholder={placeholder}
        {...inputProps}
        aria-required={required || undefined}
        aria-invalid={error ? 'true' : undefined}
      />
      {error && <span className="field-error" role="alert">{error}</span>}
    </label>
  )
}
