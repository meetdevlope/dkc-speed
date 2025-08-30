import MaxWidthWrapper from "components/MaxWidthWrapper";
import { getToken } from "utils/getToken";
import { getEventsJournals } from "../../action";
import AddEvent from "./AddEvent";
import EventItem from "./EventItem";

const EventsJournaling = async () => {
  const token = getToken();

  const events = await getEventsJournals(token || "");

  return (
    <MaxWidthWrapper className="my-8 px-4">
      <div className="my-8 flex flex-col items-center justify-between gap-y-4 md:my-12 md:flex-row">
        <h4 className="font-semibold">EVENTS AND JOURNALING</h4>
        <AddEvent token={token || ""} />
      </div>
      <div className="flex flex-col gap-y-4">
        {Array.isArray(events) &&
          events?.length > 0 &&
          events?.map((item, index) => <EventItem key={index} {...item} />)}
        {(!events || !Array.isArray(events) || events?.length < 1) && (
          <h6 className="text-center">
            No event journal added yet. Please click on Add journal to create
            one
          </h6>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default EventsJournaling;
