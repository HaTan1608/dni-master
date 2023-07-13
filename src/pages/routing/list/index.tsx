/* eslint-disable */
import { Form, Modal,Spin } from "antd";
import { useState, useEffect } from "react";
import { columnsData, dataStatus } from "./data";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconGroupBy from "src/assets/svg/SvgIconGroupBy";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import arrow from "../../../assets/images/arrow.svg";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import SubHeader from "src/components/subHeader/SubHeader";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import {
  getListRoutings,
  createOneRouting,
  updateOneRouting,
} from "src/services/actions/routing.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "src/components/notification";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import { useHistory } from "react-router-dom";
const Routing = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [typeModal, setTypeModal] = useState(1);
  const [idRouting, setIdRouting] = useState<any>();
  const [form] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeStatus, setChangeStatus] = useState(undefined);
  const [changeSearch, setChangeSearch] = useState("");
  const [params, setParams] = useState<any>({
    status: "A",
  });
  const [searchForm] = Form.useForm();
  const [routings, setRoutings] = useState<any>([]);
  // const [paging, setPaging] = useState<object>({});
  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: undefined,
    page: 1,
    limit: 10,
  });
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
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  const { stateGetListRoutings } = useSelector(
    (state: AppState) => state.routingReducer
  );
  const { stateCreateOneRouting } = useSelector(
    (state: AppState) => state.routingReducer
  );
  const { stateUpdateOneRouting } = useSelector(
    (state: AppState) => state.routingReducer
  );
  const [loading, setLoading] = useState<any>(true);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListRoutings();
  }, [paramsFilter]);
  useEffect(() => {
    if (isMount) return;
    const { success, data } = stateGetListRoutings;
    if (success) {
      setRoutings(data.routings);
      setLoading(false)
    }
  }, [stateGetListRoutings.isLoading]);
  //create
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, isLoading, data } =
    stateCreateOneRouting;
    if (!isLoading) {
      if (success) {
        setRoutings([data,...routings]);
        form.resetFields();
        setCreateUpdateLoading(false)
        setVisibleModal(false);

        return notifySuccess(`Tạo tuyến đường thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateOneRouting.isLoading]);
  //update
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, isLoading } =
    stateUpdateOneRouting;
    if (!isLoading) {
      if (success) {
        loadListRoutings();
        form.resetFields();
        setCreateUpdateLoading(false)
        setVisibleModal(false);

        return notifySuccess(`Cập nhật tuyến đường thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false)
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateOneRouting.isLoading]);
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */
  // const loadListProvince = () => {
  //   dispatch(getListProvince({}));
  // }
  const loadListRoutings = (isDefault = false) => {
    // const _paramsListWarehouse = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(paramsFilter);
    }
    dispatch(
      getListRoutings({
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
  const handleChangeRoutingStatus = (e: any) => {
    setLoading(true)
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    dispatch(updateOneRouting(e.id, params));
  };
  const handleEditRouting = (value: any) => {
    setVisibleModal(true);
    setIdRouting(value.id);
    setTypeModal(2);
    setParams({ status: value.status });
    form.setFieldsValue({
      routing_code: value.routing_code,
      routing_name: value.routing_name,
    });
  };
  const exportFileCallback = () => {};
  const handleCloseModal = () => {
    setVisibleModal(false);
    form.resetFields();
  };
  const sortCallback = () => {};
  const createRouting = (values: any) => {
    setCreateUpdateLoading(true)
    const _newParams = {
      status: params.status,
      routing_code:values.routing_code,
      routing_name:values.routing_name,
    };
    if (typeModal === 1) {
      dispatch(createOneRouting(_newParams));
    }
    if (typeModal === 2) {
      dispatch(updateOneRouting(idRouting, _newParams));
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
    searchForm.resetFields();
  };
  const handleSearch=()=>{
    setLoading(true)
    setParamsFilter({
      ...paramsFilter,

      status: changeStatus,
      search: changeSearch,
    });
    // console.log(searchForm)
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
        onFinish={createRouting}
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
          title={typeModal === 1 ? "Thêm tuyến đường mới" : "Thông tin tuyến đường"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width={"40%"}
        >
          <Spin spinning={createUpdateLoading}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="routing_code"
              style={{ width:"calc((100%/2) - 16px)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Mã tuyến đường"
                placeholder="Nhập mã tuyến đường"
                width="100%"
              />
            </Form.Item>
            <Form.Item
              name="routing_name"
              style={{ width: "50%" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Tên tuyến đường"
                placeholder="Nhập tên tuyến đường"
                width="100%"
              />
            </Form.Item>
          </div>
          </Spin>
        </Modal>
      </Form>
      <SubHeader
        breadcrumb={[{ text: "Cấu hình" }, { text: "Quản lý tuyến đường" }]}
        button={roles.find((x:any) => x === "add-route") &&[
          {
            text: "Thêm tuyến",
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
              placeholder="Nhập tuyến đường, tên tuyến đường"
              suffixIcon={<SvgIconSearch />}
              suffixLeft="12px"
              padding="0px 12px 0px 36px"
              width="calc((100%/5)*2 - 16px)"
              onChange={(e:any)=>setChangeSearch(e?e.trim():e)}
            />
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
            handleEditRouting,
            handleChangeRoutingStatus,
            roles:roles
          })}
          rowSelection={rowSelection}
          dataSource={routings}
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
            `Tổng ${stateGetListRoutings.data ?stateGetListRoutings?.data?.paging.totalPage : 0} tuyến `
          }
          total={stateGetListRoutings?.data?.paging.totalPage}
        />
      </div>
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default Routing;
