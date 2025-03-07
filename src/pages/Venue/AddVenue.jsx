import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import toast, { Toaster } from "react-hot-toast";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";

export default function AddVenue() {
  const location = useLocation();
  const venueData = location.state?.venue || {};
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    description: "",
    city: 0,
    state: 0,
    zipCode: "",
    country: 0,
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}location/countries`
      );

      console.log("API Response:", response.data); // Debugging line

      if (Array.isArray(response.data)) {
        setCountries(response.data.map((c) => ({ label: c.name, value: c.id })));
      } else if (response.data && Array.isArray(response.data.countries)) {
        // If the data is wrapped in an object
        setCountries(response.data.countries.map((c) => ({ label: c.name, value: c.id })));
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId) => {
    if (!countryId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}location/states?countryId=${countryId}`
      );
      console.log("States API Response:", response.data);

      if (Array.isArray(response.data)) {
        setStates(response.data.map((s) => ({ label: s.name, value: s.id })));
      } else if (response.data && Array.isArray(response.data.states)) {
        setStates(response.data.states.map((s) => ({ label: s.name, value: s.id })));
      } else {
        console.error("Unexpected API response format for states:", response.data);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    if (!stateId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}location/cities?stateId=${stateId}`
      );
      console.log("Cities API Response:", response.data);

      if (Array.isArray(response.data)) {
        setCities(response.data.map((c) => ({ label: c.name, value: c.id })));
      } else if (response.data && Array.isArray(response.data.cities)) {
        setCities(response.data.cities.map((c) => ({ label: c.name, value: c.id })));
      } else {
        console.error("Unexpected API response format for cities:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };


  // const validateForm = () => {
  //   const newErrors = {};
  //   for (let field in formData) {
  //     if (!formData[field]) {
  //       newErrors[field] = `${field} is required`;
  //     }
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "country") {
      setStates([]);
      setCities([]);
      fetchStates(value);
    }

    if (name === "state") {
      setCities([]);
      fetchCities(value);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   toast.error("Please fill out all required fields.");
    //   return;
    // }

    const token = localStorage.getItem("token");

    const venueFormData = {
      name: venueData.name || '',
      description: venueData.description || '',
      email: formData.email || "",
      phone: formData.phone || "",
      addressLine1: formData.addressLine1 || "",
      addressLine2: formData.addressLine2 || "",
      zipCode: formData.zipCode || "",
      city: Number(formData.city) || 0,
      state: Number(formData.state) || 0,
      country: Number(formData.country) || 0,
      isParent: false,
      parentId: Number(localStorage.getItem('venueId')) || 0,
    };
    console.log("data to send", venueFormData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}venues`,
        venueFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Venue added successfully:", response.data);
      toast.success("Venue added successfully!");
      const venueId = response.data.id;
      localStorage.setItem("venueId", venueId);
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err.response || err.message);
      toast.error("Failed to submit the form.");
    }
  };



  return (
    <>
      <DashLayoutVenue title="Add Location" description="Add a new venue ">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
            </div>
            <div className="profile-container">
              <p className="profile-font fw-bold">ADD LOCATION</p>
              <hr />
              <p
                className="profile-font text-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => { navigate(-1) }}
              >
                <i className="fa-solid fa-angle-left me-2"></i>Back to your profile
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-semibold">Email*</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="form-control profile-font"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-semibold">Phone Number*</label>
                    <Input
                      type="text"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="form-control profile-font"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-semibold">
                      Address Line 1
                    </label>
                    <p className="profile-font text-secondary mb-0">
                      Street Address, P.O.box,c/o
                    </p>
                    <Input
                      type="text"
                      name="addressLine1"
                      placeholder="Address Line 1"
                      value={formData.addressLine1}
                      className="form-control profile-font"
                      onChange={handleChange}
                    />
                    {errors.addressLine1 && (
                      <small className="text-danger">
                        {errors.addressLine1}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-semibold">
                      Address Line 2
                    </label>
                    <p className="profile-font text-secondary mb-0">
                      {" "}
                      Apartment,suite,unit,building,floor,etc.
                    </p>
                    <Input
                      type="text"
                      name="addressLine2"
                      placeholder="Address Line 2"
                      value={formData.addressLine2}
                      className="form-control profile-font"
                      onChange={handleChange}
                    />
                    {errors.addressLine2 && (
                      <small className="text-danger">
                        {errors.addressLine2}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row mb-2 profile-font">
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-semibold">Country</label>
                    <Select
                      name="country"
                      options={countries}
                      value={formData.country}
                      onChange={handleChange}
                      defaultOption="--Select Country--"
                      className="form-control profile-font"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-semibold">State</label>
                    <Select
                      name="state"
                      options={states}
                      value={formData.state}
                      onChange={handleChange}
                      defaultOption="--Select State--"
                      className="form-control profile-font"
                    />
                  </div>
                </div>

                <div className="row mb-2 profile-font">
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-semibold">City</label>
                    <Select
                      name="city"
                      options={cities}
                      value={formData.city}
                      onChange={handleChange}
                      defaultOption="--Select City--"
                      className="form-control profile-font"
                    />
                    {errors.city && (
                      <small className="text-danger">{errors.city}</small>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-semibold">ZIP/Postal Code</label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter your zip code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="form-control profile-font"
                    />
                    {errors.zipCode && (
                      <small className="text-danger">{errors.zipCode}</small>
                    )}
                  </div>
                </div>

                <Button
                  className="venue-btn mb-0 profile-font"
                  label="Submit"
                  type="submit"
                />
              </form>
            </div>
          </div>
          <PiqueFooter />
        </div>
      </DashLayoutVenue>
    </>
  );
}
