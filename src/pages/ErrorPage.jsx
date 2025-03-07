import React from 'react'
import PiqueNavbar from '../components/PiqueComponents/PiqueNavbar'
import PiqueFooter from '../components/PiqueComponents/PiqueFooter'

export default function ErrorPage() {
  return (
    <>
      <PiqueNavbar />
      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between">
        <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
          <video
            src="assets/images/404error.mp4" style={{ height: "300px" }}
            autoPlay
            loop
            muted
          />
        </div>
        <PiqueFooter />
      </div>
    </>
  )
}
