import { IRootState } from "./root.interfaces";

export interface IWarehouseState {
  stateGetListWarehouse: IRootState;
  stateGetWarehouseById: IRootState;
  stateUpdateOneWarehouse: IRootState;
  stateCreateOneWarehouse: IRootState;
}
