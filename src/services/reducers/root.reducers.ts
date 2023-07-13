import { combineReducers } from "redux";
import { IRootReducers } from "../interfaces/root.interfaces";
import globalReducer from "./global.reducer";
import accountReducer from "./account.reducer";
import shopReducer from "./shop.reducer";
import userReducer from "./user.reducer";
import customerReducer from "./customer.reducer";
import masterDataReducer from "./masterData.reducer";
import uploadReducer from "./upload.reducer";
import configZonesReducer from "./configZones.reducer";
import configPricesReducer from "./configPrices.reducer";
import ordersReducer from "./orders.reducer";
import warehouseReducer from "./warehouse.reducer";
import exportReducer from "./export.reducer";
import verhiclesReducer from "./vehicles.reducer";
import packageReducer from "./package.reducer";
import trainReducer from "./train.reducer";
import wareHouseUsersReducer from "./wareHouseUsers.reducer";
import wareHouseAreasReducer from "./warehouseArea.reducer";
import routingReducer from "./routing.reducer";
import routingAreaReducer from "./routingAreaReducer";
import customerPriceReducer from "./customerPrice.reducer";
import customerSettingReducer from "./customerSetting.reducer";
import supplierReducer from "./supplier.reducer";
import reasonReducer from "./reason.reducer";
import customerAddressReducer from "./customerAddress.reducer";

const rootReducers = combineReducers<IRootReducers>({
  globalReducer,
  accountReducer,
  shopReducer,
  userReducer,
  customerReducer,
  masterDataReducer,
  uploadReducer,
  configZonesReducer,
  configPricesReducer,
  ordersReducer,
  verhiclesReducer,
  warehouseReducer,
  exportReducer,
  packageReducer,
  trainReducer,
  wareHouseUsersReducer,
  wareHouseAreasReducer,
  routingReducer,
  routingAreaReducer,
  customerAddressReducer,
  customerPriceReducer,
  customerSettingReducer,
  supplierReducer,
  reasonReducer,
});

export default rootReducers;
