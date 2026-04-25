import type { CoreClient } from "../../../client";
import type { GetCouponByIdResponse } from "../index";

export async function getCouponById(
  core: CoreClient,
  storeId: string,
  couponId: string,
): Promise<GetCouponByIdResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.get<GetCouponByIdResponse>(
    `/stores/${storeId}/coupons/uuid/${couponId}`,
  );

  return data;
}
