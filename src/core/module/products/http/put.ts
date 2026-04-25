import type { CoreClient } from "../../../client";
import type { UpdateProductInput, UpdateProductResponse } from "../index";

export async function updateProduct(
  core: CoreClient,
  storeId: string,
  productId: string,
  input: UpdateProductInput,
): Promise<UpdateProductResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<UpdateProductResponse>(
    `/stores/${storeId}/products/${productId}`,
    input,
  );

  return data;
}
