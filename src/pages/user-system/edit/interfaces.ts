/* eslint-disable */
export interface IFormUserSystem {
  fullname: string;
  password: string;
  phone: string;
  email: string;
  status: boolean;
  role_id?: number;
}
export interface IPropsUserSystem {
  // visible: boolean;
  isCreate?: boolean | true;
  isRoleSystem?: boolean | false;
  userId?: any;
  onFinish: () => void;
  // onCancel:()=>void;
}

export const selectOptionsRole = {
  name: "role_name",
  value: "id",
};
