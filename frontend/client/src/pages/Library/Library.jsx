import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSeats, slots } from "../../api/seats"
import {
  cancelReservation,
  createReservation,
  getCurrentReservation,
} from "../../api/reservations"
import useAsync from "../../hooks/useAsync"
import { useToast } from "../../context/ToastContext"
import TopHeader from "../../components/TopHeader/TopHeader"
import SeatGrid from "../../components/SeatGrid/SeatGrid"
import Chip from "../../components/Chip/Chip"
import Modal from "../../components/Modal/Modal"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import EmptyState from "../../components/EmptyState/EmptyState"
import "./Library.css"
const floors = [
  ["Ground", 0],
  ["Floor 1", 1],
  ["Floor 2", 2],
  ["Reading hall", 3],
]
export default function Library() {
  const [floor, setFloor] = useState(2)
  const [slot, setSlot] = useState(slots[2])
  const [zone, setZone] = useState(false)
  const [power, setPower] = useState(false)
  const [selected, setSelected] = useState(null)
  const [modal, setModal] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const navigate = useNavigate()
  const { showToast } = useToast()
  const seats = useAsync(
    () => getSeats({ floor, date: "today", slot, zone, power }),
    [floor, slot, zone, power],
  )
  const reservation = useAsync(getCurrentReservation, [])
  useEffect(() => {
    const timer = setInterval(seats.refetch, 15000)
    return () => clearInterval(timer)
  }, [seats.refetch])
  const confirm = async () => {
    setBookingError("")
    try {
      await createReservation({ seatId: selected, date: "today", slot })
      showToast("Seat reserved successfully")
      navigate("/app/dashboard")
    } catch (e) {
      setBookingError(e.message)
      seats.refetch()
    }
  }
  const cancel = async () => {
    await cancelReservation(reservation.data?.id)
    setModal(false)
    reservation.refetch()
    showToast("Reservation cancelled")
  }
  if (seats.loading)
    return (
      <>
        <TopHeader
          title="Library seats"
          subtitle="Checking live availability"
        />
        <div className="card">
          <Skeleton lines={10} />
        </div>
      </>
    )
  if (seats.error)
    return <ErrorState message={seats.error.message} onRetry={seats.refetch} />
  return (
    <>
      <TopHeader
        title="Library seats"
        subtitle={`Central Library · ${floors.find((f) => f[1] === floor)[0]} · ${seats.data.free} of ${seats.data.total} seats free`}
        action={
          <button
            className="button button-secondary"
            onClick={() => setModal(true)}
          >
            My reservation
          </button>
        }
      />
      <div className="library-layout">
        <section className="card">
          <div className="filter-row">
            {floors.map(([label, value]) => (
              <button
                key={label}
                className={`filter-chip ${floor === value ? "active" : ""}`}
                onClick={() => {
                  setFloor(value)
                  setSelected(null)
                }}
              >
                {label}
              </button>
            ))}
            <button
              className={`filter-chip ${zone ? "active" : ""}`}
              onClick={() => setZone(!zone)}
            >
              Quiet zone
            </button>
            <button
              className={`filter-chip ${power ? "active" : ""}`}
              onClick={() => setPower(!power)}
            >
              Power outlet
            </button>
          </div>
          <div className="seat-legend">
            <span>
              <i className="free" />
              Free
            </span>
            <span>
              <i className="taken" />
              Taken
            </span>
            <span>
              <i className="mine" />
              Your pick
            </span>
          </div>
          {seats.data.seats.length ? (
            <SeatGrid
              rows={seats.data.seats}
              selectedId={selected}
              onSelect={(seat) =>
                seat.status === "free" && setSelected(seat.id)
              }
            />
          ) : (
            <EmptyState
              title="No seats available"
              message="Try another floor or time slot."
            />
          )}
        </section>
        <aside className="card booking">
          <h2>Booking summary</h2>
          <dl>
            <div>
              <dt>Seat</dt>
              <dd>
                {selected
                  ? seats.data.seats.find((s) => s.id === selected)?.label
                  : "Select a seat"}
              </dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>Today</dd>
            </div>
          </dl>
          <label htmlFor="slot">Time slot</label>
          <select
            id="slot"
            value={slot}
            onChange={(e) => {
              setSlot(e.target.value)
              setSelected(null)
            }}
          >
            {slots.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <p>
            Check in within 15 minutes of your start time or the seat is
            released to others.
          </p>
          {bookingError && <Chip variant="danger">{bookingError}</Chip>}
          <button
            className="button button-primary button-full"
            disabled={!selected}
            onClick={confirm}
          >
            Confirm reservation
          </button>
        </aside>
      </div>
      <Modal
        title="My reservation"
        open={modal}
        onClose={() => setModal(false)}
      >
        {reservation.loading ? (
          <Skeleton lines={4} />
        ) : reservation.error ? (
          <ErrorState
            message={reservation.error.message}
            onRetry={reservation.refetch}
          />
        ) : reservation.data ? (
          <div className="reservation-modal">
            <p>
              <strong>{reservation.data.building}</strong>
            </p>
            <p>
              Floor {reservation.data.floor} · Seat {reservation.data.seatLabel}
            </p>
            <p>
              {reservation.data.slotStart} – {reservation.data.slotEnd}
            </p>
            <button
              className="button button-secondary button-full"
              onClick={cancel}
            >
              Cancel reservation
            </button>
          </div>
        ) : (
          <EmptyState
            title="No seat reserved today"
            message="Pick a free seat and a time slot to reserve it."
          />
        )}
      </Modal>
    </>
  )
}
