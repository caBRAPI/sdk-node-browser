import type { CoreClient } from "../../../client";

/**
 * Resposta do endpoint de exclusão de página
 */
type DeletePageResponse = {
  status: boolean;
  code: string;
};

/**
 * DELETE /pages/:domain
 *
 * Remove a página publicada de uma loja pelo domínio.
 *
 * 🔒 Endpoint privado (somente backend)
 *
 * @param core - Instância do CoreClient (modo private)
 * @param domain - Domínio da página (ex: "minhaloja.com.br")
 *
 * @returns `true` se a exclusão foi bem-sucedida
 *
 * @throws Error se usado no navegador ou se a API retornar erro
 */
export async function deletePage(
  core: CoreClient,
  domain: string,
): Promise<boolean> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeletePageResponse>(
    `/pages/${domain}`,
  );

  return data.status;
}
