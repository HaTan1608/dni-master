/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IWarehouseAreaState } from "../interfaces/warehouseArea.interfaces";
import warehouseAreaTypes from "../actions/types/warehouseArea.types";

const initState: IWarehouseAreaState = {
  stateGetListWarehouseAreas: { ...rootState },
  stateCreateOneWarehouseArea: { ...rootState },
  stateUpdateOneWarehouseArea: { ...rootState },
};

const wareHouseAreasReducer: Reducer<IWarehouseAreaState, ISyntheticAction> = (
  state: IWarehouseAreaState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case warehouseAreaTypes.START_GET_LIST_WAREHOUSE_AREA: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateGetListWarehouseAreas: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseAreaTypes.GET_LIST_WAREHOUSE_AREA_SUCCESS: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateGetListWarehouseAreas: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseAreaTypes.GET_LIST_WAREHOUSE_AREA_FAILURE: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateGetListWarehouseAreas: {
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

    case warehouseAreaTypes.START_CREATE_ONE_WAREHOUSE_AREA: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateCreateOneWarehouseArea: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseAreaTypes.CREATE_ONE_WAREHOUSE_AREA_SUCCESS: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateCreateOneWarehouseArea: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseAreaTypes.CREATE_ONE_WAREHOUSE_AREA_FAILURE: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateCreateOneWarehouseArea: {
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

    case warehouseAreaTypes.START_UPDATE_ONE_WAREHOUSE_AREA: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateUpdateOneWarehouseArea: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseAreaTypes.UPDATE_ONE_WAREHOUSE_AREA_SUCCESS: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateUpdateOneWarehouseArea: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseAreaTypes.UPDATE_ONE_WAREHOUSE_AREA_FAILURE: {
      const stateReducer: IWarehouseAreaState = {
        ...state,
        stateUpdateOneWarehouseArea: {
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
