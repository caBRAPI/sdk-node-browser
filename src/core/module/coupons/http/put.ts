import type { CoreClient } from "../../../client";
import type { UpdateCouponInput, UpdateCouponResponse } from "../index";

export async function updateCoupon(
  core: CoreClient,
  storeId: string,
  couponId: string,
  input: UpdateCouponInput,
): Promise<UpdateCouponResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<UpdateCouponResponse>(
    `/stores/${storeId}/coupons/${couponId}`,
    input,
  );

  return data;
}
