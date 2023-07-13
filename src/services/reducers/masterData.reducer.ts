/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IMasterDataState } from "../interfaces/masterData.interfaces";
import masterDataTypes from "../actions/types/masterData.types";

const initState: IMasterDataState = {
  stateProvince: { ...rootState },
  stateDistrict: { ...rootState },
  stateWard: { ...rootState },
  stateRole: { ...rootState },
  stateBanks: { ...rootState },
  stateBranchBanks: { ...rootState },
};

const masterDataReducer: Reducer<IMasterDataState, ISyntheticAction> = (
  state: IMasterDataState = initState,
  action: ISyntheticAction
) => {
  const { type, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST PROVINCES                   */

    case masterDataTypes.START_GET_LIST_PROVINCE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateProvince: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_PROVINCE_SUCCESS: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateProvince: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_PROVINCE_FAILURE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateProvince: {
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
    /*                  GET LIST DISTRICTS                   */

    case masterDataTypes.START_GET_LIST_DISTRICT: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateDistrict: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_DISTRICT_SUCCESS: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateDistrict: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_DISTRICT_FAILURE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateDistrict: {
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
    /*                  GET LIST WARDS                   */

    case masterDataTypes.START_GET_LIST_WARD: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateWard: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_WARD_SUCCESS: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateWard: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_WARD_FAILURE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateWard: {
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
    /*                  GET LIST ROLE                   */

    case masterDataTypes.START_GET_LIST_ROLE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateRole: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_ROLE_SUCCESS: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateRole: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_ROLE_FAILURE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateRole: {
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
    /*                  GET LIST BANK                   */

    case masterDataTypes.START_GET_LIST_BANK: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateBanks: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_BANK_SUCCESS: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateBanks: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_BANK_FAILURE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateBanks: {
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
    /*                  GET LIST BRANCH BANK                   */

    case masterDataTypes.START_GET_LIST_BRANCH_BANK: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateBranchBanks: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_BRANCH_BANK_SUCCESS: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateBranchBanks: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case masterDataTypes.GET_LIST_BRANCH_BANK_FAILURE: {
      const stateReducer: IMasterDataState = {
        ...state,
        stateBranchBanks: {
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

export default masterDataReducer;
