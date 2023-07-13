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
import { API_CUSTOMER_SETTING } from "src/services/api/url.index";
import customerSettingTypes from "../types/customerSetting.types";

function* getListCustomerSetting(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER_SETTING}`, payload?.params);
    });
    yield put(
      actionSuccess(customerSettingTypes.GET_LIST_CUSTOMER_SETTING_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(customerSettingTypes.GET_LIST_CUSTOMER_SETTING_FAILURE, err)
    );
  }
}

function* getCustomerSettingById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER_SETTING}/${payload.id}`);
    });
    yield put(
      actionSuccess(
        customerSettingTypes.GET_CUSTOMER_SETTING_BY_ID_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        customerSettingTypes.GET_CUSTOMER_SETTING_BY_ID_FAILURE,
        err
      )
    );
  }
}

function* updateOneCustomerSetting(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CUSTOMER_SETTING}/${payload.id}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(
        customerSettingTypes.UPDATE_ONE_CUSTOMER_SETTING_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        customerSettingTypes.UPDATE_ONE_CUSTOMER_SETTING_FAILURE,
        err
      )
    );
  }
}
function* createCustomerSetting(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CUSTOMER_SETTING}`, payload.params);
    });
    yield put(actionSuccess(customerSettingTypes.CREATE_CUSTOMER_SETTING_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(customerSettingTypes.CREATE_CUSTOMER_SETTING_FAILURE, err));
  }
}
export default [
  takeLatest(
    customerSettingTypes.START_GET_LIST_CUSTOMER_SETTING,
    getListCustomerSetting
  ),
  takeLatest(
    customerSettingTypes.START_GET_CUSTOMER_SETTING_BY_ID,
    getCustomerSettingById
  ),
  takeLatest(
    customerSettingTypes.START_UPDATE_ONE_CUSTOMER_SETTING,
    updateOneCustomerSetting
  ),
  takeLatest(
    customerSettingTypes.START_CREATE_CUSTOMER_SETTING,
    createCustomerSetting
  ),
  //   takeLatest(customerSettingTypes.START_CREATE_ONE_CUSTOMER_ADDRESS, createOneCustomerAddress),
];
