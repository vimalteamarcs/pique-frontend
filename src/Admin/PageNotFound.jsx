import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      PageNotFound
      <br />
      <br />
      <Link to="/admin">Go to Home</Link>
      <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
