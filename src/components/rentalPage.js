import React from "react";
import { useCallback } from "react";
import { connect } from "react-redux";
import { rent, addCostomer, store_date } from "../actions/action_types";

const Rental = (props) => {
  const { rentalDate } = props.location.state;
  const { returnDate } = props.location.state;
  const { AuthReducer } = props.state;

  const rentalDateTimeStemp = new Date(rentalDate);
  const returnDateTimeStemp = new Date(returnDate);

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
        rentalDate: rentalDateTimeStemp.getTime(),
        returnDate: returnDateTimeStemp.getTime(),
      };
      console.log(user.carNumber, user.rentalDate, user.returnDate);

      props.addCostomer(user);
      props.rentCar(user.carNumber, user.rentalDate, user.returnDate);
      props.storeDate(user.carNumber, user.rentalDate, user.returnDate);
      props.history.push("/thank-you-user");
    },
    [props, returnDateTimeStemp, rentalDateTimeStemp]
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
  rentCar: (...payload) => dispatch(rent(...payload)),
  addCostomer: (payload) => dispatch(addCostomer(payload)),
  storeDate: (...payload) => dispatch(store_date(...payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
