/* eslint-disable */
import { call, put, takeLatest } from "redux-saga/effects";
import { API_DELIVERY, API_EXPORT_PACKAGE_DEBT_LIST, API_EXPORT_PACKAGE_DEBT_LIST_DETAIL, API_ORDERS, API_PAKAGE_DEBT_LIST } from "src/services/api/url.index";
import { api } from "../../api/api.index";
import { API_URL } from "../../api/config";
import {
  IAction, ICatchError, IRootResponse
} from "../../interfaces/root.interfaces";
import { actionFailure, actionSuccess } from "../root.actions";
import ordersTypes from "../types/orders.types";

function* getListOrders(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_ORDERS}`, payload?.params);
    });
    yield put(actionSuccess(ordersTypes.GET_LIST_ORDERS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.GET_LIST_ORDERS_FAILURE, err));
  }
}
function* getListOfDebt(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/be/v1/bills/list-of-debt`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(ordersTypes.GET_LIST_OF_DEBT_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(ordersTypes.GET_LIST_OF_DEBT_FAILURE, err)
    );
  }
}
function* getPakageDebtList(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_PAKAGE_DEBT_LIST}`, payload.params);
    });
    yield put(actionSuccess(ordersTypes.GET_PAKAGE_DEBT_LIST_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.GET_PAKAGE_DEBT_LIST_FAILURE, err));
  }
}
function* getOrdersById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_ORDERS}/${payload.id}`);
    });
    yield put(actionSuccess(ordersTypes.GET_ORDERS_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.GET_ORDERS_BY_ID_FAILURE, err));
  }
}

function* updateOneOrders(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_ORDERS}/${payload.id}`, payload.params);
    });
    yield put(actionSuccess(ordersTypes.UPDATE_ONE_ORDERS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.UPDATE_ONE_ORDERS_FAILURE, err));
  }
}

function* createOneOrders(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_ORDERS}`, payload.params);
    });
    yield put(actionSuccess(ordersTypes.CREATE_ONE_ORDERS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.CREATE_ONE_ORDERS_FAILURE, err));
  }
}
function* createPakageDebtList(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_PAKAGE_DEBT_LIST}`, payload.params);
    });
    yield put(actionSuccess(ordersTypes.CREATE_LIST_OF_DEBT_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.CREATE_LIST_OF_DEBT_FAILURE, err));
  }
}
function* changeStatusBills(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_ORDERS}/update-bills-status`,
        payload.params
      );
    });
    yield put(actionSuccess(ordersTypes.CHANGE_STATUS_BILLS_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.CHANGE_STATUS_BILLS_FAILURE, err));
  }
}

function* createOrdersByFile(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_URL}/be/v1/imports/upload-bills-by-template`,
        payload.params
      );
    });
    yield put(actionSuccess(ordersTypes.CREATE_ORDERS_BY_FILE_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.CREATE_ORDERS_BY_FILE_FAILURE, err));
  }
}

function* createOrdersArrayByFile(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(
        `${API_URL}/be/v1/bills/create-list-bill `,
        payload.params
      );
    });
    yield put(
      actionSuccess(ordersTypes.CREATE_ORDERS_ARRAY_BY_FILE_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(ordersTypes.CREATE_ORDERS_ARRAY_BY_FILE_FAILURE, err)
    );
  }
}

function* createDeliveryBill(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_DELIVERY}`, payload.params);
    });
    yield put(actionSuccess(ordersTypes.CREATE_DELIVERY_BILL_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.CREATE_DELIVERY_BILL_FAILURE, err));
  }
}

function* getListDeliveryBill(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_DELIVERY}`, payload.params);
    });
    yield put(actionSuccess(ordersTypes.GET_LIST_DELIVERY_BILL_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.GET_LIST_DELIVERY_BILL_FAILURE, err));
  }
}

function* getDeliveryBillById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_DELIVERY}/${payload.id}`);
    });
    yield put(actionSuccess(ordersTypes.GET_DELIVERY_BILL_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.GET_DELIVERY_BILL_BY_ID_FAILURE, err));
  }
}
function* getPakageDebtListById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_PAKAGE_DEBT_LIST}/${payload.id}`);
    });
    yield put(actionSuccess(ordersTypes.GET_PAKAGE_DEBT_LIST_BY_ID_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.GET_PAKAGE_DEBT_LIST_BY_ID_FAILURE, err));
  }
}
function* completePakageDebtList(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_PAKAGE_DEBT_LIST}`,payload.params);
    });
    yield put(actionSuccess(ordersTypes.COMPLETE_PAKAGE_DEBT_LIST_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.COMPLETE_PAKAGE_DEBT_LIST_FAILURE, err));
  }
}
function* deleteOrCompletePakageDebtList(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_PAKAGE_DEBT_LIST}/${payload.id}`,payload.params);
    });
    yield put(actionSuccess(ordersTypes.COMPLETE_OR_DELETE_PAKAGE_DEBT_LIST_SUCCESS_BY_ID, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.COMPLETE_OR_DELETE_PAKAGE_DEBT_LIST_FAILURE_BY_ID, err));
  }
}
function* updateDeliveryBill(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_DELIVERY}/${payload.id}`);
    });
    yield put(actionSuccess(ordersTypes.UPDATE_DELIVERY_BILL_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.UPDATE_DELIVERY_BILL_FAILURE, err));
  }
}

function* getExportPakageDebtList(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/${API_EXPORT_PACKAGE_DEBT_LIST}`,
        payload.params
      );
    });
    yield put(actionSuccess(ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_FAILURE, err));
  }
}
function* getExportPakageDebtListDetail(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(
        `${API_URL}/${API_EXPORT_PACKAGE_DEBT_LIST_DETAIL}`,
        payload.params
      );
    });
    yield put(actionSuccess(ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_DETAIL_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_DETAIL_FAILURE, err));
  }
}
export default [
  takeLatest(ordersTypes.START_CHANGE_STATUS_BILLS, changeStatusBills),
  takeLatest(ordersTypes.START_GET_LIST_ORDERS, getListOrders),
  takeLatest(ordersTypes.START_GET_ORDERS_BY_ID, getOrdersById),
  takeLatest(ordersTypes.START_UPDATE_ONE_ORDERS, updateOneOrders),
  takeLatest(ordersTypes.START_CREATE_ONE_ORDERS, createOneOrders),
  takeLatest(ordersTypes.START_GET_LIST_DELIVERY_BILL, getListDeliveryBill),
  takeLatest(ordersTypes.START_GET_DELIVERY_BILL_BY_ID, getDeliveryBillById),
  takeLatest(ordersTypes.START_UPDATE_DELIVERY_BILL, updateDeliveryBill),
  takeLatest(ordersTypes.START_CREATE_DELIVERY_BILL, createDeliveryBill),
  takeLatest(
    ordersTypes.START_CREATE_ORDERS_ARRAY_BY_FILE,
    createOrdersArrayByFile
  ),
  takeLatest(ordersTypes.START_CREATE_ORDERS_BY_FILE, createOrdersByFile),
  takeLatest(ordersTypes.START_GET_LIST_OF_DEBT, getListOfDebt),
  takeLatest(ordersTypes.START_CREATE_LIST_OF_DEBT, createPakageDebtList),
  takeLatest(ordersTypes.START_GET_PAKAGE_DEBT_LIST, getPakageDebtList),
  takeLatest(ordersTypes.START_GET_PAKAGE_DEBT_LIST_BY_ID, getPakageDebtListById),
  takeLatest(ordersTypes.START_COMPLETE_PAKAGE_DEBT_LIST, completePakageDebtList),
  takeLatest(ordersTypes.START_EXPORT_EXCEL_PACKAGE_DEBT_LIST, getExportPakageDebtList),
  takeLatest(ordersTypes.START_COMPLETE_OR_DELETE_PAKAGE_DEBT_LIST_BY_ID, deleteOrCompletePakageDebtList),
  takeLatest(ordersTypes.START_EXPORT_EXCEL_PACKAGE_DEBT_LIST_DETAIL, getExportPakageDebtListDetail)
];
