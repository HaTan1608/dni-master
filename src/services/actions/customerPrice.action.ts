
import { IAction } from '../interfaces/root.interfaces';
import customerPriceTypes from './types/customerPrice.types';

export const getListCustomerPrice = (params?: any): IAction => {
  const action: IAction = {
    type: customerPriceTypes.START_GET_LIST_CUSTOMER_PRICE,
    payload: { params },
  }
  return action;
}

export const getCustomerPriceById = (id?: any): IAction => {
  const action: IAction = {
    type: customerPriceTypes.START_GET_LIST_CUSTOMER_PRICE_BY_ID,
    payload: { id },
  }
  return action;
}