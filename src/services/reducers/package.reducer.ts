/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IPackageState } from "../interfaces/package.interfaces";
import packageTypes from "../actions/types/package.types";

const initState: IPackageState = {
  stateGetListPackage: { ...rootState },
  stateCreatePackage: { ...rootState },
  stateChangeStatusPackage: { ...rootState },
  stateChangeStatusListDelivery: { ...rootState },
  stateChangeStatusBillInDelivery: { ...rootState },
  stateListBillPackage: { ...rootState },
  stateExportBillDelivery: { ...rootState },
  stateExportListBill:{ ...rootState },
};

const packageReducer: Reducer<IPackageState, ISyntheticAction> = (
  state: IPackageState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */
    case packageTypes.START_EXPORT_BILL_DELIVERY: {
      const stateReducer: IPackageState = {
        ...state,
        stateExportBillDelivery: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.EXPORT_BILL_DELIVREY_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateExportBillDelivery: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.EXPORT_BILL_DELIVREY_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateExportBillDelivery: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case packageTypes.START_GET_LIST_PACKAGE: {
      const stateReducer: IPackageState = {
        ...state,
        stateGetListPackage: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.GET_LIST_PACKAGE_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateGetListPackage: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.GET_LIST_PACKAGE_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateGetListPackage: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case packageTypes.START_GET_LIST_BILL_PACKAGE: {
      const stateReducer: IPackageState = {
        ...state,
        stateListBillPackage: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.GET_LIST_BILL_PACKAGE_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateListBillPackage: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.GET_LIST_BILL_PACKAGE_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateListBillPackage: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case packageTypes.START_CREATE_PACKAGE: {
      const stateReducer: IPackageState = {
        ...state,
        stateCreatePackage: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.CREATE_PACKAGE_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateCreatePackage: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.CREATE_PACKAGE_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateCreatePackage: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case packageTypes.START_CHANGE_STATUS_PACKAGE: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusPackage: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.CHANGE_STATUS_PACKAGE_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusPackage: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.CHANGE_STATUS_PACKAGE_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusPackage: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case packageTypes.START_CHANGE_STATUS_LIST_DELIVERY: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusListDelivery: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.CHANGE_STATUS_LIST_DELIVERY_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusListDelivery: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.CHANGE_STATUS_LIST_DELIVERY_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusListDelivery: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case packageTypes.START_CHANGE_STATUS_BILL_IN_DELIVERY: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusBillInDelivery: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.CHANGE_STATUS_BILL_IN_DELIVERY_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusBillInDelivery: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.CHANGE_STATUS_BILL_IN_DELIVERY_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateChangeStatusBillInDelivery: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

     /*************************** START *************************/
    /*                        GET ALL reason                     */

    case packageTypes.START_EXPORT_LIST_BILL: {
      const stateReducer: IPackageState = {
        ...state,
        stateExportListBill: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case packageTypes.EXPORT_LIST_BILL_SUCCESS: {
      const stateReducer: IPackageState = {
        ...state,
        stateExportListBill: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case packageTypes.EXPORT_LIST_BILL_FAILURE: {
      const stateReducer: IPackageState = {
        ...state,
        stateExportListBill: {
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

export default packageReducer;
