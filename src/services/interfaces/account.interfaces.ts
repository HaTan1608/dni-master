import { IRootState } from "./root.interfaces";

export interface IAccountState {
  stateSignIn: IRootState;
  stateRegister: IRootState;
  stateForgetPass: IRootState;
  stateChangePass: IRootState;
  stateConfirmAccount: IRootState;
  phone?: string|null;
  email?: string|null;
  activationCode?: string|null;
}
