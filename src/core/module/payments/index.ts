import type { CoreClient } from "../../client";
import { deletePayment } from "./http/delete";
import { filterPayments } from "./http/filter";
import { getPayments } from "./http/get";
import { createPayment } from "./http/post";
import { updatePayment } from "./http/put";

export type PaymentStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "REFUNDED"
  | "CHARGED_BACK"
  | "EXPIRED";

export type PaymentGateway = "MERCADOPAGO" | "EFI_BANK";
export type PaymentCreateGateway =
  | "MERCADOPAGO_SERVICE_PIX"
  | "MERCADOPAGO_SERVICE_CARD";

export type PaymentShipmentStatus =
  | "PENDING"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED";

export type PaymentSortBy =
  | "createdAt"
  | "updatedAt"
  | "price"
  | "name"
  | "email";
export type PaymentSortOrder = "asc" | "desc";

export type Payment = {
  id: string;
  uuid: string;
  status: PaymentStatus;
  name?: string;
  email?: string;
  cpf?: string | null;
  price?: number;
  gateway?: PaymentGateway;
  shipment?: PaymentShipmentStatus;
  storeId: string;
  metadata?: Record<string, unknown> | null;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type FilterPaymentsInput = {
  id?: string;
  uuid?: string;
  status?: PaymentStatus;
  name?: string;
  email?: string;
  cpf?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  coupon?: boolean;
  gateway?: PaymentGateway;
  shipment?: PaymentShipmentStatus;
  createdAtFrom?: string;
  createdAtTo?: string;
  updatedAtFrom?: string;
  updatedAtTo?: string;
  productId?: string;
  metadataKey?: string;
  metadataValue?: string;
  sortBy?: PaymentSortBy;
  sortOrder?: PaymentSortOrder;
  page?: number;
  limit?: number;
};

export type FilterPaymentsResponse = {
  status: boolean;
  code: string;
  payments: Payment[];
  pagination: Pagination;
};

export type GetPaymentsInput = {
  page?: number;
  limit?: number;
};

export type GetPaymentsResponse = {
  status: boolean;
  code: string;
  payments: Payment[];
  pagination: Pagination;
};

export type CreatePaymentItemInput = {
  productId: string;
  quantity: number;
};

export type CreatePaymentInput = {
  name: string;
  email: string;
  cpf?: string;
  gateway: PaymentCreateGateway;
  coupon?: string | null;
  metadata?: Record<string, unknown>;
  items: CreatePaymentItemInput[];
};

export type CreatePaymentResponse = {
  status: boolean;
  data: {
    service: {
      type: string;
      method: string;
      payment: string;
    };
    payment: {
      uuid: string;
      url?: string;
      qr_code?: {
        image: string;
        base_64: string;
      };
    };
  };
};

export type UpdatePaymentInput = {
  shipment?: PaymentShipmentStatus;
  metadata?: Record<string, unknown>;
};

export type UpdatePaymentResponse = {
  status: boolean;
  code: string;
  payment: {
    id: string;
    status: PaymentStatus;
    shipment?: PaymentShipmentStatus;
    metadata?: Record<string, unknown> | null;
  };
};

export type DeletePaymentResponse = {
  status: boolean;
  code: string;
  message: string;
};

export class Payments {
  constructor(private core: CoreClient) {}

  get(storeId: string, input: GetPaymentsInput = {}) {
    return getPayments(this.core, storeId, input);
  }

  filter(storeId: string, input: FilterPaymentsInput = {}) {
    return filterPayments(this.core, storeId, input);
  }

  post(storeId: string, input: CreatePaymentInput) {
    return createPayment(this.core, storeId, input);
  }

  put(storeId: string, paymentId: string, input: UpdatePaymentInput) {
    return updatePayment(this.core, storeId, paymentId, input);
  }

  delete(storeId: string, paymentId: string) {
    return deletePayment(this.core, storeId, paymentId);
  }
}
