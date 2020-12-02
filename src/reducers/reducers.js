import { ActionType } from "../actions/action_types";
import storeState from "../metadata/dummyData.json";
import { createSelector } from "reselect";
import { combineReducers } from "redux";
import { CarList } from "../components/car-list";
import rentalsReducer, * as rented from "./rentals";
import { persistStore, persisReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

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
    case ActionType.ADD_NEW_CAR:
      return [...state, action.car];
    default:
      return state;
  }
};

export default combineReducers({
  rentals: rentalsReducer,
  cars: carsReducer,
  auth: authReducer,
  customers: customersReducer,
});

export const selectRentedCars = (state) =>
  rented.selectRentedList(state.rentals);
export const selectCarsList = (state) => state.cars;

const checkIsRented = (car) => {
  let flag = true;
  selectRentedCars.forEach((rental) => {
    if (rental.carId === car.number) {
      flag = true;
    }
  });
  return flag;
};

export const selectRentedLists = (state) =>
  createSelector(selectCarsList, selectRentedCars, (areRented, cars) => {
    cars.filter((car) => {
      const isRented = checkIsRented(car);
      return car && isRented;
    });
  });
