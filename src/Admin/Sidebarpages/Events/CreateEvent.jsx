import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DashLayout from "../../DashLayout";
import { CREATE_EVENT, SEARCH_EVENT } from "../../../../constants";
import { toast, ToastContainer } from "react-toastify";
import AdminSideBar from "../../../components/Venue/AdminSideBar";
import Input from "../../../components/Input";

const CreateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const venue = location.state;

  // State to store form input values
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    venueId: Number(0),
    userId: Number(localStorage.getItem("userId")),
    description: "",
    startTime: "",
    endTime: "",
    recurring: "none",
    status: "unpublished",
    isAdmin: true,
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(""); // Use single state for message
  const [error, setError] = useState(""); // Use single state for errors
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${SEARCH_EVENT}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setVenues(response.data); // Adjust response format if needed
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues(); // Fetch venues when the component loads
  }, []);

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

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.title) newErrors.title = "Event Name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.startTime) newErrors.startTime = "Start Time is required";
    if (!formData.endTime) newErrors.endTime = "End Time is required";
    if (formData.recurring === "none") {
      newErrors.recurring = "Recurring selection is required.";
    }
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.venueId || formData.venueId === "") {
      newErrors.venueId = "Venue selection is required.";
    }
    if (!formData.phone || formData.phone.trim() === "") {
      newErrors.phone = "Venue contact number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit contact number.";
    }
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
      console.log(response.data);
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
  const handleSelectVenue = (e) => {
    const venueId = e.target.value;
    const selectedVenue = venues.find((venue) => venue.id.toString() === venueId);
   console.log("selected venue",selectedVenue)
    setFormData({
      ...formData,
      venueId: Number(venueId),
      location: selectedVenue ? `${selectedVenue.addressLine1}, ${selectedVenue.addressLine2}` : "",
      phone: selectedVenue ? selectedVenue.phone : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(formData)
    // Validate form before submitting
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      // Call POST API with form data
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_EVENT}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
console.log(response)
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
      console.log(error)
      console.error("Error creating event:", err);
    }
  };

  return (
    <>
      <DashLayout />
      <ToastContainer />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <div className="d-flex justify-content-between">
              <p className="fs-6 fw-semibold">EVENTS</p>
            </div>
            <div className="div event-form">
              <p
                className="label-font fw-semibold pt-3"
                style={{ fontSize: "14px" }}
              >
                Create Event
              </p>
              <hr />
              {/* {message && (
                <div className="alert alert-success label-font">{message}</div>
              )}
              {error && (
                <div className="alert alert-danger label-font">{error}</div>
              )} */}
              <p
                className=" fw-medium"
                style={{ color: "#9C9C9C", fontSize: "12px" }}
              >
                GENERAL INFORMATION
              </p>
              <form onSubmit={handleSubmit}>
                {venue ? (
                  <div className="row mt-2 mb-2">
                    <div className="col-md-6">
                      <label
                        htmlFor="title"
                        className="form-label fw-medium label-font"
                      >
                        Event Name
                        <span style={{ color: "red", display: "inline" }}>
                          *
                        </span>
                      </label>
                      <Input
                        type="text"
                        className={`form-control label-font ps-3 ${
                          errors.title ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Event Name"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                      {errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="title"
                          className="form-label label-font fw-medium mb-0"
                        >
                          Event Name
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`custom-form-event label-font ps-3 ${
                            errors.title ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Event name"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                        {errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="recurring"
                          className="form-label label-font fw-medium mb-0"
                        >
                          Recurring
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <select
                          className={`custom-form-event custom-select label-font ps-3 ${errors.recurring ? " is-invalid" : ""}`}

                          id="recurring"
                          name="recurring"
                          value={formData.recurring}
                          onChange={handleInputChange}
                        >
                          <option value="default" className="select-recurring">Select Recurring</option>
                          <option value="none" className="label-font">
                            None
                          </option>
                          <option value="daily" className="label-font">
                            Daily
                          </option>
                          <option value="weekly" className="label-font">
                            Weekly
                          </option>
                          <option value="monthly" className="label-font">
                            Monthly
                          </option>
                        </select>
                        {errors.recurring && (
                        <div className="invalid-feedback">{errors.recurring}</div>
                      )}
                      </div>
                      

                      
                    </div>
                  </>
                )}

                <div className="row mb-3">
   

                  <div className="col-md-6">
                    <label
                      htmlFor="location"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Event Location
                      <span style={{ color: "red", display: "inline" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className={`custom-form-event label-font ps-3 ${
                        errors.location ? "is-invalid" : ""
                      }`}
                      id="location"
                      placeholder="Enter Event location..."
                      name="location"
                      // value={formData.location}
                      // rows="1"
                      onChange={handleInputChange}
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="description"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Description
                      <span style={{ color: "red", display: "inline" }}>*</span>
                    </label>
                    <div className="col-12 col-md-12">
                      <textarea
                        type="text"
                        className={`custom-form-event label-font ps-3 pt-2 ${
                        errors.description ? "is-invalid" : ""
                      }`}
                        id="description"
                        name="description"
                        placeholder="Describe your Event..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="1"
                      />
                      {errors.description && (
                      <div className="invalid-feedback mt-0">{errors.description}</div>
                    )}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="startTime"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Start Date and Time
                      <span style={{ color: "red", display: "inline" }}>*</span>
                    </label>
                    <input
                      type="datetime-local"
                      className={`custom-form-event custom-date label-font ps-3 ${
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
                    <label
                      htmlFor="endTime"
                      className="form-label label-font fw-medium mb-0"
                    >
                      End Date and Time
                      <span style={{ color: "red", display: "inline" }}>*</span>
                    </label>
                    <input
                      type="datetime-local"
                      className={`custom-form-event custom-date label-font ps-3 ${
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

                <div className="row mb-2"></div>
                <p
                  className=" fw-medium mt-4"
                  style={{ color: "#9C9C9C", fontSize: "12px" }}
                >
                  VENUE INFORMATION
                </p>

                {/* <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="venueId"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Venue Name
                      <span style={{ color: "red", display: "inline" }}>*</span>
                    </label>

                    <select
                      className={`form-select custom-form-event label-font ps-3 ${
                        errors.venueId ? "is-invalid" : ""
                      }`}
                      id="venueId"
                      name="venueId"
                      value={selectedVenueId}
                      onChange={handleSelectVenue}
                    >
                      <option value="">Select a venue</option>
                      {venueSuggestions.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                          {venue.name} - {venue.addressLine1}{" "}
                          {venue.addressLine2}
                        </option>
                      ))}
                    </select>

                    {errors.venueId && (
                      <div className="invalid-feedback">{errors.venueId}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="location"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Location
                      <span style={{ color: "red", display: "inline" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className={`custom-form-event label-font ps-3 ${
                        errors.location ? "is-invalid" : ""
                      }`}
                      id="location"
                      placeholder="Select Venue Location"
                      name="location"
                      value={formData.location}
                      // rows="1"
                      onChange={handleInputChange}
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div>
                </div> */}

                <div className="row mb-3">
                  {/* Venue Dropdown */}
                  <div className="col-md-6">
                    <label
                      htmlFor="venueId"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Venue Name <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      className={`custom-form-event custom-select label-font ps-3 ${
                        errors.venueId ? "is-invalid" : ""
                      }`}
                      id="venueId"
                      name="venueId"
                      value={formData.venueId || ""}
                      onChange={handleSelectVenue}
                    >
                      <option value="">Select a venue</option>
                      {venues.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                          {venue.name}
                        </option>
                      ))}
                    </select>

                    {errors.venueId && (
                      <div className="invalid-feedback">{errors.venueId}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="location"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Location <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className={`custom-form-event label-font ps-3 ${
                        errors.location ? "is-invalid" : ""
                      }`}
                      id="location"
                      placeholder="Select Venue Location"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleInputChange}
                      readOnly
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="title"
                      className="form-label label-font fw-medium mb-0"
                    >
                      Venue Contact
                      <span style={{ color: "red", display: "inline" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className={`custom-form-event label-font ps-3 ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Venue Contact Number"
                      id="phone"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handlePhoneChange}
                    />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>

                <div className="submit-btn-container">
                  <button type="submit" className="btn btn-dark rounded-3">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
