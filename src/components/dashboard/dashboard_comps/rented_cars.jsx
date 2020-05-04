import React from "react";
import { connect } from "react-redux";
import {
  selectRentedCars,
  selectCarsList,
  selectRentedLists,
} from "../../../reducers/reducers";
const styles = { image: { width: "3em" } };
const CarsList = ({ cars }) => {
  return (
    <>
      <tbody>
        {cars.map((car, i) => (
          <tr key={i}>
            <>
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
            </>
          </tr>
        ))}
      </tbody>
    </>
  );
};

const RentedCars = (props) => {
  console.log(props);
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

          {/* {rentals.length > 0 ? <CarsList cars={rentals} /> : null} */}
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    state,
    rentals: selectRentedCars(state),
    cars: selectCarsList(state),
    rentedList: selectRentedLists(state),
  };
};
export default connect(mapStateToProps)(RentedCars);
