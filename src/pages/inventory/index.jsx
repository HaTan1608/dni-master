/* eslint-disable */
import { DatePicker, Form, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import arrow from "src/assets/images/arrow.svg";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import PrintBillA5 from "src/components/filePrint/PrintBillA5";
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
  createOneDeliveryBill,
  getListOrders,
} from "src/services/actions/orders.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetToken } from "src/utils/localStorage";
import styled from "styled-components";
import OrderInformations from "../listed/orders/components/OrderInformations";
import ComponentToPrint from "../test/ComponentToPrint";
import { columnsHoanTatDonHang, getStatusColor } from "./data";
const XuatKhoTraHang = () => {
  const isMount = useIsMount();
  const [formSearch] = Form.useForm();
  const [formDriver] = Form.useForm();
  const dispatch = useDispatch();
  const importFileCallback = () => {};
  const [openInformationOrder, setOpenInformationOrder] = useState(false);
  const [transportMethods, setTrainsportMethods] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [selectedEditBills, setSelectedEditBills] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [orderInformation, setOrderInformation] = useState({});
  const [singleBill, setSingleBill] = useState([]);
  const [openVehicleList, setOpenVehicleList] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [startDate, setStartDate] = useState(
    moment(new Date(), "YYYY-MM-dd HH:mm:ss")
  );
  const [paramsFilter, setParamsFilter] = useState({
    status: 17,
    isToWarehouse: true,
    limit: 10,
    page: 1,
    count_num_issue: 1,
  });
  const componentRef = useRef();
  const [loadingPrint, setLoadingPrint] = useState(false);
  const printDataCallback = async (e) => {
    await setSelectedOrder([e]);
    handlePrint();
  };
  const { stateGetListOrders } = useSelector((state) => state.ordersReducer);
  const { stateChangeStatusBills } = useSelector(
    (state) => state.ordersReducer
  );

  const { stateCreateDeliveryBill } = useSelector(
    (state) => state.ordersReducer
  );

  useEffect(() => {
    if (
      !stateChangeStatusBills.isLoading &&
      !stateCreateDeliveryBill.isLoading
    ) {
      dispatch(getListOrders(paramsFilter));
    }
  }, [
    paramsFilter,
    stateChangeStatusBills.isLoading,
    stateCreateDeliveryBill.isLoading,
  ]);
  const openModalCallback = (e, data) => {
    setOpenInformationOrder(true);
    setOrderInformation(data);
  };

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateGetListOrders;
    if (!isLoading) {
      if (success) {
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateGetListOrders.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateCreateDeliveryBill;
    if (!isLoading) {
      if (success) {
        setSelectedEditBills([]);
        setSelectedRows([]);
        setSelectedVehicle(0);
        setStartDate(moment(new Date(), "YYYY-MM-dd HH:mm:ss"));
        setOpenVehicleList(false);
        formDriver.resetFields();
        notifySuccess("Tạo phiếu xuất kho thành công");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateCreateDeliveryBill.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateChangeStatusBills;
    if (success) {
      setSelectedEditBills([]);
      setSelectedRows([]);
      setSingleBill([]);
      return notifySuccess("Chuyển trạng thái đơn thành công");
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateChangeStatusBills.isLoading]);
  // useEffect(() => {
  //   eventEmitter.on("UPLOAD_PROGRESS", async (percent) => {
  //     console.log(percent);
  //   });
  //   return function cleanup() {
  //     eventEmitter.off("UPLOAD_PROGRESS", () => console.log("off"));
  //   };
  // }, []);
  useEffect(() => {
    const getProvinces = async () => {
      let headers = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces`,
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
          setProvinces(fakeProvinces);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProvinces();
    return () => {
      setProvinces([]);
    };
  }, []);

  useEffect(() => {
    const getDistrict = async () => {
      let headers = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/districts?province_id=${selectedProvinceId}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeDistricts = [];
          for (var i = 0; i < data?.data?.districts.length; i++) {
            fakeDistricts.push({
              label: data?.data?.districts[i].district_name,
              value: data?.data?.districts[i].id,
            });
          }
          setDistricts(fakeDistricts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedProvinceId > 0) {
      getDistrict();
    }
    return () => {
      setDistricts([]);
    };
  }, [selectedProvinceId]);

  useEffect(() => {
    const getTransportMethods = async () => {
      let headers = {
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
          let convertData = [];
          for (var i = 0; i < data?.data?.transportationMethods.length; i++) {
            convertData.push({
              value: data?.data?.transportationMethods[i]?.id,
              label: data?.data?.transportationMethods[i]?.transportation_name,
            });
          }
          setTrainsportMethods(convertData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransportMethods();
    return () => {
      setTrainsportMethods([]);
    };
  }, []);

  const rowSelection = {
    selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  const onChangePaging = (page, pageSize) => {
    setParamsFilter({ ...paramsFilter, page: page, limit: pageSize });
  };

  const handleFinishSearch = (values) => {
    setParamsFilter({
      ...paramsFilter,
      search: values.search,
      transportation_method_id: values.transportation_method_id,
      fromDate: values.datePicker
        ? moment(values.datePicker[0]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      toDate: values.datePicker
        ? moment(values.datePicker[1]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      receiver_province_id: values.receiver_province_id,
      receiver_district_id: values.receiver_district_id,
    });
  };

  const handleResetSearch = () => {
    formSearch.resetFields();
    setSelectedProvinceId(0);
    setParamsFilter({
      ...paramsFilter,
      search: "",
      transportation_method_id: undefined,
      fromDate: undefined,
      toDate: undefined,
      receiver_province_id: undefined,
      receiver_district_id: undefined,
    });
  };
  const handleSelectVehicle = (values) => {
    console.log(values);
  };
  const calcWeight = (array) => {
    let totalWeight = 0;
    for (var i = 0; i < array.length; i++) {
      totalWeight += array[i].real_weight;
    }
    return totalWeight;
  };

  const chooseStartdateCallback = (values) => {
    setStartDate(values);
  };

  const chooseVehicleCallback = (values) => {
    setSelectedVehicle(values);
  };
  const callbackVehicleType2 = (values) => {
    console.log(values);
    if (!startDate) {
      notifyWarning("Vui lòng chọn ngày xuất kho!");
      return;
    }

    const warehouse = JSON.parse(localStorage.getItem("ACCOUNT") || "")
      ?.warehouse[0];
    if (!warehouse) {
      notifyWarning("Không lấy được kho của tài khoản");
      return;
    }
    let params = {
      vehicle_id: selectedVehicle,
      export_warehouse: warehouse?.id,
      export_warehouse_name: warehouse?.ws_name,
      listBill:
        singleBill.length > 0
          ? singleBill.map(function (item) {
              return item["bill_code"];
            })
          : selectedEditBills,
      export_at: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      total_weight:
        singleBill.length > 0
          ? calcWeight(singleBill)
          : calcWeight(selectedRows),

      number_of_bill:
        singleBill.length > 0 ? singleBill.length : selectedEditBills.length,

      service_type: 2,
      sub_driver_name: values.nameSub,
      driver_name: values.name,
      driver_phone: values.phone,
      vehicle_number: values.biensoxe,
      supplier_name: values.supply,
    };
    dispatch(createOneDeliveryBill(params));
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      formSearch.submit();
    }
  };
  const onBeforeGetContentResolve = useRef();
  const handleOnBeforeGetContent = () => {
    return new Promise((resolve) => {
      setLoadingPrint(true);
      onBeforeGetContentResolve.current = resolve;
    });
  };

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current;
    },
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: () => setLoadingPrint(false),
    onPrintError: () => setLoadingPrint(false),
  });

  useEffect(() => {
    if (loadingPrint) {
      onBeforeGetContentResolve.current && onBeforeGetContentResolve.current();
    }
  }, [loadingPrint, onBeforeGetContentResolve]);
  return (
    <div className="mainPages">
      <OverlaySpinner text="Đang tải máy in ..." open={loadingPrint} />
      <Modal
        visible={openInformationOrder}
        maskClosable={false}
        centered
        title={
          <div className="orderInformationHeader">
            Mã vận đơn:&nbsp;
            <span className="orderInformationHeader-code">
              {orderInformation?.bill_code}
            </span>
            <span
              className="orderInformationHeader-status"
              style={{
                background: getStatusColor(orderInformation?.bill_status_id)
                  ?.color,
              }}
            >
              {orderInformation?.bill_status_name}
            </span>
          </div>
        }
        // className="modalOrderInformation"
        onCancel={() => setOpenInformationOrder(false)}
        footer={null}
        width={1300}
        // style={{ top: "50px", height: "100vh!important" }}
      >
        <OrderInformations dataOrder={orderInformation} />
      </Modal>
      <SubHeader
        breadcrumb={[
          { text: "Điểu phối vận đơn" },
          { text: "Quản lý hàng tồn" },
        ]}
      />
      <Form
        form={formSearch}
        onFinish={handleFinishSearch}
        style={{ width: "100%" }}
        initialValues={{
          search: "",
        }}
      >
        <SearchComponent>
          <FormInputAntd
            {...defaultStyles}
            name="search"
            label="Tìm kiếm"
            width="calc(20% - 4px)"
            suffixIcon={<SvgIconSearch />}
            suffixLeft="12px"
            padding="0 12px 0 36px"
            placeholder="Nhập mã đơn"
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <div className="searchDatetimePicker">
            <Form.Item name="datePicker">
              <DatePicker.RangePicker />
            </Form.Item>
          </div>
          <div className="searchOptions">
            <FormSelectAntd
              {...defaultStyles}
              name="receiver_province_id"
              options={provinces}
              borderRadius="5px"
              label="Tỉnh/ thành giao"
              placeholder="Chọn tỉnh/ thành"
              width="calc(20% - 4px)"
              padding="0 20px 0 0"
              onChange={(e) => {
                setSelectedProvinceId(e);
                formSearch.setFieldsValue({ receiver_district_id: undefined });
              }}
              suffixIcon={<img src={arrow} alt="" />}
              margin="-20px 0 0 0"
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) => option.label.includes(input)}
            />
            <FormSelectAntd
              {...defaultStyles}
              name="receiver_district_id"
              label="Quận/ huyện "
              options={districts}
              placeholder="Chọn quận/ huyện"
              suffixIcon={<img src={arrow} alt="" />}
              padding="0 20px 0 0"
              width="calc(20% - 4px)"
              margin="-20px 0 0 0"
              borderRadius="5px"
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) => option.label.includes(input)}
            />
            <FormSelectAntd
              {...defaultStyles}
              name="transportation_method_id"
              label="Hình thức giao hàng"
              placeholder="Chọn hình thức"
              padding="0 20px 0 0"
              options={transportMethods}
              suffixIcon={<img src={arrow} alt="" />}
              width="calc(20% - 4px)"
              margin="-20px 0 0 0"
              borderRadius="5px"
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) => option.label.includes(input)}
            />

            <button className="buttonSearch">
              <SvgIconSearch />
              &nbsp;&nbsp;Tìm kiếm
            </button>
            <div className="buttonSearch" onClick={() => handleResetSearch()}>
              <SvgIconRefresh />
              &nbsp;&nbsp;Đặt lại
            </div>
          </div>
        </SearchComponent>{" "}
      </Form>
      <TableHoanTatDonHang>
        <ActionsHeader />
        <TableStyledAntd
          className="ordersTable"
          rowKey={"bill_code"}
          rowSelection={rowSelection}
          columns={columnsHoanTatDonHang({
            openModalCallback,
            componentRef,
            printDataCallback,
          })}
          dataSource={
            stateGetListOrders.data ? stateGetListOrders.data?.bills : []
          }
          loading={stateGetListOrders.isLoading}
          pagination={false}
          bordered
          widthCol1="5%"
          widthCol2="14%"
          widthCol3="14%"
          widthCol4="16%"
          widthCol5="12%"
          widthCol6="12%"
          widthCol7="23%"
          widthCol8="4%"
          paddingItemBody="8px 16px"
        />
        <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilter.page}
          pageSize={paramsFilter.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() =>
            `Tổng ${
              stateGetListOrders.data
                ? stateGetListOrders.data?.paging?.totalPage
                : 0
            } vận đơn `
          }
          total={
            stateGetListOrders.data
              ? stateGetListOrders.data?.paging?.totalPage
              : 0
          }
        />
        <div style={{ position: "fixed", opacity: "0", zIndex: "102" }}>
          <ComponentToPrint ref={componentRef} setLoaded={setLoadingPrint}>
            <PrintBillA5 selectedOrders={selectedOrder} />
          </ComponentToPrint>
        </div>
      </TableHoanTatDonHang>
    </div>
  );
};

export default XuatKhoTraHang;

const SearchComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 8px 16px 0px 16px;

  .searchDatetimePicker {
    width: calc(20% - 4px);

    .ant-picker.ant-picker-range {
      width: 100%;
      height: 41px;
      border-radius: 5px;
      margin-top: 24px;
    }
  }
  .searchOptions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(60% - 4px);
  }
  .buttonSearch {
    width: calc(20% - 4px);
    height: 41px;
    border-radius: 5px;
    border: solid 1px #bfc4c9;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    cursor: pointer;
    svg path {
      fill: #000;
    }
  }
`;

const TableHoanTatDonHang = styled.div`
  margin-top: 16px;
  padding: 8px 16px 16px 16px;
  background: #fff;
`;
