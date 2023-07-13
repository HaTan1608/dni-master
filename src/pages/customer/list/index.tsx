// import { CATEGORIES_MOCK } from "./json";
// import TableCate from "./TableCate";
/* eslint-disable */
import { Col, Input, Row, Select, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import arrow from "src/assets/images/arrow.svg";
import SvgExcel from "src/assets/svg/SvgExcel";
import SvgFile from "src/assets/svg/SvgFile";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import CustomBreadcrumb from "src/components/layout/Breadcrumb";
import {
  notifyError,
  notifySuccess,
  notifyWarning
} from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import {
  dataOptionsStatus,
  dataTypeCustomer,
  EXPORT_TEMPLATE_TYPE
} from "src/constants";
import {
  getListCustomer,
  importFileCustomer
} from "src/services/actions/customer.actions";
import {
  getExportTemplate,
  getLinkDownload
} from "src/services/actions/export.actions";
import { getListProvince } from "src/services/actions/masterData.actions";
import { updateOneUserSystem } from "src/services/actions/user.actions";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import UserSystem from "../edit";
import { columnsData, defaultFilter } from "./data";
import { DataType, IParamsFilter } from "./interfaces";
import "./styles.less";

const CustomerList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();

  const [visible, setVisible] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [dataProvinces, setDataProvinces] = useState<any[]>([]);
  const [dataUsers, setDataUsers] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>({});
  const [paging, setPaging] = useState<object>({});
  const [openImport, setOpenImport] = useState(false);
  const [fileTest, setFileTest] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [roles, setRoles] = useState<any[]>([]);

  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);
  const { stateGetListCustomer } = useSelector(
    (state: AppState) => state.customerReducer
  );
  const { stateProvince } = useSelector(
    (state: AppState) => state.masterDataReducer
  );
  const { stateUpdateOneUserSystem } = useSelector(
    (state: AppState) => state.userReducer
  );
  const { stateImportFileCustomer } = useSelector(
    (state: AppState) => state.customerReducer
  );
  const stateExportTemplate = useSelector(
    (e: AppState) => e.exportReducer.stateExportTemplate
  );
  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    loadListCustomer();
    loadListProvince();
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateGetListCustomer;
    if (success) {
      setDataUsers(data.users);
      setPaging(data.paging);
      setLoading(false);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateGetListCustomer.isLoading]);
  /////////
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateImportFileCustomer;
    if (!isLoading) {
      if (success) {
        notifySuccess(
          `Nhập file thành công, có ${data?.successList.length} đơn thành công và ${data?.errorList.length} đơn lỗi`
        );
        loadListCustomer();
        // if (data?.successList.length > 0) {
        //   const fakeSuccessList = data?.successList || [];
        //   const fakeCalPrices = data?.result?.data || [];
        //   let convertSuccessList = [];
        //   // let a = Object.values(data?.customerAddress) as any;
        //   for (let i = 0; i < fakeSuccessList.length; i++) {
        //     let bill = {
        //       ...fakeSuccessList[i]?.data,
        //       ...fakeCalPrices[i]?.output,
        //       keyRow: geneUniqueKey(),
        //       customer_code: fakeSuccessList[i]?.data?.customer_code,
        //       customer_type_id: fakeSuccessList[i]?.data?.customer_type_id,
        //       district_id: fakeSuccessList[i]?.data?.district_id,
        //       province_id: fakeSuccessList[i]?.data?.province_id,
        //       ward_id: fakeSuccessList[i]?.data?.ward_id,
        //       address: fakeSuccessList[i]?.data?.address,
        //       full_name: fakeSuccessList[i]?.data?.full_name,
        //       email: fakeSuccessList[i]?.data?.email,
        //       phone: fakeSuccessList[i]?.data?.phone,
        //     };
        //     // delete bill.sender_group;
        //     // delete bill.receiver_group;
        //     // delete bill.volumne;
        //     // delete bill.other_fee;
        //     // delete bill.remote_area_fee;
        //     // delete bill.pricing_weight;
        //     convertSuccessList.push(bill);
        //   }

        //   setDataList(convertSuccessList);
        // }
        // }
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
  }, [stateImportFileCustomer.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateProvince;
    if (success) {
      setDataProvinces(data.provinces);
    }
  }, [stateProvince.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateUpdateOneUserSystem;
    if (success) {
      setCreateUpdateLoading(false);
      loadListCustomer();
      loadListCustomer(true);
      notifySuccess(message || "");
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneUserSystem.isLoading]);

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
                "modify-customer-info"
              ) {
                fakeRoles.push("modify-customer-info");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "add-customer-account"
              ) {
                fakeRoles.push("add-customer-account");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.title === "Disabled User", // Column configuration not to be checked
      name: record.title,
    }),
  };

  const loadListCustomer = (isDefault = false) => {
    const _paramsListCustomer = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(defaultFilter);
    } else {
      dispatch(
        getListCustomer({
          status: _paramsListCustomer.status,
          province: _paramsListCustomer.province,
          customerType: _paramsListCustomer.customerType,
          page: _paramsListCustomer.currentPage,
          limit: _paramsListCustomer.sizePage,
          search: _paramsListCustomer.q,
        })
      );
    }
  };

  const loadListProvince = () => {
    dispatch(getListProvince());
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
    if (e.key === "Enter") {
      setLoading(true);
      loadListCustomer();
    }
  };
  const onChangePaging = (
    page: number,
    pageSize: number,
    isDefault = false
  ) => {
    setLoading(true);
    setParamsFilter({
      ...paramsFilter,
      currentPage: page,
      sizePage: pageSize,
    });
    dispatch(
      getListCustomer({
        page: page,
        limit: pageSize,
        status: paramsFilter.status,
        province: paramsFilter.province,
        customerType: paramsFilter.customerType,
        search: paramsFilter.q,
      })
    );
  };

  const onFinish = () => {
    setVisible(false);
    loadListCustomer(true);
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */
  console.log(roles);

  const _renderSearch = () => {
    return (
      <div className="flex mb-4">
        <div className="w-full">
          <Row gutter={[10, 0]}>
            <Col span={7}>
              <Input
                onChange={(e) =>
                  setParamsFilter({
                    ...paramsFilter,
                    q: e.target.value,
                  })
                }
                style={{ borderRadius: "5px" }}
                allowClear
                placeholder="Mã khách hàng, tên KH, email, sđt"
                size="small"
                prefix={<SvgIconSearch />}
              />
            </Col>
            <Col span={5}>
              <Select
                allowClear
                showSearch
                onChange={(val) =>
                  setParamsFilter({
                    ...paramsFilter,
                    status: val,
                  })
                }
                size="large"
                suffixIcon={<img src={arrow} alt="" />}
                placeholder="Trạng thái"
                className="w-full"
                filterOption={(input: any, option: any) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input?.toLowerCase()) >= 0
                }
              >
                {dataOptionsStatus.map((e) => {
                  return (
                    <Select.Option value={e.value} key={e.value}>
                      {e.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                allowClear
                showSearch
                onChange={(val) =>
                  setParamsFilter({
                    ...paramsFilter,
                    customerType: val,
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
                    <Select.Option value={e.value} key={e.value}>
                      {e.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                allowClear
                showSearch
                onChange={(val) =>
                  setParamsFilter({
                    ...paramsFilter,
                    province: val,
                  })
                }
                size="large"
                suffixIcon={<img src={arrow} alt="" />}
                placeholder="Tỉnh thành"
                className="w-full"
                filterOption={(input: any, option: any) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input?.toLowerCase()) >= 0
                }
              >
                {dataProvinces.map((e) => {
                  return (
                    <Select.Option value={e.id} key={e.id}>
                      {e.province_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <ButtonTMS
                type="light"
                className="w-full"
                icon="search"
                fillIcon={colors.neutral_color_1_4}
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
  // const _renderTable = () => {
  //   return (
  //     <CustomTable
  //       rowKey={"id"}
  //       bordered
  //       isRowLight={true}
  //       paging={paging}
  //       columns={columnsData({
  //         btnChangeStatus,
  //         btnOpenModal: btnVisbleUpdate,
  //       })}
  //       dataSource={dataUsers}
  //       // rowSelection={{
  //       //   type: 'checkbox',
  //       //   ...rowSelection,
  //       // }}
  //       loading={stateGetListCustomer.isLoading}
  //       pagination={true}
  //       onChange={onChangeTable}
  //     />
  //   );
  // };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  const handleCloseOpenImport = () => {
    setOpenImport(false);
    setFileTest(undefined);
  };
  const onFinishImportFile = () => {
    if (!fileTest) {
      notifyWarning("Vui lòng chọn file");
    } else {
      let params = {
        file: fileTest,
        type: EXPORT_TEMPLATE_TYPE.TEMPLATE_CUSTOMER_BY_ADMIN,
      };
      dispatch(importFileCustomer(params));
    }
  };
  const importFileCallback = () => {
    setOpenImport(true);
  };
  const handleChangeFile = (e: any) => {
    setFileTest(e.target.files[0]);
  };
  const downFileCallback = () => {
    setIsLoading(true);
    dispatch(
      getExportTemplate({
        name: "MAU_FILE_TAO_KHACH_HANG",
        type: EXPORT_TEMPLATE_TYPE.TEMPLATE_CUSTOMER_BY_ADMIN,
      })
    );
  };
  return (
    <div className="w-full h-full pl-4 pr-4">
      <OverlaySpinner
        open={stateExportTemplate.isLoading}
        text="Đang tải file mẫu ..."
      />
      <OverlaySpinner
        open={stateImportFileCustomer.isLoading}
        text="Đang xử lý ..."
      />
      {visible && (
        <Modal
          visible={visible}
          centered
          maskClosable={false}
          title={isCreate ? "Thêm mới khách hàng" : "Chỉnh sửa khách hàng"}
          onCancel={() => setVisible(false)}
          footer={false}
          width="70%"
        >
          <UserSystem isCreate={isCreate} data={dataUser} onFinish={onFinish} />
        </Modal>
      )}
      {roles.find((x) => x === "add-customer-account") ? (
        <CustomBreadcrumb
          rootPath="Quản trị người dùng"
          currentPath="Danh sách tài khoản khách hàng"
          nameBtn={"Thêm tài khoản"}
          onClickButton={btnVisbleCreate}
        />
      ) : (
        <CustomBreadcrumb
          rootPath="Quản trị người dùng"
          currentPath="Danh sách tài khoản khách hàng"
        />
      )}

      <Modal
        visible={openImport}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <SvgExcel /> <span style={{ marginLeft: "8px" }}>Nhập file</span>
          </div>
        }
        maskClosable={false}
        className="modalEditSender"
        onCancel={() => handleCloseOpenImport()}
        footer={null}
        width={420}
        centered
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label
            htmlFor="importFile"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              background: "#259c58",
              height: "41px",
              width: "calc(50% - 4px)",
            }}
          >
            <SvgFile />
            <span style={{ marginLeft: "8px", color: "#fff" }}>Chọn file</span>
          </label>
          <input
            type="file"
            id="importFile"
            onChange={(e) => handleChangeFile(e)}
            style={{ display: "none" }}
          />

          <div
            onClick={() => onFinishImportFile()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              background: "#27aae1",
              height: "41px",
              width: "calc(50% - 4px)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Xác nhận
          </div>
        </div>
        {fileTest && <div>{fileTest.name}</div>}
      </Modal>
      <Spin spinning={loading}>
        <Col className="contentBody mt-3">
          {_renderSearch()}
          <Spin spinning={createUpdateLoading}>
            <ActionsHeader
              actions={[
                // {
                //   text: "Nhập kho không phát được",
                //   callback: () => handleOpenChangeStatusBills(3),
                //   svg: <SvgNhapKhoKhongPhatDuoc />,
                //   scale: true,
                // },
                // {
                //   text: "Xuất file",
                //   // callback: importFileCallback,
                //   svg: <SvgIconExportFile />,
                //   scale: true,
                // },
                {
                  text: "Nhập file",
                  callback: importFileCallback,
                  svg: <SvgIconExportFile />,
                  scale: true,
                },
                {
                  text: "Tải về template",
                  callback: downFileCallback,
                  svg: <SvgIconImportFile />,
                  scale: true,
                },
              ]}
            />
            <TableStyledAntd
              rowKey={"id"}
              bordered
              isRowLight={true}
              loading={false}
              pagination={false}
              columns={columnsData({
                btnChangeStatus,
                btnOpenModal: btnVisbleUpdate,
                roles: roles,
              })}
              dataSource={dataUsers}
              // rowSelection={{
              //   type: 'checkbox',
              //   ...rowSelection,
              // }}
              widthCol1="20%"
              widthCol2="20%"
              widthCol3="35%"
              widthCol4="15%"
              widthCol5="10%"
            />
            <PanigationAntStyled
              style={{ marginTop: "8px" }}
              current={paramsFilter.currentPage}
              pageSize={paramsFilter.sizePage}
              showSizeChanger
              onChange={onChangePaging}
              showTotal={() =>
                `Tổng ${stateGetListCustomer?.data?.paging?.totalPage||0} khách hàng `
              }
              total={stateGetListCustomer?.data?.paging?.totalPage}
            />
          </Spin>
        </Col>
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default CustomerList;
