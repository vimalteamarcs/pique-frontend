import React, { useEffect } from "react";
import { Link, NavLink, replace, useNavigate } from "react-router-dom";
import Button from "../Button";

export default function VenueDashNavbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("UserName");
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;

  useEffect(() => {
    if (user) {
      navigate("/venue", { replace: true });
      window.history.pushState(null, null, window.location.href);
    }
    const handleBackButton = () => {
      window.history.pushState(null, null, window.location.href);
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();

    const closeBtn = document.querySelector(
      ".btn-close[data-bs-dismiss='modal']"
    );
    if (closeBtn) closeBtn.click();

    navigate("/");
  }

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <nav id="navbar1" className="navbar navbar-expand-lg px-4">
            <div className="container">
              {/* <!-- Logo Section --> */}
              <Link
                className="navbar-brand d-flex align-items-center"
                to="/venue"
              >
                <img
                  src={`${imagePath}newLogo.png`}
                  alt="logo"
                  className="logoMain"
                />
              </Link>

              {/* <!-- Toggle Button for Mobile View --> */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* <!-- Navbar Links --> */}
              <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
                  <p className="fw-semibold fs-5 nav-font mt-3">
                    Entertainment | Education | Engagement
                  </p>
                </ul>

                <div className="d-flex align-items-center">
                  <NavLink className="nav-btn" to="/">
                    <img src={`${imagePath}plusIcon.svg`} />
                  </NavLink>
                  <NavLink className="nav-btn ms-2" to="/">
                    <img src={`${imagePath}messageIcon.svg`} />
                  </NavLink>
                  <NavLink className="nav-btn ms-2" to="/">
                    <img src={`${imagePath}userIcon.svg`} />
                  </NavLink>

                  <div className="dropdown ms-3">
                    <button
                      className="btn btn-nav-venue dropdown-toggle d-flex align-items-center"
                      type="button"
                      id="venueDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Venue Name
                      <div className="nav-bars ms-2">
                        <img
                          src={`${imagePath}Icon ion-menu.svg`}
                          className="menu-icon"
                        />
                      </div>
                    </button>

                    <ul
                      className="dropdown-menu custom-drop-menu dropdown-menu-end"
                      aria-labelledby="venueDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item custom-drop-item"
                          to="/venue/profile"
                        >
                          Account
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item custom-drop-item"
                          to="/venue/events"
                        >
                          Events
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item custom-drop-item"
                          to="/"
                        >
                          Notifications & Reminders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item custom-drop-item"
                          to="/"
                        >
                          Help & Support
                        </NavLink>
                      </li>
                      <li>
                        <button
                          className="dropdown-item custom-drop-item text-dark"
                          data-bs-toggle="modal"
                          data-bs-target="#logoutModal"
                        >
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title profile-font" id="logoutModalLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body profile-font">Are you sure you want to log out?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary profile-font"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger profile-font"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
