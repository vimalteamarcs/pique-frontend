import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PiqueNavbar from "../components/PiqueComponents/PiqueNavbar";
import PiqueFooter from "../components/PiqueComponents/PiqueFooter";
import EntertainerVenueSection from "../components/HomePage.jsx/EntertainerVenueSection";
import BannerSlider from "../components/HomePage.jsx/BannerSlider";
import HowItWorks from "../components/HomePage.jsx/HowItWorks";
import PerfectFit from "../components/HomePage.jsx/PerfectFit";
import ClientWrapper from "../components/HomePage.jsx/ClientWrapper";
import ServiceWrapper from "../components/HomePage.jsx/ServiceWrapper";
import RatedReviewed from "../components/HomePage.jsx/RatedReviewed";
import Testimonial from "../components/HomePage.jsx/Testimonial";
import ReadyWrap from "../components/HomePage.jsx/ReadyWrap";
import VenueDashNavbar from "../components/Venue/VenueDashNavbar";
import EnterDashNavbar from "../components/Entertainer/EnterDashNavbar";

export default function Home() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("role");

    if (storedUser) {
      setUserType(storedUser);
    } else {
      setUserType(null);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Pique Entertainment</title>
        <meta name="description" content="Welcome to our website." />
      </Helmet>
      <div className="container-fluid">
        <PiqueNavbar />
        <EntertainerVenueSection />
        <BannerSlider />
        <HowItWorks />
        <PerfectFit />
        <ClientWrapper />
        <ServiceWrapper />
        <RatedReviewed />
        <Testimonial />
        <ReadyWrap />
        <PiqueFooter />
      </div>
    </>
  );
}
