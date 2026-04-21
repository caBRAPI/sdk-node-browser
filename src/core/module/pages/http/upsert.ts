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
 *
 * @param core - Instância do CoreClient (modo private)
 * @param input - Dados da página
 *
 * @returns `true` se operação foi bem-sucedida
 *
 * @throws Error se usado no navegador ou se a API retornar erro
 */
export async function upsertPage(
  core: CoreClient,
  input: PageUpsertInput,
): Promise<boolean> {
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

  return data.status;
}
