import React from "react";
import PiqueFooter from "./PiqueFooter";

const LayoutWithFooter = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">{children}</div>
      <PiqueFooter />
    </div>
  );
};

export default LayoutWithFooter;
