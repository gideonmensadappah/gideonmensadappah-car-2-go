import React from "react";
import { useCallback } from "react";
import { connect } from "react-redux";
import { rent, addCustomer } from "../actions/action_types";
import { useMemo } from "react";
import queryString from "querystring";

const Rental = (props) => {
  const { addCustomer, rentCar, history, location } = props;
  const query = useMemo(
    () => queryString.parse(location.search.slice(1, location.search.length)),
    [location]
  );
  const { carNumber, rentalDate, returnDate, p } = query;

  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();

      const user = {
        //CHANGE TYPE FROM STRAIGHT MANIPULATION TO REACT WAY
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        carNumber: Number(carNumber),
        rentalDate: Number(rentalDate),
        returnDate: Number(returnDate),
        price: p,
      };

      addCustomer(user);
      rentCar(user.carNumber, user.rentalDate, user.returnDate);
      history.push("/thank-you-user");
    },
    [history, carNumber, rentalDate, p, returnDate, addCustomer, rentCar]
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

const mapDispatchToProps = (dispatch) => ({
  rentCar: (...payload) => dispatch(rent(...payload)),
  addCustomer: (payload) => dispatch(addCustomer(payload)),
});

export default connect(null, mapDispatchToProps)(Rental);
