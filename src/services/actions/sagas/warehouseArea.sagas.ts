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
import warehouseAreaTypes from "../types/warehouseArea.types";
import { API_WAREHOUSE_AREA } from "src/services/api/url.index";

function* getListWarehouseAreas(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_WAREHOUSE_AREA}`, payload?.params);
    });
    yield put(
      actionSuccess(warehouseAreaTypes.GET_LIST_WAREHOUSE_AREA_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(warehouseAreaTypes.GET_LIST_WAREHOUSE_AREA_FAILURE, err)
    );
  }
}
function* createOneWarehouseArea(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_WAREHOUSE_AREA}`, payload.params);
    });
    yield put(
      actionSuccess(warehouseAreaTypes.CREATE_ONE_WAREHOUSE_AREA_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(warehouseAreaTypes.CREATE_ONE_WAREHOUSE_AREA_FAILURE, err)
    );
  }
}
function* updateOneWarehouseArea(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_WAREHOUSE_AREA}/${payload.id}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(warehouseAreaTypes.UPDATE_ONE_WAREHOUSE_AREA_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(warehouseAreaTypes.UPDATE_ONE_WAREHOUSE_AREA_FAILURE, err)
    );
  }
}
export default [
  takeLatest(
    warehouseAreaTypes.START_GET_LIST_WAREHOUSE_AREA,
    getListWarehouseAreas
  ),
  takeLatest(
    warehouseAreaTypes.START_CREATE_ONE_WAREHOUSE_AREA,
    createOneWarehouseArea
  ),
  takeLatest(
    warehouseAreaTypes.START_UPDATE_ONE_WAREHOUSE_AREA,
    updateOneWarehouseArea
  ),
];
