import React from 'react'

export default function RatedReviewed() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH
  return (
    <>
        {/* <!-- Rated & Reviewed! --> */}
    <div className="ratedWrap sectionWrap pt-0">
      <div className="container">
        <div className="row align-items-md-center">
          <div className="col-md-6">
            <div className="ratedTXT">
              <h4 className="heading">
                <span className="dBlock">Rated & </span>
                <span className="colrRed">Reviewed</span>!
              </h4>
              <p className="paraTXT">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.It has survived
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="ratedIMG position-relative">
              <img
                src={`${imagePath}animationstar.gif`}
                alt="animationstar"
                className="img-fluid anmitIMG"
                style={{width:"250px"}}
              />
              <img src={`${imagePath}rated.gif`} alt="rated" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
