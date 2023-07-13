/* eslint-disable */
import { Form, Modal, Spin } from "antd";
import { useState, useEffect } from "react";
import { columnsData, dataStatus,dataReasonType } from "./data";
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
  getListReasons,
  createOneReason,
  updateOneReason,
} from "src/services/actions/reason.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifySuccess } from "src/components/notification";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import { useHistory } from "react-router-dom";
const Reason = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [typeModal, setTypeModal] = useState(1);
  const [idReason, setIdReason] = useState<any>();
  const [form] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeStatus, setChangeStatus] = useState(undefined);
  const [reasonTpye, setChangeReasonTpye] = useState(undefined);
  const [params, setParams] = useState<any>({
    status: "A",
  });
  const [searchForm] = Form.useForm();
  const [reasons, setReasons] = useState<any>([]);
  // const [paging, setPaging] = useState<object>({});
  const [paramsFilter, setParamsFilter] = useState({
    status:undefined,
    reason_type: undefined,
    page: 1,
    limit: 10,
  });
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
                "add-reason"
              ) {
                fakeRoles.push("add-reason");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "modify-reason"
              ) {
                fakeRoles.push("modify-reason");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  // const [listDetails, setListDetails] = useState<any[]>([]);
  const { stateGetListReason } = useSelector(
    (state: AppState) => state.reasonReducer
  );
  const { stateCreateOneReason } = useSelector(
    (state: AppState) => state.reasonReducer
  );
  const { stateUpdateOneReason } = useSelector(
    (state: AppState) => state.reasonReducer
  );
  const [loading, setLoading] = useState<any>(true);
  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListReasons();
  }, [paramsFilter]);
  useEffect(() => {
    if (isMount) return;
    const { success, data } = stateGetListReason;
    if (success) {
      setReasons(data.reasons);
      setLoading(false);
    }
  }, [stateGetListReason.isLoading]);
  //create
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, isLoading, data } = stateCreateOneReason;
    if (!isLoading) {
      if (success) {
        setReasons([data, ...reasons]);
        form.resetFields();
        setCreateUpdateLoading(false);
        setVisibleModal(false);

        return notifySuccess(`Tạo sự cố thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false);
        return notifyError(`${message}`);
      }
    }
  }, [stateCreateOneReason.isLoading]);
  //update
  useEffect(() => {
    if (isMount) return;
    const { success, message, error, isLoading } = stateUpdateOneReason;
    if (!isLoading) {
      if (success) {
        loadListReasons();
        form.resetFields();
        setCreateUpdateLoading(false);
        setVisibleModal(false);

        return notifySuccess(`Cập nhật sự cố thành công!`);
      } else if (success === false || error) {
        setCreateUpdateLoading(false);
        return notifyError(`${message}`);
      }
    }
  }, [stateUpdateOneReason.isLoading]);
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */
  // const loadListProvince = () => {
  //   dispatch(getListProvince({}));
  // }
  const loadListReasons = (isDefault = false) => {
    // const _paramsListWarehouse = isDefault ? defaultFilter : paramsFilter;
    dispatch(
      getListReasons({
        // search: paramsFilter.search,
        status:paramsFilter.status,
        page: paramsFilter.page,
        limit: paramsFilter.limit,
        reason_type: paramsFilter.reason_type,
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
  const handleChangeReasonStatus = (e: any) => {
    setLoading(true);
    let params = {
      ...e,
      status: e.status === "A" ? "D" : "A",
    };
    dispatch(updateOneReason(e.id, params));
  };
  const handleEditReason = (value: any) => {
    console.log(value)
    setVisibleModal(true);
    setIdReason(value.id);
    setTypeModal(2);
    setParams({ status: value.status });
    form.setFieldsValue({
      reason_code: value.reason_code,
      reason_name: value.reason_name,
      reason_type: value.reason_type,
    });
  };
  const exportFileCallback = () => {};
  const handleCloseModal = () => {
    setVisibleModal(false);
    form.resetFields();
  };
  const sortCallback = () => {};
  const createReason = (values: any) => {
    setCreateUpdateLoading(true);
    const _newParams = {
      status: params.status,
      reason_code: values.reason_code,
      reason_name: values.reason_name,
      reason_type:values.reason_type,
    };
    if (typeModal === 1) {
      dispatch(createOneReason(_newParams));
    }
    if (typeModal === 2) {
      dispatch(updateOneReason(idReason, _newParams));
    }
  };
  const importFileCallback = () => {};
  const handleReset = () => {
    setLoading(true);
    setParamsFilter({
      status:undefined,
      reason_type: undefined,
      page: 1,
      limit: 10,
    });
    searchForm.resetFields();
  };
  const handleSearch = () => {
    setLoading(true);
    setParamsFilter({
      ...paramsFilter,
      status:changeStatus,
      reason_type: reasonTpye,
    });
    // console.log(searchForm)
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
        onFinish={createReason}
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
          title={typeModal === 1 ? "Thêm sự cố mới" : "Thông tin sự cố"}
          className="modalAddStores"
          onCancel={() => handleCloseModal()}
          width={"45%"}
        >
          <Spin spinning={createUpdateLoading}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                name="reason_code"
                style={{ width: "calc((100% - 24px)/3)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Mã sự cố"
                  placeholder="Nhập mã sự cố"
                  width="100%"
                />
              </Form.Item>
              <Form.Item
                name="reason_name"
                style={{ width: "calc((100% - 24px)/3)" }}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Tên sự cố"
                  placeholder="Nhập tên sự cố"
                  width="100%"
                />
              </Form.Item>
              <FormSelectAntd
                label="Loại sự cố:"
                name="reason_type"
                {...defaultStyles}
                placeholder="Chọn loại sự cố"
                suffixIcon={<img src={arrow} alt="" />}
                // onChange={(e: any, value: any) =>
                //   setDataAddRoute({
                //     ...dataAddRoute,
                //     to_province: e,
                //   })
                // }
                defaultValue={["D"]}
                margin="0 0 24px 0"
                options={dataReasonType}
                width="calc((100% - 24px)/3)"
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
        breadcrumb={[{ text: "Cấu hình" }, { text: "Quản lý sự cố" }]}
        button={roles.find((x:any) => x === "add-reason")&&[
          {
            text: "Thêm",
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
            <div style={{display:"flex"}}>
              <FormSelectAntd
                {...defaultStyles}
                name="reason_type"
                label="Loại sự cố"
                placeholder="Chọn sự cố"
                suffixIcon={<img src={arrow} alt="" />}
                padding="0"
                onChange={(e: any) => setChangeReasonTpye(e)}
                options={dataReasonType}
                width="calc(100%/3)"
                margin="0 16px 0px 0"
              />
              <FormSelectAntd
                {...defaultStyles}
                name="status"
                label="Trạng thái"
                placeholder="TT hoạt động"
                suffixIcon={<img src={arrow} alt="" />}
                padding="0"
                onChange={(e: any) => setChangeStatus(e)}
                options={dataStatus}
                width="calc(100%/3)"
                margin="0 16px 0px 0"
              />
              <ButtonStyled
                {...defaultStyles}
                text="Tìm kiếm"
                svg={<SvgIconSearch />}
                svgMargin="0 8px 0 0"
                width="15%"
                margin="0 16px 0px 0"
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
            rowKey={"reason_code"}
            columns={columnsData({
              handleEditReason,
              handleChangeReasonStatus,
              roles:roles
            })}
            rowSelection={rowSelection}
            dataSource={reasons}
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
              `Tổng ${stateGetListReason.data ? stateGetListReason?.data?.paging.totalPage : 0} sự cố `
            }
            total={stateGetListReason?.data?.paging.totalPage}
          />
        </div>
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default Reason;
