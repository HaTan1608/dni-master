import contTypes from './types/trains.types';
import { IAction } from '../interfaces/root.interfaces';

export const getListTrains = (params?: any): IAction => {
  const action: IAction = {
    type: contTypes.START_GET_LIST_TRAINS,
    payload: { params },
  }
  return action;
}
export const createTrain = (params: any): IAction => {
    const action: IAction = {
      type: contTypes.START_CREATE_TRAINS,
      payload: { params },
    }
    return action;
  }
  export const updateTrain = (id: string, params: any): IAction => {
    const action: IAction = {
      type: contTypes.START_UPDATE_TRAINS,
      payload: {id,params },
    }
    return action;
  }