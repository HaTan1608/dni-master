import { IPagingNotPrefer } from "src/types";

export interface typePropsColumn {
  btnOpenModal: (value: any) => void;
  btnChangeStatus: (value: any) => void;
  btnOpenUpdatePassword: (values: any) => void;
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
  status?: 'A' | 'D'
  q?: string;
}

export interface IFilter {
  category_id: number;
}