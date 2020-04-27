import React, { Component, useCallback } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { returnCar, removeCustomer } from "../actions/action_types";
import * as css from "../components/returnCar.css";

const ReturnCarForm = ({
  carToReturn,
  removeCostumer,
  rootReducer,
  history,
}) => {
  const [carNumber, setCarNumber] = useState(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (parseInt(carNumber) !== rootReducer.number) {
        alert("Car Number Is Not Valid!");
      } else {
        removeCostumer(parseInt(carNumber));
        carToReturn(parseInt(carNumber));
        history.push("/thank-you-user");
      }
    },
    [carNumber, rootReducer.number, removeCostumer, carToReturn, history]
  );
  const handleInputChange = useCallback(
    (event) => setCarNumber(event.target.value),
    []
  );

  return (
    <div className="container-div">
      <div className="center-div">
        <form onSubmit={handleSubmit}>
          <div className="container-form">
            <label>car number:</label> <br />
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="number"
            />
            <input
              type="submit"
              className="ml-2 mt-3 btn btn-outline-primary btn-sm"
              value="RETURN"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    carToReturn: (id) => dispatch(returnCar(id)),
    removeCostumer: (id) => dispatch(removeCustomer(id)),
  };
};
const mapStateToProps = (state) => {
  const { rootReducer } = state;
  return { rootReducer };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReturnCarForm);
