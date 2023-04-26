export function getEnding(num) {
  if (num === 0 || (5 <= num && num < 21)) return "ов";
  if (num === 1) return "";
  if (2 <= num && num < 5) return "а";
  return "";
}
