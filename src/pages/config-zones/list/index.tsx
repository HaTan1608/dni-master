/* eslint-disable */
import { Form, Modal } from "antd";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import SubHeader from "src/components/subHeader/SubHeader";
import "./styles.less";
import arrow from "../../../assets/images/arrow.svg";
import DropdownSelectAntd from "src/components/inputComponentsStyled/DropdownSelectAntd";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { columnsZones, dataStatus } from "./data";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import { useCallback, useEffect, useState } from "react";
import AddZoneFooter from "../components/AddZoneFooter";
import AddZoneBody from "../components/AddZoneBody";
import { useDispatch, useSelector } from "react-redux";
import {
  createOneConfigZones,
  getListConfigZones,
  updateOneConfigZones,
} from "src/services/actions/config-zones.actions";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "src/components/notification";
import _debounce from "lodash/debounce";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconGroupBy from "src/assets/svg/SvgIconGroupBy";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import { useHistory } from "react-router-dom";

const ConfigZonesList = () => {
  const isMount = useIsMount();
  const [editOnlyStatus, setEditOnlyStatus] = useState(false);
  const [formZone] = Form.useForm();
  const [visibleTablePrice, setVisibleTablePrice] = useState(false);
  const [roles, setRoles] = useState<any>([]);
  const dispatch = useDispatch();
  const [typeModal, setTypeModal] = useState(1);
  const [status, setStatus] = useState("A");
  const [zones, setZones] = useState<any[]>([]);
  const [selectedZones, setSelectedZones] = useState<any>({});
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
  });
  const stateListConfigZones = useSelector(
    (e: AppState) => e.configZonesReducer.stateGetListConfigZones
  );

  const stateUpdateConfigZone = useSelector(
    (e: AppState) => e.configZonesReducer.stateUpdateOneConfigZones
  );

  const stateCreateOneZone = useSelector(
    (e: AppState) => e.configZonesReducer.stateCreateOneConfigZones
  );

  const createTablePrice = (data: any) => {
    let params = {
      name: data?.configZonesName,
      value: data?.configZonesValue,
      status: status,
    };
    if (typeModal === 1) {
      dispatch(createOneConfigZones(params));
    }
    if (typeModal === 2) {
      dispatch(updateOneConfigZones(selectedZones.zone_id, params));
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const getStatus = (e: any) => {
    setStatus(e);
  };

  const debounceDropDown = useCallback(
    _debounce(
      (nextValue: any) =>
        setParamsFilter({ ...paramsFilter, search: nextValue }),
      200
    ),
    []
  ); // eslint-disable-line react-hooks/exhaustive-deps
  const handleChangeSearchInput = (e: any) => {
    debounceDropDown(e);
  };

  const openModal = () => {
    setVisibleTablePrice(true);
    setTypeModal(1);
  };
  const exportFileCallback = () => {};

  const sortCallback = () => {};

  const importFileCallback = () => {};

  useEffect(() => {
    dispatch(getListConfigZones(paramsFilter));
  }, [paramsFilter]); // eslint-disable-line react-hooks/exhaustive-deps
  const pathName = useHistory().location.pathname.slice(1,14);
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
                "add-route"
              ) {
                fakeRoles.push("add-route");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-route"
              ) {
                fakeRoles.push("modify-route");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "config-zones"
              ) {
                fakeRoles.push("config-zones");
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
    const { data, success, error, isLoading } = stateListConfigZones;
    if (!isLoading) {
      if (success) {
        setZones(data.zonesERP);
      } else if (success === false || error) {
        return notifyError(`Có lỗi !`);
      }
    }
  }, [stateListConfigZones.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading } = stateCreateOneZone;
    if (!isLoading) {
      if (success) {
        setZones([...zones, data]);
        formZone.resetFields();

        setVisibleTablePrice(false);

        return notifySuccess(`Tạo tuyến thành công!`);
      } else if (success === false || error) {
        return notifyError(`Có lỗi !`);
      }
    }
  }, [stateCreateOneZone.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading } = stateUpdateConfigZone;
    if (!isLoading) {
      if (success) {
        if (editOnlyStatus) {
          let convertZone = selectedZones;
          convertZone.status = data.status;
          convertZone.updated = data.updated;

          setZones(
            zones.map((x) =>
              x.zone_id === selectedZones.zone_id ? convertZone : x
            )
          );
        } else {
          setZones(
            zones.map((x) => (x.zone_id === selectedZones.zone_id ? data : x))
          );
          setVisibleTablePrice(false);
        }
        formZone.resetFields();

        setEditOnlyStatus(false);

        return notifySuccess(`Cập nhật tuyến thành công!`);
      } else if (success === false || error) {
        return notifyError(`Có lỗi !`);
      }
    }
  }, [stateUpdateConfigZone.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeZoneStatus = (e: any) => {
    let params = {
      status: e.status === "A" ? "D" : "A",
      name: e.name,
      value: e.value,
    };
    setSelectedZones(e);
    setEditOnlyStatus(true);
    dispatch(updateOneConfigZones(e.zone_id, params));
  };

  const handleEditZone = (e: any) => {
    setTypeModal(2);
    setVisibleTablePrice(true);
    setStatus(e.status);
    setSelectedZones(e);
    formZone.setFieldsValue({
      configZonesValue: e.value,
      configZonesName: e.name,
    });
  };

  const handleCloseModalZone = () => {
    setVisibleTablePrice(false);
    setStatus("A");
    formZone.resetFields();
  };

  const handleReset = () => {
    setParamsFilter({
      search: "",
      status: undefined,
      page: 1,
      limit: 10,
    });
  };
  const onChangePaging = (page: number, pageSize: number) => {
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
        form={formZone}
        onFinish={createTablePrice}
        onFinishFailed={onFinishFailed}
      >
        <Modal
          visible={visibleTablePrice}
          footer={
            typeModal === 1 ? (
              <AddZoneFooter
                type={typeModal}
                status={status}
                onClickCallback={getStatus}
              />
            ) : (
              <AddZoneFooter
                type={typeModal}
                status={status}
                onClickCallback={getStatus}
              />
            )
          }
          title={typeModal === 1 ? "Tạo tuyến" : "Cập nhật tuyến"}
          className="modalAddStores"
          onCancel={() => handleCloseModalZone()}
          width={500}
        >
          <AddZoneBody type={typeModal} />
        </Modal>{" "}
      </Form>
      <SubHeader
        breadcrumb={[{ text: "Bảng giá" }, { text: "Danh mục tuyến" }]}
        button={roles.find((x:any) => x === "add-route") &&[
          {
            text: "Thêm tuyến",
            class: "mainBtn plusSvg",
            svg: <SvgIconPlus />,
            onClick: openModal,
          },
        ]}
      />
      <div className="contentBody">
        <div className="searchConfigZones">
          <InputNewStyled
            {...defaultStyles}
            placeholder="Mã địa chỉ, tên địa chỉ"
            suffixIcon={<SvgIconSearch />}
            suffixLeft="12px"
            padding="0px 12px 0px 36px"
            width="calc(55% - 24px)"
            onChange={(e: any) => handleChangeSearchInput(e)}
          />
          <DropdownSelectAntd
            {...defaultStyles}
            placeholder="TT Hoạt động"
            suffixIcon={<img src={arrow} alt="" />}
            padding="0"
            onChangeSelect={(e: any) =>
              setParamsFilter({ ...paramsFilter, status: e })
            }
            options={dataStatus}
            width="15%"
          />
          <ButtonStyled
            {...defaultStyles}
            text="Tìm kiếm"
            svg={<SvgIconSearch />}
            svgMargin="0 8px 0 0"
            width="15%"
            svgColor="#000"
          />
          <ButtonStyled
            {...defaultStyles}
            text="Làm mới"
            svg={<SvgIconRefresh />}
            svgColor="#000"
            svgMargin="0 8px 0 0"
            width="15%"
            onClick={handleReset}
          />
        </div>
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
          rowKey={"zone_id"}
          columns={columnsZones({ handleChangeZoneStatus, handleEditZone,roles:roles })}
          dataSource={zones}
          loading={stateListConfigZones.isLoading}
          pagination={false}
          bordered
          widthCol1="9%"
          widthCol2="13.5%"
          widthCol4="14%"
          widthCol5="14%"
          widthCol6="10%"
          widthCol7="5.5%"
          paddingItemBody="8px 16px"
        />
        <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilter.page}
          pageSize={paramsFilter.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() =>
            `Tổng ${stateListConfigZones?.data?.paging?.totalPage||0} tuyến `
          }
          total={stateListConfigZones?.data?.paging?.totalPage}
        />
      </div>
    </div>
  );
};

export default ConfigZonesList;
