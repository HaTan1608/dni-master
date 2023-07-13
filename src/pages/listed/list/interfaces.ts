import { IPagingNotPrefer } from "src/types";

export interface typePropsColumn {
  btnChangeStatus: (value: any) => void;
}

export interface IParamsFilter extends IPagingNotPrefer {
  q?: string;
  warehouseId?: number;
  listedType?: number;
  fromDate?: string;
  toDate?: string;
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

export interface IFormListedDetail {
  fullname: string;
  password: string;
  phone: string;
  email: string;
  status: boolean;
}
