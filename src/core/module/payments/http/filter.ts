import type { CoreClient } from "../../../client";
import type { FilterPaymentsInput, FilterPaymentsResponse } from "../index";

export async function filterPayments(
  core: CoreClient,
  storeId: string,
  input: FilterPaymentsInput = {},
): Promise<FilterPaymentsResponse> {
  if (!core.isPrivate()) {
    throw new Error("Método privado disponível apenas no backend.");
  }

  const { data } = await core.http.get<FilterPaymentsResponse>(
    `/stores/${storeId}/payments/filter`,
    {
      params: {
        id: input.id,
        uuid: input.uuid,
        status: input.status,
        name: input.name,
        email: input.email,
        cpf: input.cpf,
        price: input.price,
        minPrice: input.minPrice,
        maxPrice: input.maxPrice,
        coupon: input.coupon,
        gateway: input.gateway,
        shipment: input.shipment,
        createdAtFrom: input.createdAtFrom,
        createdAtTo: input.createdAtTo,
        updatedAtFrom: input.updatedAtFrom,
        updatedAtTo: input.updatedAtTo,
        productId: input.productId,
        metadataKey: input.metadataKey,
        metadataValue: input.metadataValue,
        sortBy: input.sortBy,
        sortOrder: input.sortOrder,
        page: input.page,
        limit: input.limit,
      },
    },
  );

  return data;
}
