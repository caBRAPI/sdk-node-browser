import type { CoreClient } from "../../../client";
import type { GetStoresInput, GetStoresResponse } from "../index";

export async function getStores(
  core: CoreClient,
  input: GetStoresInput = {},
): Promise<GetStoresResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.get<GetStoresResponse>("/stores", {
    params: {
      page: input.page,
      limit: input.limit,
    },
  });

  return data;
}
