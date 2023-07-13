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
import { API_DELIVERY, API_PACKAGE } from "src/services/api/url.index";
import packageTypes from "../types/package.types";

function* getListPackage(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_PACKAGE}`, payload?.params);
    });
    yield put(actionSuccess(packageTypes.GET_LIST_PACKAGE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(packageTypes.GET_LIST_PACKAGE_FAILURE, err));
  }
}

function* getListBillPackage(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/${API_PACKAGE}/${payload?.id}`,
        payload?.params
      );
    });
    yield put(actionSuccess(packageTypes.GET_LIST_BILL_PACKAGE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(packageTypes.GET_LIST_BILL_PACKAGE_FAILURE, err));
  }
}

function* createPackageSaga(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_PACKAGE}`, payload?.params);
    });
    yield put(actionSuccess(packageTypes.CREATE_PACKAGE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(packageTypes.CREATE_PACKAGE_FAILURE, err));
  }
}

function* changeStatusPackageSaga(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_PACKAGE}`, payload?.params);
    });
    yield put(actionSuccess(packageTypes.CHANGE_STATUS_PACKAGE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(packageTypes.CHANGE_STATUS_PACKAGE_FAILURE, err));
  }
}

function* changeStatusListDeliverySaga(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_DELIVERY}`, payload?.params);
    });
    yield put(
      actionSuccess(packageTypes.CHANGE_STATUS_LIST_DELIVERY_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(packageTypes.CHANGE_STATUS_LIST_DELIVERY_FAILURE, err)
    );
  }
}

function* changeStatusBillInDeliverySaga(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_DELIVERY}/${payload.id}`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(packageTypes.CHANGE_STATUS_BILL_IN_DELIVERY_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(packageTypes.CHANGE_STATUS_BILL_IN_DELIVERY_FAILURE, err)
    );
  }
}

function* exportBillDeliverySaga(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/be/v1/exports/package-delivery-list`,
        payload?.params
      );
    });
    yield put(actionSuccess(packageTypes.EXPORT_BILL_DELIVREY_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(packageTypes.EXPORT_BILL_DELIVREY_FAILURE, err));
  }
}

function* exportPakageListSaga(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/be/v1/exports/package-list`,
        payload?.params
      );
    });
    yield put(actionSuccess(packageTypes.EXPORT_LIST_BILL_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(packageTypes.EXPORT_LIST_BILL_FAILURE, err));
  }
}

export default [
  takeLatest(packageTypes.START_GET_LIST_PACKAGE, getListPackage),
  takeLatest(packageTypes.START_EXPORT_BILL_DELIVERY, exportBillDeliverySaga),

  takeLatest(packageTypes.START_GET_LIST_BILL_PACKAGE, getListBillPackage),
  takeLatest(packageTypes.START_CREATE_PACKAGE, createPackageSaga),
  takeLatest(packageTypes.START_CHANGE_STATUS_PACKAGE, changeStatusPackageSaga),
  takeLatest(
    packageTypes.START_CHANGE_STATUS_LIST_DELIVERY,
    changeStatusListDeliverySaga
  ),
  takeLatest(
    packageTypes.START_CHANGE_STATUS_BILL_IN_DELIVERY,
    changeStatusBillInDeliverySaga
  ),
  takeLatest(
    packageTypes.START_EXPORT_LIST_BILL,
    exportPakageListSaga
  ),
];
