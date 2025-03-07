import React from 'react'
import { Helmet } from 'react-helmet-async'
import LoggedInNavbar from '../components/LoggedInNavbar'
import PiqueFooter from '../components/PiqueComponents/PiqueFooter'

export default function StatusVerification() {
  return (
    <>
            <Helmet>
                    <title>Profile Status</title>
                    <meta
                      name="description"
                      content="Verify your status whether it is active or pending."
                    />
                  </Helmet>
                
                <div className="container-fluid">
                  <div className="row mb-3"><LoggedInNavbar/></div>
                 
                  <div className="row">
                  <div className="alert alert-warning text-center">
                  Your account is pending. Please verify your status from Admin.
                </div>
    
                  </div>
                     
                </div>
                <PiqueFooter/>
            </>
  )
}
