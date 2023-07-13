import { IPagingNotPrefer } from "src/types";

export interface typePropsColumn {
  btnOpenModal: (value: any) => void;
  btnChangeStatus: (value: any) => void;
  openModalCallback:(e:any,value: any) => void;
}

export interface DataType {
  key: React.Key;
  image: string;
  title: string;
  stock: string;
  type: string;
  supplier: string;
  price: string;
}

export interface IParamsFilter extends IPagingNotPrefer {
  customer_group_id?:number;
  search?: string;
  customer_type_id?: number;
  payment_status_id?: number;
  fromDate?: string;
  startDate?: string;
  endDate?: string;
  page?:number;
  limit?:number;
  to_delivery_at?:string;
  from_delivery_at?:string;
}