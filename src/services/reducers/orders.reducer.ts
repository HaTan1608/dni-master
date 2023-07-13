/* eslint-disable */
import { Reducer } from "redux";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IOrdersState } from "../interfaces/orders.interfaces";
import ordersTypes from "../actions/types/orders.types";

const initState: IOrdersState = {
  stateGetListOrders: { ...rootState },
  stateGetOrdersById: { ...rootState },
  stateUpdateOneOrders: { ...rootState },
  stateCreateOneOrders: { ...rootState },
  stateChangeStatusBills: { ...rootState },
  stateCreateOrdersByFile: { ...rootState },
  stateCreateDeliveryBill: { ...rootState },
  stateListDeliveryBill: { ...rootState },
  stateDeliveryBillById: { ...rootState },
  stateUpdateDeliveryBill: { ...rootState },
  stateCreateOrdersArrayByFile: { ...rootState },
  stateGetListOfDebt: { ...rootState },
  stateCreatePakageDebtList:{ ...rootState },
  stateGetPakageDebtList:{ ...rootState },
  stateGetPakageDebtListById:{ ...rootState },
  stateCompletePakageDebtList:{ ...rootState },
  stateDeleteOrCompletePakageDebtList:{ ...rootState },
  stateGetExportPakageDebtList:{ ...rootState },
  stateGetExportPakageDebtListDetail:{ ...rootState },
};

const ordersReducer: Reducer<IOrdersState, ISyntheticAction> = (
  state: IOrdersState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                  GET LIST USER SYSTEM                   */

    case ordersTypes.START_GET_LIST_ORDERS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetListOrders: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_LIST_ORDERS_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetListOrders: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_LIST_ORDERS_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetListOrders: {
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

    case ordersTypes.START_GET_ORDERS_BY_ID: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetOrdersById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_ORDERS_BY_ID_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetOrdersById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_ORDERS_BY_ID_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetOrdersById: {
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

    case ordersTypes.START_UPDATE_ONE_ORDERS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateUpdateOneOrders: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.UPDATE_ONE_ORDERS_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateUpdateOneOrders: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.UPDATE_ONE_ORDERS_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateUpdateOneOrders: {
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

    case ordersTypes.START_CREATE_ONE_ORDERS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOneOrders: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_ONE_ORDERS_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOneOrders: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_ONE_ORDERS_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOneOrders: {
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
    case ordersTypes.START_CHANGE_STATUS_BILLS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateChangeStatusBills: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CHANGE_STATUS_BILLS_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateChangeStatusBills: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CHANGE_STATUS_BILLS_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateChangeStatusBills: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case ordersTypes.START_CREATE_ORDERS_BY_FILE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOrdersByFile: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_ORDERS_BY_FILE_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOrdersByFile: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_ORDERS_BY_FILE_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOrdersByFile: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case ordersTypes.START_CREATE_ORDERS_ARRAY_BY_FILE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOrdersArrayByFile: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_ORDERS_ARRAY_BY_FILE_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOrdersArrayByFile: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_ORDERS_ARRAY_BY_FILE_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateOrdersArrayByFile: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case ordersTypes.START_GET_LIST_DELIVERY_BILL: {
      const stateReducer: IOrdersState = {
        ...state,
        stateListDeliveryBill: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_LIST_DELIVERY_BILL_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateListDeliveryBill: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_LIST_DELIVERY_BILL_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateListDeliveryBill: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case ordersTypes.START_GET_DELIVERY_BILL_BY_ID: {
      const stateReducer: IOrdersState = {
        ...state,
        stateDeliveryBillById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_DELIVERY_BILL_BY_ID_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateDeliveryBillById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_DELIVERY_BILL_BY_ID_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateDeliveryBillById: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case ordersTypes.START_CREATE_DELIVERY_BILL: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateDeliveryBill: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_DELIVERY_BILL_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateDeliveryBill: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_DELIVERY_BILL_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreateDeliveryBill: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    case ordersTypes.START_UPDATE_DELIVERY_BILL: {
      const stateReducer: IOrdersState = {
        ...state,
        stateUpdateDeliveryBill: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.UPDATE_DELIVERY_BILL_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateUpdateDeliveryBill: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.UPDATE_DELIVERY_BILL_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateUpdateDeliveryBill: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //list-of-debt
    case ordersTypes.START_GET_LIST_OF_DEBT: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetListOfDebt: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_LIST_OF_DEBT_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetListOfDebt: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_LIST_OF_DEBT_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetListOfDebt: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //stateCreatePakageDebtList
    case ordersTypes.START_CREATE_LIST_OF_DEBT: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreatePakageDebtList: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_LIST_OF_DEBT_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreatePakageDebtList: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.CREATE_LIST_OF_DEBT_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCreatePakageDebtList: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //stateGetPakageDebtList
    case ordersTypes.START_GET_PAKAGE_DEBT_LIST: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetPakageDebtList: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_PAKAGE_DEBT_LIST_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetPakageDebtList: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_PAKAGE_DEBT_LIST_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetPakageDebtList: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //stateGetPakageDebtListById
    case ordersTypes.START_GET_PAKAGE_DEBT_LIST_BY_ID: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetPakageDebtListById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_PAKAGE_DEBT_LIST_BY_ID_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetPakageDebtListById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.GET_PAKAGE_DEBT_LIST_BY_ID_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetPakageDebtListById: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //stateCompletePakageDebtList
    case ordersTypes.START_COMPLETE_PAKAGE_DEBT_LIST: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCompletePakageDebtList: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.COMPLETE_PAKAGE_DEBT_LIST_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCompletePakageDebtList: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.COMPLETE_PAKAGE_DEBT_LIST_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateCompletePakageDebtList: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //stateDeleteOrCompletePakageDebtList
    case ordersTypes.START_COMPLETE_OR_DELETE_PAKAGE_DEBT_LIST_BY_ID: {
      const stateReducer: IOrdersState = {
        ...state,
        stateDeleteOrCompletePakageDebtList: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.COMPLETE_OR_DELETE_PAKAGE_DEBT_LIST_SUCCESS_BY_ID: {
      const stateReducer: IOrdersState = {
        ...state,
        stateDeleteOrCompletePakageDebtList: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.COMPLETE_OR_DELETE_PAKAGE_DEBT_LIST_FAILURE_BY_ID: {
      const stateReducer: IOrdersState = {
        ...state,
        stateDeleteOrCompletePakageDebtList: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //stateGetExportPakageDebtList
    case ordersTypes.START_EXPORT_EXCEL_PACKAGE_DEBT_LIST: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetExportPakageDebtList: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetExportPakageDebtList: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetExportPakageDebtList: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
    //stateGetExportPakageDebtListDetail
    case ordersTypes.START_EXPORT_EXCEL_PACKAGE_DEBT_LIST_DETAIL: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetExportPakageDebtListDetail: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_DETAIL_SUCCESS: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetExportPakageDebtListDetail: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case ordersTypes.EXPORT_EXCEL_PACKAGE_DEBT_LIST_DETAIL_FAILURE: {
      const stateReducer: IOrdersState = {
        ...state,
        stateGetExportPakageDebtListDetail: {
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

export default ordersReducer;
