import type { CoreClient } from "../../../client";
import type { CreateStoreInput, CreateStoreResponse } from "../index";

export async function createStore(
  core: CoreClient,
  input: CreateStoreInput,
): Promise<CreateStoreResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.post<CreateStoreResponse>("/stores", input);

  return data;
}
