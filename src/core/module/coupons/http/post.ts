import type { CoreClient } from "../../../client";
import type { CreateCouponInput, CreateCouponResponse } from "../index";

export async function createCoupon(
  core: CoreClient,
  storeId: string,
  input: CreateCouponInput,
): Promise<CreateCouponResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.post<CreateCouponResponse>(
    `/stores/${storeId}/coupons`,
    input,
  );

  return data;
}
