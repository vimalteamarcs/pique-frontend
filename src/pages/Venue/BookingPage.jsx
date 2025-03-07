import React, { useState } from 'react'
import PiqueFooter from '../../components/PiqueComponents/PiqueFooter'
import DashLayoutVenue from '../../components/Venue/DashLayoutVenue'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

export default function BookingPage() {
    const navigate = useNavigate()
      const [bookingFormData, setBookingFormData] = useState({
        venueId: "",
        performanceDate: "",
        performanceTime: "",
        eventId:7
      });
      const handleChange = (e) => {
        setBookingFormData({
          ...bookingFormData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        // onBook(bookingFormData);
        console.log(bookingFormData)
      };

  return (
     <DashLayoutVenue
          title="Entertainer Booking Page"
          description="Fill the form details and book the entertainer."
        >
            <div className="container d-flex flex-column min-vh-100">
                <div className="row mt-5">
                    <div className="col-md-12">
                    <Button
                onClick={() => navigate(-1)}
                className="btn-danger d-flex align-items-center"
              >
                <i className="fa fa-arrow-left"></i>
              </Button>
                <h4 className='mt-5 text-center'>Booking Form</h4>
            <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="venueId" className="form-label text-dark fs-5">
                     Choose Venue
                    </label>
                    <Select
                      name="venueId"
                      id="venueId"
                      value={bookingFormData.venueId}
                      onChange={handleChange}
                      options={[
                        { label: "A", value: "yes" },
                        { label: "B", value: "no" },
                      ]}
                      placeholder="Select a venue"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="performanceDate" className="form-label text-dark fs-5">
                      Performance Date
                    </label>
                    <Input
                      type="date"
                      name="performanceDate"
                      value={bookingFormData.performanceDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="performanceTime" className="form-label text-dark fs-5">
                      Performance Time
                    </label>
                    <Input
                      type="time"
                      name="performanceTime"
                      value={bookingFormData.performanceTime}
                      onChange={handleChange}
                    />
                  </div>

                    <Button type="submit" className="btn btn-primary">
                      Submit
                    </Button>
                  
                </form>
                    </div>

                </div>

            </div>
            <PiqueFooter/>
        </DashLayoutVenue>
  )
}
