import React from 'react'

export default function ServiceWrapper() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH
  return (
    <>
        {/* <!-- Service  --> */}
    <div className="serviceWrap">
      <div className="container">
        <div className="text-center">
          <h4 className="heading">Services</h4>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-1 col-12">
            <div className="row justify-content-md-center">
              {/* <!-- Left Column --> */}
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="serviceBox">
                      <img
                        src={`${imagePath}service2.png`}
                        alt="service"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 cardHover1">
                    <div className="card serviceBox mb-0 blueBH">
                      <div className="card-body">
                        <p className="paraTXT">
                          Lorem Ipsum has been the industry's standard dummy
                          text ever since Lorem Ipsum
                        </p>
                        <img
                          src={`${imagePath}service1.png`}
                          alt="service"
                          style={{marginTop: "20px"}}
                          className="img-fluid imgserv"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Center Column --> */}
              <div className="col-md-4">
                <div className="serviceBox">
                  <img
                    src={`${imagePath}service3.png`}
                    alt="service"
                    className="img-fluid"
                  />
                </div>
              </div>
              {/* <!-- Right Column --> */}
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-12 cardHover">
                    <div className="card serviceBox Red">
                      <div className="card-body">
                        <span className="iconBH"
                          ><i className="fa-solid fa-gears"></i
                        ></span>
                        <p className="paraTXT">
                          Lorem Ipsum has been the industry's standard dummy
                          text ever since the 1500s, when an unknown printer
                          took a galley of type and scrambled it to make a type
                          specimen book.It has survived
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 cardHover2">
                    <div className="card serviceBox blue mb-0">
                      <div className="card-body">
                        <span className="iconBH"><i className="fa-solid fa-gears"></i></span>
                        <p className="paraTXT">
                          Lorem Ipsum has been the industry's standard dummy
                          text ever since the 1500s, when an unknown printer
                          took a galley of type and scrambled it to make a type
                          specimen book.It has survived
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
