import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import Select from "../Select";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar({ updateFilters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [entertainers, setEntertainers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}location/countries`
        );
        const formattedCountries = response.data.countries.map((country) => ({
          value: country.id,
          label: country.name,
        }));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}venues/search/suggestion/cat`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: query },
      });

      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setSuggestions(response.data.data);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);

    if (query.trim() === "") {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("search");
      setSearchParams(updatedParams);

      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    setSelectedCategory(suggestion.id);
  };

  const handleSearchClick = async () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    setSearchParams({ category: selectedCategory, search: searchQuery });
    navigate('/venue/entertainers')
    fetchEntertainers(selectedCategory);
  };

  useEffect(() => {
    console.log("Current URL Params:", searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const fetchEntertainers = async (category, searchQueryParam) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}venues/search/entertainers`;
    const token = localStorage.getItem("token");
    const params = {};
    if (category) {
      params.category = category;
    }
    if (searchQueryParam) {
      params.search = searchQueryParam;
    }
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params, 
      });

      console.log("Fetched entertainers:", response.data);
      setEntertainers(response.data.data || []);

      updateFilters({
        category,
        search: searchQueryParam || "",
      });
    } catch (error) {
      console.error("Error fetching entertainers:", error);
      setEntertainers([]);
    }
  };



  return (
    <>
      <div className="container-fluid bg-searchbar mt-0 p-0">
        <div className="container">
          <div className="row search-bar gx-1 pt-2">
            <div className="col position-relative">
              <input
                type="date"
                className="custom-date-form rounded-3 custom-search-font custom-date-input p-3"
                style={{ "border": "none" }}
              />
            </div>
            <div className="col">
              <input
                type="time"
                className="custom-time-form rounded-3 custom-search-font p-3"
                style={{ "border": "none" }}
              />
            </div>
            <div className="col">
              <select
                className="custom-neighbour-form custom-search-font rounded-3 p-1"
                aria-label="Default select example"
                style={{ "border": "none" }}
              >

                <option value="default">Neighbourhoods</option>
                <option value="1">US</option>
                <option value="2">India</option>
              </select>
            </div>

            <div className="col">
              <Input
                type="text"
                placeholder="Search Entertainers"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                className="custom-search-form custom-search-font rounded-3 p-2"
                style={{ "border": "none" }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  className="dropdown-menu show position-absolute shadow"
                  style={{ width: "48%" }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.id || index}
                      className="dropdown-item custom-search-font"
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{ cursor: "pointer" }}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="col">
              <Button
                className="btn btn-dark rounded-3 custom-search-font" style={{width:"150px", fontSize:"12px", height:"38px"}}
                onClick={handleSearchClick}
              >
                <i className="fa fa-search me-3 fs-6"></i>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
