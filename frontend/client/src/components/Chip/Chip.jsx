import "./Chip.css"
export default function Chip({ variant = "ok", children }) {
  return <span className={`chip chip-${variant}`}>{children}</span>
}
