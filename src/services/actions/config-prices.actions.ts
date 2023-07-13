import { IAction } from "../interfaces/root.interfaces";
import configPricesTypes from "./types/config-prices.types";

export const getListConfigPrices = (params?: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_GET_LIST_CONFIG_PRICES,
    payload: { params },
  };
  return action;
};

export const getConfigPricesById = (id?: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_GET_CONFIG_PRICES_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneConfigPrices = (id: string, params: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES,
    payload: { id, params },
  };
  return action;
};

export const createOneConfigPrices = (params: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_CREATE_ONE_CONFIG_PRICES,
    payload: { params },
  };
  return action;
};

export const updateOneConfigPricesDetails = (params: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES_DETAILS,
    payload: { params },
  };
  return action;
};
export const getListConfigPricesDetails = (params?: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_GET_LIST_CONFIG_PRICES_DETAILS,
    payload: { params },
  };
  return action;
};

export const createOneConfigPricesDetails = (params: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_CREATE_ONE_CONFIG_PRICES_DETAILS,
    payload: { params },
  };
  return action;
};

export const updateOneConfigPricesApplys = (params: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES_APPLYS,
    payload: { params },
  };
  return action;
};
export const getListConfigPricesApplys = (params?: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_GET_LIST_CONFIG_PRICES_APPLYS,
    payload: { params },
  };
  return action;
};

export const createOneConfigPricesApplys = (params: any): IAction => {
  const action: IAction = {
    type: configPricesTypes.START_CREATE_ONE_CONFIG_PRICES_APPLYS,
    payload: { params },
  };
  return action;
};
