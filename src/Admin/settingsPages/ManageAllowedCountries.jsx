import React, { useState, useEffect } from "react";
import axios from "axios";
import DashLayout from "../DashLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GETALLISALLOWED,
  CHANGE_ISALLOWED,
  SEARCH_COUNTRIES,
} from "../../../constants";
import AdminSideBar from "../../components/Venue/AdminSideBar";

const API_URL = import.meta.env.VITE_API_URL;

export default function ManageAllowedCountries() {
  const [allowedCountries, setAllowedCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch allowed countries
  const fetchAllowedCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}${GETALLISALLOWED}`);
      setAllowedCountries(response.data.countries);
    } catch (err) {
      toast.error("Failed to fetch allowed countries");
    }
  };

  useEffect(() => {
    fetchAllowedCountries();
  }, []);

  // Handle country search with API call
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredCountries([]);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}${SEARCH_COUNTRIES}${value}`);
      setFilteredCountries(response.data.countries || []);
    } catch (err) {
      toast.error("Error fetching countries");
      setFilteredCountries([]);
    }
  };

  // Select a country from suggestions
  const handleSelectCountry = (countryId) => {
    setSelectedCountryId(countryId);
    const selectedCountry = filteredCountries.find(
      (c) => String(c.id) === String(countryId)
    );
    setSearchTerm(selectedCountry?.name || "");
    setFilteredCountries([]);
  };

  // Allow a country
  const handleAllowCountry = async () => {
    if (!selectedCountryId) {
      toast.error("Please select a country");
      return;
    }

    try {
      await axios.patch(`${API_URL}${CHANGE_ISALLOWED}${selectedCountryId}`, {
        isallowed: 1,
      });
      toast.success("Country allowed successfully");
      fetchAllowedCountries();
    } catch (err) {
      toast.error("Failed to allow country");
    }
  };

  // Remove allowed country
  const handleDeleteCountry = async (id) => {
    try {
      await axios.patch(`${API_URL}${CHANGE_ISALLOWED}${id}`, {
        isallowed: 0,
      });
      toast.success("Country removed successfully");
      fetchAllowedCountries();
    } catch (err) {
      toast.error("Failed to remove country");
    }
  };

  return (
    <>
    <DashLayout/>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

            <div className="container-fluid d-flex flex-column min-vh-100">
              <div className="d-flex mt-0">
                <div className="dash-sidebar-container">
                  <AdminSideBar />
                </div>
                <div className="dash-profile-container">
        <div className="div profile-font">
          <div className="card-body">
            <p className="fw-semibold">ALLOWED COUNTRIES</p><hr/>
            {/* Country Search Input */}
            <div className="mb-3 position-relative">
              <label className="fw-bold">Search Country</label>
              <div className="row d-flex">
                {" "}
                <div className="col-md-6 col-sm-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {/* Suggestions Dropdown */}
                  {filteredCountries.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100"
                      style={{
                        zIndex: 10,
                        maxHeight: "150px",
                        overflowY: "auto",
                      }}
                    >
                      {filteredCountries.map((country) => (
                        <li
                          key={country.id}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSelectCountry(country.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {country.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="btn btn-dark btn-sm col-md-2 col-sm-12 mx-3 px-1"
                  onClick={handleAllowCountry}
                >
                  Add
                </button>
              </div>
            </div>

            <hr />

            {/* Allowed Countries List */}

            <div
              className=" d-flex  flex-wrap overflow-auto profile-font"
              style={{
                maxHeight: "200px",
                scrollbarWidth: "thin",
                // scrollbarColor: "#ccc transparent",
              }}
            >
              {allowedCountries.map((country) => (
                <div key={country.id} className="mb-3">
                  <div
                    className=" profile-font"
                    style={{
                      width: "fit-content",
                      position: "relative",
                    }}
                  >
                    <div className="card-body p-2 profile-font">
                      <button
                        type="button"
                        className="btn btn-outline-primary text-capitalize position-relative"
                        style={{ paddingRight: "30px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        {country.name}
                      </button>
                      <button
                        type="button"
                        className="btn-close position-absolute p-1"
                        style={{
                          top: "35%",
                          right: "12px",
                          transform: "translateY(-50%)",
                          fontSize: "10px", // Makes the button smaller
                        }}
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete this ${country.name}?`
                            )
                          ) {
                            handleDeleteCountry(country.id);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}
