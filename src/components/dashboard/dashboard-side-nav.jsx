import React from "react";
import { withRouter, Link } from "react-router-dom";

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
const SideNav = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {" "}
          <nav
            className="col-md-2 d-none d-md-block bg-light"
            style={styles.sidebar}
          >
            <div className="sidebar-sticky" style={styles.sidebarSsticky}>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard">
                    <span data-feather="home"></span>
                    Dashboard <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/rented-cars">
                    <span data-feather="file"></span>
                    Rented Cars
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
                  <Link className="nav-link" to="/dashboard/report">
                    <span data-feather="bar-chart-2"></span>
                    Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    <span data-feather="home"></span>
                    Logout
                  </Link>
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
