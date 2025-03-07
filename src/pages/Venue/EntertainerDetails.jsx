import React, { useEffect, useState } from "react";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/Venue/SearchBar";
import axios from "axios";
import Input from "../../components/Input";
import toast, { Toaster } from "react-hot-toast";
import Select from "../../components/Select";

export default function EntertainerDetails() {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  const location = useLocation();
  const navigate = useNavigate();
  const entertainerId = localStorage.getItem("entertainerId");
  const [entertainer, setEntertainer] = useState({});
  const [loading, setLoading] = useState(true);
  const [showTime, setShowTime] = useState("");
  const [showDate, setShowDate] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    const fetchEntertainerDetails = async () => {
      if (!entertainerId) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }venues/entertainer-profile/${entertainerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Fetched entertainer:", response.data.entertainer);
        setEntertainer(response.data?.entertainer || {});
      } catch (error) {
        console.error("Error fetching entertainer details:", error);
        setEntertainer({});
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainerDetails();
  }, [entertainerId]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}event`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Fetched events:", response.data);
        setEvents(response.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const venueId = localStorage.getItem("userId");
    const entertainerId = localStorage.getItem("entertainerId");

    const formData = new FormData(e.target);
    const showTime = formData.get("showTime");
    const showDate = formData.get("showDate");
    const specialNotes = formData.get("specialNotes");

    if (!showTime || !showDate) {
      alert("Please select show time and date.");
      return;
    }

    const bookingData = {
      entertainerId: Number(entertainerId),
      venueId: Number(venueId),
      performanceRole: entertainer.performanceRole,
      showTime: showTime,
      showDate: showDate,
      specialNotes: specialNotes,
      eventId: Number(selectedEvent),
    };
    console.log(bookingData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}venues/createbooking`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Booking request sent successfully!");
      } else {
        toast.error("Failed to send booking request.");
      }
    } catch (error) {
      console.log("Error creating booking:", error);
      toast.error("An error occurred while booking.");
    }
  };

  const image = entertainer.media?.find((media) => media.type === "image")?.url;

  return (
    <DashLayoutVenue
      title="Entertainer Profile"
      description="View and book entertainer according to your preferences."
    >
      <div className="d-flex flex-column min-vh-100">
        <Toaster position="top-center" reverseOrder={false} />
        <SearchBar updateFilters={(filters) => setSearchParams(filters)} />
        <div className="container ">
          <p
            className="profile-font mt-3 fw-semibold text-decoration-none text-muted"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-angle-left me-2"></i>Back to Entertainers
            Search
          </p>

          <div className="d-flex justify-content-between align-items-center mb-0">
            <h4 className="fw-semibold mt-3">{entertainer.name}</h4>
            <div className="div">
              <i className="fa-solid fa-arrow-up-from-bracket me-1 profile-font"></i>
              <span className="profile-font">Share</span>
              <i className="fa-solid fa-heart ms-3 me-1 profile-font"></i>
              <span className="profile-font">Wishlist</span>
            </div>
          </div>

          <div className="row d-flex justify-content-between column-gap-5">
            {!loading && entertainer?.media?.length > 0 ? (
              <div className="row">
                {entertainer?.media?.filter((media) => media.type === "image")
                  .length > 0 ? (
                  <>
                    <div className="col-md-7">
                      <img
                        src={
                          entertainer.media.find(
                            (media) => media.type === "image"
                          )?.url
                        }
                        alt="Main Entertainer Image"
                        className="img-fluid rounded-4 main-image"
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="col-md-5 d-flex flex-wrap gap-2">
                      {entertainer?.media
                        ?.filter((media) => media.type === "image")
                        .slice(1, 5)
                        .map((media, index) => (
                          <img
                            key={index}
                            src={
                              media.url || "/assets/pique/image/magician.jpg"
                            }
                            alt={`Entertainer Image ${index + 2}`}
                            className="img-fluid rounded-4 small-image"
                            style={{
                              width: "48%",
                              height: "190px",
                              objectFit: "cover",
                            }}
                          />
                        ))}
                    </div>
                  </>
                ) : (
                  <p>No images available</p>
                )}
              </div>
            ) : (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-grow text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <div className="row booking-row mt-5">
              <div className="col-md-8">
                <div className="row booking-heading">
                  <div className="col-md-3">
                    <h5 className="fw-semibold">Booking Info</h5>
                  </div>
                  <div className="col-md-9 entertainer-details">
                    <div className="row">
                      <div className="col-md-3">
                        <p className="profile-font fw-semibold mb-0">
                          Entertainer Name:
                        </p>
                        <p className="profile-font fw-semibold mb-0">
                          Category:
                        </p>
                        <p className="profile-font fw-semibold">
                          Pricing(per hour):
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p className="profile-font mb-0">{entertainer.name}</p>
                        <p className="profile-font mb-0">
                          Rs.{entertainer.category}
                        </p>
                        <p className="profile-font">
                          {entertainer.pricePerEvent}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="about-section">
                      <p className="fw-semibold mb-4">About</p>
                      <p className="profile-font">{entertainer.bio}</p>
                    </div>
                    <hr />
                    <div className="what-you-get">
                      <p className="fw-semibold mb-4">What will you get</p>
                      <ul className="timeline ">
                        <li className="timeline-item2">
                          <span className="paraTxt profile-font">
                            Lorem Ipsum sample dummy text
                          </span>
                        </li>
                        <li className="timeline-item2">
                          <span className="paraTxt profile-font">
                            Lorem Ipsum sample dummy text
                          </span>
                        </li>
                        <li className="timeline-item2">
                          <span className="paraTxt profile-font">
                            Lorem Ipsum sample dummy text
                          </span>
                        </li>
                        <li className="timeline-item2">
                          <span className="paraTxt profile-font">
                            Lorem Ipsum sample dummy text
                          </span>
                        </li>
                        <li className="timeline-item2">
                          <span className="paraTxt profile-font">
                            Lorem Ipsum sample dummy text
                          </span>
                        </li>
                      </ul>
                    </div>
                    <hr />

                    <div className="availability">
                      <p className="fw-semibold mb-4">Availability</p>
                      <p className="profile-font"></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                {entertainer?.vaccinated && (
                  <span
                    className={`vaccination-badge ${
                      entertainer.vaccinated === "yes"
                        ? "vaccinated-orange"
                        : "vaccinated-red"
                    }`}
                  >
                    Vaccinated
                  </span>
                )}
                <div className="d-flex flex-column align-items-center">
                  {entertainer?.media?.length > 0 && (
                    <img
                      src={
                        entertainer.media.find((m) => m.type === "headshot")
                          ?.url || "../assets/pique/image/alfonso4.avif"
                      }
                      alt={entertainer?.name || "No name available"}
                      className="img-fluid rounded-circle"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <h5 className="text-center mt-3 mb-1">{entertainer.name}</h5>
                <p className="star-font text-center">
                  4.5 <i className="fa-solid fa-star star-icon"></i>
                  <i className="fa-solid fa-star star-icon"></i>
                  <i className="fa-solid fa-star star-icon"></i>
                  <i className="fa-solid fa-star star-icon"></i>
                  <i className="fa-solid fa-star-half-stroke star-icon"></i>
                </p>

                <div className="booking-form">
                  <form onSubmit={handleBookingSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="icon-font fw-semibold">
                          Duration
                        </label>
                        <Input
                          type="time"
                          className="form-control icon-font"
                          name="showTime"
                          value={showTime}
                          onChange={(e) => setShowTime(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="icon-font fw-semibold">
                          Date of Event
                        </label>
                        <Input
                          type="date"
                          className="form-control icon-font"
                          name="showDate"
                          value={showDate}
                          onChange={(e) => setShowDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="div">
                      <label className="icon-font fw-semibold">
                        Entertainers
                      </label>
                      <select
                        className="form-select icon-font rounded-3"
                        aria-label="Default select example"
                      >
                        <option value="default">Soloist</option>
                        <option value="1">Duo</option>
                        <option value="2">Trio</option>
                      </select>
                    </div>
                    <hr />
                    <p className="mt-2 icon-font mb-1 fw-semibold">
                      Special Notes
                    </p>
                    <textarea
                      className="form-control icon-font"
                      placeholder="Enter your message here..."
                      rows="2"
                      value={specialNotes}
                      name="specialNotes"
                      onChange={(e) => setSpecialNotes(e.target.value)}
                    ></textarea>
                    <hr />
                    <p className="mt-2 icon-font mb-1 fw-semibold">
                      Choose Event
                    </p>
                    <select
                      name="eventId"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="form-control icon-font"
                    >
                      <option value="">--Select Event--</option>
                      {events.length > 0 ? (
                        events.map((event) => (
                          <option key={event.id} value={event.id}>
                            {event.title}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading events...</option>
                      )}
                    </select>

                    <Button
                      className="btn venue-btn w-100 mt-2 profile-font rounded-3 w-100 mt-3 text-white"
                      type="submit"
                      label="Send Booking Request"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayoutVenue>
  );
}
