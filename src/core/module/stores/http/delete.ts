import type { CoreClient } from "../../../client";
import type { DeleteStoreResponse } from "../index";

export async function deleteStore(
  core: CoreClient,
  storeId: string,
): Promise<DeleteStoreResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeleteStoreResponse>(
    `/stores/${storeId}`,
  );

  return data;
}
