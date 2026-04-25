import type { CoreClient } from "../../../client";
import type { UpdateStoreInput, UpdateStoreResponse } from "../index";

export async function updateStore(
  core: CoreClient,
  storeId: string,
  input: UpdateStoreInput,
): Promise<UpdateStoreResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<UpdateStoreResponse>(
    `/stores/${storeId}`,
    input,
  );

  return data;
}
