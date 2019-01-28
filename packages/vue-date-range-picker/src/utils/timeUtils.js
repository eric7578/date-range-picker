export function getStartOfMonth(date) {
  const clone = new Date(date);
  clone.setDate(1);
  return clone;
}

export function getStartOfWeek(date) {
  const dateOfMonday = date.getDate() - date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(dateOfMonday);
  return startOfWeek;
}

export function getStartOfDay(date) {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
}