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
import {
  API_BANK,
  API_BRANCH_BANK,
  API_DISTRICT,
  API_PROVINCE,
  API_ROLE,
  API_WARD,
} from "src/services/api/url.index";
import masterDataTypes from "../types/masterData.types";

function* getListProvince(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_PROVINCE}`, payload?.params);
    });
    yield put(actionSuccess(masterDataTypes.GET_LIST_PROVINCE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(masterDataTypes.GET_LIST_PROVINCE_FAILURE, err));
  }
}

function* getListDistrict(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_DISTRICT}`, payload?.params);
    });
    yield put(actionSuccess(masterDataTypes.GET_LIST_DISTRICT_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(masterDataTypes.GET_LIST_DISTRICT_FAILURE, err));
  }
}

function* getListWard(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_WARD}`, payload?.params);
    });
    yield put(actionSuccess(masterDataTypes.GET_LIST_WARD_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(masterDataTypes.GET_LIST_WARD_FAILURE, err));
  }
}

function* getListRole(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_ROLE}`, payload?.params);
    });
    yield put(actionSuccess(masterDataTypes.GET_LIST_ROLE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(masterDataTypes.GET_LIST_ROLE_FAILURE, err));
  }
}

function* getListBank(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_BANK}`, payload?.params);
    });
    yield put(actionSuccess(masterDataTypes.GET_LIST_BANK_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(masterDataTypes.GET_LIST_BANK_FAILURE, err));
  }
}

function* getListBranchBank(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_BRANCH_BANK}`, payload?.params);
    });
    yield put(actionSuccess(masterDataTypes.GET_LIST_BRANCH_BANK_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(masterDataTypes.GET_LIST_BRANCH_BANK_FAILURE, err));
  }
}

export default [
  takeLatest(masterDataTypes.START_GET_LIST_PROVINCE, getListProvince),
  takeLatest(masterDataTypes.START_GET_LIST_DISTRICT, getListDistrict),
  takeLatest(masterDataTypes.START_GET_LIST_WARD, getListWard),
  takeLatest(masterDataTypes.START_GET_LIST_ROLE, getListRole),
  takeLatest(masterDataTypes.START_GET_LIST_BANK, getListBank),
  takeLatest(masterDataTypes.START_GET_LIST_BRANCH_BANK, getListBranchBank),
];
