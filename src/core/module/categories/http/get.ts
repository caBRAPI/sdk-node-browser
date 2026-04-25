import type { CoreClient } from "../../../client";
import type { GetCategoriesInput, GetCategoriesResponse } from "../index";

export async function getCategories(
  core: CoreClient,
  storeId: string,
  input: GetCategoriesInput = {},
): Promise<GetCategoriesResponse> {
  const { data } = await core.http.get<GetCategoriesResponse>(
    `/stores/${storeId}/categories`,
    {
      params: {
        page: input.page,
        limit: input.limit,
      },
    },
  );

  return data;
}
