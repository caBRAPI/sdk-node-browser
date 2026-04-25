import type { CoreClient } from "../../../client";
import type { GetCategoryByIdResponse } from "../index";

export async function getCategoryById(
  core: CoreClient,
  storeId: string,
  categoryId: string,
): Promise<GetCategoryByIdResponse> {
  const { data } = await core.http.get<GetCategoryByIdResponse>(
    `/stores/${storeId}/categories/${categoryId}`,
  );

  return data;
}
