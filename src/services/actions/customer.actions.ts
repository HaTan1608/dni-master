import { IAction } from "../interfaces/root.interfaces";
import customerTypes from "./types/customer.types";

export const getListCustomer = (params?: any): IAction => {
  const action: IAction = {
    type: customerTypes.START_GET_LIST_CUSTOMER,
    payload: { params },
  };
  return action;
};
export const getListCustomerGroup = (params?: any): IAction => {
  const action: IAction = {
    type: customerTypes.START_GET_CUSTOMER_GROUP,
    payload: { params },
  };
  return action;
};

export const getCustomerById = (id?: any): IAction => {
  const action: IAction = {
    type: customerTypes.START_GET_CUSTOMER_BY_ID,
    payload: { id },
  };
  return action;
};

export const genCodeCustomerById = (id?: any): IAction => {
  const action: IAction = {
    type: customerTypes.START_GEN_CODE_CUSTOMER_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneCustomer = (id: string, params: any): IAction => {
  const action: IAction = {
    type: customerTypes.START_UPDATE_ONE_CUSTOMER,
    payload: { id, params },
  };
  return action;
};

export const createOneCustomer = (params: any): IAction => {
  const action: IAction = {
    type: customerTypes.START_CREATE_ONE_CUSTOMER,
    payload: { params },
  };
  return action;
};
export const importFileCustomer = (params: any): IAction => {
  const action: IAction = {
    type: customerTypes.START_IMPORT_FILE,
    payload: { params },
  };
  return action;
};
