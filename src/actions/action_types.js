export const ActionType = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  RENT_CAR: "RENT_CAR",
  RETURN_CAR: "RETURN_CAR",
  ADD_NEW_CAR: "ADD_NEW_CAR",
};

export const rent = (id) => ({
  type: ActionType.RENT_CAR,
  id,
});
export const returnCar = (id) => ({
  type: ActionType.RETURN_CAR,
  id,
});
export const addNewCar = (car) => ({
  type: ActionType.ADD_NEW_CAR,
  car,
});
export const login_success = () => ({
  type: ActionType.LOGIN_SUCCESS,
});

export const login_failure = () => ({
  type: ActionType.LOGIN_FAILURE,
});
