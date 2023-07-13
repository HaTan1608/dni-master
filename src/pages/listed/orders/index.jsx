/* eslint-disable */
import { Form, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import SvgDaNhanHang from "src/assets/svg/SvgDaNhanHang";
import SvgListedCreate from "src/assets/svg/SvgListedCreate";
import SvgPrinter from "src/assets/svg/SvgPrinter";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import PrintBillA5 from "src/components/filePrint/PrintBillA5";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import ComponentToPrint from "src/pages/test/ComponentToPrint";
import {
  changeStatusBills,
  getListOrders,
  updateOneOrders,
} from "src/services/actions/orders.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import CommodityInformation from "./components/CommodityInformation";
import CreatePackage from "./components/CreatePackage";
import EditOrder from "./components/EditOrder";
import OrderInformations from "./components/OrderInformations";
import ReceiverInformation from "./components/ReceiverInformation";
import SearchContainer from "./components/SearchContainer";
import SenderInformation from "./components/SenderInformation";
import StatusTabs from "./components/StatusTabs";
import { columnsOrders, getStatusColor, mainStatus } from "./data";
import "./styles.less";
const ListedOrders = () => {
  let route = useParams();
  const componentRef = useRef();
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [mainStatusTab, setMainStatusTab] = useState(0);
  useEffect(() => {
    setMainStatusTab(route.route.toString() === "import" ? 2 : 1);
  }, [route]);
  const [statusTabs, setStatusTabs] = useState([]);
  const [openEditReceiver, setOpenEditReceiver] = useState(false);
  const [openEditSender, setOpenEditSender] = useState(false);
  const [openEditCommo, setOpenEditCommo] = useState(false);
  const [openCreatePackage, setOpenCreatePackage] = useState(false);
  const [openInformationOrder, setOpenInformationOrder] = useState(false);
  const [singleBill, setSingleBill] = useState([]);
  const [selectedEditBills, setSelectedEditBills] = useState([]);
  const [loadingPrint, setLoadingPrint] = useState(false);

  const [formEditOrder] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);
  const [paramsFilter, setParamsFilter] = useState({
    search: undefined,
    status: "2",
    transportation_method_id: undefined,
    service_id: undefined,
    fromDate: undefined,
    toDate: undefined,
    page: 1,
    limit: 10,
    payment_method_id: undefined,
    sender_province_id: undefined,
    sender_district_id: undefined,
    receiver_province_id: undefined,
    receiver_district_id: undefined,
  });
  const [changed, setChanged] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [loadingCalTotalPrice, setLoadingCalTotalPrice] = useState(false);
  const [formEditReceiver] = Form.useForm();
  const [formEditCommo] = Form.useForm();
  const [formEditSender] = Form.useForm();
  const [typeService, setTypeService] = useState(1);
  const [orderInformation, setOrderInformation] = useState({});
  const [openSubmitChangeStatus, setOpenSubmitChangeStatus] = useState(false);
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [calTotalPrice, setCalTotalPrice] = useState({});
  const [roles, setRoles] = useState([]);

  const [valuesCalcPrice, setValuesCalcPrice] = useState({
    sequence: 1,
    sender_province: undefined,
    sender_district: undefined,
    receiver_province: undefined,
    receiver_district: undefined,
    sender: undefined,
    receiver: 500000,
    service: undefined,
    transport_method: undefined,
    payment_method: undefined,
    number_of_package: undefined,
    actual_weight: undefined,
    volumetric_weight: undefined,
    cod_amount: undefined,
    cargo_value: undefined,
    tl_quydoi: undefined,
  });

  const rowSelection = {
    selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.title === 'Disabled User', // Column configuration not to be checked
    //   name: record.title,
    // }),
  };
  const stateUpdateOrder = useSelector(
    (e) => e.ordersReducer.stateUpdateOneOrders
  );

  const stateListOrders = useSelector(
    (e) => e.ordersReducer.stateGetListOrders
  );
  const stateChangeStatusBills = useSelector(
    (e) => e.ordersReducer.stateChangeStatusBills
  );

  const stateCreatePackage = useSelector(
    (e) => e.packageReducer.stateCreatePackage
  );

  const pathName = useHistory().location.pathname.slice(1);

  useEffect(() => {
    let _dataUser = localStorage.getItem("ACCOUNT")
      ? JSON.parse(localStorage?.getItem("ACCOUNT") || "")
      : {};
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
              if (route.route === "export") {
                if (
                  _dataUser.menu[i].children[j].children[k].funct_code ===
                  "receive-package"
                ) {
                  fakeRoles.push("receive-package");
                }
                if (
                  _dataUser.menu[i].children[j].children[k].funct_code ===
                  "modify-order"
                ) {
                  fakeRoles.push("modify-order");
                }
                if (
                  _dataUser.menu[i].children[j].children[k].funct_code ===
                  "print-bill"
                ) {
                  fakeRoles.push("print-bill");
                }
                if (
                  _dataUser.menu[i].children[j].children[k].funct_code ===
                  "create-package-debt-export"
                ) {
                  fakeRoles.push("create-package-debt-export");
                }
              } else {
                if (
                  _dataUser.menu[i].children[j].children[k].funct_code ===
                  "print-bill"
                ) {
                  fakeRoles.push("print-bill");
                }
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
    const { message, success, error, isLoading } = stateCreatePackage;
    if (!isLoading) {
      if (success) {
        setOpenCreatePackage(false);
        setSelectedRows([]);
        setSelectedEditBills([]);
        return notifySuccess("Tạo bảng kê thành công");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateCreatePackage.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateUpdateOrder;
    if (!isLoading) {
      if (success) {
        notifySuccess("Cập nhật đơn hàng thành công");
        setOpenEditOrder(false);
        setSelectedOrder({});
        setChanged(false);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateUpdateOrder.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateChangeStatusBills;
    if (!isLoading) {
      if (success) {
        setSelectedEditBills([]);
        setOpenSubmitChangeStatus(false);
        return notifySuccess("Cập nhật trạng thái đơn thành công!");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateChangeStatusBills.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateListOrders;
    if (!isLoading) {
      if (success) {
        if (setStatusTabs.length > 0) {
        }
        setSelectedRows([]);
        setSelectedEditBills([]);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateListOrders.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      !stateChangeStatusBills.isLoading &&
      !stateCreatePackage.isLoading &&
      !stateUpdateOrder.isLoading
    ) {
      dispatch(getListOrders(paramsFilter));
    }
  }, [
    paramsFilter,
    stateChangeStatusBills.isLoading,
    stateCreatePackage.isLoading,
    stateUpdateOrder.isLoading,
  ]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mainStatusTab === 1) {
      setStatusTabs([]);
      setParamsFilter({ ...paramsFilter, status: "1" });
    } else if (mainStatusTab === 2) {
      if (route.route === "import") {
        setStatusTabs([
          {
            label: "Nằm tại kho đến",
            value: 17,
            count: 0,
          },
          // {
          //   label: "Đang vận chuyển",
          //   value: 4,
          //   count: 0,
          // },
          {
            label: "Đang trả hàng",
            value: 6,
            count: 0,
          },
        ]);
        setParamsFilter({ ...paramsFilter, status: "17" });
      } else {
        setStatusTabs([
          {
            label: "Đã nhận hàng",
            value: 2,
            count: 0,
          },
          {
            label: "Nằm tại kho đi",
            value: 3,
            count: 0,
          },
          {
            label: "Đang vận chuyển",
            value: 4,
            count: 0,
          },
          // {
          //   label: "Đang trả hàng",
          //   value: 6,
          //   count: 0,
          // },
        ]);
        setParamsFilter({ ...paramsFilter, status: "2" });
      }
    } else if (mainStatusTab === 3) {
      setStatusTabs([]);
      setParamsFilter({ ...paramsFilter, status: "16" });
    }
    return () => {
      setStatusTabs([]);
    };
  }, [mainStatusTab, route]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleChangeMainStatus = (e) => {
    setMainStatusTab(e);
  };
  const getStatusCallback = (e) => {
    setParamsFilter({ ...paramsFilter, status: e });
  };
  const exportFileCallback = () => {};
  const importFileCallback = () => {};
  const printFileCallback = async () => {
    await setSelectedOrder(selectedRows.map((item) => item));
    handlePrint();
  };
  const downFileCallback = () => {};

  const sortCallback = () => {};
  const openModalCallback = (e, data) => {
    if (e === 1) {
      setOpenEditSender(true);
    }
    if (e === 2) {
      setOpenEditReceiver(true);
    }
    if (e === 3) {
      setOpenEditCommo(true);
    }
    if (e === 4) {
      setOpenInformationOrder(true);
      setOrderInformation(data);
    }
  };

  // const getDataEditReceiverCallback = (e) => {
  //   setOpenEditReceiver(false);
  //   console.log(e);
  // };
  const handleChangeServicesCallback = (e) => {
    setTypeService(e);
  };
  const onFinishEditCommo = (e) => {
    setOpenEditCommo(false);
  };

  const onFinishEditReceiver = (e) => {
    console.log(e);
    setOpenEditReceiver(false);
  };

  const onFinishEditSender = (e) => {
    console.log(e);
    setOpenEditSender(false);
  };
  const getFilterCallback = (e) => {
    setParamsFilter({
      ...paramsFilter,
      transportation_method_id: e.filterOrdersShipping,
      service_id: e.filterOrdersService,
      fromDate: e.filterOrdersDate
        ? e.filterOrdersDate[0]
          ? moment(e.filterOrdersDate[0]).format("YYYY-MM-DD")
          : undefined
        : undefined,
      toDate: e.filterOrdersDate
        ? e.filterOrdersDate[1]
          ? moment(e.filterOrdersDate[1]).format("YYYY-MM-DD")
          : undefined
        : undefined,
      search: e.search,
    });
  };

  const onChangePaging = (page, pageSize) => {
    setParamsFilter({
      ...paramsFilter,

      page: page,
      limit: pageSize,
    });
  };

  const getFilterAdCallback = (values) => {
    setParamsFilter({
      ...paramsFilter,
      payment_method_id: values.paymentMethod,
      sender_province_id: values.fromProvince,
      sender_district_id: values.fromDistirct,
      receiver_province_id: values.toProvince,
      receiver_district_id: values.toDistrict,
      page: 1,
      limit: 10,
    });
  };

  const handleChangeStatusId2Bills = () => {
    let params = {
      status_id: 2,
      status_name: "Đã nhận hàng",
      listBill: singleBill.length > 0 ? singleBill : selectedEditBills,
    };
    dispatch(changeStatusBills(params));
  };

  const handleOpenSubmitChangeStatus = () => {
    if (selectedEditBills.length === 0) {
      notifyWarning("Vui lòng chọn vận đơn");
    } else {
      setOpenSubmitChangeStatus(true);
    }
  };

  const handleOpenCreatePackage = () => {
    if (selectedEditBills.length > 0) {
      setOpenCreatePackage(true);
    } else {
      notifyWarning("Vui lòng chọn vận đơn");
    }
  };

  const handleChangeStatusBills = (values) => {
    setOpenSubmitChangeStatus(true);
    setSingleBill([values.bill_code]);
  };

  const handleCloseChangeStatusBills = () => {
    setOpenSubmitChangeStatus(false);
    setSingleBill([]);
  };

  const handleEditOrder = (e) => {
    setOpenEditOrder(true);
    setSelectedOrder(e);
    formEditOrder.setFieldsValue({
      mathamchieu: e.ref_code,
      loaihanghoa: e.cargo_type,
      giatrihanghoa: e.cargo_value,
      tienthuho: e.cod_amount,
      tlhanghoa: e.weight,
      sokien: e.package_qty,
      thetich: e.volume,
      tlquydoi: e.dimension_weight,
      tltinhgia: e.real_weight,
    });

    setValuesCalcPrice({
      sequence: 1,
      sender_province: e.sender_province_id,
      sender_district: e.sender_district_id,
      receiver_province: e.receiver_province_id,
      receiver_district: e.receiver_district_id,
      sender: e.customer_id,
      receiver: 500000,
      service: e.service_id,
      transport_method: e.transportation_method_id,
      payment_method: e.payment_method_id,
      number_of_package: e.package_qty,
      actual_weight: e.weight,
      volumetric_weight: e.dimension_weight,
      cod_amount: e.cod_amount,
      cargo_value: e.cargo_value,
      tl_quydoi: e.dimension_weight,
    });
  };
  const getTotalWeightCallback = (values) => {
    setChanged(true);
    setTotalWeight((values / 4000) * 1000000);
    formEditOrder.setFieldsValue({
      tlquydoi: values != "0" ? (values / 4000) * 1000000 : "0",
    });
    setValuesCalcPrice({
      ...valuesCalcPrice,
      tl_quydoi: values != "0" ? (values / 4000) * 1000000 : "0",
    });
  };
  useEffect(() => {
    if (changed) {
      if (
        Number(valuesCalcPrice.tl_quydoi) >= 0 &&
        Number(valuesCalcPrice.actual_weight) >= 0
      ) {
        formEditOrder.setFieldsValue({
          tltinhgia:
            Number(valuesCalcPrice.tl_quydoi) >
            Number(valuesCalcPrice.actual_weight)
              ? valuesCalcPrice.tl_quydoi?.toString()
              : valuesCalcPrice.actual_weight?.toString(),
        });
        setValuesCalcPrice({
          ...valuesCalcPrice,
          volumetric_weight: Number(valuesCalcPrice.tl_quydoi),
        });
      }
    }
  }, [valuesCalcPrice.actual_weight, valuesCalcPrice.tl_quydoi]);

  useEffect(() => {
    if (changed) {
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
        (valuesCalcPrice.volumetric_weight || valuesCalcPrice.tl_quydoi > 0)
      ) {
        let params = { ...valuesCalcPrice };
        delete params.tl_quydoi;
        params.number_of_package = Number(params.number_of_package);
        params.cod_amount = Number(params.cod_amount);
        params.receiver = 661;

        const getProvinces = async () => {
          setLoadingCalTotalPrice(true);

          let headers = {
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
    }
  }, [valuesCalcPrice]);

  const handleDeleteOrder = (e) => {
    console.log(e);
  };

  const onFinishEditOrder = (e) => {
    console.log(e);
    if (selectedOrder.id) {
      let params = {
        postage: calTotalPrice.total_fee,
        cod_fee: calTotalPrice.cod_fee,
        total_fee: calTotalPrice.total_fee,
        main_fee: calTotalPrice.main_fee,
        packing_fee: calTotalPrice.packing_fee,
        counting_fee: calTotalPrice.counting_fee,
        delivery_fee: calTotalPrice.delivery_fee,
        lifting_fee: calTotalPrice.lifting_fee,
        insurance_fee: calTotalPrice.insurance_fee,
        weight: valuesCalcPrice.actual_weight,
        package_qty: valuesCalcPrice.number_of_package,
        dimension_weight: e.tlquydoi,
        volume: e.thetich,
        main_fee_vat_ex: calTotalPrice.main_fee_vat_ex,
        total_fee_vat_ex: calTotalPrice.total_fee_vat_ex,
      };
      dispatch(updateOneOrders(selectedOrder.id, params));
    } else {
      return;
    }
  };
  const printDataCallback = async (e) => {
    await setSelectedOrder([e]);
    handlePrint();
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
  const getTlQuyDoiCallback = (values) => {
    setChanged(true);
    formEditOrder.setFieldsValue({
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
  return (
    <div className="mainPages">
      <OverlaySpinner
        open={stateChangeStatusBills.isLoading}
        text="Đang cập nhật trạng thái vận đơn"
      />
      <OverlaySpinner text="Đang tải máy in ..." open={loadingPrint} />
      <OverlaySpinner
        open={stateCreatePackage.isLoading}
        text="Đang tạo bảng kê ..."
      />
      <OverlaySpinner
        text="Đang tính cước phí ..."
        open={loadingCalTotalPrice}
      />
      <Modal
        visible={openEditOrder}
        centered
        title="Thông tin hàng hóa"
        className="modalEditSender"
        onCancel={() => {
          setOpenEditOrder(false);
          formEditOrder.resetFields();
          setChanged(false);
        }}
        footer={null}
        width={700}
      >
        <Form
          form={formEditOrder}
          id="formEditOrder"
          onFinish={onFinishEditOrder}
        >
          <EditOrder
            data={valuesCalcPrice}
            getTotalWeightCallback={getTotalWeightCallback}
            getActualWeightCallback={(e) =>
              setValuesCalcPrice({
                ...valuesCalcPrice,
                actual_weight: Number(e),
              })
            }
            getCODCallback={(e) =>
              setValuesCalcPrice({ ...valuesCalcPrice, cod_amount: e })
            }
            getCargoValueCallback={(e) =>
              setValuesCalcPrice({ ...valuesCalcPrice, cargo_value: e })
            }
            getSoKienCallback={(e) =>
              setValuesCalcPrice({ ...valuesCalcPrice, number_of_package: e })
            }
            getTlQuyDoiCallback={getTlQuyDoiCallback}
          />
        </Form>
      </Modal>
      <Modal
        visible={openCreatePackage}
        centered
        title="Tạo bảng kê xuất hàng"
        className="modalEditSender"
        onCancel={() => setOpenCreatePackage(false)}
        width={700}
        footer={null}
      >
        <CreatePackage selectedBills={selectedRows} open={openCreatePackage} />
      </Modal>
      <Modal
        visible={openSubmitChangeStatus}
        centered
        title={null}
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleChangeStatusId2Bills()}
        width={700}
      >
        <div>
          Xác nhận đổi trạng thái của{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {singleBill.length > 0 ? singleBill.length : selectedRows?.length}
          </span>{" "}
          đơn{" "}
          <span style={{ color: "red", fontWeight: "700" }}>Chờ nhận hàng</span>
          {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>Đã nhận hàng</span>
        </div>
      </Modal>
      <Modal
        visible={openEditSender}
        title="Thông tin nơi gửi"
        centered
        className="modalEditSender"
        onCancel={() => setOpenEditSender(false)}
        footer={null}
        width={700}
      >
        <Form
          form={formEditSender}
          id="formEditSender"
          onFinish={onFinishEditSender}
        >
          <SenderInformation />{" "}
        </Form>
      </Modal>

      <Modal
        visible={openEditReceiver}
        title="Thông tin nơi nhận"
        centered
        className="modalEditSender"
        onCancel={() => setOpenEditReceiver(false)}
        footer={null}
        width={700}
      >
        <Form
          form={formEditReceiver}
          id="formEditReceiver"
          onFinish={onFinishEditReceiver}
        >
          <ReceiverInformation />{" "}
        </Form>
      </Modal>

      <Modal
        visible={openEditCommo}
        centered
        title="Thông tin hàng hoá"
        className="modalEditCommo"
        onCancel={() => setOpenEditCommo(false)}
        footer={null}
        width={700}
      >
        <Form
          form={formEditCommo}
          id="formEditCommo"
          onFinish={onFinishEditCommo}
        >
          <CommodityInformation
            form={formEditCommo}
            handleChangeServicesCallback={handleChangeServicesCallback}
            typeService={typeService}
          />
        </Form>
      </Modal>

      <Modal
        visible={openInformationOrder}
        className="modalInformationOrder"
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
                background: getStatusColor(orderInformation.bill_status_id)
                  ?.color,
              }}
            >
              {orderInformation.bill_status_name}
            </span>
          </div>
        }
        // className="modalOrderInformation"
        onCancel={() => setOpenInformationOrder(false)}
        footer={null}
        // style={{ top: "50px", height: "100vh!important" }}
      >
        <OrderInformations
          dataOrder={orderInformation}
          stateUpdateOrder={calTotalPrice}
        />
      </Modal>
      <SubHeader
        breadcrumb={[
          { text: "Quản lý vận đơn" },
          { text: "Danh sách vận đơn" },
        ]}
      />
      <SearchContainer
        getFilterCallback={getFilterCallback}
        getFilterAdCallback={getFilterAdCallback}
      />
      <ActionsHeader
        header="Danh sách vận đơn"
        background="#fff"
        padding="16px"
        borderRadius="5px"
        actions={[
          roles.find((x) => x === "print-bill") && {
            text: "In",
            callback: printFileCallback,
            svg: <SvgPrinter />,
          },
          // {
          //   text: "Xuất file",
          //   callback: exportFileCallback,
          //   svg: <SvgIconExportFile />,
          //   scale: true,
          // },
          // {
          //   text: "Nhập file",
          //   callback: importFileCallback,
          //   svg: <SvgIconImportFile />,
          //   scale: true,
          // },
          // {
          //   text: "Tải file mẫu",
          //   callback: downFileCallback,
          //   svg: <SvgIconListProduct />,
          //   scale: true,
          // },
          // {
          //   text: "Sắp xếp",
          //   callback: sortCallback,
          //   svg: <SvgIconGroupBy />,
          //   scale: true,
          // },
        ]}
      />
      <div className="mainStatusTabs-vAction">
        <div className="mainStatusTabs-vAction__actions">
          {route.route === "export"
            ? mainStatus.map((status, index) => (
                <div
                  className={`mainStatus ${
                    mainStatusTab == status.value && "activeMainStatus"
                  }`}
                  onClick={() => handleChangeMainStatus(status.value)}
                  key={index}
                >
                  {status.label}
                </div>
              ))
            : mainStatus.slice(1, 3).map((status, index) => (
                <div
                  className={`mainStatus ${
                    mainStatusTab == status.value && "activeMainStatus"
                  }`}
                  onClick={() => handleChangeMainStatus(status.value)}
                  key={index}
                >
                  {status.label}
                </div>
              ))}
        </div>
        {paramsFilter.status === "1" &&
          roles.find((x) => x === "receive-package") && (
            <div
              className="action"
              onClick={() => handleOpenSubmitChangeStatus()}
            >
              <SvgDaNhanHang fill="#000" />
              &nbsp; Đã nhận hàng
            </div>
          )}
        {paramsFilter.status == "2" &&
          roles.find((x) => x === "create-package-debt-export") && (
            <div className="action" onClick={() => handleOpenCreatePackage()}>
              <SvgListedCreate fill="#414141" />
              &nbsp; Tạo bảng kê
            </div>
          )}
      </div>
      <div className="ordersList">
        <StatusTabs getStatusCallback={getStatusCallback} status={statusTabs} />
        <TableStyledAntd
          className="ordersTable"
          rowKey={"bill_code"}
          rowSelection={rowSelection}
          columns={columnsOrders({
            openModalCallback,
            handleEditOrder,
            handleChangeStatusBills,
            componentRef,
            printDataCallback,
            roles: roles,
          })}
          dataSource={stateListOrders.data ? stateListOrders.data.bills : []}
          loading={stateListOrders.isLoading}
          // dataSource={ordersDataGroup1}
          // loading={false}
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
            `Tổng ${stateListOrders.data?stateListOrders?.data?.paging?.totalPage:0} vận đơn `
          }
          total={stateListOrders?.data?.paging?.totalPage}
        />
        <div style={{ position: "fixed", opacity: "0", zIndex: "102" }}>
          <ComponentToPrint ref={componentRef} setLoaded={setLoadingPrint}>
            <PrintBillA5 selectedOrders={selectedOrder} />
          </ComponentToPrint>{" "}
        </div>
      </div>
    </div>
  );
};

export default ListedOrders;
