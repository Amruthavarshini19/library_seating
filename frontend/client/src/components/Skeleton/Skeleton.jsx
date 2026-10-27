import "./Skeleton.css"
export default function Skeleton({ lines = 4 }) {
  return (
    <div className="skeleton" aria-label="Loading" role="status">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}
