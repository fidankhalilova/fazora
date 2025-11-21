export interface HouseImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface House {
  id: number;
  documentId: string;
  name: string;
  price: number;
  location: string;
  bedroom: number;
  bathroom: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: HouseImage;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Booking Dates
export interface BookingDate {
  startDate: Date;
  endDate: Date;
}

export interface BookingRequest {
  houseId: number;
  houseName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  children: number;
  totalPrice: number;
}

export interface UserBooking {
  id: string;
  houseId: number;
  houseName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
}

export interface LoginForm {
  identifier: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}
