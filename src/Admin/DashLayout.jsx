import React from "react";
import AdminSideBar from "../components/Venue/AdminSideBar";
import AdminNavbar from "../components/Venue/AdminNavbar";
import { Helmet } from "react-helmet-async";

export default function DashLayout({ children }) {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="View and manage your Admin details."
        />
      </Helmet>
      <div className="container-fluid d-flex m-0 p-0 w-100">
        {/* <AdminSideBar /> */}

        {/* <!-- Content Start --> */}
        <div className="content">
          {/* <!-- Navbar Start --> */}
          <AdminNavbar />
          {/* <!-- Navbar End --> */}
          <div className="row">
            <div
              className="col-12 rounded-3"
              style={{
                background: "#F8F8F8 0% 0% no-repeat padding-box ",
                opacity: "1",
              }}
            >
              {children}
            </div>
          </div>
        </div>
        {/* <!-- Content End --> */}
      </div>
    </>
  );
}
