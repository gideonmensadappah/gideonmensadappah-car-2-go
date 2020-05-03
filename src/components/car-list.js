import React from "react";

export const CarList = ({ cars, click, pickUpDate, endDate }) => {
  return (
    <>
      {cars.map((car) => (
        <div className="container my-5" key={car.number}>
          <div className="row">
            <div className="col-6">
              <div className="card" style={{ width: "30rem" }}>
                <img src={car.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{car.maker + " " + car.name}</h5>
                  <h6>Price: {car.price} (Per Day)</h6>
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
      ))}
    </>
  );
};
