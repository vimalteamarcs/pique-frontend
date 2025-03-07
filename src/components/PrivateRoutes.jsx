// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from "../redux/slices/authSlice";

// const PrivateRoutes = () => {
//   const authStatus = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();
//   const [role, setRole] = useState(null);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     if (user) {
//       const rolename = JSON.stringify(user).role;
//       setRole(rolename.toLowerCase().includes("admin"));
//     }

//     if (token && role) {
//       dispatch(login()); // ✅ Ensure Redux updates from localStorage
//     } else {
//       dispatch(logout());
//     }
//   }, [dispatch]);

//   return authStatus ? <Outlet /> : <Navigate to="/admin/login" />;
// };

// export default PrivateRoutes;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";

const PrivateRoutes = () => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    let isAdmin = false;
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("role");

    if (userData) {
      try {
        
        isAdmin = userData.toLowerCase().includes("admin");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    

    if (token && isAdmin) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, []);

  return authStatus ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoutes;
