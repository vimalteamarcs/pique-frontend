import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function ProfileSidebar() {
  const name = localStorage.getItem("userName");
  const location = useLocation();

  // Check if any Events link is active
  const isEventsActive =
    location.pathname.startsWith("/venue/events") ||
    location.pathname.startsWith("/venue/calendar") ||
    location.pathname.startsWith("/venue/sync")||
    location.pathname.startsWith("/venue/addevents");

  const [isEventsOpen, setIsEventsOpen] = useState(isEventsActive);

  return (
    <div className="p-2 profile-font">
      <p className="fw-medium mb-1 ms-3" style={{fontSize:"20px"}}><i className="fa-solid fa-angle-left fs-6 me-1"></i>Account</p>
      <p className="text-muted fw-regular ms-4" style={{fontSize:"14px"}}>{name}</p>
      <nav className="nav flex-column position-relative ms-4 label-font">
        {/* VENUE PROFILE, CONTACT PERSON, WISHLIST */}
        {[
          {
            to: "/venue/profile",
            icon: "fa-regular fa-building",
            label: "VENUE PROFILE",
          },
          {
            to: "/venue/contactPerson",
            icon: "fa-regular fa-user",
            label: "CONTACT PERSON",
          },
          {
            to: "/venue/locations",
            icon: "fa-solid fa-map-location-dot",
            label: "LOCATIONS",
          },
          {
            to: "/venue/wishlist",
            icon: "fa-regular fa-heart",
            label: "WISHLIST",
          },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-link py-2 px-4 mb-2 d-flex align-items-center sidebar-link ${
                isActive ? "active-link" : ""
              }`
            }
          >
            <i className={`fa-solid ${icon} me-3 fs-5 icon-transition`}></i>
            <span className="text-dark">{label}</span>
          </NavLink>
        ))}

        <div className="nav-item">
          <div
            className={`nav-link py-2 px-4 mb-2 d-flex align-items-center sidebar-link ${
              isEventsActive ? "active-link" : ""
            }`}
            onClick={() => setIsEventsOpen(!isEventsOpen)}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-bookmark me-3 fs-5 icon-transition"></i>
            <span className="text-dark">EVENTS</span>
            <i
              className={`fa-solid fa-chevron-${
                isEventsOpen ? "up" : "down"
              } ms-auto`}
            ></i>
          </div>

          {isEventsOpen && (
            <div className="ps-4">
              {[
                { to: "/venue/events", label: "Event List" },
                { to: "/venue/calendar", label: "Calendar" },
                { to: "/venue/sync", label: "Sync an External Calendar" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-link py-2 px-4 mb-2 d-flex align-items-center sidebar-link ${
                      isActive ? "active-link" : ""
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* INVOICES, RATINGS, NOTIFICATIONS */}
        {[{
            to: "/venue/bookings",
            icon: "fa-check-to-slot",
            label: "BOOKINGS",
          },
          {
            to: "/venue/invoices",
            icon: "fa-file-invoice",
            label: "INVOICES & PAYMENTS",
          },
          {
            to: "/venue/ratings",
            icon: "fa-folder-plus",
            label: "RATINGS & REVIEWS",
          },
          {
            to: "/venue/notifications",
            icon: "fa-bell",
            label: "NOTIFICATIONS & REMINDERS",
          },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-link py-2 px-4 mb-2 d-flex align-items-center sidebar-link ${
                isActive ? "active-link" : ""
              }`
            }
          >
            <i className={`fa-solid ${icon} me-3 fs-5 icon-transition`}></i>
            <span className="text-dark">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
