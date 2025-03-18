import React from 'react'

export default function EntertainerListFooter() {
    const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  return (
    <>
    <div className="container">
    <div className="row mt-5 mb-0">
      <div className="col-md-4">
        <p className="fw-semibold fs-3 section-title">What We Do</p>
      </div>
      <div className="col-md-8">
        <p className="custom-para-text">
          Our goal is to entertain, educate, and engage our audiences. We have
          found that the best way to do that is to include them. We ask
          questions, encourage them to sing along, and have a friendly rapport
          during our programs.
        </p>
        <p className="custom-para-text">
          Whether it's music, lecture, or a presentation, one of the best ways
          to keep the audience engaged is to encourage them to participate as
          well.We have even incorporated some of their personal stories into
          our programs.
        </p>
      </div>
    </div>
    </div>

      {/* <!-- Footer --> */}
  <div className="container-fluid bg-searchbar p-5 mt-5">
    {/* <div className="container"> */}
      <div className="row align-items-center">
        {/* <!-- Left Side --> */}
        <div className="col-md-6">
          <img src={`${imagePath}newLogo.png`} style={{height: "30px"}} />
          <p className="mb-0 fw-semibold">Lorem Ipsum Sample Dummy</p>
          <p className="fw-semibold">Text For Your Reference</p>

          {/* <!-- Social Media Icons --> */}
          <div className="d-flex gap-2">
            <a href="#" className="btn btn-outline-dark custom-icon p-2">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="btn btn-outline-dark custom-icon p-2">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="#" className="btn btn-outline-dark custom-icon p-2">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* <!-- Right Side --> */}
        <div className="col-md-6 text-center">
          <p className="fw-semibold ms-5 mb-1">Get The App</p>
          <div className="d-flex justify-content-end gap-3">
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
  {/* <div className="bg-dark text-center text-white py-4"></div> */}
  {/* <!-- footer end --> */}
    </>
  )
}
