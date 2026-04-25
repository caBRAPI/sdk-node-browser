import type { CoreClient } from "../../../client";
import type { DeletePaymentResponse } from "../index";

export async function deletePayment(
  core: CoreClient,
  storeId: string,
  paymentId: string,
): Promise<DeletePaymentResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeletePaymentResponse>(
    `/stores/${storeId}/payments/${paymentId}`,
  );

  return data;
}
