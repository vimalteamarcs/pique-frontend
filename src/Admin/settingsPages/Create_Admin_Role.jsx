import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is imported
import DashLayout from "../DashLayout";
import { CREATE_ROLE, GET_CAPABILITIES } from "../../../constants";
import AdminSideBar from "../../components/Venue/AdminSideBar";

export default function Create_Admin_Role() {
  // State for storing capabilities and role form data
  const [capabilities, setCapabilities] = useState([]);
  const [userdata, setUserdata] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [formData, setFormData] = useState({
    user: userdata.name,
    role: "",
    permissions: [],
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    role: "",
    capabilities: "",
  });

  // Fetch capabilities from API on component mount
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_CAPABILITIES}`
        );

        setCapabilities(response.data); // Set fetched capabilities
      } catch (error) {
        console.error("Error fetching capabilities:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchCapabilities();
  }, []);

  // Handle input change for role
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedPermissions = checked
        ? [...prevData.permissions, value]
        : prevData.permissions.filter((permission) => permission !== value);

      return { ...prevData, permissions: updatedPermissions };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role || formData.permissions.length === 0) {
      setErrors({
        role: formData.role ? "" : "Role is required",
        capabilities: formData.permissions.length
          ? ""
          : "At least one permission is required",
      });
      return;
    }
    const finalData = {
      ...formData,
      permissions: formData.permissions.map(Number), // Ensure numbers
    };

    console.log(finalData);

    // Submit form data (you would handle API post logic here)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_ROLE}`,
        finalData
      );
      console.log("Role created successfully:", response.data);
      setFormData({
        user: userdata.name,
        role: "",
        permissions: [],
      });
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  return (
    <>
    <DashLayout/>
      children={      <div className="container-fluid d-flex flex-column min-vh-100">
              <div className="d-flex mt-0">
                <div className="dash-sidebar-container">
                  <AdminSideBar />
                </div>
                <div className="dash-profile-container">
        <form className="container" onSubmit={handleSubmit}>
          <div className="row d-flex">
            <p className="fw-semibold profile-font">REGISTER ADMIN ROLE</p>
          </div>
          {/* Role */}
          <div className="row my-2">
            <label className="text-start fw-semibold profile-font">Role</label>
            <div className=" col-md-6 col-sm-12">
              <input
                type="text"
                placeholder="Enter role name"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            {errors.role && (
              <p className="text-danger text-start">{errors.role}</p>
            )}
          </div>
          <br />
          <br />
          {/* Permissions */}
          <div className="row my-2">
            <label className="fw-semibold profile-font">Permissions</label>
            <div className="col d-flex flex-wrap">
              {capabilities?.map((capability) => (
                <div key={capability.id} className="form-check me-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={capability.id}
                    value={capability.id}
                    checked={formData.permissions.includes(
                      capability.id.toString()
                    )}
                    onChange={handlePermissionChange}
                  />
                  <label className="form-check-label" htmlFor={capability.id}>
                    {capability.name.replace(/_/g, " ")}
                  </label>
                </div>
              ))}
            </div>
            {errors.capabilities && (
              <p className="text-danger text-start">{errors.capabilities}</p>
            )}
          </div>
          <br />
          <br />
          {/* Submit Button */}
          <div className="row my-2">
            <button type="submit" className="btn btn-dark float-start w-25">
              Create Role
            </button>
          </div>
        </form>
        </div>
        </div>
        </div>
      }
    
    </>
  );
}
