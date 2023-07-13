
import { IAction } from '../interfaces/root.interfaces';
import reasonTypes from './types/reason.types';

export const getListReasons = (params?: any): IAction => {
  const action: IAction = {
    type: reasonTypes.START_GET_LIST_REASON,
    payload: { params },
  }
  return action;
}
export const createOneReason = (params: any): IAction => {
  const action: IAction = {
    type: reasonTypes.START_CREATE_ONE_REASON,
    payload: { params },
  }
  return action;
}
export const updateOneReason = (id: string, params: any): IAction => {
  const action: IAction = {
    type: reasonTypes.START_UPDATE_ONE_REASON,
    payload: { id,params },
  }
  return action;
}
export const getReasonById = (id?: any): IAction => {
    const action: IAction = {
      type: reasonTypes.START_GET_REASON_BY_ID,
      payload: { id },
    }
    return action;
  }