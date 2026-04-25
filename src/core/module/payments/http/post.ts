import type { CoreClient } from "../../../client";
import type { CreatePaymentInput, CreatePaymentResponse } from "../index";

export async function createPayment(
  core: CoreClient,
  storeId: string,
  input: CreatePaymentInput,
): Promise<CreatePaymentResponse> {
  const { data } = await core.http.post<CreatePaymentResponse>(
    `/stores/${storeId}/payments`,
    input,
  );

  return data;
}
