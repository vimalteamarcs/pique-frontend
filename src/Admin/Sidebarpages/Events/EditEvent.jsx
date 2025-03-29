import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DashLayout from "../../DashLayout";
import { UPDATE_EVENT } from "../../../../constants";
import { toast, ToastContainer } from "react-toastify";
import AdminSideBar from "../../../components/Venue/AdminSideBar";
import Input from "../../../components/Input";

const EditEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;
  console.log("event state", event);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    venueId: 0,
    userId: localStorage.getItem("userId"),
    description: "",
    startTime: "",
    endTime: "",
    recurring: "none",
    status: "unpublished",
    venueName: "",
    phone: "",
    isAdmin: true,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (event?.id) {
      setFormData({
        ...event,
        isAdmin: Boolean(event.isAdmin),
        startTime: event.startTime
          ? new Date(event.startTime).toISOString().slice(0, 16)
          : "",
        endTime: event.endTime
          ? new Date(event.endTime).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Event Name is required";
    if (!formData.location) newErrors.location = "Event Location is required";
    if (!formData.recurring)
      newErrors.recurring = "Recurring Selection is required";
    if (!formData.status) newErrors.status = "Status selection is required";
    if (!formData.startTime) newErrors.startTime = "Start Time is required";
    if (!formData.venueName) newErrors.venueName = "Venue Name is required";
    // if (!formData.location) newErrors.location = "Loction is required";
    if (!formData.phone) newErrors.phone = "Contact Number is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.endTime) newErrors.endTime = "End Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}${UPDATE_EVENT}${event.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Event updated successfully!", { autoClose: 1000 });
    } catch (err) {
      toast.error("Failed to update event. Please try again.");
      console.log(err);
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
            <div className="card">
              <div className="card-body">
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-outline-dark btn-sm float-end mb-4"
                >
                  <i className="fa fa-close"></i>
                </button>
                <p className="profile-font fw-semibold mb-2">EDIT EVENT</p>
                <hr />
                <div className="event-form p-3">
                  <p
                    className="fw-medium label-font "
                    style={{ color: "#9C9C9C", fontSize: "12px" }}
                  >
                    GENERAL INFORMATION
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label label-font fw-medium mb-0">
                          Event Name
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`custom-mid-form ps-3 label-font ${
                            errors.title ? "is-invalid" : ""
                          }`}
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
                          className={`custom-mid-form custom-select label-font ps-3 ${
                            errors.recurring ? "is-invalid" : ""
                          }`}
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
                        {errors.recurring && (
                          <div className="text-danger">{errors.recurring}</div>
                        )}
                      </div>
                      {/* <div className="col-md-6">
                    <label className="form-label label-font fw-semibold mb-0">Location<span style={{color:"red", display:"inline"}}>*</span></label>
                    <input
                      type="text"
                      className={`custom-mid-form ps-3 label-font${errors.location ? "is-invalid" : ""
                        }`}
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div> */}
                      {/* <div className="col-md-6">
                    <label className="form-label label-font fw-medium mb-0">Client<span style={{color:"red", display:"inline"}}>*</span></label><br/>
                    <input
                      type="text"
                      className={`custom-mid-form ps-3 label-font ${errors.title ? "is-invalid" : ""}`}
                      name="title"
                      placeholder="Enter Venue Owner Name"
                      onChange={handleInputChange}
                    />
                   
                  </div> */}
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="status"
                          className="form-label label-font fw-medium mb-0"
                        >
                          Status
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <br />
                        <select
                          className={`custom-mid-form custom-select label-font ps-3 ${
                            errors.status ? "is-invalid" : ""
                          }`}
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="unpublished" className="label-font">
                            Unpublished
                          </option>
                          <option value="scheduled" className="label-font">
                            Scheduled
                          </option>
                          <option value="confirmed" className="label-font">
                            Confirmed
                          </option>
                          <option value="cancelled" className="label-font">
                            Cancelled
                          </option>
                        </select>
                        {errors.status && (
                          <div className="invalid-feedback">
                            {errors.status}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label label-font fw-medium mb-0">
                          Description
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <textarea
                          className={`custom-mid-form ps-3 label-font pe-2 pt-2 form-control ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label label-font fw-medium mb-0">
                          Start Date and Time
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="datetime-local"
                          className={`custom-mid-form ps-3 label-font pe-2${
                            errors.startTime ? "is-invalid" : ""
                          }`}
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleInputChange}
                        />
                        {errors.startTime && (
                          <div className="invalid-feedback">
                            {errors.startTime}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label label-font fw-medium mb-0">
                          End Date and Time
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="datetime-local"
                          className={`custom-mid-form ps-3 label-font pe-2 ${
                            errors.endTime ? "is-invalid" : ""
                          }`}
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleInputChange}
                        />
                        {errors.endTime && (
                          <div className="invalid-feedback">
                            {errors.endTime}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3"></div>

                    <p
                      className="fw-medium label-font "
                      style={{ color: "#9C9C9C", fontSize: "12px" }}
                    >
                      VENUE INFORMATION
                    </p>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="venueName"
                          className="form-label label-font fw-medium mb-0"
                        >
                          Venue Name
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`custom-mid-form label-font ps-3${
                            errors.venueName ? "is-invalid" : ""
                          }`}
                          placeholder="Enter venue name"
                          id="venueName"
                          value={formData.venueName}
                          onChange={handleInputChange}
                          name="venueName"
                          // value={venueQuery}
                          // onChange={handleVenueChange}
                        />
                        {errors.venueName && (
                          <div className="invalid-feedback">
                            {errors.venueName}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="location"
                          className="form-label label-font fw-medium mb-0"
                        >
                          Location
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`custom-mid-form label-font ps-3 ${
                            errors.location ? "is-invalid" : ""
                          }`}
                          id="location"
                          placeholder="Enter Your location..."
                          name="location"
                          value={formData.location}
                          // rows="1"
                          onChange={handleInputChange}
                        />
                        {errors.location && (
                          <div className="invalid-feedback">
                            {errors.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="phone"
                          className="form-label label-font fw-medium mb-0"
                        >
                          Venue Contact
                          <span style={{ color: "red", display: "inline" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className={`custom-mid-form label-font ps-3 form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Venue Contact Number"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <button
                          type="submit"
                          className="btn btn-dark label-font rounded-3 float-start"
                        >
                          Update Event
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEvent;
