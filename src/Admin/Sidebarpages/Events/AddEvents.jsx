import React from "react";
import DashLayout from "../../DashLayout";
import { ToastContainer } from "react-toastify";
import AdminSideBar from "../../../components/Venue/AdminSideBar";

export default function AddEvents() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
              <input
                type="text"
                className="dashSearchBar label-font mb-2 ps-3"
                placeholder="Search"
                style={{ color: "#778DA2" }}
              />
            </div>
            <div className="div event-form">
              <p
                className="label-font fw-semibold pt-3"
                style={{ fontSize: "14px" }}
              >
                Create Event
              </p>
              <hr />
              {message && (
                <div className="alert alert-success label-font">{message}</div>
              )}
              {error && (
                <div className="alert alert-danger label-font">{error}</div>
              )}
              <p
                className=" fw-medium"
                style={{ color: "#9C9C9C", fontSize: "12px" }}
              >
                GENERAL INFORMATION
              </p>
              <form onSubmit={handleSubmit}>
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
                      <Input
                        type="text"
                        className={`custom-form-event label-font ps-3${
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
                        className="custom-form-event custom-select label-font ps-3"
                        id="recurring"
                        name="recurring"
                        value={formData.recurring}
                        onChange={handleInputChange}
                      >
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
                    </div>
                  </div>
                </>

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
                        className="custom-form-event label-font ps-3 pt-2"
                        id="description"
                        name="description"
                        placeholder="Describe your Event..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="2"
                      />
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

                <div className="row mb-3">
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
                    <Input
                      type="text"
                      className={`custom-form-event label-font ps-3${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Venue Contact Number"
                      id="title"
                      name="title"
                      // value={formData.title}
                      // onChange={handleInputChange}
                    />
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
}
