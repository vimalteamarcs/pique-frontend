import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import DashLayoutEnter from "../../components/Entertainer/DashLayoutEnter";
import moment from "moment";
import EnterAccountSidebar from "../../components/Entertainer/EnterAccountSidebar";
import BookingDataContainer from "../../components/Entertainer/BookingDataContainer";

export default function BookingRequest() {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookingRequests = async () => {
       
            try {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}entertainers/booking/request`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Fetched Data:", response.data);  
              setBookingRequests(response.data.bookings || []);
            //   setLoading(false);
          } catch (err) {
            console.error("Error fetching booking requests:", err);
            setError("Error fetching booking requests");
            setBookingRequests([]); 
          } finally {
            setLoading(false);
          }
        
    }

    fetchBookingRequests();
  }, [token]);

  const formatTime = (timeString) => {
    return timeString ? moment(timeString, "HH:mm:ss").format("hh:mm A") : "N/A";
  };
  
  
  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format('MM/DD/YYYY') : "N/A";
  };

  const handleBookingResponse = async (bookingId, isAccepted) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}entertainers/booking/response`,
        {
          bookingId,
          isAccepted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setBookingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === bookingId ? { ...request, isAccepted } : request
        )
      );
      if (isAccepted === "accepted") {
        toast.success("Booking Accepted");
      } else {
        toast.error("Booking Rejected");
      }
    } catch (error) {
      console.error("Error updating booking status", error);
      toast.error("Failed to update booking status");
    }
  };

  return (
    <>
      <DashLayoutEnter title ="Booking Request" description="View and manage your bookings">
          <Toaster position="top-center" reverseOrder={false} />
           <div className="container d-flex">
                    <EnterAccountSidebar/>
                    <BookingDataContainer bookingRequests={bookingRequests} loading={loading} formatTime={formatTime}/>
                    </div>
        {/* <div className="container-fluid d-flex flex-column min-vh-100 mt-5">

          <div className="row mt-5">
            <div className="col-md-12 mt-4">
              <h2 className="text-secondary text-center">
                All Booking Requests
              </h2>
              { bookingRequests.length === 0 ? (
                <div className="alert alert-warning text-center mt-5">No bookings yet.</div>
              ) : (
                <div className="table-responsive mt-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th> 
                        <th>Show Time</th>
                        <th>Show Date</th>
                        <th>Special Notes</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingRequests.map((request, index) => (
                        <tr key={request.id}>
                          <td>{index + 1}</td>
                          <td>{request.name || "N/A"}</td>
                          <td>{request.email || "N/A"}</td>
                          <td>{request.phone || "N/A"}</td>
                          <td>{formatTime(request.showTime) || "N/A"}</td>
                          <td>{formatDate(request.showDate) || "N/A"}</td>
                          <td>{request.specialNotes || "N/A"}</td>
                          <td>
                            <Button
                              className="btn btn-success me-2"
                              onClick={() =>
                                handleBookingResponse(request.id, "accepted")
                              }
                              label="Accept"
                            />
                            <Button
                              className="btn btn-danger"
                              onClick={() =>
                                handleBookingResponse(request.id, "rejected")
                              }
                              label="Decline"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
       </div> */}
      </DashLayoutEnter>
    </>
  );
}
