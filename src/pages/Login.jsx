import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

 setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/login`,
        formData
      );
      console.log("Login successful", response.data);
      const token = response.data.access_token;
      const role = response.data.data.user.role;
      const userId = response.data.data.user.id;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("status", response.data.data.user.status);
      localStorage.setItem("userName", response.data.data.user.name);
      localStorage.setItem('phone',response.data.data.user.phone);
      localStorage.setItem('email',response.data.data.user.email);
      window.dispatchEvent(new Event("storage"));

      // const status = localStorage.getItem("status");
      // if (response.data.role === "venue" && status === "pending") {
      //   navigate("/statusverification");
      // } else if (response.data.role === "venue" && status === "active") {
      //   navigate("/loggedin/venuedash");
      // }else if (response.data.role === "entertainer" && status === "pending"){
      //   navigate("/statusverification");
      // }else if (response.data.role === "entertainer" && status === "active") {
      //   navigate("/loggedin/entertainerdash");
      // }else{
      //   navigate("/error");
      // }

      if (role === "venue") {
        navigate("/venue");
      } else if (role === "entertainer") {
        navigate("/entertainer");
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error("Login error", error);
      toast.danger(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Login to your account to access personalized features and services."
        />
      </Helmet>
      <Toaster/>
      {/* <PiqueNavbar/> */}
      <div className="container min-vh-100 ">
        <div className="row d-flex justify-content-around mt-5">
          <div className="col-md-6 col-sm-12 d-none d-md-block">
            <img
              src="./assets/pique/image/login.png"
              className="img-fluid"
              style={{ height: "90%" }}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row mt-5 d-flex justify-content-center">
              <img
                src="./assets/pique/image/logo.png"
                className="w-auto mt-5"
                style={{ height: "40px" }}
              />
            </div>
            <div className="row d-flex justify-content-center">
              <h3 className="text-center mt-5 fw-semibold">Login</h3>
              <div className="col-md-10 col-sm-12 p-3 ">
                {/* {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )} */}
                <form onSubmit={handleSubmit}>
                  <div className="row ">
                    <label className="fw-semibold">Email<span style={{ color: "red", display: "inline" }}>*</span></label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-line text-dark"
                      error={errors.email}
                      />
                  </div>

                  <div className="row mt-2">
                    <label className="fw-semibold">Password<span style={{ color: "red", display: "inline" }}>*</span></label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                      className="input-line text-dark"
                      error={errors.password}
                    />

                  
                  </div>

                  <div className="d-flex justify-content-between mb-3 mt-3">
                    <div>
                      <input type="checkbox" id="rememberMe" className="m-1" />
                      <label htmlFor="rememberMe" className="profile-font">Remember Me</label>
                    </div>
                    <Link href="#" className="text-decoration-none text-dark profile-font">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <Button
                        type="submit"
                        className="btn-primary w-100 fw-bold sign-in-btn"
                        label="Login"
                      />
                    </div>
                  </div>
                </form>
                <p className="text-center mt-3 profile-font">
                  Don't have an account?
                  <Link to="/signup/venue" className="text-primary">
                    Sign Up Now
                  </Link>
                </p>

                <p
                  className="text-center"
                  style={{ fontSize: "12px" }}
                >
                  T&C | Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <PiqueFooter/> */}
    </>
  );
};

export default Login;
