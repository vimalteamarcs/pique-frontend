import React from "react";

export default function HowItWorks() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH;
  return (
    <div className="weworkWrap">
      <div className="container">
        <h4 className="heading">
          How It
          <span className="colrRed"> Works</span>
        </h4>
        <div className="row how-it-works">
          {/* <!-- Left Box --> */}
          <div className="col-md-6 leftWrapper">
            <img
              src={`${imagePath}orangeBG.png`}
              alt="orangeBG"
              className="orangebgImage"
            />
            <div className="box">
              <div className="icon-container">
                <img
                  src={`${imagePath}venue-icon.png`}
                  alt="venue"
                  style={{height: "60px"}}
                /><span className="ms-2">For Venues </span>
              </div>
              <ul className="timeline">
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
              </ul>
            </div>
          </div>

          {/* <!-- Right Box --> */}
          <div className="col-md-6 rightWrapper">
            <img src={`${imagePath}blueBG.png`} alt="blueBG" className="bluebgImage" />
            <div className="box right-box text-end">
              <div className="icon-container">
                For Entertainers<span className="ms-2"
                  ><img
                  src={`${imagePath}entertainers-icon.png`}
                    alt="enterprise"
                    style={{height: "60px"}}
                /></span>
              </div>
              <ul className="timeline">
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
                <li className="timeline-item">
                  <span className="paraTxt"
                    >Lorem Ipsum dummy text lorem ipsum</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
