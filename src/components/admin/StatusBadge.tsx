import type { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
  pending: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30",
  confirmed: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30",
  completed: "bg-sky-400/15 text-sky-300 ring-1 ring-sky-400/30",
  cancelled: "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/30",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}
