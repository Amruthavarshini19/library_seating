import { wait } from "./client"
const profile = {
  id: "u1",
  name: "Ananya Nair",
  regNo: "CUSAT2025001",
  email: "ananya@cusat.ac.in",
  department: "Computer Science",
  semester: 5,
  preferences: { email: true, push: true },
}
// TODO backend: GET /api/users/me
export async function getProfile() {
  await wait()
  return { ...profile }
}
// TODO backend: PATCH /api/users/me
export async function updateProfile(payload) {
  await wait()
  Object.assign(profile, payload)
  return { ...profile }
}
// TODO backend: GET /api/users/me/stats
export async function getStats() {
  await wait()
  return {
    seatsBookedThisMonth: 8,
    noShows: 0,
    onTimeReturns: 12,
    finesPaid: 80,
  }
}
// TODO backend: PATCH /api/users/me/preferences
export async function updatePreferences(prefs) {
  await wait()
  profile.preferences = { ...profile.preferences, ...prefs }
  return profile.preferences
}
// TODO backend: POST /api/users/me/change-password
export async function changePassword() {
  await wait()
  return { ok: true }
}
