import React from "react";
import { getToken } from "utils/getToken";
import AddMemberEvent from "./AddMemberEvents";
import EventItem from "../../../components/event/EventItem";
import { getMemberEventsJournals } from "../actions";

interface FamilyMemberEventsProps {
  memberId: string;
}

const FamilyMemberEvents: React.FC<FamilyMemberEventsProps> = async (props) => {
  const token = getToken();
  const { memberId } = props;

  const events = await getMemberEventsJournals(token || "", memberId);

  return (
    <div className="my-8 px-4">
      <div className="my-8 flex flex-col items-center justify-between gap-y-4 md:my-12 md:flex-row">
        <h4 className="font-semibold">EVENTS AND JOURNALING</h4>
        <AddMemberEvent token={token || ""} memberId={memberId} />
      </div>
      <div className="flex flex-col gap-y-4">
        {Array.isArray(events) &&
          events?.length > 0 &&
          events?.map((item, index) => (
            <EventItem key={index} hide={["familyMember"]} {...item} />
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

export default FamilyMemberEvents;
