import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function AdminSideBar() {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  const location = useLocation();
  const navigate = useNavigate();
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isSettingDropdownOpen, setIsSettingDropdownOpen] = useState(false);


  const isSettingActive =
    location.pathname.startsWith("/admin/manageisallowed") ||
    location.pathname.startsWith("/admin/createcategory");

  const isEventsActive =
    location.pathname.startsWith("/admin/allevents") ||
    location.pathname.startsWith("/admin/createevent") ||
    location.pathname.startsWith("/admin/viewevent") ||
    location.pathname.startsWith("/admin/editevent");

  const isVenueActive =
    location.pathname.startsWith("/admin/allVenues") ||
    location.pathname.startsWith("/admin/viewvenue") ||
    location.pathname.startsWith("/admin/edituser") ||
    location.pathname.startsWith("/admin/adduser");

  const isEntertainerActive =
    location.pathname.startsWith("/admin/allentertainer") ||
    location.pathname.startsWith("/admin/adduser") ||
    location.pathname.startsWith("/admin/edituser") ||
    location.pathname.startsWith("/admin/viewentertainer") ||
    location.pathname.startsWith("/admin/editentertainer");

  const isAdminActive = isVenueActive || isEntertainerActive;

  const isManageVenueActive =
    location.pathname.startsWith("/admin/allVenues") ||
    location.pathname.startsWith("/admin/viewdetails") ||
    location.pathname.startsWith("/admin/addvenuelocation") ||
    location.pathname.startsWith("/admin/editvenue")
    ;



  useEffect(() => {
    if (isEventsActive) {
      setIsEventsDropdownOpen(isEventsActive);
    }
  }, [isEventsActive]);

  useEffect(() => {
    if (isAdminActive) {
      setIsAdminDropdownOpen(isAdminActive);
    }
  }, [isAdminActive]);


  useEffect(() => {
    setIsSettingDropdownOpen(isSettingActive);
  }, [isSettingActive]);

  const handleEventsClick = () => {
    if (!isEventsDropdownOpen) {
      setIsEventsDropdownOpen(true);
      // navigate("/admin/allevents");
    } else {
      setIsEventsDropdownOpen(false);
    }
  };

  const handleAdminClick = () => {
    if (!isAdminDropdownOpen) {
      setIsAdminDropdownOpen(true);
      // navigate("/admin/allusercopy?role=venue", { replace: true });
    } else {
      setIsAdminDropdownOpen(false);
    }
  };

  const handleSettingClick = () => {
    if (!isSettingDropdownOpen) {
      setIsSettingDropdownOpen(true);
    } else {
      setIsSettingDropdownOpen(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-nav text-start w-100">
          <p className="icon-font fw-medium" style={{ color: "#778DA2" }}>
            Overview
          </p>
          {/* Dashboard */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `nav-link dash-sidebar-link2 ${isActive ? "dash-active-link fw-semibold" : ""
              }`
            }
          >
            {({ isActive }) => (
              <div className="d-flex align-items-center  dash-sidebar-link">
                {/* <img
                  src={`${imagePath}${isActive ? "Dashboard.svg" : "inactiveDashboard.svg"
                    }`}
                  alt="Dashboard"
                  className="menuIconA me-2"
                /> */}

                <p className="profile-font"> <i className="fa-solid fa-table-cells-large menuIconA"></i> Dashboard</p>
              </div>
            )}
          </NavLink>

          <p className="icon-font fw-medium" style={{ color: "#778DA2" }}>
            General
          </p>

          {/* Events Dropdown */}
          <div className="dropdown">
            <div
              className={`nav-link dash-sidebar-link2 d-flex justify-content-between align-items-center ${isEventsActive ? "dash-active-link fw-semibold" : ""
                }`}
              onClick={handleEventsClick}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center dash-sidebar-link flex-grow-1">
                {/* <img
                  src={`${imagePath}${isEventsActive ? "Events.svg" : "inactiveEvents.svg"
                    }`}
                  alt="Events"
                  className="menuIconA me-2"
                /> */}

                <p className="profile-font"> <i className="fa-regular fa-calendar menuIconA"></i> Events</p>
              </div>
              <div>
                <img
                  src={`${imagePath}dropdownIcon.svg`}
                  alt="Dropdown"
                  className="dropdown-arrow"

                />
              </div>
            </div>

            <ul
              className={`dropdown-menu dash-drop-menu ${isEventsDropdownOpen ? "show" : ""}`}
            >
              <li>
                <NavLink
                  to="/admin/allevents"
                  className={({ isActive }) =>
                    `dropdown-item dash-drop-item dropdown-item-text ${isActive ? "active-item fw-semibold" : ""
                    }`
                  }
                >
                  <span className="bullet"></span> All Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/createevent"
                  className={({ isActive }) =>
                    `dropdown-item dash-drop-item dropdown-item-text ${isActive ? "active-item fw-semibold" : "inactive-item"
                    }`
                  }
                >
                  <span className="bullet"></span> Create Events
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/admin/tours"
                  className={({ isActive }) =>
                    `dropdown-item dash-drop-item dropdown-item-text ${isActive ? "active-item fw-semibold" : "inactive-item"
                    }`
                  }
                >
                  <span className="bullet"></span> Tours
                </NavLink>
              </li> */}
            </ul>
          </div>

          {/* Manage User */}
          {/* <NavLink to="/admin/alluser" className={({ isActive }) =>
            `nav-link dash-sidebar-link ${isActive ? "dash-active-link fw-semibold" : ""}`
          }>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-users menuIconA me-2 mt-2 fs-5"></i>
              <p className="mb-0 profile-font ms-2">Manage User</p>
            </div>
          </NavLink> */}

          {/* Admin Dropdown */}
          <div className="dropdown">
            <div
              className={`nav-link dash-sidebar-link2 d-flex justify-content-between align-items-center ${isAdminDropdownOpen ? "dash-active-link fw-semibold" : ""
                }`}
              onClick={handleAdminClick}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center dash-sidebar-link flex-grow-1">
                {/* <img
                  src={`${imagePath}${isAdminDropdownOpen ? "administrationDash.svg" : "administrationDash.svg"
                    }`}
                  alt="Events"
                  className="menuIconA me-2"
                /> */}

                <p className="profile-font"><i className="fa-regular fa-folder-closed menuIconA"></i> Administration</p>
              </div>
              <div>
                <img
                  src={`${imagePath}dropdownIcon.svg`}
                  alt="Dropdown"
                  className="dropdown-arrow"
                />
              </div>
            </div>
            <ul
              className={`dropdown-menu dash-drop-menu ${isAdminDropdownOpen ? "show" : ""}`}
            >
              <li>
                <NavLink
                  to="/admin/allVenues"
                  className={`dropdown-item dash-drop-item dropdown-item-text ${isVenueActive ? "active-item fw-semibold" : "inactive-item"
                    }`}
                >
                  <span className="bullet"></span> Venue Management
                </NavLink>

              </li>
              <li>
                <NavLink
                  to="/admin/allentertainer"
                  className={`dropdown-item dash-drop-item dropdown-item-text ${isEntertainerActive ? "active-item fw-semibold" : "inactive-item"
                    }`}
                >
                  <span className="bullet"></span> Entertainer
                  Management
                </NavLink>
              </li>
            </ul>
          </div>

           {/* Users */}
                    <NavLink
                      to="/admin/alluser"
                      className={({ isActive }) =>
                        `nav-link dash-sidebar-link2 ${isActive ? "dash-active-link fw-semibold" : ""
                        }`
                      }
                    >
                      <div className="d-flex align-items-center dash-sidebar-link">
                        {/* <i className="fa-solid fa-users-rectangle me-2 mt-2 fs-5"></i>
                        <p className="mb-0 mt-2 profile-font ms-3">Users</p> */}
                        <p className="profile-font"> <i className="fa-solid fa-users-rectangle menuIconA"></i> Users</p>
                      </div>
                    </NavLink>

          {/* Manage Venues */}
          {/* <NavLink
            to="/admin/allVenues"
            className={
              `nav-link dash-sidebar-link2 ${isManageVenueActive ? "dash-active-link fw-semibold" : ""
              }`
            }
          >
            <div className="d-flex align-items-center dash-sidebar-link">

              <p className=" profile-font "><i className="fa-solid fa-building menuIconA"></i> Manage Venues</p>
            </div>
          </NavLink> */}

          {/* All Entertainers */}
          {/* <NavLink
            to="/admin/allentertainer"
            className={({ isActive }) =>
              `nav-link dash-sidebar-link2 ${isActive ? "dash-active-link fw-semibold" : ""
              }`
            }
          >
            <div className="d-flex align-items-center dash-sidebar-link">

              <p className=" profile-font "> <i className="fa-solid fa-theater-masks menuIconA"></i> All Entertainers</p>
            </div>
          </NavLink> */}

          {/* Invoices */}
          <NavLink
            to="/admin/allinvoices"
            className={({ isActive }) =>
              `nav-link dash-sidebar-link2 ${isActive ? "dash-active-link fw-semibold" : ""
              }`
            }
          >
            <div className="d-flex align-items-center  dash-sidebar-link">

              <p className="profile-font"> <i className="fa-solid fa-file-invoice menuIconA"></i> Invoices</p>
            </div>
          </NavLink>

          {/* Reports */}
          <NavLink
            to="/admin/report"
            className={({ isActive }) =>
              `nav-link dash-sidebar-link2 ${isActive ? "dash-active-link fw-semibold" : ""
              }`
            }
          >
            <div className="d-flex align-items-center  dash-sidebar-link">

              <p className="profile-font"> <i className="fa-solid fa-chart-line menuIconA"></i> Report</p>
            </div>
          </NavLink>

          {/* Setting Dropdown */}
          <div className="dropdown">
            <div
              className={`nav-link dash-sidebar-link2 d-flex justify-content-between align-items-center ${isSettingDropdownOpen ? "dash-active-link fw-semibold" : ""
                }`}
              onClick={handleSettingClick}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center dash-sidebar-link flex-grow-1">


                <p className="profile-font"> <i className="fa-solid fa-cog menuIconA"></i> Settings</p>
              </div>
              <div>
                <img
                  src={`${imagePath}dropdownIcon.svg`}
                  alt="Dropdown"
                  className="dropdown-arrow"
                />
              </div>
            </div>
            <ul
              className={`dropdown-menu dash-drop-menu ${isSettingDropdownOpen ? "show" : ""}`}
            ><li>
                <NavLink
                  to="/admin/manageisallowed"
                  className={({ isActive }) =>

                    `dropdown-item dash-drop-item dropdown-item-text ${isActive ? "active-item fw-semibold" : ""
                    }`
                  }
                >
                  <span className="bullet"></span>  Manage Countries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/createcategory"
                  className={({ isActive }) =>
                    `dropdown-item dash-drop-item dropdown-item-text ${isActive ? "active-item fw-semibold" : ""
                    }`
                  }
                >
                  <span className="bullet"></span>  Create Category
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Settings Dropdown */}
          <div className="dropdown" style={{ display: "none" }}>
            <button
              className="nav-link dropdown-toggle d-flex justify-content-between align-items-center w-100"
              id="settingsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                className="d-flex align-items-center dash-sidebar-link"
              >
                <p className="profile-font"> <i className="fa-solid fa-cog menuIconA"></i> Settings</p>
              </div>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="settingsDropdown"
              data-bs-auto-close="true"
            >
              <li>
                <NavLink
                  to="/admin/manageisallowed"
                  className={({ isActive }) =>
                    `dropdown-item dropdown-item-text ${isActive ? " fw-bold" : ""
                    }`
                  }
                >
                  <i className="fa-solid fa-lock me-2"></i> Manage Allowed
                  Countries
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/admin/createadminrole" className={({ isActive }) =>
                    `dropdown-item dropdown-item-text ${isActive  ? " fw-bold" : ""}`}>
                  <i className="fa-solid fa-user-shield me-2"></i> Add Role
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/createadminuser" className={({ isActive }) =>
                    `dropdown-item dropdown-item-text ${isActive  ? " fw-bold" : ""}`}>
                  <i className="fa-solid fa-user-plus me-2"></i> Add User
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/admin/createcategory"
                  className={({ isActive }) =>
                    `dropdown-item dropdown-item-text ${isActive ? " fw-bold" : ""
                    }`
                  }
                >
                  <i className="fa-solid fa-plus me-2"></i> Create Category
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav >
    </div >
  );
}
