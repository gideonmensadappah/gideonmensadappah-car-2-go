import React from "react";
import { connect } from "react-redux";
import { selectRentedCars } from "../../../reducers/rentals";
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

const RentedCars = ({ rentals }) => {
  console.log(rentals);
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

          {/* {rentedCars.length > 0 ? <CarsList cars={rentedCars} /> : null} */}
        </table>
      </div>
    </>
  );
};

const mapStateToProps = ({ rentals }) => {
  return { rentedCars: rentals };
};
export default connect(null, mapStateToProps)(RentedCars);
