import React, { Component, useCallback } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { returnCar, removeCustomer } from "../actions/action_types";

const ReturnCarForm = ({ carToReturn, removeCostumer, cars, history }) => {
  const [carNumber, setCarNumber] = useState(null);
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      removeCostumer(parseInt(carNumber));
      carToReturn(parseInt(carNumber));
      history.push("/thank-you-user");
    },
    [carNumber, removeCostumer, carToReturn, history]
  );
  const handleInputChange = useCallback(
    (event) => setCarNumber(event.target.value),
    []
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>car number:</label> <br />
        <input onChange={handleInputChange} placeholder="number" />
        <input type="submit" value="RETURN" />
      </form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    carToReturn: (id) => dispatch(returnCar(id)),
    removeCostumer: (id) => dispatch(removeCustomer(id)),
  };
};
export default connect(null, mapDispatchToProps)(ReturnCarForm);
