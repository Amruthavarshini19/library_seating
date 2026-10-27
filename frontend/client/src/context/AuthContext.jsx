import { createContext, useContext, useMemo, useState } from "react"
import * as authApi from "../api/auth"
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("campus_user") || "null"),
  )
  const login = async (payload) => {
    const next = await authApi.login(payload)
    localStorage.setItem("campus_user", JSON.stringify(next))
    setUser(next)
    return next
  }
  const register = async (payload) => {
    const next = await authApi.register(payload)
    localStorage.setItem("campus_user", JSON.stringify(next))
    setUser(next)
    return next
  }
  const logout = async () => {
    await authApi.logout()
    localStorage.removeItem("campus_user")
    setUser(null)
  }
  const value = useMemo(
    () => ({ user, login, register, logout, setUser }),
    [user],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
