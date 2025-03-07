import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoggedInNavbar() {
    const navigate = useNavigate();
    function handleLogout(e) {
        e.preventDefault();
        localStorage.clear();
        setTimeout(() => {
          document.querySelector(".btn-close").click(); 
          navigate("/login"); 
        }, 1000); 
      }
  return (
    <>
      <nav className="navbar navbar-expand navbar-light sticky-top">
      <div className="navbar-nav align-items-center ms-auto">
          <div className="nav-item">
            <a href="#" className="nav-link text-danger" data-bs-toggle="modal" data-bs-target="#logoutModal" >
              <i className="fa-solid fa-right-from-bracket me-lg-2"></i>
              <span className="d-none d-lg-inline-flex">Logout</span>
            </a>
          </div>
        </div>
      </nav>

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
            <div className="modal-body">
              Are you sure you want to log out?
            </div>
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
  )
}
