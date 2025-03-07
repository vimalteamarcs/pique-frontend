import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function AdminSideBar() {
  const [userdata, setUserdata] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <div
      className="sidebar pe-4 pb-3"
      style={{ borderRight: "1px solid #f3f3f3", backgroundColor: "white" }}
    >
      <nav className="navbar">
        <a href="/admin" className="navbar-brand mx-4 mb-3">
          {/* <h4 className="text-primary">
            <i className=""></i>PIQUE
          </h4> */}
          <img
            className="img-fluid "
            src={`${import.meta.env.VITE_BASE}assets/images/piquelogo.png`}
            alt="logo"
          />
        </a>

        <div className="navbar-nav text-start w-100">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-gauge me-2"></i>Dashboard
          </NavLink>
          <NavLink
            to="/admin/allevents"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-calendar-check me-2 mt-2"></i> Events
          </NavLink>

          {/* manage user */}
          <NavLink
            to="/admin/alluser"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-users me-2 mt-2"></i>Manage User
          </NavLink>
          {/* user */}
          <NavLink className={`nav-link  dropdown `}>
            <div
              className=" dropdown-toggle "
              id="settingsDropdown1"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-users me-2"></i> User
            </div>
            <ul
              className="dropdown-menu px-5"
              aria-labelledby="settingsDropdown1"
            >
              <NavLink
                to="/admin/allusercopy?role=venue"
                className={({ isActive }) =>
                  `dropdown-item dropdown-item-text ${
                    isActive ? " fw-bold " : ""
                  }`
                }
              >
                <i className="fa-solid fa-lock me-2"></i>Venue
              </NavLink>

              <NavLink
                to="/admin/allusercopy?role=entertainer"
                className={({ isActive }) =>
                  `dropdown-item dropdown-item-text ${
                    isActive ? " fw-bold " : ""
                  }`
                }
              >
                <i className="fa-solid fa-user-shield me-2"></i>Entertainer
              </NavLink>
            </ul>
          </NavLink>


          <NavLink
            to="/admin/allVenues"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-building me-2 mt-2"></i>
            Manage Venues
          </NavLink>

          <NavLink
            to="/admin/allentertainer"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-theater-masks me-2 mt-2"></i>All
            Entertainer
          </NavLink>

          <NavLink
            to="/admin/allinvoices"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-file-invoice me-2 mt-2"></i>
            Invoices
          </NavLink>
          <NavLink
            to="/admin/report"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }
          >
            <i className="fa-solid fa-chart-line me-2 mt-2"></i>
            Reports
          </NavLink>

          {/* setting */}
          <NavLink
            className={({ isActive }) =>
              `nav-link  dropdown ${isActive ? " fw-bold " : ""}`
            }
          >
            <div
              className=" dropdown-toggle "
              id="settingsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-cog me-2"></i>Settings
            </div>

            <ul className="dropdown-menu " aria-labelledby="settingsDropdown">
              <NavLink
                to="/admin/manageisallowed"
                className="dropdown-item dropdown-item-text"
              >
                <i className="fa-solid fa-lock me-2"></i>Manage Allowed
                Countries
              </NavLink>

              <NavLink
                to="/admin/createadminrole"
                className="dropdown-item dropdown-item-text "
              >
                <i className="fa-solid fa-user-shield me-2"></i>Add Role
              </NavLink>

              <li>
                <NavLink
                  to="/admin/createadminuser"
                  className="dropdown-item dropdown-item-text"
                >
                  <i className="fa-solid fa-user-plus me-2"></i>Add User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/createcategory"
                  className="dropdown-item dropdown-item-text"
                >
                  <i className="fa-solid fa-plus me-2"></i>Create Category
                </NavLink>
              </li>
            </ul>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
