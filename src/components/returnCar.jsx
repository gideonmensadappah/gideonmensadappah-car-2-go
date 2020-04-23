import React, { Component, useCallback } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { returnCar } from "../actions/action_types";

const ReturnCarForm = ({ carToReturn, cars, history }) => {
  const [carNumber, setCarNumber] = useState(null);
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      carToReturn(parseInt(carNumber));
      history.push("/");
    },
    [carNumber, carToReturn, history]
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
  };
};
export default connect(null, mapDispatchToProps)(ReturnCarForm);
