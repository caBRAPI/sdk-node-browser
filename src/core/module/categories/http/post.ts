import type { CoreClient } from "../../../client";
import type { CreateCategoryInput, CreateCategoryResponse } from "../index";

export async function createCategory(
  core: CoreClient,
  storeId: string,
  input: CreateCategoryInput,
): Promise<CreateCategoryResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.post<CreateCategoryResponse>(
    `/stores/${storeId}/categories`,
    input,
  );

  return data;
}
