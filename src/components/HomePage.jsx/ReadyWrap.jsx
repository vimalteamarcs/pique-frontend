import React from 'react'
import { Link } from 'react-router-dom'

export default function ReadyWrap() {
  const imagePath = import.meta.env.VITE_IMAGE_PATH
  return (
    <>
        {/* <!-- Ready to get started? --> */}
    <div className="readyWrap sectionWrap">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-12">
            <div className="row text-center">
              <div className="col-md-12">
                <div className="readyTXT">
                  <h4 className="headings">Ready to get started?</h4>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <div className="enterTXT">
                  <h6 className="heading trns1">Book an Entertainer</h6>
                  <Link to="#" className="btn myBTN oR rounded-pill">
                    <span className="clicdiv"> Click Here</span>
                    <span className="animdiv">
                      <img
                        src={`${imagePath}btnanimation.gif`}
                        alt="btnanimation"
                        className="anmBTN"
                      />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-md-6 text-start">
                <div className="venuTXT">
                  <h6 className="heading trns2">Find a Venues</h6>
                  <Link to="#" className="btn myBTN rounded-pill">
                    <span className="animdiv1">
                      <img
                        src={`${imagePath}btnanimation.gif`}
                        alt="btnanimation"
                        className="anmBTN"
                      />
                    </span>
                    <span className="clicdiv1"> Click Here</span>
                  </Link>
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
