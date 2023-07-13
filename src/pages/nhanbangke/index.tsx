/* eslint-disable */
import { DatePicker, Form, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import arrow from "src/assets/images/arrow.svg";
import SvgClosed from "src/assets/svg/SvgClosed";
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
  changeStatusPackage,
  exportBillDelivery,
  getListPackage,
} from "src/services/actions/package.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import styled from "styled-components";
import OrdersInDeliveryBill from "../listed/list/components/OrdersInDeliveryBill";
import { columnsHoanTatDonHang } from "./data";
const NhanBangKe = () => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const [formSearch] = Form.useForm();
  const importFileCallback = () => {};
  const [openModalChangePackageStatus, setOpenModalChangePackageStatus] =
    useState(false);

  const [selectedEditBills, setSelectedEditBills] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [singlePackage, setSinglePackage] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [paramsFilter, setParamsFilter] = useState<any>({
    status: 2,
    limit: 10,
    page: 1,
    fromWarehouseId: undefined,
    startDate: undefined,
    toDate: undefined,
    search: undefined,
    isToWarehouse: true,
  });
  const [selectedDelivery, setSelectedDelivery] = useState<any>({});
  const [openModalBill, setOpenModalBill] = useState(false);

  const [warehouses, setWarehouses] = useState<any[]>([]);
  const { stateChangeStatusPackage } = useSelector(
    (state: AppState) => state.packageReducer
  );
  const { stateGetListPackage } = useSelector(
    (state: AppState) => state.packageReducer
  );
  const { stateExportBillDelivery } = useSelector(
    (state: AppState) => state.packageReducer
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
                "import"
              ) {
                fakeRoles.push("import");
              }
              // if (
              //   _dataUser.menu[i].children[j].children[k].funct_code ===
              //   "export-excel"
              // ) {
              //   fakeRoles.push("export-excel");
              // }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);

  useEffect(() => {
    if (!stateChangeStatusPackage.isLoading) {
      dispatch(getListPackage(paramsFilter));
    }
  }, [paramsFilter, stateChangeStatusPackage.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateChangeStatusPackage;
    if (success) {
      setOpenModalChangePackageStatus(false);
      setSelectedEditBills([]);
      setSelectedRows([]);
      setSinglePackage([]);
      return notifySuccess("Chuyển trạng thái bảng kê thành công");
    }
    if (success === false || error) {
      return notifyError(message ? message.toString() : "");
    }
  }, [stateChangeStatusPackage.isLoading]);

  useEffect(() => {
    const getWareHouses = async () => {
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
          `${API_URL}/${ROOT_VERSION}/warehouses`,
          {
            headers: headers,
          }
        );
        if (data) {
          let convertData = [];
          for (var i = 0; i < data?.data?.warehouses.length; i++) {
            convertData.push({
              value: data?.data?.warehouses[i]?.id,
              label: data?.data?.warehouses[i]?.ws_name,
            });
          }
          setWarehouses(convertData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getWareHouses();
    return () => {
      setWarehouses([]);
    };
  }, []);
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
  const rowSelection = {
    selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  const handleOpenChangeStatusPackage = () => {
    if (selectedEditBills.length > 0) {
      setOpenModalChangePackageStatus(true);
    } else {
      notifyWarning("Vui lòng chọn bảng kê");
    }
  };
  const handleChangeStatusPackage = () => {
    if (singlePackage.length > 0) {
      let params = {
        packages_list: singlePackage,
        package_status_id: 3,
      };
      dispatch(changeStatusPackage(params));
    } else {
      let params = {
        packages_list: selectedEditBills,
        package_status_id: 3,
      };
      dispatch(changeStatusPackage(params));
    }
  };
  const handleCloseChangeStatusPackage = () => {
    setSinglePackage([]);
    setOpenModalChangePackageStatus(false);
  };

  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilter({ ...paramsFilter, page: page, limit: pageSize });
  };

  const handleChangeSinglePackageStatus = (e: any) => {
    setSinglePackage([e.id]);
    setOpenModalChangePackageStatus(true);
  };

  const selectPackageCallback = (e: any) => {
    if (e.id) {
      setOpenModalBill(true);
      setSelectedDelivery(e);
    }
  };

  const handleFinishSearch = (e: any) => {
    setParamsFilter({
      status: 2,
      limit: 10,
      page: 1,
      fromWarehouseId: e.fromWarehouseId,
      startDate: e.dateFromPicker
        ? moment(e.dateFromPicker).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      toDate: e.dateToPicker
        ? moment(e.dateToPicker).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      search: e.search,
    });
  };

  const handleResetSearch = () => {
    setParamsFilter({
      status: 2,
      limit: 10,
      page: 1,
      fromWarehouseId: undefined,
      startDate: undefined,
      toDate: undefined,
      search: undefined,
    });
    formSearch.resetFields();
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      formSearch.submit();
    }
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
  return (
    <div className="mainPages">
      <OverlaySpinner
        open={stateChangeStatusPackage.isLoading}
        text="Đang chuyển trạng thái bảng kê ..."
      />
      <OverlaySpinner
        open={stateExportBillDelivery.isLoading}
        text="Đang xử lý ..."
      />
      <Modal
        visible={openModalBill}
        centered
        title={`Bảng kê ${selectedDelivery?.package_code}`}
        className="modalEditSender"
        onCancel={() => setOpenModalBill(false)}
        footer={null}
        width={"90%"}
        style={{ top: "10px", maxHeight: "calc(100vh - 20px)" }}
      >
        <OrdersInDeliveryBill data={selectedDelivery} />
      </Modal>
      <Modal
        visible={openModalChangePackageStatus}
        title={null}
        centered
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusPackage()}
        onOk={() => handleChangeStatusPackage()}
        width={700}
      >
        <div>
          Xác nhận đổi trạng thái của{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {singlePackage.length > 0
              ? singlePackage.length
              : selectedRows?.length}
          </span>{" "}
          bảng kê{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            Đang vận chuyển
          </span>
          {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>Nhập kho </span>
        </div>
      </Modal>
      <SubHeader
        breadcrumb={[{ text: "Điểu phối vận đơn" }, { text: "Nhận bảng kê" }]}
      />
      <Form
        form={formSearch}
        onFinish={handleFinishSearch}
        style={{ width: "100%" }}
        initialValues={{ search: "" }}
      >
        <SearchComponent>
          {/* <Form.Item name="search">
            <InputNewStyled />
          </Form.Item> */}
          <FormInputAntd
            {...defaultStyles}
            name="search"
            label="Nội dung tìm kiếm"
            width="calc(30% - 4px)"
            suffixIcon={<SvgIconSearch />}
            suffixLeft="12px"
            padding="0 12px 0 36px"
            placeholder="Nhập nội dung tìm kiếm"
            onKeyPress={(e: any) => handleKeyPress(e)}
          />

          <div className="searchOptions">
            <FormSelectAntd
              {...defaultStyles}
              name="fromWarehouseId"
              options={warehouses}
              borderRadius="5px"
              label="Kho đi"
              placeholder="Chọn kho"
              width="calc(20% - 4px)"
              padding="0 20px 0 0"
              suffixIcon={<img src={arrow} alt="" />}
              margin="-20px 0 0 0"
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
            <div className="searchDatetimePicker">
              <span>Ngày đi</span>
              <Form.Item name="dateFromPicker">
                <DatePicker />
              </Form.Item>
            </div>{" "}
            <div className="searchDatetimePicker">
              <span>Ngày đến</span>

              <Form.Item name="dateToPicker">
                <DatePicker />
              </Form.Item>
            </div>
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
        <ActionsHeader
          actions={[
            roles.find((x) => x === "import") && {
              text: "Nhập kho",
              callback: handleOpenChangeStatusPackage,
              svg: <SvgClosed />,
              scale: true,
            },
            // {
            //   text: "Xuất file",
            //   callback: importFileCallback,
            //   svg: <SvgIconExportFile />,
            //   scale: true,
            // },
            // {
            //   text: "Sắp xếp",
            //   callback: importFileCallback,
            //   svg: <SvgIconGroupBy />,
            //   scale: true,
            // },
          ]}
        />
        <TableStyledAntd
          className="ordersTable"
          rowKey={"id"}
          rowSelection={rowSelection}
          columns={columnsHoanTatDonHang({
            selectPackageCallback,
            handleChangeSinglePackageStatus,
            exportBillDeliveryCallback,
            roles: roles,
          })}
          dataSource={
            stateGetListPackage.data
              ? stateGetListPackage.data.packageLists
              : []
          }
          loading={stateGetListPackage.isLoading}
          pagination={false}
          bordered
          widthCol1="5%"
          widthCol2="12%"
          widthCol3="14%"
          widthCol4="14%"
          widthCol5="10%"
          widthCol6="8%"
          widthCol7="17%"
          widthCol8="20%"
          widthCol9="5%"
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
              stateGetListPackage.data
                ? stateGetListPackage.data?.paging?.totalPage
                : 0
            } bảng kê `
          }
          total={
            stateGetListPackage.data
              ? stateGetListPackage.data?.paging?.totalPage
              : 0
          }
        />
      </TableHoanTatDonHang>
    </div>
  );
};

export default NhanBangKe;

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
