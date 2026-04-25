import type { CoreClient } from "../../../client";
import type { CreateWebhookInput, CreateWebhookResponse } from "../index";

export async function createWebhook(
  core: CoreClient,
  storeId: string,
  input: CreateWebhookInput,
): Promise<CreateWebhookResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.post<CreateWebhookResponse>(
    `/stores/${storeId}/webhooks`,
    input,
  );

  return data;
}
