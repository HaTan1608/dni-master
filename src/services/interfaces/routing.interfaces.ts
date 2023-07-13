import { IRootState } from "./root.interfaces";

export interface IRoutingsState {
  stateGetListRoutings: IRootState;
  stateCreateOneRouting: IRootState;
  stateUpdateOneRouting: IRootState;
  stateGetRoutingById: IRootState;
}
