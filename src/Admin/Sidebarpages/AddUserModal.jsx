import React, { useState } from "react";
import axios from "axios";
import { CREATE_USER } from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUserModal({ showModal, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "venue",
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    let newErrors = { ...errors, [name]: "" };
  
    if (name === "phoneNumber") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
      }
    }
  
    setErrors(newErrors);
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_USER}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User Created successfully!", { autoClose: 1000 });
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      toast.error("Failed to create user: " + error.response?.data?.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex="-1">
        <div className="modal-dialog custom-user-modal">
          <div className="modal-content p-2">
            <div className="modal-header">
              <p className="modal-title fw-semibold mb-0">Add User</p>
              <button type="button" className="btn btn-close btn-sm" onClick={closeModal}></button>
            </div>
            <div className="modal-body profile-font">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name<span style={{ color: "red", display: "inline" }}>*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email<span style={{ color: "red", display: "inline" }}>*</span></label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number<span style={{ color: "red", display: "inline" }}>*</span></label>
                  <input
                    type="text"
                    className={`form-control profile-font ${errors.phoneNumber ? "is-invalid" : ""}`}
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password<span style={{ color: "red", display: "inline" }}>*</span></label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Role<span style={{ color: "red", display: "inline" }}>*</span></label>
                  <select className="form-select profile-font" style={{ fontSize: "14px" }} name="role" value={formData.role} onChange={handleChange}>
                    <option value="venue" className="profile-font">Venue</option>
                    <option value="entertainer" className="profile-font">Entertainer</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-sm rounded-3 btn-dark me-2" style={{ fontSize: "12px", width: "63px", height: "34px" }}>Save</button>
                <button type="button" className="btn btn-light rounded-3 btn-sm" style={{ fontSize: "12px", width: "76px", height: "34px" }} onClick={closeModal}>Cancel</button>

              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show" onClick={closeModal}></div>}
    </>
  );
}
