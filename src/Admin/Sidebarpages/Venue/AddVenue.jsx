import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import axios from "axios";
import DashLayout from "../../DashLayout";
import { toast, ToastContainer } from "react-toastify";
import { CREATE_USER, CREATE_VENUE, UPLOAD_MEDIA } from "../../../../constants";
import AdminSideBar from "../../../components/Venue/AdminSideBar";

export default function AddVenue() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [headshot, setHeadshot] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  let data = location.state;
  console.log(data);

  const [formData, setFormData] = useState({
    userId: data.id ? data.id : "",
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
    lat: "",
    long: "",
    amenities: [],
    websiteUrl: "",
    timings: "",
    bookingPolicies: "",
    // isParent: true,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        userId: data.id ? data.id : "",
      });
    }
  }, [data]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}location/countries`
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
      const Stateresponse = await axios.get(
        `${import.meta.env.VITE_API_URL}location/states?countryId=${countryId}`
      );
      setStates([
        ...Stateresponse.data.states.map((state) => ({
          label: state.name,
          value: state.id,
        })),
      ]);
      setCities([]);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  const fetchCities = async (stateId) => {
    try {
      const Cityresponse = await axios.get(
        `${import.meta.env.VITE_API_URL}location/cities?stateId=${stateId}`
      );
      setCities([
        ...Cityresponse.data.cities.map((city) => ({
          label: city.name,
          value: city.id,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    for (let field in formData) {
      if (field === "isParent") {
        continue;
      } else if (!formData[field]) {
        newErrors[field] = `${field} is required`;
        setErrors(newErrors);
      }
    }

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
    }
    if (name === "state") {
      fetchCities(value);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      setFormData((prevData) => ({ ...prevData, images: updatedImages }));
      return updatedImages;
    });
  };

  const handleDeleteVideo = (index) => {
    setVideos((prev) => {
      const updatedVideos = prev.filter((_, i) => i !== index);
      setFormData((prevData) => ({ ...prevData, videos: updatedVideos }));
      return updatedVideos;
    });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files);

    if (type === "images") {
      setImages((prev) => [...prev, ...files]);
    } else if (type === "videos") {
      setVideos((prev) => [...prev, ...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const token = localStorage.getItem("token");

    // const parentId = null;
    const finaldata = { ...formData, 
      // parentId, 
      userId: data.id };
    console.log("Final data:", finaldata, data.id);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_VENUE}`,
        finaldata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Venue added successfully:", response.data);
      setFormData({
        userId: data.id ? data.id : "",
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
        lat: "",
        long: "",
        amenities: [],
        websiteUrl: "",
        timings: "",
        bookingPolicies: "",
        // isParent: true,
      });
      toast.success("Venue added successfully!", {
        autoClose: 1000, // Close after 1 second
      });
      const venueId = response.data.id;
      localStorage.setItem("venueId", venueId);
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err.response || err.message);
      toast.error("Failed to submit the form.");
    }
  };

  const mediaUpload = async (e) => {
    e.preventDefault();
    if (!formSubmitted) {
      toast.error("Please submit the form before uploading media.");
      return;
    }
    try {
      const mediaFormData = new FormData();

      images.forEach((image) => {
        mediaFormData.append("images", image);
      });

      videos.forEach((video) => {
        mediaFormData.append("videos", video);
      });

      const venueId = localStorage.getItem("venueId");
      mediaFormData.append("venueId", venueId);

      const token = localStorage.getItem("token");
      const mediaUploadResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}${UPLOAD_MEDIA}`,
        mediaFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(mediaUploadResponse.status);

      if (mediaUploadResponse.status === 201) {
        toast.success("Media uploaded successfully!");
        setImages([]);
        setVideos([]);
      }
    } catch (error) {
      console.error(
        "Error uploading media:",
        error.response?.data || error.message
      );
      toast.error("Failed to upload media. Please try again.");
    }
  };

  return (
    <>
      <DashLayout/>
        <ToastContainer />
        <div className="container-fluid d-flex flex-column min-vh-100">
                <div className="d-flex mt-0">
                  <div className="dash-sidebar-container">
                    <AdminSideBar />
                  </div>
                  <div className="dash-profile-container">
          <div className="row">
            <div className="col-md-12">
              
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-outline-dark btn-sm d-flex align-items-center mb-1 m-2"
                >
                  <i
                    className="fa fa-arrow-left"
                    style={{ marginRight: "8px" }}
                  ></i>
                </button>
                <p className="profile-font fw-semibold mt-3">
                  VENUE DETAILS
                </p><hr/>
              
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
              <div className="justify-content-center scrollable-container">
                <div className="col-md-12">
                  <div className="text-center">
                    <form onSubmit={handleSubmit}>
                      <p className="profile-font fw-semibold text-start text-muted">
                        General Information
                      </p><hr/>
                      {/* <hr className="fw-bold" /> */}
                      <div className="row profile-font">
                        <div className="col-md-4 text-start">
                          <label htmlFor="name" className="fw-bold">
                            Name*
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
                        <div className="col-md-4 text-start">
                          <label htmlFor="phone" className="fw-bold">
                            Phone*
                          </label>
                          <Input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && (
                            <small className="text-danger">
                              {errors.phone}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="email" className="fw-bold">
                            Email*
                          </label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <small className="text-danger">
                              {errors.email}
                            </small>
                          )}
                        </div>
                      </div>
                      <p className="text-start profile-font fw-semibold text-muted mt-3 mb-0">
                        Address Details
                      </p><hr/>
                      {/* <hr className="fw-bold" /> */}
                      <div className="row mb-3 mt-3 profile-font">
                        <div className="col-md-4 text-start">
                          <label htmlFor="country" className="fw-bold">
                            Country*
                          </label>
                          <Select
                            name="country"
                            options={countries}
                            value={formData.country}
                            onChange={handleChange}
                            defaultOption="Select Country"
                          />
                          {errors.country && (
                            <small className="text-danger">
                              {errors.country}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="state" className="fw-bold">
                            State*
                          </label>
                          <Select
                            name="state"
                            options={states}
                            value={formData.state}
                            onChange={handleChange}
                            defaultOption="Select State"
                          />
                          {errors.state && (
                            <small className="text-danger">
                              {errors.state}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="city" className="fw-bold">
                            City*
                          </label>
                          <Select
                            name="city"
                            options={cities}
                            value={formData.city}
                            onChange={handleChange}
                            defaultOption="Select City"
                          />
                          {errors.city && (
                            <small className="text-danger">{errors.city}</small>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3 mt-2 profile-font">
                        <div className="col-md-4 text-start">
                          <label htmlFor="addressLine1" className="fw-bold">
                            Address Line 1*
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
                            Address Line 2*
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
                            Zip Code*
                          </label>
                          <Input
                            type="text"
                            name="zipCode"
                            placeholder="Enter your zip code"
                            value={formData.zipCode}
                            onChange={handleChange}
                          />
                          {errors.zipCode && (
                            <small className="text-danger">
                              {errors.zipCode}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3 mt-2 profile-font">
                        <div className="col-md-4 text-start">
                          <label htmlFor="location" className="fw-bold">
                            Description*
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
                            Latitude*
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
                            Longitude*
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
                      <p className="text-start profile-font fw-semibold text-muted mt-4">
                        Venue Information
                      </p>
                      <hr className="fw-bold" />
                      <div className="row mb-3 mt-2 profile-font">
                        <div className="col-md-4 text-start">
                          <label htmlFor="amenities" className="fw-bold">
                            Amenities*
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
                            Website URL*
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
                            Timings*
                          </label>
                          <Input
                            type="time"
                            name="timings"
                            value={formData.timings}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row profile-font">
                        <div className="col-md-12 text-start">
                          <label htmlFor="bookingPolicies" className="fw-bold">
                            Booking Policies*
                          </label>
                          <Input
                            type="text"
                            name="bookingPolicies"
                            value={formData.bookingPolicies}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="btn-outline-dark mt-3 float-start mb-5 fw-semibold"
                        label="Submit"
                      />
                    </form>
                  </div>
                </div>
                {formSubmitted && (
                  <div className="card col-md-12 p-3">
                    <div className="">
                      <form onSubmit={mediaUpload}>
                        <p className="profile-font fw-semibold">
                          MEDIA UPLOADS
                        </p>
                        <hr className="mb-4" />

                        {/* Image Upload */}
                        <div className="row mt-4 profile-font">
                          <div className="col-md-12 col-sm-12">
                            <label className="fw-bold">Image Upload</label>
                            <Input
                              type="file"
                              name="images"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleFileChange(e, "images")}
                            />
                            {images.length > 0 && (
                              <div className="d-flex flex-wrap gap-3">
                                {images.map((file, index) => (
                                  <div
                                    key={index}
                                    className="position-relative p-2"
                                  >
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={`Uploaded image ${index}`}
                                      className="media-image rounded"
                                      style={{ height: "90px", width: "90px" }}
                                    />
                                    <Button
                                      type="button"
                                      className="btn btn-link position-absolute"
                                      onClick={() => handleDeleteImage(index)}
                                    >
                                      <i className="fa-solid fa-trash-can text-primary"></i>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Video Upload */}
                        <div className="row mt-4 profile-font">
                          <div className="col-md-12 col-sm-12">
                            <label className="fw-bold">Video Upload</label>
                            <Input
                              type="file"
                              name="videos"
                              accept="video/*"
                              multiple
                              onChange={(e) => handleFileChange(e, "videos")}
                            />
                            {videos.length > 0 && (
                              <div className="d-flex flex-wrap gap-3">
                                {videos.map((file, index) => (
                                  <div
                                    key={index}
                                    className="position-relative p-2"
                                  >
                                    <video
                                      src={URL.createObjectURL(file)} // Preview the video
                                      controls
                                      className="media-video rounded"
                                      style={{ height: "90px", width: "90px" }}
                                    />
                                    <Button
                                      type="button"
                                      className="btn btn-link position-absolute"
                                      onClick={() => handleDeleteVideo(index)}
                                    >
                                      <i className="fa-solid fa-trash-can text-primary"></i>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="row mt-4">
                          <div className="col d-flex justify-content-center">
                            <Button
                              type="submit"
                              className="btn-outline-dark float-start fw-semibold"
                              label="Upload Media"
                              disabled={!formSubmitted}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
    </>
  );
}
