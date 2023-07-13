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
import warehouseTypes from "../types/warehouse.types";
import { API_WAREHOUSE } from "src/services/api/url.index";

function* getListWarehouse(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_WAREHOUSE}`, payload?.params);
    });
    yield put(actionSuccess(warehouseTypes.GET_LIST_WAREHOUSE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(warehouseTypes.GET_LIST_WAREHOUSE_FAILURE, err));
  }
}

function* getWarehouseById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_WAREHOUSE}/${payload.id}`);
    });
    yield put(actionSuccess(warehouseTypes.GET_WAREHOUSE_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(warehouseTypes.GET_WAREHOUSE_BY_ID_FAILURE, err));
  }
}

function* updateOneWarehouse(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_WAREHOUSE}/${payload.id}`,
        payload.params
      );
    });
    yield put(actionSuccess(warehouseTypes.UPDATE_ONE_WAREHOUSE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(warehouseTypes.UPDATE_ONE_WAREHOUSE_FAILURE, err));
  }
}

function* createOneWarehouse(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_WAREHOUSE}`, payload.params);
    });
    yield put(actionSuccess(warehouseTypes.CREATE_ONE_WAREHOUSE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(warehouseTypes.CREATE_ONE_WAREHOUSE_FAILURE, err));
  }
}

export default [
  takeLatest(warehouseTypes.START_GET_LIST_WAREHOUSE, getListWarehouse),
  takeLatest(warehouseTypes.START_GET_WAREHOUSE_BY_ID, getWarehouseById),
  takeLatest(warehouseTypes.START_UPDATE_ONE_WAREHOUSE, updateOneWarehouse),
  takeLatest(warehouseTypes.START_CREATE_ONE_WAREHOUSE, createOneWarehouse),
];
