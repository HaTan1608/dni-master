/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IRoutingAreaState } from "../interfaces/routingArea.interfaces";
import routingAreaTypes from "../actions/types/routingArea.types";

const initState: IRoutingAreaState = {
  stateGetListRoutingAreas: { ...rootState },
  stateCreateOneRoutingArea: { ...rootState },
  stateUpdateOneRoutingArea: { ...rootState },
};

const wareHouseAreasReducer: Reducer<IRoutingAreaState, ISyntheticAction> = (
  state: IRoutingAreaState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case routingAreaTypes.START_GET_LIST_ROUTING_AREA: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateGetListRoutingAreas: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case routingAreaTypes.GET_LIST_ROUTING_AREA_SUCCESS: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateGetListRoutingAreas: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case routingAreaTypes.GET_LIST_ROUTING_AREA_FAILURE: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateGetListRoutingAreas: {
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
    /*                  CREATE LIST USER SYSTEM                   */

    case routingAreaTypes.START_CREATE_ONE_ROUTING_AREA: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateCreateOneRoutingArea: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case routingAreaTypes.CREATE_ONE_ROUTING_AREA_SUCCESS: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateCreateOneRoutingArea: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case routingAreaTypes.CREATE_ONE_ROUTING_AREA_FAILURE: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateCreateOneRoutingArea: {
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
    /*                  UPDATE ONE USER SYSTEM                   */

    case routingAreaTypes.START_UPDATE_ONE_ROUTING_AREA: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateUpdateOneRoutingArea: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case routingAreaTypes.UPDATE_ONE_ROUTING_AREA_SUCCESS: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateUpdateOneRoutingArea: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case routingAreaTypes.UPDATE_ONE_ROUTING_AREA_FAILURE: {
      const stateReducer: IRoutingAreaState = {
        ...state,
        stateUpdateOneRoutingArea: {
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

export default wareHouseAreasReducer;
