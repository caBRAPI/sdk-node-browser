import type { CoreClient } from "../../../client";
import type { GetProductByIdResponse } from "../index";

export async function getProductById(
  core: CoreClient,
  storeId: string,
  productId: string,
): Promise<GetProductByIdResponse> {
  const { data } = await core.http.get<GetProductByIdResponse>(
    `/stores/${storeId}/products/${productId}`,
  );

  return data;
}
