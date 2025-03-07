import React, { useState } from "react";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import Select from "../../components/Select";

export default function AddEvents() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const requestBody = {
      venueId: Number(localStorage.getItem('venueId')), 
      title: formData.title,
      startTime: `${formData.startTime}:00Z`, 
      endTime: `${formData.endTime}:00Z`, 
      location: formData.location,
      description: formData.description,
      recurring: formData.recurring,  
      status: formData.status,
      isAdmin: false,
    };
    console.log("Request body:", requestBody);

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}event`, requestBody,  {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
      
        console.log("Event added successfully:", response.data);
        navigate('/venue/events')
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashLayoutVenue
        title="Profile"
        description="View and manage your profile"
      >
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
            </div>
            <div className="profile-container">
              <p className="fw-bold">ADD EVENT FORM</p>
              <hr />
              <p
                className="fw-semibold icon-font mt-3 text-muted"
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-angle-left me-2"></i>Back to Events
                List
              </p>

              {/* event form */}
              <form onSubmit={handleSubmit}>
              <div className="row mt-4">
                <div className="col-md-12">
                    <label className="profile-font fw-bold">Event Title</label>
                    <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control profile-font"
                    placeholder="Enter event title"
                    required
                    />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                    <label className="profile-font fw-bold">Start Time</label>
                    <Input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="form-control profile-font"
                    required
                    />
                </div>
                <div className="col-md-6">
                <label className="profile-font fw-bold">End Time</label>
                    <Input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="form-control profile-font"
                    required
                    />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="fw-bold profile-font">Recurring</label>
                  <Select
                    name="recurring"
                    value={formData.recurring}
                    className="form-control profile-font"
                    onChange={handleChange}
                    options={[
                      { value: "none", label: "None" },
                      { value: "daily", label: "Daily" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                    ]}
                    defaultOption="--Select Recurring Type--"
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-bold profile-font">Status</label>
                  <Select
                    name="status"
                    value={formData.status}
                    className="form-control profile-font"
                    onChange={handleChange}
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "confirmed", label: "Confirmed" },
                      { value: "cancelled", label: "Cancelled" },
                      { value: "completed", label: "Completed" },
                    ]}
                    defaultOption="--Select Status--"
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-12">
                    <label className="fw-bold profile-font">Location</label>
                <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control profile-font"
                    placeholder="Enter event location"
                    required
                    />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                    <label className="fw-bold profile-font">Description</label>
                    <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control profile-font"
                    placeholder="Enter event description"
                    rows="1"
                    required
                    />
                </div>
              </div>

              <Button type="submit" className="btn venue-btn btn-sm profile-font mt-3" label="Submit"/>
              </form>
            </div>
          </div>
        </div>
      </DashLayoutVenue>
    </>
  );
}
