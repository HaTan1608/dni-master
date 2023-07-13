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
import routingAreaTypes from "../types/routingArea.types";
import { API_ROUTING_AREA } from "src/services/api/url.index";

function* getListRoutingAreas(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_ROUTING_AREA}`, payload?.params);
    });
    yield put(
      actionSuccess(routingAreaTypes.GET_LIST_ROUTING_AREA_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(routingAreaTypes.GET_LIST_ROUTING_AREA_FAILURE, err)
    );
  }
}
function* createOneRoutingArea(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_ROUTING_AREA}`, payload.params);
    });
    yield put(
      actionSuccess(routingAreaTypes.CREATE_ONE_ROUTING_AREA_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(routingAreaTypes.CREATE_ONE_ROUTING_AREA_FAILURE, err)
    );
  }
}
function* updateOneRoutingArea(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_ROUTING_AREA}/${payload.id}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(routingAreaTypes.UPDATE_ONE_ROUTING_AREA_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(routingAreaTypes.UPDATE_ONE_ROUTING_AREA_FAILURE, err)
    );
  }
}
export default [
  takeLatest(routingAreaTypes.START_GET_LIST_ROUTING_AREA, getListRoutingAreas),
  takeLatest(
    routingAreaTypes.START_CREATE_ONE_ROUTING_AREA,
    createOneRoutingArea
  ),
  takeLatest(
    routingAreaTypes.START_UPDATE_ONE_ROUTING_AREA,
    updateOneRoutingArea
  ),
];
