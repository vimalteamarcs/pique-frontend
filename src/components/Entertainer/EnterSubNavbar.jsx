import React from "react";
import { NavLink } from "react-router-dom";

export default function EnterSubNavbar() {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;

  return (
    <div className="container-fluid bg-searchbar mt-0">
      <div className="container d-flex justify-content-center p-3">
        <div className="div text-center dash-navbar shadow">
          <div className="row">
            <div className="col-md-4">
              <NavLink
                to="/entertainer"
                className={({ isActive }) =>
                  `text-decoration-none text-black dash-link ${isActive ? "active-dash" : ""}`
                }
              >
                <img src={`${imagePath}Icon material-outline-dashboard.svg`} alt="Dashboard" />
                <p className="dash-navbar-font fw-semibold mt-1">Dashboard</p>
              </NavLink>
            </div>
            <div className="col-md-4">
              <NavLink
                to="/entertainer/calendar"
                className={({ isActive }) =>
                  `text-decoration-none text-black dash-link ${isActive ? "active-dash" : ""}`
                }
              >
                <img src={`${imagePath}Icon akar-calendar.svg`} alt="Calendar" />
                <p className="dash-navbar-font fw-semibold mt-1">Calendar</p>
              </NavLink>
            </div>
            <div className="col-md-4">
              <NavLink
                to="/entertainer/messages"
                className={({ isActive }) =>
                  `text-decoration-none text-black dash-link ${isActive ? "active-dash" : ""}`
                }
              >
                <img src={`${imagePath}Icon feather-message-square.svg`} alt="Messages" />
                <p className="dash-navbar-font fw-semibold mt-1">Messages</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
