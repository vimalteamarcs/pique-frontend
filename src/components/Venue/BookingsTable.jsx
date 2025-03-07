import React from "react";
import moment from "moment";
import Button from "../Button";

export default function BookingsTable({
  bookings,
  loading,
  error,
  onViewEntertainer,
}) {
  return (
    <div className="row">
      <div className="col-md-12">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="profile-font">
                  <th>Sr.No.</th>
                  <th>Entertainer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Price Per Event</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="profile-font text-secondary">
                {bookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>{booking.name}</td>
                    <td>
                      <span
                        className={`status-badge status-${booking.status
                          .replace(" ", "-")
                          .toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {moment
                        .utc(booking.showDate)
                        .format("DD-MMM-YYYY")
                        .toUpperCase()}
                    </td>
                    <td>{moment.utc(booking.showDate).format("HH:mm")}</td>
                    <td>{booking.pricePerEvent}</td>
                    <td>
                      <Button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => onViewEntertainer(booking)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-warning text-center mt-5">
            No bookings yet.
          </div>
        )}
      </div>
    </div>
  );
}
