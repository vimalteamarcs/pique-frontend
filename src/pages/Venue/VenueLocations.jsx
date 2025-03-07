import React from 'react'
import DashLayoutEnter from '../../components/Entertainer/DashLayoutEnter'
import EnterAccountSidebar from '../../components/Entertainer/EnterAccountSidebar'
import DashLayoutVenue from '../../components/Venue/DashLayoutVenue'
import SearchBar from '../../components/Venue/SearchBar'
import ProfileSidebar from '../../components/Venue/ProfileSidebar'

export default function VenueLocations() {
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
            </div>
            </div>
            </DashLayoutVenue>
    </>
  )
}
