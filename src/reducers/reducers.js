import { ActionType } from "../actions/action_types";
import storeState from "../metadata/dummyData.json";

import { combineReducers } from "redux";
const authState = {
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

export default combineReducers({
  rootReducer,
  AuthReducer,
});
