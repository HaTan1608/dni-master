import shopeTypes from './types/shop.types';
import { IAction } from '../interfaces/root.interfaces';

export const getListShop = (params?: any): IAction => {
  const action: IAction = {
    type: shopeTypes.START_GET_LIST_SHOP,
    payload: { params },
  }
  return action;
}
