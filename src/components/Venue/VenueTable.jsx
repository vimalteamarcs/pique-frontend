import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function VenueTable({
  venues,
  selectedVenue,
  setSelectedVenue,
  handleEditClick,
  setVenues,
  loading,
}) {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    email: "",
    phone: "",
  });
  const [venueToDelete, setVenueToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedVenue) {
      setFormData({
        addressLine1: selectedVenue?.addressLine1 || "",
        addressLine2: selectedVenue?.addressLine2 || "",
        email: selectedVenue?.email || "",
        phone: selectedVenue?.phone || "",
      });
    }
  }, [selectedVenue]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle API call
  const handleSaveChanges = async () => {
    setIsLoading(true);
    console.log("isLoading set to true"); 

    const updatedData = {
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      email: formData.email,
      phone: formData.phone,
      venueId: Number(selectedVenue.id),
    };
    console.log("updated data",updatedData)
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}venues/update`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast.success("Location updated successfully!");
        setVenues((prevVenues) => {
          if (!Array.isArray(prevVenues)) {
            console.error("prevVenues is not an array:", prevVenues);
            return [];
          }
        
          return prevVenues.map((venue) =>
            venue.id === selectedVenue.id ? { ...venue, ...formData } : venue
          );
        });
        
        setSelectedVenue(null);
      } else {
        toast.error("Failed to update location.");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
      toast.error("An error occurred while updating the venue.");
    }finally {
      console.log("isLoading set to false"); 
      setIsLoading(false);
    }
  };

  const handleDeleteVenue = async (venueId) => {
    console.log(venueId)
    if (!venueId) {
      toast.error("Invalid venue ID.");
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}venues/${venueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.status) {
        toast.success("Venue deleted successfully!");
  
        // Remove venue from state
        setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
      } else {
        toast.error("Failed to delete venue.");
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
      toast.error("An error occurred while deleting the venue.");
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
      setVenueToDelete(null);
    }
  };
  

  return (
    <>
      <p className="fw-bold mb-0">LOCATIONS</p>
      <hr />
      <div className="row">
        <Toaster position="top-center" reverseOrder={false} />
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : venues?.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="profile-font">
                  <th>Sr.No.</th>
                  <th>Address Line 1</th>
                  <th>Address Line 2</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="profile-font text-secondary">
              {venues.map((venue, index) => (
                  <tr key={venue.id}>
                    <td>{index + 1}</td>
                    <td>{venue.addressLine1} </td>
                    <td>{venue.addressLine2}</td>
                    <td>{venue.email}</td>
                    <td>{venue.phone}</td>
                    <td>
                      <Button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => handleEditClick(venue)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Button
                        className="btn btn-outline-danger ms-1 btn-sm"
                        onClick={() => {
                          setVenueToDelete(venue.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {selectedVenue && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog event-modal">
                <div className="modal-content pt-0 ps-2">
                  <div className="modal-header">
                    <p className="modal-title fw-semibold">Edit Details</p>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedVenue(null)}
                      disabled={isLoading}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {isLoading ? (
                      <div className="d-flex justify-content-center my-5">
                        <div className="spinner-grow text-dark" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <form>
                        <div className="row mb-2">
                          <div className="col-md-6">
                            <label className="form-label profile-font fw-semibold">
                              Address Line 1
                            </label>
                            <Input
                              type="text"
                              name="addressLine1"
                              className="form-control profile-font"
                              value={formData.addressLine1}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label profile-font fw-semibold">
                              Address Line 2
                            </label>
                            <Input
                              type="text"
                              name="addressLine2"
                              className="form-control profile-font"
                              value={formData.addressLine2}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-md-6">
                            <label className="form-label profile-font fw-semibold">
                              Email
                            </label>
                            <Input
                              type="email"
                              name="email"
                              className="form-control profile-font"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label profile-font fw-semibold">
                              Contact Number
                            </label>
                            <Input
                              type="text"
                              name="phone"
                              className="form-control profile-font"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <Button
                            className="btn btn-danger btn-sm rounded-3"
                            onClick={() => setSelectedVenue(null)}
                            disabled={isLoading}
                          >
                            Discard
                          </Button>
                          <Button
                            className="btn btn-sm venue-btn"
                            type="button"
                            onClick={handleSaveChanges}
                            disabled={isLoading}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {showDeleteModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog venue-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title profile-font">Delete Venue?</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowDeleteModal(false)}
                      disabled={isLoading}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {isLoading ? (
                      <div className="d-flex justify-content-center my-5">
                        <div className="spinner-grow text-dark" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <p className="profile-font">
                        Are you sure you want to delete this venue?
                      </p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <Button
                      className="btn btn-secondary profile-font"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn btn-danger profile-font"
                      onClick={() => handleDeleteVenue(venueToDelete)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
