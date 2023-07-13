
import { IAction } from '../interfaces/root.interfaces';
import masterDataTypes from './types/masterData.types';

export const getListProvince = (params?: any): IAction => {
  const action: IAction = {
    type: masterDataTypes.START_GET_LIST_PROVINCE,
    payload: { params },
  }
  return action;
}

export const getListDistrict = (params?: any): IAction => {
  const action: IAction = {
    type: masterDataTypes.START_GET_LIST_DISTRICT,
    payload: { params },
  }
  return action;
}

export const getListWard = (params?: any): IAction => {
  const action: IAction = {
    type: masterDataTypes.START_GET_LIST_WARD,
    payload: { params },
  }
  return action;
}

export const getListRole = (params?: any): IAction => {
  const action: IAction = {
    type: masterDataTypes.START_GET_LIST_ROLE,
    payload: { params },
  }
  return action;
}

export const getListBank = (params?: any): IAction => {
  const action: IAction = {
    type: masterDataTypes.START_GET_LIST_BANK,
    payload: { params },
  }
  return action;
}

export const getListBranchBank = (params?: any): IAction => {
  const action: IAction = {
    type: masterDataTypes.START_GET_LIST_BRANCH_BANK,
    payload: { params },
  }
  return action;
}

