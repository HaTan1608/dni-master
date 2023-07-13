import contTypes from './types/vehicles.types';
import { IAction } from '../interfaces/root.interfaces';

export const gitListVerhicles = (params?: any): IAction => {
  const action: IAction = {
    type: contTypes.START_GET_LIST_VERHICLE,
    payload: { params },
  }
  return action;
}
export const createVerhicles = (params: any): IAction => {
    const action: IAction = {
      type: contTypes.START_CREATE_VERHICLE,
      payload: { params },
    }
    return action;
  }
  export const updateVerhicles = (id: string, params: any): IAction => {
    const action: IAction = {
      type: contTypes.START_UPDATE_VERHICLE,
      payload: {id,params },
    }
    return action;
  }