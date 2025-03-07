import React, { useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const EntertainerCard = ({ entertainer }) => {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  const navigate = useNavigate()
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); 
    setIsFavorited((prev) => !prev);
  };
  
  const handleCardClick = (e) => {
    if (e.target.closest(".favorite-btn")) return;
    e.preventDefault();
    localStorage.setItem("entertainerId", entertainer.eid);
    navigate('/venue/entertainerDetails');
  }

  const headshot = entertainer.media?.find((media) => media.type === "headshot")?.url;

  return (
    <>
  
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="card card-rounded mb-3 rounded-4 overflow-hidden" onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <button className="favorite-btn position-absolute top-1 me-3 end-0 m-2 border-0 bg-transparent" onClick={toggleFavorite} style={{
            zIndex: 10, // Ensures button stays above other elements
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Slight background for visibility
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <i className={`bi ${isFavorited ? "bi-heart-fill text-danger" : "bi-heart text-light"}`} style={{ fontSize: "1.2rem" }}></i>
        </button>
        <img
          src={headshot || "../assets/pique/image/magician.jpg"} 
          className="card-img"
          style={{ 
            // height:"250px",
            aspectRatio: "4 / 3", 
            objectFit: "cover",  
            borderRadius: "12px"
          }}
          alt={entertainer.name}
        />
          <p className="custom-card-text fw-bold mt-2 mb-0">{entertainer.name}</p>
          <p className="text-muted custom-card-text">{entertainer.availability === "yes" ? "Available" : "Unavailable"} - Rs. {entertainer.pricePerEvent}</p>
      </div>
    </div>
    
    </>
  );
};

export default EntertainerCard;
