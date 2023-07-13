/* eslint-disable */
import { Row, Col, Input, Select, DatePicker, Spin, Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import CustomBreadcrumb from "src/components/layout/Breadcrumb";
import { notifyError, notifySuccess } from "src/components/notification";
import CustomTable from "src/components/table/CustomTable";
import {
  createOneUserGroup,
  getListUserGroup,
  updateOneUserGroup,
  updateOneUserSystem,
} from "src/services/actions/user.actions";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import arrow from "src/assets/images/arrow.svg";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData, dataDefault, defaultFilter } from "./data";
import { IParamsFilter } from "./interfaces";
// import './styles.less';
import { dataOptionsStatus } from "src/constants";
import UserGroup from "../edit";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import { useHistory } from "react-router-dom";
const UserGroupList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [formCreate] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [status, setStatus] = useState("A");

  const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);
  const {
    stateGetListUserSystem,
    stateUpdateOneUserGroups,
    stateGetListUserGroups,
  } = useSelector((state: AppState) => state.userReducer);

  /****************************START**************************/
  /*                         Life Cycle                      */
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
                "create-user-group"
              ) {
                fakeRoles.push("create-user-group");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-user-group"
              ) {
                fakeRoles.push("update-user-group");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "get-user-group-functions"
              ) {
                fakeRoles.push("get-user-group-functions");
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
    dispatch(getListUserGroup());
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateGetListUserGroups;
    if (success) {
    } else if (success === false || error) {
      setLoading(false);
      notifyError(getMessageV1(message));
    }
  }, [stateGetListUserSystem.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateUpdateOneUserGroups;
    if (success) {
      setLoading(false);
      dispatch(getListUserGroup());
      notifySuccess(message || "");
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      setLoading(false);
      return notifyError(msg);
    }
  }, [stateUpdateOneUserGroups.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: (record: DataType) => ({
  //     disabled: record.title === 'Disabled User', // Column configuration not to be checked
  //     name: record.title,
  //   }),
  // };

  const btnVisbleCreate = () => {
    setVisible(true);
  };

  const btnUpdatePassword = (data: any) => {
    // setDataUser(data);
    // setIsCreate(false);
    // setVisible(true);
  };
  const handleChangeReasonStatus = (e: any) => {
    setLoading(true);
    let params = {
      status: e.status === "A" ? "D" : "A",
    };
    dispatch(updateOneUserGroup(e.id, params));
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
    }
  };
  const onChangeTable = (page: any) => {
    setLoading(true);
    const _filter = {
      ...paramsFilter,
      currentPage: page.current,
      sizePage: page.pageSize,
      isDispatch: true,
    };
    setParamsFilter(_filter);
  };

  const onFinish = () => {
    setVisible(false);
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  const handleSubmitCreate = (values: any) => {
    dispatch(
      createOneUserGroup({
        role_name: values.name,
        funct_ids: [],
        status: status,
      })
    );
  };
  return (
    <div className="w-full h-full pl-4 pr-4">
      {visible && (
        <Modal
          visible={visible}
          title={"Thêm mới nhóm người dùng"}
          onCancel={() => setVisible(false)}
          footer={
            <div className="addStores__footer">
              <div style={{ display: "flex", alignItems: "center" }}>
                Trạng thái hoạt động
                <div className="statusBtn">
                  <span
                    className={status === "A" ? "mainBtn" : ""}
                    onClick={() => setStatus("A")}
                  >
                    Bật
                  </span>
                  <span
                    className={status === "D" ? "falseBtn" : ""}
                    onClick={() => setStatus("D")}
                  >
                    Tắt
                  </span>
                </div>
              </div>
              <button
                type="submit"
                form="formCreate"
                className={"addStores__footer__btn addBtn"}
              >
                <SvgIconPlus /> Thêm
              </button>
            </div>
          }
          width="600px"
        >
          <Form form={formCreate} id="formCreate" onFinish={handleSubmitCreate}>
            <Form.Item name="name" style={{ width: "100%", margin: "0" }}>
              <InputNewStyled
                label="Tên nhóm"
                {...defaultStyles}
                width="100%"
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
      <CustomBreadcrumb
        rootPath="Quản trị người dùng"
        currentPath="Nhóm người dùng"
        nameBtn={
          roles.find((x: any) => x === "create-user-group") ? "Thêm nhóm" : null
        }
        onClickButton={btnVisbleCreate}
      />
      <Col className="contentBody mt-3">
        <TableStyledAntd
          className="ordersTable"
          rowKey={"id"}
          columns={columnsData({ handleChangeReasonStatus, roles: roles })}
          dataSource={
            stateGetListUserGroups.data ? stateGetListUserGroups.data.roles : []
          }
          loading={stateGetListUserGroups.isLoading}
          pagination={false}
          bordered
          widthCol1="5%"
          widthCol2="18%"
          widthCol3="18%"
          widthCol4="18%"
          widthCol5="18%"
          widthCol6="18%"
          widthCol7="5%"
          paddingItemBody="8px 16px"
        />
      </Col>
    </div>
  );

  /**************************** END **************************/
};

export default UserGroupList;
