import "./StatCard.css"
export default function StatCard({ label, value, children }) {
  return (
    <section className="card stat-card">
      <h2>{label}</h2>
      <strong className="stat-value">{value}</strong>
      {children}
    </section>
  )
}
