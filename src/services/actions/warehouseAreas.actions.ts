
import { IAction } from '../interfaces/root.interfaces';
import warehouseAreaTypes from './types/warehouseArea.types';

export const getListWarehouseAreas = (params?: any): IAction => {
  const action: IAction = {
    type: warehouseAreaTypes.START_GET_LIST_WAREHOUSE_AREA,
    payload: { params },
  }
  return action;
}
export const createOneWarehouseArea = (params: any): IAction => {
  const action: IAction = {
    type: warehouseAreaTypes.START_CREATE_ONE_WAREHOUSE_AREA,
    payload: { params },
  }
  return action;
}
export const updateOneWarehouseArea = (id: string, params: any): IAction => {
  const action: IAction = {
    type: warehouseAreaTypes.START_UPDATE_ONE_WAREHOUSE_AREA,
    payload: { id,params },
  }
  return action;
}