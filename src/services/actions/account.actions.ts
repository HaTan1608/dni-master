import accountTypes from "./types/account.types";
import { IAction } from "../interfaces/root.interfaces";

export const signInAccount = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.START_SIGNIN,
    payload: { params },
  };
  return action;
};

export const registerAccount = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.START_REGISTER,
    payload: { params },
  };
  return action;
};

export const forgetAccount = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.START_FORGET_PASSWORD,
    payload: { params },
  };
  return action;
};

export const changeAccount = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.START_CHANGE_PASSWORD,
    payload: { params },
  };
  return action;
};

export const confirmAccount = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.START_CONFIRM_ACCOUNT,
    payload: { params },
  };
  return action;
};

export const signOut = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.SIGN_OUT,
    payload: { params },
  };
  return action;
};
