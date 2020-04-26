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
import Gratitude from "./components/gratitude";

const styles = {
  RouteComponent: {
    marginTop: "5em",
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
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
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
        <div style={styles.RouteComponent}>
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
            <Route path="/thank-you-user" component={Gratitude} />
            <Route
              path="/authcheck"
              props={props.AuthReducer}
              component={AuthCheck}
            />
            <ProtectedRoute props={AuthReducer} />

            {/* <Route path="/car-detail/:carNumber" component={CarDetail} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(App);
