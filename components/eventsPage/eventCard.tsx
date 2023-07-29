import React from "react";
import { eventDetails } from "../../types/types";
import router from "next/router";
import dayjs from "dayjs";
import { BsCalendar, BsClockFill, HiLocationMarker } from "react-icons/all";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

type EventCardProps = {
  event: eventDetails;
};

const EventCard = ({ event }: EventCardProps) => {
  // We don't have locations setup in the database just yet,
  // so ignore that part of the design.
  // We have dayJS installed https://day.js.org/en/
  // so look into that for formatting the time in event.date
  // You can also ignore event.duration for now since it's not in the design

  return (
    <div className="mb-4 flex flex-col bg-neutral-800">
      <button
        className="block w-full"
        onClick={() => {
          router.push(`/dashboard/events/${event.event_id}`);
        }}
      >
        <p className="border-b-2 border-gray-700 p-4 text-left">
          {event.title}
        </p>
        <div className="flex flex-wrap p-4">
          <p className="flex basis-2/3 flex-row items-center gap-2 pb-1">
            <BsCalendar />

            {dayjs(event.date).format("MMM D")}
          </p>
          <p className="flex basis-1/3 flex-row items-center gap-2 pb-1">
            <BsClockFill />
            {dayjs(event.date).format("LT")}
          </p>

          <p className="flex basis-2/3 flex-row items-center gap-2 pb-1">
            <HiLocationMarker />
            TBD
          </p>
        </div>
      </button>
    </div>
  );
};

export default EventCard;
