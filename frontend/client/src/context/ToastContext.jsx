import { createContext, useContext, useState } from "react"
import Toast from "../components/Toast/Toast"
const ToastContext = createContext(null)
export function ToastProvider({ children }) {
  const [message, setMessage] = useState("")
  const showToast = (text) => {
    setMessage(text)
    window.setTimeout(() => setMessage(""), 3200)
  }
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} onClose={() => setMessage("")} />
    </ToastContext.Provider>
  )
}
export const useToast = () => useContext(ToastContext)
