import React from "react";

const Cars = ({ rentedCars, carList, click }) => {
  if (rentedCars.length > 0) {
    rentedCars.map((car) => car);
  } else {
    return carList.map((car, index) => (
      <>
        {" "}
        <div className="container my-5" key={index}>
          <div className="row">
            <div className="col-6">
              <div className="card" style={{ width: "30rem" }}>
                <img src={car.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{car.maker + " " + car.name}</h5>
                  <h6>Price: {car.price}</h6>
                  <div className="car-btn">
                    <input
                      type="button"
                      onClick={() => click(car)}
                      className="btn btn-primary"
                      id="car-list-btn"
                      value="Rent Now"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ));
  }
};
export const CarList = ({
  rentedCars,
  carList,
  click,
  pickUpDate,
  returnDate,
}) => {
  // const cars = carList.map((car) => car);
  const rented = rentedCars.map((car) => car);

  return carList.map((car, index) => (
    <Cars carList={carList} rentedCars={rented} click={click} />
  ));
};
