/* eslint-disable */
import { Reducer } from "redux";
import accountTypes from "../actions/types/account.types";
import { IAccountState } from "../interfaces/account.interfaces";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";

const initState: IAccountState = {
  stateSignIn: { ...rootState },
  stateRegister: { ...rootState },
  stateForgetPass: { ...rootState },
  stateChangePass: { ...rootState },
  stateConfirmAccount: { ...rootState },
};

const accountReducer: Reducer<IAccountState, ISyntheticAction> = (
  state: IAccountState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                       LOGIN ACCOUNT                     */

    case accountTypes.START_SIGNIN: {
      const stateReducer: IAccountState = {
        ...state,
        stateSignIn: {
          ...rootState,
          isLoading: true,
        },
        phone: payload.params?.phone,
        email: payload.params?.email,
      };
      return stateReducer;
    }
    case accountTypes.SIGNIN_SUCCESS: {
      const stateReducer: IAccountState = {
        ...state,
        stateSignIn: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case accountTypes.SIGNIN_FAILURE: {
      const stateReducer: IAccountState = {
        ...state,
        stateSignIn: {
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
    /*                       REGISTER ACCOUNT                     */
    case accountTypes.START_REGISTER: {
      const stateReducer: IAccountState = {
        ...state,
        stateRegister: {
          ...rootState,
          isLoading: true,
        },
        phone: payload.params?.phone,
        email: payload.params?.email,
      };
      return stateReducer;
    }
    case accountTypes.REGISTER_SUCCESS: {
      const stateReducer: IAccountState = {
        ...state,
        stateRegister: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case accountTypes.REGISTER_FAILURE: {
      const stateReducer: IAccountState = {
        ...state,
        stateRegister: {
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
    /*                       FORGET ACCOUNT                     */
    case accountTypes.START_FORGET_PASSWORD: {
      const stateReducer: IAccountState = {
        ...state,
        stateForgetPass: {
          ...rootState,
          isLoading: true,
        },
        phone: payload.params?.phone,
        email: payload.params?.email,
      };
      return stateReducer;
    }
    case accountTypes.FORGET_PASSWORD_SUCCESS: {
      const stateReducer: IAccountState = {
        ...state,
        stateForgetPass: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case accountTypes.FORGET_PASSWORD_FAILURE: {
      const stateReducer: IAccountState = {
        ...state,
        stateForgetPass: {
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
    /*                       CHANGE ACCOUNT                     */
    case accountTypes.START_CHANGE_PASSWORD: {
      const stateReducer: IAccountState = {
        ...state,
        stateChangePass: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case accountTypes.CHANGE_PASSWORD_SUCCESS: {
      const stateReducer: IAccountState = {
        ...state,
        stateChangePass: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
        activationCode: null,
      };
      return stateReducer;
    }
    case accountTypes.CHANGE_PASSWORD_FAILURE: {
      const stateReducer: IAccountState = {
        ...state,
        stateChangePass: {
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
    /*                       CONFIRM ACCOUNT                     */
    case accountTypes.START_CONFIRM_ACCOUNT: {
      const stateReducer: IAccountState = {
        ...state,
        stateConfirmAccount: {
          ...rootState,
          isLoading: true,
        },
        activationCode: payload.params?.code,
      };
      return stateReducer;
    }
    case accountTypes.CONFIRM_ACCOUNT_SUCCESS: {
      const stateReducer: IAccountState = {
        ...state,
        stateConfirmAccount: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case accountTypes.CONFIRM_ACCOUNT_FAILURE: {
      const stateReducer: IAccountState = {
        ...state,
        stateConfirmAccount: {
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

export default accountReducer;
