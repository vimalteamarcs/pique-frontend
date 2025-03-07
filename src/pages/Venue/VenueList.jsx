import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VenueTable from "../../components/Venue/VenueTable";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import SearchBar from "../../components/Venue/SearchBar";

export default function VenueList() {
  const [expanded, setExpanded] = useState({});
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const venueId = localStorage.getItem('venueId')
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}venues/${venueId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Venue Data:", response.data);

      if (!response.data || !Array.isArray(response.data.data)) {
        console.error("Unexpected API response format:", response.data);
        setVenues([]); 
        return;
      }
      setVenues(response.data.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const navigate = useNavigate();

  const handleAddVenueClick = () => {
    navigate("/venue/add", { state: { venue: venues.parent } });
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleEditClick = (venue) => {
    setSelectedVenue(venue);
  };
  return (
    <>
      {/* <div className="d-flex justify-content-between">
        <p className="fw-bold profile-font mb-0">YOUR VENUES </p>
        <Button
          className="venue-btn btn-sm mb-0"
          type="button"
          label="Add Location"
          onClick={handleAddVenueClick}
        />
      </div>
      <hr />

      <div className="row ">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : venues.parent ? (
          <div className="row ">
            <div className="col-md-7">
              <h5 className="fw-semibold mb-3 venue-title">
                {venues.parent.name}
              </h5>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Owner Name : </span>
                {localStorage.getItem("userName")}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Email Address : </span>
                {venues.parent.email}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Contact Number : </span>
                {venues.parent.phone}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Booking Policies : </span>
                {venues.parent.bookingPolicies}
              </p>
              <p className="profile-font">
                <span className="fw-semibold">Description: </span>
                {expanded[venues.parent.id]
                  ? venues.parent.description
                  : truncateText(venues.parent.description, 20)}
                {venues.parent.description.split(" ").length > 20 && (
                  <Button
                    className="btn btn-link profile-font p-0 ms-1"
                    onClick={() => toggleExpand(venues.parent.id)}
                  >
                    {expanded[venues.parent.id] ? "Show Less" : "Show More"}
                  </Button>
                )}
              </p>
            </div>
            <div className="col-md-5">
              <img
                src="../assets/pique/image/venue1.avif"
                className="img-fluid rounded-4"
                style={{ height: "13em", width: "25rem" }}
                alt={venues.parent.name}
              />
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">No venues found.</p>
        )}
      </div>
      <hr /> */}
      <DashLayoutVenue
        title="Profile"
        description="View and manage your profile"
      >
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
           </div>
           <div className="profile-container">
                <VenueTable
                  venues={venues}
                  setVenues={setVenues}
                  selectedVenue={selectedVenue}
                  setSelectedVenue={setSelectedVenue}
                  handleEditClick={handleEditClick}
                  loading={loading}
                />
             
            </div>
          </div>
        </div>
      </DashLayoutVenue>
    </>
  );
}
