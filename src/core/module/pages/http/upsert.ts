import type { CoreClient } from "../../../client";

export type PageUpsertInput = {
  domain: string;
  html: string;
  template?: string;
};

/**
 * Resposta do endpoint de upsert
 */
type PageUpsertResponse = {
  status: boolean;
  code: string;
};

/**
 * PUT /pages/:domain
 *
 * Cria ou atualiza a página de uma loja.
 *
 * 🔒 Endpoint privado (somente backend)
 */
export async function upsertPage(
  core: CoreClient,
  input: PageUpsertInput,
): Promise<{ status: boolean; code: string }> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<PageUpsertResponse>(
    `/pages/${input.domain}`,
    {
      html: input.html,
      template: input.template,
    },
  );

  return data;
}
