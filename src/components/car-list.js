import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "30rem",
    height: "100vh",
    marginTop: "20px",
  },
  carBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export const CarList = ({ cars, click, pickUpDate, endDate }) => {
  return (
    <div style={styles.container}>
      {cars.map((car) => (
        <div key={car.number} className="card" style={styles.card}>
          <img src={car.image} className="card-img-top" alt="..." />
          <div style={styles.carBtn} className="card-body">
            <h5 className="card-title">{car.maker + " " + car.name}</h5>
            <h6>Price: {car.price} (Per Day)</h6>
            <input
              style={{
                width: "10rem",
              }}
              type="button"
              onClick={() => click(car)}
              className="btn btn-primary"
              id="car-list-btn"
              value="Rent Now"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
