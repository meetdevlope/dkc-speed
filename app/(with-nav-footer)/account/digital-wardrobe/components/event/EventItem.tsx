import { getProductDetails } from "app/(with-nav-footer)/products/[slug]/action";
import { ImageComponent } from "components/image-component/ImageComponent";
import dayjs from "dayjs";
import React from "react";
import { getToken } from "utils/getToken";
import { EventJournal } from "../../action";
import ViewEvent from "./ViewEvent";
import { getFamilyMemberDetails } from "../../family-member/[id]/actions";

interface EventItemProps extends EventJournal {
  hide?: Array<
    | "eventTitle"
    | "description"
    | "familyMember"
    | "journalDate"
    | "photos"
    | "productId"
  >;
}

const EventItem: React.FC<EventItemProps> = async (props) => {
  const token = getToken();
  const {
    description,
    eventTitle,
    familyMember,
    journalDate,
    photos,
    productId,
    _id,
    hide = [],
  } = props || {};

  const familyMemberDetails = await getFamilyMemberDetails(
    token || "",
    familyMember || "",
  );
  const productDetails = await getProductDetails(token || "", productId);

  const familyMemberName = familyMemberDetails?.member?.name;
  const productName = productDetails?.name;
  const journalDateFormatted = dayjs(journalDate).format("DD MMM YY");

  const shouldShowMember = !hide.includes("familyMember");
  const shouldShowDate = !hide.includes("journalDate");

  return (
    <ViewEvent
      familyMember={familyMemberName}
      product={productName}
      date={journalDateFormatted}
      description={description}
      event={eventTitle}
      photos={photos}
      id={_id}
      token={token || ""}
    >
      <div className="flex cursor-pointer items-start gap-x-2 rounded-lg hover:bg-blue-light">
        <div className="h-[134px] w-1.5 rounded-r-sm bg-primary-500" />
        {!hide.includes("photos") && (
          <ImageComponent
            src={photos?.[0]}
            alt="event-item-1"
            className="mr-2 aspect-3/4"
            width={100}
            height={134}
          />
        )}
        <div className="w-full">
          <div className="flex items-center justify-between">
            {!hide.includes("eventTitle") && (
              <span className="rounded bg-purple-50 p-1 text-xs text-purple-700 capitalize">
                {eventTitle}
              </span>
            )}
          </div>

          {!hide.includes("productId") && (
            <h5 className="my-1 mt-2 font-medium">{productName}</h5>
          )}

          {(shouldShowMember || shouldShowDate) && (
            <h6>
              {shouldShowMember && familyMemberName}
              {shouldShowMember && shouldShowDate && " - "}
              {shouldShowDate && journalDateFormatted}
            </h6>
          )}

          {!hide.includes("description") && description && (
            <h6 className="three-lines-ellipsis text-neutral-400">
              {description}
            </h6>
          )}
        </div>
      </div>
    </ViewEvent>
  );
};

export default EventItem;
