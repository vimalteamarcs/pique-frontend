import React, { useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import DashLayoutEnter from "../../components/Entertainer/DashLayoutEnter";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function BookingCalendar() {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, bootstrapPlugin],
      themeSystem: "bootstrap",
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      },
      events: [
        {
          title: "Performance 1",
          start: "2025-01-25",
          description: "A live performance in the evening.",
        },
        {
          title: "Rehearsal",
          start: "2025-01-26",
          description: "Rehearsal session at the venue.",
        },
        {
          title: "Event 3",
          start: "2025-01-30",
          end: "2025-02-01",
          description: "Multi-day event.",
        },
        {
          title: "Meeting",
          start: "2025-01-28T14:00:00",
          description: "Client meeting to discuss upcoming events.",
        },
      ],
      eventClick: (info) => {
        alert(
          `Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`
        );
      },
    });

    calendar.render();
    return () => calendar.destroy();
  }, []);

  return (
    <>
      <DashLayoutEnter
        title="Calendar"
        description="View your all bookings in the calendar"
      >
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">

        <div className="row mt-5">
          <div className="col-md-12 mt-4">
            <h2 className="text-secondary text-center">Calendar</h2>
          </div>
          <div className="col-md-12 mt-4 ">
            <div id="calendar" ref={calendarRef}></div>
          </div>
        </div>
        </div>
        <PiqueFooter/>
      </DashLayoutEnter>
    </>
  );
}
