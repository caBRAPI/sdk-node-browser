import type { CoreClient } from "../../../client";
import type { GetStoreByIdResponse } from "../index";

export async function getStoreById(
  core: CoreClient,
  storeId: string,
): Promise<GetStoreByIdResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.get<GetStoreByIdResponse>(
    `/stores/${storeId}`,
  );

  return data;
}
