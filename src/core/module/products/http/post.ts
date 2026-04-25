import type { CoreClient } from "../../../client";
import type { CreateProductInput, CreateProductResponse } from "../index";

export async function createProduct(
  core: CoreClient,
  storeId: string,
  input: CreateProductInput,
): Promise<CreateProductResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.post<CreateProductResponse>(
    `/stores/${storeId}/products`,
    input,
  );

  return data;
}
