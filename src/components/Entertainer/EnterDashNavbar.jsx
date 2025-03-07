import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../Button";


export default function EnterDashNavbar() {
  const navigate = useNavigate();
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;

  useEffect(() => {
    const user = localStorage.getItem("userName");

    if (!user) {
      navigate("./", { replace: true });
    } else {
      // Prevent going back to login page
      window.history.pushState(null, null, window.location.href);
      const handleBackButton = () => {
        window.history.pushState(null, null, window.location.href);
      };
      window.addEventListener("popstate", handleBackButton);

      return () => {
        window.removeEventListener("popstate", handleBackButton);
      };
    }
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
      <div className="container">
        <nav className="navbar navbar-expand-lg mb-0 ">
          <div className="container">
            {/* <!-- Logo Section --> */}
            <Link
              className="navbar-brand d-flex align-items-center"
              to="/entertainer"
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
                  <p className="fw-semibold fs-6 nav-font mt-3">
                    Entertainment | Education | Engagement
                  </p>
                </ul>

               

                <div className="d-flex align-items-center">
                <p className="profile-font mt-3 fw-semibold">Manage Bookings</p>
                  <NavLink className="nav-btn ms-2" to="/entertainer">
                    <img src={`${imagePath}userIcon.svg`} />
                  </NavLink>

                  <div className="dropdown ms-2">
                    <button
                      className="btn btn-nav-enter dropdown-toggle d-flex align-items-center"
                      type="button"
                      id="venueDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={`${imagePath}Ellipse 80@2x.png`} height="30px"/>
                            <div className="enter-bars ms-2">
                                <img src={`${imagePath}Icon ion-menu2.svg`}/>
                            </div>
                    </button>

                    <ul
                      className="dropdown-menu custom-drop-menu dropdown-menu-end"
                      aria-labelledby="enterDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item custom-drop-item"
                          to="/entertainer/profile"
                        >
                          Account
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item custom-drop-item"
                          to="/entertainer/events"
                        >
                          Events
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item custom-drop-item"
                          to="/entertainer/notifications"
                        >
                          Notifications & Reminders
                        </NavLink>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item custom-drop-item"
                          to="/entertainer/helpandsupport"
                        >
                          Help & Support
                        </Link>
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

      {/* Logout Confirmation Modal */}
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
              <h5 className="modal-title" id="logoutModalLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to log out?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
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