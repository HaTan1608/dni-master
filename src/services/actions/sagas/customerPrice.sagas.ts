/* eslint-disable */
import { call, put, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import customerPriceTypes from "../types/customerPrice.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_CUSTOMER_PRICE } from "src/services/api/url.index";

function* getListCustomerPrice(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER_PRICE}`, payload.params);
    });
    yield put(
      actionSuccess(customerPriceTypes.GET_LIST_CUSTOMER_PRICE_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(customerPriceTypes.GET_LIST_CUSTOMER_PRICE_FAILURE, err)
    );
  }
}
function* getCustomerPriceById(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_CUSTOMER_PRICE}/${payload.id}`);
    });
    yield put(
      actionSuccess(
        customerPriceTypes.GET_LIST_CUSTOMER_BY_ID_PRICE_SUCCESS,
        res
      )
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(
        customerPriceTypes.GET_LIST_CUSTOMER_BY_ID_PRICE_FAILURE,
        err
      )
    );
  }
}

export default [
  takeLeading(
    customerPriceTypes.START_GET_LIST_CUSTOMER_PRICE,
    getListCustomerPrice
  ),
  takeLeading(
    customerPriceTypes.START_GET_LIST_CUSTOMER_PRICE_BY_ID,
    getCustomerPriceById
  ),
];
