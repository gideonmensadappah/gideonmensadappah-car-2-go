import React, { Component } from "react";
import { connect } from "react-redux";
import { login_success, login_failure } from "../actions/action_types";

class AuthCheck extends Component {
  constructor() {
    super();
    this.user = {
      name: "Admin@gmail.com",
      password: "123456",
    };
  }
  componentDidMount() {
    if (this.props.location.state.userName === this.user.name) {
      if (this.props.location.state.password === this.user.password) {
        this.props.login_success();

        this.props.history.push("/dashboard");
      }
    } else {
      this.props.login_failure();
      this.props.history.replace("/dashboard/login");
    }
  }
  render() {
    return <div>loading...</div>;
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state, ReducerAuth: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login_success: () => dispatch(login_success()),
    login_failure: () => dispatch(login_failure()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);
