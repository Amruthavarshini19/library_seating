import "./FormField.css"
export default function FormField({
  label,
  error,
  name,
  as = "input",
  children,
  ...inputProps
}) {
  const id = inputProps.id || name
  const Tag = as
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <Tag
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? "input-error" : ""}
        {...inputProps}
      >
        {children}
      </Tag>
      {error && (
        <span id={`${id}-error`} className="field-error">
          {error}
        </span>
      )}
    </div>
  )
}
