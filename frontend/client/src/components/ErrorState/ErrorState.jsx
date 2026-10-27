import "./ErrorState.css"
export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <h2>Could not load this page</h2>
      <p>{message || "Check your connection and try again."}</p>
      <button className="button button-secondary" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}
