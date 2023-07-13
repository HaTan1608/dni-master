import { IRootState } from "./root.interfaces";

export interface IUserState {
  stateGetListUserSystem: IRootState;
  stateGetUserSystemById: IRootState;
  stateUpdateOneUserSystem: IRootState;
  stateCreateOneUserSystem: IRootState;
  stateChangePassByUser: IRootState;
  stateGetListUserGroups: IRootState;
  stateGetUserGroupsByid: IRootState;
  stateCreateOneUserGroups: IRootState;
  stateUpdateOneUserGroups: IRootState;
  stateGetListUserGroupsPrivilege: IRootState;
}
