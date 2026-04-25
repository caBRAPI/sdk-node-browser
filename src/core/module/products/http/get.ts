import type { CoreClient } from "../../../client";
import type { GetProductsInput, GetProductsResponse } from "../index";

export async function getProducts(
  core: CoreClient,
  storeId: string,
  input: GetProductsInput = {},
): Promise<GetProductsResponse> {
  const { data } = await core.http.get<GetProductsResponse>(
    `/stores/${storeId}/products`,
    {
      params: {
        page: input.page,
        limit: input.limit,
      },
    },
  );

  return data;
}
