import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Input";
import Select from "../Select";

export default function EditEventModal({ event, onClose, fetchEvents }) {
  const formatDateTimeLocal = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    title: event.title || "",
    startTime: formatDateTimeLocal(event.startTime),
    endTime: formatDateTimeLocal(event.endTime),
    location: event.location || "",
    status: event.status || "pending",
    recurring: event.recurring || "none",
    description: event.description || "",
    eventId: Number(event.id) || 0,
    isAdmin: false,
  });

  useEffect(() => {
    setFormData({
      title: event.title || "",
      startTime: formatDateTimeLocal(event.startTime),
      endTime: formatDateTimeLocal(event.endTime),
      location: event.location || "",
      status: event.status || "pending",
      recurring: event.recurring || "none",
      eventId: Number(event.id) || 0,
    isAdmin: false,
    });
  }, [event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    console.log("data:",formData)
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}event`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchEvents();
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog event-modal" role="document">
        <div className="modal-content pe-2 ps-2">
          <div className="modal-header">
            <h5 className="modal-title fw-semibold">Edit Event</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-1">
              <label className="form-label profile-font fw-bold">
                Event Name
              </label>
              <Input
                type="text"
                className="form-control profile-font"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1">
              <label className="form-label profile-font fw-bold">
                Start Time
              </label>
              <Input
                type="datetime-local"
                className="form-control profile-font"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1">
              <label className="form-label profile-font fw-bold">
                End Time
              </label>
              <Input
                type="datetime-local"
                className="form-control profile-font"
                name="startTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1">
              <label className="form-label profile-font fw-bold">
                Location
              </label>
              <Input
                type="text"
                className="form-control profile-font"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1">
              <label className="form-label fw-bold profile-font">Status</label>
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

            <div className="mb-1">
              <label className="form-label fw-bold profile-font">
                Recurring
              </label>
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
