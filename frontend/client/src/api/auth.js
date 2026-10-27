import { wait } from "./client"
const defaultUser = {
  id: "u-1",
  name: "Ananya Nair",
  regNo: "CUSAT2025001",
  email: "ananya@cusat.ac.in",
  department: "Computer Science",
  semester: 5,
}
// TODO backend: POST /api/auth/login
export async function login({ identifier, password }) {
  await wait()
  if (password === "wrong" || password.length < 6)
    throw { message: "Invalid register number or password", field: "password" }
  return {
    ...defaultUser,
    email: identifier.includes("@") ? identifier : defaultUser.email,
  }
}
// TODO backend: POST /api/auth/check-registration
export async function checkRegistration({ regNo }) {
  await wait()
  if (regNo === "000000")
    throw { message: "Register number not found", field: "regNo" }
  return { ok: true }
}
// TODO backend: POST /api/auth/register
export async function register(payload) {
  await wait()
  return { ...defaultUser, ...payload, id: "u-new" }
}
// TODO backend: POST /api/auth/logout
export async function logout() {
  await wait()
  return { ok: true }
}
// TODO backend: GET /api/auth/me
export async function me() {
  await wait()
  return defaultUser
}
