import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../Input";
import Button from "../Button";
import { useSearchParams } from "react-router-dom";

export default function FilterModal({
  isModalOpen,
  setIsModalOpen,
  selectedCategories,
  setSelectedCategories,
  selectedLocation,
  setSelectedLocation,
    // handleCategoryChange,
  handleLocationChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  categories,
  locations,
}) {
  if (!isModalOpen) return null;

  const [searchParams, setSearchParams] = useSearchParams();
  const [tempSelectedCategories, setTempSelectedCategories] =
    useState(selectedCategories);

    const handleCategoryChange = (e) => {
      const categoryId = Number(e.target.value);
      setTempSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    };

    const applyFilters = () => {
      setSelectedCategories(tempSelectedCategories);
      setSearchParams({ category: tempSelectedCategories });
      setIsModalOpen(false);
    };
  

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation([]);
    setStartDate("");
    setEndDate("");
    setSearchParams({});
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1050",
          }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content px-2">
              <div className="modal-header">
                <h6 className="modal-title">Filters</h6>
                <button
                  type="button"
                  className="btn btn-sm btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <p>Date Range</p>
                  <p className="modal-font">Select Date Range for your event</p>
                  <div className="d-flex gap-3">
                    <div className="col-md-3">
                      <Input
                        type="text"
                        className="form-control modal-font"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) =>
                          e.target.value
                            ? (e.target.type = "date")
                            : (e.target.type = "text")
                        }
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start Date"
                      />
                    </div>

                    <p className="mt-2 fw-semibold">-</p>

                    <div className="col-md-3">
                      <Input
                        type="text"
                        className="form-control modal-font"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) =>
                          e.target.value
                            ? (e.target.type = "date")
                            : (e.target.type = "text")
                        }
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row mb-3">
                    <p>Entertainer Type</p>
                    {categories?.map((category) => (
                      <div key={category.id} className="form-check modal-font">
                        <input
                          type="checkbox"
                          id={category.id}
                          value={category.id}
                          checked={tempSelectedCategories.includes(category.id)}
                          onChange={handleCategoryChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={category.id}
                          className="form-check-label"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <hr />

                  <div className="row">
                    <p>Location</p>
                    {locations?.map((location) => (
                      <div key={location.id} className="form-check modal-font">
                        <input
                          type="checkbox"
                          id={location.id}
                          value={location.id}
                          checked={
                            selectedLocation?.includes(location.id) || false
                          }
                          onChange={(e) =>
                            setSelectedLocation((prev) =>
                              prev.includes(Number(e.target.value))
                                ? prev.filter(
                                    (id) => id !== Number(e.target.value)
                                  )
                                : [...prev, Number(e.target.value)]
                            )
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor={location.id}
                          className="form-check-label"
                        >
                          {location.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <p
                  className="cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={clearAllFilters}
                >
                  Clear All
                </p>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={applyFilters}
                >
                  Show Entertainers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
