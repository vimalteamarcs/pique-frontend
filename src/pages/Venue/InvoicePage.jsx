import React from "react";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";

export default function InvoicePage() {
  return (
    <>
      <DashLayoutVenue
        title="All Bookings"
        description="View all bookings made"
      >
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
            </div>
            <div className="profile-container">
              <p className="profile-font fw-bold">INVOICE LIST</p>
              <hr />
            </div>
          </div>
        </div>
      </DashLayoutVenue>
    </>
  );
}
