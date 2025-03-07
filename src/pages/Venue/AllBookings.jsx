import React, { useEffect, useState } from "react";
import axios from "axios";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import BookingsTable from "../../components/Venue/BookingsTable";
import UpdateBookingModal from "../../components/Venue/UpdateBookingModal";
import moment from "moment";
import { Toaster } from "react-hot-toast";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}venues/booking/request`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data)
      setBookings(response.data.bookings || []);
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleViewEntertainer = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <DashLayoutVenue title="All Bookings" description="View all bookings made">
      <div className="container-fluid d-flex flex-column min-vh-100">
        <SearchBar />
        <div className="d-flex">
          <div className="sidebar-container">
            <ProfileSidebar />
          </div>
          <div className="profile-container">
            <p className="profile-font fw-bold">BOOKINGS</p>
            <hr />

            <BookingsTable
              bookings={bookings}
              loading={loading}
              error={error}
              onViewEntertainer={handleViewEntertainer}
            />
          </div>
        </div>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      {isModalOpen && selectedBooking && (
        <UpdateBookingModal
          booking={selectedBooking}
          onClose={handleCloseModal}
          refreshBookings={fetchBookings}
        />
      )}

      <PiqueFooter />
    </DashLayoutVenue>
  );
}
