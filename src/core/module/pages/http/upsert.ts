import type { CoreClient } from "../../../client";

/**
 * Dados necessários para criar ou atualizar uma página.
 */
export type PageUpsertInput = {
  domain: string;
  html: string;
  template?: string;
};

/**
 * Resposta do endpoint de upsert.
 */
type PageUpsertResponse = {
  status: boolean;
  code: string;
};

/**
 * Cria ou atualiza a página pública associada ao `input.domain`.
 *
 * Realiza uma requisição `PUT /pages/:domain` com o corpo contendo `html` e
 * `template` (se fornecido). Este endpoint é marcado como privado — deve ser
 * usado apenas por código backend que possua credenciais privadas.
 *
 * @param core - `CoreClient` configurado (deve estar em modo privado).
 * @param input - Dados da página a persistir: `domain`, `html`, `template?`.
 * @returns Promise que resolve com o objeto de resposta `{ status, code }`.
 *
 * @throws {Error} Se `core.isPrivate()` for falso (uso no navegador) ou se a
 * requisição HTTP falhar.
 *
 * @example
 * ```ts
 * await upsertPage(coreClient, {
 *   domain: "loja.exemplo.com",
 *   html: "<html>...",
 *   template: "landing-v2",
 * });
 * ```
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
