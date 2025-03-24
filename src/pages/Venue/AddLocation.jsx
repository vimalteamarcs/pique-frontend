import React, { useEffect } from "react";
import DashLayout from "../../Admin/DashLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  CREATE_VENUE,
  GET_CITIES,
  GET_COUNTRIES,
  GET_STATES,
} from "../../../constants";
import AdminSideBar from "../../components/Venue/AdminSideBar";

export default function AddLocation() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const venue = location.state || {};
  console.log(venue);

  const [locations, setLocations] = useState([
    {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      // lat: "",
      // long: "",
      // amenities: [],
      // websiteUrl: "",
      // timings: "",
      // bookingPolicies: "",
    },
  ]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_COUNTRIES}`
      );
      setCountries(data?.countries || []);
    };

    fetchCountries();
  }, []);

  const fetchStates = async (countryId) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}${GET_STATES}${countryId}`
    );
    setStates(data?.states || []);
  };

  const fetchCities = async (stateId) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}${GET_CITIES}${stateId}`
    );
    setCities(data?.cities || []);
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      if (venue?.country) {
        await fetchStates(Number(venue?.country));
      }
      if (venue?.state) {
        await fetchCities(Number(venue?.state));
      }
    };

    if (venue) {
      fetchLocationData();
    }
  }, [venue]);

  const handleAddLocation = () => {
    setLocations([
      ...locations,
      {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        lat: "",
        long: "",
        amenities: [],
        websiteUrl: "",
        timings: "",
        bookingPolicies: "",
      },
    ]);
  };

  const handleChange = async (index, event) => {
    const { name, value } = event.target;
    const updatedLocations = [...locations];
    updatedLocations[index][name] = value;
    setLocations(updatedLocations);

    if (name === "country") {
      setStates([]);
      setCities([]);
      await fetchStates(value);
    } else if (name === "state") {
      setCities([]);
      await fetchCities(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const formData of locations) {
        const venueFormData = {
          // name: venue.name || "",
          // description: venue.description || "",
          email: venue.email || "",
          phone: venue.phoneNumber || "",
          addressLine1: formData.addressLine1 || "",
          addressLine2: formData.addressLine2 || "",
          zipCode: formData.zipCode || "",
          city: Number(formData.city) || 0,
          state: Number(formData.state) || 0,
          country: Number(formData.country) || 0,
          // lat: formData.lat || "0.0",
          // long: formData.long || "0.0",
          // amenities: formData.amenities || [],
          // websiteUrl: formData.websiteUrl || "N/A",
          // timings: formData.timings || "N/A",
          // bookingPolicies: formData.bookingPolicies || "N/A",
          userId: Number(localStorage.getItem("venueUserId")) || 0,
          // isParent: false,
          // parentId: venue.id ? Number(venue.id) : 0,
        };
        console.log(venueFormData);

        await axios.post(
          `${import.meta.env.VITE_API_URL}admin/venue/location`,
          venueFormData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Location added successfully!");
    } catch (error) {
      console.error("Error adding locations:", error);
      toast.error("Error adding locations. Please try again.");
    }
  };

  return (
    <>
      <DashLayout />
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <p
              className="label-font fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-chevron-left me-2"></i>
              ADD LOCATIONS FOR {venue.name}
            </p>
            <hr />
            <form
              onSubmit={handleSubmit}
              className="profile-font event-form pt-2 pb-2"
            >
              {locations.map((loc, index) => (
                <div key={index} className="mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label label-font mb-0 fw-medium">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        className="form-control label-font"
                        placeholder="Enter address line 1"
                        name="addressLine1"
                        value={loc.addressLine1}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label label-font mb-0 fw-medium">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        className="form-control label-font"
                        placeholder="Enter address line 2"
                        name="addressLine2"
                        value={loc.addressLine2}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label label-font mt-3 mb-0 fw-medium">
                        Country
                      </label>
                      <select
                        className="form-control label-font"
                        name="country"
                        onChange={(e) => handleChange(index, e)}
                        required
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label label-font mt-3 mb-0 fw-medium">
                        State
                      </label>
                      <select
                        className="form-control label-font"
                        name="state"
                        onChange={(e) => handleChange(index, e)}
                        required
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label label-font mt-3 mb-0 fw-medium">
                        City
                      </label>
                      <select
                        className="form-control label-font"
                        name="city"
                        onChange={(e) => handleChange(index, e)}
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label label-font mt-3 mb-0 fw-medium">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="form-control label-font"
                        placeholder="Enter zip code"
                        name="zipCode"
                        value={loc.zipCode}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-dark label-font">
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
