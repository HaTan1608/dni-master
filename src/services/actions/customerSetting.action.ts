
import { IAction } from '../interfaces/root.interfaces';
import customerSettingTypes from './types/customerSetting.types';

export const getListCustomerSetting = (params?: any): IAction => {
  const action: IAction = {
    type: customerSettingTypes.START_GET_LIST_CUSTOMER_SETTING,
    payload: { params },
  }
  return action;
}

export const getCustomerSettingById = (id?: any): IAction => {
  const action: IAction = {
    type: customerSettingTypes.START_GET_CUSTOMER_SETTING_BY_ID,
    payload: { id },
  }
  return action;
}

export const updateOneCustomerSetting = (id: string, params: any): IAction => {
  const action: IAction = {
    type: customerSettingTypes.START_UPDATE_ONE_CUSTOMER_SETTING,
    payload: { id, params },
  }
  return action;
}

export const createCustomerSetting = (params: any): IAction => {
  const action: IAction = {
    type: customerSettingTypes.START_CREATE_CUSTOMER_SETTING,
    payload: { params },
  }
  return action;
}