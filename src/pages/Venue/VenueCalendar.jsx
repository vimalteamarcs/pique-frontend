import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
export default function VenueCalendar() {
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
      <DashLayoutVenue title="Calendar" description="View and manage your work">
                <div className="container-fluid d-flex flex-column min-vh-100">
                  <SearchBar />
                  <div className="d-flex">
                    <div className="sidebar-container">
                      <ProfileSidebar />
                    </div>
                    <div className="profile-container">
      <div className="container-fluid d-flex flex-column min-vh-100">

        <div className="row">
         
          <div className="col-md-12">
            <div id="calendar" ref={calendarRef}></div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        <PiqueFooter/>
      </DashLayoutVenue>
    </>
  );
}
