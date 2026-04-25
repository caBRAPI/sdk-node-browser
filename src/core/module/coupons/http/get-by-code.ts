import type { CoreClient } from "../../../client";
import type { GetCouponByCodeResponse } from "../index";

export async function getCouponByCode(
  core: CoreClient,
  storeId: string,
  code: string,
): Promise<GetCouponByCodeResponse> {
  const { data } = await core.http.get<GetCouponByCodeResponse>(
    `/stores/${storeId}/coupons/${code}`,
  );

  return data;
}
