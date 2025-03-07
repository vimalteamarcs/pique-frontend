import React from 'react'

export default function LoggedInUserNavbar() {
    function logout() {

        localStorage.clear();
        document.querySelector('.btn-close').click();
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
        else {
            navigate('/login');
        }

    }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand text-primary fw-bold" href="/">Pique</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              </ul>
              <ul className='navbar-nav ms-auto'>
              <li className="nav-item">
                <a className="nav-link text-danger fw-semibold" href='' onClick={logout}>
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href='/profile' >
                  Profile
                </a>
              </li>

            
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
