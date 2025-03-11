import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { Helmet } from "react-helmet-async";
import DashLayout from "../DashLayout";
import { CREATE_ADMIN_USER, GET_ROLES } from "../../../constants";
import AdminSideBar from "../../components/Venue/AdminSideBar";

const Create_Admin_User = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    contact: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roles, setRoles] = useState([]); // State for roles
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    role: "",
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_ROLES}`
        );
        console.log(response.data);

        setRoles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "confirmPassword") {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword:
          value === formData.password
            ? ""
            : "Password and Confirm Password do not match.",
      }));
    }

    if (name === "password") {
      setErrors((prevState) => ({
        ...prevState,
        password:
          value.length >= 6 ? "" : "Password must be at least 6 characters.",
        confirmPassword:
          formData.confirmPassword === value
            ? ""
            : "Password and Confirm Password do not match.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name ? "" : "Name is required.",
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
        ? ""
        : "Please enter a valid email address.",
      password:
        formData.password.length >= 6
          ? ""
          : "Password must be at least 6 characters.",
      confirmPassword:
        formData.password === formData.confirmPassword
          ? ""
          : "Passwords do not match.",
      contact: /^[0-9]{10}$/.test(formData.contact)
        ? ""
        : "Please enter a valid contact number.",
      role: formData.role ? "" : "Role is required.",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_ADMIN_USER}`,
        formData
      );

      if (response.status === 201) {
        console.log("User created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          contact: "",
        });
        alert("User created successfully!");
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
    <DashLayout/>
      children={
        <>
          <Helmet>
            <title>Create Admin User</title>
            <meta
              name="description"
              content="Create a new admin user for your platform."
            />
          </Helmet>

                <div className="container-fluid d-flex flex-column min-vh-100">
                  <div className="d-flex mt-0">
                    <div className="dash-sidebar-container">
                      <AdminSideBar />
                    </div>
                    <div className="dash-profile-container">
            <div className="row d-flex">
              <p className="fw-semibold profile-font">REGISTER ADMIN USER</p><hr/>
            </div>

            <form onSubmit={handleSubmit} className="profile-font">
              <div className="row">
                {/* Name */}
                <div className="col-md-6 col-sm-12">
                  <label className="text-start fw-bold">Name</label>
                  <Input
                    type="text"
                    placeholder="Enter user name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-danger text-start">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-6 col-sm-12">
                  <label className="text-start fw-bold">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-danger text-start">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="row">
                {/* Contact */}
                <div className="col-md-6 col-sm-12">
                  <label className="text-start fw-bold">Contact</label>
                  <Input
                    type="text"
                    placeholder="Enter contact number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <p className="text-danger text-start">{errors.contact}</p>
                  )}
                </div>
                {/* Role Dropdown */}
                <div className="col-md-6 col-sm-12">
                  <label className="text-start fw-bold">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role, index) => (
                      <option key={index} value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-danger text-start">{errors.role}</p>
                  )}
                </div>
                {/* Password */}
                <div className="col-md-6 col-sm-12">
                  <label className="text-start fw-bold">Password</label>
                  <div className="position-relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn  btn-sm position-absolute top-50 end-0 translate-middle-y"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={
                          showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                      ></i>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-danger text-start">{errors.password}</p>
                  )}
                </div>
                {/* Confirm Password */}
                <div className="col-md-6 col-sm-12">
                  <label className="text-start fw-bold">Confirm Password</label>
                  <div className="position-relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn  btn-sm position-absolute top-50 end-0 translate-middle-y"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <i
                        className={
                          showConfirmPassword
                            ? "fas fa-eye-slash"
                            : "fas fa-eye"
                        }
                      ></i>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-danger text-start">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="btn-dark mt-3 btn-sm text-white"
                label="Create User"
              />
            </form>
            </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Create_Admin_User;
