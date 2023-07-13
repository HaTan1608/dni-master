/* eslint-disable */
import { DatePicker, Form, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import arrow from "src/assets/images/arrow.svg";
import SvgHoanThanh from "src/assets/svg/SvgHoanThanh";
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
import { getListDeliveryBill } from "src/services/actions/orders.actions";
import {
  changeStatusListDelivery,
  exportBillDelivery,
} from "src/services/actions/package.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import styled from "styled-components";
import OrdersInDeliveryBill from "./components/OrdersInDeliveryBill";
import { columnsHoanTatDonHang } from "./data";

const DeliveryBill = () => {
  const [formSearch] = Form.useForm();
  const isMount = useIsMount();
  const dispatch = useDispatch();

  const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
  const [openModalBill, setOpenModalBill] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [selectedEditDeliveries, setSelectedEditDeliveries] = useState([]);
  const [roles, setRoles] = useState([]);

  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [singleDelivery, setSingleDelivery] = useState([]);
  const [paramsFilter, setParamsFilter] = useState({
    limit: 10,
    page: 1,
  });
  const { stateListDeliveryBill } = useSelector((state) => state.ordersReducer);

  const { stateChangeStatusBills } = useSelector(
    (state) => state.ordersReducer
  );

  const { stateChangeStatusListDelivery } = useSelector(
    (state) => state.packageReducer
  );

  const { stateExportBillDelivery } = useSelector(
    (state) => state.packageReducer
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
                "complete-note"
              ) {
                fakeRoles.push("complete-note");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "load-excel"
              ) {
                fakeRoles.push("load-excel");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "import-cannot-ship"
              ) {
                fakeRoles.push("import-cannot-ship");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "print-bill-export-note"
              ) {
                fakeRoles.push("print-bill-export-note");
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
    if (
      !stateChangeStatusBills.isLoading &&
      !stateChangeStatusListDelivery.isLoading
    ) {
      dispatch(getListDeliveryBill(paramsFilter));
    }
  }, [
    paramsFilter,
    stateChangeStatusBills.isLoading,
    stateChangeStatusListDelivery.isLoading,
  ]);

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
    const { message, success, error, isLoading } = stateListDeliveryBill;
    if (!isLoading) {
      if (success) {
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateListDeliveryBill.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateChangeStatusBills;
    if (success) {
      setOpenModalChangeStatus(false);
      setSelectedEditDeliveries([]);
      setSelectedDeliveries([]);
      setSingleDelivery([]);
      return notifySuccess("Chuyển trạng thái đơn thành công");
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateChangeStatusBills.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateChangeStatusListDelivery;
    if (success) {
      setOpenModalChangeStatus(false);
      setSelectedEditDeliveries([]);
      setSelectedDeliveries([]);
      setSingleDelivery([]);
      return notifySuccess("Chuyển trạng thái phiếu thành công");
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateChangeStatusListDelivery.isLoading]);

  useEffect(() => {
    const getVehicles = async () => {
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
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/vehicles?status=A`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeArray = [];
          for (let i = 0; i < data?.data?.vehicles?.length; i++) {
            fakeArray.push({
              label: data?.data?.vehicles[i]?.vehicle_name,
              value: data?.data?.vehicles[i]?.id,
            });
          }
          setVehicles(fakeArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVehicles();
    return () => {
      setVehicles([]);
    };
  }, []);

  const rowSelection = {
    selectedRowKeys: selectedEditDeliveries,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedEditDeliveries(selectedRowKeys);
      setSelectedDeliveries(selectedRows);
    },
  };
  const handleOpenChangeStatusListPackage = () => {
    if (selectedEditDeliveries.length > 0) {
      setOpenModalChangeStatus(true);
      setSingleDelivery([]);
    } else {
      notifyWarning("Vui lòng chọn bảng kê");
    }
  };

  const handleCloseChangeStatusBills = () => {
    setOpenModalChangeStatus(false);
    setSingleDelivery([]);
  };

  const handleChangeStatusListPackage = () => {
    dispatch(
      changeStatusListDelivery({
        listPackageDelivery:
          singleDelivery.length > 0 ? singleDelivery : selectedEditDeliveries,
      })
    );
  };

  const onChangePaging = (page, pageSize) => {
    setParamsFilter({ ...paramsFilter, page: page, limit: pageSize });
  };

  const handleChangeSingleBillStatus = (e, status) => {
    setOpenModalChangeStatus(true);
    setSingleDelivery([e.id]);
  };

  const handleFinishSearch = (values) => {
    setParamsFilter({
      ...paramsFilter,
      search: values.search,

      fromDate: values.datePicker
        ? moment(values.datePicker[0]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      toDate: values.datePicker
        ? moment(values.datePicker[1]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      fromExportDate: values.dateExport
        ? moment(values.dateExport[1]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      toExportDate: values.dateExport
        ? moment(values.dateExport[1]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
    });
  };

  const handleResetSearch = () => {
    formSearch.resetFields();
    setParamsFilter({
      ...paramsFilter,
      search: "",

      fromDate: undefined,
      toDate: undefined,
      fromExportDate: undefined,
      toExportDate: undefined,
    });
  };

  const importFileCallback = () => {};
  const openModalCallback = (e) => {
    setOpenModalBill(true);
    setSelectedDelivery(e);
  };
  const dispatchDataCallback = (e) => {
    dispatch(getListDeliveryBill(paramsFilter));
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      formSearch.submit();
    }
  };

  const exportBillDeliveryCallback = (e) => {
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
        open={stateChangeStatusBills.isLoading}
        text="Đang chuyển trạng thái đơn ..."
      />
      <OverlaySpinner
        open={stateExportBillDelivery.isLoading}
        text="Đang xử lý ..."
      />
      <Modal
        visible={openModalChangeStatus}
        title={null}
        centered
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleChangeStatusListPackage()}
        width={700}
      >
        <div>
          Xác nhận đổi trạng thái của{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {singleDelivery.length > 0
              ? singleDelivery.length
              : selectedDeliveries?.length}
          </span>{" "}
          phiếu {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>Hoàn thành</span>
        </div>
      </Modal>
      <Modal
        visible={openModalBill}
        title={`Phiếu xuất kho ${selectedDelivery?.package_delivery_code}`}
        className="modalEditSender"
        onCancel={() => setOpenModalBill(false)}
        footer={null}
        width={"90%"}
        centered
        style={{ top: "10px", maxHeight: "calc(100vh - 20px)" }}
      >
        <OrdersInDeliveryBill
          data={selectedDelivery}
          dispatchDataCallback={dispatchDataCallback}
          roles={roles}
        />
      </Modal>
      <SubHeader
        breadcrumb={[
          { text: "Điểu phối vận đơn" },
          { text: "Hoàn tất đơn hàng" },
        ]}
      />{" "}
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
            placeholder="Nhập nội dung tìm kiếm"
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <div className="searchDatetimePicker">
            <span style={{ fontSize: "12px" }}>Ngày tạo</span>
            <Form.Item name="datePicker">
              <DatePicker.RangePicker />
            </Form.Item>
          </div>
          <div className="searchDatetimePicker">
            <span style={{ fontSize: "12px" }}>Ngày xuất kho </span>
            <Form.Item name="dateExport">
              <DatePicker.RangePicker />
            </Form.Item>
          </div>
          <div className="searchOptions">
            <FormSelectAntd
              {...defaultStyles}
              name="vehicle"
              options={vehicles}
              borderRadius="5px"
              label="Xe"
              placeholder="Chọn xe"
              width="calc(33% - 4px)"
              padding="0 20px 0 0"
              suffixIcon={<img src={arrow} alt="" />}
              margin="-20px 0 0 0"
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
        </SearchComponent>
      </Form>
      <TableHoanTatDonHang>
        <ActionsHeader
          actions={[
            // {
            //   text: "Nhập kho không phát được",
            //   callback: () => handleOpenChangeStatusBills(3),
            //   svg: <SvgNhapKhoKhongPhatDuoc />,
            //   scale: true,
            // },
            roles.find((x) => x === "complete-note") && {
              text: "Hoàn thành",
              callback: () => handleOpenChangeStatusListPackage(),
              svg: <SvgHoanThanh />,
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
            openModalCallback,
            handleChangeSingleBillStatus,
            exportBillDeliveryCallback,
            roles: roles,
          })}
          dataSource={
            stateListDeliveryBill.data
              ? stateListDeliveryBill.data?.packageDeliveryLists
              : []
          }
          loading={stateListDeliveryBill.isLoading}
          pagination={false}
          bordered
          widthCol1="5%"
          widthCol2="18%"
          widthCol3="14%"
          widthCol4="18%"
          widthCol5="7.5%"
          widthCol6="10%"
          widthCol7="22.5%"
          widthCol8="5%"
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
              stateListDeliveryBill.data
                ? stateListDeliveryBill.data?.paging?.totalPage
                : 0
            } phiếu `
          }
          total={
            stateListDeliveryBill.data
              ? stateListDeliveryBill.data?.paging?.totalPage
              : 0
          }
        />
      </TableHoanTatDonHang>
    </div>
  );
};

export default DeliveryBill;

const SearchComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 16px 16px 0px 16px;

  .searchDatetimePicker {
    width: calc(20% - 4px);
    margin-top: 2px;
    .ant-picker.ant-picker-range {
      width: 100%;
      height: 41px;
      border-radius: 5px;
    }
  }
  .searchOptions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(40% - 4px);
  }
  .buttonSearch {
    width: calc(33% - 4px);
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
