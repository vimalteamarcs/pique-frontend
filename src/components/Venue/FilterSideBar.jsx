import React, { useEffect, useState } from "react";
import Button from "../Button";
import axios from "axios";
import RadioButton from "../RadioButton";

export default function FilterSidebar({
    availability,
    setAvailability = () => {},
    selectedCategory,
    setSelectedCategory = () => {},
    updateFilters = () => {},
    searchQuery,
    setSearchQuery = () => {},
  }) {
    const [countries, setCountries] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}location/countries`
            );
            console.log(response)
            setCountries(
              response.data.countries
            );
          } catch (error) {
            console.error("Error fetching countries:", error);
          }
        };

        const fetchCategories = async () => {
            try {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}entertainers/categories/all`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Categories:", response.data);
              setCategories(
                response.data.categories.map((category) => ({
                  label: category.name,
                  value: category.id.toString(),
                }))
              );
            } catch (error) {
              console.error("Error fetching categories:", error);
            }
          };
      
          fetchCountries();
          fetchCategories();
      }, []);

      const handleResetFilters = () => {
        setAvailability(""); 
        setSelectedCategory("");
        if (setSearchQuery) setSearchQuery(""); 
        updateFilters({ availability: "", category: ""});
      };
      

      useEffect(() => {
        updateFilters({ availability, category: selectedCategory });
      }, [availability, selectedCategory]);
      
    

  return (
    <div className="col-md-12 p-3 rounded-lg">
       <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Filter</h5>
        <Button className="btn-sm btn-outline-danger" onClick={handleResetFilters}>
          Reset All
        </Button>
      </div>
<hr/>
      {/* Location Filter */}

        {countries.length > 0 && (
        <>
          <div className="mb-3">
            <h6>Location</h6>
            {countries.map((country) => (
              <div key={country.id} >
                <input type="checkbox" id={country.cc} className="custom-check"/>
                <label htmlFor={country.cc} className="ms-2 custom-check">
                  {country.name}
                </label>
              </div>
            ))}
          </div>
          <hr />
        </>
        )}


      {/* Availability */}
      <div className="mb-3">
        <h6>Availability</h6>
        <RadioButton
          name="availability"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          value={availability}
          onChange={(value) => {
            setAvailability(value);
            updateFilters({ availability: value });
          }}
        />
      </div><hr/>

      {/* Entertainer Type */}
      {categories.length > 0 && (
        <>
          <div className="mb-3">
            <h6>Entertainer Category</h6>
            <RadioButton
              name="entertainer-category"
              options={categories}
              value={selectedCategory}
              onChange={(value) => {
                setSelectedCategory(value);
                updateFilters({ category: value });
              }}
            />
          </div>
        </>
      )}
    </div>
  


  );
}
