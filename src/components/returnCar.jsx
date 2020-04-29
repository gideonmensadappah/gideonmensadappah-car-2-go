import React, { useMemo, useCallback, useState } from "react";
import { connect } from "react-redux";
import { returnCar, removeCustomer } from "../actions/action_types";
import * as css from "../components/returnCar.css";

const ReturnCarForm = ({
  carToReturn,
  rootReducer,
  removeCostumer,
  history,
}) => {
  const [carNumber, setCarNumber] = useState(null);
  const [fuel, setFuel] = useState("Empty");
  const [total, setTotal] = useState(0);
  const paymentBox = document.getElementById("payment-box");
  const formBox = document.getElementById("form-box");
  const handleClick = useCallback(() => {
    removeCostumer(parseInt(carNumber));
    carToReturn(parseInt(carNumber));
    history.push("/thank-you-user");
  }, [carNumber, carToReturn, removeCostumer, history]);

  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();

      if (!carNumber) {
        alert("Car Number Is Not Valid! (1)");
      } else {
        const car = rootReducer.filter(
          (car) => car.number === parseInt(carNumber)
        );
        if (car.length > 0) {
          if (fuel !== "Empty") {
            console.log(car);
            setTotal(car[0].price);
          } else if (fuel !== "Full") {
            console.log(car);
            setTotal(car[0].price + 30);
          }
          paymentBox.classList.remove("payment-div");
          formBox.classList.add("payment-div");
        } else {
          alert("Car Number is not found! (2)");
        }
      }
    },
    [carNumber, formBox, paymentBox, fuel, rootReducer]
  );

  const handleInputChange = useCallback(
    (event) => setCarNumber(event.target.value),
    []
  );

  const handleFuelChange = useCallback(
    (event) => setFuel(event.target.value),
    []
  );

  return (
    <div className="container-div">
      <div className="center-div">
        <div className="container-form">
          <form onSubmit={handleSubmitForm} id="form-box">
            <label>car number:</label> <br />
            <input onChange={handleInputChange} placeholder="number" />
            <div className="checkBox-div">
              <div className="form-group">
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    value="Full"
                    onChange={handleFuelChange}
                    type="checkbox"
                    id="fuel"
                  />
                  <label className="form-check-label" htmlFor="fuel">
                    Full Fuel
                  </label>
                </div>
              </div>
              <div className="form-group ml-3">
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    value="Empty"
                    onChange={handleFuelChange}
                    type="checkbox"
                    id="fuel-empty"
                  />
                  <label className="form-check-label" htmlFor="fuel">
                    Empty Fuel
                  </label>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="ml-2 btn btn-outline-primary btn-sm"
              value="Return"
            />
          </form>
          <div id="payment-box" className="payment-div">
            <span className="total-price ">The Price is: {total}</span>
            <input
              className="payment btn btn-primary ml-2"
              type="button"
              onClick={handleClick}
              value="Pay"
            />
          </div>
        </div>
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

const mapStateToProps = ({ rootReducer }) => {
  return { rootReducer };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReturnCarForm);
