
import { IAction } from '../interfaces/root.interfaces';
import customerAddressTypes from './types/customerAddress.types';

export const getListCustomerAddress = (params?: any): IAction => {
  const action: IAction = {
    type: customerAddressTypes.START_GET_LIST_CUSTOMER_ADDRESS,
    payload: { params },
  }
  return action;
}

export const getCustomerAddressById = (id?: any): IAction => {
  const action: IAction = {
    type: customerAddressTypes.START_GET_CUSTOMER_ADDRESS_BY_ID,
    payload: { id },
  }
  return action;
}

export const updateOneCustomerAddress = (id: string, params: any): IAction => {
  const action: IAction = {
    type: customerAddressTypes.START_UPDATE_ONE_CUSTOMER_ADDRESS,
    payload: { id, params },
  }
  return action;
}

export const createOneCustomerAddress = (params: any): IAction => {
  const action: IAction = {
    type: customerAddressTypes.START_CREATE_ONE_CUSTOMER_ADDRESS,
    payload: { params },
  }
  return action;
}