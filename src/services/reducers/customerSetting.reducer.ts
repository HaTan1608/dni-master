/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ICustomerSettingState } from "../interfaces/customerSetting.interfaces";
import customerSettingTypes from "../actions/types/customerSetting.types";

const initState: ICustomerSettingState = {
  stateGetListCustomerSetting: { ...rootState },
  stateGetCustomerSettingById: { ...rootState },
  stateUpdateOneCustomerSetting: { ...rootState },
  stateCreateCustomerSetting: { ...rootState },
};

const customerSettingReducer: Reducer<
  ICustomerSettingState,
  ISyntheticAction
> = (state: ICustomerSettingState = initState, action: ISyntheticAction) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case customerSettingTypes.START_GET_LIST_CUSTOMER_SETTING: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateGetListCustomerSetting: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerSettingTypes.GET_LIST_CUSTOMER_SETTING_SUCCESS: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateGetListCustomerSetting: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerSettingTypes.GET_LIST_CUSTOMER_SETTING_FAILURE: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateGetListCustomerSetting: {
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

    case customerSettingTypes.START_GET_CUSTOMER_SETTING_BY_ID: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateGetCustomerSettingById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerSettingTypes.GET_CUSTOMER_SETTING_BY_ID_SUCCESS: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateGetCustomerSettingById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerSettingTypes.GET_CUSTOMER_SETTING_BY_ID_FAILURE: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateGetCustomerSettingById: {
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

    case customerSettingTypes.START_UPDATE_ONE_CUSTOMER_SETTING: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateUpdateOneCustomerSetting: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerSettingTypes.UPDATE_ONE_CUSTOMER_SETTING_SUCCESS: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateUpdateOneCustomerSetting: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerSettingTypes.UPDATE_ONE_CUSTOMER_SETTING_FAILURE: {
      const stateReducer: ICustomerSettingState = {
        ...state,
        stateUpdateOneCustomerSetting: {
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

      case customerSettingTypes.START_CREATE_CUSTOMER_SETTING: {
        const stateReducer: ICustomerSettingState = {
          ...state,
          stateCreateCustomerSetting: {
            ...rootState,
            isLoading: true
          }
        };
        return stateReducer;
      }
      case customerSettingTypes.CREATE_CUSTOMER_SETTING_SUCCESS: {
        const stateReducer: ICustomerSettingState = {
          ...state,
          stateCreateCustomerSetting: {
            ...rootState,
            isLoading: false,
            data: response.data,
            message: response.message,
            success: response.success,
          }
        };
        return stateReducer;
      }
      case customerSettingTypes.CREATE_CUSTOMER_SETTING_FAILURE: {
        const stateReducer: ICustomerSettingState = {
          ...state,
          stateCreateCustomerSetting: {
            ...rootState,
            isLoading: false,
            message: response.message,
            error: true,
          }
        };
        return stateReducer;
      }

    //   /**************************** END **************************/

    /**************************** END **************************/

    default:
      return state;
  }
};

export default customerSettingReducer;
