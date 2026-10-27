import { wait } from "./client"
let loans = [
  {
    id: "l1",
    title: "Operating Systems",
    author: "Silberschatz",
    dueDate: "Thu, 29 Oct",
    daysLeft: 3,
    renewalsUsed: 1,
    fineAmount: 0,
    finePaid: false,
  },
  {
    id: "l2",
    title: "Database Systems",
    author: "Korth",
    dueDate: "Mon, 2 Nov",
    daysLeft: 7,
    renewalsUsed: 0,
    fineAmount: 0,
    finePaid: false,
  },
  {
    id: "l3",
    title: "Compiler Design",
    author: "Aho",
    dueDate: "23 Oct",
    daysLeft: -2,
    renewalsUsed: 0,
    fineAmount: 40,
    finePaid: false,
  },
  {
    id: "l4",
    title: "Computer Networks",
    author: "Tanenbaum",
    dueDate: "Fri, 6 Nov",
    daysLeft: 11,
    renewalsUsed: 0,
    fineAmount: 0,
    finePaid: false,
  },
]
// TODO backend: GET /api/loans/summary
export async function getLoanSummary() {
  await wait()
  return { borrowed: 4, dueSoon: 2, finesDue: 40 }
}
// TODO backend: GET /api/loans?status=active
export async function getLoans({ status }) {
  await wait()
  return status === "active" ? loans.map((x) => ({ ...x })) : []
}
// TODO backend: POST /api/loans/:id/renew
export async function renewLoan(id) {
  await wait()
  const loan = loans.find((x) => x.id === id)
  if (loan?.daysLeft < 0) throw { message: "Overdue books cannot be renewed" }
  loan.daysLeft += 14
  loan.dueDate = "Thu, 12 Nov"
  loan.renewalsUsed += 1
  return { ...loan }
}
// TODO backend: POST /api/loans/:id/pay-fine
export async function payFine(id) {
  await wait()
  const loan = loans.find((x) => x.id === id)
  loan.finePaid = true
  loan.fineAmount = 0
  return { ...loan }
}
// TODO backend: POST /api/books/:id/borrow
export async function borrowBook(bookId) {
  await wait()
  return { bookId, status: "borrowed" }
}
// TODO backend: POST /api/books/:id/reserve
export async function reserveBook(bookId) {
  await wait()
  return { bookId, status: "reserved" }
}
