import React, { useState } from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import AddVenue from '../../pages/Venue/AddVenue';

export default function VenueCard({venues, loading}) {
const navigate = useNavigate();

const handleAddVenueClick = () => {
    navigate("/venue/add"); 
  };

  const handleEditClick = (venue) => {
    navigate("/venue/edit", { state: { venue } }); 
  };
  
  return (
    <>
    <div className="d-flex justify-content-between">
    <p className="fw-bold profile-font mb-0">YOUR VENUES </p>
 
          <Button
            className="venue-btn btn-sm mb-0"
            type="button"
            label="Add Venue"
            onClick={handleAddVenueClick}
          />
      
    </div>
    <hr />

    <div className="row d-flex">
    {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue.id} className="col-md-4 col-sm-12 mb-4">
              <div className="card venue-card mb-3" style={{ width: "19rem", height: "19rem" }}>
                <img
                  src={venue.media.length > 0 ? venue.media[0].url : "../assets/pique/image/venue1.avif"}
                  className="card-img-top img-fluid"
                  style={{ height: "10em", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                  alt={venue.name}
                />
                <div className="div p-2">
                  <p className="profile-font fw-bold mt-2 mb-0">{venue.name}</p>
                  <p className="profile-font fw-semibold">{venue.addressLine1}, {venue.addressLine2}</p>
                  <p className="profile-font text-secondary venue-description">{venue.description}</p>
                  <Button className="venue-btn btn-sm w-100 mt-auto" type="button" onClick={() => handleEditClick(venue)}>
                    <i className="fa-regular fa-pen-to-square me-2"></i>Edit Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No venues found.</p>
        )}
      </div>
    
    </>
  )
}
