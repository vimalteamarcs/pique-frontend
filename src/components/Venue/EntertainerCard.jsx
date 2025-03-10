import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EntertainerCard = ({ entertainer, isWishlisted, isProcessing, onRemoveFromWishlist }) => {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(isWishlisted);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (isLoading) return; 
    setIsLoading(true);
    console.log("entertainer details", entertainer);
    const body = {
      name: entertainer.name,
      url: "www.abc.com",
      category: entertainer.category,
      specific_category: entertainer.specific_category,
      entId: Number(entertainer.eid),
    };
    console.log("toggle fav",body);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}venues/toogle/wishlist`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("toogle", response);
      if (response.status === 200 || response.status === 201) {
        setIsFavorited((prev) => !prev);

        if (isFavorited && onRemoveFromWishlist) {
          onRemoveFromWishlist(entertainer.eid);
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (e) => {
    if (e.target.closest(".favorite-btn")) return;
    e.preventDefault();
    localStorage.setItem("entertainerId", entertainer.eid);
    navigate("/venue/entertainerDetails");
  };

  const headshot =
    entertainer.media?.find((media) => media.type === "headshot")?.url ||
    "../assets/pique/image/magician.jpg";

  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
        <div
          className="card card-rounded mb-3 rounded-4 overflow-hidden"
          onClick={handleCardClick}
          style={{ cursor: "pointer", border: "none" }}
        >
          <button
            className="favorite-btn position-absolute top-1 me-3 end-0 m-2 border-0 bg-transparent"
            onClick={toggleFavorite} disabled={isLoading}
          >
          {isLoading ? (
            <div className="spinner-border spinner-border-sm text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <i
              className={`fa-solid ${isFavorited ? "fa-heart text-danger" : "fa-heart text-light"}`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          )}
          </button>
          <img
            src={headshot && "../assets/pique/image/magician.jpg"}
            className="card-img"
            style={{
              // height:"250px",
              aspectRatio: "4 / 3",
              objectFit: "cover",
              borderRadius: "12px",
            }}
            alt={entertainer.name}
          />
          <p className="custom-card-text fw-bold mt-2 mb-0">
            {entertainer.name}
          </p>
          <p className="text-muted custom-card-text">
            {entertainer.availability === "yes" ? "Available" : "Unavailable"} -
            Rs. {entertainer.pricePerEvent}
          </p>
        </div>
      </div>
    </>
  );
};

export default EntertainerCard;
