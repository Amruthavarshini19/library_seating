import Seat from "../Seat/Seat"
import "./SeatGrid.css"
export default function SeatGrid({ rows, selectedId, onSelect }) {
  return (
    <div className="seat-grid">
      {["A", "B", "C", "D", "E"].map((letter) => (
        <div className="seat-row" key={letter}>
          <strong>{letter}</strong>
          {rows
            .filter((s) => s.row === letter)
            .map((seat) => (
              <Seat
                key={seat.id}
                label={seat.label}
                status={seat.id === selectedId ? "mine" : seat.status}
                onSelect={() => onSelect(seat)}
              />
            ))}
        </div>
      ))}
    </div>
  )
}
