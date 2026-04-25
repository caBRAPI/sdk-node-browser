import type { CoreClient } from "../../client";
import { deleteCategory } from "./http/delete";
import { getCategories } from "./http/get";
import { getCategoryById } from "./http/get-by-id";
import { createCategory } from "./http/post";
import { updateCategory } from "./http/put";
import { reorderCategories } from "./http/reorder";

export type Category = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  metadata: Record<string, unknown> | null;
  position: number;
  storeId: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryDetails = Category & {
  products?: unknown[];
  coupons?: unknown[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetCategoriesInput = {
  page?: number;
  limit?: number;
};

export type CreateCategoryInput = {
  name?: string;
  description?: string | null;
  image?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type UpdateCategoryInput = {
  name?: string;
  description?: string | null;
  image?: string | null;
  metadata?: Record<string, unknown> | null;
  position?: number;
};

export type GetCategoriesResponse = {
  status: boolean;
  code: string;
  categories: Category[];
  pagination: Pagination;
};

export type GetCategoryByIdResponse = {
  status: boolean;
  code: string;
  category: CategoryDetails;
};

export type CreateCategoryResponse = {
  status: boolean;
  code?: string;
  category: Category;
};

export type UpdateCategoryResponse = {
  status: boolean;
  code: string;
  category: Category;
};

export type DeleteCategoryResponse = {
  status: boolean;
  code: string;
};

export type ReorderCategoriesResponse = {
  status: boolean;
  code: string;
};

export class Categories {
  constructor(private core: CoreClient) {}

  get(storeId: string, input: GetCategoriesInput = {}) {
    return getCategories(this.core, storeId, input);
  }

  getById(storeId: string, categoryId: string) {
    return getCategoryById(this.core, storeId, categoryId);
  }

  post(storeId: string, input: CreateCategoryInput) {
    return createCategory(this.core, storeId, input);
  }

  put(storeId: string, categoryId: string, input: UpdateCategoryInput) {
    return updateCategory(this.core, storeId, categoryId, input);
  }

  delete(storeId: string, categoryId: string) {
    return deleteCategory(this.core, storeId, categoryId);
  }

  reorder(storeId: string, categoryIds: string[]) {
    return reorderCategories(this.core, storeId, categoryIds);
  }
}
