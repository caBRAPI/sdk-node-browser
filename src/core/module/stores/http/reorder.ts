import type { CoreClient } from "../../../client";
import type { ReorderStoresResponse } from "../index";

export async function reorderStores(
  core: CoreClient,
  storeIds: string[],
): Promise<ReorderStoresResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<ReorderStoresResponse>(
    "/stores/reorder",
    { storeIds },
  );

  return data;
}
