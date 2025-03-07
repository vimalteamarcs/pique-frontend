import React from 'react'
import DashLayoutVenue from '../../components/Venue/DashLayoutVenue'
import SearchBar from '../../components/Venue/SearchBar'
import ProfileSidebar from '../../components/Venue/ProfileSidebar'
import ContactPersonCard from '../../components/Venue/ContactPersonCard'

export default function ContactPerson() {
  return (
    <>
    <DashLayoutVenue
            title="Contact Person"
            description="View and manage your profile"
          >
            <div className="container-fluid d-flex flex-column min-vh-100">
                      <SearchBar />
                      <div className="d-flex">
                        <div className="sidebar-container">
                          <ProfileSidebar />
                        </div>
                        <div className="profile-container">
                          <ContactPersonCard />
                        </div>
                      </div>
                    </div>
          </DashLayoutVenue>
    </>
  )
}
