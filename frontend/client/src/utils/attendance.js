export const percent = (a, t) => (t ? (a / t) * 100 : 0)
export const canMiss = (a, t) => Math.max(0, Math.floor(a / 0.75 - t))
export const mustAttend = (a, t) =>
  percent(a, t) < 75 ? Math.ceil(3 * t - 4 * a) : 0
export const afterSkipping = (a, t, n) => (a / (t + n)) * 100
export function statusChip(a, t) {
  if (percent(a, t) < 75)
    return { variant: "danger", label: `Attend next ${mustAttend(a, t)}` }
  const count = canMiss(a, t)
  return count === 0
    ? { variant: "warn", label: "Cannot miss any" }
    : { variant: "ok", label: `Can miss ${count}` }
}
