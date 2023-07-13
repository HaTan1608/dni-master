
import { IAction } from '../interfaces/root.interfaces';
import routingAreaTypes from './types/routingArea.types';

export const getListRoutingAreas = (params?: any): IAction => {
  const action: IAction = {
    type: routingAreaTypes.START_GET_LIST_ROUTING_AREA,
    payload: { params },
  }
  return action;
}
export const createOneRoutingArea = (params: any): IAction => {
  const action: IAction = {
    type: routingAreaTypes.START_CREATE_ONE_ROUTING_AREA,
    payload: { params },
  }
  return action;
}
export const updateOneRoutingArea = (id: string, params: any): IAction => {
  const action: IAction = {
    type: routingAreaTypes.START_UPDATE_ONE_ROUTING_AREA,
    payload: { id,params },
  }
  return action;
}