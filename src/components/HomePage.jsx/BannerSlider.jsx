import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BannerSlider() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH;
  const images = [
    "./assets/pique/image/bannerperson.png",
    "./assets/pique/image/bannerperson1.png",
    "./assets/pique/image/bannerperson2.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sliderWrapper">
      <div className="container">
        <div className="row align-items-center bannerBoxBG">
          <div className="col-md-12 col-12">
            <div className="dashboard-banner position-relative">
              {/* <!-- Background Image --> */}
              <img
                src={`${imagePath}homeBanner.png`}
                alt="dashboardImage"
                className="img-fluid w-100"
              />
              <div className="row">
                <div className="col-md-4">
                  <div className="rightSide">
                    <h3 className="heading">
                      Are you looking to <br />
                      book an Entertainer
                    </h3>
                    <Link to="#" className="btn myBTN oR rounded-pill">
                      Click Here
                      <span>
                        <img
                          src={`${imagePath}btnanimation.gif`}
                          alt="btnanimation"
                          className="anmBTN"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="slideImage">
                    <img
                      id="changingImage"
                      src={images[currentImageIndex]}
                      alt="bannerperson"
                      className="img-fluid personBH"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="leftSide">
                    <h3 className="heading">
                      Are you an <br />
                      Entertainer?
                    </h3>
                    <Link to="#" className="btn myBTN rounded-pill">
                      <span>
                        <img
                          src={`${imagePath}btnanimation.gif`}
                          alt="btnanimation"
                          className="anmBTN"
                        />
                      </span>
                      Click Here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
