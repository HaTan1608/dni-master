/* eslint-disable */
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import {
  defaultStyles,
  defaultMargin,
  defaultBtnStyles,
} from "src/components/inputComponentsStyled/defaultStyles";
import SubHeader from "src/components/subHeader/SubHeader";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import arrow from "../../../assets/images/arrow.svg";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { columnsDataZone,dataStatus } from "./dataZone";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import routerNames from "src/utils/data/routerName";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { useEffect, useState } from "react";
import "./styles.less";
import { Form, Modal,Spin } from "antd";
import axios from "axios";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { getListRole } from "src/services/actions/masterData.actions";
import { getRoutingById } from "src/services/actions/routing.actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "src/components/notification";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import {
  getListRoutingAreas,
  createOneRoutingArea,
  updateOneRoutingArea,
} from "src/services/actions/routingArea.action";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import colors from "src/utils/colors";
interface Params {
  id: any;
}

const RoutingEdit = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const paramsURL = useParams<Params>();
  const isMount = useIsMount();
  const [districts, setDistricts] = useState<any>([]);
  const [changeStatusArea, setChangeStatusArea] = useState(undefined);
  const [visibleModal, setVisibleModal] = useState(false);
  const [mainStatusTab, setMainStatusTab] = useState(1);
  const [params, setParams] = useState<any>({
    status: "A",
  });
  const [provinces, setProvinces] = useState<any>([]);
  const [typeModal, setTypeModal] = useState(1);
  const [areaRouting, setAreaRouting] = useState<any[]>([]);
  const [paramAreaRouting, setParamAreaRouting] = useState({
    routing_id: paramsURL.id,
    province_id: undefined,
    district_id: undefined,
    status: undefined,
    limit:10,
    page:1,
  });

  const [errorAddRow, setErrorAddRow] = useState({
    errorFrom: "",
    errorTo: "",
  });
  const [routing, setRouting] = useState<any>({
    routing_code: undefined,
    routing_name: undefined,
    status: undefined,
  });
  const [addRouteZone, setAddRouteZone] = useState({
    zone_province: undefined,
    zone_district: undefined,
  });
  const [zoneSearch, setZoneSearch] = useState({
    provinceName: undefined,
    districtName: undefined,
  });
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
    routing_id: paramsURL.id,
    user_id: undefined,
    role_id: undefined,
  });
  const [loading, setLoading] = useState<any>(true);
  const [loadingZone, setLoadingZone] = useState<any>(true);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
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
  const [roles, setRoles] = useState<any>([]);
  const pathName = useHistory().location.pathname.slice(1,8);
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
                "create-routing-area"
              ) {
                fakeRoles.push("create-routing-area");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-routing-area"
              ) {
                fakeRoles.push("update-routing-area");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  const { stateGetRoutingById } = useSelector(
    (state: AppState) => state.routingReducer
  );
  const { stateCreateOneRoutingArea } = useSelector(
    (state: AppState) => state.routingAreaReducer
  );
  const { stateGetListRoutingAreas } = useSelector(
    (state: AppState) => state.routingAreaReducer
  );
  const { stateUpdateOneRoutingArea } = useSelector(
    (state: AppState) => state.routingAreaReducer
  );
  useEffect(() => {
    dispatch(getRoutingById(paramsURL.id));
    dispatch(getListRole());
    getRoutingAreas();
  }, [paramsURL.id, paramsFilter]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getRoutingAreas();
  }, [paramAreaRouting]);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateGetRoutingById;
    if (!isLoading) {
      if (success) {
        setLoading(false)
        setLoadingZone(false)
        setRouting({
          routing_code:data?.routing.routing_code,
          routing_name:data?.routing.routing_name,
          status:data?.routing.status
        });
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateGetRoutingById.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  //life cycle list area
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } =
    stateGetListRoutingAreas;
    if (!isLoading) {
      if (success) {
        setLoadingZone(false)
        setAreaRouting(data.routingAreas);
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateGetListRoutingAreas.isLoading]);
  //create warehouse area
  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } =
    stateCreateOneRoutingArea;
    if (!isLoading) {
      if (success) {
        getRoutingAreas();
        setAddRouteZone({
          zone_province: undefined,
          zone_district: undefined,
        });
        return notifySuccess(`Tạo mới tuyến đường thành công!`);
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateOneRoutingArea.isLoading]);
  //life cycle update one areawarehouse
  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } =
    stateUpdateOneRoutingArea;
    if (!isLoading) {
      if (success) {
        getRoutingAreas();
        notifySuccess("Cập nhật tuyến đường thành công");
      } else if (success === false || error) {
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateOneRoutingArea.isLoading]);
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
    if (zoneSearch.provinceName) {
      const getProvinces = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/districts?province_id=${zoneSearch.provinceName}`,
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
  }, [addRouteZone.zone_province,zoneSearch.provinceName]);
  const getRoutingAreas = () => {
    dispatch(
      getListRoutingAreas({
        ...paramAreaRouting,
      })
    );
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
  const handleCloseModal = () => {
    setVisibleModal(false);
    setAddRouteZone({
      zone_province: undefined,
      zone_district: undefined,
    });
  };
  const handleChangeWareHouseZoneStatus = (e: any) => {
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    dispatch(updateOneRoutingArea(e.id, params));
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
    const _newParams = {
      routing_id: paramsURL.id,
      province_id: addRouteZone.zone_province,
      district_id: addRouteZone.zone_district,
      status: params.status,
    };
    dispatch(createOneRoutingArea(_newParams));
    setVisibleModal(false);
  };
  const handleChangeFromProvince = (e: any) => {
    setErrorAddRow({ ...errorAddRow, errorFrom: "" });
    setAddRouteZone({
      zone_province: e,
      zone_district: undefined,
    });
  };
  const handleReset =()=>{
    setLoadingZone(true)
    setParamAreaRouting({
      ...paramAreaRouting,
      routing_id: paramsURL.id,
      province_id: undefined,
      district_id: undefined,
      status: undefined,
    });
    setChangeStatusArea(undefined)
    setZoneSearch({
      provinceName: undefined,
      districtName: undefined,
    });
    setDistricts([])
  }
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
          title={typeModal === 1 ? "Thêm tài khoản" : "Thêm khu vực phục vụ"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width="40%"
          footer={
            typeModal === 2 ? (
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
        </Modal>
      </Form>
      <SubHeader
        breadcrumb={[
          { text: "Cấu hình" },
          { text: "Quản lý tuyến đường", link: routerNames.ROUTING },
          { text: "Chi tiết" },
        ]}
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
            label="Mã tuyến đường"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="calc(100%/3)"
            margin="0 16px 0 0"
            disabled
            value={routing.routing_code}
          />
          <InputNewStyled
            label="Tên tuyến đường"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="calc(100%/3)"
            disabled
            value={routing.routing_name}
            margin="0 16px 0 0"
          />
          <InputNewStyled
            label="Trạng thái hoạt động"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="calc(100%/3)"
            disabled
            value={routing.status === "A" ? "Đang hoạt động" : "Tạm dừng"}
            margin="0 16px 0 0"
          />
        </div>
      </div>
      </Spin>

      <div className="tableConfigZonesEdit">
        <div className="mainStatusTabs">
          {[
            {
              label: "Khu vực phục vụ",
              value: 1,
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
        <Spin spinning={loadingZone}>
        {mainStatusTab === 1 && (
          <div className="contentBody">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", width: "90%" }}>
                <DropdownSelectLabel
                  {...defaultStyles}
                  placeholder="Tỉnh thành"
                  suffixIcon={<img src={arrow} alt="" />}
                  padding="0 12px 0 16px"
                  iconSvgRight="24px"
                  showSearch
                  value={zoneSearch.provinceName}
                  onChangeSelect={(e: any) => {
                    setZoneSearch({
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
                  showSearch
                  value={zoneSearch.districtName}
                  onChangeSelect={(e: any) =>
                    setZoneSearch({
                      ...zoneSearch,
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
                  value={paramAreaRouting.status}
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
                    setLoadingZone(true)
                    setParamAreaRouting({
                      ...paramAreaRouting,
                      routing_id: paramsURL.id,
                      province_id: zoneSearch.provinceName,
                      district_id: zoneSearch.districtName,
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
                  onClick={(e: any) => handleReset()}
                >
                  <SvgIconRefresh fill="#b7bdc4" />
                  <span style={{ marginLeft: "8px" }}>Làm mới</span>
                </button>
              </div>
              {/* </div> */}
              {roles.find((x:any) => x === "create-routing-area") &&<div className="filterCustomer-button">
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
                roles:roles
              })}
              // rowSelection={rowSelection}
              dataSource={[...areaRouting]}
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
                  stateGetListRoutingAreas?.data?.paging.totalPage || 0
                } khu vực `
              }
              total={stateGetListRoutingAreas?.data?.paging.totalPage}
            />
          </div>
        )}
        </Spin>
      </div>
    </div>
  );
};

export default RoutingEdit;
