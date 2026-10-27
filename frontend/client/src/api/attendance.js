import { wait } from "./client"
// TODO backend: GET /api/attendance/summary
export async function getAttendanceSummary() {
  await wait()
  return {
    threshold: 75,
    overall: { attended: 102, total: 127 },
    subjects: [
      { id: "s1", name: "Data Structures", attended: 19, total: 25 },
      { id: "s2", name: "Operating Systems", attended: 22, total: 25 },
      { id: "s3", name: "Database Systems", attended: 21, total: 26 },
      { id: "s4", name: "Computer Networks", attended: 17, total: 24 },
      { id: "s5", name: "Compiler Design", attended: 23, total: 27 },
    ],
  }
}
