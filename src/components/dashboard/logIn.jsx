import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login_success } from "../../actions/action_types";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }
  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    const { ReducerAuth } = this.props;
    if (ReducerAuth.name !== this.state.userName) {
      alert("Email Is Not Correct!");
    } else if (ReducerAuth.password !== this.state.password) {
      alert("Password Is Not Correct!");
    } else {
      this.props.history.push({
        pathname: "/authcheck",
        state: this.state,
      });
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={this.handleChange}
                  name="userName"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { ReducerAuth: auth };
};

export default withRouter(connect(mapStateToProps)(LogIn));
