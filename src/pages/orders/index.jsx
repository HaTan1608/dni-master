/* eslint-disable */
import { Form, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgPrinter from "src/assets/svg/SvgPrinter";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import PrintBillA5 from "src/components/filePrint/PrintBillA5";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import { EXPORT_TEMPLATE_TYPE } from "src/constants";
import {
  getExportTemplate,
  getLinkDownload,
} from "src/services/actions/export.actions";
import {
  changeStatusBills,
  getListOrders,
  updateOneOrders,
} from "src/services/actions/orders.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import OrderInformations from "../listed/orders/components/OrderInformations";
import ComponentToPrint from "../test/ComponentToPrint";
import CommodityInformation from "./components/CommodityInformation";
import EditOrder from "./components/EditOrder";
import ReceiverInformation from "./components/ReceiverInformation";
import SearchContainer from "./components/SearchContainer";
import SenderInformation from "./components/SenderInformation";
import StatusTabs from "./components/StatusTabs";
import { columnsOrders, getStatusColor, mainStatus } from "./data";
import "./styles.less";
const OrdersList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [mainStatusTab, setMainStatusTab] = useState(1);
  const [statusTabs, setStatusTabs] = useState([]);
  const [openEditReceiver, setOpenEditReceiver] = useState(false);
  const [openEditSender, setOpenEditSender] = useState(false);
  const [openEditCommo, setOpenEditCommo] = useState(false);
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [openInformationOrder, setOpenInformationOrder] = useState(false);
  const [singleBill, setSingleBill] = useState();
  const [roles, setRoles] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState({});
  const [calTotalPrice, setCalTotalPrice] = useState({});
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
    cargo_type: undefined,
    tl_quydoi: undefined,
  });
  const [paramsFilter, setParamsFilter] = useState({
    search: undefined,
    status: "1",
    transportation_method_id: undefined,
    service_id: undefined,
    fromDate: undefined,
    toDate: undefined,
    cargo_type_id: undefined,
    page: 1,
    limit: 10,
    payment_method_id: undefined,
    sender_province_id: undefined,
    sender_district_id: undefined,
    receiver_province_id: undefined,
    receiver_district_id: undefined,
  });
  const [changed, setChanged] = useState(false);
  const [formEditReceiver] = Form.useForm();
  const [formEditCommo] = Form.useForm();
  const [formEditSender] = Form.useForm();
  const [formEditOrder] = Form.useForm();
  const [typeService, setTypeService] = useState(1);
  const [orderInformation, setOrderInformation] = useState({});
  const [totalWeight, setTotalWeight] = useState(0);
  const [loadingCalTotalPrice, setLoadingCalTotalPrice] = useState(false);
  const [openSubmitChangeStatus, setOpenSubmitChangeStatus] = useState(false);
  const componentRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.title === "Disabled User", // Column configuration not to be checked
      name: record.title,
    }),
  };

  const stateListOrders = useSelector(
    (e) => e.ordersReducer.stateGetListOrders
  );

  const stateUpdateOrder = useSelector(
    (e) => e.ordersReducer.stateUpdateOneOrders
  );

  const stateChangeStatusBills = useSelector(
    (e) => e.ordersReducer.stateChangeStatusBills
  );

  const stateCreateOrdersByFile = useSelector(
    (e) => e.ordersReducer.stateCreateOrdersByFile
  );

  const stateImportFile = useSelector(
    (e) => e.ordersReducer.stateCreateOrdersByFile
  );

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
                "print-file"
              ) {
                fakeRoles.push("print-file");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-bill"
              ) {
                fakeRoles.push("modify-bill");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "cancel-bill"
              ) {
                fakeRoles.push("cancel-bill");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "get-bill-detail"
              ) {
                fakeRoles.push("get-bill-detail");
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
    const { message, success, error, isLoading } = stateListOrders;
    if (!isLoading) {
      if (success) {
        if (setStatusTabs.length > 0) {
        }
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateListOrders.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateChangeStatusBills;
    if (!isLoading) {
      if (success) {
        setOpenSubmitChangeStatus(false);
        return notifySuccess("Hủy đơn thành công!");
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateChangeStatusBills.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateUpdateOrder;
    if (!isLoading) {
      if (success) {
        notifySuccess("Cập nhật đơn hàng thành công");
        setOpenEditOrder(false);
        setSelectedOrder({});
        //  setChanged(false);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateUpdateOrder.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateImportFile;
    if (!isLoading) {
      if (success) {
        notifySuccess(
          `Nhập file thành công, có ${data?.successList.length} đơn thành công và ${data?.errorList.length} đơn lỗi`
        );
        if (data?.errorList?.length > 0) {
          dispatch(
            getLinkDownload({
              file_name: data.fileUrlError,
            })
          );
        }
        setOpenImport(false);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateImportFile.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      !stateUpdateOrder.isLoading &&
      !stateChangeStatusBills.isLoading &&
      !stateCreateOrdersByFile.isLoading
    ) {
      dispatch(getListOrders(paramsFilter));
    }
  }, [
    paramsFilter,
    stateUpdateOrder.isLoading,
    stateChangeStatusBills.isLoading,
    stateImportFile.isLoading,
  ]);
  useEffect(() => {
    if (mainStatusTab === 1) {
      setStatusTabs([]);
      setParamsFilter({ ...paramsFilter, status: "1" });
    }
    if (mainStatusTab === 2) {
      setStatusTabs([
        {
          label: "Đã nhận hàng",
          value: 2,
          count: 0,
        },
        {
          label: "Nhập kho đi",
          value: 3,
          count: 0,
        },
        {
          label: "Đang vận chuyển",
          value: "4",
          count: 0,
        },
        {
          label: "Nhập kho đến",
          value: "17",
          count: 0,
        },
        {
          label: "Đang giao hàng",
          value: "6",
          count: 0,
        },
      ]);
      setParamsFilter({ ...paramsFilter, status: "2" });
    }
    if (mainStatusTab === 3) {
      setStatusTabs([]);
      setParamsFilter({ ...paramsFilter, status: "16" });
    }
    return () => {
      setStatusTabs([]);
    };
  }, [mainStatusTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeMainStatus = (e) => {
    setMainStatusTab(e);
  };
  const getStatusCallback = (e) => {
    setParamsFilter({ ...paramsFilter, status: e });
  };
  const exportFileCallback = () => {};
  const importFileCallback = () => {
    setOpenImport(true);
  };

  const downFileCallback = () => {
    dispatch(
      getExportTemplate({
        name: "MAU_FILE_TAO_DON_",
        type: EXPORT_TEMPLATE_TYPE.TEMPLATE_BILL_BY_ONE_CUSTOMER,
      })
    );
  };
  const [loadingPrint, setLoadingPrint] = useState(false);
  const printDataCallback = async (e) => {
    await setSelectedOrder([e]);
    handlePrint();
  };
  const printFileCallback = async (e) => {
    await setSelectedOrder(selectedRows);
    handlePrint();
  };
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
    setOpenEditReceiver(false);
  };

  const onFinishEditSender = (e) => {
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
      cargo_type_id: e.filterOrdersCommoType,
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
        (valuesCalcPrice.volumetric_weight > 0 || valuesCalcPrice.tl_quydoi > 0)
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
  const onFinishEditOrder = (e) => {
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

  const handleDeleteOrder = (values) => {
    setOpenSubmitChangeStatus(true);
    setSingleBill(values);
  };

  const handleCloseChangeStatusBills = () => {
    setOpenSubmitChangeStatus(false);
    setSingleBill({});
  };

  const handleChangeStatusId5Bills = () => {
    let params = {
      status_id: 5,
      status_name: "Hủy đơn hàng",
      listBill: [singleBill?.bill_code],
    };
    dispatch(changeStatusBills(params));
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
        text="Đang tính cước phí ..."
        open={loadingCalTotalPrice}
      />
      <OverlaySpinner text="Đang tải máy in ..." open={loadingPrint} />
      <OverlaySpinner
        text="Đang xử lý file ..."
        open={stateImportFile.isLoading}
      />
      <Modal
        visible={openEditOrder}
        title="Thông tin hàng hóa"
        centered
        className="modalEditSender"
        onCancel={() => {
          setOpenEditOrder(false);
          formEditOrder.resetFields();
          //  setChanged(false);
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
        visible={openSubmitChangeStatus}
        title={null}
        centered
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleChangeStatusId5Bills()}
        width={700}
      >
        <div style={{ color: "red" }}>
          Xác nhận hủy đơn hàng{" "}
          <span style={{ fontWeight: "700" }}>{singleBill?.bill_code}</span>{" "}
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
        title="Thông tin hàng hoá"
        className="modalEditCommo"
        centered
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
        width={"70%"}
        // style={{ top: "50px", height: "100vh!important" }}
      >
        <OrderInformations dataOrder={orderInformation} />
      </Modal>
      <SubHeader
        breadcrumb={[
          { text: "Quản lý vận đơn" },
          { text: "Danh sách vận đơn" },
        ]}
        button={[
          {
            text: "Tạo đơn",
            class: "mainBtn plusSvg",
            svg: <SvgIconPlus />,
            link: "/orders-create",
          },
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
          roles.find((x) => x === "print-file") && {
            text: "In",
            callback: printFileCallback,
            svg: <SvgPrinter />,
          },
        ]}
      />
      <div className="mainStatusTabs">
        {mainStatus.map((status, index) => (
          <div
            className={`mainStatus ${
              mainStatusTab === status.value && "activeMainStatus"
            }`}
            onClick={() => handleChangeMainStatus(status.value)}
            key={index}
          >
            {status.label}
          </div>
        ))}
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
            handleDeleteOrder,
            componentRef,
            printDataCallback,
            roles: roles,
          })}
          dataSource={stateListOrders.data ? stateListOrders.data.bills : []}
          loading={stateListOrders.isLoading}
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

export default OrdersList;
