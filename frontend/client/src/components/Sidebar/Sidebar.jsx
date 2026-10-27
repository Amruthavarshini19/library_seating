import { NavLink } from "react-router-dom"
import "./Sidebar.css"
const links = [
  ["Dashboard", "/app/dashboard"],
  ["Library seats", "/app/library"],
  ["My books", "/app/books"],
  ["Attendance", "/app/attendance"],
  ["Alerts", "/app/alerts"],
  ["Profile", "/app/profile"],
]
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-brand">
        CUSAT <span>Hub</span>
      </NavLink>
      <nav aria-label="Main navigation">
        {links.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ||
              (to === "/app/books" &&
                location.pathname.startsWith("/app/books/"))
                ? "active"
                : ""
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <p>Student portal</p>
    </aside>
  )
}
