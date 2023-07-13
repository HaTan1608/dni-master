import { DatePicker, Form, Modal } from "antd";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import SubHeader from "src/components/subHeader/SubHeader";
import "./styles.less";
import arrow from "../../../assets/images/arrow.svg";
import DropdownSelectAntd from "src/components/inputComponentsStyled/DropdownSelectAntd";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { columnsZones } from "./data";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import { useEffect, useState } from "react";
import AddTablePriceBody from "../components/AddTablePriceBody";
import AddTablePriceFooter from "../components/AddTablePriceFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  createOneConfigPrices,
  getListConfigPrices,
  updateOneConfigPrices,
} from "src/services/actions/config-prices.actions";
import axios from "axios";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import { dataStatus } from "src/pages/config-zones/list/data";
import moment from "moment";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconGroupBy from "src/assets/svg/SvgIconGroupBy";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import { useHistory } from "react-router-dom";
const PriceSettingList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [formTablePrice] = Form.useForm();
  const [visibleTablePrice, setVisibleTablePrice] = useState(false);
  const [tablePrices, setTablePrices] = useState<any[]>([]);
  const [selectedEdit, setSelectedEdit] = useState(0);
  const [status, setStatus] = useState("D");
  const [transportMethods, setTransportMethods] = useState<any[]>([]);
  const [calculationTypes, setCalculationTypes] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [paramsFilter, setParamsFilter] = useState<any>({
    search: undefined,
    status: undefined,
    fromDate: undefined,
    toDate: undefined,
    page: 1,
    limit: 10,
  });
  const stateCreateOnePrices = useSelector(
    (e: AppState) => e.configPricesReducer.stateCreateOneConfigPrices
  );

  const stateListPrices = useSelector(
    (e: AppState) => e.configPricesReducer.stateGetListConfigPrices
  );

  const stateUpdateConfigPrice = useSelector(
    (e: AppState) => e.configPricesReducer.stateUpdateOneConfigPrices
  );
  const [roles, setRoles] = useState<any>([]);
  const pathName = useHistory().location.pathname.slice(1);
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
                "add-price-list"
              ) {
                fakeRoles.push("add-price-list");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-price-list"
              ) {
                fakeRoles.push("modify-price-list");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "config-price-detail"
              ) {
                fakeRoles.push("config-price-detail");
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
    if (isMount) return;
    const { message, success, error, isLoading } = stateUpdateConfigPrice;
    if (!isLoading) {
      if (success) {
        let fakeArray = [...tablePrices];
        for (var i = 0; i < fakeArray.length; i++) {
          if (fakeArray[i].pricelist_id === selectedEdit) {
            let item = fakeArray.find(
              (x) => Number(x.pricelist_id) === Number(selectedEdit)
            );
            item.status = item.status === "A" ? "D" : "A";
            fakeArray = fakeArray.map((x) =>
              x.pricelist_id === selectedEdit ? item : x
            );
            break;
          }
        }
        setTablePrices(fakeArray);
        return notifySuccess("Cập nhật trạng thái thành công");
      } else if (success === false || error) {
        return notifyError("Cập nhật thất bại, lỗi:" + message);
      }
    }
  }, [stateUpdateConfigPrice.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

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
        headers['x-auth-uuid']= uuid;
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
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateCreateOnePrices;
    if (!isLoading) {
      if (success) {
        setTablePrices([...tablePrices, data]);
        formTablePrice.resetFields();

        setVisibleTablePrice(false);

        return notifySuccess(`Tạo bảng giá thành công!`);
      } else if (success === false || error) {
        return notifyError(`Có lỗi !,` + message);
      }
    }
  }, [stateCreateOnePrices.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getListConfigPrices(paramsFilter));
  }, [paramsFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading } = stateListPrices;

    if (!isLoading) {
      if (success) {
        setTablePrices(data.pricelist);
      } else if (success === false || error) {
        return notifyError(`Có lỗi !`);
      }
    }
  }, [stateListPrices.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const createTablePrice = (data: any) => {
    let params = {
      value: data.tableCode,
      description: data.tableName,
      status: status,
      service_id: data.services,
      transport_method_id: data.transportMethods,
      calculation_type_id: data.calculationTypes,
      round_weight: 0,
      round_price: 0,
      service: services.find((x) => x.value === data.services)?.label,
      transport_method: transportMethods.find(
        (x) => x.value === data.transportMethods
      )?.label,
    };
    dispatch(createOneConfigPrices(params));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const getStatus = (e: any) => {
    setStatus(e);
  };

  const openModal = () => {
    setVisibleTablePrice(true);
  };

  const exportFileCallback = () => {};

  const sortCallback = () => {};

  const importFileCallback = () => {};

  const handleChangePriceStatus = (values: any) => {
    setSelectedEdit(values.pricelist_id);
    let params = {
      value: values.value,
      description: values.description,
      status: values.status === "A" ? "D" : "A",
      service_id: values.service_id,
      transport_method_id: values.transport_method_id,
      calculation_type_id: values.calculation_type_id,
      round_weight: values.round_weight,
      round_price: values.round_price,
      service: values.service,
      transport_method: values.transport_method,
    };
    dispatch(updateOneConfigPrices(values.pricelist_id, params));
  };

  const handleChangeFilterDatetime = (data: any) => {
    setParamsFilter({
      ...paramsFilter,
      fromDate: data[0] ? moment(data[0]).format("YYYY-MM-DD") : undefined,
      toDate: data[1] ? moment(data[1]).format("YYYY-MM-DD") : undefined,
    });
  };

  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilter({
      ...paramsFilter,

      page: page,
      limit: pageSize,
    });
  };
  return (
    <div className="mainPages">
      <OverlaySpinner open={stateCreateOnePrices.isLoading} text="Đang xử lý" />
      <Form
        name="formTablePrice"
        layout="vertical"
        form={formTablePrice}
        onFinish={createTablePrice}
        onFinishFailed={onFinishFailed}
      >
        <Modal
          visible={visibleTablePrice}
          footer={
            <AddTablePriceFooter
              type={1}
              status={status}
              onClickCallback={getStatus}
            />
          }
          title="Thêm mới bảng giá"
          className="modalAddStores"
          onCancel={() => setVisibleTablePrice(false)}
          width={1215}
        >
          <AddTablePriceBody
            services={services}
            transportMethods={transportMethods}
            calculationTypes={calculationTypes}
          />
        </Modal>{" "}
      </Form>
      <SubHeader
        breadcrumb={[{ text: "Bảng giá" }, { text: "Thiết lập bảng giá" }]}
        button={roles.find((x:any) => x === "add-price-list")&&[
          {
            text: "Thêm",
            class: "mainBtn plusSvg",
            svg: <SvgIconPlus />,
            onClick: openModal,
          },
        ]}
      />
      <div className="contentBody">
        <div className="searchConfigZones">
          <InputNewStyled
            {...defaultStyles}
            placeholder="Mã bảng giá, tên bảng giá"
            suffixIcon={<SvgIconSearch />}
            suffixLeft="12px"
            padding="0px 12px 0px 36px"
            width="calc(50% - 24px)"
            onChange={(e: any) =>
              setParamsFilter({ ...paramsFilter, search: e })
            }
          />
          <DatePicker.RangePicker
            onChange={(e: any) => handleChangeFilterDatetime(e)}
          />
          <DropdownSelectAntd
            {...defaultStyles}
            placeholder="TT Hoạt động"
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) =>
              setParamsFilter({ ...paramsFilter, status: e })
            }
            padding="0"
            options={dataStatus}
            width="15%"
          />
          <ButtonStyled
            {...defaultStyles}
            text="Tìm kiếm"
            svg={<SvgIconSearch />}
            svgMargin="0 8px 0 0"
            width="15%"
          />
        </div>
        <ActionsHeader
          // actions={[
          //   {
          //     text: "Xuất file",
          //     callback: exportFileCallback,
          //     svg: <SvgIconExportFile />,
          //     scale: true,
          //   },
          //   {
          //     text: "Nhập file",
          //     callback: importFileCallback,
          //     svg: <SvgIconImportFile />,
          //     scale: true,
          //   },
          //   {
          //     text: "Sắp xếp",
          //     callback: sortCallback,
          //     svg: <SvgIconGroupBy />,
          //     scale: true,
          //   },
          // ]}
        />
        <TableStyledAntd
          rowKey={"pricelist_id"}
          columns={columnsZones({ handleChangePriceStatus,roles:roles })}
          dataSource={[...tablePrices]}
          loading={false}
          pagination={false}
          bordered
          widthCol1="10%"
          widthCol2="16%"
          widthCol3="10%"
          widthCol4="13%"
          widthCol5="13%"
          widthCol6="12%"
          widthCol7="12%"
          widthCol8="10%"
          widthCol9="100px"
          paddingItemBody="8px 16px"
        />

        <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilter.page}
          pageSize={paramsFilter.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() =>
            `Tổng ${stateListPrices.data?stateListPrices?.data?.paging?.totalPage:0} bảng giá `
          }
          total={stateListPrices?.data?.paging?.totalPage}
        />
      </div>
    </div>
  );
};

export default PriceSettingList;
