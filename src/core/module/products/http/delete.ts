import type { CoreClient } from "../../../client";
import type { DeleteProductResponse } from "../index";

export async function deleteProduct(
  core: CoreClient,
  storeId: string,
  productId: string,
): Promise<DeleteProductResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeleteProductResponse>(
    `/stores/${storeId}/products/${productId}`,
  );

  return data;
}
