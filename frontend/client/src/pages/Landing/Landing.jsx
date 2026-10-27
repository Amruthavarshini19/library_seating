import { Link } from "react-router-dom"
import "./Landing.css"
const features = [
  [
    "Reserve seats, end seat-squatting",
    "Time-boxed bookings that release automatically if you do not check in.",
  ],
  ["Never pay a late fine", "Due-date reminders and one-tap renewals."],
  ["Know where you stand", "Per-subject attendance with a what-if planner."],
]
export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <Link to="/" className="brand">
          CUSAT <span>Hub</span>
        </Link>
        <div>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <Link to="/signin">Sign in</Link>
          <Link className="button button-primary" to="/signup">
            Get started
          </Link>
        </div>
      </nav>
      <section className="hero">
        <div>
          <p className="eyebrow">Your campus day, organised</p>
          <h1>Your seat, your books, your attendance. One place.</h1>
          <p>
            Reserve a library seat, get book due reminders and see exactly how
            many classes you can still miss, all in one student dashboard.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/signup">
              Create your account
            </Link>
            <Link className="button button-secondary" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
        <div className="preview-stack" aria-label="Dashboard preview">
          <article>
            <span>Library seat</span>
            <strong>Floor 2 · B-4</strong>
            <small>Check in before the window closes</small>
          </article>
          <article>
            <span>Book due</span>
            <strong>Operating Systems</strong>
            <small>Renew before Thursday</small>
          </article>
          <article>
            <span>Attendance</span>
            <strong className="preview-number">82%</strong>
            <small>Minimum required: 75%</small>
          </article>
        </div>
      </section>
      <section className="features" id="features">
        {features.map(([title, text], i) => (
          <article key={title} className="card">
            <span className="feature-index">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="how card" id="how">
        <p className="eyebrow">How it works</p>
        <h2>Plan the day before it plans you.</h2>
        <p>
          Sign in with your campus identity, reserve a free seat, and keep books
          and attendance in view from one clear dashboard.
        </p>
        <Link className="button button-secondary" to="/signup">
          Set up your account
        </Link>
      </section>
    </div>
  )
}
