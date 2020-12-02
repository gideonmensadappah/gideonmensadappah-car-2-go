import React, { useEffect, useState, useMemo } from "react";
import data from "../metadata/dummyData.json";

const style = {
  containerDiv: {
    marginTop: "50px",
    marginLeft: "10em",
  },
  buttoRemove: {
    color: "grey",
    marginRight: "auto !important",
  },
};
export const PaymentPage = (props) => {
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const carId = Number(props.match.params.carId);

    const carData = data.filter((car) => car.number === carId);
    setItem(carData);
  }, [props.match.params.carId]);

  function removeButton() {
    props.history.push("/");
  }

  function addToTotal(total) {
    const _count = count + 1;

    setCount(_count);
  }
  function reduceCount() {
    const _count = count - 1;
    setCount(_count);
  }

  useMemo(addToTotal, []);
  useMemo(reduceCount, []);

  function rentCar() {
    const total = item[0].price * count;
    props.history.push("/user/rent");
  }

  return (
    <React.Fragment>
      <div style={style.containerDiv} className="container">
        <div className="row">
          <div className="col-8">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Car name</th>
                  <th scope="col">Car Type</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {item.map((_item, index) => (
                  <React.Fragment key={_item.number}>
                    <tr key={_item.number}>
                      <th scope="row">
                        {" "}
                        <button className="btn" onClick={reduceCount}>
                          {" "}
                          <i
                            id="minus-count"
                            className="fa fa-minus-circle"
                          ></i>
                        </button>
                        {index + count}
                        <button
                          type="button"
                          onClick={() => addToTotal(_item.price)}
                          id="plus-count"
                          className="btn"
                        >
                          <i className="fa fa-plus-circle"></i>
                        </button>
                      </th>
                      <td>{_item.name}</td>
                      <td>{_item.type}</td>
                      <td>{_item.price}</td>
                      <td>
                        {" "}
                        {Number.parseFloat(_item.price * count).toFixed(1)}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={rentCar}>
              Rent Now
            </button>
            <button
              onClick={removeButton}
              className="btn "
              style={style.buttoRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
