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
    id: string;
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
