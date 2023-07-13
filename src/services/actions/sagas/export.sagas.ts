/* eslint-disable */
import { call, put, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_DOWNLOAD, API_EXPORT_TEMPLATE } from "src/services/api/url.index";
import exportTypes from "../types/export.types";
import { exportExcel } from "src/utils/helpers/functions/textUtils";

function* getExportTemplate(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.getDowload(
        `${API_URL}/${API_EXPORT_TEMPLATE}`,
        payload.params
      );
    });

    const _res: any = res;
    yield put(actionSuccess(exportTypes.GET_EXPORT_TEMPLATE_SUCCESS, res));
    exportExcel(_res, payload.params?.name);
  } catch (err: ICatchError | any) {
    yield put(actionFailure(exportTypes.GET_EXPORT_TEMPLATE_FAILURE, err));
  }
}
function getLinkDowload(action: IAction) {
  const { payload } = action;
  const _fileName = payload.params.file_name.split("/").pop();
  window.open(`${API_URL}/${API_DOWNLOAD}?file=${_fileName}`, "_parent");
}

export default [
  takeLeading(exportTypes.START_EXPORT_TEMPLATE, getExportTemplate),
  takeLeading(exportTypes.START_LINK_DOWNLOAD, getLinkDowload),
];
