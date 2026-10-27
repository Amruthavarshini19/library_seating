import "./EmptyState.css"
export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-mark" aria-hidden="true" />
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && (
        <button className="button button-secondary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
