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

  /**
   * Descriptografa e valida o payload recebido no webhook de assinatura.
   *
   * Espera um payload no formato `iv:encrypted` (ambos em base64), criptografado
   * com AES-256-CBC usando a chave informada.
   */
  async decrypty(
    secret: string,
    payload: string,
  ): Promise<Record<string, unknown>> {
    if (!secret) {
      throw new Error("SECRET_KEY_REQUIRED");
    }

    if (!payload || typeof payload !== "string") {
      throw new Error("INVALID_PAYLOAD_FORMAT");
    }

    const [ivB64, encrypted] = payload.split(":");
    if (!ivB64 || !encrypted) {
      throw new Error("INVALID_PAYLOAD_FORMAT");
    }

    const iv = base64ToBytes(ivB64);
    const encryptedBytes = base64ToBytes(encrypted);
    const secretBytes = new TextEncoder().encode(secret);

    const keyHash = await globalThis.crypto.subtle.digest(
      "SHA-256",
      secretBytes,
    );
    const cryptoKey = await globalThis.crypto.subtle.importKey(
      "raw",
      keyHash,
      { name: "AES-CBC" },
      false,
      ["decrypt"],
    );
    const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: toArrayBuffer(iv) },
      cryptoKey,
      toArrayBuffer(encryptedBytes),
    );
    const decrypted = new TextDecoder().decode(decryptedBuffer);

    return JSON.parse(decrypted) as Record<string, unknown>;
  }

  /**
   * Alias com nome corrigido para descriptografar payload de webhook.
   */
  async decrypt(
    secret: string,
    payload: string,
  ): Promise<Record<string, unknown>> {
    return this.decrypty(secret, payload);
  }

  /**
   * Alias retrocompatível para quem já usa `parseSubscriptionPayload`.
   */
  async parseSubscriptionPayload(
    payload: string,
    secret: string,
  ): Promise<Record<string, unknown>> {
    return this.decrypty(secret, payload);
  }
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}
