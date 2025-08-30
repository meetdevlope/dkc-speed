import { AppCardApiResponse } from "types/cms/card/card.types";
import { CardType, CustomAppCardModel } from "types/cms/component.types";

export function getAppCardListFromAPI(
  apiResponse: AppCardApiResponse,
  cardType: CardType,
): CustomAppCardModel[] {
  let cardList: CustomAppCardModel[] = [];

  switch (cardType) {
    case "brand":
      cardList = apiResponse.brandList.map((e) => ({
        cardType: cardType,
        imageUrl: e.coverImage,
        title: e.name,
        shouldRedirect: true,
        id: e._id || "",
        isAction: true,
        onClickConfig: {
          actionType: "redirect",
          value: e._id || "",
          redirectType: "brand",
        },
      }));
      break;

    case "category":
      cardList = apiResponse.categoryList.map((e) => ({
        cardType: cardType,
        imageUrl: e.imageUrl,
        title: e.name,
        shouldRedirect: true,
        isAction: true,
        id: e._id || "",
        onClickConfig: {
          actionType: "redirect",
          value: e._id,
          redirectType: "category",
        },
      }));
      break;

    case "collection":
      cardList = apiResponse.collectionList.map((e) => ({
        cardType: cardType,
        imageUrl: e.imageUrl,
        title: e.title,
        shouldRedirect: true,
        id: e.slug || "",
        isAction: true,
        onClickConfig: {
          actionType: "redirect",
          value: e._id || "",
          redirectType: "collection",
        },
      }));
      break;

    case "blog":
      cardList = apiResponse.blogList.map((e) => ({
        cardType: cardType,
        imageUrl: e.image,
        title: e.title,
        description: e.description,
        tag: "Read More",
        shouldRedirect: true,
        id: e.slug || "",
        isAction: true,
        onClickConfig: {
          actionType: "redirect",
          value: e.slug || "",
          redirectType: "blog",
        },
      }));
      break;

    default:
      break;
  }

  return cardList;
}
