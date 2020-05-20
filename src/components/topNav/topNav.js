import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopNav = (props) => {
  const [isConnected, setIsConnected] = useState(Boolean);
  const { adminIsConnected } = props;
  useEffect(() => {
    setIsConnected(adminIsConnected);
  }, [adminIsConnected]);

  return isConnected ? null : (
    <nav className="navbar navbar-expand-lg bg-inverse  fixed-top navbar-light bg-light">
      <div className="navbar-header">
        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div
        className="collapse navbar-collapse navbar-toggleable-xs"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/return-car">
              Return car
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/logIn">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
