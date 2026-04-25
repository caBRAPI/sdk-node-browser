import type { CoreClient } from "../../../client";
import type { DeleteWebhookInput, DeleteWebhookResponse } from "../index";

export async function deleteWebhook(
  core: CoreClient,
  storeId: string,
  input: DeleteWebhookInput,
): Promise<DeleteWebhookResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeleteWebhookResponse>(
    `/stores/${storeId}/webhooks`,
    {
      data: input,
    },
  );
  return data;
}
