export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type Category = "beauty" | "fragrances" | "furniture" | "groceries";

export type AvailabilityStatus = "In Stock" | "Low Stock";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string; // optional, e.g. missing for some groceries
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO string, parse to Date if needed
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  barcode: string;
  qrCode: string;
}
