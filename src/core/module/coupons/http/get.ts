import type { CoreClient } from "../../../client";
import type { GetCouponsInput, GetCouponsResponse } from "../index";

export async function getCoupons(
  core: CoreClient,
  storeId: string,
  input: GetCouponsInput = {},
): Promise<GetCouponsResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.get<GetCouponsResponse>(
    `/stores/${storeId}/coupons`,
    {
      params: {
        page: input.page,
        limit: input.limit,
      },
    },
  );

  return data;
}
