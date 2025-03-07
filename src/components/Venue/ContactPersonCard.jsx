import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../Input";

export default function ContactPersonCard() {
  const [contactPerson, setContactPerson] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setContactPerson({
      ...contactPerson,
      [e.target.name]: e.target.value,
    });
  };
  

  useEffect(() => {
    const fetchProfile = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}auth/profile`, 
              {},
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
      
            console.log(response.data);
        setContactPerson({
        //   name: response.data.user.name || "",
          phone: response.data.user.phone || "",
          email: response.data.user.email || "",
        });
      } catch (error) {
        console.error("Error fetching contact person:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-0">
        <p className="fw-bold mb-0">CONTACT PERSON</p>
        <button type="button" className="btn venue-btn profile-font mb-0">
          Update
        </button>
      </div>

      <hr />
      <p className="profile-font text-muted">
        This information will not be shared with entertainers who are booked for Pique.
      </p>

      <form>
        <div className="row mb-3 profile-font">
          <div className="col-md-6 col-sm-12">
            <label className="fw-semibold">Contact Person Name</label>
            <Input
              type="text"
              className="form-control profile-font text-muted"
              name="name"
              onChange={handleChange}
              value={localStorage.getItem('userName')}
              placeholder="Enter your venue Name"
            //   disabled
            />
          </div>

          <div className="col-md-6 col-sm-12">
            <label className="fw-semibold">Contact Number</label>
            <Input
              type="text"
              className="form-control profile-font text-muted"
              name="phone"
              onChange={handleChange}
              value={localStorage.getItem('phone')}
              placeholder="Enter your phone Number"
            //   disabled
            />
          </div>
        </div>

        <div className="row profile-font">
          <div className="col-md-6 col-sm-12">
            <label className="fw-semibold">Contact Email</label>
            <Input
              type="email"
              className="form-control profile-font text-muted"
              name="email"
              onChange={handleChange}
              value={contactPerson.email || ""}
              placeholder="Enter your email address"
            //   disabled
            />
          </div>
        </div>
      </form>
    </>
  );
}
