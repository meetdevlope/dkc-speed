import React from "react";
import { getProductEventsJournals } from "../../../family-member/[id]/actions";
import { getToken } from "utils/getToken";
import EventItem from "../../../components/event/EventItem";
import AddProductEvent from "./AddProductEvents";

interface WardrobeProductEventsProps {
  productId: string;
}

const WardrobeProductEvents: React.FC<WardrobeProductEventsProps> = async (
  props,
) => {
  const { productId } = props;
  const token = getToken();

  const events = await getProductEventsJournals(token || "", productId);

  return (
    <div className="my-8 px-4">
      <div className="my-8 flex flex-col items-center justify-between gap-y-4 md:my-12 md:flex-row">
        <h4 className="font-semibold">EVENTS AND JOURNALING</h4>
        <AddProductEvent token={token || ""} productId={productId} />
      </div>
      <div className="flex flex-col gap-y-4">
        {Array.isArray(events) &&
          events?.length > 0 &&
          events?.map((item, index) => (
            <EventItem key={index} hide={["productId"]} {...item} />
          ))}
        {(!events || !Array.isArray(events) || events?.length < 1) && (
          <h6 className="text-center">
            No event journal added yet. Please click on Add journal to create
            one
          </h6>
        )}
      </div>
    </div>
  );
};

export default WardrobeProductEvents;
