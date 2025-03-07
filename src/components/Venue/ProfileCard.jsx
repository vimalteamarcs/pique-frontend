import React, { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [headshot, setHeadshot] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    country: 0,
    state: 0,
    city: 0,
    zipCode: "",
    phone: "",
    email: "",
    description: "",
  });

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}venues`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Venue Response:", response.data);
      localStorage.setItem("venueId", response.data.venues[0].id);

      if (response.data?.status && Array.isArray(response.data.venues)) {
        const venueData = response.data.venues[0] || {}; 

        setVenue({
          name: venueData.name || "",
          addressLine1: "", 
          addressLine2: "",
          country: 0,
          state: 0,
          city: 0,
          zipCode: "",
          phone: "",
          email: "",
          description: "",
        });

        setIsEditing(true);
        setHeadshot(venueData.media?.[0]?.url || null);
        fetchStates(venueData.country);
        fetchCities(venueData.state);
      } else {
        console.warn("No venues found.");
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

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
        setCountries(
          response.data.map((c) => ({ label: c.name, value: c.id }))
        );
      } else if (response.data && Array.isArray(response.data.countries)) {
        // If the data is wrapped in an object
        setCountries(
          response.data.countries.map((c) => ({ label: c.name, value: c.id }))
        );
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
        setStates(
          response.data.states.map((s) => ({ label: s.name, value: s.id }))
        );
      } else {
        console.error(
          "Unexpected API response format for states:",
          response.data
        );
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
        setCities(
          response.data.cities.map((c) => ({ label: c.name, value: c.id }))
        );
      } else {
        console.error(
          "Unexpected API response format for cities:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setVenue((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    if (name === "country") {
      setStates([]);
      setCities([]);
      fetchStates(value);
    }
  
    if (name === "state") {
      setCities([]);
      fetchCities(value);
    }
  
    // ✅ Only call addVenue() if all required fields are filled
    if (name === "name" && value.trim() !== "" && venue.addressLine1 && venue.country && venue.state && venue.city) {
      addVenue();
    }
  };
  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_MEDIA_URL}media/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status && response.data.fileUrl) {
        setVenue({ ...venue, imageUrl: response.data.fileUrl });
        setHeadshot(response.data.fileUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const addVenue = async () => {
    try {
      const token = localStorage.getItem("token");
      const venueData = {
        phone: localStorage.getItem("phone") || venue.phone,
        email: localStorage.getItem("email") || venue.email,
        addressLine1: venue.addressLine1,
        addressLine2: venue.addressLine2,
        city: Number(venue.city),
        state: Number(venue.state),
        zipCode: venue.zipCode,
        country: Number(venue.country),
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}venues/location/add`,
        venueData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        toast.success("Venue Location added successfully!");
        console.log("Venue Added:", response.data);
      }
    } catch (error) {
      console.error("Error adding venue:", error);
      toast.error("Failed to add venue.");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const venueData = {
      name: venue.name,
      addressLine1: venue.addressLine1,
      addressLine2: venue.addressLine2,
      country: Number(venue.country),
      state: Number(venue.state),
      city: Number(venue.city),
      zipCode: venue.zipCode,
      phone: localStorage.getItem("phone"),
      email: localStorage.getItem("email"),
      // description: venue.description,
      isParent: true,
      parentId: null,
      venueId: Number(localStorage.getItem("venueId")),
    };

    console.log("Data:", venueData);
    try {
      const response = await axios[isEditing ? "put" : "post"](
        isEditing
          ? `${import.meta.env.VITE_API_URL}venues/update`
          : `${import.meta.env.VITE_API_URL}venues`,
        venueData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `Venue ${isEditing ? "updated" : "created"} successfully!`
        );
      }
    } catch (error) {
      console.error("Error submitting venue:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-0">
          <div className="div">
          <p className="fw-bold mb-0">PROFILE</p>
          </div>
          <div className="div">
            <button type="button" className="btn btn-outline-dark rounded-3 profile-font" onClick={addVenue}>Add Location</button>
          <button type="submit" className="btn venue-btn profile-font mb-0 ms-2">
            Submit
          </button>
          </div>
          
        </div>
        <hr />
        <Toaster position="top-center" reverseOrder={false} />
        <p className="profile-font text-muted">
          This information will be shared with entertainers who are booked for
          Pique.{" "}
        </p>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row mb-2 profile-font">
              <div className="col-md-12 col-sm-12">
                <label className="fw-semibold">Residence Name*</label>
                <Input
                  type="text"
                  className="form-control profile-font"
                  name="name"
                  value={venue.name ?? ""}
                  onChange={handleChange}
                  placeholder="Enter your venue Name"
                />
              </div>
            </div>

            <div className="row mb-2 profile-font">
              <div className="col-md-6 col-sm-12">
                <label className=" fw-semibold">Address Line 1*</label>
                <Input
                  type="text"
                  name="addressLine1"
                  value={venue.addressLine1}
                  onChange={handleChange}
                  className="form-control profile-font"
                  placeholder="Street Address, P.O.box,c/o"
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="fw-semibold">Address Line 2*</label>
                <Input
                  type="text"
                  name="addressLine2"
                  value={venue.addressLine2}
                  onChange={handleChange}
                  className="form-control profile-font"
                  placeholder="Apartment,suite,unit,building,floor,etc."
                />
              </div>
            </div>

            <div className="row mb-3 profile-font">
              <div className="col-md-6 col-sm-12">
                <label className="fw-semibold">Country</label>
                <Select
                  name="country"
                  options={countries}
                  value={venue.country}
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
                  value={venue.state}
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
                  value={venue.city}
                  onChange={handleChange}
                  defaultOption="--Select City--"
                  className="form-control profile-font"
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="fw-semibold">ZIP/Postal Code</label>
                <Input
                  name="zipCode"
                  value={venue.zipCode}
                  onChange={handleChange}
                  className="form-control profile-font"
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            <div className="row profile-font mb-2">
              <div className="col-md-6 col-sm-12">
                <label className=" fw-semibold">Contact Person Name*</label>
                <Input
                  type="text"
                  name="name"
                  value={localStorage.getItem("userName")}
                  onChange={handleChange}
                  className="form-control profile-font"
                  placeholder="Enter your email address"
                  disabled
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label className=" fw-semibold">Phone Number*</label>
                <Input
                  type="text"
                  name="phone"
                  value={localStorage.getItem("phone")}
                  onChange={handleChange}
                  className="form-control profile-font"
                  placeholder="Enter phone number"
                  disabled
                />
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}
