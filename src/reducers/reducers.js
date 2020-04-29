import { ActionType } from "../actions/action_types";
import storeState from "../metadata/dummyData.json";
import { createSelector } from "reselect";
import { combineReducers } from "redux";
import { CarList } from "../components/car-list";

const costumersReducer = (state = [], action) => {
  switch (action.type) {
    case ActionType.ADD_COSTOMER:
      return [...state, action.payload];
    case ActionType.REMOVE_COSTOMER:
      const index = state.findIndex(
        (costumer) => costumer.carNumber === action.id
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
  is_Authanticated: false,
};
const authReducer = (state = authState, action) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        is_Authanticated: true,
      };
    case ActionType.LOGIN_FAILURE:
      return {
        ...state,
        is_Authanticated: false,
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
          rentedTill: null,
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
            rentedTill: action.returnDate,
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
          e1.rentedTill !== e2.rentedTill
        ) {
          notRentedCars.push(e1);
        }
      }
    })
  );
  return notRentedCars;
};

export const selectRentedCars = createSelector(carsList, (cars) =>
  cars.filter((cars) => cars.rentedFrom !== null && cars.rentedTill !== null)
);
export const carsInStock = createSelector(carsList, (cars) =>
  cars.filter((cars) => cars.rentedFrom === null && cars.rentedTill === null)
);
export default combineReducers({
  cars: carsReducer,
  auth: authReducer,
  costumers: costumersReducer,
});
