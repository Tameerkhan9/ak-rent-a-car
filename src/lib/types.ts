export type VehicleCategory = "economy" | "sedan" | "suv" | "pickup";

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year: number;
  color: string;
  category: VehicleCategory;
  seats: number;
  transmission: "automatic" | "manual";
  fuel: string;
  pricePerDay: number;
  image: string;
  available: boolean;
  description: string;
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  totalDays: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}
