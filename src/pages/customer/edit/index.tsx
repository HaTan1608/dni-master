/* eslint-disable */
import { Row, Col, Form, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import { notifyError, notifySuccess } from "src/components/notification";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { IFormCustomer, IPropsCustomer } from "./interfaces";
import FormSwitch from "src/components/form/FormSwitch";
import InfoForm from "./infoForm";
import ContractForm from "./contractForm";
import { typeScreenFormCustomer } from "./data";
import WarehouseForm from "./warehouseForm";
import ServiceForm from "./serviceForm";
import {
  createCustomerSetting,
  getListCustomerSetting,
} from "src/services/actions/customerSetting.action";
import {
  createOneCustomer,
  updateOneCustomer,
} from "src/services/actions/customer.actions";
import PriceForm from "./priceForm";
import "../list/styles.less";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import axios from "axios";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
const { TabPane } = Tabs;

const Customers = (props: IPropsCustomer) => {
  const { isCreate, data } = props;
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [zones, setZones] = useState<any>([]);
  const [tab, setTab] = useState(`${typeScreenFormCustomer.INFO}`);
  const [customerForm] = Form.useForm();
  const [dataAddRoute, setDataAddRoute] = useState({
    form_zone: undefined,
    from_province: undefined,
    from_district: undefined,
    to_zone: undefined,
    to_province: undefined,
    to_district: undefined,
  });
  const [dataCustomerSettings, setDataCustomerSettings] = useState({
    data_form_zone: undefined,
    data_form_zone_name: undefined,
    data_from_province: undefined,
    data_from_province_name: undefined,
    data_from_district: undefined,
    data_from_district_name: undefined,
    data_to_zone: undefined,
    data_to_zone_name: undefined,
    data_to_province: undefined,
    data_to_province_name: undefined,
    data_to_district: undefined,
    data_to_district_name: undefined,
  });
  const [fromTrains, setFromTrains] = useState<any>([]);
  const [toTrains, setToTrains] = useState<any>([]);
  const [toProvinces, setToProvinces] = useState<any>([]);
  const [transtationMethods, setTranstationMethods] = useState<any>([]);
  const [idMethods, setIdMethods] = useState<any>([]);
  const [customerCode, setCustomerCode] = useState<any>([]);
  const [cargoTypes, setCargoTypes] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const { stateCreateOneCustomer, stateUpdateOneCustomer } = useSelector(
    (e: AppState) => e.customerReducer
  );
  const { stateGetListCustomerSetting } = useSelector(
    (state: AppState) => state.customerSettingReducer
  );
  const [districts, setDistricts] = useState<any>([]);
  const [_data, _setData] = useState<any>([]);
  const [dataService48, setDataService48] = useState<any>([]);
  const [dataService36, setDataService36] = useState<any>([]);
  const [dataCargo, setDataCargo] = useState<any>([]);
  const [dataPayMethod, setDataPayMethod] = useState<any>([]);
  /****************************START**************************/
  /*        
                   Life Cycle                      */
  useEffect(() => {
    const getZone = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(`${API_URL}/${ROOT_VERSION}/zones`, {
          headers: headers,
        });
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.zones.length; i++) {
            fakeZones.push({
              label: data?.data?.zones[i].zone,
              value: data?.data?.zones[i].id,
            });
          }
          setZones(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getZone();
    return () => {
      setZones([]);
    };
  }, []);
  useEffect(() => {
    const getSenderProvinces = async (idzone: any, state: any) => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces?zone_id=${idzone}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeProvinces = [];
          for (var i = 0; i < data?.data?.provinces.length; i++) {
            fakeProvinces.push({
              label: data?.data?.provinces[i].province_name,
              value: data?.data?.provinces[i].id,
            });
          }
          state(fakeProvinces);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (dataAddRoute.form_zone) {
      getSenderProvinces(dataAddRoute.form_zone, setProvinces);
    }
    if (dataAddRoute.to_zone) {
      getSenderProvinces(dataAddRoute.to_zone, setToProvinces);
    }
    return () => {
      setProvinces([]);
      setToProvinces([]);
    };
  }, [dataAddRoute.form_zone, dataAddRoute.to_zone]);
  useEffect(() => {
    const getSenderTrain = async (idProvince: any, state: any) => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/train-stations?province=${idProvince}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeTrain = [];
          for (var i = 0; i < data?.data?.trainStations.length; i++) {
            fakeTrain.push({
              label: data?.data?.trainStations[i].station,
              value: data?.data?.trainStations[i].id,
            });
          }
          state(fakeTrain);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (dataAddRoute.from_province) {
      getSenderTrain(dataAddRoute.from_province, setFromTrains);
    }
    if (dataAddRoute.to_province) {
      getSenderTrain(dataAddRoute.to_province, setToTrains);
    }
    return () => {
      setFromTrains([]);
      setToTrains([]);
    };
  }, [dataAddRoute.from_province, dataAddRoute.to_province]);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateCreateOneCustomer;
    if (success) {
      notifySuccess(message || "");
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateCreateOneCustomer.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateUpdateOneCustomer;
    if (success) {
      notifySuccess(message || "");
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneCustomer.isLoading]);
  useEffect(() => {
    const getTransportationMethod = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/transportation-methods`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeWards = [];
          let id = [];
          for (var i = 0; i < data?.data?.transportationMethods.length; i++) {
            fakeWards.push({
              label: data?.data?.transportationMethods[i].transportation_code,
              value: data?.data?.transportationMethods[i].id,
            });
            id.push(data?.data?.transportationMethods[i].id);
          }
          setTranstationMethods(fakeWards);
          setIdMethods(id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTransportationMethod();
    return () => {
      setTranstationMethods([]);
    };
  }, []);
  useEffect(() => {
    const getCargoTypes = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      let uuid = localGetAuthUUID();
      if (token) {
        headers.Authorization = token;
        headers['x-auth-uuid']= uuid;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/cargo-types`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeWards = [];
          for (var i = 0; i < data?.data?.cargoTypes.length; i++) {
            fakeWards.push({
              label: data?.data?.cargoTypes[i].description,
              value: data?.data?.cargoTypes[i].id,
            });
          }
          setCargoTypes(fakeWards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCargoTypes();
    return () => {
      setCargoTypes([]);
    };
  }, []);
  useEffect(() => {
    const getPaymentMethods = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      let uuid = localGetAuthUUID();
      if (token) {
        headers.Authorization = token;
        headers['x-auth-uuid']= uuid;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/payment-methods`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeWards = [];
          for (var i = 0; i < data?.data?.paymentMethods.length; i++) {
            fakeWards.push({
              label: data?.data?.paymentMethods[i].payment_name,
              value: data?.data?.paymentMethods[i].id,
            });
          }
          setPaymentMethods(fakeWards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentMethods();
    return () => {
      setPaymentMethods([]);
    };
  }, []);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateGetListCustomerSetting;
    if (!isLoading) {
      if (success) {
        let house48h: any = [];
        let house36h: any = [];
        let cargo: any = [];
        let paymentMethodItem: any = [];
        let senderZ: any = {
          zoneId:undefined,
          zoneName:undefined,
        };
        let senderP: any ={
          provinceId:undefined,
          provinceName:undefined,
        };
        let senderT: any = {
          trainId:undefined,
          trainName:undefined,
        };
        let reciverZ: any = {
          zoneId:undefined,
          zoneName:undefined,
        };;
        let reciverP: any = {
          provinceId:undefined,
          provinceName:undefined,
        };
        let reciverT: any = {
          trainId:undefined,
          trainName:undefined,
        };
        data?.customerSettings.map((item: any) => {
          if (
            item?.object_key == "36H_TRANSPORTATION_METHODS" &&
            item?.status != "D" &&  item?.object_value ==='GA-GA'
          ) {
            house36h.push(item.object_id);
          }
          if (
            item?.object_key == "48H_TRANSPORTATION_METHODS" &&
            item?.status != "D"
          ) {
            house48h.push(item.object_id);
          }
          if (item?.object_key == "CARGO_TYPES" && item?.status != "D") {
            cargo.push(item.object_id);
          }
          if (item?.object_key == "PAYMENT_METHODS" && item?.status != "D") {
            paymentMethodItem.push(item.object_id);
          }
          if (item?.object_key == "SENDER_ZONE" && item?.status != "D") {
            customerForm.setFieldsValue({
              senderZone: item.object_id,
            });
            senderZ = {zoneId:item.object_id,zoneName:item.object_value};
          }
          if (item?.object_key == "SENDER_PROVINCE" && item?.status != "D") {
            customerForm.setFieldsValue({
              senderProvince: item.object_id,
            });
            senderP = {provinceId:item.object_id,provinceName:item.object_value};
          }
          if (
            item?.object_key == "SENDER_TRAIN_STATIONS" &&
            item?.status != "D"
          ) {
            customerForm.setFieldsValue({
              senderDistrict: item.object_id,
            });
            senderT = {trainId:item.object_id,trainName:item.object_value};
          }
          if (item?.object_key == "RECEIVER_ZONE" && item?.status != "D") {
            customerForm.setFieldsValue({
              reciverZone: item.object_id,
            });
            reciverZ = {zoneId:item.object_id,zoneName:item.object_value};
          }
          if (item?.object_key == "RECEIVER_PROVINCE" && item?.status != "D") {
            customerForm.setFieldsValue({
              reciverProvince: item.object_id,
            });
            reciverP = {provinceId:item.object_id,provinceName:item.object_value};
          }
          if (
            item?.object_key == "RECEIVER_TRAIN_STATIONS" &&
            item?.status != "D"
          ) {
            customerForm.setFieldsValue({
              reciverDistrict: item.object_id,
            });
            reciverT = {trainId:item.object_id,trainName:item.object_value};
          }
          setDataAddRoute({
            ...dataAddRoute,
            form_zone: senderZ.zoneId,
            from_province: senderP.provinceId,
            to_zone: reciverZ.zoneId,
            to_province: reciverP.provinceId,
          });
        });
        setDataCustomerSettings({
          data_form_zone: senderZ.zoneId,
          data_form_zone_name: senderZ.zoneName,
          data_from_province:senderP.provinceId,
          data_from_province_name:senderP.provinceName,
          data_from_district:senderT.trainId,
          data_from_district_name:senderT.trainName,
          data_to_zone: reciverZ.zoneId,
          data_to_zone_name: reciverZ.zoneName,
          data_to_province:reciverP.provinceId,
          data_to_province_name:reciverP.provinceName,
          data_to_district:reciverT.trainId,
          data_to_district_name:reciverT.trainName,
        });
        customerForm.setFieldsValue({
          paymentMethodItem: paymentMethodItem,
          servicesItem48: house48h,
          servicesItem: house36h,
          typeServiceItem: cargo,
          services48: house48h.length === transtationMethods.length,
          services: house36h.length === 1,
          typeService: cargo.length === cargoTypes.length,
          paymentMethod: paymentMethodItem.length === paymentMethods.length,
        });
        setDataService48(house48h);
        setDataService36(house36h);
        setDataCargo(cargo);
        setDataPayMethod(paymentMethodItem);
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateGetListCustomerSetting.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */
  useEffect(() => {
    dispatch(getListCustomerSetting({ customer_id: data.id }));
  }, []);
  const submitForm = (values: IFormCustomer) => {
    const _paramsUser = {
      full_name: values.customer_name.trim(),
      customer_name: values.customer_name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      status: values.status ? "A" : "D",
      customer_code: values.customer_code,
      customer_type_id: values.customer_type_id,
      customer_group_id: values.customer_group_id,
      province_id: values.province_id,
      customer_group:customerCode.name,
      district_id: values.district_id,
      ward_id: values.ward_id,
      province_name: values.province_name,
      district_name: values.district_name,
      ward_name: values.ward_name,
      address: values.address,
      tax_code: values.tax_code,
      phone2: values.phone2,

      bank_id: values.bank_id,
      bank_name: values.bank_name,
      brank_branch_id: values.brank_branch_id,
      brank_branch_name: values.brank_branch_name,
      bank_account_name: values.bank_account_name,
      bank_account_number: values.bank_account_number,
    };
    const house36 = transtationMethods.map((e: any) => {
      if (
        (values.servicesItem ? values.servicesItem : dataService36).includes(
          e.value
        )
      ) {
        return {
          object_id: e.value,
          object_key: "36H_TRANSPORTATION_METHODS",
          object_value: e.label,
          status: "A",
        };
      }
      return {
        object_id: e.value,
        object_key: "36H_TRANSPORTATION_METHODS",
        object_value: e.label,
        status: "D",
      };
    });
    const house48 = transtationMethods.map((e: any) => {
      if (
        (values.servicesItem48
          ? values.servicesItem48
          : dataService48
        ).includes(e.value)
      ) {
        return {
          object_id: e.value,
          object_key: "48H_TRANSPORTATION_METHODS",
          object_value: e.label,
          status: "A",
        };
      }
      return {
        object_id: e.value,
        object_key: "48H_TRANSPORTATION_METHODS",
        object_value: e.label,
        status: "D",
      };
    });
    const cargoTypeData = cargoTypes.map((e: any) => {
      if (
        (values.typeServiceItem ? values.typeServiceItem : dataCargo).includes(
          e.value
        )
      ) {
        return {
          object_id: e.value,
          object_key: "CARGO_TYPES",
          object_value: e.label,
          status: "A",
        };
      }
      return {
        object_id: e.value,
        object_key: "CARGO_TYPES",
        object_value: e.label,
        status: "D",
      };
    });
    const paymentMethodData = paymentMethods.map((e: any) => {
      if (
        (values.paymentMethodItem
          ? values.paymentMethodItem
          : dataPayMethod
        ).includes(e.value)
      ) {
        return {
          object_id: e.value,
          object_key: "PAYMENT_METHODS",
          object_value: e.label,
          status: "A",
        };
      }
      return {
        object_id: e.value,
        object_key: "PAYMENT_METHODS",
        object_value: e.label,
        status: "D",
      };
    });
    const senderZoneData =
      values.senderZone || dataCustomerSettings?.data_form_zone
        ? [
            {
              object_id: values.senderZone
                ? values.senderZone
                : dataCustomerSettings?.data_form_zone,
              object_key: "SENDER_ZONE",
              object_value: _data.form_zone_name
                ? _data.form_zone_name
                : dataCustomerSettings?.data_form_zone_name,
            },
          ]
        : [];
    const senderProvinceData =
      values.senderProvince || dataCustomerSettings?.data_from_province
        ? [
            {
              object_id: values.senderProvince
                ? values.senderProvince
                : dataCustomerSettings?.data_from_province,
              object_key: "SENDER_PROVINCE",
              object_value: _data.from_province_name
                ? _data.from_province_name
                : dataCustomerSettings?.data_from_province_name,
            },
          ]
        : [];
    const senderDistrictData =
      values.senderDistrict || dataCustomerSettings?.data_from_district
        ? [
            {
              object_id: values.senderDistrict
                ? values.senderDistrict
                : dataCustomerSettings?.data_from_district,
              object_key: "SENDER_TRAIN_STATIONS",
              object_value: _data.from_district_name
                ? _data.from_district_name
                : dataCustomerSettings?.data_from_district_name,
            },
          ]
        : [];
    const reciverZoneData =
      values.reciverZone || dataCustomerSettings?.data_to_zone
        ? [
            {
              object_id: values.reciverZone
                ? values.reciverZone
                : dataCustomerSettings.data_to_zone,
              object_key: "RECEIVER_ZONE",
              object_value: _data.to_zone_name
                ? _data.to_zone_name
                : dataCustomerSettings?.data_to_zone_name,
            },
          ]
        : [];
    const reciverProvinceData =
      values.reciverProvince || dataCustomerSettings?.data_to_province
        ? [
            {
              object_id: values.reciverProvince
                ? values.reciverProvince
                : dataCustomerSettings?.data_to_province,
              object_key: "RECEIVER_PROVINCE",
              object_value: _data.to_province_name
                ? _data.to_province_name
                : dataCustomerSettings?.data_to_province_name,
            },
          ]
        : [];
    const reciverDistrictData =
      values.reciverDistrict || dataCustomerSettings?.data_to_district
        ? [
            {
              object_id: values.reciverDistrict
                ? values.reciverDistrict
                : dataCustomerSettings?.data_to_district,
              object_key: "RECEIVER_TRAIN_STATIONS",
              object_value: _data.to_district_name
                ? _data.to_district_name
                : dataCustomerSettings?.data_to_district_name,
            },
          ]
        : [];
    const _newParams = [
      ...house36,
      ...house48,
      ...cargoTypeData,
      ...paymentMethodData,
      ...senderZoneData,
      ...senderProvinceData,
      ...senderDistrictData,
      ...reciverZoneData,
      ...reciverProvinceData,
      ...reciverDistrictData,
    ];
    dispatch(
      isCreate
        ? createOneCustomer(_paramsUser)
        : updateOneCustomer(data.id, _paramsUser)
    );
    !isCreate&&dispatch(createCustomerSetting({customer_id:data.id,listSetting:_newParams}));
  };

  const onFinishFailed = (errorInfo: any) => {
    const { errorFields } = errorInfo;
    const _mess = errorFields.map((e: any) => {
      return <p key={e.name[0]}>{`${e.name[0]}: ${e.errors[0]}`}</p>;
    });
    notifyError(_mess);
  };

  const onChangeTabs = (value: any) => {
    setTab(value);
  };
  const getZone = (e: any) => {
    _setData(e);
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */
  const getCustomerCode= (id:any,values:any) =>{
    setCustomerCode(values)
  }
  return (
    <div className="w-full h-full pl-4 pr-4">
      <Form
        name="formUserSystem"
        requiredMark={false}
        layout="vertical"
        onFinish={submitForm}
        onFinishFailed={onFinishFailed}
        form={customerForm}
        className="mt-3"
        initialValues={{
          customer_code:
            !isCreate && data.customer_code ? data.customer_code : undefined,
          customer_group_id:
            !isCreate && data.customer_group_id
              ? data.customer_group_id
              : undefined,
          customer_type_id:
            !isCreate && data.customer_type_id
              ? data.customer_type_id
              : undefined,
          customer_name:
            !isCreate && data.customer_name ? data.customer_name : "",
          email: !isCreate && data.email ? data.email : "",
          phone: !isCreate && data.phone ? data.phone : "",
          province_id:
            !isCreate && data.province_id ? data.province_id : undefined,
          district_id:
            !isCreate && data.district_id ? data.district_id : undefined,
          ward_id: !isCreate && data.ward_id ? data.ward_id : undefined,
          address: !isCreate && data.address ? data.address : undefined,
          orther_name:
            !isCreate && data.orther_name ? data.orther_name : undefined,
          phone2: !isCreate && data.phone2 ? data.phone2 : undefined,
          tax_code: !isCreate && data.tax_code ? data.tax_code : undefined,
          status: !isCreate ? (data.status === "A" ? true : false) : true,

          bank_id: !isCreate && data.bank_id ? data.bank_id : undefined,
          // bank_name: !isCreate && data.bank_name ? data.bank_name : undefined,
          bank_account_name:
            !isCreate && data.bank_account_name
              ? data.bank_account_name
              : undefined,
          bank_account_number:
            !isCreate && data.bank_account_number
              ? data.bank_account_number
              : undefined,
          brank_branch_id:
            !isCreate && data.brank_branch_id
              ? data.brank_branch_id
              : undefined,
          // brank_branch_name: !isCreate && data.brank_branch_name ? data.brank_branch_name : undefined,
        }}
      >
        <div className="w-full bg-white">
          <p className="text-16 font-medium">Thông tin khách hàng</p>
          <Tabs
            defaultActiveKey={tab}
            onChange={onChangeTabs}
            type="card"
            className="styleTabs mt-3"
          >
            <TabPane
              tab="Thông tin chung"
              key={`${typeScreenFormCustomer.INFO}`}
            >
              <InfoForm
                tab={tab}
                keyTab={`${typeScreenFormCustomer.INFO}`}
                isCreate={isCreate}
                form={customerForm}
                dataUser={data}
                spin={true}
                getCustomerCode={getCustomerCode}
              />
            </TabPane>
            <TabPane tab="Hợp đồng" key={`${typeScreenFormCustomer.CONTRACT}`}>
              <ContractForm
                tab={tab}
                keyTab={`${typeScreenFormCustomer.CONTRACT}`}
                isCreate={isCreate}
                form={customerForm}
              />
            </TabPane>
            <TabPane
              tab="Danh sách kho"
              key={`${typeScreenFormCustomer.WAREHOUSE}`}
            >
              <WarehouseForm
                isCreate={isCreate}
                form={customerForm}
                dataUser={data}
                spin={true}
              />
            </TabPane>

            <TabPane tab="Bảng giá" key={`${typeScreenFormCustomer.PRICE}`}>
              <PriceForm
                tab={tab}
                keyTab={`${typeScreenFormCustomer.PRICE}`}
                isCreate={isCreate}
                form={customerForm}
                dataUser={data}
                spin={true}
              />
            </TabPane>

            {isCreate == false && (
              <TabPane
                tab="Dịch vụ đăng kí"
                key={`${typeScreenFormCustomer.SERVICE}`}
              >
                <ServiceForm
                  tab={tab}
                  keyTab={`${typeScreenFormCustomer.SERVICE}`}
                  form={customerForm}
                  dataUser={data}
                  transtationMethods={transtationMethods}
                  cargoTypes={cargoTypes}
                  paymentMethods={paymentMethods}
                  provinces={provinces}
                  toProvinces={toProvinces}
                  fromTrains={fromTrains}
                  toTrains={toTrains}
                  zones={zones}
                  dataService36={dataService36}
                  dataService48={dataService48}
                  dataCargo={dataCargo}
                  dataPayMethod={dataPayMethod}
                  getZone={getZone}
                  // setDataService48={setDataService48}
                />
              </TabPane>
            )}
          </Tabs>
          <Row>
            <Col span={12} className="flex">
              <span className="text-16 font-medium mr-2">
                Trạng thái hoạt động
              </span>
              <FormSwitch
                name="status"
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
              />
            </Col>
            <Col span={12} className="text-right">
              <ButtonTMS
                id="form-button-signin"
                type="tms"
                htmlType="submit"
                icon="storage"
                loading={
                  isCreate
                    ? stateCreateOneCustomer.isLoading
                    : stateUpdateOneCustomer.isLoading
                }
              >
                Lưu
              </ButtonTMS>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );

  /**************************** END **************************/
};

export default Customers;
