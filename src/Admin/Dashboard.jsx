import React from "react";
import DashLayout from "./DashLayout";

export default function Dashboard() {
  return (
    <>
      <DashLayout
        children={
          <div className="container">
            <div className="row">
              <div className="col"><h1>home</h1></div>
            </div>
            
          </div>
        }
      />
    </>
  );
}
