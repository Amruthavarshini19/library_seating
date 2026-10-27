import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { getDashboard } from "../../api/dashboard"
import { checkIn } from "../../api/reservations"
import { renewLoan } from "../../api/loans"
import useAsync from "../../hooks/useAsync"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"
import { todayLabel } from "../../utils/dates"
import TopHeader from "../../components/TopHeader/TopHeader"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import Chip from "../../components/Chip/Chip"
import DataRow from "../../components/DataRow/DataRow"
import EmptyState from "../../components/EmptyState/EmptyState"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import "./Dashboard.css"
export default function Dashboard() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useAsync(getDashboard, [])
  const [checked, setChecked] = useState(false)
  if (loading)
    return (
      <>
        <TopHeader title="Dashboard" subtitle={todayLabel()} />
        <div className="grid-3">
          {[1, 2, 3].map((i) => (
            <div className="card" key={i}>
              <Skeleton lines={5} />
            </div>
          ))}
        </div>
      </>
    )
  if (error) return <ErrorState message={error.message} onRetry={refetch} />
  const doCheckin = async () => {
    await checkIn(data.reservation.id)
    setChecked(true)
    showToast("Checked in to seat B-4")
  }
  const renew = async () => {
    try {
      const loan = await renewLoan(data.booksDue[0].loanId)
      showToast(`Renewed until ${loan.dueDate}`)
    } catch (e) {
      showToast(e.message)
    }
  }
  return (
    <>
      <TopHeader
        title={`Good morning, ${user.name.split(" ")[0]}`}
        subtitle={todayLabel()}
        action={
          <Link className="button button-primary" to="/app/library">
            Reserve a seat
          </Link>
        }
      />
      <div className="grid-3 dashboard-top">
        <Link className="card linked-card" to="/app/attendance">
          <h2>Overall attendance</h2>
          <strong className="dashboard-number">
            {data.attendance.overall}%
          </strong>
          <ProgressBar value={data.attendance.overall} />
          <p>
            Minimum 75% · you can miss {data.attendance.canMiss} more classes
          </p>
        </Link>
        <section className="card">
          <h2>Today&apos;s seat</h2>
          {data.reservation ? (
            <>
              <p>
                <strong>
                  {data.reservation.building} · Floor {data.reservation.floor} ·{" "}
                  {data.reservation.seatLabel}
                </strong>
              </p>
              <p className="muted">
                {data.reservation.slotStart} – {data.reservation.slotEnd}
              </p>
              <div className="dashboard-actions">
                {!checked && (
                  <button className="button button-primary" onClick={doCheckin}>
                    Check in
                  </button>
                )}
                <Chip variant={checked ? "ok" : "warn"}>
                  {checked
                    ? "Checked in"
                    : `Before ${data.reservation.checkInBy}`}
                </Chip>
              </div>
            </>
          ) : (
            <EmptyState
              title="No seat reserved today"
              message="Pick a free seat and time slot."
              actionLabel="Reserve a seat"
              onAction={() => navigate("/app/library")}
            />
          )}
        </section>
        <section className="card">
          <h2>Books due this week</h2>
          <strong className="dashboard-number">{data.booksDue.length}</strong>
          <p>
            {data.booksDue[0]?.title} · due {data.booksDue[0]?.dueDate}
          </p>
          <button className="button button-secondary" onClick={renew}>
            Renew now
          </button>
        </section>
      </div>
      <div className="grid-2 dashboard-bottom">
        <section className="card">
          <h2>Today&apos;s classes</h2>
          {data.classesToday.length ? (
            data.classesToday.map((c) => (
              <DataRow key={c.time}>
                <span className="class-time">{c.time}</span>
                <strong>{c.subject}</strong>
                <Chip
                  variant={
                    c.status === "present"
                      ? "ok"
                      : c.status === "absent"
                        ? "danger"
                        : "warn"
                  }
                >
                  {c.status[0].toUpperCase() + c.status.slice(1)}
                </Chip>
              </DataRow>
            ))
          ) : (
            <EmptyState
              title="No classes today"
              message="Your schedule is clear."
            />
          )}
        </section>
        <section className="card">
          <h2>Needs attention</h2>
          {data.alerts.length ? (
            data.alerts.map((a) => (
              <Link className="attention-row" to={a.link} key={a.id}>
                {a.message}
              </Link>
            ))
          ) : (
            <EmptyState
              title="You are all caught up"
              message="No new alerts."
            />
          )}
        </section>
      </div>
    </>
  )
}
