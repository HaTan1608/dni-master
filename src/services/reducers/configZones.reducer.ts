/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IConfigZonesState } from "../interfaces/configZones.interfaces";
import configZonesTypes from "../actions/types/config-zones.types";

const initState: IConfigZonesState = {
  stateGetListConfigZones: { ...rootState },
  stateGetConfigZonesById: { ...rootState },
  stateUpdateOneConfigZones: { ...rootState },
  stateCreateOneConfigZones: { ...rootState },
  stateUpdateOneConfigZonesDetails: { ...rootState },
  stateGetListConfigZonesDetails: { ...rootState },
};

const configZonesReducer: Reducer<IConfigZonesState, ISyntheticAction> = (
  state: IConfigZonesState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case configZonesTypes.START_GET_LIST_CONFIG_ZONES: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetListConfigZones: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.GET_LIST_CONFIG_ZONES_SUCCESS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetListConfigZones: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.GET_LIST_CONFIG_ZONES_FAILURE: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetListConfigZones: {
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

    case configZonesTypes.START_GET_CONFIG_ZONES_BY_ID: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetConfigZonesById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.GET_CONFIG_ZONES_BY_ID_SUCCESS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetConfigZonesById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.GET_CONFIG_ZONES_BY_ID_FAILURE: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetConfigZonesById: {
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

    case configZonesTypes.START_UPDATE_ONE_CONFIG_ZONES: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateUpdateOneConfigZones: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.UPDATE_ONE_CONFIG_ZONES_SUCCESS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateUpdateOneConfigZones: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.UPDATE_ONE_CONFIG_ZONES_FAILURE: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateUpdateOneConfigZones: {
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

    case configZonesTypes.START_CREATE_ONE_CONFIG_ZONES: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateCreateOneConfigZones: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.CREATE_ONE_CONFIG_ZONES_SUCCESS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateCreateOneConfigZones: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.CREATE_ONE_CONFIG_ZONES_FAILURE: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateCreateOneConfigZones: {
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

    case configZonesTypes.START_UPDATE_ONE_CONFIG_ZONES_DETAILS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateUpdateOneConfigZonesDetails: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.UPDATE_ONE_CONFIG_ZONES_DETAILS_SUCCESS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateUpdateOneConfigZonesDetails: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.UPDATE_ONE_CONFIG_ZONES_DETAILS_FAILURE: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateUpdateOneConfigZonesDetails: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case configZonesTypes.START_GET_LIST_CONFIG_ZONES_DETAILS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetListConfigZonesDetails: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.GET_LIST_CONFIG_ZONES_DETAILS_SUCCESS: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetListConfigZonesDetails: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case configZonesTypes.GET_LIST_CONFIG_ZONES_DETAILS_FAILURE: {
      const stateReducer: IConfigZonesState = {
        ...state,
        stateGetListConfigZonesDetails: {
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

export default configZonesReducer;
