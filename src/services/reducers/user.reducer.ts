/* eslint-disable */
import { Reducer } from "redux";
import userTypes from "../actions/types/user.types";
import { IUserState } from "../interfaces/user.interfaces";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";

const initState: IUserState = {
  stateGetListUserSystem: { ...rootState },
  stateGetUserSystemById: { ...rootState },
  stateUpdateOneUserSystem: { ...rootState },
  stateCreateOneUserSystem: { ...rootState },
  stateGetListUserGroups: { ...rootState },
  stateGetUserGroupsByid: { ...rootState },
  stateCreateOneUserGroups: { ...rootState },
  stateUpdateOneUserGroups: { ...rootState },
  stateGetListUserGroupsPrivilege: { ...rootState },
  stateChangePassByUser: { ...rootState },
};

const userReducer: Reducer<IUserState, ISyntheticAction> = (
  state: IUserState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case userTypes.START_GET_LIST_USER_SYSTEM: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserSystem: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_LIST_USER_SYSTEM_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserSystem: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_LIST_USER_SYSTEM_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserSystem: {
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

    case userTypes.START_GET_USER_SYSTEM_BY_ID: {
      const stateReducer: IUserState = {
        ...state,
        stateGetUserSystemById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_USER_SYSTEM_BY_ID_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateGetUserSystemById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_USER_SYSTEM_BY_ID_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateGetUserSystemById: {
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
    /*                 UPDATE ONE USER SYSTEM                  */

    case userTypes.START_UPDATE_ONE_USER_SYSTEM: {
      const stateReducer: IUserState = {
        ...state,
        stateUpdateOneUserSystem: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.UPDATE_ONE_USER_SYSTEM_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateUpdateOneUserSystem: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.UPDATE_ONE_USER_SYSTEM_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateUpdateOneUserSystem: {
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
    /*                 CHANGE PASSWORD BY USER                  */

    case userTypes.START_CHANGE_PASSWORD_BY_USER: {
      const stateReducer: IUserState = {
        ...state,
        stateChangePassByUser: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.UPDATE_CHANGE_PASSWORD_BY_USER_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateChangePassByUser: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.UPDATE_CHANGE_PASSWORD_BY_USER_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateChangePassByUser: {
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

    case userTypes.START_CREATE_ONE_USER_SYSTEM: {
      const stateReducer: IUserState = {
        ...state,
        stateCreateOneUserSystem: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.CREATE_ONE_USER_SYSTEM_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateCreateOneUserSystem: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.CREATE_ONE_USER_SYSTEM_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateCreateOneUserSystem: {
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
    /*                    GET LIST USER GROUP                  */

    case userTypes.START_GET_LIST_USER_GROUPS: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserGroups: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_LIST_USER_GROUPS_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserGroups: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_LIST_USER_GROUPS_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserGroups: {
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
    /*                    GET USER GROUP BY ID                 */

    case userTypes.START_GET_USER_GROUPS_BY_ID: {
      const stateReducer: IUserState = {
        ...state,
        stateGetUserGroupsByid: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_USER_GROUPS_BY_ID_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateGetUserGroupsByid: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_USER_GROUPS_BY_ID_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateGetUserGroupsByid: {
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
    /*                  CREATE ONE USER GROUP                  */

    case userTypes.START_CREATE_ONE_USER_GROUPS: {
      const stateReducer: IUserState = {
        ...state,
        stateCreateOneUserGroups: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.CREATE_ONE_USER_GROUPS_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateCreateOneUserGroups: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.CREATE_ONE_USER_GROUPS_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateCreateOneUserGroups: {
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
    /*                   UPDATE ONE USER GROUP                 */

    case userTypes.START_UPDATE_ONE_USER_GROUPS: {
      const stateReducer: IUserState = {
        ...state,
        stateUpdateOneUserGroups: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.UPDATE_ONE_USER_GROUPS_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateUpdateOneUserGroups: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.UPDATE_ONE_USER_GROUPS_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateUpdateOneUserGroups: {
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
    /*              GET LIST USER GROUP PRIVILEGE              */

    case userTypes.START_GET_LIST_USER_GROUPS_PRIVILEGE: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserGroupsPrivilege: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_SUCCESS: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserGroupsPrivilege: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_FAILURE: {
      const stateReducer: IUserState = {
        ...state,
        stateGetListUserGroupsPrivilege: {
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

export default userReducer;
