import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import Home from "../src/components/home";
import CarRent from "../src/components/car-rent";
import CarDetail from "../src/components/carDetail";
import { PaymentPage } from "./components/paymentPage";
import Rental from "./components/rentalPage";
import ReturnCar from "./components/returnCar";
import LogIn from "./components/dashboard/logIn";
import Dashboard from "./components/dashboard/dashboard-profile";
import { Callback } from "./utils/callback/callback";
import AuthCheck from "./utils/authcheck";
import Auth from "./utils/auth";
import history from "./utils/history/history";

const styles = {
  nav: {
    marginRight: "5em",
  },
};
const ProtectedRoute = (props) => {
  const { is_Authanticated } = props.props;

  if (is_Authanticated === true) {
    return <Route path="/dashboard" component={Dashboard} />;
  } else if (is_Authanticated === false) {
    history.replace("/");
    return <Route path="/" component={Home} />;
  }
};
export const auth = new Auth();
const handleAuthentication = (props) => {
  if (true) {
    auth.handleAuth();
  }
};
function App(props) {
  const { AuthReducer } = props.state;
  return (
    <Router history={history}>
      <div className="header">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Car2GO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav>
            <Nav style={styles.nav}>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/return-car">Return car</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/dashboard/login">Dashboard</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/rent" component={Rental} />
          <Route path="/return-car" component={ReturnCar} />
          <Route
            path="/dashboard/logIn"
            exact
            render={(props) => <LogIn auth={auth} />}
          />
          <Route exact path="/rent-car/:type/:size" component={CarRent} />
          <Route path="/car2go-payment/:carId" component={PaymentPage} />
          <Route
            path="/callback"
            render={(props) => {
              handleAuthentication(props);
              return <Callback history={history} />;
            }}
          />
          <Route
            path="/authcheck"
            props={props.AuthReducer}
            component={AuthCheck}
          />
          <ProtectedRoute props={AuthReducer} />
          {/* <Route path="/car-detail/:carNumber" component={CarDetail} /> */}
        </Switch>
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(App);
