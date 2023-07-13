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
import supplierTypes from "../types/supplier.types";
import { API_SUPPLIER } from "src/services/api/url.index";

function* getListSupplier(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_SUPPLIER}`, payload?.params);
    });
    yield put(actionSuccess(supplierTypes.GET_LIST_SUPPLIER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(supplierTypes.GET_LIST_SUPPLIER_FAILURE, err));
  }
}

function* getSupplierById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_SUPPLIER}/${payload.id}`);
    });
    yield put(actionSuccess(supplierTypes.GET_SUPPLIER_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(supplierTypes.GET_SUPPLIER_BY_ID_FAILURE, err));
  }
}

function* updateOneSupplier(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_SUPPLIER}/${payload.id}`,
        payload.params
      );
    });
    yield put(actionSuccess(supplierTypes.UPDATE_ONE_SUPPLIER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(supplierTypes.UPDATE_ONE_SUPPLIER_FAILURE, err));
  }
}

function* createOneSupplier(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_SUPPLIER}`, payload.params);
    });
    yield put(actionSuccess(supplierTypes.CREATE_ONE_SUPPLIER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(supplierTypes.CREATE_ONE_SUPPLIER_FAILURE, err));
  }
}

export default [
  takeLatest(supplierTypes.START_GET_LIST_SUPPLIER, getListSupplier),
  takeLatest(supplierTypes.START_GET_SUPPLIER_BY_ID, getSupplierById),
  takeLatest(supplierTypes.START_UPDATE_ONE_SUPPLIER, updateOneSupplier),
  takeLatest(supplierTypes.START_CREATE_ONE_SUPPLIER, createOneSupplier),
];
