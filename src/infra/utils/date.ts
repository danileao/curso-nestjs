export function startOfDay() {
  const startDay = new Date();
  startDay.setUTCHours(0, 0, 0, 0);
  return startDay;
}

export function endOfDay() {
  const endDay = new Date();
  endDay.setUTCHours(23, 59, 59, 999);
  return endDay;
}
