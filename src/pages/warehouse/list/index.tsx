/* eslint-disable */
import { Form, Modal, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { notifyError, notifySuccess } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import {
  createOneWarehouse, getListWarehouse, updateOneWarehouse
} from "src/services/actions/warehouse.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import arrow from "../../../assets/images/arrow.svg";
import { columnsData, dataStatus } from "./data";
const WareHouse = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [typeModal, setTypeModal] = useState(1);
  const [idWareHouse, setIdWareHouse] = useState<any>();
  const [form] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeStatus, setChangeStatus] = useState(undefined);
  const [changeSearch, setChangeSearch] = useState("");
  const [params, setParams] = useState<any>({
    status: undefined,
  });
  const [searchForm] = Form.useForm();
  const [dataAddRoute, setDataAddRoute] = useState({
    fromProvince: undefined,
    fromProvinceName: undefined,
    fromDistrict: undefined,
    fromDistrictName: undefined,
    fromWard: undefined,
    fromWardName: undefined,
  });
  const [warehouses, setWarehouses] = useState<any>([]);
  // const [paging, setPaging] = useState<object>({});
  const [provinces, setProvinces] = useState<any>([]);
  const [optionsDistrictsFrom, setOptionsDistrictsFrom] = useState<any[]>([]);
  const [optionsWardsFrom, setOptionsWardsFrom] = useState<any[]>([]);
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
  });
  const [errorAddRow, setErrorAddRow] = useState({
    errorFrom: "",
    errorTo: "",
  });
  const [loading, setLoading] = useState<any>(true);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  // const [listDetails, setListDetails] = useState<any[]>([]);
  const [roles, setRoles] = useState<any>([]);
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
                "add-warehouse"
              ) {
                fakeRoles.push("add-warehouse");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-warehouse"
              ) {
                fakeRoles.push("modify-warehouse");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "add-warehouse"
              ) {
                fakeRoles.push("add-warehouse");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-warehouse-area"
              ) {
                fakeRoles.push("update-warehouse-area");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-warehouse-user"
              ) {
                fakeRoles.push("update-warehouse-user");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "create-warehouse-area"
              ) {
                fakeRoles.push("create-warehouse-area");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "create-warehouse-user"
              ) {
                fakeRoles.push("create-warehouse-user");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  const { stateGetListWarehouse } = useSelector(
    (state: AppState) => state.warehouseReducer
  );
  const { stateCreateOneWarehouse } = useSelector(
    (state: AppState) => state.warehouseReducer
  );
  const { stateUpdateOneWarehouse } = useSelector(
    (state: AppState) => state.warehouseReducer
  );
  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListWarehouse();
  }, [paramsFilter]);
  useEffect(() => {
    if (isMount) return;
    const { success, data } = stateGetListWarehouse;
    if (success) {
      setLoading(false)
      setWarehouses(data.warehouses);
    }
  }, [stateGetListWarehouse.isLoading]);
  //create
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, isLoading, data } =
      stateCreateOneWarehouse;
    if (!isLoading) {
      if (success) {
        setWarehouses([data,...warehouses]);
        form.resetFields();
        setCreateUpdateLoading(false)
        setVisibleModal(false);

        return notifySuccess(`Tạo kho thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateOneWarehouse.isLoading]);
  //update
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, isLoading } =
      stateUpdateOneWarehouse;
    if (!isLoading) {
      if (success) {
        loadListWarehouse();
        form.resetFields();
        setCreateUpdateLoading(false)
        setVisibleModal(false);

        return notifySuccess(`Cập nhật kho thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateOneWarehouse.isLoading]);
  //province
  useEffect(() => {
    const getCities = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data) {
          let cities = data?.data?.provinces;
          let fakeCities = [];
          for (var i = 0; i < cities.length; i++) {
            fakeCities.push({
              label: cities[i]?.province_name,
              value: cities[i]?.id,
            });
          }
          setProvinces(fakeCities);
        }
      } catch (error) {}
    };
    getCities();
  }, []);
  //district
  useEffect(() => {
    if (dataAddRoute.fromProvince) {
      const getProvinces = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/districts?province_id=${dataAddRoute.fromProvince}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (data) {
            let districts = data?.data?.districts;
            let fakeDistricts = [];
            for (var i = 0; i < districts.length; i++) {
              fakeDistricts.push({
                label: districts[i]?.district_name,
                value: districts[i]?.id,
              });
            }
            setOptionsDistrictsFrom(fakeDistricts);
          }
        } catch (error) {}
      };

      getProvinces();
    }
  }, [dataAddRoute.fromProvince]);
  //ward
  useEffect(() => {
    if (dataAddRoute.fromDistrict) {
      const getWards = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/wards?district_id=${dataAddRoute.fromDistrict}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (data) {
            let fakeWards = [];
            for (var i = 0; i < data?.data?.wards.length; i++) {
              fakeWards.push({
                label: data?.data?.wards[i].ward_name,
                value: data?.data?.wards[i].id,
              });
            }
            setOptionsWardsFrom(fakeWards);
          }
        } catch (error) {}
      };

      getWards();
    }
  }, [dataAddRoute.fromDistrict]);
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */
  // const loadListProvince = () => {
  //   dispatch(getListProvince({}));
  // }
  const loadListWarehouse = (isDefault = false) => {
    // const _paramsListWarehouse = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(paramsFilter);
    }
    dispatch(
      getListWarehouse({
        search: paramsFilter.search,
        page: paramsFilter.page,
        limit: paramsFilter.limit,
        status: paramsFilter.status,
      })
    );
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */
  const openModal = () => {
    setVisibleModal(true);
    setTypeModal(1);
  };
  const handleChangeWareHouseStatus = (e: any) => {
    setLoading(true)
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    dispatch(updateOneWarehouse(e.id, params));
  };
  const handleEditWareHouse = (value: any) => {
    setVisibleModal(true);
    setIdWareHouse(value.id);
    setTypeModal(2);
    setParams({ status: value.status });
    form.setFieldsValue({
      ws_code: value.ws_code,
      ws_name: value.ws_name,
      ward_name: value.ward_name,
      phone: value.phone,
      email: value.email,
      address: value.address,
      contact_name: value.contact_name,
    });
    setDataAddRoute({
      fromProvince: value.province_id,
      fromDistrict: value.district_id,
      fromWard: value.ward_id,
      fromProvinceName: value.province_name,
      fromDistrictName: value.district_name,
      fromWardName: value.ward_name,
    });
  };
  const exportFileCallback = () => {};
  const handleCloseModal = () => {
    setVisibleModal(false);
    form.resetFields();
    setDataAddRoute({
      fromProvince: undefined,
      fromDistrict: undefined,
      fromWard: undefined,
      fromProvinceName: undefined,
      fromDistrictName: undefined,
      fromWardName: undefined,
    });
  };
  const sortCallback = () => {};
  const createWareHouse = (values: any) => {
    setCreateUpdateLoading(true)
    const _newParams = {
      address: values.address,
      contact_name: values.contact_name,
      email: values.email,
      phone: values.phone,
      status: params.status,
      ws_code: values.ws_code,
      ws_name: values.ws_name,
      province_id: dataAddRoute.fromProvince,
      district_id: dataAddRoute.fromDistrict,
      ward_id: dataAddRoute.fromWard,
      province_name: dataAddRoute.fromProvinceName,
      district_name: dataAddRoute.fromDistrictName,
      ward_name: dataAddRoute.fromWardName,
    };
    if (typeModal === 1) {
      dispatch(createOneWarehouse(_newParams));
    }
    if (typeModal === 2) {
      dispatch(updateOneWarehouse(idWareHouse, _newParams));
    }
  };
  const importFileCallback = () => {};
  const handleReset = () => {
    setLoading(true)
    setParamsFilter({
      search: "",
      status: undefined,
      page: 1,
      limit: 10,
    });
    setChangeStatus(undefined)
    setChangeSearch('')
    searchForm.resetFields();
  };
  const handleChangeFromProvince = (e: any, value: any) => {
    setErrorAddRow({ ...errorAddRow, errorFrom: "" });
    setDataAddRoute({
      fromProvince: e,
      fromDistrict: undefined,
      fromWard: undefined,
      fromProvinceName: value.label,
      fromDistrictName: undefined,
      fromWardName: undefined,
    });
    form.setFieldsValue({
      district_name: undefined,
      ward_name: undefined,
    });
  };
  const handleChangeDistrict = (e: any, value: any) => {
    setErrorAddRow({ ...errorAddRow, errorFrom: "" });
    setDataAddRoute({
      ...dataAddRoute,
      fromDistrict: e,
      fromDistrictName: value.label,
      fromWard: undefined,
    });
  };
  const handleChangeWard = (e: any, value: any) => {
    setErrorAddRow({ ...errorAddRow, errorFrom: "" });
    setDataAddRoute({
      ...dataAddRoute,
      fromWard: e,
      fromWardName: value.label,
    });
  };
  const handleSearch=()=>{
    setLoading(true)
    setParamsFilter({
      ...paramsFilter,
      status: changeStatus,
      search: changeSearch,
    });
    // console.log(changeSearch)
  }
  const rowSelection = {
    // onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.title === 'Disabled User', // Column configuration not to be checked
    //   name: record.title,
    // }),
  };
  const onChangePaging = (page: number, pageSize: number) => {
    setLoading(true)
    setParamsFilter({
      ...paramsFilter,

      page: page,
      limit: pageSize,
    });
  };
  return (
    <div className="mainPages">
      <Form
        name="myForm"
        layout="vertical"
        form={form}
        onFinish={createWareHouse}
        // onFinishFailed={onFinishFailed}
      >
        <Modal
          visible={visibleModal}
          maskClosable={false}
          centered
          footer={
            <div className="addStores__footer">
              <div style={{ display: "flex", alignItems: "center" }}>
                Trạng thái hoạt động
                <div className="statusBtn">
                  <span
                    className={params.status === "A" ? "mainBtn" : ""}
                    onClick={() => setParams({ ...params, status: "A" })}
                  >
                    Bật
                  </span>
                  <span
                    className={params.status !== "A" ? "mainBtn" : ""}
                    onClick={() => setParams({ ...params, status: "D" })}
                  >
                    Tắt
                  </span>
                </div>
              </div>
              <button
                type="submit"
                form="myForm"
                className={
                  typeModal === 1
                    ? "addStores__footer__btn addBtn"
                    : "addStores__footer__btn editBtn"
                }
              >
                {typeModal === 1 ? (
                  <>
                    <SvgIconPlus /> Thêm
                  </>
                ) : (
                  <>
                    <SvgIconStorage /> Lưu
                  </>
                )}
              </button>
            </div>
          }
          title={typeModal === 1 ? "Thêm kho mới" : "Thông tin kho"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width={"40%"}
        >
          <Spin spinning={createUpdateLoading}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="ws_code"
              style={{ width: "calc((100% - 8px) /3)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Mã kho"
                placeholder="Nhập mã kho"
                width="100%"
              />
            </Form.Item>
            <Form.Item
              name="ws_name"
              style={{ width: "calc((100% - 10px)*2 /3)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Tên kho"
                placeholder="Nhập tên kho"
                width="100%"
              />
            </Form.Item>
          </div>
          <div>
            <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
              Người liên hệ
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                name="contact_name"
                style={{ width: "calc((100% - 20px) /3)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Họ tên"
                  placeholder="Nhập họ tên"
                  width="100%"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                style={{ width: "calc((100% - 20px) /3)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  width="100%"
                />
              </Form.Item>
              <Form.Item
                name="email"
                style={{ width: "calc((100% - 20px) /3)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Email"
                  placeholder="Nhập email"
                  width="100%"
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
              Địa chỉ
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DropdownSelectLabel
                label="Tỉnh thành:"
                {...defaultStyles}
                placeholder="Chọn tỉnh thành"
                suffixIcon={<img src={arrow} alt="" />}
                onChangeSelect={(e: any, value: any) =>
                  handleChangeFromProvince(e, value)
                }
                options={provinces}
                value={dataAddRoute.fromProvince}
                width="100%"
                margin="10px 0 0"
                showSearch
                optionFilterProp="label"
                filterOption={(input: any, option: any) =>
                  option.label.includes(input)
                }
              />
              <DropdownSelectLabel
                label="Quận huyện:"
                {...defaultStyles}
                placeholder="Chọn quận huyện"
                suffixIcon={<img src={arrow} alt="" />}
                onChangeSelect={(e: any, value: any) =>
                  handleChangeDistrict(e, value)
                }
                options={optionsDistrictsFrom}
                value={dataAddRoute.fromDistrict}
                width="100%"
                margin="10px"
                showSearch
                optionFilterProp="label"
                filterOption={(input: any, option: any) =>
                  option.label.includes(input)
                }
              />
              <DropdownSelectLabel
                label="Phường xã:"
                {...defaultStyles}
                placeholder="Chọn phường xã"
                suffixIcon={<img src={arrow} alt="" />}
                onChangeSelect={(e: any, value: any) =>
                  handleChangeWard(e, value)
                }
                options={optionsWardsFrom}
                value={dataAddRoute.fromWard}
                width="100%"
                margin="10px 0 0"
                showSearch
                optionFilterProp="label"
                filterOption={(input: any, option: any) =>
                  option.label.includes(input)
                }
              />
            </div>
          </div>

          <Form.Item
            name="address"
            style={{ marginTop: "15px", justifyContent: "space-between" }}
          >
            <InputNewStyled
              {...defaultStyles}
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              width="100%"
            />
          </Form.Item>
          </Spin>
        </Modal>
      </Form>
      <SubHeader
        breadcrumb={[{ text: "Cấu hình" }, { text: "Quản lý kho" }]}
        button={roles.find((x:any) => x === "add-warehouse") &&[
          {
            text: "Thêm kho",
            class: "mainBtn plusSvg",
            svg: <SvgIconPlus />,
            onClick: openModal,
          },
        ]}
      />
      <Spin spinning={loading}>
      <div className="contentBody">
        <Form
          form={searchForm}
          id="searchForm"
          style={{ width: "100%", marginTop: "16px" }}
          initialValues={{ search: "" }}
        >
          <div className="searchConfigZones">
            <FormInputAntd
              {...defaultStyles}
              name="search"
              label="Nội dung tìm kiếm"
              placeholder="Nhập mã kho, tên kho"
              suffixIcon={<SvgIconSearch />}
              suffixLeft="12px"
              padding="0px 12px 0px 36px"
              width="calc((100%/5)*2 - 16px)"
              onChange={(e:any)=>setChangeSearch(e.trim())}
            />

            {/* <Form.Item style={{ width: "calc((100%/5) - 16px)" }}>
            <div>Ngày đi</div>
            <DatePicker.RangePicker
              style={{
                ...defaultStyles,
                padding: "0px 12px 0px 36px",
                // suffixLeft:"12px",
                height: "41px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #BFC4C9",
              }}
            />
          </Form.Item> */}
            <FormSelectAntd
              {...defaultStyles}
              name="status"
              label="Trạng thái"
              placeholder="TT Hoạt động"
              suffixIcon={<img src={arrow} alt="" />}
              padding="0"
              onChange={(e: any) => setChangeStatus(e)}
              options={dataStatus}
              width="calc((100%/5))"
              margin="-20px 0 0 0"
            />
            {/* <Form.Item style={{ width: "calc((100%/5) - 16px)" }}>
            <div>Người liên hệ</div>
            <DropdownSelectAntd
              {...defaultStyles}
              placeholder="Chọn người liên hệ"
              suffixIcon={<img src={arrow} alt="" />}
              padding="0"
              // onChangeSelect={(e: any) =>
              //   setParamsFilter({ ...paramsFilter, status: e })
              // }
              options={dataStatus}
              width="100%"
            />
          </Form.Item> */}

            <ButtonStyled
              {...defaultStyles}
              text="Tìm kiếm"
              svg={<SvgIconSearch />}
              svgMargin="0 8px 0 0"
              width="calc((100%/5))"
              // ={colors.accent_color_1_4}
              onClick={handleSearch}
              svgColor="#000"
            />

            <ButtonStyled
              {...defaultStyles}
              text="Làm mới"
              svg={<SvgIconRefresh />}
              svgColor="#000"
              svgMargin="0 8px 0 0"
              width="calc((100%/5))"
              onClick={handleReset}
            />
          </div>
        </Form>
        <ActionsHeader
          // actions={[
          //   {
          //     text: "Xuất file",
          //     callback: exportFileCallback,
          //     svg: <SvgIconExportFile />,
          //     scale: true,
          //   },
          //   {
          //     text: "Nhập file",
          //     callback: importFileCallback,
          //     svg: <SvgIconImportFile />,
          //     scale: true,
          //   },

          //   {
          //     text: "Sắp xếp",
          //     callback: sortCallback,
          //     svg: <SvgIconGroupBy />,
          //     scale: true,
          //   },
          // ]}
        />
        <TableStyledAntd
          rowKey={"id"}
          columns={columnsData({
            handleEditWareHouse,
            handleChangeWareHouseStatus,
            roles:roles,
          })}
          rowSelection={rowSelection}
          dataSource={warehouses}
          loading={false}
          pagination={false}
          bordered
          widthCol1="5%"
          widthCol2="10%"
          widthCol3="25%"
          widthCol4="25%"
          widthCol5="25%"
          widthCol6="10%"
          paddingItemBody="8px 16px"
        />
        <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilter.page}
          pageSize={paramsFilter.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() =>
            `Tổng ${stateGetListWarehouse.data ? stateGetListWarehouse?.data?.paging.totalPage : 0} kho `
          }
          total={stateGetListWarehouse?.data?.paging.totalPage}
        />
      </div>
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default WareHouse;
