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
import { API_CUSTOMER ,API_CUSTOMER_GROUP} from "src/services/api/url.index";
import customerTypes from "../types/customer.types";

function* getListCustomer(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER}`, payload?.params);
    });
    yield put(actionSuccess(customerTypes.GET_LIST_CUSTOMER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(customerTypes.GET_LIST_CUSTOMER_FAILURE, err));
  }
}
function* getListCustomerGroup(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER_GROUP}`, payload?.params);
    });
    yield put(actionSuccess(customerTypes.GET_CUSTOMER_GROUP_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(customerTypes.GET_CUSTOMER_GROUP_FAILURE, err));
  }
}
function* getCustomerById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER}/${payload.id}`);
    });
    yield put(actionSuccess(customerTypes.GET_CUSTOMER_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(customerTypes.GET_CUSTOMER_BY_ID_FAILURE, err));
  }
}

function* genCodeCustomerById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CUSTOMER}/${payload.id}`);
    });
    yield put(
      actionSuccess(customerTypes.GEN_CODE_CUSTOMER_BY_ID_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(customerTypes.GEN_CODE_CUSTOMER_BY_ID_FAILURE, err)
    );
  }
}

function* updateOneCustomer(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CUSTOMER}/${payload.id}`,
        payload.params
      );
    });
    yield put(actionSuccess(customerTypes.UPDATE_ONE_CUSTOMER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(customerTypes.UPDATE_ONE_CUSTOMER_FAILURE, err));
  }
}

function* createOneCustomer(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CUSTOMER}`, payload.params);
    });
    yield put(actionSuccess(customerTypes.CREATE_ONE_CUSTOMER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(customerTypes.CREATE_ONE_CUSTOMER_FAILURE, err));
  }
}
function* importFileCustomer(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_URL}/be/v1/imports/upload-customers-by-template`,
        payload.params
      );
    });
    yield put(actionSuccess(customerTypes.IMPORT_FILE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(customerTypes.IMPORT_FILE_FAILURE, err));
  }
}

export default [
  takeLatest(customerTypes.START_GET_LIST_CUSTOMER, getListCustomer),
  takeLatest(customerTypes.START_GET_CUSTOMER_BY_ID, getCustomerById),
  takeLatest(customerTypes.START_GEN_CODE_CUSTOMER_BY_ID, genCodeCustomerById),
  takeLatest(customerTypes.START_UPDATE_ONE_CUSTOMER, updateOneCustomer),
  takeLatest(customerTypes.START_CREATE_ONE_CUSTOMER, createOneCustomer),
  takeLatest(customerTypes.START_IMPORT_FILE, importFileCustomer),
  takeLatest(customerTypes.START_GET_CUSTOMER_GROUP, getListCustomerGroup),
];
