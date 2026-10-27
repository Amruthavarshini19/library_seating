import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Sidebar from "../components/Sidebar/Sidebar"
import "./AppLayout.css"
export function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/signin" replace />
}
export default function AppLayout() {
  return (
    <ProtectedRoute>
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </ProtectedRoute>
  )
}
