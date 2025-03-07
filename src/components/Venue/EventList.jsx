import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditEventModal from "./EditEventModal";

export default function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}event`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Events Response:", response.data);

      if (Array.isArray(response.data.data)) {
        setEvents(response.data.data);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClick = () => {
    navigate("/venue/addevents");
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-0">
        <div className="div">
          <p className="fw-bold mb-0">EVENTS</p>
        </div>
        <div className="div">
          <Button
            className="btn venue-btn btn-sm profile-font"
            label="Add Events"
            onClick={handleClick}
          />
        </div>
      </div>
      <hr />

      {loading ? (
        <div className="d-flex justify-content-center my-5">
        <div className="spinner-grow text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : events.length > 0 ? (
        <div className="table">
          <table className="table table-responsive">
            <thead>
              <tr className="profile-font">
                <th>Sr No.</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Location</th>
                <th>Recurring</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id} className="profile-font">
                  <td>{index + 1}</td>
                  <td>{event.title}</td>
                  <td>
                    {new Date(event.startTime).toLocaleDateString()} |{" "}
                    {new Date(event.startTime).toLocaleTimeString()}
                  </td>

                  <td>
                    {" "}
                    <span
                      className={`badge ${
                        event.status === "confirmed"
                          ? "bg-success text-white"
                          : "bg-secondary text-white"
                      }`}
                      style={{  borderRadius: "10px" }}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td>{event.location}</td>
                  <td>{event.recurring}</td>
                  <td>
                    <Button className="btn btn-outline-warning btn-sm" onClick={() => handleEdit(event)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No events found.</p>
      )}

{showModal && selectedEvent && (
        <EditEventModal event={selectedEvent} onClose={closeModal} fetchEvents={fetchEvents} />
      )}
    </>
  );
}
