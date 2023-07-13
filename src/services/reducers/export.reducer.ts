/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IExportState } from "../interfaces/export.interfaces";
import exportTypes from "../actions/types/export.types";

const initState: IExportState = {
  stateExportTemplate: { ...rootState },
  stateLinkDown: { ...rootState },
};

const exportReducer: Reducer<IExportState, ISyntheticAction> = (
  state: IExportState = initState,
  action: ISyntheticAction
) => {
  const { type, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                        GET TEMPLATE                   */

    case exportTypes.START_EXPORT_TEMPLATE: {
      const stateReducer: IExportState = {
        ...state,
        stateExportTemplate: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case exportTypes.GET_EXPORT_TEMPLATE_SUCCESS: {
      const stateReducer: IExportState = {
        ...state,
        stateExportTemplate: {
          ...rootState,
          isLoading: false,
          data: [],
          message: "Thành công",
          success: true,
        },
      };
      return stateReducer;
    }
    case exportTypes.GET_EXPORT_TEMPLATE_FAILURE: {
      const stateReducer: IExportState = {
        ...state,
        stateExportTemplate: {
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
    /*                        GET LINK DOWNLOAD                   */

    case exportTypes.START_LINK_DOWNLOAD: {
      const stateReducer: IExportState = {
        ...state,
        stateLinkDown: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case exportTypes.GET_LINK_DOWNLOAD_SUCCESS: {
      const stateReducer: IExportState = {
        ...state,
        stateLinkDown: {
          ...rootState,
          isLoading: false,
          data: [],
          message: "Thành công",
          success: true,
        },
      };
      return stateReducer;
    }
    case exportTypes.GET_LINK_DOWNLOAD_FAILURE: {
      const stateReducer: IExportState = {
        ...state,
        stateLinkDown: {
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

export default exportReducer;
