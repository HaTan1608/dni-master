import { IPagingNotPrefer } from "src/types";
export interface IFormCustomer {
  customer_code: string,
  customer_group_id: number,
  customer_type_id: number,
  customer_name: string,
  email: string,
  phone: string,

  province_id: number,
  district_id: number,
  ward_id: number,
  province_name: string,
  district_name: string,
  ward_name: string,
  address: string,
  orther_name: string,
  phone2: string,
  tax_code: string,

  address_2: string,
  ward_id_2: number,
  district_id_2: number,
  province_id_2: number,
  status: boolean,
  
  bank_id: number,
  bank_name: string,
  brank_branch_id: number,
  brank_branch_name: number,
  bank_account_name: string,
  bank_account_number: string,
  services:any,
  services48:boolean,
  servicesItem48:any,
  senderZone:any,
  senderProvince:any,
  senderDistrict:any,
  reciverZone:any,
  reciverProvince:any,
  reciverDistrict:any,
  servicesItem:any,
  typeServiceItem:any,
  typeService:boolean,
  paymentMethod:boolean,
  paymentMethodItem:any,
}
export interface IPropsCustomer{
  // visible: boolean;
  isCreate?: boolean | true;
  data?: any;
  onFinish:()=>void;
  // onCancel:()=>void;
}
export interface typePropsColumn {
  btnOpenModal: (value: any) => void;
  btnChangeStatus: (value: any) => void;
}

export interface IParamsFilter extends IPagingNotPrefer {
  status?: 'A' | 'D';
  q?: string;
  province?: number;
  customerType?: number;
  fromDate?: string;
  toDate?: string;
}