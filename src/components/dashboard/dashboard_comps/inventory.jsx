import React, { useCallback } from "react";
// import { carsInStock } from "../../../reducers/reducers";
import { connect } from "react-redux";
const styles = { image: { width: "3em" } };
const CarsList = ({ cars }) => {
  return (
    <>
      {cars.map((car, i) => (
        <tr className="table table-dark" key={i}>
          <th scope="row">
            <img alt="" src={car.image} style={styles.image} />
          </th>
          <td>{car.name}</td>
          <td>{car.maker}</td>
          <td>{car.number}</td>
          <td>{car.price}</td>
          <td>{car.type}</td>
          <td>{car.kms}</td>
          <td>{car.year}</td>
        </tr>
      ))}
    </>
  );
};

const Inventory = ({ carsInStock, history }) => {
  const handleClick = useCallback(() => {
    history.push("/dashboard/new-car");
  }, [history]);

  return (
    <>
      <div className="col-8">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Maker</th>
              <th scope="col">Number</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Kms</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody className="table table-dark">
            {carsInStock.length > 0 ? <CarsList cars={carsInStock} /> : null}
          </tbody>
        </table>
        <div className="ml-auto">
          <input
            className="btn btn-primary mt-3 ml-auto"
            type="button"
            onClick={handleClick}
            value="add new car"
          />
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ cars }) => {
  return { carsInStock: cars };
};
export default connect(mapStateToProps)(Inventory);
