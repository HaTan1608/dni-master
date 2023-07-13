/* eslint-disable */
import { Reducer } from "redux";
import uploadTypes from "../actions/types/upload.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IUploadState } from "../interfaces/upload.interfaces";

const initState: IUploadState = {
  stateUploadImagesProduct: { ...rootState },
  stateUploadMetaImageProduct: { ...rootState },
  stateUploadThumbnailImageProduct: { ...rootState },
  stateUploadMetaImageCategory: { ...rootState },
  stateUploadIconCategory: { ...rootState },
  stateUploadFilesCDN: { ...rootState },
};

const uploadReducer: Reducer<IUploadState, ISyntheticAction> = (
  state: IUploadState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                   UPLOAD LIST IMAGES                    */

    case uploadTypes.START_UPLOAD_LIST_IMAGE_PRODUCT: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadImagesProduct: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_LIST_IMAGE_PRODUCT_SUCCESS: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadImagesProduct: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_LIST_IMAGE_PRODUCT_FAILURE: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadImagesProduct: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                    UPLOAD META IMAGE                    */

    case uploadTypes.START_UPLOAD_META_IMAGE_PRODUCT: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadMetaImageProduct: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_META_IMAGE_PRODUCT_SUCCESS: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadMetaImageProduct: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_META_IMAGE_PRODUCT_FAILURE: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadMetaImageProduct: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*               UPLOAD THUMNAIL IMAGE PRODUCT             */

    case uploadTypes.START_UPLOAD_THUMBNAIL_IMAGE_PRODUCT: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadThumbnailImageProduct: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_THUMBNAIL_IMAGE_PRODUCT_SUCCESS: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadThumbnailImageProduct: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_THUMBNAIL_IMAGE_PRODUCT_FAILURE: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadThumbnailImageProduct: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                UPLOAD META IMAGE CATEGORY               */

    case uploadTypes.START_UPLOAD_META_IMAGE_CATEGORY: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadMetaImageCategory: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_META_IMAGE_CATEGORY_SUCCESS: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadMetaImageCategory: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_META_IMAGE_CATEGORY_FAILURE: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadMetaImageCategory: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                UPLOAD ICON CATEGORY               */

    case uploadTypes.START_UPLOAD_ICON_CATEGORY: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadIconCategory: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_ICON_CATEGORY_SUCCESS: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadIconCategory: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_ICON_CATEGORY_FAILURE: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadIconCategory: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                     UPLOAD FILES CDN                    */

    case uploadTypes.START_UPLOAD_FILES_CDN: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadFilesCDN: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_FILES_CDN_SUCCESS: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadFilesCDN: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case uploadTypes.UPLOAD_FILES_CDN_FAILURE: {
      const stateReducer: IUploadState = {
        ...state,
        stateUploadFilesCDN: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    default:
      return state;
  }
};

export default uploadReducer;
