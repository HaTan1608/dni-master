/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ISupplierState } from "../interfaces/supplier.interfaces";
import supplierTypes from "../actions/types/supplier.types";

const initState: ISupplierState = {
  stateGetListSupplier: { ...rootState },
  stateGetSupplierById: { ...rootState },
  stateUpdateOneSupplier: { ...rootState },
  stateCreateOneSupplier: { ...rootState },
};

const SupplierReducer: Reducer<ISupplierState, ISyntheticAction> = (
  state: ISupplierState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case supplierTypes.START_GET_LIST_SUPPLIER: {
      const stateReducer: ISupplierState = {
        ...state,
        stateGetListSupplier: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case supplierTypes.GET_LIST_SUPPLIER_SUCCESS: {
      const stateReducer: ISupplierState = {
        ...state,
        stateGetListSupplier: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case supplierTypes.GET_SUPPLIER_BY_ID_FAILURE: {
      const stateReducer: ISupplierState = {
        ...state,
        stateGetListSupplier: {
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

    case supplierTypes.START_GET_SUPPLIER_BY_ID: {
      const stateReducer: ISupplierState = {
        ...state,
        stateGetSupplierById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case supplierTypes.GET_SUPPLIER_BY_ID_SUCCESS: {
      const stateReducer: ISupplierState = {
        ...state,
        stateGetSupplierById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case supplierTypes.GET_SUPPLIER_BY_ID_FAILURE: {
      const stateReducer: ISupplierState = {
        ...state,
        stateGetSupplierById: {
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
    /*                 UPDATE ONE Supplier                 */

    case supplierTypes.START_UPDATE_ONE_SUPPLIER: {
      const stateReducer: ISupplierState = {
        ...state,
        stateUpdateOneSupplier: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case supplierTypes.UPDATE_ONE_SUPPLIER_SUCCESS: {
      const stateReducer: ISupplierState = {
        ...state,
        stateUpdateOneSupplier: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case supplierTypes.UPDATE_ONE_SUPPLIER_FAILURE: {
      const stateReducer: ISupplierState = {
        ...state,
        stateUpdateOneSupplier: {
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

    case supplierTypes.START_CREATE_ONE_SUPPLIER: {
      const stateReducer: ISupplierState = {
        ...state,
        stateCreateOneSupplier: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case supplierTypes.CREATE_ONE_SUPPLIER_SUCCESS: {
      const stateReducer: ISupplierState = {
        ...state,
        stateCreateOneSupplier: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case supplierTypes.CREATE_ONE_SUPPLIER_FAILURE: {
      const stateReducer: ISupplierState = {
        ...state,
        stateCreateOneSupplier: {
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

export default SupplierReducer;
