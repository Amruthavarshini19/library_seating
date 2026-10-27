import { useState } from "react"
import { getAttendanceSummary } from "../../api/attendance"
import useAsync from "../../hooks/useAsync"
import { useToast } from "../../context/ToastContext"
import { afterSkipping, percent, statusChip } from "../../utils/attendance"
import TopHeader from "../../components/TopHeader/TopHeader"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import Chip from "../../components/Chip/Chip"
import DataRow from "../../components/DataRow/DataRow"
import FormField from "../../components/FormField/FormField"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import EmptyState from "../../components/EmptyState/EmptyState"
import "./Attendance.css"
export default function Attendance() {
  const { showToast } = useToast()
  const { data, loading, error, refetch } = useAsync(getAttendanceSummary, [])
  const [subjectId, setSubjectId] = useState("s1")
  const [skip, setSkip] = useState(1)
  if (loading)
    return (
      <>
        <TopHeader title="Attendance" subtitle="Loading attendance" />
        <div className="card">
          <Skeleton lines={9} />
        </div>
      </>
    )
  if (error) return <ErrorState message={error.message} onRetry={refetch} />
  const subject =
    data.subjects.find((s) => s.id === subjectId) || data.subjects[0]
  const next = afterSkipping(subject.attended, subject.total, skip)
  const overall = percent(data.overall.attended, data.overall.total)
  return (
    <>
      <TopHeader
        title="Attendance"
        subtitle="Semester 5 · minimum required is 75%"
        action={
          <button
            className="button button-secondary"
            onClick={() => showToast("Coming soon")}
          >
            Export report
          </button>
        }
      />
      <div className="grid-2 attendance-top">
        <section className="card">
          <h2>Overall</h2>
          <strong className="attendance-number">{overall.toFixed(0)}%</strong>
          <ProgressBar value={overall} threshold={data.threshold} />
          <p className="muted">Red line marks the 75% minimum</p>
        </section>
        <section className="card what-if">
          <h2>What if I skip?</h2>
          <div className="field-row">
            <FormField
              label="Subject"
              name="subject"
              as="select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              {data.subjects.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.name}
                </option>
              ))}
            </FormField>
            <FormField
              label="Classes"
              name="skip"
              as="select"
              value={skip}
              onChange={(e) => setSkip(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </FormField>
          </div>
          <p className={next < 75 ? "danger-text" : "ok-text"}>
            <strong>{subject.name}</strong> would drop to {next.toFixed(1)}%.
            That is {next < 75 ? "below" : "above"} the minimum.
          </p>
        </section>
      </div>
      <section className="card subjects">
        <h2>By subject</h2>
        {data.subjects.length ? (
          data.subjects.map((s) => {
            const value = percent(s.attended, s.total)
            const chip = statusChip(s.attended, s.total)
            return (
              <DataRow key={s.id}>
                <a href="#subject" onClick={(e) => e.preventDefault()}>
                  {s.name}
                </a>
                <span>
                  {s.attended} / {s.total}
                </span>
                <div className="subject-progress">
                  <ProgressBar value={value} />
                </div>
                <strong>{value.toFixed(0)}%</strong>
                <Chip variant={chip.variant}>{chip.label}</Chip>
              </DataRow>
            )
          })
        ) : (
          <EmptyState
            title="No attendance records"
            message="Your subject attendance will appear here."
          />
        )}
      </section>
    </>
  )
}
