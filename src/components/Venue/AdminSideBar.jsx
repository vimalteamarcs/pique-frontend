import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function AdminSideBar() {
  const [userdata, setUserdata] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation(); // Get current route

  const isEventsActive =
    location.pathname.startsWith("/admin/allevents") ||
    location.pathname.startsWith("/admin/createevent") ||
    location.pathname.startsWith("/admin/viewevent") || 
    location.pathname.startsWith("/admin/editevent"); 

    const isUserVenueActive = location.pathname.startsWith("/admin/allusercopy") && location.search.includes("role=venue");

const isUserEntertainerActive = location.pathname.startsWith("/admin/allusercopy") && location.search.includes("role=entertainer");


    const isUserActive = 
    location.pathname.startsWith("/admin/allusercopy?role=venue") ||
    location.pathname.startsWith("/admin/adduser") ||
    location.pathname.startsWith("/admin/viewvenue") ||
    location.pathname.startsWith("/admin/edituser");
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-nav text-start w-100">
          <p className="icon-font fw-medium" style={{ color: "#778DA2" }}>Overview</p>

          <NavLink to="/admin" end className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-gauge me-2 fs-5"></i>
              <p className="profile-font ms-2 mb-0">Dashboard</p>
            </div>
          </NavLink>

          <p className="icon-font fw-medium" style={{ color: "#778DA2" }}>General</p>

          <NavLink to="/admin/allevents" className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isEventsActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-calendar-check me-3 fs-5"></i>
              <p className="mb-0 profile-font ms-2">Events</p>
            </div>
          </NavLink>

          {/* Manage User */}
          {/* <NavLink to="/admin/alluser" className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-users me-2 mt-2 fs-5"></i>
              <p className="mb-0 profile-font ms-2">Manage User</p>
            </div>
          </NavLink> */}

          {/* Users Dropdown */}
          <div className="dropdown">
            <button
              className="nav-link dropdown-toggle d-flex justify-content-between align-items-center w-100"
              id="usersDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex align-items-center" style={{marginLeft:"12px"}}>
                <i className="fa-solid fa-users me-2 fs-5"></i>
                <p className="mb-0 profile-font ms-2">Users</p>
              </div>
            </button>
            <ul className="dropdown-menu px-3" aria-labelledby="usersDropdown" data-bs-auto-close="true">
              <li>
                <NavLink
                  to="/admin/allusercopy?role=venue"
                  className={({ isActive }) =>
                    `dropdown-item dropdown-item-text ${isUserVenueActive && location.search.includes("role=venue") ? "dash-active-link fw-semibold" : ""}`
                  }
                >
                  <i className="fa-solid fa-lock me-2"></i> Venue
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/allusercopy?role=entertainer"
                  className={({ isActive }) =>
                    `dropdown-item dropdown-item-text ${isUserEntertainerActive && location.search.includes("role=entertainer") ? "dash-active-link fw-semibold" : ""}`
                  }
                >
                  <i className="fa-solid fa-user-shield me-2"></i> Entertainer
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Manage Venues */}
          <NavLink to="/admin/allVenues" className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-building me-2 mt-2 fs-5"></i>
              <p className="mb-0 mt-2 profile-font ms-3">Manage Venues</p>
            </div>
          </NavLink>

          {/* All Entertainers */}
          <NavLink to="/admin/allentertainer" className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-theater-masks me-2 mt-2 fs-5"></i>
              <p className="mb-0 mt-2 profile-font ms-2">All Entertainers</p>
            </div>
          </NavLink>

          {/* Invoices */}
          <NavLink to="/admin/allinvoices" className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-file-invoice me-2 mt-2 fs-5"></i>
              <p className="mb-0 mt-2 profile-font ms-3">Invoices</p>
            </div>
          </NavLink>

          {/* Reports */}
          <NavLink to="/admin/report" className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-chart-line me-2 mt-2 fs-5"></i>
              <p className="mb-0 profile-font ms-2 mt-2">Report</p>
            </div>
          </NavLink>

          {/* Settings Dropdown */}
          <div className="dropdown">
            <button
              className="nav-link dropdown-toggle d-flex justify-content-between align-items-center w-100"
              id="settingsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex align-items-center" style={{marginLeft:"12px"}}>
                <i className="fa-solid fa-cog me-2 fs-5"></i>
                <p className="mb-0 profile-font ms-2">Settings</p>
              </div>
            </button>
            <ul className="dropdown-menu" aria-labelledby="settingsDropdown" data-bs-auto-close="true">
              <li>
                <NavLink to="/admin/manageisallowed" className="dropdown-item">
                  <i className="fa-solid fa-lock me-2"></i> Manage Allowed Countries
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/createadminrole" className="dropdown-item">
                  <i className="fa-solid fa-user-shield me-2"></i> Add Role
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/createadminuser" className="dropdown-item">
                  <i className="fa-solid fa-user-plus me-2"></i> Add User
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/createcategory" className="dropdown-item">
                  <i className="fa-solid fa-plus me-2"></i> Create Category
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
