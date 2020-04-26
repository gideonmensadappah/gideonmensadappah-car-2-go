import React from "react";
import { useCallback } from "react";
import { connect } from "react-redux";
import { rent, addCostomer } from "../actions/action_types";

const Rental = (props) => {
  const { AuthReducer } = props.state;
  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();
      const carNumber = props.history.location.state.number;
      const user = {
        //CHANGE TYPE FROM STRAIGHT MANIPULATION TO REACT WAY
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        carNumber: carNumber,
      };

      props.addCostomer(user);
      props.rentCar(carNumber);
      props.history.push("/thank-you-user");
    },
    [props]
  );
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <form onSubmit={handleSubmitForm}>
              <div className="form-group">
                <label htmlFor="name">Name </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="phone"> Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Rent
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => ({
  rentCar: (carNumber) => dispatch(rent(carNumber)),
  addCostomer: (payload) => dispatch(addCostomer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
