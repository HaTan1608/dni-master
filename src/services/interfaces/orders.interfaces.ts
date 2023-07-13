import { IRootState } from "./root.interfaces";

export interface IOrdersState {
  stateGetListOrders: IRootState;
  stateGetOrdersById: IRootState;
  stateUpdateOneOrders: IRootState;
  stateCreateOneOrders: IRootState;
  stateChangeStatusBills: IRootState;
  stateCreateOrdersByFile: IRootState;
  stateCreateDeliveryBill: IRootState;
  stateListDeliveryBill: IRootState;
  stateDeliveryBillById: IRootState;
  stateUpdateDeliveryBill: IRootState;
  stateCreateOrdersArrayByFile: IRootState;
  stateGetListOfDebt: IRootState;
  stateCreatePakageDebtList:IRootState;
  stateGetPakageDebtList:IRootState;
  stateGetPakageDebtListById:IRootState;
  stateCompletePakageDebtList:IRootState;
  stateDeleteOrCompletePakageDebtList:IRootState;
  stateGetExportPakageDebtList:IRootState;
  stateGetExportPakageDebtListDetail:IRootState;
}
