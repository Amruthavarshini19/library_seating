import { useEffect } from "react"
import "./Modal.css"
export default function Modal({ title, open, onClose, children }) {
  useEffect(() => {
    const close = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [onClose])
  if (!open) return null
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header>
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </header>
        {children}
      </section>
    </div>
  )
}
