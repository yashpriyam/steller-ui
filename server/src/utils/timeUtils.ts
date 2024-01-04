export function convertUTCtoIST(): string {
  const utcDate = new Date();
  utcDate.setHours(utcDate.getHours() + 5);
  utcDate.setMinutes(utcDate.getMinutes() + 30);
  return formatDate(utcDate);
}
export function formatDate(date: Date): string {
  return date.toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZoneName: "short",
  });
}

export function timeAfterMins(mins = 0) {
  return new Date(Date.now() + mins * 60 * 1000);
}