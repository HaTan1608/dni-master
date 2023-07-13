
import { IAction } from '../interfaces/root.interfaces';
import warehouseTypes from './types/warehouse.types';

export const getListWarehouse = (params?: any): IAction => {
  const action: IAction = {
    type: warehouseTypes.START_GET_LIST_WAREHOUSE,
    payload: { params },
  }
  return action;
}

export const getWarehouseById = (id?: any): IAction => {
  const action: IAction = {
    type: warehouseTypes.START_GET_WAREHOUSE_BY_ID,
    payload: { id },
  }
  return action;
}

export const updateOneWarehouse = (id: string, params: any): IAction => {
  const action: IAction = {
    type: warehouseTypes.START_UPDATE_ONE_WAREHOUSE,
    payload: { id, params },
  }
  return action;
}

export const createOneWarehouse = (params: any): IAction => {
  const action: IAction = {
    type: warehouseTypes.START_CREATE_ONE_WAREHOUSE,
    payload: { params },
  }
  return action;
}