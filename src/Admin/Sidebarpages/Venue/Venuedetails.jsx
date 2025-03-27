import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashLayout from "../../DashLayout";
import axios from "axios";
import {
  GET_CITIES,
  GET_COUNTRIES,
  GET_MEDIA_BYID,
  GET_STATES,
} from "../../../../constants";
import AdminSideBar from "../../../components/Venue/AdminSideBar";

const Venuedetails = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const venue = location.state; // venue data will be passed via location.state

  const [media, setMedia] = useState([]);
  const [venueData, setVenueData] = useState({});

  useEffect(() => {
    if (venue) {
      setVenueData(venue);
      console.log("d", venueData);
    }
  }, [venue]);
  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_COUNTRIES}`
      );
      return data?.countries || []; // Ensure it's an array
    };

    const fetchStates = async (countryId) => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_STATES}${countryId}`
      );
      return data?.states || []; // Ensure it's an array
    };

    const fetchCities = async (stateId) => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_CITIES}${stateId}`
      );
      return data?.cities || []; // Ensure it's an array
    };

    // Fetch data only when necessary
    const fetchLocationData = async () => {
      let countries = [];
      let states = [];
      let cities = [];

      // Only fetch location data if country, state, and city are provided
      if (venue?.country) {
        countries = await fetchCountries();
      }
      if (venue?.state) {
        states = await fetchStates(Number(venue?.country));
      }
      if (venue?.city) {
        cities = await fetchCities(Number(venue?.state));
      }

      // Attach countryName, stateName, cityName to the venueData
      const country = countries.find(
        (c) => Number(c.id) === Number(venue?.country)
      );
      const state = states.find((s) => Number(s.id) === Number(venue?.state));
      const city = cities.find((c) => Number(c.id) === Number(venue?.city));

      setVenueData({
        ...venue,
        country: country?.name || "",
        state: state?.name || "",
        city: city?.name || "",
      });
    };

    const fetchData = async () => {
      if (venue?.id) {
        let id = venue.id;
        if (id) {
          try {
            const mediaRes = await axios.get(
              `${import.meta.env.VITE_API_URL}${GET_MEDIA_BYID}${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const fetchedMedia = mediaRes.data.media;

            if (fetchedMedia.length > 0) {
              console.log(fetchedMedia);

              // Set the full media data in the state
              setMedia(fetchedMedia);
            }
          } catch (mediaError) {
            console.error("Failed to fetch media:", mediaError);
          }
        }
      }
    };

    if (venue) {
      fetchLocationData();
      fetchData();
    }
  }, [venue]);

  return (
    <>
      <DashLayout />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex flex-column flex-lg-row mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container w-100 p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-dark btn-sm d-flex align-items-center"
              >
                <i className="fa fa-arrow-left me-2"></i> Back
              </button>
              {venueData && (
                <button
                  onClick={() =>
                    navigate("/admin/addvenuelocation", { state: venueData })
                  }
                  className="btn btn-outline-dark btn-sm d-flex align-items-center"
                >
                  <i className="fa fa-add me-2"></i> Add Location
                </button>
              )}
            </div>

            <div className="border rounded p-3 bg-white">
              <h6 className="fw-bold">VENUE DETAILS</h6>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Name:</strong> {venueData?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {venueData?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {venueData?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong> {venueData?.addressLine1 || ""},{" "}
                    {venueData?.addressLine2 || ""}
                  </p>
                  <p>
                    <strong>City:</strong> {venueData?.city || "N/A"}
                  </p>
                  <p>
                    <strong>State:</strong> {venueData?.state || "N/A"}
                  </p>
                  <p>
                    <strong>Country:</strong> {venueData?.country || "N/A"}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {venueData?.zipCode || "N/A"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Description:</strong>{" "}
                    {venueData?.description || "N/A"}
                  </p>
                  {/* <p>
                    <strong>Created At:</strong>{" "}
                    {venueData?.createdAt
                      ? new Date(venueData.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {venueData?.updatedAt
                      ? new Date(venueData.updatedAt).toLocaleString()
                      : "N/A"}
                  </p> */}
                </div>
              </div>
            </div>

            {media?.length > 0 && (
              <div className="row mt-4">
                {media.map((item, index) => (
                  <div key={index} className="col-md-3 col-sm-6 mb-3">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`Media ${index}`}
                        className="img-fluid rounded"
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : item.type === "video" ? (
                      <video
                        src={item.url}
                        controls
                        className="img-fluid rounded"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <div className="d-flex justify-content-between">
              {" "}
              <button
                onClick={() => navigate(-1)}
                className=" btn btn-outline-dark btn-sm d-flex align-items-center mb-4"
              >
                <i className="fa fa-arrow-left" style={{ marginRight: "8px" }}></i>
              </button>
              {venue ? (
                <>
                  <button
                    onClick={() =>
                      navigate("/admin/addvenuelocation", { state: venue })
                    }
                    className="btn btn-outline-dark btn-sm d-flex align-items-center mb-4"
                  >
                    <i className="fa fa-add" style={{ marginRight: "8px" }}></i>
                    Add Location
                  </button>
                  
                </>
              ) : null}
            </div>
            <p className="profile-font fw-semibold">VENUE DETAILS</p><hr />
            <div className="row profile-font fw-semibold scrollable-container event-form pt-3">
              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Name:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.name || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Phone:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.phone || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Email:</label>
                  <input
                    type="email"
                    className="custom-form-event ps-3"
                    value={venueData.email || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Address Line 1:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.addressLine1 || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Address Line 2:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.addressLine2 || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Description:</label>
                  <textarea
                    className="custom-form-event ps-3"
                    value={venueData.description || ""}
                    disabled
                    rows="1"
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Zip Code:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.zipCode || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Website URL:</label>
                  <input
                    type="url"
                    className="custom-form-event ps-3"
                    value={venueData.websiteUrl || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Booking Policies:</label>
                  <textarea
                    className="custom-form-event ps-3"
                    value={venueData.bookingPolicies || ""}
                    disabled
                    rows="1"
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Created At:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={
                      venueData.createdAt
                        ? new Date(venueData.createdAt).toLocaleDateString()
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Updated At:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={
                      venueData.updatedAt
                        ? new Date(venueData.updatedAt).toLocaleDateString()
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Amenities:</label>
                  <textarea
                    className="custom-form-event ps-3"
                    value={venueData.amenities || ""}
                    disabled
                    rows="1"
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">City:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.city || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">State:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.state || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Country:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.country || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Latitude:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.lat || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label mb-0">Longitude:</label>
                  <input
                    type="text"
                    className="custom-form-event ps-3"
                    value={venueData.long || ""}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-12 col-sm-12"></div>
            </div>
            {media.length > 0 && (
              <div className="row gap-1 mb-4">
                {media.map((item, index) => (
                  <div
                    key={index}
                    className="position-relative px-2 col-md-3 col-sm-12"
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`Media ${index}`}
                        className="media-image rounded-4   img-fluid"
                        style={{ width: "100%", height: "20rem" }}
                      />
                    ) : item.type === "video" ? (
                      <video
                        src={item.url}
                        controls
                        className="media-video rounded"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Venuedetails;
