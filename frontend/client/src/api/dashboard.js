import { wait } from "./client"
import { notificationMocks } from "./notifications"
// TODO backend: GET /api/dashboard
export async function getDashboard() {
  await wait()
  return {
    attendance: { overall: 82, canMiss: 3 },
    reservation: {
      id: "r1",
      seatLabel: "B-4",
      floor: 2,
      building: "Central Library",
      slotStart: "2:00 PM",
      slotEnd: "6:00 PM",
      checkInBy: "2:15 PM",
      status: "reserved",
    },
    booksDue: [
      {
        loanId: "l1",
        title: "Operating Systems",
        dueDate: "Thursday",
        daysLeft: 3,
      },
      {
        loanId: "l3",
        title: "Compiler Design",
        dueDate: "23 Oct",
        daysLeft: -2,
      },
    ],
    classesToday: [
      { time: "9:00", subject: "Data Structures", status: "present" },
      { time: "11:00", subject: "Operating Systems", status: "present" },
      { time: "2:00", subject: "Database Systems", status: "upcoming" },
    ],
    alerts: notificationMocks(),
  }
}
