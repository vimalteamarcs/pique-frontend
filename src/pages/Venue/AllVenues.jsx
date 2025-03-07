import React, { useEffect, useState } from "react";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import SearchBar from "../../components/Venue/SearchBar";
import VenueCard from "../../components/Venue/VenueCard";
import AddVenue from "./AddVenue";
import VenueList from "./VenueList";

export default function AllVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteVenueId, setDeleteVenueId] = useState(null);
  const [venueId, setVenueId] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchVenues = async () => {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_URL}venues`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       const data = response.data.data || []; 
  //       setVenues(Array.isArray(data) ? data : []);
  //     } catch (err) {
  //       setError("Failed to fetch venues");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchVenues();
  // }, []);
  

  const handleEdit = (id) => {
    setVenueId(id);
    localStorage.setItem("venueId", id);
    navigate("/venue/profile");
  };

  const handleDeleteClick = (id) => {
    setDeleteVenueId(id);
  };

  const confirmDelete = async () => {
    if (!deleteVenueId) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_MEDIA_URL}venues/${deleteVenueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== deleteVenueId));
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("Failed to delete venue");
    } finally {
      setDeleteVenueId(null);
    }
  };

  return (
    <DashLayoutVenue title="Venue List" description="Update and delete your venue.">
      <div className="container-fluid d-flex flex-column min-vh-100">
                  <SearchBar />
                  <div className="d-flex">
                    <div className="sidebar-container">
                      <ProfileSidebar />
                    </div>
                    <div className="profile-container">
     
              {/* <VenueCard venues={venues} loading={loading} /> */}
<VenueList />

         
                    </div>
                  </div>
      </div>
      <PiqueFooter />
    </DashLayoutVenue>
  );
}
