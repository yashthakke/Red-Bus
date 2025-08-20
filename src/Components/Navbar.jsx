import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Navbar.css";
import { CompanyLogo } from "../Company/CompanyLogo";

export const Navbar = () => {
  const navigate = useNavigate();
  const authType = localStorage.getItem("authType"); 

  const logoUploaded = localStorage.getItem("true")



  const Managelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo Left */}
       

        {/* Toggle for mobile */}
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

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {/* Default Public Navbar */}
            {!authType && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/signup">Signup</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link custom-link" to="/Redbus">Booking Bus</Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/comp">Company Registration</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/login">Login</Link>
                </li>
              </>
            )}

            {/* User Navbar */}
            {authType === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/Redbus">Book a Bus</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/mybookings">My Bookings</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2 logout-btn" onClick={Managelogout}>
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Company Navbar */}
{authType === "Company" && (
  <>

   <Link className="navbar-brand d-flex align-items-center" to="/viewlogo">
          <CompanyLogo height="50px" />
          <span className="ms-2 fw-bold brand-text">BusBooking</span>
        </Link>
    { CompanyLogo.logoUploaded === "true"   ? (
      <li className="nav-item dropdown hover-dropdown">
        <span
          className="nav-link custom-link dropdown-toggle"
          data-bs-toggle="dropdown"
          role="button"
          aria-expanded="false"
        >
          Logo Management
        </span>
        <ul className="dropdown-menu dropdown-menu-dark">
          <li><Link className="dropdown-item" to="/view-logo">View Logo</Link></li>
          <li><a className="dropdown-item" href="/api/logo/download">Download Logo</a></li>
          <li><Link className="dropdown-item" to="/resize-logo">Resize Logo</Link></li>
          <li><Link className="dropdown-item" to="/update-logo">Update Logo</Link></li>
          <li><Link className="dropdown-item" to="/remove-logo">Remove Logo</Link></li>
        </ul>
      </li>
    ) : (
      <li className="nav-item">
        <Link className="nav-link custom-link" to="/uploadlogo">Upload Logo</Link>
      </li>
    )}

    <li className="nav-item">
      <Link className="nav-link custom-link" to="/addbus">Add Bus</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link custom-link" to="/viewbus">View Bus</Link>
    </li>
    <li className="nav-item">
      <button className="btn btn-danger ms-2 logout-btn" onClick={Managelogout}>
        Logout
      </button>
    </li>
  </>
)}


            {/* Admin Navbar */}
            {authType === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/manage-users">Manage Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/approve-companies">Approve Companies</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2 logout-btn" onClick={Managelogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};


/*

Signup done user 
OTP  and resend otp and   attemp  reset password 


*/