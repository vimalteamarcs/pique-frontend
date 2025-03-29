import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_EVENTBY_ID, GETBOOKING_BYEVENT_ID } from "../../../../constants";
import DashLayout from "../../DashLayout";
import EntertainerModal from "../../../components/EntertainerModal";
import AdminSideBar from "../../../components/Venue/AdminSideBar";

const ViewEventDetails = () => {
  const location = useLocation();
  const eventDta = location.state;
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [bookings, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEntertainer, setSelectedEntertainer] = useState(null);
  const [view, setView] = useState("event"); // "event" by default
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!eventDta) {
      setError("No event ID provided");
      setIsLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_EVENTBY_ID}${eventDta.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("response", response.data);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GETBOOKING_BYEVENT_ID}${
            eventDta.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBooking(response.data);
      } catch (err) {
        setError("Failed to load booking details");
      }
    };

    if (eventDta.id) {
      fetchEventDetails();
      fetchBookingDetails();
    }
  }, [eventDta]);

  const getStatusBadge = (status) => {
    if (!status) return "bg-secondary";
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "accepted") return "bg-success";
    if (lowerStatus === "pending") return "bg-warning";
    if (lowerStatus === "rejected") return "bg-danger";
    return "bg-secondary";
  };

  const handleShow = (entertainerDetail) => {
    setSelectedEntertainer(entertainerDetail);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    // <>
    //   <DashLayout />
    //   <div className="container-fluid w-100 p-0">
    //     <div className="d-flex mt-0">
    //       <div className="dash-sidebar-container">
    //         <AdminSideBar />
    //       </div>
    //       <div className="dash-profile-container">
    //         <p className="text-danger">{error}</p>

    //         {selectedEntertainer && (
    //           <EntertainerModal
    //             show={showModal}
    //             handleClose={handleClose}
    //             entertainerDetail={selectedEntertainer}
    //           />
    //         )}
    //         <div className="d-flex justify-content-between">
    //           <button
    //             onClick={() => navigate(-1)}
    //             className="btn btn-outline-dark rounded-3 btn-sm d-flex align-items-center mb-3"
    //           >
    //             <i
    //               className="fa fa-arrow-left"
    //               style={{ marginRight: "8px" }}
    //             ></i>
    //             Back
    //           </button>

    //           {/* Buttons to toggle views */}

    //           <div className="mb-3 d-flex justify-content-end">
    //             <button
    //               className={`btn btn-sm ${
    //                 view === "event" ? "btn-dark" : "btn-outline-dark"
    //               } me-2`}
    //               onClick={() => setView("event")}
    //             >
    //               Home
    //             </button>
    //             <button
    //               className={`btn btn-sm ${
    //                 view === "bookings" ? "btn-dark" : "btn-outline-dark"
    //               }`}
    //               onClick={() => setView("bookings")}
    //             >
    //               Bookings
    //             </button>
    //           </div>
    //         </div>

    //         {isLoading ? (
    //           <div
    //             className="d-flex justify-content-center align-items-center"
    //             style={{ minHeight: "50vh" }}
    //           >
    //             <div className="spinner-border text-primary" role="status">
    //               <span className="visually-hidden">Loading...</span>
    //             </div>
    //           </div>
    //         ) : (
    //           <>
    //             {/* Show Event Details */}
    //             {view === "event" && event && (
    //               <div className="card p-3">
    //                 <p className="profile-font fw-semibold mb-0">
    //                   EVENT DETAILS
    //                 </p>
    //                 <hr />
    //                 <div className="row">
    //                   <div className="col-md-6 profile-font">
    //                     <p>
    //                       <strong>Title:</strong> {event.ename}
    //                     </p>
    //                     <p>
    //                       <strong>Location:</strong> {event.location}
    //                     </p>
    //                     <p>
    //                       <strong>Description:</strong> {event.description}
    //                     </p>
    //                     <p>
    //                       <strong>Start Time:</strong>{" "}
    //                       {new Date(event.startTime).toLocaleDateString(
    //                         "en-GB",
    //                         {
    //                           day: "2-digit",
    //                           month: "short",
    //                           year: "numeric",
    //                           hour: "2-digit",
    //                           minute: "2-digit",
    //                           hour12: true,
    //                         }
    //                       )}
    //                     </p>
    //                     <p>
    //                       <strong>End Time:</strong>{" "}
    //                       {new Date(event.endTime).toLocaleDateString(
    //                         "en-GB",
    //                         {
    //                           day: "2-digit",
    //                           month: "short",
    //                           year: "numeric",
    //                           hour: "2-digit",
    //                           minute: "2-digit",
    //                           hour12: true,
    //                         }
    //                       )}
    //                     </p>
    //                     <p>
    //                       <strong>Recurring:</strong> {event.recurring}
    //                     </p>
    //                   </div>
    //                   <div className="col-md-6 profile-font">
    //                     <p>
    //                       <strong>Status:</strong> {event.status}
    //                     </p>
    //                     {/* <p>
    //                       <strong>Created At:</strong>{" "}
    //                       {new Date(event.createdAt).toLocaleDateString(
    //                         "en-GB",
    //                         {
    //                           day: "2-digit",
    //                           month: "short",
    //                           year: "numeric",
    //                           hour: "2-digit",
    //                           minute: "2-digit",
    //                           hour12: true,
    //                         }
    //                       )}
    //                     </p>
    //                     <p>
    //                       <strong>Updated At:</strong>{" "}
    //                       {new Date(event.updatedAt).toLocaleDateString(
    //                         "en-GB",
    //                         {
    //                           day: "2-digit",
    //                           month: "short",
    //                           year: "numeric",
    //                           hour: "2-digit",
    //                           minute: "2-digit",
    //                           hour12: true,
    //                         }
    //                       )}
    //                     </p> */}
    //                     <p>
    //                       <strong>Venue:</strong> {event.name},{" "}
    //                       {event.addressLine1}, {event.addressLine2}
    //                     </p>
    //                     <p>
    //                       <strong>Created By:</strong>{" "}
    //                       {event.isAdmin === 1 ? "Admin" : "Venue"}
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //             )}

    //             {/* Show Bookings Table */}
    //             {view === "bookings" && bookings && (
    //               <div className="table-responsive">
    //                 <p className="profile-font fw-semibold">BOOKINGS</p>
    //                 <hr />
    //                 <table className="table table-responsive">
    //                   <thead>
    //                     <tr className="profile-font">
    //                       <th>Entertainer Name</th>
    //                       <th>Category</th>
    //                       <th>Specific Category</th>
    //                       <th>Status</th>
    //                       <th>Special Notes</th>
    //                       <th>Created At</th>
    //                       <th>Updated At</th>
    //                       <th>Is Accepted Date</th>
    //                       <th>Status Date</th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {bookings.length > 0 ? (
    //                       bookings.map((booking, index) => (
    //                         <tr key={index} className="profile-font">
    //                           <td>
    //                             {booking.name ? (
    //                               <strong
    //                                 style={{ cursor: "pointer", color: "blue" }}
    //                                 onClick={() =>
    //                                   handleShow({
    //                                     name: booking.name,
    //                                     phone1: booking.phone1,
    //                                     phone2: booking.phone2,
    //                                     bio: booking.bio,
    //                                     performanceRole:
    //                                       booking.performanceRole,
    //                                     categoryName: booking.categoryName,
    //                                     specificCatName:
    //                                       booking.specific_catName,
    //                                     availability: booking.availability,
    //                                     pricePerEvent: booking.pricePerEvent,
    //                                     vaccinated: booking.vaccinated,
    //                                     socialLinks: booking.socialLinks,
    //                                     createdAt: booking.createdAt,
    //                                     updatedAt: booking.updatedAt,
    //                                   })
    //                                 }
    //                               >
    //                                 {booking.name}
    //                               </strong>
    //                             ) : (
    //                               <span style={{ color: "gray" }}>
    //                                 No Entertainer
    //                               </span>
    //                             )}
    //                           </td>
    //                           <td>{booking.categoryName}</td>
    //                           <td>{booking.specific_catName}</td>
    //                           <td>
    //                             <span
    //                               className={`badge text-capitalize ${getStatusBadge(
    //                                 booking.status
    //                               )}`}
    //                             >
    //                               {booking.status}
    //                             </span>
    //                           </td>
    //                           <td>{booking.specialNotes || "No notes"}</td>
    //                           <td>
    //                             {booking.createdAt
    //                               ? new Date(booking.createdAt).toLocaleString()
    //                               : " "}
    //                           </td>
    //                           <td>
    //                             {booking.updatedAt
    //                               ? new Date(booking.updatedAt).toLocaleString()
    //                               : " "}
    //                           </td>
    //                           <td>
    //                             {booking.isAcceptedDate
    //                               ? new Date(
    //                                   booking.isAcceptedDate
    //                                 ).toLocaleString()
    //                               : " "}
    //                           </td>
    //                           <td>
    //                             {booking.statusDate
    //                               ? new Date(
    //                                   booking.statusDate
    //                                 ).toLocaleString()
    //                               : " "}
    //                           </td>
    //                         </tr>
    //                       ))
    //                     ) : (
    //                       <tr>
    //                         <td colSpan="9" className="text-center">
    //                           No bookings found.
    //                         </td>
    //                       </tr>
    //                     )}
    //                   </tbody>
    //                 </table>
    //               </div>
    //             )}
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <DashLayout />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <div className="card">
              <div className="card-body">
                <p className="text-danger">{error}</p>

                {selectedEntertainer && (
                  <EntertainerModal
                    show={showModal}
                    handleClose={handleClose}
                    entertainerDetail={selectedEntertainer}
                  />
                )}
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-dark rounded-3 btn-sm d-flex align-items-center mb-3"
                  >
                    <i
                      className="fa fa-arrow-left"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Back
                  </button>

                  {/* Buttons to toggle views */}

                  <div className="mb-3 d-flex justify-content-end">
                    <button
                      className={`btn btn-sm ${
                        view === "event" ? "btn-dark" : "btn-outline-dark"
                      } me-2`}
                      onClick={() => setView("event")}
                    >
                      Home
                    </button>
                    <button
                      className={`btn btn-sm ${
                        view === "bookings" ? "btn-dark" : "btn-outline-dark"
                      }`}
                      onClick={() => setView("bookings")}
                    >
                      Bookings
                    </button>
                  </div>
                </div>

                {isLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "50vh" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Show Event Details */}
                    {view === "event" && event && (
                      <div className="card p-3">
                        <p className="profile-font fw-semibold mb-0">
                          EVENT DETAILS
                        </p>
                        <hr />
                        <div className="row">
                          <div className="col-md-6 profile-font">
                            <p>
                              <strong>Title:</strong> {event.ename}
                            </p>
                            <p>
                              <strong>Location:</strong> {event.location}
                            </p>
                            <p>
                              <strong>Description:</strong> {event.description}
                            </p>
                            <p>
                              <strong>Start Time:</strong>{" "}
                              {new Date(event.startTime).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                            <p>
                              <strong>End Time:</strong>{" "}
                              {new Date(event.endTime).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                            <p>
                              <strong>Recurring:</strong> {event.recurring}
                            </p>
                          </div>
                          <div className="col-md-6 profile-font">
                            <p>
                              <strong>Status:</strong> {event.status}
                            </p>
                            {/* <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(event.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                      <p>
                        <strong>Updated At:</strong>{" "}
                        {new Date(event.updatedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p> */}
                            <p>
                              <strong>Venue:</strong> {event.name},{" "}
                              {event.addressLine1}, {event.addressLine2}
                            </p>
                            <p>
                              <strong>Created By:</strong>{" "}
                              {event.isAdmin === 1 ? "Admin" : "Venue"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Show Bookings Table */}
                    {view === "bookings" && bookings && (
                      <div className="table-responsive">
                        <p className="profile-font fw-semibold">BOOKINGS</p>
                        <hr />
                        <table className="table table-responsive">
                          <thead>
                            <tr className="profile-font">
                              <th>Entertainer Name</th>
                              <th>Category</th>
                              <th>Specific Category</th>
                              <th>Status</th>
                              <th>Special Notes</th>
                              <th>Created At</th>
                              <th>Updated At</th>
                              <th>Is Accepted Date</th>
                              <th>Status Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.length > 0 ? (
                              bookings.map((booking, index) => (
                                <tr key={index} className="profile-font">
                                  <td>
                                    {booking.name ? (
                                      <strong
                                        style={{
                                          cursor: "pointer",
                                          color: "blue",
                                        }}
                                        onClick={() =>
                                          handleShow({
                                            name: booking.name,
                                            phone1: booking.phone1,
                                            phone2: booking.phone2,
                                            bio: booking.bio,
                                            performanceRole:
                                              booking.performanceRole,
                                            categoryName: booking.categoryName,
                                            specificCatName:
                                              booking.specific_catName,
                                            availability: booking.availability,
                                            pricePerEvent:
                                              booking.pricePerEvent,
                                            vaccinated: booking.vaccinated,
                                            socialLinks: booking.socialLinks,
                                            createdAt: booking.createdAt,
                                            updatedAt: booking.updatedAt,
                                          })
                                        }
                                      >
                                        {booking.name}
                                      </strong>
                                    ) : (
                                      <span style={{ color: "gray" }}>
                                        No Entertainer
                                      </span>
                                    )}
                                  </td>
                                  <td>{booking.categoryName}</td>
                                  <td>{booking.specific_catName}</td>
                                  <td>
                                    <span
                                      className={`badge text-capitalize ${getStatusBadge(
                                        booking.status
                                      )}`}
                                    >
                                      {booking.status}
                                    </span>
                                  </td>
                                  <td>{booking.specialNotes || "No notes"}</td>
                                  <td>
                                    {booking.createdAt
                                      ? new Date(
                                          booking.createdAt
                                        ).toLocaleString()
                                      : " "}
                                  </td>
                                  <td>
                                    {booking.updatedAt
                                      ? new Date(
                                          booking.updatedAt
                                        ).toLocaleString()
                                      : " "}
                                  </td>
                                  <td>
                                    {booking.isAcceptedDate
                                      ? new Date(
                                          booking.isAcceptedDate
                                        ).toLocaleString()
                                      : " "}
                                  </td>
                                  <td>
                                    {booking.statusDate
                                      ? new Date(
                                          booking.statusDate
                                        ).toLocaleString()
                                      : " "}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="9" className="text-center">
                                  No bookings found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEventDetails;
