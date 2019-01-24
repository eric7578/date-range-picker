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
