import { wait } from "./client"
let reservation = {
  id: "r1",
  seatLabel: "B-4",
  floor: 2,
  building: "Central Library",
  slotStart: "2:00 PM",
  slotEnd: "6:00 PM",
  checkInBy: "2:15 PM",
  status: "reserved",
}
// TODO backend: GET /api/reservations/current
export async function getCurrentReservation() {
  await wait()
  return reservation
}
// TODO backend: POST /api/reservations
export async function createReservation({ seatId, date, slot }) {
  await wait()
  if (seatId.endsWith("A1")) throw { message: "Someone just took this seat" }
  reservation = {
    id: `r-${Date.now()}`,
    seatLabel: seatId
      .split("-")
      .at(-1)
      .replace(/([A-E])/, "$1-"),
    floor: 2,
    building: "Central Library",
    slotStart: slot.split(" - ")[0],
    slotEnd: slot.split(" - ")[1],
    checkInBy: "15 minutes after start",
    status: "reserved",
    date,
  }
  return reservation
}
// TODO backend: DELETE /api/reservations/:id
export async function cancelReservation() {
  await wait()
  reservation = null
  return { ok: true }
}
// TODO backend: POST /api/reservations/:id/check-in
export async function checkIn() {
  await wait()
  if (reservation) reservation.status = "checked-in"
  return { status: "checked-in" }
}
