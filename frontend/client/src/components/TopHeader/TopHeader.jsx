import "./TopHeader.css"
export default function TopHeader({ title, subtitle, action }) {
  return (
    <header className="page-header top-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </header>
  )
}
