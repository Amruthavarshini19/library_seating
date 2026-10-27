import "./DataRow.css"
export default function DataRow({ children, className = "", onClick }) {
  const Tag = onClick ? "button" : "div"
  return (
    <Tag
      className={`data-row ${onClick ? "data-row-button" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </Tag>
  )
}
