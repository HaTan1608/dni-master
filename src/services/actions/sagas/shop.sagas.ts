/* eslint-disable */
import { call, put, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import shopTypes from "../types/shop.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_ALL, API_SHOP } from "src/services/api/url.index";

function* getListShop(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_SHOP}/${API_ALL}`, payload.params);
    });
    yield put(actionSuccess(shopTypes.GET_LIST_SHOP_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(shopTypes.GET_LIST_SHOP_FAILURE, err));
  }
}

export default [takeLeading(shopTypes.START_GET_LIST_SHOP, getListShop)];
