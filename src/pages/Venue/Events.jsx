import React from 'react'
import DashLayoutVenue from '../../components/Venue/DashLayoutVenue'
import SearchBar from '../../components/Venue/SearchBar'
import ProfileSidebar from '../../components/Venue/ProfileSidebar'
import EventList from '../../components/Venue/EventList'

export default function Events() {
  return (
    <>
          <DashLayoutVenue
        title="Profile"
        description="View and manage your profile"
      >
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
            </div>
            <div className="profile-container">
                <EventList/>
            </div>
          </div>
        </div>
      </DashLayoutVenue>
    </>
  )
}
