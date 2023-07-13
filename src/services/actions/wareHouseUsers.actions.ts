
import { IAction } from '../interfaces/root.interfaces';
import warehouseUserTypes from './types/warehouseUsers.types';

export const getListWareHouseUsers = (params?: any): IAction => {
  const action: IAction = {
    type: warehouseUserTypes.START_GET_LIST_WAREHOUSE_USER,
    payload: { params },
  }
  return action;
}
export const createOneWarehouseUser = (params: any): IAction => {
  const action: IAction = {
    type: warehouseUserTypes.START_CREATE_ONE_WAREHOUSE_USER,
    payload: { params },
  }
  return action;
}
export const updateOneWarehouseUser = (id: string, params: any): IAction => {
  const action: IAction = {
    type: warehouseUserTypes.START_UPDATE_ONE_WAREHOUSE_USER,
    payload: { id,params },
  }
  return action;
}