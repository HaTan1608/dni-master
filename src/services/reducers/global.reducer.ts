/* eslint-disable */
import { Reducer } from "redux";
import { IGlobalState } from "../interfaces/global.interfaces";
import globalTypes from "../actions/types/global.types";
import { localGetTheme } from "../../utils/localStorage";
import { ISyntheticAction } from "../interfaces/root.interfaces";

// type Action =
//   | ReturnType<typeof changeTheme>
//   | ReturnType<typeof otherAction>
//   | ReturnType<typeof putSignIn>;

const initState: IGlobalState = {
  theme: localGetTheme(),
  otherState: null,
  isSignIn: null,
};

const globalReducer: Reducer<IGlobalState, ISyntheticAction> = (
  state: IGlobalState = initState,
  action: ISyntheticAction
) => {
  const { type, payload } = action;

  switch (type) {
    /*************************** START *************************/
    /*                       CHANGE THEME                      */

    case globalTypes.CHANGE_THEME: {
      const stateReducer: IGlobalState = {
        ...state,
        theme: payload.data,
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                      SET SIGN IN APP                    */

    case globalTypes.START_PUT_SIGN_IN_APP: {
      const stateReducer: IGlobalState = {
        ...state,
        isSignIn: null,
      };
      return stateReducer;
    }
    case globalTypes.PUT_SIGN_IN_APP_SUCCESS: {
      const stateReducer: IGlobalState = {
        ...state,
        isSignIn: payload.data,
      };
      return stateReducer;
    }

    /**************************** END **************************/

    default:
      return state;
  }
};

export default globalReducer;
