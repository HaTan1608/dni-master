import { IPagingNotPrefer } from "src/types";

export interface IParamsFilter extends IPagingNotPrefer {
  status?: 'A' | 'D'
  q?: string;
}  