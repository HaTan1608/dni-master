import { IAccountState } from "./account.interfaces";
import { IConfigPricesState } from "./configPrices.interfaces";
import { IConfigZonesState } from "./configZones.interfaces";
import { ICustomerState } from "./customer.interfaces";
import { IExportState } from "./export.interfaces";
import { IGlobalState } from "./global.interfaces";
import { IMasterDataState } from "./masterData.interfaces";
import { IOrdersState } from "./orders.interfaces";
import { IPackageState } from "./package.interfaces";
import { IShopState } from "./shop.interfaces";
import { IUploadState } from "./upload.interfaces";
import { IUserState } from "./user.interfaces";
import { IWarehouseState } from "./warehouse.interfaces";
import { IContState } from "./vehicles.interfaces";
import { ITrainState } from "./trains.interfaces";
import { IWareHouseUsersState } from "./wareHouseUsers.interfaces";
import { IWarehouseAreaState } from "./warehouseArea.interfaces";
import { IRoutingsState } from "./routing.interfaces";
import { IRoutingAreaState } from "./routingArea.interfaces";
import { ICustomerPriceState } from "./customerPrice.interfaces";
import { ICustomerSettingState } from "./customerSetting.interfaces";
import { IReasonState } from "./reason.interfaces";
import { ICustomerAddressState } from "./customerAddress.interfaces";
import { ISupplierState } from "./supplier.interfaces";
export interface ICatchError {
  message: string;
  statusCode: number;
}
export interface IRootResponse {
  data: any;
  message: string;
  statusCode: number;
}
export interface IStateResponse {
  data?: any;
  message: string | null;
  success: boolean | null;
}
export interface IPayload {
  id?: any;
  params?: any | any[];
  token?: string;
  data?: any;
}

export interface IType {
  type: string;
}

export interface IAction extends IType {
  payload: IPayload;
}

export interface IActionResponse extends IType {
  response: IStateResponse;
}

export interface ISyntheticAction extends IAction, IActionResponse {}

export interface IRootState extends IStateResponse {
  isLoading: boolean | null;
  // data?: any | null;
  // message?: string | null;
  // success?: boolean | null;
  error: boolean | null;
}

export interface IRootReducers {
  verhiclesReducer: IContState;
  globalReducer: IGlobalState;
  accountReducer: IAccountState;
  shopReducer: IShopState;
  userReducer: IUserState;
  customerReducer: ICustomerState;
  masterDataReducer: IMasterDataState;
  uploadReducer: IUploadState;
  configZonesReducer: IConfigZonesState;
  configPricesReducer: IConfigPricesState;
  ordersReducer: IOrdersState;
  warehouseReducer: IWarehouseState;
  exportReducer: IExportState;
  packageReducer: IPackageState;
  routingReducer: IRoutingsState;
  routingAreaReducer:IRoutingAreaState;
  trainReducer:ITrainState;
  wareHouseUsersReducer:IWareHouseUsersState;
  wareHouseAreasReducer:IWarehouseAreaState;
  customerAddressReducer:ICustomerAddressState;
  customerPriceReducer:ICustomerPriceState;
  customerSettingReducer:ICustomerSettingState;
  supplierReducer:ISupplierState;
  reasonReducer:IReasonState;
}
