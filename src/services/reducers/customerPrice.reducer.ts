/* eslint-disable */
import { Reducer } from "redux";
import customerPriceTypes from "../actions/types/customerPrice.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ICustomerPriceState } from "../interfaces/customerPrice.interfaces";

const initState: ICustomerPriceState = {
  stateGetCustomerPriceById: { ...rootState },
  stateGetListCustomerPrice: { ...rootState },
};

const shopReducer: Reducer<ICustomerPriceState, ISyntheticAction> = (
  state: ICustomerPriceState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                        GET ALL CUSTOMER PRICE                     */

    case customerPriceTypes.START_GET_LIST_CUSTOMER_PRICE: {
      const stateReducer: ICustomerPriceState = {
        ...state,
        stateGetListCustomerPrice: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerPriceTypes.GET_LIST_CUSTOMER_PRICE_SUCCESS: {
      const stateReducer: ICustomerPriceState = {
        ...state,
        stateGetListCustomerPrice: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerPriceTypes.GET_LIST_CUSTOMER_PRICE_FAILURE: {
      const stateReducer: ICustomerPriceState = {
        ...state,
        stateGetListCustomerPrice: {
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
    /*                        GET ALL CUSTOMER PRICE                     */

    case customerPriceTypes.START_GET_LIST_CUSTOMER_PRICE_BY_ID: {
      const stateReducer: ICustomerPriceState = {
        ...state,
        stateGetCustomerPriceById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerPriceTypes.GET_LIST_CUSTOMER_BY_ID_PRICE_SUCCESS: {
      const stateReducer: ICustomerPriceState = {
        ...state,
        stateGetCustomerPriceById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerPriceTypes.GET_LIST_CUSTOMER_BY_ID_PRICE_FAILURE: {
      const stateReducer: ICustomerPriceState = {
        ...state,
        stateGetCustomerPriceById: {
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

export default shopReducer;
