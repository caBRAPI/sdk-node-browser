import type { CoreClient } from "../../../client";
import type { UpdateCategoryInput, UpdateCategoryResponse } from "../index";

export async function updateCategory(
  core: CoreClient,
  storeId: string,
  categoryId: string,
  input: UpdateCategoryInput,
): Promise<UpdateCategoryResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<UpdateCategoryResponse>(
    `/stores/${storeId}/categories/${categoryId}`,
    input,
  );

  return data;
}
