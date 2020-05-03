import { v4 as uuidv4 } from "uuid";
export const ActionType = {
  ADD_CUSTOMER: "ADD_CUSTOMER",
  REMOVE_CUSTOMER: "REMOVE_CUSTOMER",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  RENT_CAR: "RENT_CAR",
  RETURN_CAR: "RETURN_CAR",
  ADD_NEW_CAR: "ADD_NEW_CAR",
  STORE_DATE: "STORE_DATE",
  REMOVE_DATE: "REMOVE_DATE",
};

export const storeDate = (payload) => ({
  type: ActionType.STORE_DATE,
  payload,
});
export const addCustomer = (
  id,
  name,
  email,
  phone,
  carNumber,
  startDate,
  endDate,
  p
) => ({
  type: ActionType.ADD_CUSTOMER,
  payload: {
    id,
    name,
    email,
    phone,
    carNumber,
    startDate,
    endDate,
    price: p,
  },
});
export const removeCustomer = (carNumber) => ({
  type: ActionType.REMOVE_CUSTOMER,
  id: carNumber,
});

export const rent = (id, pickUpDate, endDate) => ({
  type: ActionType.RENT_CAR,
  id,
  pickUpDate,
  endDate,
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
