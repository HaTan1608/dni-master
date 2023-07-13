import { IRootState } from "./root.interfaces";

export interface IPackageState {
  stateGetListPackage: IRootState;
  stateCreatePackage: IRootState;
  stateChangeStatusPackage: IRootState;
  stateChangeStatusListDelivery: IRootState;
  stateChangeStatusBillInDelivery: IRootState;
  stateListBillPackage: IRootState;
  stateExportBillDelivery: IRootState;
  stateExportListBill: IRootState;
}
