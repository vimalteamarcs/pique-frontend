import React from "react";
import { Link } from "react-router-dom";

export default function PiqueNavbar() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH;
  return (
    <>
    <div className="container-fluid mainNavbar">
      <div className="row">
        <nav id="navbar1" className="navbar navbar-expand-lg px-4">
          <div className="container">
            {/* <!-- Logo Section --> */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={`${imagePath}newLogo.png`} alt="logo" className="logoMain" />
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
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 me-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="#">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Why We</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Blog</Link>
                </li>
              </ul>

              {/* <!-- Right-Side Buttons --> */}
              <div className="d-flex align-items-center">
                <Link to="/signup/venue" className="btn myBTNB me-3">
                  Register <i className="fa-solid fa-arrow-up"></i>
                </Link>
                <Link to="/login" className="btn myBTNB me-3">
                  Login <i className="fa-solid fa-arrow-up"></i>
                </Link>
                <div className="dropdown">
                  <button
                    className="btn flagBG dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={`${imagePath}usa.png`} alt="India" width="20" /><span
                      className="ms-1">USA</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li><Link className="dropdown-item" to="#">USA</Link></li>
                    <li><Link className="dropdown-item" to="#">UK</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        </div>
        </div>
    </>
  );
}
