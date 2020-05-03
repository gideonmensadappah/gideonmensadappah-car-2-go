import { ActionType } from "../actions/action_types";
import { v4 as uuidv4 } from "uuid";
import { createSelector } from "reselect";
export const rentCar = (userId, carId, startDate, endDate) => ({
  type: ActionType.RENT_CAR,
  payload: {
    id: uuidv4(),
    userId,
    carId,
    startDate,
    endDate,
  },
});
export const returnCar = (id) => ({
  type: ActionType.RETURN_CAR,
  id,
});

const rentalsReducer = (state = [], action) => {
  switch (action.type) {
    case ActionType.RENT_CAR:
      return [...state, action.payload];
    case ActionType.RETURN_CAR:
      return state.filter((rental) => rental.userId !== action.id);
    default:
      return state;
  }
};

const getRentedCarsState = (rentalsReducer) => rentalsReducer;
export const selectRentedCars = createSelector(getRentedCarsState, (cars) => {
  console.log(cars);
  cars.filter((car) => car);
});

export default rentalsReducer;
