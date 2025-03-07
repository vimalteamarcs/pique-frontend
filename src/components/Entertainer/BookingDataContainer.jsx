import React from "react";

export default function BookingDataContainer({
  bookingRequests,
  loading,
  formatTime,
}) {
  return (
    <>
      <div className="profile-container">
        <p className="fw-bold mb-0">BOOKINGS</p>
        <hr />
        <div className="booking-table">
          <div className=" d-flex justify-content-between">
            <button className="btn btn-light">
              <span className="profile-font">Filter</span>
            </button>
            <input
              type="text"
              className="form-control profile-font rounded-5 w-25"
              placeholder="Search"
            />
          </div>
          <hr />
          <table className="table table-responsive mb-4">
            <thead className="profile-font">
              <tr>
                <th style={{ width: "5%" }}>S.No.</th>
                <th style={{ width: "30%" }}>Venue</th>
                <th style={{ width: "15%" }}>Status</th>
                <th style={{ width: "20%" }}>Date</th>
                <th style={{ width: "20%" }}>Time</th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center">
                    <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
                      <div className="spinner-grow text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="profile-font text-muted">
                {bookingRequests.length > 0 ? (
                  bookingRequests.map((booking, index) => (
                    <tr key={booking.id}>
                      <td>{index + 1}</td>
                      <td>{booking.name || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            booking.status === "confirmed"
                              ? "badge-confirmed"
                              : booking.status === "pending"
                              ? "badge-pending"
                              : "badge-declined"
                          }`}
                        >
                          {booking.status || "N/A"}
                        </span>
                      </td>
                      <td>{moment(booking.date).format("DD-MMM-YYYY")}</td>
                      <td>{formatTime(booking.showTime)}</td>
                      <td>
                        <a
                          href="#"
                          className="btn btn-outline-secondary btn-sm"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
