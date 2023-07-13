/* eslint-disable */
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import SubHeader from "src/components/subHeader/SubHeader";
import "./styles.less";
import arrow from "../../../assets/images/arrow.svg";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { columnsZones } from "./data";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import routerNames from "src/utils/data/routerName";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import colors from "src/utils/colors";
import FilterSearch from "../components/FilterSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import {
  getConfigZonesById,
  updateOneConfigDetails,
  getListConfigZonesDetails,
} from "src/services/actions/config-zones.actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "src/components/notification";
import { geneUniqueKey } from "src/utils/helpers/functions/textUtils";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
interface Params {
  id: any;
}

const ConfigZonesEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const paramsURL = useParams<Params>();
  const [roles, setRoles] = useState<any>([]);
  const isMount = useIsMount();
  const [cities, setCities] = useState<any[]>([]);
  const [optionsDistrictsFrom, setOptionsDistrictsFrom] = useState<any[]>([]);
  const [optionsDistrictsTo, setOptionsDistrictsTo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalDetails, setTotalDetails] = useState(0);
  const [totalPage, setTotalPage] = useState({
    total: 0,
    slice: 0,
  });
  const [addListDetails, setAddListDetails] = useState<any[]>([]);
  const [addListDetailsFiltered, setAddListDetailsFiltered] = useState<any[]>(
    []
  );

  const [editListDetails, setEditListDetails] = useState<any[]>([]);
  const [errorAddRow, setErrorAddRow] = useState({
    errorFrom: "",
    errorTo: "",
  });
  const [configZone, setConfigZone] = useState<any>({
    name: "",
    value: "",
    status: "A",
  });
  const [dataAddRoute, setDataAddRoute] = useState({
    fromProvince: undefined,
    fromDistrict: undefined,
    toProvince: undefined,
    toDistrict: undefined,
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
  const [listDetails, setListDetails] = useState<any[]>([]);

  const stateConfigZoneId = useSelector(
    (e: AppState) => e.configZonesReducer.stateGetConfigZonesById
  );

  const stateUpdateListDetails = useSelector(
    (e: AppState) => e.configZonesReducer.stateUpdateOneConfigZonesDetails
  );

  const stateGetListDetails = useSelector(
    (e: AppState) => e.configZonesReducer.stateGetListConfigZonesDetails
  );
  const pathName = useHistory().location.pathname.slice(1,13);
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
                "update-list-zone-details"
              ) {
                fakeRoles.push("update-list-zone-details");
              }
              // if (
              //   _dataUser.menu[i].children[j].children[k].funct_code ===
              //   "modify-route"
              // ) {
              //   fakeRoles.push("modify-route");
              // }
              // if (
              //   _dataUser.menu[i].children[j].children[k].funct_code ===
              //   "config-zones"
              // ) {
              //   fakeRoles.push("config-zones");
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
    dispatch(getConfigZonesById(paramsURL.id));
  }, [paramsURL.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getListConfigZonesDetails(paramsFilterDetails));
  }, [paramsFilterDetails, paramsURL.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isMount) return;
    const { success, error, isLoading, message } = stateUpdateListDetails;
    if (!isLoading) {
      if (success) {
        history.push("/config-zones");

        return notifySuccess(`Cập nhật tuyến thành công!`);
      } else if (success === false || error) {
        return notifyError(`Có lỗi!` + message);
      }
    }
  }, [stateUpdateListDetails.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateConfigZoneId;
    if (!isLoading) {
      if (success) {
        setConfigZone({
          status: data.zoneErp.status,
          name: data.zoneErp.name,
          value: data.zoneErp.value,
        });
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateConfigZoneId.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading } = stateGetListDetails;
    if (!isLoading) {
      if (success) {
        setLoading(true);
        const convert = async () => {
          let convertListDetails = [];
          for (var i = 0; i < data?.zoneDetailsERP?.length; i++) {
            let count = 0;
            for (var j = 0; j < editListDetails.length; j++) {
              if (
                data?.zoneDetailsERP[i].zone_detail_id ===
                editListDetails[j].zone_detail_id
              ) {
                let detail = editListDetails[j];
                detail.from_options_district[j] = await getDistrictOptions(
                  editListDetails[j].from_province_id
                );
                detail.to_options_district = await getDistrictOptions(
                  editListDetails[j].to_province_id
                );
                convertListDetails.push(detail);
                continue;
              } else {
                count++;
              }
            }
            if (count === editListDetails.length) {
              let detail = data?.zoneDetailsERP[i];
              detail.from_options_district = await getDistrictOptions(
                data?.zoneDetailsERP[i].from_province_id
              );
              detail.to_options_district = await getDistrictOptions(
                data?.zoneDetailsERP[i].to_province_id
              );
              convertListDetails.push(detail);
            }
          }
          setTotalDetails(Number(data?.paging?.totalPage));
          setTotalPage({
            total:
              data?.paging?.totalPage % 10 === 0
                ? data?.paging?.totalPage / 10
                : Number((data?.paging?.totalPage / 10) | 0) + 1,
            slice:
              Number(data?.paging?.totalPage) === 0
                ? 10
                : data?.paging?.totalPage % 10,
          });
          setListDetails(convertListDetails);
          setLoading(false);
        };
        convert();
      } else if (success === false || error) {
        return notifyError("Có lỗi" + stateGetListDetails.message);
      }
    }
  }, [stateGetListDetails.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

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
          setCities(fakeCities);
        }
      } catch (error) {}
    };
    getCities();
  }, []);

  useEffect(() => {
    if (dataAddRoute.fromProvince) {
      const getCities = async () => {
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

      getCities();
    }
  }, [dataAddRoute.fromProvince]);

  useEffect(() => {
    if (dataAddRoute.toProvince) {
      const getCities = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/districts?province_id=${dataAddRoute.toProvince}`,
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
            setOptionsDistrictsTo(fakeDistricts);
          }
        } catch (error) {}
      };

      getCities();
    }
  }, [dataAddRoute.toProvince]);

  const handleChangeFromProvince = (e: any) => {
    setErrorAddRow({ ...errorAddRow, errorFrom: "" });
    setDataAddRoute({
      ...dataAddRoute,
      fromProvince: e,
      fromDistrict: undefined,
    });
  };

  const handleChangeToProvince = (e: any) => {
    setErrorAddRow({ ...errorAddRow, errorTo: "" });

    setDataAddRoute({
      ...dataAddRoute,
      toProvince: e,
      toDistrict: undefined,
    });
  };

  const getDistrictOptions = async (cityId: any) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/${ROOT_VERSION}/districts?province_id=${cityId}`,
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
        return fakeDistricts;
      }
    } catch (error) {
      return undefined;
    }
  };

  const handleChangeFromProvinceDetail = async (data: any, id: any) => {
    let editRow = listDetails.find(
      (x) => x.zone_detail_id === id.zone_detail_id
    );
    if (editRow) {
      editRow.from_options_district = await getDistrictOptions(data);
      editRow.from_province_id = data;
      editRow.from_province_name = data;
      editRow.from_district_id = undefined;
      editRow.from_district_name = undefined;

      setListDetails(
        listDetails.map((x) =>
          x.zone_detail_id === id.zone_detail_id ? editRow : x
        )
      );
    }

    //
    let convertEditListDetails = [...editListDetails];
    let editRowParams = id;
    editRowParams.from_province_id = data;
    editRowParams.from_province_name = data;
    editRowParams.from_district_id = undefined;
    editRowParams.from_district_name = undefined;
    let findDetails = convertEditListDetails.find(
      (x) => x.zone_detail_id === editRowParams.zone_detail_id
    );
    if (findDetails) {
      setEditListDetails(
        editListDetails.map((x) =>
          x.zone_detail_id === editRowParams.zone_detail_id ? editRowParams : x
        )
      );
    } else {
      convertEditListDetails.push(editRowParams);
      setEditListDetails(convertEditListDetails);
    }
  };

  const handleChangeToProvinceDetail = async (data: any, id: any) => {
    let editRow = listDetails.find(
      (x) => x.zone_detail_id === id.zone_detail_id
    );
    if (editRow) {
      editRow.to_options_district = await getDistrictOptions(data);
      editRow.to_province_id = data;
      editRow.to_province_name = data;
      editRow.to_district_id = undefined;
      editRow.to_district_name = undefined;

      setListDetails(
        listDetails.map((x) =>
          x.zone_detail_id === id.zone_detail_id ? editRow : x
        )
      );
    }
    //
    let convertEditListDetails = [...editListDetails];
    let editRowParams = id;
    editRowParams.to_province_id = data;
    editRowParams.to_province_name = data;
    editRowParams.to_district_id = undefined;
    editRowParams.to_district_name = undefined;
    let findDetails = convertEditListDetails.find(
      (x) => x.zone_detail_id === editRowParams.zone_detail_id
    );
    if (findDetails) {
      setEditListDetails(
        editListDetails.map((x) =>
          x.zone_detail_id === editRowParams.zone_detail_id ? editRowParams : x
        )
      );
    } else {
      convertEditListDetails.push(editRowParams);
      setEditListDetails(convertEditListDetails);
    }
  };

  const handleChangeFromDistrictDetail = async (data: any, id: any) => {
    let editRow = listDetails.find(
      (x) => x.zone_detail_id === id.zone_detail_id
    );
    if (editRow) {
      editRow.from_district_id = data;
      editRow.from_district_name = data;
    }

    setListDetails(
      listDetails.map((x) =>
        x.zone_detail_id === id.zone_detail_id ? editRow : x
      )
    );

    //

    let convertEditListDetails = [...editListDetails];
    let editRowParams = id;
    editRowParams.from_district_id = data;
    editRowParams.from_district_name = data;
    let findDetails = convertEditListDetails.find(
      (x) => x.zone_detail_id === editRowParams.zone_detail_id
    );
    if (findDetails) {
      setEditListDetails(
        editListDetails.map((x) =>
          x.zone_detail_id === editRowParams.zone_detail_id ? editRowParams : x
        )
      );
    } else {
      convertEditListDetails.push(editRowParams);
      setEditListDetails(convertEditListDetails);
    }
  };

  const handleChangeToDistrictDetail = async (data: any, id: any) => {
    let editRow = listDetails.find(
      (x) => x.zone_detail_id === id.zone_detail_id
    );
    if (editRow) {
      editRow.to_district_id = data;
      editRow.to_district_name = data;

      setListDetails(
        listDetails.map((x) =>
          x.zone_detail_id === id.zone_detail_id ? editRow : x
        )
      );
    }
    //

    let convertEditListDetails = [...editListDetails];
    let editRowParams = id;
    editRowParams.to_district_id = data;
    editRowParams.to_district_name = data;
    let findDetails = convertEditListDetails.find(
      (x) => x.zone_detail_id === editRowParams.zone_detail_id
    );
    if (findDetails) {
      setEditListDetails(
        editListDetails.map((x) =>
          x.zone_detail_id === editRowParams.zone_detail_id ? editRowParams : x
        )
      );
    } else {
      convertEditListDetails.push(editRowParams);
      setEditListDetails(convertEditListDetails);
    }
  };

  const handleChangeStatusDetail = async (data: any, id: any) => {
    let editRow = listDetails.find(
      (x) => x.zone_detail_id === id.zone_detail_id
    );
    editRow.status = data ? "A" : "D";
    setListDetails(
      listDetails.map((x) =>
        x.zone_detail_id === id.zone_detail_id ? editRow : x
      )
    );
    //

    let convertEditListDetails = [...editListDetails];
    let editRowParams = id;
    editRowParams.status = data ? "A" : "D";
    let findDetails = convertEditListDetails.find(
      (x) => x.zone_detail_id === editRowParams.zone_detail_id
    );
    if (findDetails) {
      setEditListDetails(
        editListDetails.map((x) =>
          x.zone_detail_id === editRowParams.zone_detail_id ? editRowParams : x
        )
      );
    } else {
      convertEditListDetails.push(editRowParams);
      setEditListDetails(convertEditListDetails);
    }
  };
  const addRow = async () => {
    if (dataAddRoute.fromProvince && dataAddRoute.toProvince) {
      let listDetailsFake = [...addListDetails];
      let params = {
        zone_detail_id: geneUniqueKey(),
        status: "A",
        from_province_id: dataAddRoute.fromProvince,
        from_province_name: dataAddRoute.fromProvince,
        from_options_district: await getDistrictOptions(
          dataAddRoute.fromProvince
        ),
        from_district_id: dataAddRoute.fromDistrict,
        from_district_name: dataAddRoute.fromDistrict,
        to_province_id: dataAddRoute.toProvince,
        to_province_name: dataAddRoute.toProvince,
        to_options_district: await getDistrictOptions(dataAddRoute.toProvince),
        to_district_id: dataAddRoute.toDistrict,
        to_district_name: dataAddRoute.toDistrict,
      };
      listDetailsFake.push(params);
      setAddListDetails(listDetailsFake);
      setDataAddRoute({
        fromProvince: undefined,
        fromDistrict: undefined,
        toProvince: undefined,
        toDistrict: undefined,
      });
    } else {
      setErrorAddRow({
        errorFrom: !dataAddRoute.fromProvince
          ? "Vui lòng chọn tỉnh thành đi"
          : "",
        errorTo: !dataAddRoute.toProvince ? "Vui lòng chọn tỉnh thành đến" : "",
      });
    }
  };

  const handleSubmitEdit = () => {
    let convertList = [];
    let totalList = [...addListDetails, ...editListDetails] as any[];
    for (var i = 0; i < totalList.length; i++) {
      for (var j = 0; j < editListDetails.length; j++) {
        if (totalList[i] === editListDetails[j]) {
          totalList[i] = editListDetails[j];
          continue;
        }
      }
    }
    totalList = Array.from(new Set(totalList));
    for (var k = 0; k < totalList.length; k++) {
      convertList.push({
        zone_detail_id: Number(totalList[k].zone_detail_id)
          ? Number(totalList[k].zone_detail_id)
          : 0,
        status: totalList[k].status,
        from_province_id: totalList[k].from_province_id,
        from_province_name: cities.find(
          (x) => x.value === totalList[k].from_province_id
        )?.label,
        to_province_id: totalList[k].to_province_id,
        to_province_name: cities.find(
          (x) => x.value === totalList[k].to_province_id
        )?.label,
        from_district_id: totalList[k].from_district_id
          ? totalList[k].from_district_id
          : null,
        from_district_name: totalList[k].from_district_id
          ? totalList[k].from_options_district.find(
              (x: any) => x.value === totalList[k].from_district_id
            )?.label
          : null,
        to_district_id: totalList[k].to_district_id
          ? totalList[k].to_district_id
          : null,
        to_district_name: totalList[k].to_district_id
          ? totalList[k].to_options_district.find(
              (x: any) => x.value === totalList[k].to_district_id
            )?.label
          : null,
      });
    }
    let params = {
      zone_id: paramsURL.id,
      listDetail: convertList,
    };
    dispatch(updateOneConfigDetails(params));
  };

  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilterDetails({
      ...paramsFilterDetails,
      page: page,
      limit: pageSize,
    });
  };

  const getFilterCallback = (e: any) => {
    setParamsFilterDetails({
      page: 1,
      limit: 10,
      fromProvince: e.fromProvince,
      fromDistrict: e.fromDistrict,
      toProvince: e.toProvince,
      toDistrict: e.toDistrict,
      status: e.status,
      zone_id: paramsURL.id,
    });
  };

  useEffect(() => {
    let convertFilterAddRow = [...addListDetails];
    if (paramsFilterDetails.fromProvince) {
      convertFilterAddRow = convertFilterAddRow.filter(
        (x) => x.from_province_id === paramsFilterDetails.fromProvince
      );
    }
    if (paramsFilterDetails.fromDistrict) {
      convertFilterAddRow = convertFilterAddRow.filter(
        (x) => x.from_district_id === paramsFilterDetails.fromDistrict
      );
    }
    if (paramsFilterDetails.toProvince) {
      convertFilterAddRow = convertFilterAddRow.filter(
        (x) => x.to_province_id === paramsFilterDetails.toProvince
      );
    }
    if (paramsFilterDetails.toDistrict) {
      convertFilterAddRow = convertFilterAddRow.filter(
        (x) => x.to_district_id === paramsFilterDetails.toDistrict
      );
    }
    if (paramsFilterDetails.status) {
      convertFilterAddRow = convertFilterAddRow.filter(
        (x) => x.status === paramsFilterDetails.status
      );
    }
    setAddListDetailsFiltered(convertFilterAddRow);
    return () => {
      setAddListDetailsFiltered([]);
    };
  }, [paramsFilterDetails, addListDetails]);
  return (
    <div className="mainPages">
      <SubHeader
        breadcrumb={[
          { text: "Bảng giá" },
          { text: "Danh mục tuyến", link: routerNames.CONFIG_ZONES },
          { text: "Chi tiết" },
        ]}
        button={roles.find((x:any) => x === "update-list-zone-details") &&[
          {
            text: "Lưu",
            class: "mainBtn plusSvg",
            svg: <SvgIconStorage />,
            onClick: handleSubmitEdit,
          },
        ]}
      />
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
            label="Mã tuyến"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="15%"
            margin="0 16px 0 0"
            disabled
            value={configZone.value}
          />
          <InputNewStyled
            label="Tên tuyến"
            {...defaultStyles}
            labelFontSize="12px"
            padding="0px 12px 0px 12px"
            background="rgb(243,243,243)"
            width="15%"
            disabled
            value={configZone.name}
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
            value={configZone.status === "A" ? "Đang hoạt động" : "Tạm dừng"}
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
              label="Từ tỉnh:"
              {...defaultStyles}
              placeholder="Chọn tỉnh thành"
              suffixIcon={<img src={arrow} alt="" />}
              onChangeSelect={(e: any) => handleChangeFromProvince(e)}
              options={cities}
              value={dataAddRoute.fromProvince}
              width="100%"
              margin=" 0"
              showSearch
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
            label="Từ quận huyện:"
            {...defaultStyles}
            placeholder="Chọn quận huyện"
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) =>
              setDataAddRoute({ ...dataAddRoute, fromDistrict: e })
            }
            options={optionsDistrictsFrom}
            value={dataAddRoute.fromDistrict}
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
              label="Đến tỉnh:"
              {...defaultStyles}
              placeholder="Chọn tỉnh thành"
              suffixIcon={<img src={arrow} alt="" />}
              onChangeSelect={(e: any) => handleChangeToProvince(e)}
              options={cities}
              value={dataAddRoute.toProvince}
              width="100%"
              margin="0"
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
          <DropdownSelectLabel
            label="Đến quận huyện:"
            {...defaultStyles}
            placeholder="Chọn quận huyện"
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) =>
              setDataAddRoute({ ...dataAddRoute, toDistrict: e })
            }
            options={optionsDistrictsTo}
            value={dataAddRoute.toDistrict}
            width="15%"
            margin="0 16px 0 0"
            showSearch
            optionFilterProp="label"
            filterOption={(input: any, option: any) =>
              option.label.includes(input)
            }
          />
          <ButtonStyled
            {...defaultStyles}
            text="Thêm"
            svg={<SvgIconPlus />}
            svgMargin="0 8px 0 0"
            width="120px"
            svgColor="#fff"
            color="#fff"
            mainBackground={colors.accent_color_5_2}
            onClick={addRow}
          />
        </div>
      </div>

      {/*<ActionsHeader
          actions={[
            { text: "Xuất file", svg: <SvgIconExportFile />, scale: true },
            { text: "Nhập file", svg: <SvgIconImportFile />, scale: true },
            { text: "Sắp xếp", svg: <SvgIconGroupBy />, scale: true },
          ]}
        />*/}
      <div className="tableConfigZonesEdit">
        <h4>Danh sách tuyến</h4>
        <FilterSearch getFilterCallback={getFilterCallback} />
        <TableStyledAntd
          rowKey={"zone_detail_id"}
          columns={columnsZones({
            cities,
            handleChangeFromProvinceDetail,
            handleChangeToProvinceDetail,
            handleChangeToDistrictDetail,
            handleChangeFromDistrictDetail,
            handleChangeStatusDetail,
            roles:roles,
          })}
          dataSource={
            totalPage.total >= paramsFilterDetails.page && totalPage.total > 0
              ? listDetails.concat(addListDetailsFiltered).slice(0, 10)
              : addListDetailsFiltered.slice(
                  (paramsFilterDetails.page - totalPage.total - 1) * 10 +
                    (10 - totalPage.slice),
                  (paramsFilterDetails.page - totalPage.total) * 10 +
                    (10 - totalPage.slice)
                )
          }
          loading={loading}
          pagination={false}
          bordered
          widthCol1="5%"
          widthCol2="22.5%"
          widthCol3="22.5%"
          widthCol4="22.5%"
          widthCol5="22.5%"
          widthCol6="5%"
          paddingItemBody="8px 16px"
        />
        <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilterDetails.page}
          pageSize={paramsFilterDetails.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() =>
            `Tổng ${totalDetails + addListDetailsFiltered.length} tuyến `
          }
          total={totalDetails + addListDetailsFiltered.length}
        />
      </div>
    </div>
  );
};

export default ConfigZonesEdit;
