/* eslint-disable */
import { Reducer } from "redux";
import verhiclesTypes from "../actions/types/vehicles.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IContState } from "../interfaces/vehicles.interfaces";

const initState: IContState = {
  stateListVerhicles: { ...rootState },
  stateCreateVerhicle: { ...rootState },
  stateUpdateVehicle: { ...rootState },
};

const verhiclesReducer: Reducer<IContState, ISyntheticAction> = (
  state: IContState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                        GET ALL SO COnt                   */

    case verhiclesTypes.START_GET_LIST_VERHICLE: {
      const stateReducer: IContState = {
        ...state,
        stateListVerhicles: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case verhiclesTypes.GET_LIST_VERHICLE_SUCCESS: {
      const stateReducer: IContState = {
        ...state,
        stateListVerhicles: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case verhiclesTypes.GET_LIST_VERHICLE_FAILURE: {
      const stateReducer: IContState = {
        ...state,
        stateListVerhicles: {
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
    /*                        CREATE SO CONT                */
    case verhiclesTypes.START_CREATE_VERHICLE: {
      const stateReducer: IContState = {
        ...state,
        stateCreateVerhicle: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case verhiclesTypes.CREATE_VERHICLE_SUCCESS: {
      const stateReducer: IContState = {
        ...state,
        stateCreateVerhicle: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case verhiclesTypes.CREATE_VERHICLE_FAILURE: {
      const stateReducer: IContState = {
        ...state,
        stateCreateVerhicle: {
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
    /*                        UPDATE SO VEHICLE                */
    case verhiclesTypes.START_UPDATE_VERHICLE: {
      const stateReducer: IContState = {
        ...state,
        stateUpdateVehicle: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case verhiclesTypes.UPDATE_VERHICLE_SUCCESS: {
      const stateReducer: IContState = {
        ...state,
        stateUpdateVehicle: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case verhiclesTypes.UPDATE_VERHICLE_FAILURE: {
      const stateReducer: IContState = {
        ...state,
        stateUpdateVehicle: {
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

export default verhiclesReducer;
