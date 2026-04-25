import type { CoreClient } from "../../client";
import { deleteProduct } from "./http/delete";
import { getProducts } from "./http/get";
import { getProductById } from "./http/get-by-id";
import { createProduct } from "./http/post";
import { updateProduct } from "./http/put";
import { reorderProducts } from "./http/reorder";

export type ProductDelivery = "DIGITAL" | "PHYSICAL";

export type ProductCategoryRef = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  disabled: boolean;
  position: number;
  description: string | null;
  price: number;
  image: string | null;
  delivery: ProductDelivery;
  stock: number;
  sold: number;
  storeId: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  categories?: ProductCategoryRef[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetProductsInput = {
  page?: number;
  limit?: number;
};

export type CreateProductInput = {
  name: string;
  image?: string | null;
  description?: string | null;
  categoryIds?: string[];
  delivery: ProductDelivery;
  price: number;
  stock?: number;
  disabled?: boolean;
  metadata?: Record<string, unknown> | null;
};

export type UpdateProductInput = {
  name?: string;
  image?: string | null;
  description?: string | null;
  categoryIds?: string[];
  delivery?: ProductDelivery;
  price?: number;
  stock?: number;
  disabled?: boolean;
  position?: number;
  metadata?: Record<string, unknown> | null;
};

export type GetProductsResponse = {
  status: boolean;
  code: string;
  products: Product[];
  pagination: Pagination;
};

export type GetProductByIdResponse = {
  status: boolean;
  code: string;
  product: Product;
};

export type CreateProductResponse = {
  status: boolean;
  code: string;
  product: Product;
};

export type UpdateProductResponse = {
  status: boolean;
  code: string;
  product: Product;
};

export type DeleteProductResponse = {
  status: boolean;
  code: string;
};

export type ReorderProductsResponse = {
  status: boolean;
  code: string;
};

export class Products {
  constructor(private core: CoreClient) {}

  get(storeId: string, input: GetProductsInput = {}) {
    return getProducts(this.core, storeId, input);
  }

  getById(storeId: string, productId: string) {
    return getProductById(this.core, storeId, productId);
  }

  post(storeId: string, input: CreateProductInput) {
    return createProduct(this.core, storeId, input);
  }

  put(storeId: string, productId: string, input: UpdateProductInput) {
    return updateProduct(this.core, storeId, productId, input);
  }

  delete(storeId: string, productId: string) {
    return deleteProduct(this.core, storeId, productId);
  }

  reorder(storeId: string, productIds: string[]) {
    return reorderProducts(this.core, storeId, productIds);
  }
}
