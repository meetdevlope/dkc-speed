import { AppCardApiResponse } from "types/cms/card/card.types";
import { getAppCardListFromAPI } from "utils/cmsCard";
import {
  BlogType,
  CustomAppCardModel,
  GroupViewConfig,
} from "types/cms/component.types";
import { BaseApiResponse, PaginatedResponse } from "types/baseApiTypes";
import { Product } from "types/product.types";
import { RVUtil } from "utils/recentlyViewed";
import { cookies } from "next/headers";
import { jsonParser } from "utils/helpers";
import { getProductRecommendation } from "app/(with-nav-footer)/action";
import { getToken } from "utils/getToken";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getDeviceIdClient } from "utils/getDeviceIdClient";

export const getAppCardItems = async (
  cardListModel: GroupViewConfig,
): Promise<(CustomAppCardModel | Product | BlogType)[]> => {
  try {
    const token = getToken();
    const deviceId = getDeviceId();
    const deviceIdClient = getDeviceIdClient();

    const deviceIdValue = deviceIdClient || deviceId;

    if (cardListModel.cardType === "custom") {
      return cardListModel.customCardList;
    }
    if (cardListModel.cardType === "product") {
      if (cardListModel.isRecommendedProducts) {
        const productRecommendations = await getProductRecommendation(
          deviceIdValue || "",
          token || "",
        );
        return productRecommendations || [];
      }
      const allProductIdsString = cookies().get(RVUtil.cookieName)?.value;

      const allRecentProductIds = allProductIdsString
        ? (jsonParser(allProductIdsString, "recently-viewed") as string[])
        : [];

      const skuIds = cardListModel.isRecentProducts
        ? allRecentProductIds
        : cardListModel.productOptions.map((option) => option._id);
      const query = {
        skuId: {
          $in: skuIds,
        },
      };

      const url =
        process.env.NEXT_PUBLIC_BASE_URL + `/product/inventory/query/paginated`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          query: JSON.stringify(query),
          pageSize:
            skuIds.length + 1 < cardListModel.cardLimit
              ? (skuIds.length + 1).toString()
              : cardListModel.cardLimit.toString(),
          usePagination: "true",
          currentPage: "1",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const output: BaseApiResponse<PaginatedResponse<Product>> =
        await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return output.data.data;
    }

    const ids =
      cardListModel?.cardType == "brand"
        ? cardListModel?.brandOptions?.map((e) => e._id)
        : cardListModel?.cardType == "category"
          ? cardListModel?.categoryOptions?.map((e) => e._id)
          : cardListModel?.cardType == "collection"
            ? cardListModel?.collectionOptions?.map((e) => e._id)
            : cardListModel?.cardType == "blog"
              ? cardListModel?.blogOptions?.map((e) => e._id)
              : [];

    const requestBody = {
      limit: cardListModel?.cardLimit,
      type: cardListModel?.cardType,
      query: {
        ids: ids || [],
      },
    };

    const url = process.env.NEXT_PUBLIC_BASE_URL + `/product/common/app-data`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const output: BaseApiResponse<AppCardApiResponse> = await response.json();

    if (output && output.data) {
      return getAppCardListFromAPI(output.data, cardListModel.cardType);
    }
  } catch (e) {
    console.error(
      `Error fetching app card items: ${cardListModel.cardType}`,
      e,
    );
  }

  return [];
};
