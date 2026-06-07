/** Formats a number as Rupiah, e.g. 50000 -> "Rp50.000". */
export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}

/** Returns up to two uppercase initials from a name, e.g. "John Doe" -> "JD". */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Formats an ISO date string as "25 August 2025, 13:38". */
export function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
