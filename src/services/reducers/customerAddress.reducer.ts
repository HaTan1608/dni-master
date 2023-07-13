/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ICustomerAddressState } from "../interfaces/customerAddress.interfaces";
import customerAddressTypes from "../actions/types/customerAddress.types";

const initState: ICustomerAddressState = {
  stateGetListCustomerAddress: { ...rootState },
  stateGetCustomerAddressById: { ...rootState },
  stateUpdateOneCustomerAddress: { ...rootState },
  stateCreateOneCustomerAddress: { ...rootState },
};

const customerAddressReducer: Reducer<
  ICustomerAddressState,
  ISyntheticAction
> = (state: ICustomerAddressState = initState, action: ISyntheticAction) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case customerAddressTypes.START_GET_LIST_CUSTOMER_ADDRESS: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateGetListCustomerAddress: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.GET_LIST_CUSTOMER_ADDRESS_SUCCESS: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateGetListCustomerAddress: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.GET_LIST_CUSTOMER_ADDRESS_FAILURE: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateGetListCustomerAddress: {
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

    case customerAddressTypes.START_GET_CUSTOMER_ADDRESS_BY_ID: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateGetCustomerAddressById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.GET_CUSTOMER_ADDRESS_BY_ID_SUCCESS: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateGetCustomerAddressById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.GET_CUSTOMER_ADDRESS_BY_ID_FAILURE: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateGetCustomerAddressById: {
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

    case customerAddressTypes.START_UPDATE_ONE_CUSTOMER_ADDRESS: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateUpdateOneCustomerAddress: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.UPDATE_ONE_CUSTOMER_ADDRESS_SUCCESS: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateUpdateOneCustomerAddress: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.UPDATE_ONE_CUSTOMER_ADDRESS_FAILURE: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateUpdateOneCustomerAddress: {
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

    case customerAddressTypes.START_CREATE_ONE_CUSTOMER_ADDRESS: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateCreateOneCustomerAddress: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.CREATE_ONE_CUSTOMER_ADDRESS_SUCCESS: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateCreateOneCustomerAddress: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerAddressTypes.CREATE_ONE_CUSTOMER_ADDRESS_FAILURE: {
      const stateReducer: ICustomerAddressState = {
        ...state,
        stateCreateOneCustomerAddress: {
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

export default customerAddressReducer;
