export default function parseDate(date: Date) {
  const dateStr = date.toLocaleString();
  return new Date(dateStr);
}