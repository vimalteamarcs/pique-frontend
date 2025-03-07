import React from "react";

export default function PiqueFooter({ collapsed }) {
  return (
    <div className={`footerWrap sectionWrap ${collapsed ? "collapsed" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {/* Center Text */}
            <div className="text-content">
              <h4>Lorem Ipsum</h4>
              <p>
                Lorem Ipsum has been the <br />
                industry's standard dummy <br />
                text since the 1500s.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3 info-section">
                <h4>Lorem Ipsum</h4>
                <ul>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                </ul>
              </div>
              <div className="col-md-3 info-section">
                <h4>Lorem Ipsum</h4>
                <ul>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                </ul>
              </div>
              <div className="col-md-3 info-section">
                <h4>Lorem Ipsum</h4>
                <ul>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                </ul>
              </div>
              <div className="col-md-3 info-section">
                <h4>Lorem Ipsum</h4>
                <ul>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
