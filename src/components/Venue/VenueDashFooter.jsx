import React from 'react'

export default function VenueDashFooter() {
    const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  return (
    <>
          {/* <!-- Footer --> */}
  <div className="container-fluid bg-footer p-5 mt-5">
    {/* <div className="container"> */}
      <div className="row align-items-center">
        {/* <!-- Left Side --> */}
        <div className="col-md-6">
          <img src={`${imagePath}newLogo.png`} style={{height: "32px"}} />
          <p className="mb-0 fw-semibold custom-para-text">Lorem Ipsum Sample Dummy</p>
          <p className="fw-semibold custom-para-text">Text For Your Reference</p>

          {/* <!-- Social Media Icons --> */}
          <div className="d-flex gap-2">
            {/* <a href="#" className="btn btn-outline-dark custom-icon p-2">
              <i className="fa-brands fa-facebook-f"></i>
            </a> */}
            <img src={`${imagePath}facebookFooter.svg`} style={{height:"44px", width:"45px"}}/>
            <img src={`${imagePath}linkedinFooter.svg`} style={{height:"44px", width:"45px"}}/>
            <img src={`${imagePath}instaFooter.svg`} style={{height:"44px", width:"45px"}}/>

            {/* <a href="#" className="btn btn-outline-dark custom-icon p-2">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="#" className="btn btn-outline-dark custom-icon p-2">
              <i className="fa-brands fa-instagram"></i>
            </a> */}
          </div>
        </div>

        {/* <!-- Right Side --> */}
        <div className="col-md-6 text-center">
          <p className="fw-semibold text-center custom-para-text ms-5 mb-2">Get The App</p>
          <div className="d-flex justify-content-end me-4 gap-3">
            <a href="#" className="btn btn-outline-dark d-flex align-items-center px-3 py-2 rounded-5">
              <i className="fa-brands fa-apple fs-3 me-2"></i>
              <div className="text-start">
                <p className="custom-icon-font mb-0" style={{fontSize: "10px"}}>
                  Download on the
                </p>
                <p className="mb-0 fw-bold" style={{fontSize: "13px"}}>App Store</p>
              </div>
            </a>

            <a href="#" className="btn btn-outline-dark d-flex align-items-center px-3 py-2 rounded-5">
              <i className="fa-brands fa-google-play fs-3 me-2"></i>
              <div className="text-start">
                <p className="custom-icon-font mb-0" style={{fontSize: "10px"}}>
                  Get it on
                </p>
                <p className="mb-0 fw-bold" style={{fontSize: "13px"}}>
                  Google Play
                </p>
              </div>
            </a>
          </div>
        </div>
      {/* </div> */}
    </div>
  </div>
  {/* <!-- Dark Footer Bar --> */}
  <div className="bg-dark text-center text-white py-4"></div>
  {/* <!-- footer end --> */}
    </>
  )
}
