import type { CoreClient } from "../../../client";
import type { ReorderCategoriesResponse } from "../index";

export async function reorderCategories(
  core: CoreClient,
  storeId: string,
  categoryIds: string[],
): Promise<ReorderCategoriesResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<ReorderCategoriesResponse>(
    `/stores/${storeId}/categories/reorder`,
    { categoryIds },
  );

  return data;
}
