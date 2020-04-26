import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import SideNav from "./dashboard-side-nav";
import { login_failure } from "../../actions/action_types";
import RentedCars from "./dashboard_comps/rented_cars";
import Inventory from "./dashboard_comps/inventory";
import Customers from "./dashboard_comps/customers";
import { selectRentedCars } from "../../reducers/reducers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewCar from "../dashboard/add-New-Car";

const styles = {
  container: {
    marginLeft: "13em",
  },
};
const Dashboard = ({ logOut }) => {
  return (
    <Router>
      <SideNav logOut={logOut} />
      <div className="container" style={styles.container}>
        <div className="row">
          <Switch>
            <Route path="/dashboard/rented-cars" component={RentedCars} />
            <Route path="/dashboard/inventory" component={Inventory} />
            <Route path="/dashboard/customers" component={Customers} />
            <Route path="/dashboard/new-car" component={AddNewCar} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (storeState) => {
  return {
    rentedCars: selectRentedCars(storeState),
  };
};

export default connect(mapStateToProps)(Dashboard);
