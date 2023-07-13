import { IAction } from "../interfaces/root.interfaces";
import configZonesTypes from "./types/config-zones.types";

export const getListConfigZones = (params?: any): IAction => {
  const action: IAction = {
    type: configZonesTypes.START_GET_LIST_CONFIG_ZONES,
    payload: { params },
  };
  return action;
};

export const getConfigZonesById = (id?: any): IAction => {
  const action: IAction = {
    type: configZonesTypes.START_GET_CONFIG_ZONES_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneConfigZones = (id: string, params: any): IAction => {
  const action: IAction = {
    type: configZonesTypes.START_UPDATE_ONE_CONFIG_ZONES,
    payload: { id, params },
  };
  return action;
};

export const createOneConfigZones = (params: any): IAction => {
  const action: IAction = {
    type: configZonesTypes.START_CREATE_ONE_CONFIG_ZONES,
    payload: { params },
  };
  return action;
};

export const updateOneConfigDetails = (params: any): IAction => {
  const action: IAction = {
    type: configZonesTypes.START_UPDATE_ONE_CONFIG_ZONES_DETAILS,
    payload: { params },
  };
  return action;
};
export const getListConfigZonesDetails = (params?: any): IAction => {
  const action: IAction = {
    type: configZonesTypes.START_GET_LIST_CONFIG_ZONES_DETAILS,
    payload: { params },
  };
  return action;
};
