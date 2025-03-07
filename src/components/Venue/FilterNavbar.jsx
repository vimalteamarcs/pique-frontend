import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterModal from "./FilterModal";
import axios from "axios";

export default function FilterNavbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Best Match");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const options = ["Best Match", "Highest Rated", "Most Popular"];

  const categoryIcon = [
    { name: "Comedy Acts", icon: "fa-theater-masks" },
    { name: "Singers", icon: "fa-guitar" },
    { name: "Event DJs", icon: "fa-headphones-simple" },
    { name: "Dance Shows", icon: "fa-circle-play" },
    { name: "Actors & Actresses", icon: "fa-user-group" },
    { name: "Bands & Groups", icon: "fa-drum" },
    { name: "Magic Shows", icon: "fa-hat-wizard" },
    { name: "Unique & Specialty", icon: "fa-bullhorn" },
  ];

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const token = localStorage.getItem("token");

        const categoryResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}entertainers/categories/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(categoryResponse.data.categories || []);

        const locationResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}location/countries`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLocations(locationResponse.data.countries || []);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id); // Store ID instead of name
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("category", category.id); // Set category ID in URL params
      return newParams;
    });
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex gap-4">
          {categories.map((category) => {
            const matchingIcon = categoryIcon.find(
              (icon) => icon.name === category.name
            );

            return (
              <div
                key={category.id}
                className={`filter-item text-center ${
                  selectedCategory === category.id ? "active-category" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`fa-solid fs-5 ${
                    matchingIcon ? matchingIcon.icon : "fa-circle"
                  } ${selectedCategory === category.id ? "active-icon" : ""}`}
                ></i>
                <p className="icon-font m-0">{category.name}</p>
              </div>
            );
          })}
        </div>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 "
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fa-solid fa-sliders fs-5 "></i> <span className="icon-font">Filters</span>
          </button>
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle profile-font px-3 py-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by:{" "}
              <span
                className={selectedSort === "Best Match" ? "text-danger" : ""}
              >
                {selectedSort}
              </span>
            </button>
            <ul className="dropdown-menu">
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedSort(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <FilterModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          categories={categories}
          locations={locations}
        />
      )}
    </>
  );
}
