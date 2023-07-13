/* eslint-disable */
import { Reducer } from "redux";
import shopTypes from "../actions/types/shop.types";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IShopState } from "../interfaces/shop.interfaces";

const initState: IShopState = {
  stateListShop: { ...rootState },
};

const shopReducer: Reducer<IShopState, ISyntheticAction> = (
  state: IShopState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                        GET ALL SHOP                     */

    case shopTypes.START_GET_LIST_SHOP: {
      const stateReducer: IShopState = {
        ...state,
        stateListShop: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shopTypes.GET_LIST_SHOP_SUCCESS: {
      const stateReducer: IShopState = {
        ...state,
        stateListShop: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shopTypes.GET_LIST_SHOP_FAILURE: {
      const stateReducer: IShopState = {
        ...state,
        stateListShop: {
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
