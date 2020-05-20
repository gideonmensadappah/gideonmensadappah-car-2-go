import React from "react";
import { useCallback, useState } from "react";
import { connect } from "react-redux";
import { addCustomer } from "../actions/action_types";
import { rentCar } from "../reducers/rentals";
import { useMemo } from "react";
import queryString from "querystring";
import { v4 as uuidv4 } from "uuid";

const Rental = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);

  const { addCustomer, rentCar, history, location } = props;

  const query = useMemo(
    () => queryString.parse(location.search.slice(1, location.search.length)),
    [location]
  );
  const { carNumber, startDate, endDate, p } = query;
  const handleOnChangeName = useCallback(
    (event) => setName(event.target.value),
    []
  );
  const handleOnChangeEmail = useCallback(
    (event) => setEmail(event.target.value),
    []
  );
  const handleOnChangePhone = useCallback(
    (event) => setPhone(event.target.value),
    []
  );
  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();

      const userId = uuidv4();

      addCustomer(
        userId,
        name,
        email,
        phone,
        Number(carNumber),
        Number(startDate),
        Number(endDate),
        p
      );
      rentCar(userId, Number(carNumber), Number(startDate), Number(endDate));
      history.push("/thank-you-user");
    },
    [
      name,
      email,
      phone,
      history,
      carNumber,
      startDate,
      endDate,
      addCustomer,
      p,
      rentCar,
    ]
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
                  onChange={handleOnChangeName}
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
                  onChange={handleOnChangeEmail}
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
                  onChange={handleOnChangePhone}
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
  rentCar: (userId, carId, startDate, endDate) =>
    dispatch(rentCar(userId, carId, startDate, endDate)),
  addCustomer: (id, name, email, phone, carNumber, startDate, endDate, p) =>
    dispatch(
      addCustomer(id, name, email, phone, carNumber, startDate, endDate, p)
    ),
});

export default connect(null, mapDispatchToProps)(Rental);
