import type { CoreClient } from "../../../client";
import type { DeleteCategoryResponse } from "../index";

export async function deleteCategory(
  core: CoreClient,
  storeId: string,
  categoryId: string,
): Promise<DeleteCategoryResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeleteCategoryResponse>(
    `/stores/${storeId}/categories/${categoryId}`,
  );

  return data;
}
