import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";

const PerfectFit = () => {
  const imagePath = import.meta.env.VITE_IMAGE_PATH;
  return (
    <div className="perfectWrap">
      <lottie-player
        className="dotslottie"
        src={`${imagePath}Animation-1738578543085.json`}
        background="transparent"
        speed="1"
        style={{
          transform: "rotate(-90deg)",
          position: "absolute",
          zIndex: "-1",
          top: "-30%",
          height: "160%",
        }}
        loop
        autoplay
      ></lottie-player>
      <div className="container buildWrap">
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="perfectHead">
              <h2 className="heading">
                We are
                <span>
                  <lottie-player
                  src={`${imagePath}148006.json`}
                    background="transparent"
                    speed="1"
                    style={{
                      width: "140px",
                      display: "inline-block",
                      position: "relative",
                      top: "13px",
                    }}
                    loop
                    autoplay
                  ></lottie-player>
                </span>
                fit ......
              </h2>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="row buildshdwBox">
              <div className="col-md-4 col-12">
                <div className="buidBox">
                  <p>
                    Lorem Ipsum has been
                    <span className="dBlock">the industry's standard </span>
                    <span className="dBlock"> dummy text ever since</span>
                    <span className="dBlock"> the 1500s, when an </span>
                    <span className="dBlock">unknown printer took a</span>
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="buidBox">
                  <p>
                    Lorem Ipsum has been
                    <span className="dBlock">the industry's standard </span>
                    <span className="dBlock"> dummy text ever since</span>
                    <span className="dBlock"> the 1500s, when an </span>
                    <span className="dBlock">unknown printer took a</span>
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="buidBox nobder">
                  <p>
                    Lorem Ipsum has been
                    <span className="dBlock">the industry's standard </span>
                    <span className="dBlock"> dummy text ever since</span>
                    <span className="dBlock"> the 1500s, when an </span>
                    <span className="dBlock">unknown printer took a</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfectFit;
