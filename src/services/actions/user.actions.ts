import userTypes from './types/user.types';
import { IAction } from '../interfaces/root.interfaces';

export const getListUserSystem = (params?: any): IAction => {
  const action: IAction = {
    type: userTypes.START_GET_LIST_USER_SYSTEM,
    payload: { params },
  }
  return action;
}

export const getUserSystemById = (id?: any): IAction => {
  const action: IAction = {
    type: userTypes.START_GET_USER_SYSTEM_BY_ID,
    payload: { id },
  }
  return action;
}

export const updateOneUserSystem = (id: string, params: any): IAction => {
  const action: IAction = {
    type: userTypes.START_UPDATE_ONE_USER_SYSTEM,
    payload: { id, params },
  }
  return action;
}

export const changePassByUser = (params: any): IAction => {
  const action: IAction = {
    type: userTypes.START_CHANGE_PASSWORD_BY_USER,
    payload: { params },
  }
  return action;
}

export const createOneUserSystem = (params: any): IAction => {
  const action: IAction = {
    type: userTypes.START_CREATE_ONE_USER_SYSTEM,
    payload: { params },
  }
  return action;
}

export const getListUserGroup = (params?: any): IAction => {
  const action: IAction = {
    type: userTypes.START_GET_LIST_USER_GROUPS,
    payload: { params },
  }
  return action;
}

export const getUserGroupById = (id?: string | number): IAction => {
  const action: IAction = {
    type: userTypes.START_GET_USER_GROUPS_BY_ID,
    payload: { id },
  }
  return action;
}

export const createOneUserGroup = (params: any): IAction => {
  const action: IAction = {
    type: userTypes.START_CREATE_ONE_USER_GROUPS,
    payload: { params },
  }
  return action;
}

export const updateOneUserGroup = (id: string | number, params: any): IAction => {
  const action: IAction = {
    type: userTypes.START_UPDATE_ONE_USER_GROUPS,
    payload: { id, params },
  }
  return action;
}

export const getListUserGroupPrivilege = (params?: any): IAction => {
  const action: IAction = {
    type: userTypes.START_GET_LIST_USER_GROUPS_PRIVILEGE,
    payload: { params },
  }
  return action;
}