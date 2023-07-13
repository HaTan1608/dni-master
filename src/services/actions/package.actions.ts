import { IAction } from "../interfaces/root.interfaces";
import packageTypes from "./types/package.types";

export const getListPackage = (params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_GET_LIST_PACKAGE,
    payload: { params },
  };
  return action;
};

export const getListBillPackage = (id?: any, params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_GET_LIST_BILL_PACKAGE,
    payload: { id, params },
  };
  return action;
};

export const createPackage = (params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_CREATE_PACKAGE,
    payload: { params },
  };
  return action;
};

export const changeStatusPackage = (params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_CHANGE_STATUS_PACKAGE,
    payload: { params },
  };
  return action;
};

export const changeStatusListDelivery = (params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_CHANGE_STATUS_LIST_DELIVERY,
    payload: { params },
  };
  return action;
};

export const changeStatusBillInDelivery = (id: any, params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_CHANGE_STATUS_BILL_IN_DELIVERY,
    payload: { id, params },
  };
  return action;
};

export const exportBillDelivery = (params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_EXPORT_BILL_DELIVERY,
    payload: { params },
  };
  return action;
};

export const exportListBill = (params?: any): IAction => {
  const action: IAction = {
    type: packageTypes.START_EXPORT_LIST_BILL,
    payload: { params },
  };
  return action;
};