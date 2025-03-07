import React from 'react'

export default function ClientWrapper() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH;
  return (
    <>
        {/* <!-- Client  --> */}
    <div className="clientWrap sectionWrap">
      <div className="container">
        <div id="logoSlider" className="owl-carousel owl-theme logo-slider">
          <div className="item">
            <img src={`${imagePath}company.png`} alt="Company 1" />
          </div>
          <div className="item">
            <img src={`${imagePath}company.png`} alt="Company 2" />
          </div>
          <div className="item">
            <img src={`${imagePath}company.png`} alt="Company 3" />
          </div>
          <div className="item">
            <img src={`${imagePath}company.png`} alt="Company 4" />
          </div>
          <div className="item">
            <img src={`${imagePath}company.png`} alt="Company 5" />
          </div>
          <div className="item">
            <img src={`${imagePath}company.png`} alt="Company 6" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
