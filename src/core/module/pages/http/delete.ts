import type { CoreClient } from "../../../client";

/**
 * Resposta do endpoint de exclusão de página.
 */
type DeletePageResponse = {
  status: boolean;
  code: string;
};

/**
 * Remove a página publicada referente ao `domain` informado.
 *
 * Executa uma requisição `DELETE /pages/:domain`. Este endpoint é privado e
 * exige que o `CoreClient` esteja configurado em modo privado (backend).
 *
 * @param core - Instância do `CoreClient` (deve ser private).
 * @param domain - Domínio da página a remover (ex.: "minhaloja.com.br").
 * @returns Promise que resolve com `{ status, code }` retornado pela API.
 *
 * @throws {Error} Se `core.isPrivate()` for falso (tentativa de uso no navegador)
 * ou se a API retornar erro/HTTP failure.
 *
 * @example
 * ```ts
 * await deletePage(coreClient, "loja.exemplo.com");
 * ```
 */
export async function deletePage(
  core: CoreClient,
  domain: string,
): Promise<{ status: boolean; code: string }> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeletePageResponse>(
    `/pages/${domain}`,
  );

  return data;
}
