import React from 'react'
import EnterDashNavbar from './EnterDashNavbar'
import { Helmet } from 'react-helmet-async'
import EnterSubNavbar from './EnterSubNavbar'

export default function DashLayoutEnter({ title, description, children }) {
  return (
    <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            {/* <div className="container-xxl position-relative bg-light d-flex p-0">
                <EnterDashSidebar /> */}
                <div className="content">
                    <EnterDashNavbar />
                    <EnterSubNavbar/>
                    {children}
                </div>
            {/* </div> */}
        </>
  )
}
