import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  changePassword,
  getProfile,
  getStats,
  updatePreferences,
  updateProfile,
} from "../../api/users"
import useAsync from "../../hooks/useAsync"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"
import TopHeader from "../../components/TopHeader/TopHeader"
import FormField from "../../components/FormField/FormField"
import Toggle from "../../components/Toggle/Toggle"
import DataRow from "../../components/DataRow/DataRow"
import Modal from "../../components/Modal/Modal"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import "./Profile.css"
export default function Profile() {
  const profile = useAsync(getProfile, [])
  const stats = useAsync(getStats, [])
  const { logout, setUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [password, setPassword] = useState(false)
  const [prefs, setPrefs] = useState({ email: true, push: true })
  if (profile.loading || stats.loading)
    return (
      <>
        <TopHeader title="Profile" subtitle="Loading your account" />
        <div className="grid-2">
          <div className="card">
            <Skeleton lines={8} />
          </div>
          <div className="card">
            <Skeleton lines={8} />
          </div>
        </div>
      </>
    )
  if (profile.error || stats.error)
    return (
      <ErrorState
        message={(profile.error || stats.error).message}
        onRetry={() => {
          profile.refetch()
          stats.refetch()
        }}
      />
    )
  const current = draft || profile.data
  const save = async () => {
    const next = await updateProfile(current)
    setUser((u) => ({ ...u, ...next }))
    setEditing(false)
    setDraft(null)
    profile.refetch()
    showToast("Profile updated")
  }
  const edit = () => {
    setDraft({ ...profile.data })
    setEditing(true)
  }
  const pref = async (key, value) => {
    setPrefs({ ...prefs, [key]: value })
    await updatePreferences({ [key]: value })
    showToast("Preference saved")
  }
  return (
    <>
      <TopHeader
        title="Profile"
        subtitle="Your account and preferences"
        action={
          <button
            className={`button ${
              editing ? "button-primary" : "button-secondary"
            }`}
            onClick={editing ? save : edit}
          >
            {editing ? "Save" : "Edit profile"}
          </button>
        }
      />
      <div className="grid-2 profile-top">
        <section className="card personal">
          <div className="identity">
            <span>
              {current.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div>
              <h2>{current.name}</h2>
              <p>{current.email}</p>
            </div>
          </div>
          {editing ? (
            <>
              <FormField
                label="Full name"
                name="name"
                value={current.name}
                onChange={(e) => setDraft({ ...current, name: e.target.value })}
              />
              <FormField
                label="CUSAT email"
                name="email"
                value={current.email}
                onChange={(e) =>
                  setDraft({ ...current, email: e.target.value })
                }
              />
              <FormField
                label="Department"
                name="department"
                value={current.department}
                onChange={(e) =>
                  setDraft({ ...current, department: e.target.value })
                }
              />
              <FormField
                label="Semester"
                name="semester"
                as="select"
                value={current.semester}
                onChange={(e) =>
                  setDraft({ ...current, semester: Number(e.target.value) })
                }
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </FormField>
              <DataRow>
                <span>Register number</span>
                <strong>{current.regNo}</strong>
              </DataRow>
            </>
          ) : (
            <>
              <DataRow>
                <span>Register number</span>
                <strong>{current.regNo}</strong>
              </DataRow>
              <DataRow>
                <span>Department</span>
                <strong>{current.department}</strong>
              </DataRow>
              <DataRow>
                <span>Semester</span>
                <strong>{current.semester}</strong>
              </DataRow>
            </>
          )}
        </section>
        <section className="card">
          <h2>Library record</h2>
          <DataRow>
            <span>Seats booked this month</span>
            <strong>{stats.data.seatsBookedThisMonth}</strong>
          </DataRow>
          <DataRow>
            <span>No-shows</span>
            <strong>{stats.data.noShows}</strong>
          </DataRow>
          <DataRow>
            <span>Books returned on time</span>
            <strong>{stats.data.onTimeReturns}</strong>
          </DataRow>
          <DataRow>
            <span>Fines paid</span>
            <strong>₹{stats.data.finesPaid}</strong>
          </DataRow>
        </section>
      </div>
      <div className="grid-2">
        <section className="card">
          <h2>Preferences</h2>
          <Toggle
            label="Email alerts"
            checked={prefs.email}
            onChange={(v) => pref("email", v)}
          />
          <Toggle
            label="Push notifications"
            checked={prefs.push}
            onChange={(v) => pref("push", v)}
          />
        </section>
        <section className="card account-card">
          <h2>Account</h2>
          <button
            className="button button-secondary"
            onClick={() => setPassword(true)}
          >
            Change password
          </button>
          <button
            className="button button-primary"
            onClick={async () => {
              await logout()
              navigate("/signin")
            }}
          >
            Sign out
          </button>
        </section>
      </div>
      <Modal
        title="Change password"
        open={password}
        onClose={() => setPassword(false)}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await changePassword()
            setPassword(false)
            showToast("Password changed")
          }}
        >
          <FormField label="Old password" name="old" type="password" required />
          <FormField label="New password" name="new" type="password" required />
          <FormField
            label="Confirm new password"
            name="confirmNew"
            type="password"
            required
          />
          <button className="button button-primary button-full">
            Change password
          </button>
        </form>
      </Modal>
    </>
  )
}
