import { IRootState } from "./root.interfaces";

export interface ISupplierState {
  stateGetListSupplier: IRootState;
  stateGetSupplierById: IRootState;
  stateUpdateOneSupplier: IRootState;
  stateCreateOneSupplier: IRootState;
}
