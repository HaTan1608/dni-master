/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ICustomerState } from "../interfaces/customer.interfaces";
import customerTypes from "../actions/types/customer.types";

const initState: ICustomerState = {
  stateGetListCustomer: { ...rootState },
  stateGetCustomerById: { ...rootState },
  stateUpdateOneCustomer: { ...rootState },
  stateCreateOneCustomer: { ...rootState },
  stateGenCodeCustomerById: { ...rootState },
  stateImportFileCustomer:{ ...rootState },
  stateGetCustomerGroup:{...rootState},
};

const customerReducer: Reducer<ICustomerState, ISyntheticAction> = (
  state: ICustomerState = initState,
  action: ISyntheticAction
) => {
  const { type, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case customerTypes.START_GET_LIST_CUSTOMER: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetListCustomer: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerTypes.GET_LIST_CUSTOMER_SUCCESS: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetListCustomer: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerTypes.GET_LIST_CUSTOMER_FAILURE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetListCustomer: {
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

    case customerTypes.START_GET_CUSTOMER_BY_ID: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetCustomerById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerTypes.GET_CUSTOMER_BY_ID_SUCCESS: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetCustomerById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerTypes.GET_CUSTOMER_BY_ID_FAILURE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetCustomerById: {
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
    /*                 GEN CODE CUSTOMER BY ID                   */

    case customerTypes.START_GEN_CODE_CUSTOMER_BY_ID: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGenCodeCustomerById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerTypes.GEN_CODE_CUSTOMER_BY_ID_SUCCESS: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGenCodeCustomerById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerTypes.GEN_CODE_CUSTOMER_BY_ID_FAILURE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGenCodeCustomerById: {
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

    case customerTypes.START_UPDATE_ONE_CUSTOMER: {
      const stateReducer: ICustomerState = {
        ...state,
        stateUpdateOneCustomer: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerTypes.UPDATE_ONE_CUSTOMER_SUCCESS: {
      const stateReducer: ICustomerState = {
        ...state,
        stateUpdateOneCustomer: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerTypes.UPDATE_ONE_CUSTOMER_FAILURE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateUpdateOneCustomer: {
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

    case customerTypes.START_CREATE_ONE_CUSTOMER: {
      const stateReducer: ICustomerState = {
        ...state,
        stateCreateOneCustomer: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerTypes.CREATE_ONE_CUSTOMER_SUCCESS: {
      const stateReducer: ICustomerState = {
        ...state,
        stateCreateOneCustomer: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerTypes.CREATE_ONE_CUSTOMER_FAILURE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateCreateOneCustomer: {
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

    case customerTypes.START_IMPORT_FILE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateImportFileCustomer: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerTypes.IMPORT_FILE_SUCCESS: {
      const stateReducer: ICustomerState = {
        ...state,
        stateImportFileCustomer: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerTypes.IMPORT_FILE_FAILURE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateImportFileCustomer: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/
    //stateGetCustomerGroup
    case customerTypes.START_GET_CUSTOMER_GROUP: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetCustomerGroup: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case customerTypes.GET_CUSTOMER_GROUP_SUCCESS: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetCustomerGroup: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case customerTypes.GET_CUSTOMER_GROUP_FAILURE: {
      const stateReducer: ICustomerState = {
        ...state,
        stateGetCustomerGroup: {
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

export default customerReducer;
