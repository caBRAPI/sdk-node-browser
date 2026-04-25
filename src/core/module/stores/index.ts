import type { CoreClient } from "../../client";
import { deleteStore } from "./http/delete";
import { getStores } from "./http/get";
import { getStoreById } from "./http/get-by-id";
import { createStore } from "./http/post";
import { updateStore } from "./http/put";
import { reorderStores } from "./http/reorder";

/**
 * Templates válidos para loja.
 */
export type StoreTemplate = "PERSONALIZADO" | "N/A";

/**
 * Tipo do domínio informado no payload da loja.
 */
export type StoreDomainType = "CUSTOM" | "DEFAULT";

/**
 * Estrutura de domínio para criação/atualização.
 */
export type StoreDomainInput = {
  type: StoreDomainType;
  value: string;
};

/**
 * Modelo base de loja retornado nos endpoints de listagem e upsert.
 */
export type Store = {
  id: string;
  name: string;
  position: number;
  description: string | null;
  image: string | null;
  domain: string;
  template: StoreTemplate;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Modelo detalhado retornado por `GET /stores/:storeId`.
 */
export type StoreDetails = Store & {
  ownerId?: string;
  deletedAt?: string | null;
  categories?: unknown[];
  products?: unknown[];
  coupons?: unknown[];
  payment?: unknown[];
};

/**
 * Metadados de paginação padrão da API.
 */
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/**
 * Query params de listagem de lojas.
 */
export type GetStoresInput = {
  page?: number;
  limit?: number;
};

/**
 * Payload para criação de loja (`POST /stores`).
 */
export type CreateStoreInput = {
  template: StoreTemplate;
  name?: string;
  description?: string | null;
  image?: string | null;
  metadata?: Record<string, unknown> | null;
  domain?: StoreDomainInput | null;
  position?: number;
};

/**
 * Payload para atualização de loja (`PUT /stores/:storeId`).
 *
 * Observação: no endpoint de update, todos os campos são opcionais,
 * mas a API exige ao menos 1 campo no body.
 */
export type UpdateStoreInput = {
  template?: StoreTemplate;
  name?: string;
  description?: string | null;
  image?: string | null;
  metadata?: Record<string, unknown> | null;
  domain?: StoreDomainInput | null;
  position?: number;
};

/**
 * Resposta de listagem de lojas.
 */
export type GetStoresResponse = {
  status: boolean;
  code: string;
  stores: Store[];
  pagination: Pagination;
};

/**
 * Resposta de consulta por ID.
 */
export type GetStoreByIdResponse = {
  status: boolean;
  code: string;
  store: StoreDetails;
};

/**
 * Resposta de criação.
 */
export type CreateStoreResponse = {
  status: boolean;
  code: string;
  store: Store;
};

/**
 * Resposta de atualização.
 */
export type UpdateStoreResponse = {
  status: boolean;
  code: string;
  store: Store;
};

/**
 * Resposta de exclusão.
 */
export type DeleteStoreResponse = {
  status: boolean;
  code: string;
};

/**
 * Resposta de reordenação.
 */
export type ReorderStoresResponse = {
  status: boolean;
  code: string;
};

/**
 * Cliente de alto nível para operações do módulo de lojas.
 */
export class Stores {
  /**
   * @param core Cliente base da SDK.
   */
  constructor(private core: CoreClient) {}

  /**
   * Lista lojas da conta com suporte a paginação.
   */
  get(input: GetStoresInput = {}) {
    return getStores(this.core, input);
  }

  /**
   * Busca uma loja pelo ID.
   */
  getById(storeId: string) {
    return getStoreById(this.core, storeId);
  }

  /**
   * Cria uma nova loja.
   */
  post(input: CreateStoreInput) {
    return createStore(this.core, input);
  }

  /**
   * Atualiza uma loja existente.
   */
  put(storeId: string, input: UpdateStoreInput) {
    return updateStore(this.core, storeId, input);
  }

  /**
   * Exclui uma loja pelo ID.
   */
  delete(storeId: string) {
    return deleteStore(this.core, storeId);
  }

  /**
   * Reordena lojas pelo array final de IDs.
   */
  reorder(storeIds: string[]) {
    return reorderStores(this.core, storeIds);
  }
}
