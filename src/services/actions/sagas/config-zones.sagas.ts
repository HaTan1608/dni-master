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
  API_CONFIG_ZONES,
  API_CONFIG_ZONES_DETAILS,
} from "src/services/api/url.index";
import configZonesTypes from "../types/config-zones.types";

function* getListConfigZones(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CONFIG_ZONES}`, payload?.params);
    });
    yield put(
      actionSuccess(configZonesTypes.GET_LIST_CONFIG_ZONES_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configZonesTypes.GET_LIST_CONFIG_ZONES_FAILURE, err)
    );
  }
}

function* getConfigZonesById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CONFIG_ZONES}/${payload.id}`);
    });
    yield put(
      actionSuccess(configZonesTypes.GET_CONFIG_ZONES_BY_ID_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configZonesTypes.GET_CONFIG_ZONES_BY_ID_FAILURE, err)
    );
  }
}

function* updateOneConfigZones(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CONFIG_ZONES}/${payload.id}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(configZonesTypes.UPDATE_ONE_CONFIG_ZONES_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configZonesTypes.UPDATE_ONE_CONFIG_ZONES_FAILURE, err)
    );
  }
}

function* createOneConfigZones(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CONFIG_ZONES}`, payload.params);
    });
    yield put(
      actionSuccess(configZonesTypes.CREATE_ONE_CONFIG_ZONES_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configZonesTypes.CREATE_ONE_CONFIG_ZONES_FAILURE, err)
    );
  }
}

function* updateOneConfigZonesDetails(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CONFIG_ZONES_DETAILS}/update-list`,
        payload.params
      );
    });
    yield put(
      actionSuccess(
        configZonesTypes.UPDATE_ONE_CONFIG_ZONES_DETAILS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        configZonesTypes.UPDATE_ONE_CONFIG_ZONES_DETAILS_FAILURE,
        err
      )
    );
  }
}

function* getListConfigZonesDetails(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CONFIG_ZONES_DETAILS}`, payload?.params);
    });
    yield put(
      actionSuccess(configZonesTypes.GET_LIST_CONFIG_ZONES_DETAILS_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configZonesTypes.GET_LIST_CONFIG_ZONES_DETAILS_FAILURE, err)
    );
  }
}

export default [
  takeLatest(configZonesTypes.START_GET_LIST_CONFIG_ZONES, getListConfigZones),
  takeLatest(
    configZonesTypes.START_GET_LIST_CONFIG_ZONES_DETAILS,
    getListConfigZonesDetails
  ),

  takeLatest(configZonesTypes.START_GET_CONFIG_ZONES_BY_ID, getConfigZonesById),
  takeLatest(
    configZonesTypes.START_UPDATE_ONE_CONFIG_ZONES,
    updateOneConfigZones
  ),
  takeLatest(
    configZonesTypes.START_UPDATE_ONE_CONFIG_ZONES_DETAILS,
    updateOneConfigZonesDetails
  ),
  takeLatest(
    configZonesTypes.START_CREATE_ONE_CONFIG_ZONES,
    createOneConfigZones
  ),
];
