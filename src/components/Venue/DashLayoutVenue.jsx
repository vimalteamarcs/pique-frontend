import React from 'react'
import VenueDashSidebar from './VenueDashSidebar'
import VenueDashNavbar from './VenueDashNavbar'
import { Helmet } from 'react-helmet-async'

export default function DashLayoutVenue({ title, description, children }) {
  return (
    <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            {/* <div className=" p-0"> */}
                {/* <VenueDashSidebar /> */}
                {/* <div className="container-fluid"> */}
                    <VenueDashNavbar/>
                    {children}
                {/* </div> */}
            {/* </div> */}
        </>
  )
}
