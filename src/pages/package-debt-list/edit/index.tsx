/* eslint-disable */
import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgCheckGood from "src/assets/svg/SvgCheckGood";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgTrash from "src/assets/svg/SvgTrash";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import {
  notifyError,
  notifySuccess,
  notifyWarning
} from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import { PAGE_SIZE_DEFAULT } from "src/constants";
import OrderInformations from "src/pages/listed/orders/components/OrderInformations";
import { getStatusColor } from "src/pages/listed/orders/data";
import { getLinkDownload } from "src/services/actions/export.actions";
import {
  deleteOrCompletePakageDebtList,
  getExportPakageDebtListDetail,
  getPakageDebtListById
} from "src/services/actions/orders.actions";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsZones } from "./data";
import "./styles.less";
interface Params {
  id: any;
}

const ConfigZonesEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const paramsURL = useParams<Params>();
  const isMount = useIsMount();
  const [cities, setCities] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [vat, setVat] = useState<any>(0);
  const [loading, setLoading] = useState(true);
  const [addListDetails, setAddListDetails] = useState<any[]>([]);
  const [addListDetailsFiltered, setAddListDetailsFiltered] = useState<any[]>(
    []
  );
  const [selectedEditBills, setSelectedEditBills] = useState<any[]>([]);
  const [selectedDeleteBills, setSelectedDeleteBills] = useState<any[]>([]);
  const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataPakageDebt, setPakageDebt] = useState<any>({});
  const [openInformationOrder, setOpenInformationOrder] = useState<any>(false);
  const [dataAddRoute, setDataAddRoute] = useState({
    fromProvince: undefined,
    fromDistrict: undefined,
    toProvince: undefined,
    toDistrict: undefined,
  });
  const [roles, setRoles] = useState<any[]>([]);
  const [paramsFilterDetails, setParamsFilterDetails] = useState<any>({
    limit: 10,
    page: 1,
  });
  const [statusValue, setStatusValue] = useState<any>();
  const [listDetails, setListDetails] = useState<any[]>([]);
  const [orderInformation, setOrderInformation] = useState<any>({});

  const stateGetPakageDebtListById = useSelector(
    (e: AppState) => e.ordersReducer.stateGetPakageDebtListById
  );

  const stateDeleteOrCompletePakageDebtList = useSelector(
    (e: AppState) => e.ordersReducer.stateDeleteOrCompletePakageDebtList
  );
  const { stateGetExportPakageDebtListDetail } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  const stateGetListDetails = useSelector(
    (e: AppState) => e.configZonesReducer.stateGetListConfigZonesDetails
  );
  useEffect(() => {
    dispatch(getPakageDebtListById(paramsURL.id));
  }, [paramsURL.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const pathName = useHistory().location.pathname.slice(1, 18);

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
                "export-package-debt-detail"
              ) {
                fakeRoles.push("export-package-debt-detail");
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
    const { success, error, isLoading, message } =
      stateDeleteOrCompletePakageDebtList;
    if (!isLoading) {
      if (success) {
        setOpenModalChangeStatus(false);
        setOpenModalDelete(false);
        dispatch(getPakageDebtListById(paramsURL.id));
        return notifySuccess(`${message}`);
      } else if (success === false || error) {
        setOpenModalChangeStatus(false);
        setOpenModalDelete(false);
        setLoading(false);
        return notifyError(`${message}`);
      }
    }
  }, [stateDeleteOrCompletePakageDebtList.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateGetPakageDebtListById;
    if (!isLoading) {
      if (success) {
        setLoading(false);
        setPakageDebt(data.packageDebtList);
        setVat(data.packageDebtList.vat);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateGetPakageDebtListById.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
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
  // const onChangePaging = (page: number, pageSize: number) => {

  //   setParamsFilterDetails({
  //     page: page,
  //     limit: pageSize,
  //   });
  // };

  const rowSelection = {
    // selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      // setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };
  const handleCompleteDebt = () => {
    if (selectedRows.length > 0) {
      setStatusValue(true);
      setOpenModalChangeStatus(true);
    } else {
      notifyWarning("Vui lòng chọn đơn");
    }
  };
  const handleCloseChangeStatusBills = () => {
    setOpenModalChangeStatus(false);
    setOpenModalDelete(false);
  };
  const handleChangeStatusBills = (value: any) => {
    let params = {
      isDone: value,
      listBill:
        selectedRows.length > 0
          ? selectedRows.map(function (item: any) {
              return item["bill_code"];
            })
          : selectedEditBills,
    };

    dispatch(deleteOrCompletePakageDebtList(paramsURL.id, params));
  };
  const handleDeleteBills = (value: any) => {
    let params = {
      isDone: value,
      listBill:
        selectedRows.length > 0
          ? selectedRows.map(function (item: any) {
              return item["bill_code"];
            })
          : selectedDeleteBills,
    };

    dispatch(deleteOrCompletePakageDebtList(paramsURL.id, params));
  };
  const handleDeleteDebt = () => {
    if (selectedRows.length > 0) {
      setStatusValue(true);
      setOpenModalDelete(true);
    } else {
      notifyWarning("Vui lòng chọn đơn");
    }
  };
  const handleDeleteOneBill = (value: any) => {
    setOpenModalDelete(true);
    setSelectedDeleteBills([value.bill_code]);
  };
  const openModalCallback = (e: any, data: any) => {
    console.log(data);

    if (e === 4) {
      setOpenInformationOrder(true);
      setOrderInformation(data);
    }
  };
  const importFileCallback = () => {
    dispatch(
      getExportPakageDebtListDetail({ packageDebtId: dataPakageDebt.id })
    );
  };
  return (
    <div className="mainPages">
      <SubHeader
        breadcrumb={[
          { text: "Bảng kê công nợ" },
          { text: "Danh sách bảng kê", link: routerNames.PACKAGE_DEBT_LIST },
          { text: "Chi tiết bảng kê" },
        ]}
      />
      <OverlaySpinner
        open={stateGetExportPakageDebtListDetail.isLoading}
        text="Đang xuất excel..."
      />
      <Modal
        visible={openInformationOrder}
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
        centered
        onCancel={() => setOpenInformationOrder(false)}
        footer={null}
        width={"70%"}
      >
        <OrderInformations dataOrder={{ id: orderInformation.bill_id }} />
      </Modal>
      <Modal
        visible={openModalDelete}
        title={null}
        className="modalDeleteSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleDeleteBills(false)}
        width={700}
      >
        <div>
          Xác nhận xóa{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {selectedRows.length > 0
              ? selectedRows.length
              : selectedDeleteBills?.length}
          </span>{" "}
          đơn khỏi bảng kê công nợ{" "}
        </div>
      </Modal>
      <Modal
        visible={openModalChangeStatus}
        title={null}
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleChangeStatusBills(true)}
        width={700}
      >
        <div>
          Xác nhận đổi trạng thái thanh toán của{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {selectedRows.length > 0
              ? selectedRows.length
              : selectedRows?.length}
          </span>{" "}
          đơn{" "}
          {/* <span style={{ color: "red", fontWeight: "700" }}>
            Chưa thanh toán
          </span> */}
          {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {statusValue === true ? "Đã thanh toán" : "Từ chối"}{" "}
          </span>
        </div>
      </Modal>
      <Spin spinning={loading}>
        <div className="searchConfigZonesEdit">
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>
            Thông tin khách hàng
          </div>
          <div
            style={{
              marginTop: "20px",

              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",

              width: "100%",
            }}
          >
            <InputNewStyled
              label="Mã khách hàng"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              margin="0 16px 0 0"
              disabled
              value={dataPakageDebt.customer_code}
            />
            <InputNewStyled
              label="Tên khách hàng"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={dataPakageDebt.customer_name}
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Nhóm khách hàng"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={dataPakageDebt.customer_group}
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Loại khách hàng"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              margin="0 16px 0 0"
              disabled
              value={dataPakageDebt.customer_type}
            />
            <InputNewStyled
              label="Số điện thoại"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={dataPakageDebt?.phone}
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Email"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={dataPakageDebt?.email}
              margin="0 16px 0 0"
            />
          </div>
          <div
            style={{ marginTop: "15px", fontWeight: "bold", fontSize: "16px" }}
          >
            Thông tin bảng kê
          </div>
          <div
            style={{
              marginTop: "20px",

              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",

              width: "100%",
            }}
          >
            <InputNewStyled
              label="Mã bảng kê"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              margin="0 16px 0 0"
              disabled
              value={dataPakageDebt.package_debt_code}
            />
            <InputNewStyled
              label="Ngày tạo"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={dataPakageDebt.created_at}
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Người tạo"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={dataPakageDebt.created_by}
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Tổng đơn"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              margin="0 16px 0 0"
              disabled
              value={dataPakageDebt.total_bill}
            />
            <InputNewStyled
              label="Trạng thái thanh toán"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={dataPakageDebt.status_name}
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="VAT (%)"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width={
                roles.find((x: any) => x === "update-package-debt")
                  ? "7%"
                  : "15%"
              }
              type="number"
              value={dataPakageDebt.vat}
              onChange={(e: any) => setVat(e)}
              defaultValue={0}
              margin="0 16px 0 0"
              important
              convertNumber
            />
            {roles.find((x: any) => x === "update-package-debt") && (
              <ButtonStyled
                {...defaultStyles}
                text="Áp dụng"
                svgMargin="0 8px 0 0"
                width="7%"
                svgColor="#fff"
                color="#fff"
                mainBackground={colors.accent_color_5_2}
                onClick={() => {
                  if (vat != 0) {
                    setLoading(true);
                    dispatch(
                      deleteOrCompletePakageDebtList(paramsURL.id, { vat: vat })
                    );
                  } else {
                    notifyWarning("Vui lòng nhập VAT");
                  }
                }}
              />
            )}
          </div>
          <div
            style={{
              marginTop: "27px",

              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",

              width: "100%",
            }}
          >
            <InputNewStyled
              label={
                <div style={{ display: "flex" }}>
                  <span>Tổng cước (VNĐ)</span>&nbsp;
                  <span style={{ color: "red", fontStyle: "italic" }}>
                    Chưa VAT
                  </span>
                </div>
              }
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              margin="0 16px 0 0"
              disabled
              value={
                dataPakageDebt.total_fee_vat_ex
                  ? convertNumberWithCommas(
                      dataPakageDebt.total_fee_vat_ex.toString()
                    )
                  : "0"
              }
            />
            <InputNewStyled
              label={
                <div style={{ display: "flex" }}>
                  <span>Tổng cước (VNĐ)</span>&nbsp;
                  <span style={{ color: "red", fontStyle: "italic" }}>
                    Sau VAT
                  </span>
                </div>
              }
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={
                dataPakageDebt.total_fee
                  ? convertNumberWithCommas(dataPakageDebt.total_fee.toString())
                  : "0"
              }
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Tổng COD (VNĐ)"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={
                dataPakageDebt.total_cod
                  ? convertNumberWithCommas(dataPakageDebt.total_fee.toString())
                  : "0"
              }
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Tổng phí COD (VNĐ)"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              margin="0 16px 0 0"
              disabled
              value={
                dataPakageDebt.total_cod_fee
                  ? convertNumberWithCommas(
                      dataPakageDebt.total_cod_fee.toString()
                    )
                  : "0"
              }
            />
            <InputNewStyled
              label="Công nợ (VNĐ)"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={
                dataPakageDebt.total_detb
                  ? convertNumberWithCommas(
                      dataPakageDebt.total_detb.toString()
                    )
                  : "0"
              }
              margin="0 16px 0 0"
            />
            <InputNewStyled
              label="Tổng chi (VNĐ)"
              {...defaultStyles}
              labelFontSize="12px"
              padding="0px 12px 0px 12px"
              background="rgb(243,243,243)"
              width="15%"
              disabled
              value={
                dataPakageDebt.total_payable
                  ? convertNumberWithCommas(
                      dataPakageDebt.total_payable.toString()
                    )
                  : "0"
              }
              margin="0 16px 0 0"
            />
          </div>
        </div>
        <div className="tableConfigZonesEdit">
          {/* <FilterSearch getFilterCallback={getFilterCallback} /> */}
          <ActionsHeader
            actions={[
              roles.find((x: any) => x === "export-package-debt-detail") && {
                text: "Xuất file",
                callback: importFileCallback,
                svg: <SvgIconImportFile />,
                scale: true,
              },
              roles.find((x: any) => x === "update-package-debt") && {
                text: "Hoàn thành",
                callback: () => handleCompleteDebt(),
                svg: <SvgCheckGood />,
                scale: true,
              },

              roles.find((x: any) => x === "update-package-debt") && {
                text: "Xóa khỏi bảng kê",
                callback: handleDeleteDebt,
                svg: <SvgTrash />,
                scale: true,
              },
            ]}
          />
          <TableStyledAntd
            rowKey={"id"}
            rowSelection={rowSelection}
            columns={columnsZones({
              cities,
              handleDeleteOneBill,
              openModalCallback,
            })}
            dataSource={dataPakageDebt.listBill}
            loading={loading}
            // total={dataPakageDebt.listBill.length}
            pagination={{
              page: paramsFilterDetails.page,
              showSizeChanger: true,
              defaultPageSize: PAGE_SIZE_DEFAULT,
            }}
            bordered
            widthCol1="5%"
            widthCol2="15%"
            widthCol3="15%"
            widthCol4="10%"
            widthCol5="10%"
            widthCol6="7%"
            widthCol7="7%"
            widthCol8="7%"
            widthCol9="7%"
            widthCol10="5%"
            paddingItemBody="8px 16px"
          />
          {/* <PanigationAntStyled
            style={{ marginTop: "8px" }}
            current={paramsFilterDetails.page}
            pageSize={paramsFilterDetails.limit}
            showSizeChanger
            // onChange={onChangePaging}
            showTotal={() =>
              `Tổng ${
                dataPakageDebt?.listBill?.length
                  ? dataPakageDebt?.listBill?.length
                  : 0
              } đơn `
            }
            total={
              dataPakageDebt?.listBill?.length
                ? dataPakageDebt?.listBill?.length
                : 0
            }
          /> */}
        </div>
      </Spin>
    </div>
  );
};

export default ConfigZonesEdit;
