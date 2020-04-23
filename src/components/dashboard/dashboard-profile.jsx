import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import SideNav from "./dashboard-side-nav";
import { login_failure } from "../../actions/action_types";
const styles = {};
const Dashboard = (props) => {
  return (
    <div>
      <SideNav logOut={props.logOut} />
      <h1>hello</h1>
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return { storeState };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(login_failure),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
