import React from 'react'
import { NavLink } from 'react-router-dom'

export default function EnterAccountSidebar() {
    const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  return (
    <>
     <div className="custom-entertainer-sidebar">
    <div className="p-2 profile-font">
      <p className="fs-5 fw-semibold mb-1">Account</p>
      <p className="profile-font">Olivia Andrews, California, USA</p>
      <nav className="nav flex-column position-relative">
        <NavLink to="/entertainer/profile"
          className="nav-link py-2 px-3 d-flex align-items-center position-relative sidebar-link mb-2">
          <img src={`${imagePath}Icon fa-solid-circle-user.svg`}/>
          <span className="text-dark ms-3">PROFILE</span>
        </NavLink>
        <NavLink to="#"
          className="nav-link py-2 px-3 d-flex align-items-center position-relative sidebar-link mb-2">
          <img src={`${imagePath}Icon ion-images.svg`} className="me-3 fs-5 icon-transition"/>
          <span className="text-dark">GALLERY</span>
        </NavLink>
        <NavLink to="/entertainer/bookingrequest"
          className="nav-link py-2 px-3 d-flex align-items-center position-relative sidebar-link mb-2">
          <img src={`${imagePath}Icon fa-solid-building.svg`} className="me-3 fs-5 icon-transition"/>
          <span className="text-dark">BOOKINGS</span>
        </NavLink>
        <NavLink to="./EntertainerInvoice.html" className="nav-link py-2 px-3 d-flex align-items-center position-relative sidebar-link mb-2">
          {/* <!-- <i className="fa-solid fa-file-invoice me-3 fs-5 icon-transition"></i> --> */}
          <img src={`${imagePath}Icon fa-solid-file-invoice.svg`} className="me-3 fs-5 icon-transition"/>
          <span className="text-dark">INVOICES & PAYMENTS</span>
        </NavLink>
        <NavLink to="./EntertainerRatingsPage.html" className="nav-link py-2 px-3 d-flex align-items-center position-relative sidebar-link mb-2">
          {/* <!-- <i className="fa-solid fa-folder-plus me-3 fs-5 icon-transition"></i> --> */}
          <img src={`${imagePath}Icon material-reviews.svg`} className="me-3 fs-5 icon-transition"/>
          <span className="text-dark">RATINGS & REVIEWS</span>
        </NavLink>
        <NavLink to="#" className="nav-link py-2 px-3 d-flex align-items-center position-relative sidebar-link mb-2">
          {/* <!-- <i className="fa-solid fa-bell me-3 fs-5 icon-transition"></i> --> */}
          <img src={`${imagePath}Icon fa-solid-bell.svg`} className="me-3 fs-5 icon-transition"/>
          <span className="text-dark">NOTIFICATIONS & REMINDERS</span>
        </NavLink>
      </nav>
    </div>
  </div>
    </>
  )
}
