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
import { API_CUSTOMER_ADDRESS } from "src/services/api/url.index";
import customerAddressTypes from "../types/customerAddress.types";

function* getListCustomerAddress(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER_ADDRESS}`, payload?.params);
    });
    yield put(
      actionSuccess(customerAddressTypes.GET_LIST_CUSTOMER_ADDRESS_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(customerAddressTypes.GET_LIST_CUSTOMER_ADDRESS_FAILURE, err)
    );
  }
}

function* getCustomerAddressById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER_ADDRESS}/${payload.id}`);
    });
    yield put(
      actionSuccess(
        customerAddressTypes.GET_CUSTOMER_ADDRESS_BY_ID_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        customerAddressTypes.GET_CUSTOMER_ADDRESS_BY_ID_FAILURE,
        err
      )
    );
  }
}

function* updateOneCustomerAddress(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CUSTOMER_ADDRESS}/${payload.id}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(
        customerAddressTypes.UPDATE_ONE_CUSTOMER_ADDRESS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        customerAddressTypes.UPDATE_ONE_CUSTOMER_ADDRESS_FAILURE,
        err
      )
    );
  }
}

function* createOneCustomerAddress(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CUSTOMER_ADDRESS}`, payload.params);
    });
    yield put(
      actionSuccess(
        customerAddressTypes.CREATE_ONE_CUSTOMER_ADDRESS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        customerAddressTypes.CREATE_ONE_CUSTOMER_ADDRESS_FAILURE,
        err
      )
    );
  }
}

export default [
  takeLatest(
    customerAddressTypes.START_GET_LIST_CUSTOMER_ADDRESS,
    getListCustomerAddress
  ),
  takeLatest(
    customerAddressTypes.START_GET_CUSTOMER_ADDRESS_BY_ID,
    getCustomerAddressById
  ),
  takeLatest(
    customerAddressTypes.START_UPDATE_ONE_CUSTOMER_ADDRESS,
    updateOneCustomerAddress
  ),
  takeLatest(
    customerAddressTypes.START_CREATE_ONE_CUSTOMER_ADDRESS,
    createOneCustomerAddress
  ),
];
