import type { CoreClient } from "../../../client";
import type { DeleteCouponResponse } from "../index";

export async function deleteCoupon(
  core: CoreClient,
  storeId: string,
  couponId: string,
): Promise<DeleteCouponResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.delete<DeleteCouponResponse>(
    `/stores/${storeId}/coupons/${couponId}`,
  );

  return data;
}
