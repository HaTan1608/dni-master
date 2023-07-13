/* eslint-disable */
import { Form } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import { createOneOrders } from "src/services/actions/orders.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import MainInformation from "./components/MainInformation";
import SubLeftInformation from "./components/SubLeftInformation";
import SubRightInformation from "./components/SubRightInformation";
import "./styles.less";
const OrdersCreate = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const history = useHistory();
  const [names, setNames] = useState<any>();
  const [transtationMethods, setTranstationMethods] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [dataUserSetting, setDataUserSetting] = useState<any[]>([]);
  const [dataPayment, setDataPayment] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  const [formAddOrder] = Form.useForm();
  const [paramsMethods, setParamsMethods] = useState<any>({
    transportation_method_id: undefined,
    service_id: undefined,
  });
  const [nameWards, setNameWards] = useState<any>({
    receiver_ward: undefined,
    receiver_ward_id: undefined,
    sender_ward: undefined,
    sender_ward_id: undefined,
  });
  const [totalWeight, setTotalWeight] = useState<any>(250);
  const [valuesCalcPrice, setValuesCalcPrice] = useState<any>({
    sequence: 1,
    sender_province: undefined,
    sender_district: undefined,
    receiver_province: undefined,
    receiver_district: undefined,
    sender: undefined,
    receiver: 500000,
    service: 1,
    transport_method: 1,
    payment_method: 1,
    number_of_package: 1,
    actual_weight: 0,
    volumetric_weight: 1,
    cod_amount: 0,
    cargo_value: 0,
    tl_quydoi: 250,
  });
  const [calTotalPrice, setCalTotalPrice] = useState<any>({});
  const [cargos, setCargos] = useState<any>({});
  const [loadingCalTotalPrice, setLoadingCalTotalPrice] = useState(false);
  const stateCreateOrder = useSelector(
    (e: AppState) => e.ordersReducer.stateCreateOneOrders
  );

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateCreateOrder;
    if (!isLoading) {
      if (success) {
        formAddOrder.resetFields();
        history.push(`/orders`);
        return notifySuccess("Tạo đơn thành công!");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateCreateOrder.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

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
          setTranstationMethods(data?.data?.transportationMethods);
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
    const getServices = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/services`,
          {
            headers: headers,
          }
        );
        if (data) {
          setServices(data?.data?.services);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getServices();
    return () => {
      setServices([]);
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
        headers["x-auth-uuid"] = uuid;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/payment-methods`,
          {
            headers: headers,
          }
        );
        if (data) {
          setPaymentMethods(data?.data?.paymentMethods);
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
    if (
      valuesCalcPrice.sequence &&
      valuesCalcPrice.sender_province &&
      valuesCalcPrice.receiver_province &&
      valuesCalcPrice.sender &&
      valuesCalcPrice.receiver &&
      valuesCalcPrice.service &&
      valuesCalcPrice.transport_method &&
      valuesCalcPrice.payment_method &&
      valuesCalcPrice.number_of_package &&
      valuesCalcPrice.actual_weight &&
      (valuesCalcPrice.volumetric_weight > 0 || valuesCalcPrice.tl_quydoi > 0)
    ) {
      let params = { ...valuesCalcPrice };
      delete params.tl_quydoi;
      params.number_of_package = Number(params.number_of_package);
      params.cod_amount = Number(params.cod_amount);
      params.receiver = 661;
      const getProvinces = async () => {
        setLoadingCalTotalPrice(true);

        let headers: any = {
          "Content-Type": "application/json",
        };
        let token = localGetToken();
        let uuid = localGetAuthUUID();
        if (token) {
          headers.Authorization = token;
          headers["x-auth-uuid"] = uuid;
        }
        try {
          const { data } = await axios.post(
            `${API_URL}/${ROOT_VERSION}/calc-price`,
            params,
            {
              headers: headers,
            }
          );
          if (data) {
            setCalTotalPrice(data.data.calcPrices[0].output);
            setLoadingCalTotalPrice(false);
          }
        } catch (error) {
          console.log(error);
          setLoadingCalTotalPrice(false);
        }
      };
      getProvinces();
    }
  }, [valuesCalcPrice, totalWeight]);

  const handleCreateOrder = async (values: any) => {
    if (calTotalPrice.total_fee >= 0) {
      let params = {
        ref_code: values.mathamchieu,
        customer_name: values.senderName,
        customer_phone: values.senderPhone,
        customer_id: values.senderID,
        customer_code: values.senderCode,
        service_id: paramsMethods.service_id,
        cargo_type_id: cargos.value,
        cargo_type: cargos.label,
        service: services.find((x) => x.id === paramsMethods.service_id)
          ?.service_name,
        transportation_method_id: paramsMethods.transportation_method_id,
        transportation_method: transtationMethods.find(
          (x) => x.id === paramsMethods.transportation_method_id
        )?.transportation_name,
        payment_method_id: values.paymentMethod,
        payment_method: paymentMethods.find(
          (x) => x.id === values.paymentMethod
        )?.payment_name,
        transportation_id: undefined,
        transportation: undefined,
        sender_station_id: values.senderTransport,
        sender_station_name: values.senderTransport
          ? names.sender_train
          : undefined,
        receiver_station_id: values.receiverTransport,
        receiver_station_name: values.receiverTransport
          ? names.receiver_train
          : undefined,
        sender_name: values.senderName,
        sender_phone: values.senderPhone,
        sender_address: values.senderAddress,
        sender_province_id: names.sender_province_id,
        sender_province: names.sender_province,
        sender_district_id: names.sender_district_id,
        sender_district: names.sender_district,
        sender_ward_id: nameWards.sender_ward_id,
        sender_ward: nameWards.sender_ward,
        sender_signature: undefined,
        receiver_name: values.receiverName,
        receiver_phone: values.receiverPhone,
        receiver_address: values.receiverAddress,
        receiver_province_id: names.receiver_province_id,
        receiver_province: names.receiver_province,
        receiver_district_id: names.receiver_district_id,
        receiver_district: names.receiver_district,
        receiver_ward_id: nameWards.receiver_ward_id,
        receiver_ward: nameWards.receiver_ward,
        cod_amount: values.tienthuho,
        cargo_value: values.giatrihanghoa,
        note: values.orderNote,
      } as any;
      params.postage = calTotalPrice.total_fee;
      params.cod_fee = calTotalPrice.cod_fee;
      params.total_fee = calTotalPrice.total_fee;
      params.main_fee_vat_ex = calTotalPrice.main_fee_vat_ex;
      params.total_fee_vat_ex = calTotalPrice.total_fee_vat_ex;
      params.main_fee = calTotalPrice.main_fee;
      params.packing_fee = calTotalPrice.packing_fee;
      params.counting_fee = calTotalPrice.counting_fee;
      params.delivery_fee = calTotalPrice.delivery_fee;
      params.lifting_fee = calTotalPrice.lifting_fee;
      params.insurance_fee = calTotalPrice.insurance_fee;
      params.weight = valuesCalcPrice.actual_weight;
      params.package_qty = valuesCalcPrice.number_of_package;
      params.dimension_weight = values.tlquydoi;
      params.volume = values.thetich;
      dispatch(createOneOrders(params));
    } else {
      notifyError("Vui lòng nhập đủ thông tin để hệ thống tính giá");
    }
  };

  const getMethodCallback = (values: any) => {
    setParamsMethods({
      ...paramsMethods,
      service_id: values.service,
      transportation_method_id: values.shipMethod,
    });
    setValuesCalcPrice({
      ...valuesCalcPrice,
      transport_method: values.shipMethod,
      service: values.service,
      // sender_province: undefined,
      // sender_district: undefined,
      // receiver_province: undefined,
      // receiver_district: undefined,
    });
    setCalTotalPrice({});
    // setNameWards({
    //   receiver_ward: undefined,
    //   receiver_ward_id: undefined,
    //   sender_ward: undefined,
    //   sender_ward_id: undefined,
    // });
    // formAddOrder.setFieldsValue({
    //   senderProvince: undefined,
    //   senderDistrict: undefined,
    //   senderWard: undefined,
    //   receiverProvince: undefined,
    //   receiverDistrict: undefined,
    //   receiverWard: undefined,
    //   senderPlace: undefined,
    //   senderStationProvince: undefined,
    //   senderTransport: undefined,
    //   receiverPlace: undefined,
    //   receiverStationProvince: undefined,
    //   receiverTransport: undefined,
    // });
  };

  const getNameCallback = (values: any) => {
    setNames(values);
    setValuesCalcPrice({
      ...valuesCalcPrice,
      sender_province: values.sender_province_id,
      sender_district: values.sender_district_id,

      receiver_province: values.receiver_province_id,
      receiver_district: values.receiver_district_id,
    });
  };
  const getCargoType = (values: any) => {
    setCargos(values);
  };

  const getTotalWeightCallback = (values: any) => {
    setTotalWeight((values / 4000) * 1000000);
    formAddOrder.setFieldsValue({
      tlquydoi: values == 0 ? "0" : (values / 4000) * 1000000,
      //  tltinhgia: "0",
    });
    setValuesCalcPrice({
      ...valuesCalcPrice,
      tl_quydoi: values == 0 ? "0" : (values / 4000) * 1000000,
    });
  };
  const getTlQuyDoiCallback = (values: any) => {
    formAddOrder.setFieldsValue({
      tltinhgia:
        Number(values) > Number(valuesCalcPrice?.actual_weight)
          ? Number(values)
          : Number(valuesCalcPrice?.actual_weight),
      //  tltinhgia: "0",
    });
    setValuesCalcPrice({
      ...valuesCalcPrice,
      tl_quydoi: values,
    });
  };
  const getSoKienCallback = (values: any) => {
    setValuesCalcPrice({
      ...valuesCalcPrice,
      number_of_package: values,
    });
  };

  const getCustomerCallback = (values: any) => {
    setValuesCalcPrice({
      ...valuesCalcPrice,
      sender: values,
    });
  };

  useEffect(() => {
    if (
      Number(valuesCalcPrice.tl_quydoi) >= 0 &&
      Number(valuesCalcPrice.actual_weight) >= 0
    ) {
      formAddOrder.setFieldsValue({
        tltinhgia:
          Number(valuesCalcPrice.tl_quydoi) >
          Number(valuesCalcPrice.actual_weight)
            ? valuesCalcPrice.tl_quydoi?.toString()
            : valuesCalcPrice.actual_weight?.toString(),
      });

      setValuesCalcPrice({
        ...valuesCalcPrice,
        volumetric_weight: Number(totalWeight),
      });
    }
  }, [valuesCalcPrice.actual_weight, valuesCalcPrice.tl_quydoi]);

  const getNameSenderCallback = (e: any) => {
    setNameWards({
      ...nameWards,
      sender_ward: e.sender_ward,
      sender_ward_id: e.sender_ward_id,
    });
  };

  const getNameReceiverCallback = (e: any) => {
    setNameWards({
      ...nameWards,
      receiver_ward: e.receiver_ward,
      receiver_ward_id: e.receiver_ward_id,
    });
  };
  const getDataSenderUser = (e: any) => {
    setDataUserSetting(e);
    const data = e.filter((item: any) => {
      return item.object_key === "PAYMENT_METHODS" && item.status === "A";
    });
    setDataPayment(data);
  };
  return (
    <div className="mainPages">
      <SubHeader
        breadcrumb={[{ text: "Quản lý vận đơn" }, { text: "Tạo vận đơn" }]}
      />
      <OverlaySpinner
        text="Đang tính cước phí ..."
        open={loadingCalTotalPrice}
      />
      <OverlaySpinner
        text="Đang tạo đơn ..."
        open={stateCreateOrder.isLoading}
      />
      <Form
        form={formAddOrder}
        id="formAddOrder"
        onFinishFailed={(values: any) => console.log(values)}
        onFinish={handleCreateOrder}
        initialValues={{
          senderName: "",
          senderCode: "",
          senderPhone: "",
          senderID: "",
          senderProvince: undefined,
          senderDistrict: undefined,
          senderWard: undefined,
          tltinhgia: 250,
          tlquydoi: 250,
          thetich: 1,
          sokien: 1,
          tlhanghoa: "0",
          tienthuho: "0",
          giatrihanghoa: "0",
          mathamchieu: "",
        }}
      >
        <div className="ordersCreate">
          <MainInformation
            form={formAddOrder}
            getMethodCallback={getMethodCallback}
            getNameCallback={getNameCallback}
            getCustomerCallback={getCustomerCallback}
            getNameSenderCallback={getNameSenderCallback}
            getNameReceiverCallback={getNameReceiverCallback}
            getDataSenderUser={getDataSenderUser}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <SubLeftInformation
              data={valuesCalcPrice}
              theTich={totalWeight}
              getTotalWeightCallback={getTotalWeightCallback}
              getCargoType={getCargoType}
              getActualWeightCallback={(e: any) =>
                setValuesCalcPrice({
                  ...valuesCalcPrice,
                  actual_weight: e,
                })
              }
              getVolumetricWeightCallback={(e: any) =>
                setValuesCalcPrice({
                  ...valuesCalcPrice,
                  volumetric_weight: Number(e),
                })
              }
              getCODCallback={(e: any) =>
                setValuesCalcPrice({ ...valuesCalcPrice, cod_amount: e })
              }
              getCargoValueCallback={(e: any) =>
                setValuesCalcPrice({ ...valuesCalcPrice, cargo_value: e })
              }
              getSoKienCallback={getSoKienCallback}
              getTlQuyDoiCallback={getTlQuyDoiCallback}
            />
            <SubRightInformation
              calTotalPrice={calTotalPrice}
              dataUserSetting={dataUserSetting}
              form={formAddOrder}
              getPaymentMethodCallback={(e: any) =>
                setValuesCalcPrice({ ...valuesCalcPrice, payment_method: e })
              }
              paymentMethods={paymentMethods}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default OrdersCreate;
