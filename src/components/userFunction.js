import data from "../metadata/dummyData.json";

const rent = (rentedCar) => {
  rentedCar["rent"] = true;
  return rentedCar;
};

export const rentCar = (car) => {
  const rentedCar = data.filter((cars) => cars.number === car.number);
  const rented = rentedCar[0];
  const _rented = rent(rented);
  return _rented;
};
