/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IWareHouseUsersState } from "../interfaces/wareHouseUsers.interfaces";
import warehouseTypes from "../actions/types/warehouseUsers.types";

const initState: IWareHouseUsersState = {
  stateGetListWarehouseUser: { ...rootState },
  stateCreateOneWarehouseUser: { ...rootState },
  stateUpdateOneWarehouseUser: { ...rootState },
};

const wareHouseUsersReducer: Reducer<IWareHouseUsersState, ISyntheticAction> = (
  state: IWareHouseUsersState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case warehouseTypes.START_GET_LIST_WAREHOUSE_USER: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateGetListWarehouseUser: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.GET_LIST_WAREHOUSE_USER_SUCCESS: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateGetListWarehouseUser: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.GET_LIST_WAREHOUSE_USER_FAILURE: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateGetListWarehouseUser: {
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

    case warehouseTypes.START_CREATE_ONE_WAREHOUSE_USER: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateCreateOneWarehouseUser: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.CREATE_ONE_WAREHOUSE_USER_SUCCESS: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateCreateOneWarehouseUser: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.CREATE_ONE_WAREHOUSE_USER_FAILURE: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateCreateOneWarehouseUser: {
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

    case warehouseTypes.START_UPDATE_ONE_WAREHOUSE_USER: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateUpdateOneWarehouseUser: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.UPDATE_ONE_WAREHOUSE_USER_SUCCESS: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateUpdateOneWarehouseUser: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case warehouseTypes.UPDATE_ONE_WAREHOUSE_USER_FAILURE: {
      const stateReducer: IWareHouseUsersState = {
        ...state,
        stateUpdateOneWarehouseUser: {
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

export default wareHouseUsersReducer;
