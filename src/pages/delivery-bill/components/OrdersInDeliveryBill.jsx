import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import SvgHoanThanh from "src/assets/svg/SvgHoanThanh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgNhapKhoKhongPhatDuoc from "src/assets/svg/SvgNhapKhoKhongPhatDuoc";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import PrintBillA5 from "src/components/filePrint/PrintBillA5";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import OrderInformations from "src/pages/listed/orders/components/OrderInformations";
import ComponentToPrint from "src/pages/test/ComponentToPrint";
import { getDeliveryBillById } from "src/services/actions/orders.actions";
import {
  changeStatusBillInDelivery,
  exportBillDelivery,
} from "src/services/actions/package.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsOrdersOfBill } from "../data";
import { getStatusColor } from "./data";

const OrdersInDeliveryBill = ({ data, dispatchDataCallback, roles }) => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
  const [openInformationOrder, setOpenInformationOrder] = useState(false);
  const [orderInformation, setOrderInformation] = useState({});
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState(undefined);
  const [singleBill, setSingleBill] = useState([]);
  const [statusValue, setStatusValue] = useState(false);
  const [driver, setDriver] = useState({});
  const [selectedEditBills, setSelectedEditBills] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [paramsFilter, setParamsFilter] = useState({
    limit: 5,
    page: 1,
  });
  const [loadingPrint, setLoadingPrint] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const componentRef = useRef();
  const { stateDeliveryBillById } = useSelector((state) => state.ordersReducer);

  const { stateChangeStatusBillInDelivery } = useSelector(
    (state) => state.packageReducer
  );
  useEffect(() => {
    if (data.id && !stateChangeStatusBillInDelivery.isLoading) {
      dispatch(getDeliveryBillById(data.id));
    }
  }, [data.id, stateChangeStatusBillInDelivery.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateChangeStatusBillInDelivery;
    if (!isLoading) {
      if (success) {
        notifySuccess("Đổi trạng thái đơn thành công");
        setOpenModalChangeStatus(false);
        setSelectedEditBills([]);
        setSelectedRows([]);
        setSelectedReason(undefined);
        if (data.isDone) {
          dispatchDataCallback();
        }
        console.log(data);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateChangeStatusBillInDelivery.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateDeliveryBillById;
    if (!isLoading) {
      if (success) {
        setDriver({
          driver_name: data?.packageDeliveryList?.driver_name,
          driver_phone: data?.packageDeliveryList?.driver_phone,
          driver_id: data?.packageDeliveryList?.driver_id,
          vehicle_name: data?.packageDeliveryList?.vehicle_name,
          vehicle_number: data?.packageDeliveryList?.vehicle_number,
        });
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateDeliveryBillById.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getReasons = async () => {
      let headers = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      let uuid = localGetAuthUUID();
      if (token) {
        headers.Authorization = token;
        headers["x-auth-uuid"] = uuid;
      }
      try {
        const { data } = await axios.get(`${API_URL}/${ROOT_VERSION}/reasons`, {
          headers: headers,
        });
        if (data) {
          let fakeArray = [];
          for (let i = 0; i < data?.data?.reasons?.length; i++) {
            fakeArray.push({
              label: data?.data?.reasons[i]?.reason_name,
              value: data?.data?.reasons[i]?.reason_name,
            });
          }
          setReasons(fakeArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReasons();
    return () => {
      setReasons([]);
    };
  }, []);
  const rowSelection = {
    selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.bill_status_id === 16,
      // Column configuration not to be checked
    }),
  };

  const onChangePaging = (page, pageSize) => {
    setParamsFilter({ ...paramsFilter, page: page, limit: pageSize });
  };

  const handleChangeSingleBillStatus = (e, status) => {
    setOpenModalChangeStatus(true);
    setSingleBill([e.bill_code]);
    setStatusValue(status === 16 ? true : false);
  };

  const handleCloseChangeStatusBills = () => {
    setOpenModalChangeStatus(false);
    setSingleBill([]);
  };

  const handleChangeStatusListBill = (e) => {
    if (selectedEditBills.length > 0) {
      setOpenModalChangeStatus(true);
      setStatusValue(e);
    } else {
      notifyWarning("Vui lòng chọn vận đơn");
    }
  };
  const handleChangeStatusBills = () => {
    if (!statusValue && !selectedReason) {
      notifyWarning("Vui lòng chọn lý do không phát được");
      return;
    }
    let params = {
      isDoneDelivery: statusValue,
      issue_name: selectedReason,
      listBill: singleBill.length > 0 ? singleBill : selectedEditBills,
    };
    dispatch(changeStatusBillInDelivery(data.id, params));
  };

  const openModalCallback = (e, data) => {
    setOpenInformationOrder(true);
    setOrderInformation(data);
  };

  const exportBillDeliveryCallback = (e) => {
    dispatch(exportBillDelivery(e.id));
  };

  const onBeforeGetContentResolve = useRef();
  const handleOnBeforeGetContent = () => {
    return new Promise((resolve) => {
      setLoadingPrint(true);
      onBeforeGetContentResolve.current = resolve;
    });
  };
  const printDataCallback = async (e) => {
    console.log("ablosdfs");
    await setSelectedOrder([e]);
    handlePrint();
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
    <>
      <OverlaySpinner text="Đang tải máy in ..." open={loadingPrint} />
      <Modal
        visible={openInformationOrder}
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
      <Modal
        visible={openModalChangeStatus}
        centered
        title={null}
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleChangeStatusBills()}
        width={700}
      >
        <div>
          Xác nhận đổi trạng thái của{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {singleBill.length > 0 ? singleBill.length : selectedRows?.length}
          </span>{" "}
          phiếu {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {!statusValue ? "Nhập kho không phát được" : "Giao hàng thành công"}
          </span>
          {!statusValue && (
            <div>
              <DropdownSelectLabel
                label="Lý do:"
                {...defaultStyles}
                options={reasons}
                margin="20px 0 0 0"
                placeholder="Chọn lý do"
                value={selectedReason}
                onChangeSelect={(e) => setSelectedReason(e)}
              />
            </div>
          )}
        </div>
      </Modal>
      <div style={{ maxHeight: "calc(100vh - 150px)", marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <InputNewStyled
              {...defaultStyles}
              label="Tìm kiếm"
              suffixIcon={<SvgIconSearch />}
              suffixLeft="12px"
              padding="0 0 0 36px"
              placeholder="Mã vận đơn"
              onChange={(e) => setSearch(e)}
            />
          </div>
          <div>
            <ActionsHeader
              actions={[
                roles?.find((x) => x === "import-cannot-ship") && {
                  text: "Nhập kho không phát được",
                  callback: () => handleChangeStatusListBill(false),
                  svg: <SvgNhapKhoKhongPhatDuoc />,
                  scale: true,
                },
                {
                  text: "Hoàn thành",
                  callback: () => handleChangeStatusListBill(true),
                  svg: <SvgHoanThanh />,
                  scale: true,
                },
              ]}
            />
          </div>
        </div>
        <TableStyledAntd
          style={{
            maxHeight: "calc(100vh - 210px)",
            overflowY: "scroll",
          }}
          className="ordersTable"
          rowKey={"bill_code"}
          rowSelection={rowSelection}
          columns={columnsOrdersOfBill({
            openModalCallback,
            handleChangeSingleBillStatus,
            driver: driver,
            roles: roles,
            printDataCallback,
            componentRef,
          })}
          dataSource={
            stateDeliveryBillById.data
              ? stateDeliveryBillById.data?.packageDeliveryList?.listBill
                  .filter((x) => x.bill_code.includes(search))
                  .slice(
                    (paramsFilter.page - 1) * paramsFilter.limit,
                    paramsFilter.page * paramsFilter.limit
                  )
              : []
          }
          loading={stateDeliveryBillById.isLoading}
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
              stateDeliveryBillById.data
                ? stateDeliveryBillById.data?.packageDeliveryList?.listBill
                    ?.length
                : 0
            } vận đơn `
          }
          total={
            stateDeliveryBillById.data
              ? stateDeliveryBillById.data?.packageDeliveryList?.listBill
                  ?.length
              : 0
          }
        />
        <div style={{ position: "fixed", opacity: "0", zIndex: "102" }}>
          <ComponentToPrint ref={componentRef} setLoaded={setLoadingPrint}>
            <PrintBillA5 selectedOrders={selectedOrder} />
          </ComponentToPrint>{" "}
        </div>
      </div>
    </>
  );
};

export default OrdersInDeliveryBill;
