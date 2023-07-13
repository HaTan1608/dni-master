import { IRootState } from "./root.interfaces";

export interface ICustomerSettingState {
  stateGetListCustomerSetting: IRootState;
  stateGetCustomerSettingById: IRootState;
  stateUpdateOneCustomerSetting: IRootState;
  stateCreateCustomerSetting: IRootState;
}
