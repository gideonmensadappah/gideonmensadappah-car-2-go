import { ActionType } from "../actions/action_types";
import storeState from "../metadata/dummyData.json";
import { createSelector } from "reselect";
import { combineReducers } from "redux";
const authState = {
  name: "Admin@gmail.com",
  password: "123456",
  is_Authanticated: false,
};
const AuthReducer = (state = authState, action) => {
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

const rootReducer = (state = storeState, action) => {
  switch (action.type) {
    case ActionType.RETURN_CAR:
      return state.map((car) => {
        if (car.number !== action.id) return car;

        return {
          ...car,
          rented: false,
        };
      });
    case ActionType.RENT_CAR:
      return state.map((car) => {
        if (car.number !== action.id) return car;

        return {
          ...car,
          rented: true,
        };
      });

    case ActionType.ADD_NEW_CAR:
      return [...state, action.car];
    default:
      return state;
  }
};
const carsList = (storeState) => storeState.rootReducer;
export const selectRentedCars = createSelector(carsList, (cars) =>
  cars.filter((cars) => cars.rented === true)
);

export const carsInStock = createSelector(carsList, (cars) =>
  cars.filter((cars) => cars.rented === false)
);
export default combineReducers({
  rootReducer,
  AuthReducer,
});
