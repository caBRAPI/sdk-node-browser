import type { CoreClient } from "../../../client";
import type { ReorderCouponsResponse } from "../index";

export async function reorderCoupons(
  core: CoreClient,
  storeId: string,
  couponIds: string[],
): Promise<ReorderCouponsResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.put<ReorderCouponsResponse>(
    `/stores/${storeId}/coupons/reorder`,
    { couponIds },
  );

  return data;
}
