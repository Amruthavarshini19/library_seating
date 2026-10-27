import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import FormField from "../../components/FormField/FormField"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"
import "./SignIn.css"
export default function SignIn() {
  const { user, login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    keep: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  if (user) return <Navigate to="/app/dashboard" replace />
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await login(form)
      navigate("/app/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="signin">
      <section className="signin-panel">
        <Link to="/" className="brand">
          CUSAT <span>Hub</span>
        </Link>
        <div>
          <h1>Welcome back. Your day is already planned.</h1>
          <p>Seats, books and attendance, waiting for you.</p>
        </div>
      </section>
      <section className="signin-form">
        <form onSubmit={submit}>
          <h2>Sign in</h2>
          <p className="muted">Use your university details to continue.</p>
          <FormField
            label="Register number or CUSAT email"
            name="identifier"
            required
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            required
            error={error}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="signin-options">
            <label>
              <input
                type="checkbox"
                checked={form.keep}
                onChange={(e) => setForm({ ...form, keep: e.target.checked })}
              />{" "}
              Keep me signed in
            </label>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault()
                showToast("Contact the campus help desk to reset your password")
              }}
            >
              Forgot password?
            </a>
          </div>
          <button
            className="button button-primary button-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <button
            type="button"
            className="button button-secondary button-full"
            onClick={() => showToast("Coming soon")}
          >
            Continue with CUSAT ID
          </button>
          <p className="form-footer">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </section>
    </div>
  )
}
