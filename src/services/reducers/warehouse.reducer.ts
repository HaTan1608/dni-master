/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IWarehouseState } from "../interfaces/warehouse.interfaces";
import warehouseTypes from "../actions/types/warehouse.types";

const initState: IWarehouseState = {
  stateGetListWarehouse: { ...rootState },
  stateGetWarehouseById: { ...rootState },
  stateUpdateOneWarehouse: { ...rootState },
  stateCreateOneWarehouse: { ...rootState },
};

const warehouseReducer: Reducer<IWarehouseState, ISyntheticAction> = (
  state: IWarehouseState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case warehouseTypes.START_GET_LIST_WAREHOUSE: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateGetListWarehouse: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.GET_LIST_WAREHOUSE_SUCCESS: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateGetListWarehouse: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.GET_LIST_WAREHOUSE_FAILURE: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateGetListWarehouse: {
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
    /*                 GET USER SYSTEM BY ID                   */

    case warehouseTypes.START_GET_WAREHOUSE_BY_ID: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateGetWarehouseById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.GET_WAREHOUSE_BY_ID_SUCCESS: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateGetWarehouseById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.GET_WAREHOUSE_BY_ID_FAILURE: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateGetWarehouseById: {
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
    /*                 UPDATE ONE WAREHOUSE                 */

    case warehouseTypes.START_UPDATE_ONE_WAREHOUSE: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateUpdateOneWarehouse: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.UPDATE_ONE_WAREHOUSE_SUCCESS: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateUpdateOneWarehouse: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.UPDATE_ONE_WAREHOUSE_FAILURE: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateUpdateOneWarehouse: {
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
    /*                 CREATE ONE USER SYSTEM                  */

    case warehouseTypes.START_CREATE_ONE_WAREHOUSE: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateCreateOneWarehouse: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.CREATE_ONE_WAREHOUSE_SUCCESS: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateCreateOneWarehouse: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.CREATE_ONE_WAREHOUSE_FAILURE: {
      const stateReducer: IWarehouseState = {
        ...state,
        stateCreateOneWarehouse: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /**************************** END **************************/

    default:
      return state;
  }
};

export default warehouseReducer;
