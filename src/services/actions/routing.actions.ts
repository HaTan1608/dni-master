
import { IAction } from '../interfaces/root.interfaces';
import routingTypes from './types/routing.types';

export const getListRoutings = (params?: any): IAction => {
  const action: IAction = {
    type: routingTypes.START_GET_LIST_ROUTINGS,
    payload: { params },
  }
  return action;
}
export const createOneRouting = (params: any): IAction => {
  const action: IAction = {
    type: routingTypes.START_CREATE_ONE_ROUTING,
    payload: { params },
  }
  return action;
}
export const updateOneRouting = (id: string, params: any): IAction => {
  const action: IAction = {
    type: routingTypes.START_UPDATE_ONE_ROUTING,
    payload: { id,params },
  }
  return action;
}
export const getRoutingById = (id?: any): IAction => {
    const action: IAction = {
      type: routingTypes.START_GET_ROUTING_BY_ID,
      payload: { id },
    }
    return action;
  }