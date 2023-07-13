/* eslint-disable */
import { DatePicker, Form, Modal, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import arrow from "src/assets/images/arrow.svg";
import SvgCheckGood from "src/assets/svg/SvgCheckGood";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
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
import { getLinkDownload } from "src/services/actions/export.actions";
import {
  completePakageDebtList,
  getExportPakageDebtList,
  getExportPakageDebtListDetail,
  getPakageDebtList,
} from "src/services/actions/orders.actions";
import { exportBillDelivery } from "src/services/actions/package.actions";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import styled from "styled-components";
import OrdersInDeliveryBill from "../../listed/list/components/OrdersInDeliveryBill";
import { columnsHoanTatDonHang, dataStatusDebt } from "./data";

const PakageDebtList = () => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const [formSearch] = Form.useForm();
  const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEditBills, setSelectedEditBills] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [doReload, setDoReload] = useState<any>(false);
  const [roles, setRoles] = useState<any[]>([]);

  const [paramsFilter, setParamsFilter] = useState<any>({
    fromDate: undefined,
    toDate: undefined,
    customer_type_id: undefined,
    payment_status_id: undefined,
    page: 1,
    limit: 10,
    search: "",
    fromPaymentDate: undefined, //ngay thanh toán
    toPaymentDate: undefined,
    status: undefined,
  });
  const [selectedDelivery, setSelectedDelivery] = useState<any>({});
  const [openModalBill, setOpenModalBill] = useState(false);
  const [statusValue, setStatusValue] = useState("C");
  const [debtList, setDebtList] = useState<any[]>([]);
  const { stateGetPakageDebtList } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  const { stateCompletePakageDebtList } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  const { stateGetExportPakageDebtList } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  const { stateExportBillDelivery } = useSelector(
    (state: AppState) => state.packageReducer
  );
  const { stateGetExportPakageDebtListDetail } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  useEffect(() => {
    dispatch(getPakageDebtList(paramsFilter));
  }, []);
  useEffect(() => {
    dispatch(getPakageDebtList(paramsFilter));
  }, [doReload]);

  const pathName = useHistory().location.pathname.slice(1);

  useEffect(() => {
    let _dataUser = JSON.parse(localStorage.getItem("ACCOUNT") || "");
    if (_dataUser?.menu) {
      let fakeRoles = [];
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
                "update-package-debt"
              ) {
                fakeRoles.push("update-package-debt");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "package-debt-list"
              ) {
                fakeRoles.push("package-debt-list");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-package-debt"
              ) {
                fakeRoles.push("update-package-debt");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "export-package-debt-list"
              ) {
                fakeRoles.push("export-package-debt-list");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "export-package-debt-detail"
              ) {
                fakeRoles.push("export-package-debt-detail");
              }
            }
            break;
          }
        }
      }
      console.log("FAKE", fakeRoles);
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, data } = stateGetPakageDebtList;
    if (success) {
      setDebtList(data.packageDebtLists);
      setDoReload(false);
      setLoading(false);
    }
    if (success === false || error) {
      return notifyError(message ? message.toString() : "");
    }
  }, [stateGetPakageDebtList.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { message, success, error, data } = stateCompletePakageDebtList;
    if (success) {
      setSelectedEditBills([]);
      setOpenModalChangeStatus(false);
      dispatch(getPakageDebtList(paramsFilter));
      setSelectedRows([]);
      return notifySuccess("Cập nhật trạng thái thành công");
    }
    if (success === false || error) {
      return notifyError(message ? message.toString() : "");
    }
  }, [stateCompletePakageDebtList.isLoading]);
  //
  useEffect(() => {
    if (isMount) return;
    const { message, success, error, data } = stateGetExportPakageDebtList;
    if (success) {
      if (data?.file_url) {
        dispatch(
          getLinkDownload({
            file_name: data?.file_url,
          })
        );
      }
      return notifySuccess("Xuất file thành công");
    }
    if (success === false || error) {
      return notifyError(message ? message.toString() : "");
    }
  }, [stateGetExportPakageDebtList.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateExportBillDelivery;
    if (!isLoading) {
      if (success) {
        if (data?.file_url) {
          dispatch(
            getLinkDownload({
              file_name: data?.file_url,
            })
          );
        }
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateExportBillDelivery.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } =
      stateGetExportPakageDebtListDetail;
    if (success) {
      if (data?.file_url) {
        dispatch(
          getLinkDownload({
            file_name: data?.file_url,
          })
        );
      }
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateGetExportPakageDebtListDetail.isLoading]);
  const rowSelection = {
    selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  const onChangePaging = (page: number, pageSize: number) => {
    setLoading(true);
    setParamsFilter({ ...paramsFilter, page: page, limit: pageSize });
    setDoReload(true);
  };
  const handleFinishSearch = () => {
    setLoading(true);
    dispatch(getPakageDebtList(paramsFilter));
  };

  const handleResetSearch = () => {
    setParamsFilter({
      fromDate: undefined,
      toDate: undefined,
      customer_type_id: undefined,
      payment_status_id: undefined,
      page: 1,
      limit: 10,
      search: "",
      fromPaymentDate: undefined, //ngay thanh toán
      toPaymentDate: undefined,
      status: undefined,
    });
    formSearch.setFieldsValue({ search: "", dateExport: undefined });
    setDoReload(true);
  };

  const handleChange = (e: any) => {
    setParamsFilter({
      ...paramsFilter,
      search: e.trim(),
    });
  };
  const exportBillDeliveryCallback = (e: any) => {
    if (e.id) {
      dispatch(
        exportBillDelivery({
          packageDeliveryId: e.id,
        })
      );
    }
  };
  const handleChangeFilterDatetime = (data: any) => {
    setParamsFilter({
      ...paramsFilter,
      fromDate: data[0] ? moment(data[0]).format("YYYY-MM-DD") : undefined,
      toDate: data[1] ? moment(data[1]).format("YYYY-MM-DD") : undefined,
    });
  };
  const handleCompleteDebt = () => {
    if (selectedRows.length > 0) {
      setOpenModalChangeStatus(true);
    } else {
      notifyWarning("Vui lòng chọn bảng kê công nợ");
    }
  };
  const handleCloseChangeStatusBills = () => {
    setOpenModalChangeStatus(false);
  };
  const handleChangeStatusBills = (value: any) => {
    setStatusValue(value);
    let params = {
      status: value,
      listPackageDebt:
        selectedRows.length > 0
          ? selectedRows.map(function (item) {
              return item["id"];
            })
          : selectedEditBills,
    };
    dispatch(completePakageDebtList(params));
  };
  const handleCompleteOneDebt = (value: any) => {
    setOpenModalChangeStatus(true);
    setSelectedEditBills([value.id]);
  };
  const importFileCallback = () => {
    if (selectedRows.length > 0) {
      const _newParams = selectedRows.map((item: any) => item.id);

      dispatch(
        getExportPakageDebtList({ packageDebtId: _newParams.join(",") })
      );
    } else {
      notifyWarning("Vui lòng chọn bảng kê công nợ");
    }
  };
  const exportCallback = (e: any) => {
    dispatch(getExportPakageDebtListDetail({ packageDebtId: e }));
  };
  return (
    <div className="mainPages">
      <OverlaySpinner
        open={stateGetExportPakageDebtList.isLoading}
        text="Đang xuất excel danh sách bảng kê ..."
      />
      <OverlaySpinner
        open={stateGetExportPakageDebtListDetail.isLoading}
        text="Đang xuất excel..."
      />
      <OverlaySpinner
        open={stateExportBillDelivery.isLoading}
        text="Đang xử lý ..."
      />
      <Modal
        visible={openModalChangeStatus}
        title={null}
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleChangeStatusBills("C")}
        width={700}
      >
        <div>
          Xác nhận đổi trạng thái của{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {selectedRows.length > 0
              ? selectedRows.length
              : selectedEditBills?.length}
          </span>{" "}
          bảng kê công nợ{" "}
          {/* <span style={{ color: "red", fontWeight: "700" }}>Chưa thanh toán</span> */}
          {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {statusValue === "C" ? "Đã thanh toán" : "Từ chối"}{" "}
          </span>
        </div>
      </Modal>
      <Modal
        visible={openModalBill}
        title={`Bảng kê ${selectedDelivery?.package_code}`}
        className="modalEditSender"
        onCancel={() => setOpenModalBill(false)}
        footer={null}
        width={"90%"}
        style={{ top: "10px", maxHeight: "calc(100vh - 20px)" }}
      >
        <OrdersInDeliveryBill data={selectedDelivery} />
      </Modal>
      <SubHeader
        breadcrumb={[
          { text: "Bảng kê công nợ" },
          { text: "Danh sách bảng kê công nợ" },
        ]}
      />
      <Spin spinning={loading}>
        <Form
          form={formSearch}
          // onFinish={handleFinishSearch}
          style={{ width: "100%" }}
          initialValues={{ search: "" }}
        >
          <SearchComponent>
            {/* <Form.Item name="search">
            <InputNewStyled />
          </Form.Item> */}

            <div className="searchOptions" style={{ width: "100%" }}>
              <FormInputAntd
                {...defaultStyles}
                name="search"
                label="Nội dung tìm kiếm"
                width="calc(((100% - 24px) / 5)*2)"
                suffixIcon={<SvgIconSearch />}
                suffixLeft="12px"
                padding="0 12px 0 36px"
                margin="0 6px 0 0"
                placeholder="Nhập mã kê, mã khách hàng"
                onChange={(e: any) => handleChange(e)}
              />
              <div className="searchDatetimePicker">
                <span style={{ fontSize: "12px" }}>Ngày tạo </span>
                <Form.Item name="dateExport">
                  <DatePicker.RangePicker
                    onChange={(e: any) => handleChangeFilterDatetime(e)}
                  />
                </Form.Item>
              </div>
              <FormSelectAntd
                {...defaultStyles}
                name="fromWarehouseId"
                options={dataStatusDebt}
                borderRadius="5px"
                label="Trạng thái bảng kê"
                placeholder="Trạng thái bảng kê"
                width="calc((100% - 24px) /5)"
                padding="0 20px 0 0"
                suffixIcon={<img src={arrow} alt="" />}
                margin="-20px 0 0 0"
                showSearch
                onChange={(e: any) =>
                  setParamsFilter({
                    ...paramsFilter,
                    status: e,
                  })
                }
                optionFilterProp="label"
                filterOption={(input: any, option: any) =>
                  option.label.includes(input)
                }
              />
              {/* <FormSelectAntd
              {...defaultStyles}
              name="fromWarehouseId"
              options={[]}
              borderRadius="5px"
              label="Người tạo"
              placeholder="Người tạo"
              width="calc(20% - 4px)"
              padding="0 20px 0 0"
              suffixIcon={<img src={arrow} alt="" />}
              margin="-20px 0 0 0"
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            /> */}
              <button
                className="buttonSearch"
                style={{ width: "calc(((100% - 24px) /5)/2)" }}
                onClick={() => handleFinishSearch()}
              >
                <SvgIconSearch />
                &nbsp;&nbsp;Tìm kiếm
              </button>
              <div
                className="buttonSearch"
                style={{ width: "calc(((100% - 24px) /5)/2)" }}
                onClick={() => handleResetSearch()}
              >
                <SvgIconRefresh />
                &nbsp;&nbsp;Đặt lại
              </div>
            </div>
          </SearchComponent>{" "}
        </Form>
        <TableHoanTatDonHang>
          <ActionsHeader
            actions={
              roles.find((x: any) => x === "export-package-debt-list") && [
                {
                  text: "Xuất file",
                  callback: importFileCallback,
                  svg: <SvgIconImportFile />,
                  scale: true,
                },
                roles.find((x) => x === "update-package") && {
                  text: "Xác nhận đã thanh toán",
                  callback: handleCompleteDebt,
                  svg: <SvgCheckGood />,
                  scale: true,
                },
              ]
            }
          />
          <TableStyledAntd
            className="ordersTable"
            rowKey={"id"}
            rowSelection={rowSelection}
            columns={columnsHoanTatDonHang({
              handleCompleteOneDebt,
              exportCallback,
              roles: roles,
            })}
            dataSource={debtList}
            loading={stateGetPakageDebtList.isLoading}
            pagination={false}
            bordered
            widthCol1="5%"
            widthCol2="17%"
            widthCol3="16%"
            widthCol4="17%"
            widthCol5="5%"
            widthCol6="5%"
            widthCol7="5%"
            widthCol8="5%"
            widthCol9="5%"
            widthCol10="5%"
            widthCol11="5%"
            widthCol12="5%"
            widthCol13="5%"
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
                stateGetPakageDebtList.data
                  ? stateGetPakageDebtList.data?.paging?.totalPage
                  : 0
              } bảng kê `
            }
            total={
              stateGetPakageDebtList.data
                ? stateGetPakageDebtList.data?.paging?.totalPage
                : 0
            }
          />
        </TableHoanTatDonHang>
      </Spin>
    </div>
  );
};

export default PakageDebtList;

const SearchComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 16px 16px 0px 16px;

  .searchDatetimePicker {
    width: calc(20% - 4px);
    margin-top: 2px;
    span {
      font-size: 12px;
    }
    .ant-picker {
      width: 100%;
      height: 41px;
      border-radius: 5px;
    }
  }
  .searchOptions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(70% - 4px);
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
