/* eslint-disable */
import { call, put, takeLatest } from "redux-saga/effects";
import { API_END_POINT, API_URL } from "../../api/config";
import {
  IAction,
  IRootResponse,
  ICatchError,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import uploadTypes from "../types/upload.types";
import { actionFailure, actionSuccess } from "../root.actions";
import {
  API_CATEGORY,
  API_PRODUCTS,
  API_UPLOADS,
  API_UPLOAD_ICON,
  API_UPLOAD_IMAGES,
  API_UPLOAD_META_IMAGE,
  API_UPLOAD_THUMBNAIL,
} from "src/services/api/url.index";

function* uploadImagesProduct(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_URL}/${API_PRODUCTS}/${API_UPLOAD_IMAGES}/${payload.id}`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(uploadTypes.UPLOAD_LIST_IMAGE_PRODUCT_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(uploadTypes.UPLOAD_LIST_IMAGE_PRODUCT_FAILURE, err)
    );
  }
}

function* uploadMetaImageProduct(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;

    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_URL}/${API_PRODUCTS}/${payload.id}/${API_UPLOAD_META_IMAGE}`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(uploadTypes.UPLOAD_META_IMAGE_PRODUCT_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(uploadTypes.UPLOAD_META_IMAGE_PRODUCT_FAILURE, err)
    );
  }
}

function* uploadThumbnailImageProduct(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;

    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_URL}/${API_PRODUCTS}/${payload.id}/${API_UPLOAD_THUMBNAIL}`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(uploadTypes.UPLOAD_THUMBNAIL_IMAGE_PRODUCT_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(uploadTypes.UPLOAD_THUMBNAIL_IMAGE_PRODUCT_FAILURE, err)
    );
  }
}

function* uploadMetaImageCategory(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;

    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_URL}/${API_CATEGORY}/${payload.id}/${API_UPLOAD_META_IMAGE}`,
        payload?.params
      );
    });
    yield put(
      actionSuccess(uploadTypes.UPLOAD_META_IMAGE_CATEGORY_SUCCESS, res)
    );
  } catch (err: ICatchError | any) {
    yield put(
      actionFailure(uploadTypes.UPLOAD_META_IMAGE_CATEGORY_FAILURE, err)
    );
  }
}

function* uploadIconCategory(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;

    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_URL}/${API_CATEGORY}/${payload.id}/${API_UPLOAD_ICON}`,
        payload?.params
      );
    });
    yield put(actionSuccess(uploadTypes.UPLOAD_ICON_CATEGORY_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(uploadTypes.UPLOAD_ICON_CATEGORY_FAILURE, err));
  }
}

function* uploadFilesCDN(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;

    const res: IRootResponse = yield call(() => {
      return api.postMultipart(
        `${API_END_POINT}${API_UPLOADS}`,
        payload?.params
      );
    });
    yield put(actionSuccess(uploadTypes.UPLOAD_FILES_CDN_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(uploadTypes.UPLOAD_FILES_CDN_FAILURE, err));
  }
}

export default [
  takeLatest(uploadTypes.START_UPLOAD_LIST_IMAGE_PRODUCT, uploadImagesProduct),
  takeLatest(
    uploadTypes.START_UPLOAD_META_IMAGE_PRODUCT,
    uploadMetaImageProduct
  ),
  takeLatest(
    uploadTypes.START_UPLOAD_THUMBNAIL_IMAGE_PRODUCT,
    uploadThumbnailImageProduct
  ),
  takeLatest(
    uploadTypes.START_UPLOAD_META_IMAGE_CATEGORY,
    uploadMetaImageCategory
  ),
  takeLatest(uploadTypes.START_UPLOAD_ICON_CATEGORY, uploadIconCategory),
  takeLatest(uploadTypes.START_UPLOAD_FILES_CDN, uploadFilesCDN),
];
