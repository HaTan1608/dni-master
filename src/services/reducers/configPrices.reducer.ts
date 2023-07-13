/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IConfigPricesState } from "../interfaces/configPrices.interfaces";
import configPricesTypes from "../actions/types/config-prices.types";

const initState: IConfigPricesState = {
  stateGetListConfigPrices: { ...rootState },
  stateGetConfigPricesById: { ...rootState },
  stateUpdateOneConfigPrices: { ...rootState },
  stateCreateOneConfigPrices: { ...rootState },
  stateUpdateOneConfigPricesDetails: { ...rootState },
  stateGetListConfigPricesDetails: { ...rootState },
  stateCreateOneConfigPricesDetails: { ...rootState },
  stateUpdateOneConfigPricesApplys: { ...rootState },
  stateGetListConfigPricesApplys: { ...rootState },
};

const configPricesReducer: Reducer<IConfigPricesState, ISyntheticAction> = (
  state: IConfigPricesState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case configPricesTypes.START_GET_LIST_CONFIG_PRICES: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPrices: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_LIST_CONFIG_PRICES_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPrices: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_LIST_CONFIG_PRICES_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPrices: {
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

    case configPricesTypes.START_GET_CONFIG_PRICES_BY_ID: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetConfigPricesById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_CONFIG_PRICES_BY_ID_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetConfigPricesById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_CONFIG_PRICES_BY_ID_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetConfigPricesById: {
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

    case configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPrices: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.UPDATE_ONE_CONFIG_PRICES_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPrices: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.UPDATE_ONE_CONFIG_PRICES_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPrices: {
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

    case configPricesTypes.START_CREATE_ONE_CONFIG_PRICES: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateCreateOneConfigPrices: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.CREATE_ONE_CONFIG_PRICES_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateCreateOneConfigPrices: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.CREATE_ONE_CONFIG_PRICES_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateCreateOneConfigPrices: {
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

    case configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES_DETAILS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPricesDetails: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.UPDATE_ONE_CONFIG_PRICES_DETAILS_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPricesDetails: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.UPDATE_ONE_CONFIG_PRICES_DETAILS_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPricesDetails: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case configPricesTypes.START_GET_LIST_CONFIG_PRICES_DETAILS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPricesDetails: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_LIST_CONFIG_PRICES_DETAILS_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPricesDetails: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_LIST_CONFIG_PRICES_DETAILS_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPricesDetails: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case configPricesTypes.START_CREATE_ONE_CONFIG_PRICES_DETAILS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateCreateOneConfigPricesDetails: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.CREATE_ONE_CONFIG_PRICES_DETAILS_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateCreateOneConfigPricesDetails: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.CREATE_ONE_CONFIG_PRICES_DETAILS_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateCreateOneConfigPricesDetails: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case configPricesTypes.START_UPDATE_ONE_CONFIG_PRICES_APPLYS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPricesApplys: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.UPDATE_ONE_CONFIG_PRICES_APPLYS_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPricesApplys: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.UPDATE_ONE_CONFIG_PRICES_APPLYS_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateUpdateOneConfigPricesApplys: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case configPricesTypes.START_GET_LIST_CONFIG_PRICES_APPLYS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPricesApplys: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_LIST_CONFIG_PRICES_APPLYS_SUCCESS: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPricesApplys: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configPricesTypes.GET_LIST_CONFIG_PRICES_APPLYS_FAILURE: {
      const stateReducer: IConfigPricesState = {
        ...state,
        stateGetListConfigPricesApplys: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    default:
      return state;
  }
};

export default configPricesReducer;
