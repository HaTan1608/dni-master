import { IAction } from "../interfaces/root.interfaces";
import ordersTypes from "./types/orders.types";

export const getListOrders = (params?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_GET_LIST_ORDERS,
    payload: { params },
  };
  return action;
};

export const getOrdersById = (id?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_GET_ORDERS_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneOrders = (id: string, params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_UPDATE_ONE_ORDERS,
    payload: { id, params },
  };
  return action;
};

export const createOneOrders = (params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_CREATE_ONE_ORDERS,
    payload: { params },
  };
  return action;
};

export const changeStatusBills = (params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_CHANGE_STATUS_BILLS,
    payload: { params },
  };
  return action;
};

export const createOrderByFile = (params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_CREATE_ORDERS_BY_FILE,
    payload: { params },
  };
  return action;
};

export const createOrderArrayByFile = (params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_CREATE_ORDERS_ARRAY_BY_FILE,
    payload: { params },
  };
  return action;
};

export const getListDeliveryBill = (params?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_GET_LIST_DELIVERY_BILL,
    payload: { params },
  };
  return action;
};

export const getDeliveryBillById = (id?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_GET_DELIVERY_BILL_BY_ID,
    payload: { id },
  };
  return action;
};

export const createOneDeliveryBill = (params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_CREATE_DELIVERY_BILL,
    payload: { params },
  };
  return action;
};

export const updateOneDeliveryBill = (id?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_UPDATE_DELIVERY_BILL,
    payload: { id },
  };
  return action;
};
export const getListOfDebt = (params?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_GET_LIST_OF_DEBT,
    payload: { params },
  };
  return action;
};
export const createPakageDebtList = (params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_CREATE_LIST_OF_DEBT,
    payload: { params },
  };
  return action;
};
export const getPakageDebtList = (params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_GET_PAKAGE_DEBT_LIST,
    payload: { params },
  };
  return action;
};
export const getPakageDebtListById = (id?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_GET_PAKAGE_DEBT_LIST_BY_ID,
    payload: { id },
  };
  return action;
};
export const completePakageDebtList = (params?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_COMPLETE_PAKAGE_DEBT_LIST,
    payload: { params },
  };
  return action;
};
export const deleteOrCompletePakageDebtList = (id: string, params: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_COMPLETE_OR_DELETE_PAKAGE_DEBT_LIST_BY_ID,
    payload: { id,params },
  };
  return action;
};
export const getExportPakageDebtList = (params?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_EXPORT_EXCEL_PACKAGE_DEBT_LIST,
    payload: { params },
  };
  return action;
};
export const getExportPakageDebtListDetail = (params?: any): IAction => {
  const action: IAction = {
    type: ordersTypes.START_EXPORT_EXCEL_PACKAGE_DEBT_LIST_DETAIL,
    payload: { params },
  };
  return action;
};