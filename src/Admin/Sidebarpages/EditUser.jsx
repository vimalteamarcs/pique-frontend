import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DashLayout from "../DashLayout";
import { UPDATE_USER } from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSideBar from "../../components/Venue/AdminSideBar";

export default function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;
  console.log(user);

  const [formData, setFormData] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    role: user?.role || "venue",
    status: user?.status || "pending",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateFormData = () => {
    let newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    const validRoles = ["venue", "entertainer"];
    if (!validRoles.includes(formData.role)) {
      newErrors.role = "Invalid role selected.";
    }

    const validStatuses = ["active", "inactive", "pending"];
    if (!validStatuses.includes(formData.status)) {
      newErrors.status = "Invalid status selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return; // Prevent submission if validation fails
    const datatoupdate = {
      id: formData.id,
      fieldsToUpdate: {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        status: formData.status,
      },
    };

    //console.log("Form Data:", datatoupdate);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}${UPDATE_USER}`,
        datatoupdate,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("User Updated successfully!", {
        autoClose: 1000, // Close after 1 second
      });
      //navigate(-1);
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  return (
    <>
      <DashLayout />
      <ToastContainer />
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-dark btn-sm d-flex align-items-center mb-4"
            >
              <i
                className="fa fa-arrow-left"
                style={{ marginRight: "8px" }}
              ></i>
            </button>

            <p className="profile-font fw-semibold">UPDATE USER DETAILS</p>
            <hr />
            <form onSubmit={handleSubmit} className="event-form pt-2 pb-3">
              <div className="row profile-font">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="form-label fw-semibold mb-0">Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="form-label fw-semibold mb-0">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="row profile-font">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="form-label fw-semibold mb-0">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger">{errors.phoneNumber}</div>
                  )}
                </div>

                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="form-label fw-semibold mb-0">Role</label>
                  <select
                    className={`form-control ${
                      errors.role ? "is-invalid" : ""
                    }`}
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="venue">Venue</option>
                    <option value="entertainer">Entertainer</option>
                  </select>
                  {errors.role && (
                    <div className="text-danger">{errors.role}</div>
                  )}
                </div>
              </div>

              <div className="row profile-font">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="form-label fw-semibold mb-0">Status</label>
                  <select
                    className={`form-control ${
                      errors.status ? "is-invalid" : ""
                    }`}
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                  {errors.status && (
                    <div className="text-danger">{errors.status}</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-outline-dark flost-start btn-sm"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
