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
export const SideNav = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {" "}
          <nav
            class="col-md-2 d-none d-md-block bg-light"
            style={styles.sidebar}
          >
            <div class="sidebar-sticky" style={styles.sidebarSsticky}>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <Link class="nav-link active" href="#">
                    <span data-feather="home"></span>
                    Dashboard <span class="sr-only">(current)</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">
                    <span data-feather="file"></span>
                    Orders
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">
                    <span data-feather="shopping-cart"></span>
                    Products
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">
                    <span data-feather="users"></span>
                    Customers
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">
                    <span data-feather="bar-chart-2"></span>
                    Reports
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">
                    <span data-feather="layers"></span>
                    Integrations
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
