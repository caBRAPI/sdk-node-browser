import type { CoreClient } from "../../../client";
import type { GetWebhooksResponse } from "../index";

export async function getWebhooks(
  core: CoreClient,
  storeId: string,
): Promise<GetWebhooksResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.get<GetWebhooksResponse>(
    `/stores/${storeId}/webhooks`,
  );

  return data;
}
