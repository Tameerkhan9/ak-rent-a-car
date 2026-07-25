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
  /** Optional extra photos shown on the booking page */
  images?: string[];
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

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  bookingId: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  customerPhone: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
}

/** Safe fields for the public website — no phone or booking credentials */
export interface PublicReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
