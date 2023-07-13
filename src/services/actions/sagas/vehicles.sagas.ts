/* eslint-disable */
import { call, put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import contTypes from "../types/vehicles.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_VERHICLES } from "src/services/api/url.index";

function* gitListVerhicles(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_VERHICLES}`, payload?.params);
    });
    yield put(actionSuccess(contTypes.GET_LIST_VERHICLE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(contTypes.GET_LIST_VERHICLE_FAILURE, err));
  }
}
function* createVerhicles(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_VERHICLES}`, payload.params);
    });
    yield put(actionSuccess(contTypes.CREATE_VERHICLE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(contTypes.CREATE_VERHICLE_FAILURE, err));
  }
}
function* updateVerhicles(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_VERHICLES}/${payload.id}`,
        payload.params
      );
    });
    yield put(actionSuccess(contTypes.UPDATE_VERHICLE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(contTypes.UPDATE_VERHICLE_FAILURE, err));
  }
}
export default [
  takeLatest(contTypes.START_GET_LIST_VERHICLE, gitListVerhicles),
  takeLatest(contTypes.START_CREATE_VERHICLE, createVerhicles),
  takeLatest(contTypes.START_UPDATE_VERHICLE, updateVerhicles),
];
