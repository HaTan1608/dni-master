/* eslint-disable */
import { call, put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import contTypes from "../types/trains.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_TRAINS } from "src/services/api/url.index";

function* getListTrains(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_TRAINS}`, payload?.params);
    });
    yield put(actionSuccess(contTypes.GET_LIST_TRAINS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(contTypes.GET_LIST_TRAINS_FAILURE, err));
  }
}
function* createTrain(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_TRAINS}`, payload.params);
    });
    yield put(actionSuccess(contTypes.CREATE_TRAINS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(contTypes.CREATE_TRAINS_FAILURE, err));
  }
}
function* updateTrain(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_TRAINS}/${payload.id}`, payload.params);
    });
    yield put(actionSuccess(contTypes.UPDATE_TRAINS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(contTypes.UPDATE_TRAINS_FAILURE, err));
  }
}
export default [
  takeLatest(contTypes.START_GET_LIST_TRAINS, getListTrains),
  takeLatest(contTypes.START_CREATE_TRAINS, createTrain),
  takeLatest(contTypes.START_UPDATE_TRAINS, updateTrain),
];
