/* eslint-disable */
import { Form, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import { getListSupplier } from "src/services/actions/supplier.actions";
import {
  createVerhicles,
  gitListVerhicles,
  updateVerhicles,
} from "src/services/actions/vehicles.action";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import arrow from "../../assets/images/arrow.svg";
import { dataStatus } from "../config-zones/list/data";
import { columnsSoCont } from "./data";
// import { columnsSoCont, defaultData,defaultFilter } from "./data";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import { notifyError, notifySuccess } from "src/components/notification";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useHistory } from "react-router-dom";
const SoContList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [changeSearch, setChangeSearch] = useState("");
  const [changeStatus, setChangeStatus] = useState(undefined);
  const [params, setParams] = useState<any>({
    status: "A",
    vehicle_type: "1",
  });
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
    vehicle_type: 1, //1 xe cont, 2//xe tải
  });
  const [vehicles, setDataVerhicles] = useState<any>([]);
  const [idVehicle, setIdVehicle] = useState<any>();
  const [loading, setLoading] = useState<any>(true);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
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
                "add-cont"
              ) {
                fakeRoles.push("add-cont");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-cont"
              ) {
                fakeRoles.push("modify-cont");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  const { stateListVerhicles } = useSelector(
    (state: AppState) => state.verhiclesReducer
  );
  const { stateCreateVerhicle } = useSelector(
    (state: AppState) => state.verhiclesReducer
  );
  const { stateUpdateVehicle } = useSelector(
    (state: AppState) => state.verhiclesReducer
  );
  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListCont();
    dispatch(getListSupplier({}));
  }, [paramsFilter]);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateListVerhicles;
    if (success) {
      setDataVerhicles(data.vehicles);
      setLoading(false);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateListVerhicles.isLoading]);
  const loadListCont = (isDefault = false) => {
    if (isDefault) {
      setParamsFilter(paramsFilter);
    }
    dispatch(
      gitListVerhicles({
        status: paramsFilter.status,
        page: paramsFilter.page,
        limit: paramsFilter.limit,
        search: paramsFilter.search,
        vehicle_type: paramsFilter.vehicle_type,
      })
    );
  };
  //update
  useEffect(() => {
    if (isMount) return;
    const { success, error, isLoading, message } = stateUpdateVehicle;
    if (!isLoading) {
      if (success) {
        loadListCont();
        form.resetFields();
        setCreateUpdateLoading(false);
        setVisibleModal(false);

        return notifySuccess(`Cập nhật thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false);
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateVehicle.isLoading]);
  //create
  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading, message } = stateCreateVerhicle;
    if (!isLoading) {
      if (success) {
        setDataVerhicles([data, ...vehicles]);
        form.resetFields();
        setCreateUpdateLoading(false);
        setVisibleModal(false);

        return notifySuccess(`Tạo tuyến thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false);
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateVerhicle.isLoading]);
  /**************************** END **************************/
  const createTaoXe = (values: any) => {
    const _newParams = {
      ...values,
      ...params,
    };
    setCreateUpdateLoading(true);
    // console.log(_newParams)
    if (typeModal === 1) {
      dispatch(createVerhicles(_newParams));
    }
    if (typeModal === 2) {
      dispatch(updateVerhicles(idVehicle, _newParams));
    }
  };

  const onFinishFailed = (values: any) => {};

  const handleCloseModal = () => {
    setVisibleModal(false);
    form.resetFields();
  };

  const openModal = () => {
    setVisibleModal(true);
    setTypeModal(1);
  };
  const handleChangeSearchInput = (e: any) => {
    setChangeSearch(e.trim());
  };

  const handleReset = () => {
    setLoading(true);
    setParamsFilter({
      search: "",
      status: undefined,
      page: 1,
      limit: 10,
      vehicle_type: 1,
    });
    searchForm.resetFields();
    setChangeSearch("");
    setChangeStatus(undefined);
  };
  const onChangePaging = (page: number, pageSize: number) => {
    setLoading(true);
    setParamsFilter({
      ...paramsFilter,

      page: page,
      limit: pageSize,
    });
  };
  const importFileCallback = () => {};

  const exportFileCallback = () => {};

  const sortCallback = () => {};

  const handleEditDoiXe = (value: any) => {
    setVisibleModal(true);
    setIdVehicle(value.id);
    setTypeModal(2);
    setParams({ ...params, status: value.status });

    form.setFieldsValue({
      vehicle_name: value.vehicle_name,
      vehicle_number: value.vehicle_number,
    });
  };

  const handleChangeDoiXeStatus = (e: any) => {
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    setLoading(true);
    // setSelectedZones(e);
    // setEditOnlyStatus(true);
    dispatch(updateVerhicles(e.id, params));
  };
  const rowSelection = {
    // onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.title === 'Disabled User', // Column configuration not to be checked
    //   name: record.title,
    // }),
  };
  const handleSearch = () => {
    setLoading(true);
    setParamsFilter({
      ...paramsFilter,
      search: changeSearch,
      status: changeStatus,
    });
  };
  return (
    <div className="mainPages">
      <Form
        name="myForm"
        layout="vertical"
        form={form}
        onFinish={createTaoXe}
        onFinishFailed={onFinishFailed}
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
          title={typeModal === 1 ? "Thêm xe mới" : "Thông tin xe"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width={500}
        >
          <Spin spinning={createUpdateLoading}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                name="vehicle_number"
                style={{ width: "calc((100% - 8px) /2)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Biển số xe"
                  placeholder="Nhập biển số xe"
                  width="100%"
                />
              </Form.Item>
              <Form.Item
                name="vehicle_name"
                style={{ width: "calc((100% - 8px) /2)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Tên cont"
                  placeholder="Nhập tên cont"
                  width="100%"
                />
              </Form.Item>
            </div>
          </Spin>
        </Modal>
      </Form>
      <SubHeader
        breadcrumb={[{ text: "Cấu hình" }, { text: "Số cont" }]}
        button={
          roles.find((x: any) => x === "add-cont") && [
            {
              text: "Thêm",
              class: "mainBtn plusSvg",
              svg: <SvgIconPlus />,
              onClick: openModal,
            },
          ]
        }
      />
      <div className="contentBody">
        <Spin spinning={loading}>
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
                placeholder="Số cont"
                suffixIcon={<SvgIconSearch />}
                suffixLeft="12px"
                padding="0px 12px 0px 36px"
                width="calc(55% - 24px)"
                onChange={(e: any) => handleChangeSearchInput(e)}
              />
              <DropdownSelectLabel
                {...defaultStyles}
                placeholder="TT Hoạt động"
                suffixIcon={<img src={arrow} alt="" />}
                padding="0 12px 0 0"
                value={paramsFilter.status}
                iconSvgRight="24px"
                onChangeSelect={(e: any) => setChangeStatus(e)}
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
                onClick={() => handleSearch()}
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
            columns={columnsSoCont({
              handleEditDoiXe,
              handleChangeDoiXeStatus,
              roles: roles,
            })}
            rowSelection={rowSelection}
            dataSource={vehicles}
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
              `Tổng ${stateListVerhicles.data?stateListVerhicles?.data?.paging?.totalPage:0} xe `
            }
            total={stateListVerhicles?.data?.paging?.totalPage}
          />
        </Spin>
      </div>
    </div>
  );
};

export default SoContList;
