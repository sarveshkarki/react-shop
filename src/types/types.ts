export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}
export interface Review {
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  date: string;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  minimumOrderQuantity: number;
  images: string[];
  dimensions: Dimensions;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  warrantyInformation: string;
  weight: number;
  reviews: Review[];
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
