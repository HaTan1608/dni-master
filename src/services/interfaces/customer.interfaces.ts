import { IRootState } from "./root.interfaces";

export interface ICustomerState {
  stateGetListCustomer: IRootState;
  stateGetCustomerGroup: IRootState;
  stateGetCustomerById: IRootState;
  stateUpdateOneCustomer: IRootState;
  stateCreateOneCustomer: IRootState;
  stateGenCodeCustomerById: IRootState;
  stateImportFileCustomer:IRootState;
}
