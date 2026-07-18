import { AdminShell } from "@/components/admin/AdminShell";
import { BookingActions } from "@/components/admin/BookingActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getBookings } from "@/lib/data";
import { formatPKR } from "@/lib/format";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <AdminShell
      title="Bookings"
      subtitle="Review every reservation and update its status."
    >
      {bookings.length === 0 ? (
        <div className="border border-dashed border-white/15 px-6 py-16 text-center text-steel">
          No bookings yet. They will appear here when customers reserve cars.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <article
              key={b.id}
              className="border border-white/10 bg-ink-soft/70 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-[family-name:var(--font-syne)] text-xl font-bold text-white">
                    {b.vehicleName}
                  </h2>
                  <p className="mt-1 text-sm text-steel">
                    Booked {new Date(b.createdAt).toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <p>
                  <span className="text-steel">Customer: </span>
                  <span className="text-fog">{b.customerName}</span>
                </p>
                <p>
                  <span className="text-steel">Email: </span>
                  <a
                    href={`mailto:${b.customerEmail}`}
                    className="text-copper hover:text-copper-bright"
                  >
                    {b.customerEmail}
                  </a>
                </p>
                <p>
                  <span className="text-steel">Phone: </span>
                  <span className="text-fog">{b.customerPhone}</span>
                </p>
                <p>
                  <span className="text-steel">Pickup: </span>
                  <span className="text-fog">{b.pickupDate}</span>
                </p>
                <p>
                  <span className="text-steel">Return: </span>
                  <span className="text-fog">{b.returnDate}</span>
                </p>
                <p>
                  <span className="text-steel">Location: </span>
                  <span className="text-fog">{b.pickupLocation}</span>
                </p>
                <p>
                  <span className="text-steel">Days: </span>
                  <span className="text-fog">{b.totalDays}</span>
                </p>
                <p>
                  <span className="text-steel">Total: </span>
                  <span className="text-fog">{formatPKR(b.totalPrice)}</span>
                </p>
              </div>

              {b.notes && (
                <p className="mt-3 text-sm text-steel">Notes: {b.notes}</p>
              )}
              <BookingActions id={b.id} status={b.status} />
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
