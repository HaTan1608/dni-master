/* eslint-disable */
import { Form, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import SubHeader from "src/components/subHeader/SubHeader";
// import { dataStatus } from "../config-zones/list/data";
import { useDispatch, useSelector } from "react-redux";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import {
  createOneSupplier,
  getListSupplier,
  updateOneSupplier
} from "src/services/actions/supplier.actions";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import arrow from "../../../assets/images/arrow.svg";
import { columnsSupplier, dataStatus } from "./data";
;
// import { columnsSoCont, defaultData,defaultFilter } from "./data";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import { notifyError, notifySuccess } from "src/components/notification";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useHistory } from "react-router-dom";
const SupplierList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [changeSearch, setChangeSearch] = useState("");
  const [changeStatus, setChangeStatus] = useState(undefined);
  const [params, setParams] = useState<any>({
    status: undefined,
  });
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
  });
  const [suppliers, setDataSupplier] = useState<any>([]);
  const [idSupplier, setIdSupplier] = useState<any>();
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
                "add-supplier"
              ) {
                fakeRoles.push("add-supplier");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-supplier"
              ) {
                fakeRoles.push("modify-supplier");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  const { stateGetListSupplier } = useSelector(
    (state: AppState) => state.supplierReducer
  );
  const { stateCreateOneSupplier } = useSelector(
    (state: AppState) => state.supplierReducer
  );
  const { stateUpdateOneSupplier } = useSelector(
    (state: AppState) => state.supplierReducer
  );
  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListSupplier()
  }, [paramsFilter]);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateGetListSupplier;
    if (success) {
      setDataSupplier(data.suppliers);
      setLoading(false)
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateGetListSupplier.isLoading]);
  const loadListSupplier = (isDefault = false) => {
    dispatch(
      getListSupplier({
        status: paramsFilter.status,
        page: paramsFilter.page,
        limit: paramsFilter.limit,
        search: paramsFilter.search,
      })
    );
  };
  //update
  useEffect(() => {
    if (isMount) return;
    const { success, error, isLoading ,message} = stateUpdateOneSupplier;
    if (!isLoading) {
      if (success) {
        loadListSupplier();
        form.resetFields();
        setCreateUpdateLoading(false)
        setVisibleModal(false);

        return notifySuccess(`Cập nhật thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateOneSupplier.isLoading]);
  //create
  useEffect(() => {
    if (isMount) return;
    const { data, success, error, isLoading, message } = stateCreateOneSupplier;
    if (!isLoading) {
      if (success) {
        setDataSupplier([data,...suppliers]);
        form.resetFields();
        setCreateUpdateLoading(false)
        setVisibleModal(false);

        return notifySuccess(`Tạo tuyến thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateOneSupplier.isLoading]);
  /**************************** END **************************/
  const createSupplier = (values: any) => {
    const _newParams = {
      ...values,
      ...params,
    };
    setCreateUpdateLoading(true)
    // console.log(_newParams)
    if (typeModal === 1) {
      dispatch(createOneSupplier(_newParams));
    }
    if (typeModal === 2) {
      dispatch(updateOneSupplier(idSupplier, _newParams));
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
    setLoading(true)
    setParamsFilter({
      search: "",
      status: undefined,
      page: 1,
      limit: 10,
    });
    searchForm.resetFields();
    setChangeSearch("");
    setChangeStatus(undefined);
  };
  const onChangePaging = (page: number, pageSize: number) => {
    setLoading(true)
    setParamsFilter({
      ...paramsFilter,

      page: page,
      limit: pageSize,
    });
  };
  const importFileCallback = () => {};

  const exportFileCallback = () => {};

  const sortCallback = () => {};

  const handleEditSupplier = (value: any) => {
    setVisibleModal(true);
    setIdSupplier(value.id);
    setTypeModal(2);
    setParams({ ...params, status: value.status });
    
    form.setFieldsValue({
      supplier_name: value.supplier_name,
      supplier_code: value.supplier_code,
    });
  };

  const handleChangeSupplierStatus = (e: any) => {
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    setLoading(true)
    // setSelectedZones(e);
    // setEditOnlyStatus(true);
    dispatch(updateOneSupplier(e.id, params));
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
    setLoading(true)
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
        onFinish={createSupplier}
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
          title={typeModal === 1 ? "Thêm đối tác" : "Thông đối tác"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width={500}
        >
          <Spin spinning={createUpdateLoading}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="supplier_code"
              style={{ width: "calc((100% - 8px) /2)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Mã đối tác"
                placeholder="Nhập mã đối tác"
                width="100%"
              />
            </Form.Item>
            <Form.Item
              name="supplier_name"
              style={{ width: "calc((100% - 8px) /2)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Tên đối tác"
                placeholder="Nhập tên đối tác"
                width="100%"
              />
            </Form.Item>
          </div>
          </Spin>
        </Modal>
      </Form>
      <SubHeader
        breadcrumb={[{ text: "Cấu hình" }, { text: "Đối tác vận chuyển" }]}
        button={roles.find((x:any) => x === "add-supplier") &&[
          {
            text: "Thêm",
            class: "mainBtn plusSvg",
            svg: <SvgIconPlus />,
            onClick: openModal,
          },
        ]}
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
              placeholder="Mã đối tác"
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
          columns={columnsSupplier({ handleEditSupplier, handleChangeSupplierStatus,roles:roles })}
          rowSelection={rowSelection}
          dataSource={suppliers}
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
            `Tổng ${stateGetListSupplier.data?stateGetListSupplier?.data?.paging?.totalPage:0} đối tác `
          }
          total={stateGetListSupplier?.data?.paging?.totalPage}
        />
         </Spin>
      </div>
     
    </div>
  );
};

export default SupplierList;
