/* eslint-disable */
import { call, put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import reasonTypes from "../types/reason.types";
import { API_REASONS } from "src/services/api/url.index";

function* getListReasons(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_REASONS}`, payload?.params);
    });
    yield put(actionSuccess(reasonTypes.GET_LIST_REASON_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(reasonTypes.GET_LIST_REASON_FAILURE, err));
  }
}
function* createOneReason(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_REASONS}`, payload.params);
    });
    yield put(actionSuccess(reasonTypes.CREATE_ONE_REASON_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(reasonTypes.CREATE_ONE_REASON_FAILURE, err));
  }
}
function* updateOneReason(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_REASONS}/${payload.id}`, payload.params);
    });
    yield put(actionSuccess(reasonTypes.UPDATE_ONE_REASON_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(reasonTypes.UPDATE_ONE_REASON_FAILURE, err));
  }
}
function* getReasonById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_REASONS}/${payload.id}`);
    });
    yield put(actionSuccess(reasonTypes.GET_REASON_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(reasonTypes.GET_REASON_BY_ID_FAILURE, err));
  }
}
export default [
  takeLatest(reasonTypes.START_GET_LIST_REASON, getListReasons),
  takeLatest(reasonTypes.START_CREATE_ONE_REASON, createOneReason),
  takeLatest(reasonTypes.START_UPDATE_ONE_REASON, updateOneReason),
  takeLatest(reasonTypes.START_GET_REASON_BY_ID, getReasonById),
];
