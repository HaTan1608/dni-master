/* eslint-disable */
import axios from "axios";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { postMethod } from "../../utils/helpers/functions/textUtils";
import { ICatchError } from "../interfaces/root.interfaces";
import eventEmitter from "./test";
const addHeaders = async (
  url: string,
  options: object,
  dataHeaders: any,
  isAuth: boolean
) => {
  let headers: any = {
    "Content-Type": "application/json",
    responseType: "blob",
    'x-auth-uuid': ''
  };
  let token = localGetToken();
  let uuid = localGetAuthUUID();
  if (isAuth && token && uuid) {
    headers.Authorization = token;
    headers['x-auth-uuid']= uuid;
  }
  if (dataHeaders) {
    headers = { ...headers, ...dataHeaders };
  }

  return axios({ url: `${url}`, headers: headers, ...options });
};

const apiDownloadBlob =
  (method: string, isAuth: boolean) =>
  (url: string, payload?: object, token?: string) => {
    return new Promise((resolve, reject) => {
      addHeaders(
        url,
        {
          method,
          responseType: "blob",
          data: method !== "GET" ? payload : postMethod(payload),
          params: method === "GET" ? payload || "" : "",
        },
        undefined,
        isAuth || false
      )
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          let catchError: ICatchError = handleError({
            ...err.response,
            url: url,
          });
          reject(catchError);
        });
    });
  };

const apiWithPayload =
  (method: string, isAuth: boolean) =>
  (url: string, payload?: object, token?: string, isBlob = false) => {
    return new Promise((resolve, reject) => {
      addHeaders(
        url,
        {
          method,
          responseType: isBlob ? "blob" : undefined,
          data: method !== "GET" ? payload : postMethod(payload),
          params: method === "GET" ? payload || "" : "",
          onDownloadProgress: (progressEvent: any) => {
            eventEmitter.emit(
              "UPLOAD_PROGRESS",
              Math.floor(100 * (progressEvent.loaded / progressEvent.total))
            );
          },
        },
        undefined,
        isAuth || false
      )
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          let catchError: ICatchError = handleError({
            ...err.response,
            url: url,
          });
          reject(catchError);
        });
    });
  };

const apiWithFormData =
  (method: string, isAuth: boolean) =>
  async (url: string, formData: object) => {
    let _data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      _data.append(key, value);
    });

    return new Promise((resolve, reject) => {
      addHeaders(
        url,
        {
          method,
          data: _data,
        },
        {
          // 'Accept': 'multipart/form-data',
          "Content-type": "multipart/form-data",
          // 'accept-encoding': 'gzip',
        },
        isAuth || false
      )
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          let catchError: ICatchError = handleError(err.response);
          reject(catchError);
        });
    });
  };

const handleError = (err: any) => {
  let resultError;
  if (err?.data) {
    resultError = {
      message: err?.data?.message,
      statusCode: err?.data?.statusCode,
    };
  } else {
    resultError = {
      message: "Lỗi hệ thống !",
      statusCode: 500,
    };
  }
  //token exprired
  // if (err?.status === 408)
  // configureStore().dispatch(putSignIn(false));
  return resultError;
};

export const api = {
  get: apiWithPayload("GET", true),
  getDowload: apiDownloadBlob("GET", true),
  getNoAuth: apiWithPayload("GET", false),
  delete: apiWithPayload("DELETE", false),
  post: apiWithPayload("POST", true),
  postDownload: apiDownloadBlob("POST", true),
  put: apiWithPayload("PUT", true),
  postMultipart: apiWithFormData("POST", true),
  // putMultipart: apiWithFormData('PUT')
};
