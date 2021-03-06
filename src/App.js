import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../src/components/home";
import CarRent from "../src/components/car-rent";
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
import TopNav from "./components/topNav/topNav";
const styles = {
  RouteComponent: {
    marginTop: "5em",
  },
};
const ProtectedRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Route path="/dashboard" component={Dashboard} />;
  } else {
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
  const { isAuthenticated } = props.auth;

  return (
    <>
      <Router history={history}>
        <div className="header">
          <TopNav adminIsConnected={isAuthenticated} />
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
              <Route exact path="/rent-car" component={CarRent} />
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
              <ProtectedRoute isAuthenticated={isAuthenticated} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
