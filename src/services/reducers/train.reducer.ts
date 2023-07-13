/* eslint-disable */
import { Reducer } from "redux";
import shopTypes from "../actions/types/trains.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ITrainState } from "../interfaces/trains.interfaces";

const initState: ITrainState = {
  stateListTrains: { ...rootState },
  stateCreateTrain: { ...rootState },
  stateUpdateTrain: { ...rootState },
};

const trainReducer: Reducer<ITrainState, ISyntheticAction> = (
  state: ITrainState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                        GET ALL TRAINS                     */

    case shopTypes.START_GET_LIST_TRAINS: {
      const stateReducer: ITrainState = {
        ...state,
        stateListTrains: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shopTypes.GET_LIST_TRAINS_SUCCESS: {
      const stateReducer: ITrainState = {
        ...state,
        stateListTrains: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shopTypes.GET_LIST_TRAINS_FAILURE: {
      const stateReducer: ITrainState = {
        ...state,
        stateListTrains: {
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
    /*                         CREATE TRAIN                     */

    case shopTypes.START_CREATE_TRAINS: {
      const stateReducer: ITrainState = {
        ...state,
        stateCreateTrain: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shopTypes.CREATE_TRAINS_SUCCESS: {
      const stateReducer: ITrainState = {
        ...state,
        stateCreateTrain: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shopTypes.CREATE_TRAINS_FAILURE: {
      const stateReducer: ITrainState = {
        ...state,
        stateCreateTrain: {
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
    /*                         UPDATE TRAIN                     */

    case shopTypes.START_UPDATE_TRAINS: {
      const stateReducer: ITrainState = {
        ...state,
        stateUpdateTrain: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shopTypes.UPDATE_TRAINS_SUCCESS: {
      const stateReducer: ITrainState = {
        ...state,
        stateUpdateTrain: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shopTypes.UPDATE_TRAINS_FAILURE: {
      const stateReducer: ITrainState = {
        ...state,
        stateUpdateTrain: {
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

export default trainReducer;
