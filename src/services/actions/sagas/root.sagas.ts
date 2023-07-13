import { all } from "redux-saga/effects";
import accountSagas from "./account.sagas";
import globalSagas from "./global.sagas";
import shopSagas from "./shop.sagas";
import userSagas from "./user.sagas";
import customerSagas from "./customer.sagas";
import masterDataSagas from "./masterData.sagas";
import configZonesSagas from "./config-zones.sagas";
import configPricesSagas from "./config-prices.sagas";
import ordersSagas from "./orders.sagas";
import warehouseUsersSagas from "./warehouseUsers.sagas";
import exportSagas from "./export.sagas";
import vehiclesSagas from "./vehicles.sagas";
import trainSagas from "./trains.sagas";
import warehouseSagas from "./warehouse.sagas";
import packageSagas from "./package.sagas";
import warehouseArea from "./warehouseArea.sagas";
import routingSagas from "./routing.sagas";
import routingAreaSagas from "./routingArea.sagas";
import customerPriceSagas from "./customerPrice.sagas";
import customerSettingSagas from "./customerSetting.sagas";
import supplierSagas from "./supplier.sagas";
import customerAddressSagas from "./customerAddress.sagas";
import reasonSagas from "./reason.sagas";
function* rootSagas() {
  yield all([
    ...globalSagas,
    ...accountSagas,
    ...shopSagas,
    ...userSagas,
    ...customerSagas,
    ...masterDataSagas,
    ...configZonesSagas,
    ...configPricesSagas,
    ...ordersSagas,
    ...warehouseSagas,
    ...exportSagas,
    ...vehiclesSagas,
    ...packageSagas,
    ...trainSagas,
    ...warehouseUsersSagas,
    ...warehouseArea,
    ...routingSagas,
    ...routingAreaSagas,
    ...customerAddressSagas,
    ...customerPriceSagas,
    ...customerSettingSagas,
    ...supplierSagas,
    ...reasonSagas,
  ]);
}

export default rootSagas;
