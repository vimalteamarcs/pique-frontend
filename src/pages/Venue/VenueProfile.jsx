import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import ProfileCard from "../../components/Venue/ProfileCard";

export default function VenueProfile() {
  // console.log("hello");
  const [formData, setFormData] = useState({
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
  });
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [venueId, setVenueId] = useState(null);
  const navigate = useNavigate();



  return (
    <>
      <DashLayoutVenue
        title="Profile"
        description="View and manage your profile"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
            </div>
            <div className="profile-container">
              <ProfileCard />
            </div>
          </div>
        </div>
      </DashLayoutVenue>
    </>
  );
}
