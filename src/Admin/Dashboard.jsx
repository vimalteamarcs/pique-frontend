import React from "react";
import DashLayout from "./DashLayout";
import AdminSideBar from "../components/Venue/AdminSideBar";

export default function Dashboard() {
  return (
    <>
      <DashLayout />
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <div className="row">
              <div className="col">
                <p className="fs-6 fw-bold">DASHBOARD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
