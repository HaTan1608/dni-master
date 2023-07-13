/* eslint-disable */
import { Col, Form, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "src/components/notification";
import CustomTable from "src/components/table/CustomTable";
import { AppState } from "src/types";
import arrow from "src/assets/images/arrow.svg";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import {
  columnsDataDetail,
  defaultDataDetail,
  defaultFilter,
} from "../list/data";
import { DataType, IFormListedDetail, IParamsFilter } from "../list/interfaces";
import { getListCustomer } from "src/services/actions/customer.actions";
import { updateOneUserSystem } from "src/services/actions/user.actions";
import SubHeader from "src/components/subHeader/SubHeader";
import SvgScan from "src/assets/svg/SvgScan";
import {
  defaultStyles,
  styleFlex,
} from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";

const DetailForm = (props: any) => {
  const dispatch = useDispatch();
  const [taobangke] = Form.useForm();
  const isMount = useIsMount();
  const [paging, setPaging] = useState<object>({});
  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);
  const { stateGetListCustomer } = useSelector(
    (state: AppState) => state.customerReducer
  );
  const { stateProvince } = useSelector(
    (state: AppState) => state.masterDataReducer
  );
  const { stateUpdateOneUserSystem } = useSelector(
    (state: AppState) => state.userReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateUpdateOneUserSystem;
    if (success) {
      loadListCustomer();
      notifySuccess(message || "");
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneUserSystem.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.title === "Disabled User", // Column configuration not to be checked
      name: record.title,
    }),
  };

  const loadListCustomer = (isDefault = false) => {
    const _paramsListCustomer = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(defaultFilter);
    }
    dispatch(
      getListCustomer({
        warehouseId: _paramsListCustomer.warehouseId,
        listedType: _paramsListCustomer.listedType,
        page: _paramsListCustomer.currentPage,
        limit: _paramsListCustomer.sizePage,
        search: _paramsListCustomer.q,
      })
    );
  };

  const btnChangeStatus = (values: any) => {
    let params = {
      status: values.status ? "A" : "D",
    };
    dispatch(updateOneUserSystem(values.id, params));
  };

  const onChangeTable = (page: any) => {
    const _filter = {
      ...paramsFilter,
      currentPage: page.current,
      sizePage: page.pageSize,
      isDispatch: true,
    };
    setParamsFilter(_filter);
  };

  const submitForm = (values: IFormListedDetail) => {
    // debugger
    // const _paramsUser = {
    //   full_name: values.fullname.trim(),
    //   email: values.email.trim(),
    //   phone: values.phone.trim(),
    //   // password: isCreate ? values.password.trim() : undefined,
    //   status: values.status ? 'A' : 'D',
    //   user_parent_id: _accountLocal && _accountLocal.userData && _accountLocal.userData.id,
    // }
    // dispatch(isCreate ? createOneUserSystem(_paramsUser) : updateOneUserSystem(dataUser.id,_paramsUser));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmitForm = (values: any) => {
    console.log("okela");
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderContent = () => {
    return (
      <div className="w-full bg-white">
        <Form form={taobangke} id="taobangke" onFinish={handleSubmitForm}>
          <div style={{ ...styleFlex, marginTop: "16px" }}>
            <div style={{ ...styleFlex, width: "calc((100% - 40px ) / 6)" }}>
              <Form.Item style={{ width: "calc(50% - 4px)" }}>
                <InputNewStyled
                  {...defaultStyles}
                  label="Mã bảng kê"
                  width="100%"
                  disabled
                />
              </Form.Item>
              <div
                style={{
                  ...styleFlex,
                  width: "calc(50% - 4px)",
                  height: "41px",
                  background: "#0f5c97",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                  marginTop: "-24px",
                  borderRadius: "5px",
                }}
              >
                Tạo bảng kê
              </div>
            </div>
            <Form.Item
              style={{ ...styleFlex, width: "calc((100% - 40px ) / 6)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Ngày tạo"
                width="100%"
                disabled
              />
            </Form.Item>
            <Form.Item
              style={{
                ...styleFlex,
                width: "calc((((100% - 40px ) / 6 ) * 2 ) + 8px ) ",
              }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Nhập/Quét mã vận đơn"
                width="100%"
                placeholder="Nhập/Quét mã vận đơn"
                suffixRight="12px"
                suffixIcon={
                  <>
                    <SvgScan />{" "}
                    <span style={{ marginLeft: "8px", color: "#2d9cdb" }}>
                      Quét mã
                    </span>
                  </>
                }
                suffixWidth="80px"
                suffixSvgColor="#2d9cdb"
              />
            </Form.Item>
            <Form.Item
              style={{ ...styleFlex, width: "calc((100% - 40px ) / 6)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Số vận đơn"
                width="100%"
                disabled
              />
            </Form.Item>
            <Form.Item
              style={{ ...styleFlex, width: "calc((100% - 40px ) / 6)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                label="Tổng trọng lượng"
                width="100%"
                disabled
              />
            </Form.Item>
          </div>
          <div style={{ ...styleFlex, marginTop: "8px" }}>
            <Form.Item
              style={{ ...styleFlex, width: "calc((100% - 40px ) / 6)" }}
            >
              <InputNewStyled
                {...defaultStyles}
                width="100%"
                label="Số CONT"
                placeholder="Nhập số CONT"
              />
            </Form.Item>
            <FormSelectAntd
              {...defaultStyles}
              name="receiverTransport"
              label="Ga đi"
              placeholder="Chọn ga đi"
              width="calc((100% - 40px ) / 6)"
              margin="-44px 0 0 0"
              padding="0"
              border="1px solid #BFC4C9"
              options={[]}
              suffixIcon={<img src={arrow} alt="" />}
              onChange={(e: any) => console.log("")}
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ga",
                },
              ]}
            />
            <Form.Item
              style={{
                position: "relative",
                width: "calc((100% - 40px ) / 6)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  fontSize: "12px",
                }}
              >
                Chọn ngày đi
              </div>
              <DatePicker
                style={{
                  borderRadius: "5px",
                  height: "41px",
                  border: "1px solid #BFC4C9",
                  width: "100%",
                }}
                placeholder="Chọn ngày đi"
              />
            </Form.Item>
            <FormSelectAntd
              {...defaultStyles}
              name="receiverTransport"
              label="Ga đến"
              placeholder="Chọn ga đến"
              width="calc((100% - 40px ) / 6)"
              margin="-44px 0 0 0"
              padding="0"
              border="1px solid #BFC4C9"
              options={[]}
              suffixIcon={<img src={arrow} alt="" />}
              onChange={(e: any) => console.log("")}
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ga",
                },
              ]}
            />
            <Form.Item
              style={{
                width: "calc((100% - 40px ) / 6)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  fontSize: "12px",
                }}
              >
                Chọn ngày đến
              </div>
              <DatePicker
                style={{
                  borderRadius: "5px",
                  height: "41px",
                  border: "1px solid #BFC4C9",
                  width: "100%",
                }}
                placeholder="Chọn ngày đến"
              />
            </Form.Item>
            <div
              style={{ ...styleFlex, width: "calc((100% - 40px ) / 6)" }}
            ></div>
          </div>

          <div style={{ ...styleFlex, margin: "8px 0 0 0", width: "100%" }}>
            <Form.Item style={{ width: "100%", margin: "0 0 8px 0" }}>
              <InputNewStyled
                {...defaultStyles}
                width="100%"
                label="Ghi chú"
                placeholder="Nhập ghi chú"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  };

  const _renderTable = () => {
    return (
      <CustomTable
        rowKey={"id"}
        bordered
        isRowLight={true}
        paging={paging}
        columns={columnsDataDetail({
          btnChangeStatus,
        })}
        dataSource={defaultDataDetail}
        // rowSelection={{
        //   type: 'checkbox',
        //   ...rowSelection,
        // }}
        loading={stateGetListCustomer.isLoading}
        pagination={true}
        onChange={onChangeTable}
      />
    );
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className="w-full h-full pl-4 pr-4">
      <SubHeader
        breadcrumb={[{ text: "Bảng kê" }, { text: "Tạo bảng kê" }]}
        button={[
          {
            text: "Lưu",
            class: "mainBtn plusSvg",
            svg: <SvgIconStorage />,
            form: "taobangke",
          },
        ]}
      />
      <Col className="contentBody mt-3">{_renderContent()}</Col>
      <Col className="contentBody mt-3">
        <ActionsHeader importFileCallback exportFileCallback sortCallback />
        <TableStyledAntd
          rowKey={"id"}
          bordered
          isRowLight={true}
          paging={paging}
          columns={columnsDataDetail({
            btnChangeStatus,
          })}
          dataSource={defaultDataDetail}
          loading={false}
          pagination={true}
          onChange={onChangeTable}
        />
      </Col>
    </div>
  );

  /**************************** END **************************/
};

export default DetailForm;
