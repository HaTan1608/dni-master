import { IRootState } from "./root.interfaces";

export interface ICustomerAddressState {
  stateGetListCustomerAddress: IRootState;
  stateGetCustomerAddressById: IRootState;
  stateUpdateOneCustomerAddress: IRootState;
  stateCreateOneCustomerAddress: IRootState;
}
