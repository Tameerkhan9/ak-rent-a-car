import { AdminShell } from "@/components/admin/AdminShell";
import { VehicleManager } from "@/components/admin/VehicleManager";
import { getVehicles } from "@/lib/data";

export default async function VehiclesAdminPage() {
  const vehicles = await getVehicles();

  return (
    <AdminShell
      title="Vehicles"
      subtitle="Add cars, update prices, and mark availability."
    >
      <VehicleManager initialVehicles={vehicles} />
    </AdminShell>
  );
}
