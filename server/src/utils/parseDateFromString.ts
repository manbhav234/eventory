export default function parseDateFromString(dateStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}