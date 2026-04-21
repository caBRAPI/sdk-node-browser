import type { CoreClient } from "../../../client";

/**
 * Representa a página retornada pela API
 */
export type Page = {
  html: string;
  template?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  store?: {
    ownerId: string;
  };
};

/**
 * Estrutura padrão da resposta da API
 */
type PageResponse = {
  status: boolean;
  data: Page;
};

/**
 * GET /pages/:domain
 *
 * Busca a página pública de uma loja pelo domínio.
 *
 * 🔓 Endpoint público (pode ser usado no navegador ou backend)
 *
 * @param core - Instância do CoreClient já configurada
 * @param domain - Domínio da loja (ex: "minhaloja.com.br")
 *
 * @returns Dados da página renderizada (HTML + metadados)
 *
 * @throws Error quando a página não existe ou a API retorna erro
 */
export async function getPage(core: CoreClient, domain: string): Promise<Page> {
  const { data } = await core.http.get<PageResponse>(`/pages/${domain}`);

  if (!data?.data) {
    throw new Error(`Page not found: ${domain}`);
  }

  return data.data;
}
