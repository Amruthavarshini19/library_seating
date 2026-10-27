import "./Seat.css"
export default function Seat({ label, status, onSelect }) {
  return (
    <button
      type="button"
      className={`seat seat-${status}`}
      disabled={status === "taken"}
      onClick={onSelect}
      aria-label={`Seat ${label}, ${status === "mine" ? "your pick" : status}`}
    >
      {label.split("-")[1]}
    </button>
  )
}
