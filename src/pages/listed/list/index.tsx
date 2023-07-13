/* eslint-disable */
import { Col, DatePicker, Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import arrow from "src/assets/images/arrow.svg";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgOpen from "src/assets/svg/SvgOpen";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import {
  defaultStyles,
  styleFlex,
} from "src/components/inputComponentsStyled/defaultStyles";
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
import { getListCustomer } from "src/services/actions/customer.actions";
import { getLinkDownload } from "src/services/actions/export.actions";
import { getListProvince } from "src/services/actions/masterData.actions";
import {
  changeStatusPackage,
  exportListBill,
  getListPackage,
} from "src/services/actions/package.actions";
import { updateOneUserSystem } from "src/services/actions/user.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import OrdersInDeliveryBill from "./components/OrdersInDeliveryBill";
import { columnsData, defaultFilter } from "./data";
import "./styles.less";
const Listed = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [formSearch] = Form.useForm();
  const [mainStatusTab, setMainStatusTab] = useState();
  const [openModalChangePackageStatus, setOpenModalChangePackageStatus] =
    useState(false);
  const [openModalBill, setOpenModalBill] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>({});
  const [selectedEditBills, setSelectedEditBills] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [singlePackage, setSinglePackage] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [paramsFilter, setParamsFilter] = useState<any>({
    limit: 10,
    page: 1,
    status: 1,
    search: undefined,
    fromCreateDate: undefined,
    toCreateDate: undefined,
    fromWarehouseId: undefined,
    toWarehouseId: undefined,
    startDate: undefined,
    toDate: undefined,
  });
  const [warehouses, setWarehouses] = useState<any[]>([]);

  const { stateGetListPackage } = useSelector(
    (state: AppState) => state.packageReducer
  );

  const { stateChangeStatusPackage } = useSelector(
    (state: AppState) => state.packageReducer
  );
  const { stateExportListBill } = useSelector(
    (state: AppState) => state.packageReducer
  );
  /****************************START**************************/
  /*                         Life Cycle                      */

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
                "export"
              ) {
                fakeRoles.push("export");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "export-excel"
              ) {
                fakeRoles.push("export-excel");
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
    loadListCustomer();
    loadListProvince();
  }, []);

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
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateChangeStatusPackage.isLoading]);

  //export list bill
  useEffect(() => {
    if (isMount) return;
    const { message, success, error, data, isLoading } = stateExportListBill;
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
  }, [stateExportListBill.isLoading]);

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
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const rowSelection = {
    selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  const loadListCustomer = (isDefault = false) => {
    const _paramsListCustomer = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(defaultFilter);
    }
    dispatch(
      getListCustomer({
        warehouseId: _paramsListCustomer.warehouseId,
        listedType: _paramsListCustomer.listedType,
        page: _paramsListCustomer.currentPage,
        limit: _paramsListCustomer.sizePage,
        search: _paramsListCustomer.q,
      })
    );
  };

  const loadListProvince = () => {
    dispatch(getListProvince());
  };

  const btnChangeStatus = (values: any) => {
    let params = {
      status: values.status ? "A" : "D",
    };
    dispatch(updateOneUserSystem(values.id, params));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      loadListCustomer();
    }
  };
  const onChangeTable = (page: any) => {
    const _filter = {
      ...paramsFilter,
      currentPage: page.current,
      sizePage: page.pageSize,
      isDispatch: true,
    };
    setParamsFilter(_filter);
  };

  const handleChangeMainStatus = (value: any) => {
    setMainStatusTab(value);
    setParamsFilter({ ...paramsFilter, status: value });
  };
  const handleOpenChangeStatusPackage2 = () => {
    if (selectedEditBills.length > 0) {
      setOpenModalChangePackageStatus(true);
    } else {
      notifyWarning("Vui lòng chọn bảng kê");
    }
  };

  const handleChangeSinglePackageStatus2 = (e: any) => {
    setSinglePackage([e.id]);
    setOpenModalChangePackageStatus(true);
  };
  const handleExportListBill = (e: any) => {
    dispatch(exportListBill({ packageId: e.id }));
  };
  const handleChangeStatusPackage2 = () => {
    if (singlePackage.length > 0) {
      let params = {
        packages_list: singlePackage,
        package_status_id: 2,
      };
      dispatch(changeStatusPackage(params));
    } else {
      let params = {
        packages_list: selectedEditBills,
        package_status_id: 2,
      };
      dispatch(changeStatusPackage(params));
    }
  };
  const handleCloseChangeStatusPackage2 = () => {
    setSinglePackage([]);
    setOpenModalChangePackageStatus(false);
  };
  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilter({ ...paramsFilter, page: page, limit: pageSize });
  };
  const sortCallback = () => {};
  const exportFileCallback = () => {};
  const importFileCallback = () => {};

  const selectPackageCallback = (e: any) => {
    if (e.id) {
      setOpenModalBill(true);
      setSelectedDelivery(e);
    }
  };
  const handleFinishSearch = (values: any) => {
    setParamsFilter({
      limit: 10,
      page: 1,
      status: 1,
      search: values.search,
      fromCreateDate: values.createDate
        ? moment(values.createDate[0]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      toCreateDate: values.createDate
        ? moment(values.createDate[1]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      fromWarehouseId: values.fromWarehouseId,
      toWarehouseId: values.toWarehouseId,
      startDate: values.dateFromPicker
        ? moment(values.dateFromPicker).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      toDate: values.dateFromPicker
        ? moment(values.dateFromPicker).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
    });
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      formSearch.submit();
    }
  };

  const handleResetSearch = () => {
    setParamsFilter({
      status: 2,
      limit: 10,
      page: 1,
      fromCreateDate: undefined,
      toCreateDate: undefined,
      fromWarehouseId: undefined,
      toWarehouseId: undefined,
      startDate: undefined,
      toDate: undefined,
      search: undefined,
    });
    formSearch.resetFields();
  };

  const _renderSearch = () => {
    return (
      <Form form={formSearch} id="formSearch" onFinish={handleFinishSearch}>
        <div style={{ ...styleFlex, marginTop: "16px" }}>
          <FormInputAntd
            {...defaultStyles}
            label="Nội dung tìm kiếm"
            onKeyPress={(e: any) => handleKeyPress(e)}
            width="calc(60% - 4px)"
            name="search"
            margin="-24px 0 0 0"
            placeholder="Nhập nội dung tìm kiếm"
          />
          <div
            style={{
              width: "calc(40% - 4px)",
              marginTop: "-21px",
            }}
          >
            <span style={{ fontSize: "12px" }}> Ngày tạo</span>
            <Form.Item name="createDate">
              <DatePicker.RangePicker
                style={{
                  height: "41px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #BFC4C9",
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div style={{ ...styleFlex, width: "100%" }}>
          <div style={{ ...styleFlex, width: "calc(38% - ( 16px / 3 ))" }}>
            <FormSelectAntd
              {...defaultStyles}
              name="fromWarehouseId"
              label="Kho đi"
              placeholder="Chọn kho đi"
              width="calc(33% - 4px)"
              margin="-44px 0 0 0"
              padding="0"
              border="1px solid #BFC4C9"
              options={warehouses}
              suffixIcon={<img src={arrow} alt="" />}
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />{" "}
            <div
              style={{
                width: "calc(67% - 4px)",
                marginTop: "-21px",
              }}
            >
              <Form.Item name="fromDate">
                <span style={{ fontSize: "12px" }}> Ngày đi</span>
                <DatePicker
                  style={{
                    height: "41px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #BFC4C9",
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div style={{ ...styleFlex, width: "calc(38% - ( 16px / 3 ))" }}>
            <FormSelectAntd
              {...defaultStyles}
              name="toWarehouseId"
              label="Kho đến"
              placeholder="Chọn kho đến"
              width="calc(33% - 4px)"
              margin="-44px 0 0 0"
              padding="0"
              border="1px solid #BFC4C9"
              options={warehouses}
              suffixIcon={<img src={arrow} alt="" />}
              onChange={(e: any) => console.log("")}
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
            <div
              style={{
                width: "calc(67% - 4px)",
                marginTop: "-21px",
              }}
            >
              <Form.Item name="toDate">
                <span style={{ fontSize: "12px" }}> Ngày đến</span>
                <DatePicker
                  style={{
                    height: "41px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #BFC4C9",
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div style={{ ...styleFlex, width: "calc(24% - ( 16px / 3 ))" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "41px",
                width: "calc(50% - 4px)",
                margin: " 0 0 24px 0",
                borderRadius: "5px",
                border: "1px solid #BFC4C9",
              }}
            >
              <SvgIconSearch />
              <span style={{ marginLeft: "8px" }}>Tìm kiếm</span>
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "41px",
                width: "calc(50% - 4px)",
                margin: " 0 0 24px 0",
                borderRadius: "5px",
                border: "1px solid #BFC4C9",
              }}
              onClick={() => handleResetSearch()}
            >
              <SvgIconRefresh fill="#b7bdc4" />
              <span style={{ marginLeft: "8px" }}>Làm mới</span>
            </div>
          </div>
        </div>
      </Form>
    );
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className="w-full h-full pl-4 pr-4">
      <OverlaySpinner
        open={stateChangeStatusPackage.isLoading}
        text="Đang chuyển trạng thái bảng kê ..."
      />
      <OverlaySpinner
        open={stateExportListBill.isLoading}
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
        onCancel={() => handleCloseChangeStatusPackage2()}
        onOk={() => handleChangeStatusPackage2()}
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
            Chờ vận chuyển
          </span>
          {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>Xuất kho </span>
        </div>
      </Modal>
      <SubHeader
        breadcrumb={[{ text: "Bảng kê" }, { text: "Danh sách bảng kê" }]}
      />
      <Col className="contentBody mt-3" style={{ padding: "16px 16px 0 16px" }}>
        {_renderSearch()}
      </Col>
      <Col className="contentBody mt-3">
        <div
          className="mainStatusTabs"
          style={{ justifyContent: "space-between" }}
        >
          <div style={{ display: "flex" }}>
            {[
              {
                label: "Chờ vận chuyển",
                value: 1,
                count: 0,
              },
              {
                label: "Đang vận chuyển",
                value: 2,
                count: 0,
              },
              {
                label: "Nhập kho",
                value: 3,
                count: 0,
              },
              {
                label: "Đã đóng",
                value: 4,
                count: 0,
              },
            ].map((status, index) => (
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
          <ActionsHeader
            actions={
              mainStatusTab === 1 && [
                roles.find((x) => x === "export") && {
                  text: "Xuất kho",
                  callback: handleOpenChangeStatusPackage2,
                  svg: <SvgOpen />,
                  scale: true,
                },
              ]
            }
          />
        </div>

        <div className="tableBangke">
          <TableStyledAntd
            rowKey={"id"}
            bordered
            isRowLight={true}
            columns={columnsData({
              handleChangeSinglePackageStatus2,
              selectPackageCallback,
              handleExportListBill,
              roles: roles,
            })}
            dataSource={
              stateGetListPackage.data
                ? stateGetListPackage.data.packageLists
                : []
            }
            rowSelection={rowSelection}
            loading={stateGetListPackage.isLoading}
            pagination={false}
            onChange={onChangeTable}
            widthCol1="5%"
            widthCol2="14%"
            widthCol3="5%"
            widthCol4="12%"
            widthCol5="12%"
            widthCol6="8%"
            widthCol7="7%"
            widthCol8="13%"
            widthCol9="6%"
            widthCol10="20%"
            widthCol11="5%"
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
        </div>
      </Col>
    </div>
  );

  /**************************** END **************************/
};

export default Listed;
