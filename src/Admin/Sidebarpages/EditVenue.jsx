import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DashLayout from "../DashLayout";
import {
  DELETE_MEDIA,
  GET_CITIES,
  GET_COUNTRIES,
  GET_MEDIA_BYID,
  GET_STATES,
  UPDATE_VENUE,
  UPLOAD_MEDIA,
} from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSideBar from "../../components/Venue/AdminSideBar";

export default function EditVenue() {
  const [media, setMedia] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { venueData } = location.state || {};

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(() =>
    venueData
      ? { ...venueData }
      : {
        name: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        description: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        lat: "",
        long: "",
        amenities: [""],
        websiteUrl: "",
        timings: "",
        bookingPolicies: "",
      }
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_COUNTRIES}`
        );

        setCountries(
          response.data.countries.map((country) => ({
            label: country.name,
            value: country.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_STATES}${countryId}`
      );
      setStates(
        response.data.states.map((state) => ({
          label: state.name,
          value: state.id,
        }))
      );
      setCities([]); // Clear cities when country changes
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_CITIES}${stateId}`
      );
      setCities(
        response.data.cities.map((city) => ({
          label: city.name,
          value: city.id,
        }))
      );
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (venueData?.country) {
      fetchStates(venueData.country);
    }
    if (venueData?.state) {
      fetchCities(venueData.state);
    }
  }, [venueData?.country, venueData?.state]);

  const validateForm = () => {
    const newErrors = {};

    for (let field in formData) {
      if (field === "parentId" && formData.isParent) {
        continue; // Skip validation for parentId if isParent is true
      } else if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["city", "state", "country"].includes(name)
        ? Number(value)
        : name === "amenities"
          ? value.split(",")
          : value,
    }));

    if (name === "country") {
      fetchStates(value);
      setFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
    }
    if (name === "state") {
      fetchCities(value);
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${UPDATE_VENUE}`,
        { id: venueData?.id, fieldsToUpdate: formData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Venue updated successfully!", {
        autoClose: 1000,
      });
    } catch (err) {
      console.error("Error updating venue:", err.response || err.message);
      toast.error("Error updating venue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (venueData?.id) {
        let id = venueData.id;
        if (id) {
          try {
            const mediaRes = await axios.get(
              `${import.meta.env.VITE_API_URL}${GET_MEDIA_BYID}${venueData.id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const fetchedMedia = mediaRes.data.media;

            if (fetchedMedia.length > 0) {
              // Set the full media data in the state
              setMedia(fetchedMedia);
            }
          } catch (mediaError) {
            console.error("Failed to fetch media:", mediaError);
          }
        }
      }
    };
    if (venueData) {
      fetchData();
    }
  }, [venueData]);
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("venueId", venueData.id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${UPLOAD_MEDIA}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      // Append the uploaded images to the media state
      setMedia((prev) => [
        ...prev,
        ...Array.from(files).map((file) => ({
          id: null, // Placeholder ID until uploaded
          url: URL.createObjectURL(file),
          file, // Store the file object for upload
        })),
      ]);

      toast.success("Images uploaded successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    }
  };

  const deleteMedia = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}${DELETE_MEDIA}${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove the deleted image from the media state
      setMedia((prev) => prev.filter((item) => item.id !== id));

      toast.success("Media deleted successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error deleting Media:", error);
      toast.error("Failed to delete Media. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashLayout />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <div className=" mt-1">

              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-dark btn-sm d-flex align-items-center mb-1 m-2"
              >
                <i
                  className="fa fa-arrow-left"
                  style={{ marginRight: "8px" }}
                ></i>
              </button>
              <p className="profile-font fw-semibold col mt-3">
                UPDATE VENUE DETAILS
              </p><hr />


              {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                  <strong>Please fill out all required fields:</strong>
                  <ul>
                    {Object.keys(errors).map((field) => (
                      <li key={field}>{errors[field]}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="conatiner m-1 profile-font scrollable-container event-form p-3">
                <div className="row text-start ">
                  <h5 className=" profile-font fw-semibold text-muted">General Information</h5>
                  <hr className="fw-bold" />
                  <div className="row mb-3">
                    <div className="col-md-4 ">
                      <label htmlFor="name" className="fw-bold">
                        Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="phone" className="fw-bold">
                        Phone
                      </label>
                      <Input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <small className="text-danger">{errors.phone}</small>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="email" className="fw-bold">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row text-start ">
                  <p className="text-start mt-2 profile-font fw-semibold text-muted">
                    Address Details
                  </p>
                  <hr className="fw-bold" />
                  <div className="row mb-3">
                    <div className="col-md-4 text-start">
                      <label htmlFor="country" className="fw-bold">
                        Country
                      </label>
                      <Select
                        name="country"
                        options={countries}
                        value={formData.country}
                        onChange={handleChange}
                        defaultOption={
                          venueData ? venueData.country : "Select Country"
                        }
                      />
                      {errors.country && (
                        <small className="text-danger">{errors.country}</small>
                      )}
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="state" className="fw-bold">
                        State
                      </label>
                      <Select
                        name="state"
                        options={states}
                        value={formData.state}
                        onChange={handleChange}
                        defaultOption={
                          venueData ? venueData.state : "Select State"
                        }
                      />
                      {errors.state && (
                        <small className="text-danger">{errors.state}</small>
                      )}
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="city" className="fw-bold">
                        City
                      </label>
                      <Select
                        name="city"
                        options={cities}
                        value={formData.city}
                        onChange={handleChange}
                        defaultOption={venueData ? venueData.city : "Select City"}
                      />
                      {errors.city && (
                        <small className="text-danger">{errors.city}</small>
                      )}
                    </div>
                  </div>
                  <div className=" row mb-3 mt-2">
                    <div className="col-md-4 text-start">
                      <label htmlFor="addressLine1" className="fw-bold">
                        Address Line 1
                      </label>
                      <Input
                        type="text"
                        name="addressLine1"
                        placeholder="Address Line 1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                      />
                      {errors.addressLine1 && (
                        <small className="text-danger">
                          {errors.addressLine1}
                        </small>
                      )}
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="addressLine2" className="fw-bold">
                        Address Line 2
                      </label>
                      <Input
                        type="text"
                        name="addressLine2"
                        placeholder="Address Line 2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                      />
                      {errors.addressLine2 && (
                        <small className="text-danger">
                          {errors.addressLine2}
                        </small>
                      )}
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="zipCode" className="fw-bold">
                        Zip Code
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        placeholder="Enter your zip code"
                        value={formData.zipCode}
                        onChange={handleChange}
                      />
                      {errors.zipCode && (
                        <small className="text-danger">{errors.zipCode}</small>
                      )}
                    </div>
                  </div>
                  <div className=" row mb-3 mt-2">
                    <div className="col-md-4 text-start">
                      <label htmlFor="location" className="fw-bold">
                        Description
                      </label>
                      <Input
                        type="text"
                        name="description"
                        placeholder="Describe your venue"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      {errors.description && (
                        <small className="text-danger">
                          {errors.description}
                        </small>
                      )}
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="lat" className="fw-bold">
                        Latitude
                      </label>
                      <Input
                        type="text"
                        name="lat"
                        placeholder=" "
                        value={formData.lat}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="long" className="fw-bold">
                        Longitude
                      </label>
                      <Input
                        type="text"
                        name="long"
                        placeholder=""
                        value={formData.long}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row pb-4 text-start ">
                  <p className="text-start text-muted profile-font fw-semibold mt-2">
                    Venue Information
                  </p>
                  <hr className="fw-bold" />
                  <div className=" row mb-3 mt-2">
                    <div className="col-md-4 text-start">
                      <label htmlFor="amenities" className="fw-bold">
                        Amenities
                      </label>
                      <Input
                        type="text"
                        name="amenities"
                        placeholder="List your amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="websiteUrl" className="fw-bold">
                        Website URL
                      </label>
                      <Input
                        type="text"
                        name="websiteUrl"
                        placeholder="Enter your website URL"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 text-start">
                      <label htmlFor="timings" className="fw-bold">
                        Timings
                      </label>
                      <Input
                        type="time"
                        name="timings"
                        value={formData.timings}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className=" row ">
                    <div className="col-md-12 text-start">
                      <label htmlFor="bookingPolicies" className="fw-bold">
                        Booking Policies
                      </label>
                      <textarea
                        type="text"
                        name="bookingPolicies"
                        className="form-control"
                        value={formData.bookingPolicies}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              
                  <Button
                    type="submit"
                    className="btn btn-dark profile-font float-start"
                    label="Submit"
                  />
                
              </form>
              <div className="d-flex justify-content-center mb-5">
                <div className=" col-12 border-0">
                  <div className="card-body">
                    <p className="text-start text-muted profile-font fw-semibold mt-2">
                      Media Uploads
                    </p>
                    <hr className="mb-4" />

                    <div className="row mt-4 event-form">
                      <div className="col-md-12 col-sm-12">
                        <label className="fw-bold profile-font mb-3 pt-2">Image Upload</label><br/>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="form-control profile-font mb-3"
                          onChange={handleFileChange}
                        />

                        {media.length > 0 && (
                          <div className="d-flex flex-wrap gap-3 mt-3">
                            {media.map((file, index) => (
                              <div key={index} className="position-relative p-2">
                                <img
                                  src={file.url}
                                  alt={`Uploaded image ${index}`}
                                  className="media-image rounded"
                                  style={{ height: "90px", width: "90px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-link position-absolute"
                                  onClick={() => deleteMedia(file.id)}
                                >
                                  <i className="fa-solid fa-trash-can text-danger"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>

  );
}
