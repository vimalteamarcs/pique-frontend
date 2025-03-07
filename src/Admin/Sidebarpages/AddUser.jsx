import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashLayout from "../DashLayout";
import { CREATE_USER } from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUser() {
  const navigate = useNavigate();

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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
      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      console.log("error", error);

      toast.error(
        "Failed to create user with error: " + error.response.data.message
      );
    }
  };

  return (
    <DashLayout>
      <ToastContainer />
      <div className="container mt-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary d-flex align-items-center mb-4"
        >
          <i className="fa fa-arrow-left" style={{ marginRight: "8px" }}></i>
        </button>
        <h3 className="text-center my-3">Create User</h3>
        <form onSubmit={handleSubmit} className="row">
          <div className="mb-3 col-md-6 col-sm-12">
            <label className="form-label">Name</label>
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

          <div className="mb-3 col-md-6 col-sm-12">
            <label className="form-label">Email</label>
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

          <div className="mb-3 col-md-6 col-sm-12">
            <label className="form-label">Phone Number</label>
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

          {/* <div className="mb-3 col-md-6 col-sm-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="mb-3 col-md-6 col-sm-12">
            <label className="form-label text-start fw-bold">Password</label>
            <div className=" position-relative d-flex justify-content-between">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />

              <button
                type="button"
                className="btn position-absolute top-50 end-10 translate-middle-y border-0 bg-transparent "
                onClick={() => setShowPassword(!showPassword)}
                style={{ right: "10px" }} // Adjust right space to move button inside
              >
                <i
                  className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                ></i>
              </button>
            </div>
          </div>
          <div className="mb-3 col-md-6 col-sm-12">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="venue">Venue</option>
              <option value="entertainer">Entertainer</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </form>
      </div>
    </DashLayout>
  );
}
