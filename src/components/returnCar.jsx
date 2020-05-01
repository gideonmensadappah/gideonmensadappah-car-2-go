import React, { useMemo, useCallback, useState } from "react";
import { connect } from "react-redux";
import { returnCar, removeCustomer } from "../actions/action_types";
import * as css from "../components/returnCar.css";

const styles = {
  fine: {
    color: "red",
  },
};

const ReturnCarForm = ({
  carToReturn,
  cars,
  removeCustomer,
  customers,
  history,
}) => {
  const [carNumber, setCarNumber] = useState(null);
  const [fuel, setFuel] = useState("Empty");
  const [total, setTotal] = useState(0);
  const [fuelPrice, setFuelPrice] = useState(30.99);
  const paymentBox = document.getElementById("payment-box");
  const formBox = document.getElementById("form-box");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const handleClick = useCallback(() => {
    removeCustomer(parseInt(carNumber));
    carToReturn(parseInt(carNumber));
    history.push("/thank-you-user");
  }, [carNumber, carToReturn, removeCustomer, history]);

  const calculateTotalPrice = useCallback((user) => {
    const rentalDate = new Date(user.rentalDate);
    const returnDate = new Date(user.returnDate);
    const price = user.price;
    const res = Math.abs(rentalDate - returnDate) / 1000;
    let days = Math.floor(res / 86400);

    if (days === 0) {
      days = days + 1;
    }

    const totalAfterCalculation = price * days;

    setTotal(totalAfterCalculation);
  }, []);

  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();

      if (!carNumber) {
        alert("Car Number Is Not Valid!");
      } else {
        const customer = customers.filter(
          (customer) =>
            customer.carNumber === parseInt(carNumber) &&
            customer.phone === userPhoneNumber
        );

        if (customer.length === 0) {
          alert("we have no such car rented!");
        } else {
          const user = customer[0];

          calculateTotalPrice(user);
          if (customer.length > 0) {
            if (fuel === "Full") {
              setFuelPrice(0);
            } else if (fuel === "Empty") {
              const penaltyDueEmptyFuel = 30.99;
              setFuelPrice(penaltyDueEmptyFuel);
            }
            paymentBox.classList.remove("payment-div");
            formBox.classList.add("payment-div");
          } else {
            alert("Car Number is not found!");
          }
        }
      }
    },
    [
      carNumber,
      customers,
      userPhoneNumber,
      formBox,
      calculateTotalPrice,
      paymentBox,
      fuel,
    ]
  );

  const handleInputChangeCarNumber = useCallback((event) => {
    setCarNumber(event.target.value);
  }, []);

  const handleFuelChange = useCallback(
    (event) => setFuel(event.target.value),
    []
  );
  const handleInputChangeName = useCallback(
    (event) => setUserPhoneNumber(event.target.value),
    []
  );

  return (
    <div className="container-div">
      <div className="center-div">
        <div className="container-form">
          <form onSubmit={handleSubmitForm} id="form-box">
            <label>Phone Number:</label> <br />
            <input
              onChange={handleInputChangeName}
              placeholder="Phone Number "
            />
            <br />
            <label>Car Number:</label> <br />
            <input onChange={handleInputChangeCarNumber} placeholder="number" />
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
            <p>
              {fuelPrice !== 0 ? (
                <span style={styles.fine}>
                  Fine! Due Not Filling The Fuel: {fuelPrice}₪
                </span>
              ) : null}{" "}
              <br />
              <span className="total-price ">The Price is: {total}₪</span>
            </p>
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
    removeCustomer: (id) => dispatch(removeCustomer(id)),
  };
};

const mapStateToProps = ({ cars, customers }) => {
  return { customers, cars };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReturnCarForm);
