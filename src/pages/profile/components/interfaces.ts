import { IPagingNotPrefer } from "src/types";
export interface IFormInfoProfile {
  customer_name: string,
  tax_code: string,
  bank_id: number,
  bank_name: string,
  brank_branch_id: number,
  brank_branch_name: number,
  bank_account_name: string,
  bank_account_number: string,
  province_id: number,
  district_id: number,
  ward_id: number,
  address: string,
  province_name: string,
  district_name: string,
  ward_name: string,
  customer_group_id: number,
  customer_type_id: number,
  phone: string,
  email: string,
}
export interface IPropsInfoProfile{
  // visible: boolean;
  // isCreate?: boolean | true;
  // dataUser?: any;
  // onFinish:()=>void;
  // onCancel:()=>void;
}

export interface IParamsFilter extends IPagingNotPrefer {
  status?: 'A' | 'D';
  q?: string;
}

export interface IPropsChangePass{
  visible: boolean;
  onFinish:()=>void;
  onCancel?:()=>void;
}