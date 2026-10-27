import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "./context/ToastContext"
import PublicLayout from "./layouts/PublicLayout"
import AppLayout from "./layouts/AppLayout"
import Landing from "./pages/Landing/Landing"
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import Dashboard from "./pages/Dashboard/Dashboard"
import Library from "./pages/Library/Library"
import Books from "./pages/Books/Books"
import Catalogue from "./pages/Catalogue/Catalogue"
import Attendance from "./pages/Attendance/Attendance"
import Alerts from "./pages/Alerts/Alerts"
import Profile from "./pages/Profile/Profile"
import NotFound from "./pages/NotFound/NotFound"
import DevStates from "./pages/DevStates/DevStates"
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="library" element={<Library />} />
              <Route path="books" element={<Books />} />
              <Route path="books/catalogue" element={<Catalogue />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/dev/states" element={<DevStates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
