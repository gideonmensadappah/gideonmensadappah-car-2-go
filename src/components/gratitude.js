import React, { Component } from "react";

export default class Gratitude extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/");
    }, 2000);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Car2Go</h1>
                <p className="lead">Thank You For Using Our Servies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
