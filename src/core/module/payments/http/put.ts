import type { CoreClient } from "../../../client";
import type { UpdatePaymentInput, UpdatePaymentResponse } from "../index";

export async function updatePayment(
  core: CoreClient,
  storeId: string,
  paymentId: string,
  input: UpdatePaymentInput,
): Promise<UpdatePaymentResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<UpdatePaymentResponse>(
    `/stores/${storeId}/payments/${paymentId}`,
    input,
  );

  return data;
}
