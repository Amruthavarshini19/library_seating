import "./ProgressBar.css"
export default function ProgressBar({ value, threshold }) {
  const safe = Math.max(0, Math.min(100, value))
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={`${Math.round(safe)} percent`}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={Math.round(safe)}
    >
      <span className="progress-fill" style={{ width: `${safe}%` }} />
      {threshold !== undefined && (
        <span
          className="progress-threshold"
          style={{ left: `${threshold}%` }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
