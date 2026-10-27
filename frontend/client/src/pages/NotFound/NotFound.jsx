import { Link } from "react-router-dom"
import "./NotFound.css"
export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <p>404</p>
        <h1>Page not found</h1>
        <span>The page you requested does not exist.</span>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </div>
    </main>
  )
}
