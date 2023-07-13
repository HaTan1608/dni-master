/* eslint-disable */
import { put, takeLeading } from "redux-saga/effects";
import { IAction } from "../../interfaces/root.interfaces";

import globalTypes from "../types/global.types";

function* putSignIn(action: IAction) {
  const { payload } = action;
  yield put({
    type: globalTypes.PUT_SIGN_IN_APP_SUCCESS,
    payload: { data: payload.data },
  });
}

export default [takeLeading(globalTypes.START_PUT_SIGN_IN_APP, putSignIn)];
