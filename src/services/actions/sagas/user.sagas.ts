/* eslint-disable */
import { call, put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import userTypes from "../types/user.types";
import { actionFailure, actionSuccess } from "../root.actions";
import {
  API_CHANGE_PASS_BY_USER,
  API_FUNCTIONS,
  API_USER_GROUPS,
  API_USER_PRIVILEGE,
  API_USER_SYSTEM,
} from "src/services/api/url.index";

function* getListUserSystem(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_USER_SYSTEM}`, payload?.params);
    });
    yield put(actionSuccess(userTypes.GET_LIST_USER_SYSTEM_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.GET_LIST_USER_SYSTEM_FAILURE, err));
  }
}

function* getUserSystemById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_USER_SYSTEM}/${payload.id}`);
    });
    yield put(actionSuccess(userTypes.GET_USER_SYSTEM_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.GET_USER_SYSTEM_BY_ID_FAILURE, err));
  }
}

function* updateOneUserSystem(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_USER_SYSTEM}/${payload.id}`,
        payload.params
      );
    });
    yield put(actionSuccess(userTypes.UPDATE_ONE_USER_SYSTEM_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.UPDATE_ONE_USER_SYSTEM_FAILURE, err));
  }
}

function* changePassByUser(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_CHANGE_PASS_BY_USER}`, payload.params);
    });
    yield put(
      actionSuccess(userTypes.UPDATE_CHANGE_PASSWORD_BY_USER_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(userTypes.UPDATE_CHANGE_PASSWORD_BY_USER_FAILURE, err)
    );
  }
}

function* createOneUserSystem(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_USER_SYSTEM}`, payload.params);
    });
    yield put(actionSuccess(userTypes.CREATE_ONE_USER_SYSTEM_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.CREATE_ONE_USER_SYSTEM_FAILURE, err));
  }
}

function* getListUserGroup(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_USER_GROUPS}`, payload?.params);
    });
    yield put(actionSuccess(userTypes.GET_LIST_USER_GROUPS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.GET_LIST_USER_GROUPS_FAILURE, err));
  }
}

function* getUserGroupById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_USER_GROUPS}/${payload.id}`);
    });
    yield put(actionSuccess(userTypes.GET_USER_GROUPS_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.GET_USER_GROUPS_BY_ID_FAILURE, err));
  }
}

function* createOneUserGroup(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_USER_GROUPS}`, payload.params);
    });
    yield put(actionSuccess(userTypes.CREATE_ONE_USER_GROUPS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.CREATE_ONE_USER_GROUPS_FAILURE, err));
  }
}

function* updateOneUserGroup(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_USER_GROUPS}/${payload.id}`,
        payload.params
      );
    });
    yield put(actionSuccess(userTypes.UPDATE_ONE_USER_GROUPS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(userTypes.UPDATE_ONE_USER_GROUPS_FAILURE, err));
  }
}

function* getListUserGroupPrivilege(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/${API_USER_GROUPS}/${API_FUNCTIONS}`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_FAILURE, err)
    );
  }
}

export default [
  takeLatest(userTypes.START_GET_LIST_USER_SYSTEM, getListUserSystem),
  takeLatest(userTypes.START_GET_USER_SYSTEM_BY_ID, getUserSystemById),
  takeLatest(userTypes.START_UPDATE_ONE_USER_SYSTEM, updateOneUserSystem),
  takeLatest(userTypes.START_CREATE_ONE_USER_SYSTEM, createOneUserSystem),
  takeLatest(userTypes.START_CHANGE_PASSWORD_BY_USER, changePassByUser),
  takeLatest(userTypes.START_GET_LIST_USER_GROUPS, getListUserGroup),
  takeLatest(userTypes.START_GET_USER_GROUPS_BY_ID, getUserGroupById),
  takeLatest(userTypes.START_CREATE_ONE_USER_GROUPS, createOneUserGroup),
  takeLatest(userTypes.START_UPDATE_ONE_USER_GROUPS, updateOneUserGroup),
  takeLatest(
    userTypes.START_GET_LIST_USER_GROUPS_PRIVILEGE,
    getListUserGroupPrivilege
  ),
];
