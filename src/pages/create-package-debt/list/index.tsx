// import { CATEGORIES_MOCK } from "./json";
// import TableCate from "./TableCate";
/* eslint-disable */
import { Col, DatePicker, Input, Result, Row, Select, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrow from "src/assets/images/arrow.svg";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import CustomBreadcrumb from "src/components/layout/Breadcrumb";
import {
  notifyError,
  notifySuccess,
  notifyWarning
} from "src/components/notification";
import { dataTypeCustomer } from "src/constants";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData, defaultFilter } from "./data";
import { IParamsFilter } from "./interfaces";
import "./styles.less";
// import UserSystem from "../edit";
import moment from "moment";
import { useHistory } from "react-router-dom";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgTwoPage from "src/assets/svg/SvgTwoPage";
import SvgXuatKhoTraHang from "src/assets/svg/SvgXuatKhoTraHang";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import OrderInformations from "src/pages/listed/orders/components/OrderInformations";
import { getStatusColor } from "src/pages/listed/orders/data";
import { getListCustomerGroup } from "src/services/actions/customer.actions";
import { getLinkDownload } from "src/services/actions/export.actions";
import {
  createPakageDebtList, getExportPakageDebtListDetail,
  getListOfDebt
} from "src/services/actions/orders.actions";
import { updateOneUserSystem } from "src/services/actions/user.actions";
import routerNames from "src/utils/data/routerName";

const CustomerList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const history = useHistory();
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [selectedRowsKey, setSelectedRowsKey] = useState<any[]>([]);
  const [orderInformation, setOrderInformation] = useState<any>({});
  const [listDebt, setListDebt] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>({});
  const [dataCreate, setDataCreate] = useState<any>({});
  const [openInformationOrder, setOpenInformationOrder] = useState<any>(false);
  const [paging, setPaging] = useState<object>({});
  const [selectedAll, setSelectedAll] = useState<boolean>(true);
  const [openModalCreateDebt, setOpenModalCreateDebt] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowById, setSelectedRowById] = useState<any>(undefined);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [customerGroups, setCustomerGroups] = useState<any>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);
  const { stateGetListOfDebt } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  const { stateCreatePakageDebtList } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  const { stateGetExportPakageDebtListDetail } = useSelector(
    (state: AppState) => state.ordersReducer
  );
  const { stateUpdateOneUserSystem } = useSelector(
    (state: AppState) => state.userReducer
  );
  const { stateGetCustomerGroup } = useSelector(
    (e: AppState) => e.customerReducer
  );
  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    loadListDebt();
    dispatch(getListCustomerGroup({}))
  }, []);
  const pathName = useHistory().location.pathname.slice(1);

  useEffect(() => {
    let _dataUser = JSON.parse(localStorage.getItem("ACCOUNT") || "");
    if (_dataUser?.menu) {
      let fakeRoles = [] as any;
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
                "create-package-debt"
              ) {
                fakeRoles.push("create-package-debt");
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
    const { success, message, error, data } = stateGetListOfDebt;
    if (success) {
      setSelectedRowById(undefined);
      setSelectedRowsKey([]);
      setSelectedRows([]);
      setListDebt(data.bills);
      setPaging(data.paging);
      setLoading(false);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateGetListOfDebt.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateGetExportPakageDebtListDetail;
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
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateCreatePakageDebtList;
    if (data) {
      setSelectedRowsKey([]);
      setSelectedRows([]);
      loadListDebt();
      setDataCreate(data);
      setOpenModalCreateDebt(false);
      setOpenModalSuccess(true);
      setSelectedRowById(undefined);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateCreatePakageDebtList.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
    stateGetCustomerGroup;
    if (data) {
      const _newData=data.customerGroups.map((item:any)=>{
        return {
          name:item.description,
          value:item.id,
          customer_group:item.customer_group,
        }
      })
      setCustomerGroups(_newData)
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateGetCustomerGroup.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateUpdateOneUserSystem;
    if (success) {
      setCreateUpdateLoading(false);
      loadListDebt();
      notifySuccess(message || "");
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneUserSystem.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const rowSelection = {
    selectedRowKeys: selectedRowsKey,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedRowById(selectedRows[0]?.customer_id);
      setSelectedRows(selectedRows);
      setSelectedRowsKey(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled:
        (record.package_debt_code !== null ? true : false) ||
        (selectedRowById ? record.customer_id !== selectedRowById : false), // Column configuration not to be checked
      name: record.title,
    }),
    hideSelectAll: selectedAll,
  };
  const loadListDebt = (isDefault = false) => {
    setOpenModalSuccess(false);
    dispatch(
      getListOfDebt({
        to_delivery_at: paramsFilter.to_delivery_at,
        from_delivery_at: paramsFilter.from_delivery_at,
        customer_type_id: paramsFilter.customer_type_id,
        customer_group_id: paramsFilter.customer_group_id,
        payment_status_id: paramsFilter.payment_status_id,
        page: isDefault ? 1 : paramsFilter.page,
        limit: paramsFilter.limit,
        search: paramsFilter.search,
      })
    );
  };

  const btnVisbleCreate = () => {
    setVisible(true);
    setDataUser({});
    setIsCreate(true);
  };

  const btnVisbleUpdate = (data: any) => {
    setDataUser(data);
    setIsCreate(false);
    setVisible(true);
  };

  const btnChangeStatus = (values: any) => {
    setCreateUpdateLoading(true);
    let params = {
      status: values.status ? "A" : "D",
    };
    dispatch(updateOneUserSystem(values.id, params));
  };
  const handleKeyDown = (e: any) => {
    // console.log(paramsFilter);
    if (e.key === "Enter") {
      if (paramsFilter?.search?.toString().length) {
        setSelectedAll(false);
      } else {
        setSelectedAll(true);
      }
      setLoading(true);
      loadListDebt(true);
    }
  };
  const onChangePaging = (page: number, limit: number, isDefault = false) => {
    setLoading(true);
    setParamsFilter({
      ...paramsFilter,
      page: page,
      limit: limit,
    });
    dispatch(
      getListOfDebt({
        ...paramsFilter,
        page: page,
        limit: limit,
      })
    );
  };

  const onFinish = () => {
    setVisible(false);
    loadListDebt(true);
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */
  const handleChangeFilterDatetime = (data: any) => {
    setParamsFilter({
      ...paramsFilter,
      from_delivery_at: data[0]
        ? moment(data[0]).format("YYYY-MM-DD")
        : undefined,
      to_delivery_at: data[1]
        ? moment(data[1]).format("YYYY-MM-DD")
        : undefined,
    });
  };
  const _renderSearch = () => {
    return (
      <div className="flex mb-4">
        <div className="w-full">
          <Row gutter={[10, 0]}>
            <Col span={7}>
              <div style={{ fontSize: "12px" }}>Tìm kiếm</div>
              <Input
                onChange={(e) =>
                  setParamsFilter({
                    ...paramsFilter,
                    search: e.target.value,
                  })
                }
                allowClear
                style={{ borderRadius: "5px" }}
                placeholder="Mã khách hàng, email, sđt"
                size="small"
                prefix={<SvgIconSearch />}
              />
            </Col>
            <Col span={5}>
              <div style={{ fontSize: "12px" }}>Ngày giao thành công</div>
              <DatePicker.RangePicker
                style={{ height: "41px", width: "100%", borderRadius: "5px" }}
                onChange={(e: any) => handleChangeFilterDatetime(e)}
              />
            </Col>
            <Col span={4}>
              <div style={{ fontSize: "12px" }}>Nhóm khách hàng</div>
              <Select
                allowClear
                showSearch
                onChange={(val) =>
                  setParamsFilter({
                    ...paramsFilter,
                    customer_group_id: val,
                  })
                }
                size="large"
                suffixIcon={<img src={arrow} alt="" />}
                placeholder="Nhóm khách hàng"
                className="w-full"
                filterOption={(input: any, option: any) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input?.toLowerCase()) >= 0
                }
              >
                {customerGroups.map((e:any) => {
                  return (
                    <Select.Option value={e.value} key={e.value}>
                      {e.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <div style={{ fontSize: "12px" }}>Loại khách hàng</div>
              <Select
                allowClear
                showSearch
                onChange={(val) =>
                  setParamsFilter({
                    ...paramsFilter,
                    customer_type_id: val,
                  })
                }
                size="large"
                suffixIcon={<img src={arrow} alt="" />}
                placeholder="Loại khách hàng"
                className="w-full"
                filterOption={(input: any, option: any) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input?.toLowerCase()) >= 0
                }
              >
                {dataTypeCustomer.map((e) => {
                  return (
                    <Select.Option
                      className="setBoder"
                      value={e.value}
                      key={e.value}
                    >
                      {e.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <div style={{ fontSize: "12px" }}>&nbsp;</div>
              <ButtonTMS
                type="light"
                className="w-full"
                icon="search"
                // fillIcon={colors.neutral_color_1_4}
                onClick={() => handleKeyDown({ key: "Enter" })}
              >
                <span className="text-neutral_color_1_3">Tìm kiếm</span>
              </ButtonTMS>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */
  const handleCreateDet = () => {
    if (selectedRows.length > 0) {
      setOpenModalCreateDebt(true);
    } else {
      notifyWarning("Vui lòng chọn bảng kê");
    }
  };
  const handleDetailDebt = () => {
    let path = `${routerNames.PACKAGE_DEBT_LIST}/${dataCreate.id}`;
    history.push(path);
  };
  const openModalCallback = (e: any, data: any) => {
    if (e === 4) {
      setOpenInformationOrder(true);
      setOrderInformation(data);
    }
  };
  const handleCloseCreateDebt = () => {
    setOpenModalCreateDebt(false);
  };
  const handleCreateDebt = () => {
    dispatch(
      createPakageDebtList({
        customer_id: selectedRowById,
        vat: undefined,
        note: undefined,
        listBill: selectedRows.map((item: any) => {
          return item.bill_code;
        }),
      })
    );
  };
  return (
    <div className="w-full h-full pl-4 pr-4">
      <CustomBreadcrumb
        rootPath="Bảng kê công nợ"
        currentPath="Tạo bảng kê"
        onClickButton={btnVisbleCreate}
      />
      <Modal
        visible={openModalCreateDebt}
        title={null}
        centered
        className="modalEditSender"
        onCancel={() => handleCloseCreateDebt()}
        onOk={() => handleCreateDebt()}
        cancelText="Hủy"
        width={700}
      >
        <div>
          Xác nhận tạo bảng kê công nợ với{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {selectedRows.length > 0
              ? selectedRows.length
              : selectedRows?.length}
          </span>{" "}
          đơn{" "}
        </div>
      </Modal>
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
        <OrderInformations dataOrder={orderInformation} />
      </Modal>
      <Modal
        visible={openModalSuccess}
        centered
        // title={`Phiếu xuất kho ${selectedDelivery?.package_delivery_code}`}
        className="modalEditSender"
        onCancel={() => setOpenModalSuccess(false)}
        footer={null}
        width={"40%"}
        style={{ maxHeight: "calc(100vh - 20px)" }}
      >
        <div>
          <Result
            // icon={<img src={props.isCancel ? cancelIcon : successIcon} width={150} height={150} alt="icon"/>}
            status={"success"}
            title={
              <div style={{ fontSize: "20px" }}>
                <div>Tạo bảng kê công nợ thành công</div>
                <div>
                  Mã bảng kê{" "}
                  <span style={{ color: "#52c41a" }}>
                    {dataCreate.package_debt_code}
                  </span>
                </div>
              </div>
            }
            extra={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  onClick={() => handleDetailDebt()}
                  className="globalButton"
                  style={{
                    border: "solid 1px #52c41a",
                    // background: "#27aae1",
                    color: "#52c41a",
                    height: "40px",
                    marginBottom: "8px",
                    marginRight: "16px",
                    fontWeight: "600",
                    width: "150px",
                  }}
                >
                  <SvgTwoPage fill="#52c41a" />
                  &nbsp;&nbsp;Chi tiết bảng kê
                </div>
                <div
                  onClick={() => {
                    dispatch(getExportPakageDebtListDetail({packageDebtId:dataCreate.id}))
                  }}
                  className="globalButton"
                  style={{
                    border: "solid 1px #52c41a",
                    background: "#52c41a",
                    color: "#fff",
                    height: "40px",
                    marginBottom: "8px",
                    marginRight: "16px",
                    fontWeight: "600",
                    width: "150px",
                  }}
                >
                  <SvgIconImportFile fill="#fff" />
                  &nbsp;&nbsp;Tải về
                </div>
              </div>
            }
          />
        </div>
      </Modal>
      <Spin spinning={loading}>
        <Col className="contentBody mt-3">
          {_renderSearch()}
          <Spin spinning={createUpdateLoading}>
            <ActionsHeader
              actions={[
                roles.find((x) => x === "create-package-debt") && {
                  text: "Tạo bảng kê",
                  callback: () => handleCreateDet(),
                  svg: <SvgXuatKhoTraHang />,
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
              rowKey={"id"}
              bordered
              isRowLight={true}
              loading={false}
              pagination={false}
              rowSelection={rowSelection}
              columns={columnsData({
                openModalCallback,
                btnChangeStatus,
                btnOpenModal: btnVisbleUpdate,
              })}
              dataSource={listDebt}
              // rowSelection={{
              //   type: 'checkbox',
              //   ...rowSelection,
              // }}
              widthCol1="5%"
              widthCol2="30%"
              widthCol3="25%"
              widthCol4="15%"
              widthCol5="13%"
              widthCol6="12%"
            />
            <PanigationAntStyled
              style={{ marginTop: "8px" }}
              current={paramsFilter.page}
              pageSize={paramsFilter.limit}
              showSizeChanger
              onChange={onChangePaging}
              showTotal={() =>
                `Tổng ${stateGetListOfDebt?.data?.paging?.totalPage||0} bảng kê `
              }
              total={stateGetListOfDebt?.data?.paging?.totalPage}
            />
          </Spin>
        </Col>
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default CustomerList;
