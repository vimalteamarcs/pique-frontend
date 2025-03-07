import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import { ADMIN_LOGIN } from "../../constants";
const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hey");
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${ADMIN_LOGIN}`,
        formData
      );

      //console.log("Login successful", response.data);

      // Save data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("role", response.data.role);

      // Dispatch login action to update Redux state
      dispatch(login());

      // Navigate based on user role
      if (response.data.access_token) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/admin/login", { replace: true });
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
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

      <div className="container min-vh-100 mt-5">
        <div className="row text-center d-flex justify-content-center">
          <h1 className="fw-bold mt-3">Login</h1>
        </div>
        <div className="row d-flex justify-content-around mt-3">
          <div className="col-md-6 col-sm-12 d-none d-md-block">
            <img
              src={`${import.meta.env.VITE_BASE}assets/images/loginuser.avif`}
              className="img-fluid h-75 w-100"
              alt="login"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10 col-sm-12 p-3 mt-5">
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row my-3">
                    <label className=" form-label text-start fw-bold">
                      Email
                    </label>
                    <div className=" position-relative d-flex justify-content-between">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="row my-3">
                    <label className="form-label text-start fw-bold">
                      Password
                    </label>
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
                          className={
                            showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <Button
                        type="submit"
                        className="btn-primary w-25 fw-bold"
                        label="Login"
                      />
                    </div>
                  </div>
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
