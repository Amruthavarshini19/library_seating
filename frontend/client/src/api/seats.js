import { wait } from "./client"
export const slots = [
  "10:00 AM - 12:00 PM",
  "12:00 - 2:00 PM",
  "2:00 - 4:00 PM",
  "4:00 - 6:00 PM",
  "6:00 - 8:00 PM",
]
// TODO backend: GET /api/seats?floor=2&date=...&slot=...
export async function getSeats({ floor = 2 }) {
  await wait()
  const rows = ["A", "B", "C", "D", "E"]
  const seats = rows.flatMap((row, r) =>
    Array.from({ length: 8 }, (_, i) => ({
      id: `F${floor}-${row}${i + 1}`,
      label: `${row}-${i + 1}`,
      row,
      status: (i + r + Number(floor)) % 3 === 0 ? "taken" : "free",
    })),
  )
  return {
    floor,
    free: floor === 2 ? 24 : seats.filter((s) => s.status === "free").length,
    total: 40,
    seats,
  }
}
