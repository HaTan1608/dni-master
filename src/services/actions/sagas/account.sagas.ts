/* eslint-disable */
import { call, put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import accountTypes from "../types/account.types";
import { actionFailure, actionSuccess } from "../root.actions";
import {
  API_CHANGE_PASSWORD,
  API_CONFIRM_ACCOUNT,
  API_FORGET_PASSWORD,
  API_LOGIN,
  API_REGISTER,
} from "src/services/api/url.index";

function* signInAccount(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const _params = {
      username: payload.params && payload.params.username,
      password: payload.params && payload.params.password,
    };
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_LOGIN}`, _params);
    });
    yield put(actionSuccess(accountTypes.SIGNIN_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(accountTypes.SIGNIN_FAILURE, err));
  }
}
function* registerAccount(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_REGISTER}`, payload.params);
    });
    yield put(actionSuccess(accountTypes.REGISTER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(accountTypes.REGISTER_FAILURE, err));
  }
}

function* forgetAccount(action: IAction) {
  try {
    const { payload } = action;
    const _params = {
      username: payload.params && payload.params.username,
    };
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_FORGET_PASSWORD}`, _params);
    });
    yield put(actionSuccess(accountTypes.FORGET_PASSWORD_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(accountTypes.FORGET_PASSWORD_FAILURE, err));
  }
}

function* changeAccount(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CHANGE_PASSWORD}`, payload.params);
    });
    yield put(actionSuccess(accountTypes.CHANGE_PASSWORD_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(accountTypes.CHANGE_PASSWORD_FAILURE, err));
  }
}
function* confimAccount(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CONFIRM_ACCOUNT}`, payload.params);
    });
    yield put(actionSuccess(accountTypes.CONFIRM_ACCOUNT_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(accountTypes.CONFIRM_ACCOUNT_FAILURE, err));
  }
}

function* signOut(action: IAction) {
  if (action.payload.params.history) {
    action.payload.params.history.push("/sign-in");
    localStorage.removeItem("AUTH_UUID");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("ACCOUNT");
    let _dataUser = JSON.parse(
      localStorage.getItem("ACCOUNT_LOGIN") || ""
    )?.username;
    localStorage.clear();
    localStorage.setItem(
      "ACCOUNT_LOGIN",
      JSON.stringify({ username: _dataUser })
    );
  }
}
// takeLeading => nhiều action => lấy cái đầu tiên
// takeLatest => nhiều action => lấy cái cuối
export default [
  takeLatest(accountTypes.SIGN_OUT, signOut),
  takeLatest(accountTypes.START_SIGNIN, signInAccount),
  takeLatest(accountTypes.START_REGISTER, registerAccount),
  takeLatest(accountTypes.START_FORGET_PASSWORD, forgetAccount),
  takeLatest(accountTypes.START_CHANGE_PASSWORD, changeAccount),
  takeLatest(accountTypes.START_CONFIRM_ACCOUNT, confimAccount),
];
