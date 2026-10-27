import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { searchBooks } from "../../api/books"
import { borrowBook, reserveBook } from "../../api/loans"
import useAsync from "../../hooks/useAsync"
import { useToast } from "../../context/ToastContext"
import TopHeader from "../../components/TopHeader/TopHeader"
import Chip from "../../components/Chip/Chip"
import DataRow from "../../components/DataRow/DataRow"
import EmptyState from "../../components/EmptyState/EmptyState"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import "./Catalogue.css"
const filters = [
  ["All", "all"],
  ["Available now", "available"],
  ["My department", "dept"],
  ["This semester", "sem"],
]
export default function Catalogue() {
  const [input, setInput] = useState("")
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [changed, setChanged] = useState({})
  const { showToast } = useToast()
  useEffect(() => {
    const timer = setTimeout(() => setQuery(input), 300)
    return () => clearTimeout(timer)
  }, [input])
  const results = useAsync(
    () =>
      searchBooks({
        q: query,
        available: filter === "available",
        dept: filter === "dept" ? "Computer Science" : null,
        sem: filter === "sem" ? 5 : null,
      }),
    [query, filter],
  )
  const act = async (book) => {
    if (book.availableCopies > 0) {
      await borrowBook(book.id)
      showToast(`${book.title} borrowed`)
    } else {
      await reserveBook(book.id)
      showToast(`${book.title} reserved`)
    }
    setChanged({ ...changed, [book.id]: true })
  }
  return (
    <>
      <TopHeader
        title="Book catalogue"
        subtitle="Search by title, author or ISBN"
        action={
          <Link className="button button-secondary" to="/app/books">
            My books
          </Link>
        }
      />
      <section className="card catalogue-search">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setQuery(input)
          }}
        >
          <label htmlFor="catalogue-search" className="sr-only">
            Search books
          </label>
          <input
            id="catalogue-search"
            type="search"
            placeholder="Search title, author or ISBN"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="button button-primary">Search</button>
        </form>
        <div className="filter-row">
          {filters.map(([label, value]) => (
            <button
              key={value}
              className={`filter-chip ${filter === value ? "active" : ""}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>
      <section className="card catalogue-results">
        {results.loading ? (
          <Skeleton lines={10} />
        ) : results.error ? (
          <ErrorState
            message={results.error.message}
            onRetry={results.refetch}
          />
        ) : results.data.length ? (
          <>
            <h2>{results.data.length} results</h2>
            {results.data.map((book) => (
              <DataRow key={book.id}>
                <div className="book-result">
                  <strong>{book.title}</strong>
                  <span>{book.author}</span>
                </div>
                <span className="shelf">Shelf {book.shelf}</span>
                <Chip variant={book.availableCopies ? "ok" : "warn"}>
                  {book.availableCopies
                    ? `${book.availableCopies} copies free`
                    : `All out · back ${book.nextReturnDate}`}
                </Chip>
                <button
                  className="button button-secondary"
                  disabled={changed[book.id]}
                  onClick={() => act(book)}
                >
                  {changed[book.id]
                    ? "Done"
                    : book.availableCopies
                      ? "Borrow"
                      : "Reserve"}
                </button>
              </DataRow>
            ))}
          </>
        ) : (
          <EmptyState
            title="No books found"
            message="Try another title, author or keyword."
          />
        )}
      </section>
    </>
  )
}
