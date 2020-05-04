import React, { useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login_failure } from "../../actions/action_types";
const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100 /* Behind the navbar */,
    padding: "48px 0 0" /* Height of navbar */,
    boxShadow: "inset -1px 0 0 rgba(0, 0, 0, .1)",
  },

  sidebarSsticky: {
    position: "relative",
    top: 0,
    height: "calc(100vh - 48px)",
    paddingtop: ".5rem",
    overflowX: "hidden",
    overflowY:
      "auto" /* Scrollable contents if viewport is shorter than content. */,
  },
};
const SideNav = ({ handleLogOut }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {" "}
          <nav
            className="col-md-2 d-none d-md-block bg-light"
            style={styles.sidebar}
          >
            <div className="sidebar-sticky mt-4" style={styles.sidebarSsticky}>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard">
                    <span data-feather="home"></span>
                    Dashboard <span className="sr-only">(current)</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/inventory">
                    <span data-feather="shopping-cart"></span>
                    Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/customers">
                    <span data-feather="users"></span>
                    Customers
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={handleLogOut}
                  >
                    <span className="navbar-toggler-icon"> logOut</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default withRouter(SideNav);
