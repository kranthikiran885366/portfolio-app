// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo / Brand */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          Portfolio
        </Link>
      </div>

      {/* Center Menu */}
      <div className="navbar-center">
        <ul>
          <li><Link to="/directory">Directory</Link></li>
          <li><Link to="/academy">Academy</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/market">Market</Link></li>
        </ul>
      </div>

      {/* Right Side Buttons */}
      <div className="navbar-right">
        <input type="text" placeholder="Search by Websites" className="search-input" />
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Sign Up</Link>
        <button className="btn black">Be Pro</button>
        <button className="btn white">Submit Website</button>
      </div>
    </nav>
  );
};

export default Navbar;
