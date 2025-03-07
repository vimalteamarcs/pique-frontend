import React from 'react'
import DashLayoutVenue from '../../components/Venue/DashLayoutVenue'
import SearchBar from '../../components/Venue/SearchBar'
import ProfileSidebar from '../../components/Venue/ProfileSidebar'
import WishlistItems from '../../components/Venue/WishlistItems'

export default function WishlistPage() {
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
              <WishlistItems />
            </div>
          </div>
        </div>
      </DashLayoutVenue>
    </>
  )
}
