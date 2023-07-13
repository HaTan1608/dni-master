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
  API_CONFIG_PRICES,
  API_CONFIG_PRICES_APPLYS,
  API_CONFIG_PRICES_DETAILS,
} from "src/services/api/url.index";
import configPricesTypes from "../types/config-prices.types";

function* getListConfigPrices(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CONFIG_PRICES}`, payload?.params);
    });
    yield put(
      actionSuccess(configPricesTypes.GET_LIST_CONFIG_PRICES_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configPricesTypes.GET_LIST_CONFIG_PRICES_FAILURE, err)
    );
  }
}

function* getConfigPricesById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CONFIG_PRICES}/${payload.id}`);
    });
    yield put(
      actionSuccess(configPricesTypes.GET_CONFIG_PRICES_BY_ID_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configPricesTypes.GET_CONFIG_PRICES_BY_ID_FAILURE, err)
    );
  }
}

function* updateOneConfigPrices(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CONFIG_PRICES}/${payload.id}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(configPricesTypes.UPDATE_ONE_CONFIG_PRICES_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configPricesTypes.UPDATE_ONE_CONFIG_PRICES_FAILURE, err)
    );
  }
}

function* createOneConfigPrices(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CONFIG_PRICES}`, payload.params);
    });
    yield put(
      actionSuccess(configPricesTypes.CREATE_ONE_CONFIG_PRICES_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(configPricesTypes.CREATE_ONE_CONFIG_PRICES_FAILURE, err)
    );
  }
}

function* updateOneConfigPricesDetails(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CONFIG_PRICES_DETAILS}/update-list`,
        payload.params
      );
    });
    yield put(
      actionSuccess(
        configPricesTypes.UPDATE_ONE_CONFIG_PRICES_DETAILS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        configPricesTypes.UPDATE_ONE_CONFIG_PRICES_DETAILS_FAILURE,
        err
      )
    );
  }
}

function* getListConfigPricesDetails(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/${API_CONFIG_PRICES_DETAILS}`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(
        configPricesTypes.GET_LIST_CONFIG_PRICES_DETAILS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        configPricesTypes.GET_LIST_CONFIG_PRICES_DETAILS_FAILURE,
        err
      )
    );
  }
}

function* createOneConfigPricesDetails(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(
        `${API_URL}/${API_CONFIG_PRICES_DETAILS}`,
        payload.params
      );
    });
    yield put(
      actionSuccess(
        configPricesTypes.CREATE_ONE_CONFIG_PRICES_DETAILS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        configPricesTypes.CREATE_ONE_CONFIG_PRICES_DETAILS_FAILURE,
        err
      )
    );
  }
}

function* updateOneConfigPricesApplys(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_CONFIG_PRICES_APPLYS}/update-list`,
        payload.params
      );
    });
    yield put(
      actionSuccess(
        configPricesTypes.UPDATE_ONE_CONFIG_PRICES_APPLYS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        configPricesTypes.UPDATE_ONE_CONFIG_PRICES_APPLYS_FAILURE,
        err
      )
    );
  }
}

function* getListConfigPricesApplys(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CONFIG_PRICES_APPLYS}`, payload?.params);
    });
    yield put(
      actionSuccess(
        configPricesTypes.GET_LIST_CONFIG_PRICES_APPLYS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        configPricesTypes.GET_LIST_CONFIG_PRICES_APPLYS_FAILURE,
        err
      )
    );
  }
}

function* createOneConfigPricesApplys(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_CONFIG_PRICES_APPLYS}`, payload.params);
    });
    yield put(
      actionSuccess(
        configPricesTypes.CREATE_ONE_CONFIG_PRICES_APPLYS_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        configPricesTypes.CREATE_ONE_CONFIG_PRICES_APPLYS_FAILURE,
        err
      )
    );
  }
}
export default [
  takeLatest(
    configPricesTypes.START_GET_LIST_CONFIG_PRICES,
    getListConfigPrices
  ),
  takeLatest(
    configPricesTypes.START_GET_LIST_CONFIG_PRICES_DETAILS,
    getListConfigPricesDetails
  ),

  takeLatest(
    configPricesTypes.START_GET_CONFIG_PRICES_BY_ID,
    getConfigPricesById
  ),
  takeLatest(
    configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES,
    updateOneConfigPrices
  ),
  takeLatest(
    configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES_DETAILS,
    updateOneConfigPricesDetails
  ),
  takeLatest(
    configPricesTypes.START_CREATE_ONE_CONFIG_PRICES,
    createOneConfigPrices
  ),
  takeLatest(
    configPricesTypes.START_CREATE_ONE_CONFIG_PRICES_DETAILS,
    createOneConfigPricesDetails
  ),

  takeLatest(
    configPricesTypes.START_GET_LIST_CONFIG_PRICES_APPLYS,
    getListConfigPricesApplys
  ),
  takeLatest(
    configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES_APPLYS,
    updateOneConfigPricesApplys
  ),
  takeLatest(
    configPricesTypes.START_CREATE_ONE_CONFIG_PRICES_APPLYS,
    createOneConfigPricesApplys
  ),
];
