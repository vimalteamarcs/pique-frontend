import axios from "axios";
import {   ALL_VENUE } from "../constants/constants";

const token = localStorage.getItem("token");

async function getAllVenueApi() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URI}${ALL_VENUE}`;
  
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get the Users");
  }
}



export {getAllVenueApi };
