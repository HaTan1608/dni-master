
import { IAction } from '../interfaces/root.interfaces';
import supplierTypes from './types/supplier.types';

export const getListSupplier = (params?: any): IAction => {
  const action: IAction = {
    type: supplierTypes.START_GET_LIST_SUPPLIER,
    payload: { params },
  }
  return action;
}

export const getSupplierById = (id?: any): IAction => {
  const action: IAction = {
    type: supplierTypes.START_GET_SUPPLIER_BY_ID,
    payload: { id },
  }
  return action;
}

export const updateOneSupplier = (id: string, params: any): IAction => {
  const action: IAction = {
    type: supplierTypes.START_UPDATE_ONE_SUPPLIER,
    payload: { id, params },
  }
  return action;
}

export const createOneSupplier = (params: any): IAction => {
  const action: IAction = {
    type: supplierTypes.START_CREATE_ONE_SUPPLIER,
    payload: { params },
  }
  return action;
}