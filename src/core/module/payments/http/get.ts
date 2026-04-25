import type { CoreClient } from "../../../client";
import type { GetPaymentsInput, GetPaymentsResponse } from "../index";

export async function getPayments(
  core: CoreClient,
  storeId: string,
  input: GetPaymentsInput = {},
): Promise<GetPaymentsResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.get<GetPaymentsResponse>(
    `/stores/${storeId}/payments`,
    {
      params: {
        page: input.page,
        limit: input.limit,
      },
    },
  );

  return data;
}
