import "./Toast.css"
export default function Toast({ message, onClose }) {
  if (!message) return null
  return (
    <div className="toast" role="status">
      <span>{message}</span>
      <button onClick={onClose} aria-label="Dismiss notification">
        Close
      </button>
    </div>
  )
}
