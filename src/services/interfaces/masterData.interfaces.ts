import { IRootState } from "./root.interfaces";

export interface IMasterDataState {
  stateProvince: IRootState;
  stateDistrict: IRootState;
  stateWard: IRootState;
  stateRole: IRootState;
  stateBanks: IRootState;
  stateBranchBanks: IRootState;
}
