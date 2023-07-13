/* eslint-disable */
import { Reducer } from "redux";
import reasonTypes from "../actions/types/reason.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IReasonState } from "../interfaces/reason.interfaces";

const initState: IReasonState = {
  stateGetListReason: { ...rootState },
  stateCreateOneReason: { ...rootState },
  stateUpdateOneReason: { ...rootState },
  stateGetReasonById: { ...rootState },
};

const reasonReducer: Reducer<IReasonState, ISyntheticAction> = (
  state: IReasonState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                        GET ALL reason                     */

    case reasonTypes.START_GET_LIST_REASON: {
      const stateReducer: IReasonState = {
        ...state,
        stateGetListReason: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case reasonTypes.GET_LIST_REASON_SUCCESS: {
      const stateReducer: IReasonState = {
        ...state,
        stateGetListReason: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case reasonTypes.GET_LIST_REASON_FAILURE: {
      const stateReducer: IReasonState = {
        ...state,
        stateGetListReason: {
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
    /*                        CREATE ONE reason                     */

    case reasonTypes.START_CREATE_ONE_REASON: {
      const stateReducer: IReasonState = {
        ...state,
        stateCreateOneReason: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case reasonTypes.CREATE_ONE_REASON_SUCCESS: {
      const stateReducer: IReasonState = {
        ...state,
        stateCreateOneReason: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case reasonTypes.CREATE_ONE_REASON_FAILURE: {
      const stateReducer: IReasonState = {
        ...state,
        stateCreateOneReason: {
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
    /*                        CREATE ONE reason                     */

    case reasonTypes.START_UPDATE_ONE_REASON: {
      const stateReducer: IReasonState = {
        ...state,
        stateUpdateOneReason: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case reasonTypes.UPDATE_ONE_REASON_SUCCESS: {
      const stateReducer: IReasonState = {
        ...state,
        stateUpdateOneReason: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case reasonTypes.UPDATE_ONE_REASON_FAILURE: {
      const stateReducer: IReasonState = {
        ...state,
        stateUpdateOneReason: {
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
    /*                        GET reason BY ID                    */

    case reasonTypes.START_GET_REASON_BY_ID: {
      const stateReducer: IReasonState = {
        ...state,
        stateGetReasonById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case reasonTypes.GET_REASON_BY_ID_SUCCESS: {
      const stateReducer: IReasonState = {
        ...state,
        stateGetReasonById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case reasonTypes.GET_REASON_BY_ID_FAILURE: {
      const stateReducer: IReasonState = {
        ...state,
        stateGetReasonById: {
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

export default reasonReducer;
