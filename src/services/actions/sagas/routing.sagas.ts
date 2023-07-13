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
import RoutingTypes from "../types/routing.types";
import { API_ROUTING } from "src/services/api/url.index";

function* getListRoutings(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_ROUTING}`, payload?.params);
    });
    yield put(actionSuccess(RoutingTypes.GET_LIST_ROUTINGS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(RoutingTypes.GET_LIST_ROUTINGS_FAILURE, err));
  }
}
function* createOneRouting(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_ROUTING}`, payload.params);
    });
    yield put(actionSuccess(RoutingTypes.CREATE_ONE_ROUTING_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(RoutingTypes.CREATE_ONE_ROUTING_FAILURE, err));
  }
}
function* updateOneRouting(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_ROUTING}/${payload.id}`, payload.params);
    });
    yield put(actionSuccess(RoutingTypes.UPDATE_ONE_ROUTING_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(RoutingTypes.UPDATE_ONE_ROUTING_FAILURE, err));
  }
}
function* getRoutingById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_ROUTING}/${payload.id}`);
    });
    yield put(actionSuccess(RoutingTypes.GET_ROUTING_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(RoutingTypes.GET_ROUTING_BY_ID_FAILURE, err));
  }
}
export default [
  takeLatest(RoutingTypes.START_GET_LIST_ROUTINGS, getListRoutings),
  takeLatest(RoutingTypes.START_CREATE_ONE_ROUTING, createOneRouting),
  takeLatest(RoutingTypes.START_UPDATE_ONE_ROUTING, updateOneRouting),
  takeLatest(RoutingTypes.START_GET_ROUTING_BY_ID, getRoutingById),
];
