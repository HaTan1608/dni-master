import { IRootState } from "./root.interfaces";

export interface IConfigZonesState {
  stateGetListConfigZones: IRootState;
  stateGetConfigZonesById: IRootState;
  stateUpdateOneConfigZones: IRootState;
  stateCreateOneConfigZones: IRootState;
  stateUpdateOneConfigZonesDetails: IRootState;
  stateGetListConfigZonesDetails: IRootState;
}
