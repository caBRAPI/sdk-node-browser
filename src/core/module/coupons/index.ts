import type { CoreClient } from "../../client";
import { deleteCoupon } from "./http/delete";
import { getCoupons } from "./http/get";
import { getCouponByCode } from "./http/get-by-code";
import { getCouponById } from "./http/get-by-id";
import { createCoupon } from "./http/post";
import { updateCoupon } from "./http/put";
import { reorderCoupons } from "./http/reorder";

export type CouponRelationRef = {
  id: string;
  name: string;
};

export type Coupon = {
  id: string;
  code: string;
  position: number;
  discount: number;
  useLimit: number;
  expiredAt: string | null;
  storeId?: string;
  products: CouponRelationRef[];
  categories: CouponRelationRef[];
  createdAt?: string;
  updatedAt?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetCouponsInput = {
  page?: number;
  limit?: number;
};

export type CreateCouponInput = {
  code: string;
  discount: number;
  useLimit?: number | null;
  expiredAt?: string | null;
  productIds?: string[];
  categoryIds?: string[];
};

export type UpdateCouponInput = {
  code?: string;
  discount?: number;
  position?: number;
  useLimit?: number | null;
  expiredAt?: string | null;
  productIds?: string[];
  categoryIds?: string[];
};

export type GetCouponsResponse = {
  status: boolean;
  code: string;
  coupons: Coupon[];
  pagination: Pagination;
};

export type GetCouponByCodeResponse = {
  status: boolean;
  code: string;
  coupon: Coupon;
};

export type GetCouponByIdResponse = {
  status: boolean;
  code: string;
  coupon: Coupon;
};

export type CreateCouponResponse = {
  status: boolean;
  code: string;
  coupon: Coupon;
};

export type UpdateCouponResponse = {
  status: boolean;
  code: string;
  coupon: Coupon;
};

export type DeleteCouponResponse = {
  status: boolean;
  code: string;
};

export type ReorderCouponsResponse = {
  status: boolean;
  code: string;
};

export class Coupons {
  constructor(private core: CoreClient) {}

  get(storeId: string, input: GetCouponsInput = {}) {
    return getCoupons(this.core, storeId, input);
  }

  getByCode(storeId: string, code: string) {
    return getCouponByCode(this.core, storeId, code);
  }

  getById(storeId: string, couponId: string) {
    return getCouponById(this.core, storeId, couponId);
  }

  post(storeId: string, input: CreateCouponInput) {
    return createCoupon(this.core, storeId, input);
  }

  put(storeId: string, couponId: string, input: UpdateCouponInput) {
    return updateCoupon(this.core, storeId, couponId, input);
  }

  delete(storeId: string, couponId: string) {
    return deleteCoupon(this.core, storeId, couponId);
  }

  reorder(storeId: string, couponIds: string[]) {
    return reorderCoupons(this.core, storeId, couponIds);
  }
}
