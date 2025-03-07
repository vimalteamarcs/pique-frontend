import React from 'react'
import DashLayoutEnter from '../../components/Entertainer/DashLayoutEnter'

export default function EntertainerDash() {
    const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  return (
        <>
           <DashLayoutEnter title="Entertainer Dashboard" description="View and manage your data">
           <div className="container mt-4">
        <div className="row gx-5">
            <div className=" col-md-3 profile-data">
                <img src={`${imagePath}magician-showing-trick.png`} style={{height: "314px"}}/>
                <h4 className="mt-3 fw-semibold mb-1">Magic Wonders</h4>
                <p className="fs-6">By James Williams</p>
                <p className="dash-font">Lorem Ipsum is simply dummy text of the print and typesetting industry. Lorem Ipsum
                    has been the
                    industry's standard dummy text ever since the 1500s,</p>
                <a href="#" className="btn enter-btn text-decoration-none text-white w-100 mb-3"><i
                        className="fa-solid fa-pen-to-square me-2"></i>Edit Details</a>
            </div>
            <div className=" col-md-5 charts">
                <div className="row p-1">
                    <div className="col-md-6 earned-dollars pt-2">
                        <div className="d-flex justify-content-between">
                            <div className="details">
                                <p className="profile-font fw-semibold mb-0">Earned Dollars</p>
                                <p className="icon-font">Earnings this month</p>
                                <p className="chart-font fw-semibold mt-4 mb-0">$1000</p>

                            </div>
                            <div className="dollar-img">
                                <img src={`${imagePath}dollarIcon.svg`}/>
                                <p></p>
                                <p className="percent-font mt-5 mb-0"><i className="fa-solid fa-arrow-up"></i>27%</p>
                            </div>
                        </div>



                    </div>
                    <div className="col-md-6 earned-dollars pt-2">
                        <div className="d-flex justify-content-between">
                            <div className="details">
                                <p className="profile-font fw-semibold mb-0">Leads</p>
                                <p className="icon-font">Leads this month</p>
                                <p className="chart-font fw-semibold mt-4 mb-0">27</p>

                            </div>
                            <div className="dollar-img">
                                <img src={`${imagePath}leadsIcon.svg`}/>
                                <p></p>
                                <p className="percent-font mt-5 mb-0"><i className="fa-solid fa-arrow-up"></i>17%</p>
                            </div>
                        </div>



                    </div>
                </div>
                <div className="row mt-1 p-1">
                    <div className="col-md-6 earned-dollars pt-2">
                        <div className="d-flex justify-content-between">
                            <div className="details">
                                <p className="profile-font fw-semibold mb-0">Bookings</p>
                                <p className="icon-font">Requests this month</p>
                                <p className="chart-font fw-semibold mt-4 mb-0">12</p>
                            </div>
                            <div className="dollar-img">
                                <img src={`${imagePath}savedIcon.svg`}/>
                                <p></p>
                                <p className="percent-font mt-5 mb-0"><i className="fa-solid fa-arrow-up"></i>27%</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 earned-dollars pt-2">
                        <div className="d-flex justify-content-between">
                            <div className="details">
                                <p className="profile-font fw-semibold mb-0">Bookings Closed</p>
                                <p className="icon-font">Events this month</p>
                                <p className="chart-font fw-semibold mt-4 mb-0">45</p>

                            </div>
                            <div className="dollar-img">
                                <img src={`${imagePath}closedBookingIcon.svg`}/>
                                <p></p>
                                <p className="percent-font mt-5 mb-0"><i className="fa-solid fa-arrow-up"></i>27%</p>
                            </div>
                        </div>



                    </div>
                </div>

                <div className="row booking-request-table mt-2 p-1">
                    <div className="d-flex justify-content-between">
                        <p className="profile-font fw-semibold">New Booking Requests</p>
                    <a href="#" className="profile-font">View All<i className="fa-solid fa-chevron-right"></i><i className="fa-solid fa-chevron-right"></i></a>
                    </div>
                    
                   <table className="table table-responsive mb-4">
                    <thead className="profile-font">
                        <tr>
                            <th>Venue</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="profile-font">
                        <tr>
                            <td>R.S.Gardens</td>
                            <td>California, USA</td>
                            <td>14-JAN-2025</td>
                            <td>
                              <a href="#" className="btn btn-outline-secondary btn-sm">
                                  <i className="fa-solid fa-eye"></i>
                              </a>
                          </td>
                        </tr>
                        <tr>
                            <td>R.S.Gardens</td>
                            <td>California, USA</td>
                            <td>14-JAN-2025</td>
                            <td>
                              <a href="#" className="btn btn-outline-secondary btn-sm">
                                  <i className="fa-solid fa-eye"></i>
                              </a>
                          </td>
                        </tr>
                        <tr>
                            <td>R.S.Gardens</td>
                            <td>California, USA</td>
                            <td>14-JAN-2025</td>
                            <td>
                              <a href="#" className="btn btn-outline-secondary btn-sm">
                                  <i className="fa-solid fa-eye"></i>
                              </a>
                          </td>
                        </tr>
                       

                        </tbody>

                   </table>
                </div>
            </div>
            <div className="col-md-4 upcoming-events mb-2">
                <div className="d-flex justify-content-between">
                    <p className="profile-font fw-semibold">Upcoming Events</p>
                <a href="#" className="profile-font">View All<i className="fa-solid fa-chevron-right"></i><i className="fa-solid fa-chevron-right"></i></a>
                </div>
                <div className="row p-2">
                    <div className="col-md-3">
                        <img src={`${imagePath}profilePic.avif`} style={{height:" 62px", width: "73px", borderRadius: "6px"}}/>
                    </div>
                    <div className="col-md-9">
                        <p className="dash-font fw-semibold mb-0">The Majestic Downtown</p>
                        <p className="icon-font mb-1">Lorem ipsum sample dummy text qwerty uio jhg</p>
                        <div className="d-flex">
                            <p className="icon-font text-start me-3"><img src={`${imagePath}Icon akar-calendar.svg`} className="me-1"/>12-February-2025</p>
                        <p className="icon-font"><img src={`${imagePath}Icon akar-location.svg`} className="me-1"/>Amsterdam</p>
                        </div>
                        
                    </div>
                </div>
                <hr className="mt-0"/>

                <div className="row p-2 gx-5">
                    <div className="col-md-3">
                        <img src={`${imagePath}profilePic.avif`} style={{height: "62px", width: "73px", borderRadius: "6px"}}/>
                    </div>
                    <div className="col-md-9">
                        <p className="dash-font fw-semibold mb-0">The Majestic Downtown</p>
                        <p className="icon-font mb-1">Lorem ipsum sample dummy text qwerty uio jhg</p>
                        <div className="d-flex">
                            <p className="icon-font text-start me-3"><img src={`${imagePath}Icon akar-calendar.svg`} className="me-1"/>12-February-2025</p>
                        <p className="icon-font"><img src={`${imagePath}Icon akar-location.svg`} className="me-1"/>Amsterdam</p>
                        </div>
                        
                    </div>
                </div>
                <hr className="mt-0"/>

                <div className="row p-2 gx-5">
                    <div className="col-md-3">
                        <img src={`${imagePath}profilePic.avif`} style={{height: "62px", width: "73px", borderRadius: "6px"}}/>
                    </div>
                    <div className="col-md-9">
                        <p className="dash-font fw-semibold mb-0">The Majestic Downtown</p>
                        <p className="icon-font mb-1">Lorem ipsum sample dummy text qwerty uio jhg </p>
                        <div className="d-flex">
                            <p className="icon-font text-start me-3"><img src={`${imagePath}Icon akar-calendar.svg`} className="me-1"/>12-February-2025</p>
                        <p className="icon-font"><img src={`${imagePath}Icon akar-location.svg`} className="me-1"/>Amsterdam</p>
                        </div>
                        
                    </div>
                </div>
                <hr className="mt-0 "/>

                <div className="row p-2 gx-5">
                    <div className="col-md-3">
                        <img src={`${imagePath}profilePic.avif`} style={{height: "62px", width: "73px", borderRadius: "6px"}}/>
                    </div>
                    <div className="col-md-9">
                        <p className="dash-font fw-semibold mb-0">The Majestic Downtown</p>
                        <p className="icon-font mb-1">Lorem ipsum sample dummy text qwerty uio jhg</p>
                        <div className="d-flex">
                            <p className="icon-font text-start me-3"><img src={`${imagePath}Icon akar-calendar.svg`} className="me-1"/>12-February-2025</p>
                        <p className="icon-font"><img src={`${imagePath}Icon akar-location.svg`} className="me-1"/>Amsterdam</p>
                        </div>
                        
                    </div>
                </div>

                        
                    </div>
                </div>
            </div>
            
            </DashLayoutEnter>
        </>
    )
}
