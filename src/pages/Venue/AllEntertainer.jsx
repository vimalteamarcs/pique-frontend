import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import SearchBar from "../../components/Venue/SearchBar";
import EntertainerCard from "../../components/Venue/EntertainerCard";
import FilterNavbar from "../../components/Venue/FilterNavbar";
import EntertainerListFooter from "../../components/Venue/EntertainerListFooter";

export default function AllEntertainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [entertainers, setEntertainers] = useState([]);
  const [filteredEntertainers, setFilteredEntertainers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEntertainer, setSelectedEntertainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const searchQuery = searchParams.get("search") || "";
  const availability = searchParams.get("availability") || "";
  const category = searchParams.get("category") || "";
  const pageIndex = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  useEffect(() => {
    const fetchEntertainers = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}venues/search/entertainers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              search: searchQuery || null,
              availability: availability || null,
              category: category || null,
              page: pageIndex,
              pageSize: pageSize,
            },
          }
        );
       console.log(response.data)
        setEntertainers(response.data.entertainers || []);
        setTotalCount(response.data.totalCount || 0);
      } catch (err) {
        setError(err.message || "Failed to fetch entertainers.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainers();
  }, [searchQuery, availability, category, pageIndex, pageSize]);

  const updateFilters = (newFilters) => {
    const updatedParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });

    updatedParams.set("page", "1");
    setSearchParams(updatedParams);
  };

  return (
    <DashLayoutVenue
      title="All Entertainers"
      description="View and book your preferred entertainer"
    >
      <div className="d-flex flex-column min-vh-100">
        <SearchBar updateFilters={updateFilters} />
        <div className="mt-3">
          <FilterNavbar updateFilters={updateFilters} />
        </div>
        <div className="container mt-3">
          <div className="scrollable-container">
            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center my-5">
                  <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : entertainers.length > 0 ? (
                entertainers.map((entertainer) => (
                  <EntertainerCard
                    key={entertainer.eid}
                    entertainer={entertainer}
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <EntertainerListFooter />
    </DashLayoutVenue>
  );
}
