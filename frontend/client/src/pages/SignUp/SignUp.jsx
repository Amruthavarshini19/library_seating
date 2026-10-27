import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import FormField from "../../components/FormField/FormField"
import * as authApi from "../../api/auth"
import { useAuth } from "../../context/AuthContext"
import "./SignUp.css"
const initial = {
  name: "",
  regNo: "",
  email: "",
  password: "",
  confirm: "",
  department: "Computer Science",
  semester: "5",
  rollNo: "",
  agree: false,
}
export default function SignUp() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  if (user) return <Navigate to="/app/dashboard" replace />
  const field = (name) => ({
    value: form[name],
    onChange: (e) => setForm({ ...form, [name]: e.target.value }),
    error: errors[name],
  })
  const next = async () => {
    const nextErrors = {}
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      nextErrors.email = "Enter a valid email address"
    if (form.password.length < 8)
      nextErrors.password = "Use at least 8 characters"
    if (form.password !== form.confirm)
      nextErrors.confirm = "Passwords do not match"
    if (!form.name) nextErrors.name = "Full name is required"
    if (!form.regNo) nextErrors.regNo = "Register number is required"
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setLoading(true)
    try {
      await authApi.checkRegistration(form)
      setStep(2)
    } catch (error) {
      setErrors({ [error.field || "regNo"]: error.message })
    } finally {
      setLoading(false)
    }
  }
  const submit = async (e) => {
    e.preventDefault()
    if (!form.agree) return setErrors({ agree: "You must agree to continue" })
    setLoading(true)
    try {
      await register(form)
      navigate("/app/dashboard")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="signup-page">
      <form className="signup-card card" onSubmit={submit}>
        <div className="stepper">
          <span className={step === 1 ? "active" : ""}>
            1 <b>Account</b>
          </span>
          <i />
          <span className={step === 2 ? "active" : ""}>
            2 <b>Academic details</b>
          </span>
        </div>
        <h1>Create your account</h1>
        {step === 1 ? (
          <>
            <div className="field-row">
              <FormField
                label="Full name"
                name="name"
                required
                {...field("name")}
              />
              <FormField
                label="Register number"
                name="regNo"
                required
                {...field("regNo")}
              />
            </div>
            <FormField
              label="CUSAT email"
              name="email"
              type="email"
              required
              {...field("email")}
            />
            <div className="field-row">
              <FormField
                label="Password"
                name="password"
                type="password"
                required
                {...field("password")}
              />
              <FormField
                label="Confirm password"
                name="confirm"
                type="password"
                required
                {...field("confirm")}
              />
            </div>
            <button
              type="button"
              className="button button-primary button-full"
              onClick={next}
              disabled={loading}
            >
              {loading ? "Checking..." : "Next"}
            </button>
          </>
        ) : (
          <>
            <div className="field-row">
              <FormField
                label="Department"
                name="department"
                as="select"
                {...field("department")}
              >
                <option>Computer Science</option>
                <option>Engineering</option>
                <option>Mathematics</option>
              </FormField>
              <FormField
                label="Semester"
                name="semester"
                as="select"
                {...field("semester")}
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </FormField>
            </div>
            <FormField
              label="Roll or ID card number"
              name="rollNo"
              required
              {...field("rollNo")}
            />
            <label className="rules">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              />{" "}
              I agree to the library seat and fine rules
            </label>
            {errors.agree && <p className="field-error">{errors.agree}</p>}
            <div className="form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button className="button button-primary" disabled={loading}>
                {loading ? "Creating..." : "Create account"}
              </button>
            </div>
          </>
        )}
        <p className="form-footer">
          Already registered? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
