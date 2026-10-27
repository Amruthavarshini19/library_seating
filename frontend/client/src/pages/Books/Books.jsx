import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getLoans, getLoanSummary, payFine, renewLoan } from "../../api/loans"
import { updatePreferences } from "../../api/users"
import useAsync from "../../hooks/useAsync"
import { useToast } from "../../context/ToastContext"
import TopHeader from "../../components/TopHeader/TopHeader"
import StatCard from "../../components/StatCard/StatCard"
import Tabs from "../../components/Tabs/Tabs"
import DataRow from "../../components/DataRow/DataRow"
import Chip from "../../components/Chip/Chip"
import Toggle from "../../components/Toggle/Toggle"
import Modal from "../../components/Modal/Modal"
import EmptyState from "../../components/EmptyState/EmptyState"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import "./Books.css"
const bookChip = (days) =>
  days < 0
    ? { variant: "danger", label: "Overdue · fine running" }
    : days <= 3
      ? { variant: "warn", label: `Due in ${days} days` }
      : { variant: "ok", label: `Due in ${days} days` }
export default function Books() {
  const [tab, setTab] = useState("active")
  const [fine, setFine] = useState(null)
  const [remind, setRemind] = useState(true)
  const navigate = useNavigate()
  const { showToast } = useToast()
  const summary = useAsync(getLoanSummary, [])
  const loans = useAsync(() => getLoans({ status: tab }), [tab])
  const renew = async (id) => {
    try {
      const item = await renewLoan(id)
      showToast(`Renewed until ${item.dueDate}`)
      loans.refetch()
    } catch (e) {
      showToast(e.message)
    }
  }
  const pay = async () => {
    await payFine(fine.id)
    setFine(null)
    showToast("Fine marked as paid")
    loans.refetch()
    summary.refetch()
  }
  if (summary.loading || loans.loading)
    return (
      <>
        <TopHeader title="My books" subtitle="Loading your library record" />
        <div className="grid-3">
          {[1, 2, 3].map((i) => (
            <div className="card" key={i}>
              <Skeleton lines={4} />
            </div>
          ))}
        </div>
      </>
    )
  if (summary.error || loans.error)
    return (
      <ErrorState
        message={(summary.error || loans.error).message}
        onRetry={() => {
          summary.refetch()
          loans.refetch()
        }}
      />
    )
  return (
    <>
      <TopHeader
        title="My books"
        subtitle="Renewals left this term: 1 of 2"
        action={
          <Link className="button button-secondary" to="/app/books/catalogue">
            Browse catalogue
          </Link>
        }
      />
      <div className="grid-3 books-stats">
        <StatCard label="Borrowed" value={summary.data.borrowed} />
        <StatCard label="Due soon" value={summary.data.dueSoon} />
        <StatCard label="Fines to pay" value={`₹${summary.data.finesDue}`} />
      </div>
      <section className="card books-list">
        <Tabs
          tabs={[
            { label: "Borrowed", value: "active" },
            { label: "Reserved", value: "reserved" },
            { label: "History", value: "returned" },
          ]}
          active={tab}
          onChange={setTab}
        />
        {loans.data.length ? (
          loans.data.map((item) => {
            const chip = bookChip(item.daysLeft)
            return (
              <DataRow key={item.id}>
                <div>
                  <div className="list-title">{item.title}</div>
                  <div className="row-meta">
                    {item.daysLeft < 0 ? "Was due" : "Due"} {item.dueDate}
                  </div>
                </div>
                <Chip variant={chip.variant}>{chip.label}</Chip>
                <button
                  className="button button-secondary"
                  onClick={() =>
                    item.daysLeft < 0 ? setFine(item) : renew(item.id)
                  }
                >
                  {item.daysLeft < 0 ? "Pay fine" : "Renew"}
                </button>
              </DataRow>
            )
          })
        ) : (
          <EmptyState
            title="No books borrowed"
            message="Search the catalogue to borrow your first book."
            actionLabel="Browse catalogue"
            onAction={() => navigate("/app/books/catalogue")}
          />
        )}
      </section>
      <section className="card reminder-card">
        <h2>Reminders</h2>
        <Toggle
          label="Remind me 2 days before a book is due"
          checked={remind}
          onChange={async (value) => {
            setRemind(value)
            await updatePreferences({ bookDue: value })
            showToast("Reminder preference saved")
          }}
        />
      </section>
      <Modal
        title="Pay fine"
        open={Boolean(fine)}
        onClose={() => setFine(null)}
      >
        <p>
          Confirm payment of <strong>₹{fine?.fineAmount}</strong> for{" "}
          {fine?.title}.
        </p>
        <p className="muted">This is a mock payment for the frontend demo.</p>
        <button className="button button-primary button-full" onClick={pay}>
          Confirm payment
        </button>
      </Modal>
    </>
  )
}
