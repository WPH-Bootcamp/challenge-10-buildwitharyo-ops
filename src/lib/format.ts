/** Formats a number as Rupiah, e.g. 50000 -> "Rp50.000". */
export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
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
