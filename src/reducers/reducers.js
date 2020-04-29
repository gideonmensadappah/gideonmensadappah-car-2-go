import { ActionType } from "../actions/action_types";
import storeState from "../metadata/dummyData.json";
import { createSelector } from "reselect";
import { combineReducers } from "redux";
import { CarList } from "../components/car-list";

const customersReducer = (state = [], action) => {
  switch (action.type) {
    case ActionType.ADD_CUSTOMER:
      return [...state, action.payload];
    case ActionType.REMOVE_CUSTOMER:
      const index = state.findIndex(
        (customer) => customer.carNumber === action.id
      );
      const newState = [...state.slice(0, index), ...state.slice(index + 1)];
      return newState;
    default:
      return state;
  }
};

const authState = {
  name: "Admin@gmail.com",
  password: "123456",
  isAuthenticated: false,
};
const authReducer = (state = authState, action) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ActionType.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const carsReducer = (state = storeState, action) => {
  switch (action.type) {
    case ActionType.RETURN_CAR:
      return state.map((car) => {
        if (car.number !== action.id) return car;

        return {
          ...car,
          rentedFrom: null,
          rentedUntil: null,
        };
      });
    case ActionType.RENT_CAR:
      return state.map((car) => {
        if (car.number !== action.id) return car;

        return Object.assign(
          {},
          {
            ...car,
            rentedFrom: action.pickUpDate,
            rentedUntil: action.returnDate,
          }
        );
      });

    case ActionType.ADD_NEW_CAR:
      return [...state, action.car];
    default:
      return state;
  }
};

const carsList = (storeState) => storeState.rootReducer;
export const compared = (carsList, rentedList) => {
  const notRentedCars = [];
  carsList.forEach((e1) =>
    rentedList.forEach((e2) => {
      if (e1.carNumber !== e2.carNumber) {
        if (
          e1.rentedFrom !== e2.rentedFrom &&
          e1.rentedUntil !== e2.rentedUntil
        ) {
          notRentedCars.push(e1);
        }
      }
    })
  );
  return notRentedCars;
};

export const selectRentedCars = createSelector(carsList, (cars) =>
  cars.filter((cars) => cars.rentedFrom !== null && cars.rentedUntil !== null)
);
export const carsInStock = createSelector(carsList, (cars) =>
  cars.filter((cars) => cars.rentedFrom === null && cars.rentedUntil === null)
);
export default combineReducers({
  cars: carsReducer,
  auth: authReducer,
  customers: customersReducer,
});
