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
  createTrain, getListTrains, updateTrain
} from "src/services/actions/trains.action";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import arrow from "../../assets/images/arrow.svg";
import { dataStatus } from "../config-zones/list/data";
import { columnsMaChuyen } from "./data";
// import { columnsSoCont, defaultData,defaultFilter } from "./data";
import { notifyError, notifySuccess } from "src/components/notification";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
// import { IParamsFilter } from "./interfaces";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import { useHistory } from "react-router-dom";
const MaChuyenList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
  });
  const [params, setParams] = useState<any>({
    status: "A",
  });
  const [idTrain, setIdTrain] = useState<any>();
  const [suppliers, setSuppliers] = useState<any>([]);
  const [changeSearch, setChangeSearch] = useState("");
  const [changeStatus, setChangeStatus] = useState(undefined);
  const [trains, setDataTrains] = useState<any>([]);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [roles, setRoles] = useState<any>([]);
  const [value, setValue] = useState<any>(true);
  const { stateListTrains } = useSelector(
    (state: AppState) => state.trainReducer
  );
  const { stateCreateTrain } = useSelector(
    (state: AppState) => state.trainReducer
  );
  const { stateUpdateTrain } = useSelector(
    (state: AppState) => state.trainReducer
  );
  const { stateGetListSupplier } = useSelector(
    (state: AppState) => state.supplierReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListTrains();
    dispatch(getListSupplier({}));
  }, [paramsFilter]);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateListTrains;
    if (success) {
      setLoading(false);
      setDataTrains(data.trains);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateListTrains.isLoading]);
  //get list supplier
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateGetListSupplier;
    if (success) {
      let fakeWards = [];
      for (var i = 0; i < data?.suppliers.length; i++) {
        if (data?.suppliers[i].status === "A") {
          fakeWards.push({
            label: data?.suppliers[i].supplier_name,
            value: data?.suppliers[i].id,
          });
        }
      }
      setSuppliers(fakeWards);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateGetListSupplier.isLoading]);
  //create
  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading, message } = stateCreateTrain;
    if (!isLoading) {
      if (success) {
        loadListTrains();
        form.resetFields();
        setCreateUpdateLoading(false);
        setVisibleModal(false);

        return notifySuccess(`Tạo chuyến thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false);
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateTrain.isLoading]);
  //update
  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading, message } = stateUpdateTrain;
    if (!isLoading) {
      if (success) {
        loadListTrains();
        form.resetFields();
        setCreateUpdateLoading(false);
        setVisibleModal(false);

        return notifySuccess(`Cập nhật thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false);
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateTrain.isLoading]);
  /**************************** END **************************/
  const loadListTrains = (isDefault = false) => {
    // const _paramsListCustomer = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(paramsFilter);
    }
    dispatch(
      getListTrains({
        status: paramsFilter.status,
        page: paramsFilter.page,
        limit: paramsFilter.limit,
        search: paramsFilter.search,
      })
    );
  };
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
                "add-ma-chuyen"
              ) {
                fakeRoles.push("add-ma-chuyen");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-ma-chuyen"
              ) {
                fakeRoles.push("modify-ma-chuyen");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  const createTaoXe = (values: any) => {
    const _newParams = {
      description: values.description,
      supplier_id: value.value,
      supplier_name: value.label,
      train_number: values.train_number,
      ...params,
    };
    setCreateUpdateLoading(true);
    if (typeModal === 1) {
      dispatch(createTrain(_newParams));
    }
    if (typeModal === 2) {
      dispatch(updateTrain(idTrain, _newParams));
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
    });
    searchForm.resetFields();
    setChangeStatus(undefined);
    setChangeSearch("");
  };
  const importFileCallback = () => {};

  const exportFileCallback = () => {};

  const sortCallback = () => {};

  const handleEditDoiXe = (value: any) => {
    setVisibleModal(true);
    setIdTrain(value.id);
    setTypeModal(2);
    setParams({ status: value.status });
    form.setFieldsValue({
      train_number: value.train_number,
      description: value.description,
      supplier_id: value.supplier_id,
    });
  };

  const handleChangeDoiXeStatus = (e: any) => {
    setLoading(true);
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    // setSelectedZones(e);
    // setEditOnlyStatus(true);
    dispatch(updateTrain(e.id, params));
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

  const onChangePaging = (page: number, pageSize: number) => {
    setLoading(true);
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
          title={typeModal === 1 ? "Thêm chuyến" : "Thông tin chuyến"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width={"50%"}
        >
          <Spin spinning={createUpdateLoading}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                name="train_number"
                style={{ width: "calc((100% - 8px) /3)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Mã chuyến"
                  placeholder="Nhập mã chuyến"
                  width="100%"
                />
              </Form.Item>
              <Form.Item
                name="description"
                style={{ width: "calc((100% - 8px) /3)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Tên chuyến"
                  placeholder="Nhập tên chuyến tàu"
                  width="100%"
                />
              </Form.Item>
              <FormSelectAntd
                label="Nhà cung cấp:"
                name="supplier_id"
                {...defaultStyles}
                placeholder="Chọn nhà cung cấp"
                suffixIcon={<img src={arrow} alt="" />}
                margin="0 0 24px 0"
                options={suppliers}
                width="calc((100% - 8px) /3)"
                onChange={(e: any, value: any) => setValue(value)}
                showSearch
                optionFilterProp="label"
                filterOption={(input: any, option: any) =>
                  option.label.includes(input)
                }
              />
            </div>
          </Spin>
        </Modal>
      </Form>
      <SubHeader
        breadcrumb={[{ text: "Cấu hình" }, { text: "Mã chuyến" }]}
        button={roles.find((x:any) => x === "add-ma-chuyen") &&[
          {
            text: "Thêm chuyến",
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
                placeholder="Mã chuyến"
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
                iconSvgRight="24px"
                value={paramsFilter.status}
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
                onClick={() => {
                  setLoading(true);
                  setParamsFilter({
                    ...paramsFilter,
                    search: changeSearch,
                    status: changeStatus,
                  });
                }}
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
            columns={columnsMaChuyen({
              handleEditDoiXe,
              handleChangeDoiXeStatus,
              roles: roles
            })}
            rowSelection={rowSelection}
            dataSource={trains}
            loading={false}
            pagination={false}
            bordered
            widthCol1="5%"
            widthCol2="10%"
            widthCol3="20%"
            widthCol4="25%" 
            widthCol5="15%"
            widthCol6="15%"
            widthCol7="10%"
            paddingItemBody="8px 16px"
          />
          <PanigationAntStyled
            style={{ marginTop: "8px" }}
            current={paramsFilter.page}
            pageSize={paramsFilter.limit}
            showSizeChanger
            onChange={onChangePaging}
            showTotal={() =>
              `Tổng ${stateListTrains.data?stateListTrains?.data?.paging?.totalPage:0} chuyến `
            }
            total={stateListTrains?.data?.paging?.totalPage}
          />
        </div>
      </Spin>
    </div>
  );
};

export default MaChuyenList;
