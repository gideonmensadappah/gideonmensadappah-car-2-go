import React from "react";
import { connect } from "react-redux";
import { selectRentedCars } from "../../../reducers/reducers";
const styls = { image: { width: "3em" } };
const RentedCarsList = ({ cars }) => {
  return (
    <>
      <div className="col-8">
        <table class="table">
          <thead class="thead-light">
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
          <tbody>
            {cars.map((car) => (
              <tr>
                <>
                  <th scope="row">
                    <img alt="" src={car.image} style={styls.image} />
                  </th>
                  <td>{car.name}</td>
                  <td>{car.maker}</td>
                  <td>{car.number}</td>
                  <td>{car.price}</td>
                  <td>{car.type}</td>
                  <td>{car.kms}</td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const RentedCars = ({ rentedCars }) => {
  console.log(rentedCars);
  return <RentedCarsList cars={rentedCars} />;
};

const mapStateToProps = (state) => {
  return { rentedCars: selectRentedCars(state) };
};
export default connect(mapStateToProps)(RentedCars);
