/* eslint-disable */
import { Col, Form, Modal, Row, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import {
  defaultBtnStyles, defaultMargin, defaultStyles
} from "src/components/inputComponentsStyled/defaultStyles";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { notifyError, notifySuccess } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { getListRole } from "src/services/actions/masterData.actions";
import { getListUserSystem } from "src/services/actions/user.actions";
import { getWarehouseById } from "src/services/actions/warehouse.actions";
import {
  createOneWarehouseArea, getListWarehouseAreas, updateOneWarehouseArea
} from "src/services/actions/warehouseAreas.actions";
import {
  createOneWarehouseUser, getListWareHouseUsers, updateOneWarehouseUser
} from "src/services/actions/wareHouseUsers.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import arrow from "../../../assets/images/arrow.svg";
import { columnsData, dataStatus } from "./data";
import { columnsDataZone } from "./dataZone";
import "./styles.less";
interface Params {
  id: any;
}

const WareHouseEdit = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const paramsURL = useParams<Params>();
  const isMount = useIsMount();
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [changeSearch, setChangeSearch] = useState("");
  const [changeRole, setChangeRole] = useState(undefined);
  const [changeStatus, setChangeStatus] = useState(undefined);
  const [changeStatusArea, setChangeStatusArea] = useState(undefined);
  const [visibleModal, setVisibleModal] = useState(false);
  const [mainStatusTab, setMainStatusTab] = useState(1);
  const [searchUser, setSearchUser] = useState("");
  const [params, setParams] = useState<any>({
    status: "A",
  });
  const [dataRoles, setDataRoles] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [typeModal, setTypeModal] = useState(1);
  const [userWarehouse, setUserWarehouse] = useState<any[]>([]);
  const [areaWarehouse, setAreaWarehouse] = useState<any[]>([]);
  const [paramAreaWarehouse, setParamAreaWarehouse] = useState({
    warehouse_id: paramsURL.id,
    province_id: undefined,
    district_id: undefined,
    status: undefined,
  });
  const [loading, setLoading] = useState<any>(true);
  const [loadingUser, setLoadingUser] = useState<any>(false);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  const [errorAddRow, setErrorAddRow] = useState({
    errorFrom: "",
    errorTo: "",
  });
  const [wareHouseItem, setWareHouseItem] = useState<any>({
    ws_code: "",
    ws_name: "",
    ward_name: "",
    province_name: "",
    district_name: "",
    phone: "",
    email: "",
    address: "",
    contact_name: "",
  });
  const [dataAddRoute, setDataAddRoute] = useState({
    province: undefined,
    district: undefined,
    ward: undefined,
  });
  const [addRouteZone, setAddRouteZone] = useState({
    zone_province: undefined,
    zone_district: undefined,
  });
  const [changeZoneSearch, setChangeZoneSearch] = useState({
    provinceName: undefined,
    districtName: undefined,
  });
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
    warehouse_id: paramsURL.id,
    user_id: undefined,
    role_id: undefined,
  });
  const [_paramsListUser, setParamsListFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
  });
  const [paramsFilterDetails, setParamsFilterDetails] = useState<any>({
    limit: 10,
    page: 1,
    fromProvince: undefined,
    fromDistrict: undefined,
    toProvince: undefined,
    toDistrict: undefined,
    status: undefined,
    zone_id: Number(paramsURL.id),
  });
  const [listUsers, setListUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any>([]);
  const pathName = useHistory().location.pathname.slice(1,10); 
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
  console.log(roles);
  
  const { stateGetWarehouseById } = useSelector(
    (state: AppState) => state.warehouseReducer
  );
  const { stateGetListUserSystem } = useSelector(
    (state: AppState) => state.userReducer
  );
  const { stateCreateOneWarehouseUser } = useSelector(
    (state: AppState) => state.wareHouseUsersReducer
  );
  const { stateGetListWarehouseUser } = useSelector(
    (state: AppState) => state.wareHouseUsersReducer
  );
  const { stateUpdateOneWarehouseUser } = useSelector(
    (state: AppState) => state.wareHouseUsersReducer
  );
  const { stateRole } = useSelector(
    (state: AppState) => state.masterDataReducer
  );
  const { stateCreateOneWarehouseArea } = useSelector(
    (state: AppState) => state.wareHouseAreasReducer
  );
  const { stateGetListWarehouseAreas } = useSelector(
    (state: AppState) => state.wareHouseAreasReducer
  );
  const { stateUpdateOneWarehouseArea } = useSelector(
    (state: AppState) => state.wareHouseAreasReducer
  );
  useEffect(() => {
    dispatch(getWarehouseById(paramsURL.id));
    loadListWarehouseUsers();
    loadListUser();
    dispatch(getListRole());
    getWarehouseAreas();
  }, [paramsURL.id, paramsFilter]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getWarehouseAreas();
  }, [paramAreaWarehouse]);
  useEffect(() => {
    loadListUser();
  }, [_paramsListUser]);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateGetWarehouseById;
    if (!isLoading) {
      if (success) {
        setWareHouseItem({
          ws_code: data.warehouse.ws_code,
          ws_name: data.warehouse.ws_name,
          ward_name: data.warehouse.ward_name,
          province_name: data.warehouse.province_name,
          district_name: data.warehouse.district_name,
          phone: data.warehouse.phone,
          email: data.warehouse.email,
          address: data.warehouse.address,
          contact_name: data.warehouse.contact_name,
          status: data.warehouse.status,
        });
        setDataAddRoute({
          province: data.warehouse.province_name,
          district: data.warehouse.district_name,
          ward: data.warehouse.ward_name,
        });
        setLoading(false)
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateGetWarehouseById.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  //life cycle list user
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateGetListUserSystem;
    if (!isLoading) {
      if (success) {
        setListUsers(data.users);
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateGetListUserSystem.isLoading]);
  //life cycle list area
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateGetListWarehouseAreas;
    if (!isLoading) {
      if (success) {
        setLoadingUser(false)
        setAreaWarehouse(data.warehouseAreas);
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateGetListWarehouseAreas.isLoading]);
  //create userwarehouse
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateCreateOneWarehouseUser;
    if (!isLoading) {
      if (success) {
        setVisibleModal(false);
        setCreateUpdateLoading(false)
        setLoadingUser(false)
        loadListWarehouseUsers();
        return notifySuccess(`Tạo mới người dùng thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateOneWarehouseUser.isLoading]);
  //create warehouse area
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateCreateOneWarehouseArea;
    if (!isLoading) {
      if (success) {
        setLoadingUser(false)
        setCreateUpdateLoading(false)
        getWarehouseAreas();
        setAddRouteZone({
          zone_province: undefined,
          zone_district: undefined,
        });
        return notifySuccess(`Tạo mới vùng thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateOneWarehouseArea.isLoading]);
  //life cycle get list userwarehouse
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateGetListWarehouseUser;
    if (!isLoading) {
      if (success) {
        setLoadingUser(false)
        setUserWarehouse(data.warehouseUsers);
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateGetListWarehouseUser.isLoading]);
  //life cycle update one userwarehouse
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateUpdateOneWarehouseUser;
    if (!isLoading) {
      if (success) {
        setLoadingUser(false)
        loadListWarehouseUsers();
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateOneWarehouseUser.isLoading]);
  //life cycle update one areawarehouse
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
      stateUpdateOneWarehouseArea;
    if (!isLoading) {
      if (success) {
        setLoadingUser(false)
        getWarehouseAreas();
        notifySuccess("Cập nhật thành công");
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateOneWarehouseArea.isLoading]);
  //life cycle
  useEffect(() => {
    const { data, message, success, isLoading, error } = stateRole;
    if (success) {
      let dataRole = data?.roles.map((item: any) => {
        return {
          label: item.role_name,
          value: item.id,
        };
      });
      setDataRoles(dataRole);
    }
  }, [stateRole.isLoading]);
  useEffect(() => {
    const getProvinces = async () => {
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
    getProvinces();
  }, []);
  //get list warehouserUser
  const loadListWarehouseUsers = (isDefault = false) => {
    if (isDefault) {
      setParamsFilter(paramsFilter);
    }
    dispatch(
      getListWareHouseUsers({
        search: paramsFilter.search,
        page: paramsFilter.page,
        limit: paramsFilter.limit,
        status: paramsFilter.status,
        warehouse_id: paramsFilter.warehouse_id,
        user_id: paramsFilter.user_id,
        role_id: paramsFilter.role_id,
      })
    );
  };
  useEffect(() => {
    if (addRouteZone.zone_province) {
      const getProvinces = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/districts?province_id=${addRouteZone.zone_province}`,
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
            setDistricts(fakeDistricts);
          }
        } catch (error) {}
      };
      getProvinces();
    }
    if (changeZoneSearch.provinceName) {
      const getProvinces = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/districts?province_id=${changeZoneSearch.provinceName}`,
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
            setDistricts(fakeDistricts);
          }
        } catch (error) {}
      };
      getProvinces();
    }
  }, [addRouteZone.zone_province, changeZoneSearch.provinceName]);
  //list user hệ thống
  const loadListUser = () => {
    dispatch(
      getListUserSystem({
        status: _paramsListUser.status,
        page: _paramsListUser.page,
        limit: _paramsListUser.limit,
        search: _paramsListUser.search,
      })
    );
  };
  const getWarehouseAreas = () => {
    dispatch(
      getListWarehouseAreas({
        ...paramAreaWarehouse,
      })
    );
  };
  //list role
  const handleChangeFromProvince = (e: any) => {
    setErrorAddRow({ ...errorAddRow, errorFrom: "" });
    setAddRouteZone({
      zone_province: e,
      zone_district: undefined,
    });
  };

  const handleChangeMainStatus = (value: any) => {
    setMainStatusTab(value);
  };
  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilterDetails({
      ...paramsFilterDetails,
      page: page,
      limit: pageSize,
    });
  };

  const handleChangeWareHouseStatus = (e: any) => {
    setLoadingUser(true)
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    dispatch(updateOneWarehouseUser(e.id, params));
  };
  const handleEditWareHouse = (value: any) => {
    setVisibleModal(true);
    setTypeModal(2);
    form.setFieldsValue({
      ws_code: value.ws_code,
      ws_name: value.ws_name,
      ward_name: value.ward_name,
      province_name: value.province_name,
      district_name: value.district_name,
      phone: value.phone,
      email: value.email,
      address: value.address,
      contact_name: value.contact_name,
    });
  };
  const handleCloseModal = () => {
    setVisibleModal(false);
    setAddRouteZone({
      zone_province: undefined,
      zone_district: undefined,
    });
  };
  const selectedRow = (e: any) => {
    setCreateUpdateLoading(true)
    dispatch(
      createOneWarehouseUser({
        user_id: e.id,
        warehouse_id: paramsURL.id,
        status: e.status,
      })
    );
  };
  const handleChangeWareHouseZoneStatus = (e: any) => {
    setLoadingUser(true)
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    dispatch(updateOneWarehouseArea(e.id, params));
  };
  const handleChangeDistrict = (e: any) => {
    setErrorAddRow({ ...errorAddRow, errorFrom: "" });
    setAddRouteZone({
      ...addRouteZone,
      zone_district: e,
    });
  };
  const rowSelection = {};
  const createAreaWarehouse = () => {
   
    if (!addRouteZone.zone_province) {
      return notifyError(`Vui lòng chon thành phố!`);
    }
    if (!addRouteZone.zone_district) {
      return notifyError(`Vui lòng chon quận huyện!`);
    }
     setCreateUpdateLoading(true)
    const _newParams = {
      warehouse_id: paramsURL.id,
      province_id: addRouteZone.zone_province,
      district_id: addRouteZone.zone_district,
      status: params.status,
    };
    dispatch(createOneWarehouseArea(_newParams));
    setVisibleModal(false);
  };
  const handleReset = () => {
    setLoadingUser(true)
    setParamsFilter({
      search: "",
      status: undefined,
      page: 1,
      limit: 10,
      warehouse_id: paramsURL.id,
      user_id: undefined,
      role_id: undefined,
    });
    setChangeStatus(undefined);
    setChangeRole(undefined);
    searchForm.resetFields();
  };
  return (
    <div className="mainPages">
      <Form
        name="myForm"
        layout="vertical"
        form={form}
        onFinish={createAreaWarehouse}
      >
        <Modal
          visible={visibleModal}
          maskClosable={false}
          centered
          title={typeModal == 1 ? "Thêm tài khoản" : "Thêm khu vực phục vụ"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width="45%"
          footer={
            typeModal == 2 ? (
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
                  className="addStores__footer__btn editBtn"
                >
                  <>
                    <SvgIconStorage /> Lưu
                  </>
                </button>
              </div>
            ) : (
              false
            )
          }
        >
          <Spin spinning={createUpdateLoading}>
          {typeModal === 1 && (
            <div id="userArea">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <InputNewStyled
                  {...defaultStyles}
                  labelFontSize="12px"
                  padding="0px 12px 0px 12px"
                  background="rgb(243,243,243)"
                  width="90%"
                  margin="0 16px 0 0"
                  placeholder="Nhập tên, SĐT, email"
                  onChange={(e: any) => {
                    setSearchUser(e.trim());
                  }}
                />
                <ButtonStyled
                  {...defaultBtnStyles}
                  text="Tìm kiếm"
                  svg={<SvgIconSearch />}
                  svgColor="#414141"
                  svgScale="0.9"
                  svgMargin="0 4px 0 0"
                  width="140px"
                  mainBackground={colors.neutral_color_1_5}
                  color="#414141"
                  onClick={() => {
                    setParamsListFilter({
                      ..._paramsListUser,
                      search: searchUser,
                    });
                  }}
                />
              </div>
              <div id="fixHeight">
                {listUsers.map((item: any) => {
                  return (
                    <div
                      id="userAreaItem"
                      className="userAreaItem"
                      style={{ fontSize: "17px" }}
                      onClick={(e) => {
                        selectedRow(item);
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "auto",
                            marginRight: "16px",
                            color: "#27AAE1",
                          }}
                        >
                          {item?.id}
                        </div>
                        <div style={{ fontWeight: "600" }}>
                          {item?.full_name}
                        </div>
                      </div>
                      <Row gutter={8}>
                        <Col span={8}>
                          <span>SĐT: </span>
                          <span style={{ fontWeight: "600" }}>
                            {item?.phone}
                          </span>
                        </Col>
                        <Col span={10}>
                          <span>Email: </span>
                          <span style={{ fontWeight: "600" }}>
                            {item?.email}
                          </span>
                        </Col>
                        <Col span={6}>
                          <span>Chức vụ: </span>
                          <span style={{ fontWeight: "600" }}>
                            {item?.role_name}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {typeModal === 2 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DropdownSelectLabel
                label="Tỉnh thành:"
                {...defaultStyles}
                placeholder="Chọn tỉnh thành"
                suffixIcon={<img src={arrow} alt="" />}
                onChangeSelect={(e: any) => handleChangeFromProvince(e)}
                options={provinces}
                value={addRouteZone.zone_province}
                width="100%"
                margin=" 0"
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
                onChangeSelect={(e: any) => handleChangeDistrict(e)}
                options={districts}
                value={addRouteZone.zone_district}
                width="100%"
                margin=" 0 0 0px 10px"
                showSearch
                optionFilterProp="label"
                filterOption={(input: any, option: any) =>
                  option.label.includes(input)
                }
              />
            </div>
          )}
          </Spin>
        </Modal>
      </Form>
      <SubHeader
        breadcrumb={[
          { text: "Cấu hình" },
          { text: "Quản lý kho", link: routerNames.WAREHOUSE },
          { text: "Chi tiết" },
        ]}
        // button={[
        //   {
        //     text: "Lưu",
        //     class: "mainBtn plusSvg",
        //     svg: <SvgIconStorage />,
        //   },
        // ]}
      />
      <Spin spinning={loading}>
      <div className="searchConfigZonesEdit">
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <InputNewStyled
            label="Mã kho"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="15%"
            margin="0 16px 0 0"
            disabled
            value={wareHouseItem.ws_code}
          />
          <InputNewStyled
            label="Tên kho"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="15%"
            disabled
            value={wareHouseItem.ws_name}
            margin="0 16px 0 0"
          />
          <InputNewStyled
            label="Trạng thái hoạt động"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="15%"
            disabled
            value={wareHouseItem.status === "A" ? "Đang hoạt động" : "Tạm dừng"}
            margin="0 16px 0 0"
          />
          <InputNewStyled
            label="Họ tên"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="15%"
            margin="0 16px 0 0"
            disabled
            value={wareHouseItem.contact_name}
          />
          <InputNewStyled
            label="Số điện thoại"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="15%"
            disabled
            value={wareHouseItem.phone}
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
            value={wareHouseItem.email}
            margin="0 16px 0 0"
          />
        </div>
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",

            width: "100%",
          }}
        >
          <div
            style={{ width: "15%", position: "relative", marginRight: "16px" }}
          >
            <DropdownSelectLabel
              label="Tỉnh thành:"
              {...defaultStyles}
              placeholder="Chọn tỉnh thành"
              suffixIcon={<img src={arrow} alt="" />}
              onChangeSelect={(e: any) => handleChangeFromProvince(e)}
              options={cities}
              value={dataAddRoute.province}
              width="100%"
              margin=" 0"
              showSearch
              disabled
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
            {errorAddRow.errorFrom.length > 0 && (
              <div className="addRowError">{errorAddRow.errorFrom}</div>
            )}
          </div>
          <DropdownSelectLabel
            label="Quận huyện:"
            {...defaultStyles}
            placeholder="Chọn quận huyện"
            disabled
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) =>
              setDataAddRoute({ ...dataAddRoute, district: e })
            }
            options={districts}
            value={dataAddRoute.district}
            width="15%"
            margin="0 16px 0 0"
            showSearch
            optionFilterProp="label"
            filterOption={(input: any, option: any) =>
              option.label.includes(input)
            }
          />
          <div
            style={{ width: "15%", position: "relative", marginRight: "16px" }}
          >
            <DropdownSelectLabel
              label="Phường xã:"
              {...defaultStyles}
              placeholder="Chọn phường xã"
              suffixIcon={<img src={arrow} alt="" />}
              options={cities}
              value={dataAddRoute.ward}
              width="100%"
              margin="0"
              disabled
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
            {errorAddRow.errorTo.length > 0 && (
              <div className="addRowError">{errorAddRow.errorTo}</div>
            )}
          </div>
          <InputNewStyled
            label="Địa chỉ"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="47%"
            disabled
            value={wareHouseItem.address}
            margin="0 16px 0 0"
          />
        </div>
      </div>
      <div className="tableConfigZonesEdit">
        <div className="mainStatusTabs">
          {[
            {
              label: "Nhân viên kho",
              value: 1,
              count: 0,
            },
            {
              label: "Khu vực phục vụ",
              value: 2,
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
        <Spin spinning={loadingUser}>
        {mainStatusTab == 1 && (
          <div className="contentBody">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form
                form={searchForm}
                id="searchForm"
                style={{ width: "100%", marginTop: "16px" }}
                initialValues={{ search: "" }}
                onFinish={(e) => setChangeSearch(e.search.trim())}
              >
                <div style={{ display: "flex", width: "80%" }}>
                  <FormInputAntd
                    {...defaultStyles}
                    placeholder="Nhập họ tên"
                    name="search"
                    suffixIcon={<SvgIconSearch />}
                    suffixLeft="12px"
                    padding="0px 12px 0px 36px"
                    width="calc((100%/5) - 16px)"
                    margin=" 0 0 24px 10px"
                  />
                  <DropdownSelectLabel
                    {...defaultStyles}
                    placeholder="Vai trò"
                    suffixIcon={<img src={arrow} alt="" />}
                    padding="10px 0 0"
                    iconSvgRight="24px"
                    margin=" 0 0 24px 10px"
                    options={dataRoles}
                    value={changeRole}
                    onChangeSelect={(e: any) => setChangeRole(e)}
                    width="calc((100%/5) - 16px)"
                  />
                  <DropdownSelectLabel
                    {...defaultStyles}
                    placeholder="TT Hoạt động"
                    suffixIcon={<img src={arrow} alt="" />}
                    padding="0 12px 0 0"
                    iconSvgRight="24px"
                    margin=" 0 0 24px 10px"
                    value={changeStatus}
                    onChangeSelect={(e: any) => setChangeStatus(e)}
                    options={dataStatus}
                    width="calc((100%/5) - 16px)"
                  />
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "41px",
                      width: "120px",
                      margin: " 0 0 24px 10px",
                      borderRadius: "5px",
                      border: "1px solid #BFC4C9",
                    }}
                    onClick={(e) => {
                      setLoadingUser(true)
                      setParamsFilter({
                        ...paramsFilter,
                        search: changeSearch,
                        status: changeStatus,
                        role_id: changeRole,
                      });
                    }}
                  >
                    <SvgIconSearch />
                    <span style={{ marginLeft: "8px" }}>Tìm kiếm</span>
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "41px",
                      width: "120px",
                      margin: " 0 0 24px 10px",
                      borderRadius: "5px",
                      border: "1px solid #BFC4C9",
                      marginLeft: "16px",
                    }}
                    onClick={(e) => handleReset()}
                  >
                    <SvgIconRefresh fill="#b7bdc4" />
                    <span style={{ marginLeft: "8px" }}>Làm mới</span>
                  </button>
                </div>
              </Form>
              {roles.find((x:any) => x === "create-warehouse-user") &&(<div className="filterCustomer-button">
                <ButtonStyled
                  {...defaultBtnStyles}
                  text="Thêm mới"
                  svg={<SvgIconPlus />}
                  svgColor="#fff"
                  svgScale="0.9"
                  svgMargin="0 4px 0 0"
                  width="140px"
                  mainBackground={colors.accent_color_5_2}
                  color="#fff"
                  onClick={() => {
                    setVisibleModal(true);
                    setTypeModal(1);
                  }}
                />
              </div>)}
            </div>
            <TableStyledAntd
              rowKey={"id"}
              columns={columnsData({
                handleEditWareHouse,
                handleChangeWareHouseStatus,
                roles
              })}
              rowSelection={rowSelection}
              dataSource={[...userWarehouse]}
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
              current={paramsFilterDetails.page}
              pageSize={paramsFilterDetails.limit}
              showSizeChanger
              onChange={onChangePaging}
              showTotal={() =>
                `Tổng ${stateGetListWarehouseUser.data ? stateGetListWarehouseUser?.data?.paging.totalPage : 0} tài khoản `
              }
              total={stateGetListWarehouseUser?.data?.paging.totalPage}
            />
          </div>
        )}
        {mainStatusTab == 2 && (
          <div className="contentBody">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", width: "90%" }}>
                <DropdownSelectLabel
                  {...defaultStyles}
                  placeholder="Tỉnh thành"
                  suffixIcon={<img src={arrow} alt="" />}
                  padding="0 12px 0 16px"
                  iconSvgRight="24px"
                  value={changeZoneSearch.provinceName}
                  onChangeSelect={(e: any) => {
                    setChangeZoneSearch({
                      provinceName: e,
                      districtName: undefined,
                    });
                  }}
                  options={provinces}
                  width="calc((100%/5) - 16px)"
                />
                <DropdownSelectLabel
                  {...defaultStyles}
                  {...defaultMargin}
                  placeholder="Quận huyện"
                  suffixIcon={<img src={arrow} alt="" />}
                  margin=" 0 0 24px 10px"
                  padding="0 12px 0 0"
                  iconSvgRight="24px"
                  value={changeZoneSearch.districtName}
                  onChangeSelect={(e: any) =>
                    setChangeZoneSearch({
                      ...changeZoneSearch,
                      districtName: e,
                    })
                  }
                  options={districts}
                  width="calc((100%/5) - 16px)"
                />
                <DropdownSelectLabel
                  {...defaultStyles}
                  placeholder="TT Hoạt động"
                  suffixIcon={<img src={arrow} alt="" />}
                  margin=" 0 0 24px 10px"
                  padding="0 12px 0 0"
                  iconSvgRight="24px"
                  value={paramAreaWarehouse.status}
                  onChangeSelect={(e: any) => setChangeStatusArea(e)}
                  options={dataStatus}
                  width="calc(14% - 16px)"
                />
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "41px",
                    width: "120px",
                    margin: " 0 0 24px 10px",
                    borderRadius: "5px",
                    border: "1px solid #BFC4C9",
                  }}
                  onClick={(e) => {
                    setLoadingUser(true)
                    setParamAreaWarehouse({
                      warehouse_id: paramsURL.id,
                      province_id: changeZoneSearch.provinceName,
                      district_id: changeZoneSearch.districtName,
                      status: changeStatusArea,
                    });
                  }}
                >
                  <SvgIconSearch />
                  <span style={{ marginLeft: "8px" }}>Tìm kiếm</span>
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "41px",
                    width: "120px",
                    margin: " 0 0 24px 0",
                    borderRadius: "5px",
                    border: "1px solid #BFC4C9",
                    marginLeft: "16px",
                  }}
                  onClick={(e) => {
                    setLoadingUser(true)
                    setParamAreaWarehouse({
                      warehouse_id: paramsURL.id,
                      province_id: undefined,
                      district_id: undefined,
                      status: undefined,
                    });
                    setDistricts([]);
                    setChangeZoneSearch({
                      provinceName: undefined,
                      districtName: undefined,
                    });
                  }}
                >
                  <SvgIconRefresh fill="#b7bdc4" />
                  <span style={{ marginLeft: "8px" }}>Làm mới</span>
                </button>
              </div>
              {/* </div> */}
{              roles.find((x:any) => x === "create-warehouse-area")&&<div className="filterCustomer-button">
                <ButtonStyled
                  {...defaultBtnStyles}
                  text="Thêm mới"
                  svg={<SvgIconPlus />}
                  svgColor="#fff"
                  svgScale="0.9"
                  svgMargin="0 4px 0 0"
                  width="140px"
                  mainBackground={colors.accent_color_5_2}
                  color="#fff"
                  onClick={() => {
                    setVisibleModal(true);
                    setTypeModal(2);
                  }}
                />
              </div>}
            </div>
            <TableStyledAntd
              rowKey={"id"}
              columns={columnsDataZone({
                handleChangeWareHouseZoneStatus,
                roles
              })}
              // rowSelection={rowSelection}
              dataSource={[...areaWarehouse]}
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
              current={paramsFilterDetails.page}
              pageSize={paramsFilterDetails.limit}
              showSizeChanger
              onChange={onChangePaging}
              showTotal={() =>
                `Tổng ${
                  stateGetListWarehouseAreas?.data?.paging.totalPage || 0
                } khu vực `
              }
              total={stateGetListWarehouseAreas?.data?.paging.totalPage}
            />
          </div>
        )} 
        </Spin>
      </div>
      </Spin>
    </div>
  );
};

export default WareHouseEdit;
