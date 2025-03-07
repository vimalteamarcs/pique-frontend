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
    <DashLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          {" "}
          <button
            onClick={() => navigate(-1)}
            className=" btn btn-primary d-flex align-items-center mb-4"
          >
            <i className="fa fa-arrow-left" style={{ marginRight: "8px" }}></i>
          </button>
          {venue ? (
            <>
              <button
                onClick={() =>
                  navigate("/admin/addvenuelocation", { state: venue })
                }
                className="btn btn-primary d-flex align-items-center mb-4"
              >
                <i className="fa fa-add" style={{ marginRight: "8px" }}></i>
                Add Location
              </button>
              <button
                onClick={() => navigate("/admin/createevent", { state: venue })}
                className="btn btn-primary d-flex align-items-center mb-4"
              >
                <i className="fa fa-add" style={{ marginRight: "8px" }}></i>
                Create Event
              </button>
            </>
          ) : null}
        </div>
        <h3 className="mb-4">Venue Details</h3>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.name || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.phone || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={venueData.email || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Address Line 1:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.addressLine1 || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Address Line 2:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.addressLine2 || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                value={venueData.description || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Zip Code:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.zipCode || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Website URL:</label>
              <input
                type="url"
                className="form-control"
                value={venueData.websiteUrl || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Booking Policies:</label>
              <textarea
                className="form-control"
                value={venueData.bookingPolicies || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Created At:</label>
              <input
                type="text"
                className="form-control"
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
              <label className="form-label">Updated At:</label>
              <input
                type="text"
                className="form-control"
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
              <label className="form-label">Amenities:</label>
              <textarea
                className="form-control"
                value={venueData.amenities || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">City:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.city || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">State:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.state || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Country:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.country || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Latitude:</label>
              <input
                type="text"
                className="form-control"
                value={venueData.lat || ""}
                disabled
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label className="form-label">Longitude:</label>
              <input
                type="text"
                className="form-control"
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
    </DashLayout>
  );
};

export default Venuedetails;
