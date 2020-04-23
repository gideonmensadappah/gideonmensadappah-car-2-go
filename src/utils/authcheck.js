import React, { Component } from "react";
import history from "./history/history";
import { connect } from "react-redux";
import { login_success, login_failure } from "../actions/action_types";

class AuthCheck extends Component {
  componentDidMount() {
    console.log(this.props.auth.isAuthenticated());
    if (this.props.auth.isAuthenticated()) {
      this.props.login_success();
      history.push("/");
    } else {
      this.props.login_failure();
      history.replace("/");
    }
  }
  render() {
    return <div></div>;
  }
}
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login_success: () => dispatch(login_success()),
    login_failure: () => dispatch(login_failure()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);
