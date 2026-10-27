import { wait } from "./client"
const books = [
  {
    id: "b1",
    title: "Operating System Concepts",
    author: "Silberschatz",
    shelf: "CS-12",
    department: "Computer Science",
    semester: 5,
    availableCopies: 2,
    totalCopies: 6,
    nextReturnDate: null,
  },
  {
    id: "b2",
    title: "Database System Concepts",
    author: "Korth",
    shelf: "CS-14",
    department: "Computer Science",
    semester: 5,
    availableCopies: 0,
    totalCopies: 5,
    nextReturnDate: "4 Nov",
  },
  {
    id: "b3",
    title: "Compilers: Principles",
    author: "Aho",
    shelf: "CS-21",
    department: "Computer Science",
    semester: 5,
    availableCopies: 1,
    totalCopies: 4,
    nextReturnDate: null,
  },
  {
    id: "b4",
    title: "Computer Networks",
    author: "Tanenbaum",
    shelf: "CS-09",
    department: "Computer Science",
    semester: 5,
    availableCopies: 0,
    totalCopies: 5,
    nextReturnDate: "9 Nov",
  },
  {
    id: "b5",
    title: "Data Structures and Algorithms",
    author: "Cormen",
    shelf: "CS-03",
    department: "Computer Science",
    semester: 3,
    availableCopies: 3,
    totalCopies: 7,
    nextReturnDate: null,
  },
  {
    id: "b6",
    title: "Engineering Mathematics",
    author: "Kreyszig",
    shelf: "MA-08",
    department: "Mathematics",
    semester: 2,
    availableCopies: 1,
    totalCopies: 8,
    nextReturnDate: null,
  },
]
// TODO backend: GET /api/books/search?q=...
export async function searchBooks({ q = "", available, dept, sem }) {
  await wait()
  const term = q.toLowerCase()
  return books
    .filter(
      (b) =>
        (!term || `${b.title} ${b.author}`.toLowerCase().includes(term)) &&
        (!available || b.availableCopies > 0) &&
        (!dept || b.department === dept) &&
        (!sem || b.semester === Number(sem)),
    )
    .map((b) => ({ ...b }))
}
