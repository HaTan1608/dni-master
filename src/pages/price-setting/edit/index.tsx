import { Form, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import {
  getConfigPricesById,
  getListConfigPricesApplys,
  getListConfigPricesDetails,
  updateOneConfigPrices,
  updateOneConfigPricesApplys,
  updateOneConfigPricesDetails,
} from "src/services/actions/config-prices.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import arrow from "../../../assets/images/arrow.svg";
import AddCustomerBody from "../components/AddCustomerBody";
import AddCustomerFooter from "../components/AddCustomerFooter";
import AddPriceBody from "../components/AddPriceBody";
import AddPriceFooter from "../components/AddPriceFooter";
import FilterCustomer from "../components/FilterCustomer";
import FilterPrice from "../components/FilterPrice";
import HeaderPriceSetting from "../components/HeaderPriceSetting";
import { columnsCustomers, columnsPrice, dataStatus } from "./data";
import "./styles.less";

export const dataGroupCustomer = [{ value: 1, label: "Khách hàng chuẩn" }];

const PriceSettingEdit = () => {
  const dispatch = useDispatch();
  const paramsURL = useParams<any>();
  const [formEditPriceSetting] = Form.useForm();
  const history = useHistory();
  const isMount = useIsMount();
  const [formCustomer] = Form.useForm();
  const [formPrice] = Form.useForm();
  const [activeTab, setActiveTab] = useState(1);
  const [visiblePrice, setVisiblePrice] = useState(false);
  const [visibleCustomer, setVisibleCustomer] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [status, setStatus] = useState("D");
  const [transportMethods, setTransportMethods] = useState<any[]>([]);
  const [calculationTypes, setCalculationTypes] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [configPriceDetails, setConfigPriceDetails] = useState<any[]>([]);
  const [configPriceApplys, setConfigPriceApplys] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [configZones, setConfigZones] = useState<any[]>([]);
  const [applyTypes, setApplyTypes] = useState<any[]>([]);
  const [totalConfigPriceDetails, setTotalConfigPriceDetails] = useState<any[]>(
    []
  );
  const [totalConfigPriceApplys, setTotalConfigPriceApplys] = useState<any[]>(
    []
  );
  const [paramsAdd, setParamsAdd] = useState({
    city_from: undefined,
    city_to: undefined,
    district_from: undefined,
    district_to: undefined,
    status: "A",
  });

  const [paramsFilterDetails, setParamsFilterDetails] = useState<any>({
    search: undefined,
    pricelist_id: undefined,
    apply_type_id: undefined,
    status: undefined,
    page: 1,
    limit: 10,
  });

  const [paramsFilterCustomers, setParamsFilterCustomers] = useState<any>({
    search: undefined,
    pricelist_id: undefined,
    customer_group_id: undefined,
    status: undefined,
    fromDate: undefined,
    toDate: undefined,
    page: 1,
    limit: 10,
  });
  const stateConfigPriceId = useSelector(
    (e: AppState) => e.configPricesReducer.stateGetConfigPricesById
  );

  const stateUpdateConfigPrice = useSelector(
    (e: AppState) => e.configPricesReducer.stateUpdateOneConfigPrices
  );

  const stateConfigPriceDetailsList = useSelector(
    (e: AppState) => e.configPricesReducer.stateGetListConfigPricesDetails
  );

  const stateUpdateConfigPriceDetails = useSelector(
    (e: AppState) => e.configPricesReducer.stateUpdateOneConfigPricesDetails
  );

  const stateConfigPriceApplysList = useSelector(
    (e: AppState) => e.configPricesReducer.stateGetListConfigPricesApplys
  );

  const stateUpdateConfigPriceApplys = useSelector(
    (e: AppState) => e.configPricesReducer.stateUpdateOneConfigPricesApplys
  );
  const [selectedEditPriceDetail, setSelectedEditPriceDetail] = useState<any>();
  const [selectedEditPriceApply, setSelectedEditPriceApply] = useState<any>();
  const [roles, setRoles] = useState<any>([]);
  const pathName = useHistory().location.pathname.slice(1, 14);
  useEffect(() => {
    let _dataUser = JSON.parse(localStorage.getItem("ACCOUNT") || "");
    let fakeRoles = [];
    if (_dataUser?.menu) {
      for (let i = 0; i < _dataUser.menu.length; i++) {
        for (let j = 0; j < _dataUser.menu[i].children.length; j++) {
          if (
            _dataUser.menu[i].children[j].funct_code === pathName.toString()
          ) {
            for (
              let k = 0;
              k < _dataUser.menu[i].children[j].children.length;
              k++
            ) {
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-list-config-price"
              ) {
                fakeRoles.push("update-list-config-price");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "config-price-details"
              ) {
                fakeRoles.push("config-price-details");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-list-config-apply"
              ) {
                fakeRoles.push("update-list-config-apply");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-price-list"
              ) {
                fakeRoles.push("modify-price-list");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  useEffect(() => {
    const getZone = async () => {
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
          `${API_URL}/${ROOT_VERSION}/apply-types`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.applyTypes.length; i++) {
            if (data?.data?.applyTypes[i].status === "A") {
              fakeZones.push({
                label: data?.data?.applyTypes[i].name,
                value: data?.data?.applyTypes[i].apply_type_id,
              });
            }
          }
          setApplyTypes(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getZone();
    return () => {
      setApplyTypes([]);
    };
  }, []);

  useEffect(() => {
    const getZone = async () => {
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
          `${API_URL}/${ROOT_VERSION}/customers`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.users.length; i++) {
            if (data?.data?.users[i].status === "A") {
              fakeZones.push({
                label: (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{data?.data?.users[i].phone}</div>&nbsp;&nbsp;
                    <div>{data?.data?.users[i].customer_name}</div>
                  </div>
                ),
                phone: `${data?.data?.users[i].phone} ${data?.data?.users[i].customer_name}`,
                value: data?.data?.users[i].id,
                name: data?.data?.users[i].customer_name,
              });
            }
          }

          setCustomers(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getZone();
    return () => {
      setCustomers([]);
    };
  }, []);

  useEffect(() => {
    const getZone = async () => {
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
          `${API_URL}/${ROOT_VERSION}/config-zones`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.zonesERP.length; i++) {
            if (data?.data?.zonesERP[i].status === "A") {
              fakeZones.push({
                label: data?.data?.zonesERP[i].name,
                value: data?.data?.zonesERP[i].zone_id,
              });
            }
          }
          setConfigZones(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getZone();
    return () => {
      setConfigZones([]);
    };
  }, []);

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
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/transportation-methods`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.transportationMethods.length; i++) {
            fakeZones.push({
              label: data?.data?.transportationMethods[i].transportation_name,
              value: data?.data?.transportationMethods[i].id,
            });
          }
          setTransportMethods(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getZone();
    return () => {
      setTransportMethods([]);
    };
  }, []);

  useEffect(() => {
    const getCalculation = async () => {
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
          `${API_URL}/${ROOT_VERSION}/calculation-types`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.calculationTypes.length; i++) {
            fakeZones.push({
              label: data?.data?.calculationTypes[i].description,
              value: data?.data?.calculationTypes[i].calculation_type_id,
            });
          }
          setCalculationTypes(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCalculation();
    return () => {
      setCalculationTypes([]);
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
          let fakeZones = [];
          for (var i = 0; i < data?.data?.services.length; i++) {
            fakeZones.push({
              label: data?.data?.services[i].service_name,
              value: data?.data?.services[i].id,
            });
          }
          setServices(fakeZones);
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
    dispatch(getConfigPricesById(paramsURL?.id));
    setParamsFilterDetails({
      ...paramsFilterDetails,
      pricelist_id: paramsURL?.id,
    });
    setParamsFilterCustomers({
      ...paramsFilterCustomers,
      pricelist_id: paramsURL?.id,
    });
    formPrice.resetFields();
    setStatus("D");
  }, [paramsURL?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!stateUpdateConfigPriceDetails.isLoading) {
      dispatch(getListConfigPricesDetails(paramsFilterDetails));
      const getServices = async () => {
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
            `${API_URL}/${ROOT_VERSION}/config-price-details?pricelist_id=${paramsURL.id}`,
            {
              headers: headers,
            }
          );
          if (data) {
            setTotalConfigPriceDetails(data?.data?.pricelistDetail);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getServices();
      return () => {
        setTotalConfigPriceDetails([]);
      };
    }
  }, [paramsFilterDetails, stateUpdateConfigPriceDetails.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!stateUpdateConfigPriceApplys.isLoading) {
      dispatch(getListConfigPricesApplys(paramsFilterCustomers));
      const getServices = async () => {
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
            `${API_URL}/${ROOT_VERSION}/config-price-applys?pricelist_id=${paramsURL.id}`,
            {
              headers: headers,
            }
          );
          if (data) {
            setTotalConfigPriceApplys(data?.data?.pricelistApply);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getServices();
      return () => {
        setTotalConfigPriceDetails([]);
      };
    }
  }, [paramsFilterCustomers, stateUpdateConfigPriceApplys.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateUpdateConfigPrice;
    if (!isLoading) {
      if (success) {
        history.push({
          pathname: routerNames.PRICE_SETTING,
        });
        return notifySuccess("Cập nhật thành công");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateUpdateConfigPrice.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateConfigPriceDetailsList;
    if (!isLoading) {
      if (success) {
        setVisiblePrice(false);
        setConfigPriceDetails(data?.pricelistDetail);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateConfigPriceDetailsList.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateConfigPriceApplysList;
    if (!isLoading) {
      if (success) {
        setVisibleCustomer(false);

        setConfigPriceApplys(data?.pricelistApply);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateConfigPriceApplysList.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  const getActiveTabCallback = (e: any) => {
    setActiveTab(e);
  };

  const createPrice = (data: any) => {
    if (typeModal === 1) {
      let params = {
        pricelist_id: paramsURL.id,
        listDetail: [
          ...totalConfigPriceDetails,
          {
            pricelist_detail_id: 0,
            status: status,
            zone_id: data.configPriceZones,
            zone_value: configZones.find((x) => x.id === data.configPriceZones)
              ?.label,
            from_point: data.configPriceFrom,
            to_point: data.configPriceTo,
            apply_type_id: data.configPriceApply,
            step: data.configPriceStep,
            unitprice: data.configPriceUnit,
          },
        ],
      };
      dispatch(updateOneConfigPricesDetails(params));
    }
    if (typeModal === 2) {
      let editParams = totalConfigPriceDetails.find(
        (x) =>
          x.pricelist_detail_id === selectedEditPriceDetail.pricelist_detail_id
      );
      if (editParams) {
        editParams.status = status;
        editParams.zone_id = data.configPriceZones;
        editParams.zone_value = configZones.find(
          (x) => x.id === data.configPriceZones
        )?.label;
        editParams.from_point = data.configPriceFrom;
        editParams.to_point = data.configPriceTo;
        editParams.apply_type_id = data.configPriceApply;
        editParams.step = data.configPriceStep;
        editParams.unitprice = data.configPriceUnit;
        let params = {
          pricelist_id: paramsURL.id,
          listDetail: totalConfigPriceDetails.map((x) =>
            x.pricelist_detail_id === editParams.pricelist_detail_id
              ? editParams
              : x
          ),
        };
        dispatch(updateOneConfigPricesDetails(params));
      } else {
        notifyWarning("Đơn giá này không tồn tại!");
      }
    }
  };
  const createCustomer = (data: any) => {
    if (typeModal === 1) {
      let params = {
        pricelist_id: paramsURL.id,
        listDetail: [
          ...totalConfigPriceApplys,
          {
            pricelist_apply_id: 0,
            status: status,
            customer_group_id: data.customerGroup,
            customer_group: dataGroupCustomer.find(
              (x) => Number(x.value) === Number(data.customerGroup)
            )?.label,
            customer_id: data.customerName,
            customer: customers.find((x) => x.value === data.customerName)
              ?.name,
            surcharge_rate: data.customerPhuPhi,
            discount_rate: data.customerChietKhau,
            start_date: data.customerTime[0]
              ? moment(data.customerTime[0]).format("YYYY-MM-DD")
              : undefined,
            end_date: data.customerTime[1]
              ? moment(data.customerTime[1]).format("YYYY-MM-DD")
              : undefined,
            vat_rate: data.customerVAT,
          },
        ],
      };
      dispatch(updateOneConfigPricesApplys(params));
    }
    if (typeModal === 2) {
      let editParams = totalConfigPriceApplys.find(
        (x) =>
          x.pricelist_apply_id === selectedEditPriceApply.pricelist_apply_id
      );
      if (editParams) {
        editParams.customer_group_id = data.customerGroup;
        editParams.status = status;
        editParams.customer_id = data.customerName;
        editParams.customer = customers.find(
          (x) => x.value === data.customerName
        )?.name;
        editParams.surcharge_rate = data.customerPhuPhi;
        editParams.discount_rate = data.customerChietKhau;
        editParams.start_date = data.customerTime[0]
          ? moment(data.customerTime[0]).format("YYYY-MM-DD")
          : undefined;
        editParams.end_date = data.customerTime[1]
          ? moment(data.customerTime[1]).format("YYYY-MM-DD")
          : undefined;
        editParams.vat_rate = data.customerVAT;
        let params = {
          pricelist_id: paramsURL.id,
          listDetail: totalConfigPriceApplys.map((x) =>
            x.pricelist_apply_id === editParams.pricelist_apply_id
              ? editParams
              : x
          ),
        };
        dispatch(updateOneConfigPricesApplys(params));
      } else {
        notifyWarning("Khách háng này không tồn tại!");
      }
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const getStatus = (e: any) => {
    setStatus(e);
  };

  const onClickBtnAddCustomerCallback = () => {
    setVisibleCustomer(true);
    setTypeModal(1);
    formCustomer.resetFields();
    setStatus("D");
  };

  const onClickBtnAddPriceCallback = () => {
    setVisiblePrice(true);
    setTypeModal(1);
    formPrice.resetFields();
    setStatus("D");
  };

  const editPriceSetting = (values: any) => {
    let params = {
      value: values.value,
      description: values.description,
      status: values.status,
      service_id: values.service,
      transport_method_id: values.transport_method,
      calculation_type_id: values.calculation_type,
      round_weight: values.round_weight,
      round_price: values.round_price,
      service: services.find((x) => x.value === values.service)?.label,
      transport_method: transportMethods.find(
        (x) => x.value === values.transport_method
      )?.label,
    };
    dispatch(updateOneConfigPrices(paramsURL.id, params));
  };

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateConfigPriceId;
    if (!isLoading) {
      if (success) {
        formEditPriceSetting.setFieldsValue({
          value: data?.price?.value,
          description: data?.price?.description,
          service: data?.price?.service_id,
          transport_method: data?.price?.transport_method_id,
          status: data?.price?.status,
          calculation_type: data?.price?.calculation_type_id,
          round_price: data?.price?.round_price,
          round_weight: data?.price?.round_weight,
        });
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateConfigPriceId.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } =
      stateUpdateConfigPriceDetails;
    if (!isLoading) {
      if (success) {
        return notifySuccess("Cập nhật thành công!");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateUpdateConfigPriceDetails.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateUpdateConfigPriceApplys;
    if (!isLoading) {
      if (success) {
        return notifySuccess("Cập nhật thành công!");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateUpdateConfigPriceApplys.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeStatusPriceDetail = (e: any) => {
    console.log(e);
    setSelectedEditPriceDetail(e);
    let editParams = totalConfigPriceDetails.find(
      (x) => x.pricelist_detail_id === e.pricelist_detail_id
    );
    if (editParams) {
      editParams.status = editParams.status === "A" ? "D" : "A";
      let params = {
        pricelist_id: paramsURL.id,
        listDetail: totalConfigPriceDetails.map((x) =>
          x.pricelist_detail_id === editParams.pricelist_detail_id
            ? editParams
            : x
        ),
      };
      dispatch(updateOneConfigPricesDetails(params));
    }
  };

  const handleChangeStatusPriceApply = (e: any) => {
    setSelectedEditPriceApply(e);
    let editParams = totalConfigPriceApplys.find(
      (x) => x.pricelist_apply_id === e.pricelist_apply_id
    );
    if (editParams) {
      editParams.status = editParams.status === "A" ? "D" : "A";
      editParams.isactive = undefined;
      editParams.created = undefined;
      editParams.updated = undefined;
      editParams.pricelist_id = undefined;
      editParams.partner_id = undefined;
      let params = {
        pricelist_id: paramsURL.id,
        listDetail: totalConfigPriceApplys.map((x) =>
          x.pricelist_apply_id === editParams.pricelist_apply_id
            ? editParams
            : x
        ),
      };
      dispatch(updateOneConfigPricesApplys(params));
    }
  };

  const openEditPriceDetails = (e: any) => {
    setSelectedEditPriceDetail(e);
    formPrice.setFieldsValue({
      configPriceZones: e?.zone_id,
      configPriceFrom: e?.from_point,
      configPriceTo: e?.to_point,
      configPriceApply: e?.apply_type_id,
      configPriceStep: e?.step,
      configPriceUnit: e?.unitprice,
    });
    setStatus(e.status);
    setVisiblePrice(true);
    setTypeModal(2);
  };

  const openEditPriceApplys = (e: any) => {
    setSelectedEditPriceApply(e);
    formCustomer.setFieldsValue({
      customerName: e?.customer_id,
      customerGroup: e?.customer_group_id,
      customerChietKhau: e?.discount_rate,
      customerPhuPhi: e?.surcharge_rate,
      customerVAT: e?.vat_rate,
      customerTime: [
        moment(`${e.start_date}`, "YYYY-MM-DD"),
        moment(`${e.end_date}`, "YYYY-MM-DD"),
      ],
    });
    setStatus(e.status);
    setVisibleCustomer(true);
    setTypeModal(2);
  };

  const getValuesFilterCallback = (values: any) => {
    setParamsFilterDetails({
      ...paramsFilterDetails,
      search: values.filterName,
      apply_type_id: values.filterApplyType,
      status: values.filterStatus,
    });
  };

  const getValuesFilterCustomerCallback = (values: any) => {
    setParamsFilterCustomers({
      ...paramsFilterCustomers,
      search: values.filterName,
      customer_group_id: values.filterGroupCustomer,
      status: values.filterStatus,
      fromDate: values.filterStart,
      toDate: values.filterEnd,
    });
  };
  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilterDetails({
      ...paramsFilterDetails,

      page: page,
      limit: pageSize,
    });
  };

  const onChangePagingCustomer = (page: number, pageSize: number) => {
    setParamsFilterCustomers({
      ...paramsFilterCustomers,

      page: page,
      limit: pageSize,
    });
  };
  return (
    <div className="mainPages">
      <OverlaySpinner
        text="Đang xử lý ..."
        open={stateUpdateConfigPriceDetails.isLoading}
      />
      <Form
        name="formPrice"
        layout="vertical"
        form={formPrice}
        onFinish={createPrice}
        onFinishFailed={onFinishFailed}
      >
        <Modal
          visible={visiblePrice}
          footer={
            typeModal === 1 ? (
              <AddPriceFooter
                type={typeModal}
                status={status}
                onClickCallback={getStatus}
              />
            ) : (
              <AddPriceFooter
                type={typeModal}
                status={status}
                onClickCallback={getStatus}
              />
            )
          }
          title={typeModal === 1 ? "Tạo mới đơn giá" : "Thông tin đơn giá"}
          className="modalAddStores"
          onCancel={() => setVisiblePrice(false)}
          width={1215}
        >
          <AddPriceBody
            type={typeModal}
            configZones={configZones}
            applyTypes={applyTypes}
          />
        </Modal>
      </Form>
      <Form
        name="formCustomer"
        layout="vertical"
        form={formCustomer}
        onFinish={createCustomer}
        onFinishFailed={onFinishFailed}
      >
        <Modal
          visible={visibleCustomer}
          footer={
            typeModal === 1 ? (
              <AddCustomerFooter
                type={typeModal}
                status={status}
                onClickCallback={getStatus}
              />
            ) : (
              <AddCustomerFooter
                type={typeModal}
                status={status}
                onClickCallback={getStatus}
              />
            )
          }
          title={
            typeModal === 1 ? "Tạo mới khách hàng" : "Thông tin khách hàng"
          }
          className="modalAddStores"
          onCancel={() => setVisibleCustomer(false)}
          width={1215}
        >
          <AddCustomerBody
            type={typeModal}
            customers={customers}
            dataGroupCustomer={dataGroupCustomer}
          />
        </Modal>{" "}
      </Form>
      <SubHeader
        breadcrumb={[
          { text: "Bảng giá" },
          { text: "Thiết lập bảng giá", link: routerNames.PRICE_SETTING },
          { text: "Chi tiết bảng giá" },
        ]}
        button={
          roles.find((x: any) => x === "modify-price-list") && [
            {
              text: "Lưu",
              class: "mainBtn plusSvg",
              svg: <SvgIconStorage />,
              form: "formEditPriceSetting",
              htmlType: "submit",
            },
          ]
        }
      />
      <div className="editPriceSetting">
        <Form
          name="formEditPriceSetting"
          form={formEditPriceSetting}
          onFinish={editPriceSetting}
          onFinishFailed={onFinishFailed}
        >
          <FormInputAntd
            label="Mã bảng giá"
            name="value"
            {...defaultStyles}
            placeholder="Nhập mã bảng giá"
            labelFontSize="12px"
            width="calc((100% - 40px) /6)"
            margin="0 8px 0 0"
          />
          <FormInputAntd
            {...defaultStyles}
            label="Tên bảng giá"
            name="description"
            placeholder="Nhập tên bảng giá"
            labelFontSize="12px"
            width="calc((100% - 40px) /6)"
            margin="0 8px 0 0"
          />
          <FormSelectAntd
            label="Dịch vụ"
            name="service"
            {...defaultStyles}
            placeholder="Chọn dịch vụ"
            suffixIcon={<img src={arrow} alt="" />}
            onChange={(e: any) => console.log(e)}
            options={services}
            padding="0"
            width="calc((100% - 40px) /6)"
            margin="0 8px 0 0"
          />

          <FormSelectAntd
            label="Phương thức vận chuyển"
            name="transport_method"
            {...defaultStyles}
            placeholder="Chọn phương thức"
            suffixIcon={<img src={arrow} alt="" />}
            onChange={(e: any) => setParamsAdd({ ...paramsAdd, city_from: e })}
            options={transportMethods}
            padding="0"
            width="calc((100% - 40px) /6)"
            margin="0 8px 0 0"
          />
          <FormSelectAntd
            label="Quy tắc áp giá"
            name="calculation_type"
            {...defaultStyles}
            placeholder="Chọn quy tắc"
            suffixIcon={<img src={arrow} alt="" />}
            onChange={(e: any) => console.log(e)}
            padding="0"
            options={calculationTypes}
            width="calc(((100% - 40px) /6) * 2)"
            margin="0 8px 0 0"
          />

          <FormInputAntd
            label="Làm tròn trọng lượng"
            name="round_weight"
            {...defaultStyles}
            placeholder="Nhập mã vùng"
            labelFontSize="12px"
            defaultValue="0"
            width="calc((100% - 40px) /6)"
            margin="32px 8px 0 0"
          />
          <FormInputAntd
            label="Làm tròn giá"
            name="round_price"
            {...defaultStyles}
            placeholder="Nhập mã vùng"
            defaultValue="0"
            labelFontSize="12px"
            width="calc((100% - 40px) /6)"
            margin="32px 8px 0 0"
          />
          <FormSelectAntd
            label="Trạng thái hoạt động"
            name="status"
            {...defaultStyles}
            placeholder="Chọn trạng thái"
            suffixIcon={<img src={arrow} alt="" />}
            onChange={(e: any) => setParamsAdd({ ...paramsAdd, city_to: e })}
            padding="0"
            options={dataStatus}
            width="calc((100% - 40px) /6)"
            margin="12px 0 0 0"
          />
        </Form>
      </div>
      <HeaderPriceSetting getActiveTabCallback={getActiveTabCallback} />
      {activeTab === 2 && (
        <div className="tablePriceSettingEdit">
          <FilterCustomer
            onClickBtnAddCallback={onClickBtnAddCustomerCallback}
            getValuesFilterCustomerCallback={getValuesFilterCustomerCallback}
            dataGroupCustomer={dataGroupCustomer}
            roles={roles}
          />
          <TableStyledAntd
            rowKey={"pricelist_apply_id"}
            columns={columnsCustomers({
              handleChangeStatusPriceApply,
              openEditPriceApplys,
              roles,
            })}
            dataSource={configPriceApplys}
            loading={false}
            pagination={false}
            bordered
            widthCol1="5%"
            widthCol2="14.75%"
            widthCol3="10%"
            widthCol4="11.75%"
            widthCol5="14%"
            widthCol6="8%"
            widthCol7="11%"
            widthCol8="11%"
            widthCol9="10.5%"
            widthCol10="4%"
            paddingItemBody="8px 16px"
          />
          <PanigationAntStyled
            style={{ marginTop: "8px" }}
            current={paramsFilterCustomers.page}
            pageSize={paramsFilterCustomers.limit}
            showSizeChanger
            onChange={onChangePagingCustomer}
            showTotal={() =>
              `Tổng ${stateConfigPriceApplysList.data?stateConfigPriceApplysList?.data?.paging?.totalPage:0} khách hàng`
            }
            total={stateConfigPriceApplysList?.data?.paging?.totalPage}
          />
        </div>
      )}
      {activeTab === 1 && (
        <div className="tablePriceSettingEdit">
          <FilterPrice
            onClickBtnAddCallback={onClickBtnAddPriceCallback}
            getValuesFilterCallback={getValuesFilterCallback}
            applyTypes={applyTypes}
            roles={roles}
          />

          <TableStyledAntd
            className="pricelist_detail_table"
            rowKey={"pricelist_detail_id"}
            columns={columnsPrice({
              handleChangeStatusPriceDetail,
              openEditPriceDetails,
              applyTypes,
              roles: roles,
            })}
            dataSource={configPriceDetails}
            loading={stateConfigPriceDetailsList.isLoading}
            pagination={false}
            bordered={false}
            widthCol1="5%"
            widthCol2="13%"
            widthCol3="13%"
            widthCol4="13%"
            widthCol5="13%"
            widthCol6="13%"
            widthCol7="13%"
            widthCol8="12%"
            widthCol9="5%"
            paddingItemBody="8px 16px"
          />
          <PanigationAntStyled
            style={{ marginTop: "8px" }}
            current={paramsFilterDetails.page}
            pageSize={paramsFilterDetails.limit}
            showSizeChanger
            onChange={onChangePaging}
            showTotal={() =>
              `Tổng ${stateConfigPriceDetailsList.data?stateConfigPriceDetailsList?.data?.paging?.totalPage:0} đơn giá `
            }
            total={stateConfigPriceDetailsList?.data?.paging?.totalPage}
          />
        </div>
      )}
    </div>
  );
};

export default PriceSettingEdit;
