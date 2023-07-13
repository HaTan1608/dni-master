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
import warehouseUserTypes from "../types/warehouseUsers.types";
import { API_WAREHOUSE_USER } from "src/services/api/url.index";

function* getListWarehouseUsers(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_WAREHOUSE_USER}`, payload?.params);
    });
    yield put(
      actionSuccess(warehouseUserTypes.GET_LIST_WAREHOUSE_USER_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(warehouseUserTypes.GET_LIST_WAREHOUSE_USER_FAILURE, err)
    );
  }
}
function* createOneWarehouseUser(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_WAREHOUSE_USER}`, payload.params);
    });
    yield put(
      actionSuccess(warehouseUserTypes.CREATE_ONE_WAREHOUSE_USER_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(warehouseUserTypes.CREATE_ONE_WAREHOUSE_USER_FAILURE, err)
    );
  }
}
function* updateOneWarehouseUser(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_WAREHOUSE_USER}/${payload.id}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(warehouseUserTypes.UPDATE_ONE_WAREHOUSE_USER_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(warehouseUserTypes.UPDATE_ONE_WAREHOUSE_USER_FAILURE, err)
    );
  }
}
export default [
  takeLatest(
    warehouseUserTypes.START_GET_LIST_WAREHOUSE_USER,
    getListWarehouseUsers
  ),
  takeLatest(
    warehouseUserTypes.START_CREATE_ONE_WAREHOUSE_USER,
    createOneWarehouseUser
  ),
  takeLatest(
    warehouseUserTypes.START_UPDATE_ONE_WAREHOUSE_USER,
    updateOneWarehouseUser
  ),
];
