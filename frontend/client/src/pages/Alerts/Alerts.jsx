import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getNotifications,
  markAllRead,
  markRead,
} from "../../api/notifications"
import { updatePreferences } from "../../api/users"
import useAsync from "../../hooks/useAsync"
import { useToast } from "../../context/ToastContext"
import TopHeader from "../../components/TopHeader/TopHeader"
import DataRow from "../../components/DataRow/DataRow"
import Chip from "../../components/Chip/Chip"
import Toggle from "../../components/Toggle/Toggle"
import EmptyState from "../../components/EmptyState/EmptyState"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import "./Alerts.css"
const variants = { seat: "ok", book: "warn", fine: "danger", class: "danger" }
export default function Alerts() {
  const { data, loading, error, refetch } = useAsync(getNotifications, [])
  const [prefs, setPrefs] = useState({
    seat: true,
    book: true,
    fine: true,
    attendance: true,
  })
  const { showToast } = useToast()
  const navigate = useNavigate()
  const all = async () => {
    await markAllRead()
    showToast("All alerts marked as read")
    refetch()
  }
  const open = async (item) => {
    await markRead(item.id)
    navigate(item.link)
  }
  const toggle = async (key, value) => {
    const next = { ...prefs, [key]: value }
    setPrefs(next)
    await updatePreferences(next)
    showToast("Reminder preference saved")
  }
  if (loading)
    return (
      <>
        <TopHeader title="Alerts" subtitle="Loading alerts" />
        <div className="card">
          <Skeleton lines={8} />
        </div>
      </>
    )
  if (error) return <ErrorState message={error.message} onRetry={refetch} />
  return (
    <>
      <TopHeader
        title="Alerts"
        subtitle="Everything that needs you, in one list"
        action={
          <button className="button button-secondary" onClick={all}>
            Mark all read
          </button>
        }
      />
      <div className="alerts-layout">
        <section className="card">
          <h2>Recent</h2>
          {data.length ? (
            data.map((item) => (
              <DataRow
                key={item.id}
                className={!item.read ? "unread" : ""}
                onClick={() => open(item)}
              >
                <Chip variant={variants[item.type]}>
                  {item.type[0].toUpperCase() + item.type.slice(1)}
                </Chip>
                <span className="alert-message">{item.message}</span>
                <time>{item.createdAt}</time>
              </DataRow>
            ))
          ) : (
            <EmptyState
              title="You are all caught up"
              message="New seat, book and attendance alerts will show up here."
            />
          )}
        </section>
        <aside className="card">
          <h2>Reminder settings</h2>
          <Toggle
            label="Seat check-in reminder"
            checked={prefs.seat}
            onChange={(v) => toggle("seat", v)}
          />
          <Toggle
            label="Book due 2 days before"
            checked={prefs.book}
            onChange={(v) => toggle("book", v)}
          />
          <Toggle
            label="Fine started"
            checked={prefs.fine}
            onChange={(v) => toggle("fine", v)}
          />
          <Toggle
            label="Attendance below 80%"
            checked={prefs.attendance}
            onChange={(v) => toggle("attendance", v)}
          />
        </aside>
      </div>
    </>
  )
}
