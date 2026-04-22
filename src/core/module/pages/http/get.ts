import type { CoreClient } from "../../../client";

/**
 * Modelo de página retornado pela API de páginas.
 *
 * Observações:
 * - Campos `createdAt` e `updatedAt` são timestamps em ISO 8601.
 * - `version` pode ser usada pelo servidor para controle de versão do conteúdo.
 * - `store` é metadado opcional com informações da loja proprietária.
 */
export type Page = {
  html: string;
  template?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  store?: {
    ownerId: string;
    id: string;
  };
};

/**
 * Estrutura padrão da resposta da API para operações de página.
 */
type PageResponse = {
  status: boolean;
  data: Page;
};

/**
 * Recupera a `Page` publicada para o `domain` informado.
 *
 * Faz uma chamada `GET /pages/:domain` usando o `CoreClient` fornecido.
 *
 * @param core - Instância de `CoreClient` que executa requisições HTTP.
 * @param domain - Domínio da página a ser recuperada (ex.: "minha-loja.com").
 * @returns Promise que resolve com um objeto contendo `status` e `data` (`Page`).
 *
 * @throws {Error} Se a resposta não contiver `data` (página não encontrada) ou se
 * houver erro de rede/HTTP lançado pelo `core.http`.
 *
 * @example
 * ```ts
 * const page = await getPage(coreClient, "loja.exemplo.com");
 * console.log(page.data.html);
 * ```
 */
export async function getPage(
  core: CoreClient,
  domain: string,
): Promise<{ status: boolean; data: Page }> {
  const { data } = await core.http.get<PageResponse>(`/pages/${domain}`);

  if (!data?.data) {
    throw new Error(`Page not found: ${domain}`);
  }

  return {
    status: data.status,
    data: data.data,
  };
}
