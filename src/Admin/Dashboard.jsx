import React, { useEffect, useState } from "react";
import DashLayout from "./DashLayout";
import AdminSideBar from "../components/Venue/AdminSideBar";
import Input from "../components/Input";
import axios from "axios";

export default function Dashboard() {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  const [stats, setStats] = useState({
    totalUsers: 0,
    entertainerCount: 0,
    venueCount: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    rejectedBookings: 0,
    canceledBookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}admin/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        const data = response.data.data || {};

        setStats({
          totalUsers: data.totalUsers || 0,
          entertainerCount: data.entertainerCount || 0,
          venueCount: data.venueCount || 0,
          totalBookings: data.bookingStats?.total || 0,
          confirmedBookings: data.bookingStats?.confirmed || 0,
          rejectedBookings: data.bookingStats?.rejected || 0,
          canceledBookings: data.bookingStats?.canceled || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <DashLayout />
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <div className="row d-flex justify-content-between">
              <div className="col">
                <p className="fs-6 fw-bold">DASHBOARD</p>
              </div>
              <div className="col d-flex">
                <Input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  style={{ border: "2px solid #C2CCD666" }}
                />
                <button type="button" className="btn btn-light ms-3">
                  <i className="fa-solid fa-list text-muted"></i>
                </button>
              </div>
            </div>

            <div className="event-form mt-3">
              <p className="profile-font fw-semibold ms-2 mt-2">Analytics</p>
              <div className="row d-flex gap-3 p-3">
                <div className="col total-user p-2">
                  <div className="d-flex justify-content-between mb-0">
                    <p className="icon-font fw-semibold">Total Users</p>
                    <img
                      src={`${imagePath}totaluserdash.svg`}
                      height="35px"
                      width="40px"
                    />
                  </div>
                  <p className="fw-semibold mt-0 mb-2">{stats.totalUsers}</p>
                  <p className="icon-font mt-0">Total users registered</p>
                </div>

                <div className="col total-bookings p-2">
                  <div className="d-flex justify-content-between mb-0">
                    <p className="icon-font fw-semibold">Total Bookings</p>
                    <img
                      src={`${imagePath}totalbookingsdash.svg`}
                      height="35px"
                      width="40px"
                    />
                  </div>
                  <p className="fw-semibold mt-0 mb-2">{stats.totalBookings}</p>
                  <p className="icon-font mt-0">Total Bookings Confirmed</p>
                </div>

                <div className="col total-entertainers p-2">
                  <div className="d-flex justify-content-between mb-0">
                    <p className="icon-font fw-semibold">Entertainer Signups</p>
                    <img
                      src={`${imagePath}totalenterdash.svg`}
                      height="35px"
                      width="40px"
                    />
                  </div>
                  <p className="fw-semibold mt-0 mb-2">
                    {stats.entertainerCount}
                  </p>
                  <p className="icon-font mt-0">Total entertainers</p>
                </div>

                <div className="col total-venues p-2">
                  <div className="d-flex justify-content-between mb-0">
                    <p className="icon-font fw-semibold">Venue Signups</p>
                    <img
                      src={`${imagePath}totalvenuedash.svg`}
                      height="35px"
                      width="40px"
                    />
                  </div>
                  <p className="fw-semibold mt-0 mb-2">{stats.venueCount}</p>
                  <p className="icon-font mt-0">Total Venues</p>
                </div>
              </div>
            </div>

            <div className="row p-3 gap-3">
              <div className="col revenue-earning event-form">
                <p className="profile-font fw-semibold ms-2 mt-2">
                  Revenue & Earnings
                </p>

                <img
                  src={`${imagePath}dash-graph.png`}
                  height="227px"
                  width="622px"
                />
              </div>
              <div className="col upcoming-events event-form">
                <p className="profile-font fw-semibold ms-2 mt-2 mb-0">
                  Upcoming Events
                </p>
                <hr />
                <div className="scrollable-container">
                <div className="row d-flex event-details p-2 mb-2">
                  <div className="col-md-2">
                    <img
                      src={`${imagePath}dash-events.png`}
                      height="54px"
                      width="54px"
                    />
                  </div>
                  <div className="col-md-5">
                    <p className="icon-font fw-semibold ms-2 mb-1">
                      Event name (ABCXYZ)
                    </p>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon akar-calendar.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                    <div className="d-flex mt-0">
                    <img src={`${imagePath}Icon material-outline-watch-later.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <button
                      type="button"
                      className="btn inline d-flex align-items-center justify-content-center"
                      style={{
                        background: "#E9EBBF",
                        color: "black",
                        height: "21px",
                        width: "51px",
                        fontSize: "10px",
                      }}
                    >
                      View
                    </button>
                    <div className="d-flex mb-0 mt-3">
                    <img src={`${imagePath}Icon akar-location.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>Amsterdam</p>
                    </div>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon feather-user.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                </div>
                <div className="row d-flex event-details p-2 mb-2">
                  <div className="col-md-2">
                    <img
                      src={`${imagePath}dash-events.png`}
                      height="54px"
                      width="54px"
                    />
                  </div>
                  <div className="col-md-5">
                    <p className="icon-font fw-semibold ms-2 mb-1">
                      Event name (ABCXYZ)
                    </p>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon akar-calendar.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                    <div className="d-flex mt-0">
                    <img src={`${imagePath}Icon material-outline-watch-later.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <button
                      type="button"
                      className="btn inline d-flex align-items-center justify-content-center"
                      style={{
                        background: "#E9EBBF",
                        color: "black",
                        height: "21px",
                        width: "51px",
                        fontSize: "10px",
                      }}
                    >
                      View
                    </button>
                    <div className="d-flex mb-0 mt-3">
                    <img src={`${imagePath}Icon akar-location.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>Amsterdam</p>
                    </div>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon feather-user.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                </div>
                <div className="row d-flex event-details p-2 mb-2">
                  <div className="col-md-2">
                    <img
                      src={`${imagePath}dash-events.png`}
                      height="54px"
                      width="54px"
                    />
                  </div>
                  <div className="col-md-5">
                    <p className="icon-font fw-semibold ms-2 mb-1">
                      Event name (ABCXYZ)
                    </p>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon akar-calendar.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                    <div className="d-flex mt-0">
                    <img src={`${imagePath}Icon material-outline-watch-later.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <button
                      type="button"
                      className="btn inline d-flex align-items-center justify-content-center"
                      style={{
                        background: "#E9EBBF",
                        color: "black",
                        height: "21px",
                        width: "51px",
                        fontSize: "10px",
                      }}
                    >
                      View
                    </button>
                    <div className="d-flex mb-0 mt-3">
                    <img src={`${imagePath}Icon akar-location.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>Amsterdam</p>
                    </div>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon feather-user.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                </div>
                <div className="row d-flex event-details p-2 mb-2">
                  <div className="col-md-2">
                    <img
                      src={`${imagePath}dash-events.png`}
                      height="54px"
                      width="54px"
                    />
                  </div>
                  <div className="col-md-5">
                    <p className="icon-font fw-semibold ms-2 mb-1">
                      Event name (ABCXYZ)
                    </p>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon akar-calendar.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                    <div className="d-flex mt-0">
                    <img src={`${imagePath}Icon material-outline-watch-later.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <button
                      type="button"
                      className="btn inline d-flex align-items-center justify-content-center"
                      style={{
                        background: "#E9EBBF",
                        color: "black",
                        height: "21px",
                        width: "51px",
                        fontSize: "10px",
                      }}
                    >
                      View
                    </button>
                    <div className="d-flex mb-0 mt-3">
                    <img src={`${imagePath}Icon akar-location.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>Amsterdam</p>
                    </div>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon feather-user.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                </div>
                <div className="row d-flex event-details p-2 mb-2">
                  <div className="col-md-2">
                    <img
                      src={`${imagePath}dash-events.png`}
                      height="54px"
                      width="54px"
                    />
                  </div>
                  <div className="col-md-5">
                    <p className="icon-font fw-semibold ms-2 mb-1">
                      Event name (ABCXYZ)
                    </p>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon akar-calendar.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                    <div className="d-flex mt-0">
                    <img src={`${imagePath}Icon material-outline-watch-later.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <button
                      type="button"
                      className="btn inline d-flex align-items-center justify-content-center"
                      style={{
                        background: "#E9EBBF",
                        color: "black",
                        height: "21px",
                        width: "51px",
                        fontSize: "10px",
                      }}
                    >
                      View
                    </button>
                    <div className="d-flex mb-0 mt-3">
                    <img src={`${imagePath}Icon akar-location.svg`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>Amsterdam</p>
                    </div>
                    <div className="d-flex mb-0">
                    <img src={`${imagePath}Icon feather-user.png`} className="ms-2"
                    height="13px" width="13px"
                    />
                    <p className="text-muted ms-2" style={{fontSize:"10px"}}>18-FEB-2025</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
