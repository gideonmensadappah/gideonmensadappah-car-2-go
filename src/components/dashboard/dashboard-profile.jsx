import React, { useCallback } from "react";
import { connect } from "react-redux";
import SideNav from "./dashboard-side-nav";
import { login_failure } from "../../actions/action_types";
import RentedCars from "./dashboard_comps/rented_cars";
import Inventory from "./dashboard_comps/inventory";
import Customers from "./dashboard_comps/customers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewCar from "../dashboard/add-New-Car";
import DashboardProfile from "./dashboard_comps/dashboardProfile";
const styles = {
  container: {
    marginLeft: "13em",
  },
};
const Dashboard = (props) => {
  const { logOut, history } = props;

  const handleLogOut = useCallback(() => {
    logOut();
    history.push("/");
  }, [history, logOut]);

  return (
    <Router>
      <SideNav handleLogOut={handleLogOut} />

      <div className="container" style={styles.container}>
        <div className="row">
          <Switch>
            <Route exact path="/dashboard" component={DashboardProfile} />
            <Route exact path="/dashboard/rented-cars" component={RentedCars} />
            <Route exact path="/dashboard/inventory" component={Inventory} />
            <Route exact path="/dashboard/customers" component={Customers} />
            <Route exact path="/dashboard/new-car" component={AddNewCar} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(login_failure()),
  };
};
export default connect(null, mapDispatchToProps)(Dashboard);
