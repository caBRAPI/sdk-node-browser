import type { CoreClient } from "../../../client";
import type { ReorderProductsResponse } from "../index";

export async function reorderProducts(
  core: CoreClient,
  storeId: string,
  productIds: string[],
): Promise<ReorderProductsResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<ReorderProductsResponse>(
    `/stores/${storeId}/products/reorder`,
    { productIds },
  );

  return data;
}
