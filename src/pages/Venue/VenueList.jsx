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
