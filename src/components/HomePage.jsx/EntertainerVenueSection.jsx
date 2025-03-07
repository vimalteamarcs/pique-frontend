import React, { useEffect } from "react";

export default function EntertainerVenueSection() {
  useEffect(() => {
    const container = document.querySelector(".visonWrap");
    if (!container) return; // Prevent errors if the element doesn't exist

    const box1 = document.querySelector(".aboutUser1");
    const box2 = document.querySelector(".aboutUser2");

    function handleClick(event) {
      if (event.target.closest(".aboutUser2")) {
        box1.classList.toggle("aboutUser2");
        box1.classList.toggle("aboutUser1");
        box2.classList.toggle("aboutUser1");
        box2.classList.toggle("aboutUser2");
      }
    }

    container.addEventListener("click", handleClick);

    return () => container.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    function fixAboutUser() {
      const box1 = document.querySelector(".aboutUser1");
      const box2 = document.querySelector(".aboutUser2");
      if (!box1 || !box2) return;

      const box1Height = box1.offsetHeight;
      const box2Height = box2.offsetHeight;
      const lessHeight = Math.min(box1Height, box2Height);

      box2.style.marginTop = `-${lessHeight}px`;
    }

    fixAboutUser();
  }, []);

  const imagePath = import.meta.env.VITE_IMAGE_PATH;
  return (
    <div className="enterWrap container">
    <div className="row enterMargn position-relative">

      {/* <!-- For Entertainers --> */}
      <div className="col-md-12 visonWrap">
        <div className="aboutUser aboutUser1 enterMain" id="box1">
          <div className="row borderBH align-items-md-center">
            <div className="col-md-6 order-2 order-md-1">
              <div className="enterTXT">
                <p className="paraTXT">Pique Entertainment For Venue</p>
                <p className="paraTXT">
                  Lorem Ipsum has been the industry's <br />standard dummy
                  text ever since the <br />
                  1500s, when an unknown printer took <br />
                  a galley of type and scrambled it to
                </p>

                <a href="#" className="btn myBTNBB me-3 mb-2">
                  View <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
            <div className="col-md-6 order-1 order-md-2 ps-0 position-relative">
              <img
                src={`${imagePath}venue-icon.png`}
                alt="venue-icon"
                className="img-fluid venuiconBH a4"
              />
              <div className="enterImg">
                <h3 className="heading a3">For Venues</h3>
                <img
                  src={`${imagePath}fireboX.gif`}
                  alt="fireboX"
                  className="img-fluid fireIMG"
                />
                <img
                  src={`${imagePath}venue.png`}
                  alt="venue"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="aboutUser aboutUser2 enterMain" id="box2">
          <div className="row borderBH align-items-md-center">
            <div className="col-md-6 order-2 order-md-1">
              <div className="enterTXT">
                <p className="paraTXT">
                  Pique Entertainment For Entertainers
                </p>
                <p className="paraTXT">
                  Lorem Ipsum has been the industry's <br />standard dummy
                  text ever since the <br />
                  1500s, when an unknown printer took <br />
                  a galley of type and scrambled it to
                </p>

                <a href="#" className="btn myBTNBB me-3 mb-2">
                  View <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
            <div className="col-md-6 order-1 order-md-2 ps-0 position-relative">
              <img
                src={`${imagePath}entertainers-icon.png`}
                alt="venue-icon"
                className="img-fluid venuiconBH"
              />
              <div className="enterImg">
                <h3 className="heading a2">For Entertainers</h3>
                <img
                  src={`${imagePath}fireboX.gif`}
                  alt="fireboX"
                  className="img-fluid fireIMG"
                />
                <img
                  src={`${imagePath}enterprise.png`}
                  alt="enterprise"
                  className="img-fluid"
                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
