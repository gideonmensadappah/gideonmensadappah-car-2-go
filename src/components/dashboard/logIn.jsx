import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class LogIn extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });
  handleSubmit = (event) => {
    event.preventDefault();
    const { AuthReducer } = this.props;
    console.log(this.state);
    if (AuthReducer.name !== this.state.userName) {
      alert("Email Is Not Correct!");
    } else if (AuthReducer.password !== this.state.password) {
      alert("Password Is Not Correct!");
    } else {
      this.props.history.push({
        pathname: "/authcheck",
        state: this.state,
      });
    }

    //jwt web token//
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
const mapStateToProps = ({ AuthReducer }) => {
  return { AuthReducer };
};
export default connect(mapStateToProps)(withRouter(LogIn));
