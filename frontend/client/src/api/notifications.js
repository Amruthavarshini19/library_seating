import { wait } from "./client"
let notifications = [
  {
    id: "n1",
    type: "seat",
    message: "Check in to B-4 before 2:15 PM or it is released.",
    link: "/app/library",
    read: false,
    createdAt: "Today",
  },
  {
    id: "n2",
    type: "fine",
    message: "Compiler Design is overdue. A daily fine is running.",
    link: "/app/books",
    read: false,
    createdAt: "Today",
  },
  {
    id: "n3",
    type: "book",
    message: "Operating Systems is due Thursday.",
    link: "/app/books",
    read: false,
    createdAt: "Today",
  },
  {
    id: "n4",
    type: "class",
    message: "Computer Networks is below 75%.",
    link: "/app/attendance",
    read: true,
    createdAt: "Yesterday",
  },
]
// TODO backend: GET /api/notifications
export async function getNotifications() {
  await wait()
  return notifications.map((item) => ({ ...item }))
}
// TODO backend: PATCH /api/notifications/:id/read
export async function markRead(id) {
  await wait()
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n,
  )
  return { ok: true }
}
// TODO backend: PATCH /api/notifications/read-all
export async function markAllRead() {
  await wait()
  notifications = notifications.map((n) => ({ ...n, read: true }))
  return { ok: true }
}
export const notificationMocks = () => notifications.slice(0, 3)
