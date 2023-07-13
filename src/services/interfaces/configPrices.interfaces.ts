import { IRootState } from "./root.interfaces";

export interface IConfigPricesState {
  stateGetListConfigPrices: IRootState;
  stateGetConfigPricesById: IRootState;
  stateUpdateOneConfigPrices: IRootState;
  stateCreateOneConfigPrices: IRootState;
  stateUpdateOneConfigPricesDetails: IRootState;
  stateGetListConfigPricesDetails: IRootState;
  stateCreateOneConfigPricesDetails: IRootState;
  stateUpdateOneConfigPricesApplys: IRootState;
  stateGetListConfigPricesApplys: IRootState;
}
