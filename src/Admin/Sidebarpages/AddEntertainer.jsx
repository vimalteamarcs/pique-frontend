import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import RadioButton from "../../components/RadioButton";
import Button from "../../components/Button";
import axios from "axios";

import DashLayout from "../DashLayout";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CREATE_ENTERTAINER,
  GET_CITIES,
  GET_COUNTRIES,
  GET_MAIN_CATEGORY,
  GET_STATES,
  GET_SUB_CATEGORY,
  UPLOAD_MEDIA,
} from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSideBar from "../../components/Venue/AdminSideBar";

export default function Profile() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  let data = location.state;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    specific_category: "",
    bio: "",
    phone1: "",
    country:0,
    state:0,
    city:0,
    phone2: "",
    performanceRole: "",
    availability: "",
    pricePerEvent: 0,
    socialLinks: "",
    vaccinated: "",
    status: "",
    userId: data.id || "",
    // images: [],
    // videos: [],
    // headshot: null,
  });
  useEffect(() => {
    if (data?.id) {
      setFormData((prevState) => ({
        ...prevState,
        userId: data.id, // Update userID with the data.id if available
      }));
    }
  }, [data]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [headshot, setHeadshot] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [tempLink, setTempLink] = useState("");

  const [showmediaupload, setShowmediaupload] = useState("none");
  const [showform, setShowform] = useState("block");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_COUNTRIES}`
        );
        console.log(response.data); // Debugging
  
        setCountries(response.data?.countries || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
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

  const performanceRole = [
    { value: "soloist", label: "Soloist" },
    { value: "duo", label: "Duo" },
    { value: "trio", label: "Trio" },
  ];

  const status = [
    { value: "active", label: "Active"},
    { value: "pending", label: "Pending"}
  ]

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_MAIN_CATEGORY}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          setCategories(
            response.data.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))
          );
        } else {
          console.error(
            "Unexpected API response format for categories:",
            response.data
          );
          toast.error("Failed to load categories. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

 
  

  const handleInputChange = async(e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTempLink(e.target.value);

    if (name === "country") {
      setStates([]); // Clear previous states
      setCities([]); // Clear previous cities
      if (value) await fetchStates(value);
    }
  
    if (name === "state") {
      setCities([]); // Clear previous cities
      if (value) await fetchCities(value);
    }
  };

  const handleCategoryChange = async (selectedValue) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedValue.target.value,
      specific_category: "",
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${GET_SUB_CATEGORY}`,
        { parentId: selectedValue.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setSubcategories(
          response.data.map((sub) => ({
            value: sub.id,
            label: sub.name,
          }))
        );
      } else {
        console.error("No subcategory found:", response.data);
        setSubcategories([]);
        toast.error("No subcategories found for the selected category");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
      toast.error("Failed to fetch subcategories.");
    }
  };

  const handleSubCategoryChange = (selectedValue) => {
    setFormData((prev) => ({
      ...prev,
      specific_category: selectedValue.target.value,
    }));
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

  const handleDeleteHeadshot = () => {
    setHeadshot(null);
    setFormData((prevData) => ({ ...prevData, headshot: "" }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);

    if (type === "headshot") {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setHeadshot(file);
      setFormData((prev) => ({ ...prev, headshot: fileUrl }));
    }

    if (type === "images") {
      setImages((prev) => [...prev, ...files]);
    } else if (type === "videos") {
      setVideos((prev) => [...prev, ...files]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Entertainer Name is required";

    if (!formData.category) newErrors.category = "Entertainer Category is required";

    if (!formData.phone1) newErrors.phone1 = "Phone Number 1 is required";
    else if (!/^\d+$/.test(formData.phone1))
      newErrors.phone1 = "Phone Number 1 must be digits only";

    if (!formData.performanceRole)
      newErrors.performanceRole = "Performance Role is required";

    // Validate pricePerEvent
    if (!formData.pricePerEvent) {
      newErrors.pricePerEvent = "Price is required";
    } else if (
      isNaN(formData.pricePerEvent) ||
      Number(formData.pricePerEvent) <= 0
    ) {
      newErrors.pricePerEvent = "Price must be a positive number";
    }

    if (!formData.availability)
      newErrors.availability = "Availability is required";

    if (!formData.vaccinated)
      newErrors.vaccinated = "Vaccination status is required";

    return newErrors;
  };

  const mediaUpload = async (e) => {
    e.preventDefault();
    console.log("hey");
    try {
      const mediaFormData = new FormData();

      if (headshot) {
        mediaFormData.append("headshot", headshot);
      }

      images.forEach((image) => {
        mediaFormData.append("images", image);
      });

      videos.forEach((video) => {
        mediaFormData.append("videos", video);
      });

      mediaFormData.append("userId", data.id);

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

      if (mediaUploadResponse.status === 201) {
        const { headshotUrl, imagesUrls, videosUrls } =
          mediaUploadResponse.data;

        setFormData((prev) => ({
          ...prev,
          headshot: headshotUrl || prev.headshot,
          images: imagesUrls || prev.images,
          videos: videosUrls || prev.videos,
        }));

        toast.success("Media uploaded successfully!", {
          autoClose: 1000,
          
        }
      );
      setTimeout(() => {
        navigate("/admin/viewentertainer");
      }, 1000);
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      toast.error("Failed to upload media. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }

    const payload = {
      ...formData,
      category:Number(formData.category),
      specific_category: Number(formData.specific_category),
      pricePerEvent: Number(formData.pricePerEvent),
      city:Number(formData.city),
      country:Number(formData.country),
      state:Number(formData.state),
    };

    console.log("entertainer details",payload)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_ENTERTAINER}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === "success") {
        toast.success("Entertainer Created successfully!", { autoClose: 1000 });
        setShowmediaupload("block");
        setShowform("none");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      toast.error("Failed to submit the form.");
    }
  };

  return (
    <>
      <DashLayout title="Profile" description="View and manage your profile"/>
      <ToastContainer />

              <div className="container-fluid w-100 p-0">
                <div className="d-flex mt-0">
                  <div className="dash-sidebar-container">
                    <AdminSideBar />
                  </div>
                  <div className="dash-profile-container">
          <div className="row label-font">
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
              <p className="label-font fw-semibold mt-3">PROFILE</p><hr/>
            </div>
            <div className="row justify-content-center mb-4 scrollable-container event-form pt-2 ms-1 mb-2">
              <form onSubmit={handleSubmit} style={{ display: `${showform}` }}>
                <div className="d-flex justify-content-center">
                  <div className=" col-12 border-0 rounded">
                    <div className="div">
                      <p className="label-font fw-semibold text-muted">
                        Entertainer Details
                      </p>
                      <hr className="mb-4" />
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Entertainer Name</label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter your Entertainer Name"
                            onChange={handleInputChange}
                          />
                          {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">
                            Entertainer Main Category
                          </label>
                          <Select
                            options={categories}
                            value={formData.category || ""}
                            onChange={handleCategoryChange}
                            placeholder="Select Category"
                          />
                          {errors.category && (
                            <div className="text-danger">{errors.category}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">
                            Entertainer Sub Category
                          </label>
                          <Select
                            options={subcategories}
                            value={formData.specific_category || ""}
                            onChange={handleSubCategoryChange}
                            placeholder="Select Subcategory"
                            isDisabled={!formData.category}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Bio</label>
                          <textarea
                            className="form-control"
                            name="bio"
                            value={formData.bio}
                            rows="1"
                            onChange={handleInputChange}
                            placeholder="Describe your business"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Contact Number 1</label>
                          <Input
                            type="text"
                            name="phone1"
                            value={formData.phone1}
                            placeholder="Enter your contact number."
                            onChange={handleInputChange}
                          />
                          {errors.phone1 && (
                            <div className="text-danger">{errors.phone1}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Contact Number 2</label>
                          <Input
                            type="text"
                            name="phone2"
                            value={formData.phone2}
                            placeholder="Enter your another contact number."
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Performance Role</label>
                          <Select
                            name="performanceRole"
                            options={performanceRole}
                            defaultOption="--Select Role--"
                            value={formData.performanceRole}
                            onChange={handleInputChange}
                          />
                          {errors.performanceRole && (
                            <div className="text-danger">
                              {errors.performanceRole}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Availability?</label>
                          <RadioButton
                            name="availability"
                            options={options}
                            value={formData.availability}
                            onChange={handleInputChange}
                          />
                          {errors.availability && (
                            <div className="text-danger mt-0">
                              {errors.availability}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Price Per Event</label>
                          <Input
                            type="text"
                            name="pricePerEvent"
                            value={formData.pricePerEvent}
                            placeholder="Rs."
                            onChange={handleInputChange}
                          />
                          {errors.pricePerEvent && (
                            <div className="text-danger">
                              {errors.pricePerEvent}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="fw-semibold label-font">Vaccinated?</label>
                          <RadioButton
                            name="vaccinated"
                            options={options}
                            value={formData.vaccinated}
                            onChange={handleInputChange}
                          />
                          {errors.vaccinated && (
                            <div className="text-danger">
                              {errors.vaccinated}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4">
                        <label className="fw-semibold label-font">Status</label>
                          <Select
                            name="status"
                            options={status}
                            defaultOption="--Select Status--"
                            value={formData.status}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                      <label className="form-label label-font mt-3 mb-0 fw-medium">
                        Country
                      </label>
                      <select
                        className="form-control "
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
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

                    <div className="col-md-4">
                      <label className="form-label mt-3 mb-0 fw-medium">
                        State
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={handleInputChange}
                        value={formData.state}
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

                    <div className="col-md-4">
                    <label className="form-label label-font mt-3 mb-0 fw-medium">
                        City
                      </label>
                      <select
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
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
                      </div>
                      <p className="text-start text-muted label-font fw-semibold mt-2">Links</p>
                      <hr className="mb-4" />
                      <div className="row mb-3">
                        <label className="fw-semibold label-font">Social Media Link</label>
                        <div className="col-md-6 col-sm-12">
                          <Input
                            type="text"
                            name="socialLinks"
                            value={formData.socialLinks}
                            placeholder="Enter your Social Media Link"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col d-flex ">
                          <Button
                            type="submit"
                            className="btn-dark mb-3 float-start label-font rounded-3 "
                            label={isEditing ? "Update" : "Submit"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <form
                onSubmit={mediaUpload}
                style={{ display: `${showmediaupload}` }}
              >
                <div className="d-flex justify-content-center">
                  <div className="card shadow-lg col-11 border-0 rounded p-4">
                    <div className="card-body">
                      <h5 className="text-start text-primary mt-2">
                        Media Uploads
                      </h5>
                      <hr className="mb-4" />

                      <div className="row mb-3">
                        <div className="col-md-12 col-sm-12">
                          <label className="fw-medium">
                            Headshot Profile Pic
                          </label>
                          <Input
                            type="file"
                            name="headshot"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "headshot")}
                          />
                          {headshot && (
                            <div className="position-relative">
                              <img
                                src={URL.createObjectURL(headshot)}
                                alt="Headshot preview"
                                className="media-image rounded"
                                style={{ height: "90px", width: "90px" }}
                              />
                              <button
                                type="button"
                                className="btn btn-link position-absolute"
                                onClick={handleDeleteHeadshot}
                              >
                                <i className="fa-solid fa-trash-can text-danger"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row mt-4">
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
                                  <button
                                    type="button"
                                    className="btn btn-link position-absolute"
                                    onClick={() => handleDeleteImage(index)}
                                  >
                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Video Upload */}
                      <div className="row mt-4">
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
                                    src={URL.createObjectURL(file)}
                                    controls
                                    className="media-video rounded"
                                    style={{ height: "90px", width: "90px" }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-link position-absolute"
                                    onClick={() => handleDeleteVideo(index)}
                                  >
                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col d-flex justify-content-center">
                          <Button
                            type="submit"
                            className="btn-primary w-25 fw-bold"
                            label="Upload Media"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
          </div>
        </div>
    </>
  );
}
