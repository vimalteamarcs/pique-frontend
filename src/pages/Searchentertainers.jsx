import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const SearchEntertainers = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entertainers, setEntertainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    if (searchQuery.length > 0) {
      axios.get("http://localhost:8080/venues/search/suggestion/cat", {
        params: { q: searchQuery },
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          console.log("Category API Response:", response.data); // Debugging
          if (response.data && Array.isArray(response.data.data)) {
            setCategories(response.data.data);
            setShowSuggestions(true);
          } else {
            console.error("Invalid category data format:", response.data);
            setCategories([]);
            setShowSuggestions(false);
          }
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
          setCategories([]);
          setShowSuggestions(false);
        });
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, token]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchQuery(category.name);
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    setSearchParams({ category: selectedCategory.id, query: searchQuery });

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/venues/search/entertainers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Entertainers API Response:", response.data); // Debugging
      const filteredEntertainers = response.data.entertainers.filter(ent => ent.category === selectedCategory.id);
      setEntertainers(filteredEntertainers);
    } catch (error) {
      console.error("Error fetching entertainers:", error);
      setEntertainers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto relative">
      <h2 className="text-lg font-semibold mb-2">Search Entertainers</h2>
      <input
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      {showSuggestions && categories.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-auto">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectCategory(cat)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white p-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <div className="mt-4">
        {entertainers.length > 0 ? (
          <ul>
            {entertainers.map(ent => (
              <li key={ent.id} className="p-2 border-b">{ent.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No entertainers found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchEntertainers;
