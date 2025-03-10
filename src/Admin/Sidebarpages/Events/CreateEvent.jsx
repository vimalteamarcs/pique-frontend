import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DashLayout from "../../DashLayout";
import { CREATE_EVENT, SEARCH_EVENT } from "../../../../constants";
import { toast, ToastContainer } from "react-toastify";

const CreateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const venue = location.state;

  // State to store form input values
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    venueId: 0,
    userId: Number(localStorage.getItem("userId")),
    description: "",
    startTime: "",
    endTime: "",
    recurring: "none",
    status: "pending",
    isAdmin: true,
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // Use single state for message
  const [error, setError] = useState(""); // Use single state for errors

  useEffect(() => {
    const userid = localStorage.getItem("userId");
    if (venue && userid) {
      setFormData((prevData) => ({
        ...prevData,
        location: venue.addressLine1 + "," + venue.addressLine2,
        userId: Number(userid),
        venueId: venue.id,
      }));
    }
  }, [venue]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.title) newErrors.title = "Event Name is required";
    if (!formData.location) newErrors.location = "Event Location is required";
    if (!formData.startTime) newErrors.startTime = "Start Time is required";
    if (!formData.endTime) newErrors.endTime = "End Time is required";

    // Ensure startTime and endTime are valid Dates
    const startTime = new Date(formData.startTime);
    const endTime = new Date(formData.endTime);

    if (isNaN(startTime)) {
      newErrors.startTime =
        "Start Time must be a valid date in the format YYYY-MM-DDTHH:mm:ssZ";
    }
    if (isNaN(endTime)) {
      newErrors.endTime =
        "End Time must be a valid date in the format YYYY-MM-DDTHH:mm:ssZ";
    }

    // Ensure endTime is after startTime
    if (startTime && endTime && endTime <= startTime) {
      newErrors.endTime = "End Time must be after Start Time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };
  const [venueSuggestions, setVenueSuggestions] = useState([]);
  const [venueQuery, setVenueQuery] = useState("");

  // Fetch venues based on user input
  const fetchVenues = async (query) => {
    if (!query.trim()) {
      setVenueSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${SEARCH_EVENT}${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setVenueSuggestions(response.data); // Adjust response format if needed
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  // Handle venue input change
  const handleVenueChange = (e) => {
    const value = e.target.value;
    setVenueQuery(value);
    fetchVenues(value);
  };

  // Select venue from suggestions
  const handleSelectVenue = (venue) => {
    setFormData((prevData) => ({
      ...prevData,
      venueId: venue.id,
      location: `${venue.addressLine1}, ${venue.addressLine2}`,
    }));
    setVenueQuery(venue.name);
    setVenueSuggestions([]); // Hide suggestions
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      // Call POST API with form data
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_EVENT}`,
        formData,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        // Handle success response
        toast.success("Event added successfully!", {
          autoClose: 1000, // Close after 1 second
        });

        setError("");
        setMessage("Event created successfully!");
        // navigate("/events");
      }
    } catch (err) {
      // Handle error response
      setMessage("");
      toast.error("Failed to create event. Please try again.");
      setError("Error creating event.");
      console.error("Error creating event:", err);
    }
  };

  return (
    <DashLayout>
      <ToastContainer />
      <div className={`container p-5  `}>

            <div>
              <button
                onClick={() => navigate(-1)}
                className="btn btn-primary d-flex justify-content-between float-start mb-4 btn-sm"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <h4 className="text-center mb-2">Create Event</h4>

              {/* Display success/error message */}
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
              <div className="row mb-3 w-100">

                {venue ? (
                    <div className="col-12 col-md-6">
                      <label htmlFor="title" className="form-label">
                        Event Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.title ? "is-invalid" : ""
                        }`}
                        placeholder="enter event name"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                      {errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                    </div>
                ) : (
                  <>
                    <div className="col-12 col-md-6">
                      <label htmlFor="title" className="form-label">
                        Event Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.title ? "is-invalid" : ""
                        }`}
                        placeholder="enter event name"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                      {errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                    </div>
                    <div className="col-12 col-md-6 position-relative">
                      <label htmlFor="venueId" className="form-label">
                        Select Venue
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.venueId ? "is-invalid" : ""
                        }`}
                        placeholder="Enter venue name"
                        id="venueId"
                        name="venueId"
                        value={venueQuery}
                        onChange={handleVenueChange}
                      />
                      {errors.venueId && (
                        <div className="invalid-feedback">{errors.venueId}</div>
                      )}

                      {/* Venue Suggestions Dropdown */}
                      {venueSuggestions.length > 0 && (
                        <ul
                          className="list-group position-absolute w-100 mt-1"
                          style={{ zIndex: 10 }}
                        >
                          {venueSuggestions.map((venue) => (
                            <li
                              key={venue.id}
                              className="list-group-item list-group-item-action"
                              onClick={() => handleSelectVenue(venue)}
                              style={{ cursor: "pointer" }}
                            >
                              {venue.name}
                              <p style={{ fontSize: "0.675rem" }}>
                                {venue.addressLine1 + " " + venue.addressLine2}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    </>
                )}
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <textarea
                      type="text"
                      className={`form-control ${
                        errors.location ? "is-invalid" : ""
                      }`}
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="recurring" className="form-label">
                      Recurring
                    </label>
                    <select
                      className="form-select"
                      id="recurring"
                      name="recurring"
                      value={formData.recurring}
                      onChange={handleInputChange}
                    >
                      <option value="none">None</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="startTime" className="form-label">
                      Start Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      className={`form-control ${
                        errors.startTime ? "is-invalid" : ""
                      }`}
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                    {errors.startTime && (
                      <div className="invalid-feedback">{errors.startTime}</div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="endTime" className="form-label">
                      End Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      className={`form-control ${
                        errors.endTime ? "is-invalid" : ""
                      }`}
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                    {errors.endTime && (
                      <div className="invalid-feedback">{errors.endTime}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mb-1 d-flex justify-content-center mx-auto"
                >
                  Create Event
                </button>
              </form>
            </div>
          </div>
     
    </DashLayout>
  );
};

export default CreateEvent;
