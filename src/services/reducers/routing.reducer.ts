/* eslint-disable */
import { Reducer } from "redux";
import routingTypes from "../actions/types/routing.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IRoutingsState } from "../interfaces/routing.interfaces";

const initState: IRoutingsState = {
  stateGetListRoutings: { ...rootState },
  stateCreateOneRouting: { ...rootState },
  stateUpdateOneRouting: { ...rootState },
  stateGetRoutingById: { ...rootState },
};

const routingReducer: Reducer<IRoutingsState, ISyntheticAction> = (
  state: IRoutingsState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                        GET ALL ROUTING                     */

    case routingTypes.START_GET_LIST_ROUTINGS: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateGetListRoutings: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case routingTypes.GET_LIST_ROUTINGS_SUCCESS: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateGetListRoutings: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case routingTypes.GET_LIST_ROUTINGS_FAILURE: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateGetListRoutings: {
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
    /*                        CREATE ONE ROUTING                     */

    case routingTypes.START_CREATE_ONE_ROUTING: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateCreateOneRouting: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case routingTypes.CREATE_ONE_ROUTING_SUCCESS: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateCreateOneRouting: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case routingTypes.CREATE_ONE_ROUTING_FAILURE: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateCreateOneRouting: {
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
    /*                        CREATE ONE ROUTING                     */

    case routingTypes.START_UPDATE_ONE_ROUTING: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateUpdateOneRouting: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case routingTypes.UPDATE_ONE_ROUTING_SUCCESS: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateUpdateOneRouting: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case routingTypes.UPDATE_ONE_ROUTING_FAILURE: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateUpdateOneRouting: {
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
    /*                        GET ROUTING BY ID                    */

    case routingTypes.START_GET_ROUTING_BY_ID: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateGetRoutingById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case routingTypes.GET_ROUTING_BY_ID_SUCCESS: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateGetRoutingById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case routingTypes.GET_ROUTING_BY_ID_FAILURE: {
      const stateReducer: IRoutingsState = {
        ...state,
        stateGetRoutingById: {
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

export default routingReducer;
