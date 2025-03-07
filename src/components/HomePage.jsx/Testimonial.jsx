import React from 'react'

export default function Testimonial() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH
  return (
    <>
        {/* <!-- Testimonial --> */}
    <div className="testWrap sectionWrap pt-0">
      <div className="container">
        <div id="testimonialSlider" className="owl-carousel owl-theme">
          {/* <!-- Card 1 --> */}
          <div className="testimonial-card">
            <div className="row">
              <div className="col-md-6">
                <div className="testimonial-header">
                  <img
                    src={`${imagePath}testimonial.png`}
                    alt="testimonial"
                    className="testimg"
                  />
                  <div className="text-content">
                    <p className="name">Lorem Ipsum</p>
                    <p className="location">Lorem Ipsum, USA</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-end starBH">
                  <div className="stars">
                    <span className="dBlock colorBLACK">4.5</span> ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>

            <p className="testimonial-text">
              Lorem Ipsum is simply dummy text of the printing and typeset ting
              industry Lorem Ipsum is simply dummy text of the prin ting and
              typesetting industry
            </p>
          </div>

          {/* <!-- Card 2 --> */}
          <div className="testimonial-card">
            <div className="row">
              <div className="col-md-6">
                <div className="testimonial-header">
                  <img
                    src={`${imagePath}testimonial.png`}
                    alt="testimonial"
                    className="testimg"
                  />
                  <div className="text-content">
                    <p className="name">Lorem Ipsum</p>
                    <p className="location">Lorem Ipsum, USA</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-end starBH">
                  <div className="stars">
                    <span className="dBlock colorBLACK">4.5</span> ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>

            <p className="testimonial-text">
              Lorem Ipsum is simply dummy text of the printing and typeset ting
              industry Lorem Ipsum is simply dummy text of the prin ting and
              typesetting industry
            </p>
          </div>

          {/* <!-- Card 3 --> */}
          <div className="testimonial-card">
            <div className="row">
              <div className="col-md-6">
                <div className="testimonial-header">
                  <img
                    src={`${imagePath}testimonial.png`}
                    alt="testimonial"
                    className="testimg"
                  />
                  <div className="text-content">
                    <p className="name">Lorem Ipsum</p>
                    <p className="location">Lorem Ipsum, USA</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-end starBH">
                  <div className="stars">
                    <span className="dBlock colorBLACK">4.5</span> ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>

            <p className="testimonial-text">
              Lorem Ipsum is simply dummy text of the printing and typeset ting
              industry Lorem Ipsum is simply dummy text of the prin ting and
              typesetting industry
            </p>
          </div>

          {/* <!-- Card 4 --> */}
          <div className="testimonial-card">
            <div className="row">
              <div className="col-md-6">
                <div className="testimonial-header">
                  <img
                    src={`${imagePath}testimonial.png`}
                    alt="testimonial"
                    className="testimg"
                  />
                  <div className="text-content">
                    <p className="name">Lorem Ipsum</p>
                    <p className="location">Lorem Ipsum, USA</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-end starBH">
                  <div className="stars">
                    <span className="dBlock colorBLACK">4.5</span> ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>

            <p className="testimonial-text">
              Lorem Ipsum is simply dummy text of the printing and typeset ting
              industry Lorem Ipsum is simply dummy text of the prin ting and
              typesetting industry
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
