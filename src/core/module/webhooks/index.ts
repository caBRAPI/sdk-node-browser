import type { CoreClient } from "../../client";
import { deleteWebhook } from "./http/delete";
import { getWebhooks } from "./http/get";
import { createWebhook } from "./http/post";

/**
 * Resposta de listagem de webhooks por loja.
 */
export type GetWebhooksResponse = {
  webhooks: string[];
  max: number;
};

/**
 * Payload para criar webhook em uma loja.
 */
export type CreateWebhookInput = {
  url: string;
};

/**
 * Resposta de criação de webhook.
 */
export type CreateWebhookResponse = {
  status: boolean;
  code: string;
  webhook: string;
};

/**
 * Payload para remover webhook de uma loja.
 */
export type DeleteWebhookInput = {
  url: string;
};

/**
 * Resposta de remoção de webhook.
 */
export type DeleteWebhookResponse = {
  status: boolean;
  code: string;
};

/**
 * Cliente de alto nível para operações de webhooks da loja.
 */
export class Webhooks {
  /**
   * @param core Cliente base da SDK.
   */
  constructor(private core: CoreClient) {}

  /**
   * Lista os webhooks cadastrados para uma loja.
   */
  get(storeId: string) {
    return getWebhooks(this.core, storeId);
  }

  /**
   * Adiciona um webhook em uma loja.
   */
  post(storeId: string, input: CreateWebhookInput) {
    return createWebhook(this.core, storeId, input);
  }

  /**
   * Remove um webhook de uma loja.
   */
  delete(storeId: string, input: DeleteWebhookInput) {
    return deleteWebhook(this.core, storeId, input);
  }
}
