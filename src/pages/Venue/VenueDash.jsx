import React, { useState } from "react";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import SearchBar from "../../components/Venue/SearchBar";

export default function VenueDash() {
  const [availability, setAvailability] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <>
      <DashLayoutVenue
        title="Venue Dashboard"
        description="View and manage your work"
      >
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
        </div>
        <PiqueFooter />
      </DashLayoutVenue>
    </>
  );
}
