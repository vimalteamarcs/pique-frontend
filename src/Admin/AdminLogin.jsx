// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";
// import Button from "../components/Button";
// import { Link, useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { login, logout } from "../redux/slices/authSlice";
// import { ADMIN_LOGIN } from "../../constants";
// const AdminLogin = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("hey");
//   }, []);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);

//     try {
//       console.log(`${import.meta.env.VITE_API_URL}${ADMIN_LOGIN}`);

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}${ADMIN_LOGIN}`,
//         formData
//       );


//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("token", response.data.access_token);
//       localStorage.setItem("userId", response.data.user.id);
//       localStorage.setItem("role", response.data.role);


//       dispatch(login());


//       if (response.data.access_token) {
//         navigate("/admin", { replace: true });
//       } else {
//         navigate("/admin/login", { replace: true });
//       }
//     } catch (error) {
//       console.error("Login error", error);
//       setErrorMessage(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Login</title>
//         <meta
//           name="description"
//           content="Login to your account to access personalized features and services."
//         />
//       </Helmet>

//       <div className="container min-vh-100 mt-5">
//         <div className="row text-center d-flex justify-content-center">
//           <h3 className="fw-bold mt-3">Admin Login</h3>
//         </div>
//         <div className="row d-flex justify-content-around">
//           <div className="col-md-6 col-sm-12">
//             <div className="row d-flex justify-content-center">
//               <div className="col-md-10 col-sm-12 p-3 mt-5">
//                 {errorMessage && (
//                   <div className="alert alert-danger" role="alert">
//                     {errorMessage}
//                   </div>
//                 )}
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <label className=" form-label text-start fw-semibold">
//                       Email<span style={{ color: "red", display: "inline" }}>*</span>
//                     </label>
//                     <div className=" position-relative d-flex justify-content-between">
//                       <input
//                         type="email"
//                         placeholder="Enter your email address"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="form-control"
//                       />
//                     </div>
//                   </div>

                  
//                   <div className="row mt-3">
//                     <label className="form-label text-start fw-semibold">
//                       Password<span style={{ color: "red", display: "inline" }}>*</span>
//                     </label>
//                     <div className=" position-relative d-flex justify-content-between">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="form-control"
//                       />

//                       <button
//                         type="button"
//                         className="btn position-absolute top-50 end-10 translate-middle-y border-0 bg-transparent "
//                         onClick={() => setShowPassword(!showPassword)}
//                         style={{ right: "10px" }} 
//                       >
//                         <i
//                           className={
//                             showPassword ? "fas fa-eye-slash" : "fas fa-eye"
//                           }
//                         ></i>
//                       </button>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col d-flex justify-content-center mt-3">
//                       <Button
//                         type="submit"
//                         className="btn-primary fw-bold"
//                         label="Login"
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminLogin;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { ADMIN_LOGIN } from "../../constants";
import Input from "../components/Input";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Admin Login Mounted");
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

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("role", response.data.role);

      dispatch(login());

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
        <title>Admin Login</title>
        <meta
          name="description"
          content="Login to your admin account to manage the system."
        />
      </Helmet>
      <h3 className="text-center fw-bold mt-5">Admin Login</h3>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="card shadow rounded-5 p-4 mt-5" style={{width:"500px"}}>
          <div className="card-body">

            {errorMessage && (
              <div className="alert alert-danger text-center">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email <span className="text-danger">*</span>
                </label>
                <Input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {/* <button
                    type="button"
                    className="btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button> */}
                       <button
                        type="button"
                        className="btn position-absolute top-50 translate-middle-y border-0 bg-transparent "
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ right: "1px" }} 
                      >
                        <i
                          className={
                            showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                          }
                        ></i>
                      </button>
                </div>
              </div>

              {/* Submit Button */}
                  <div className="row">
                     <div className="col d-flex justify-content-center mt-3">
                       <Button
                         type="submit"
                         className="btn-primary fw-medium"
                        label="Login"
                       />
                     </div>
                   </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

