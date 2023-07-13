/* eslint-disable */
import { Row, Col, Input, Select, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import CustomBreadcrumb from "src/components/layout/Breadcrumb";
import { notifyError, notifySuccess } from "src/components/notification";
import CustomTable from "src/components/table/CustomTable";
import {
  getListUserSystem,
  updateOneUserSystem,
} from "src/services/actions/user.actions";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import arrow from "src/assets/images/arrow.svg";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData, defaultFilter } from "./data";
import { DataType, IParamsFilter } from "./interfaces";
import "./styles.less";
import { dataOptionsStatus, ROLES_SYSTEM } from "src/constants";
import UserSystem from "../edit";
import { getListRole } from "src/services/actions/masterData.actions";
import { useHistory } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();

  const [visible, setVisible] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [dataUsers, setDataUsers] = useState<any>([]);
  const [userId, setUserId] = useState<any>(0);
  const [paging, setPaging] = useState<object>({});
  const [loading, setLoading] = useState<any>(true);
  const [roles, setRoles] = useState<any[]>([]);
  const [isRoleSystem, setIsRoleSystem] = useState<any>(false);

  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);
  const { stateGetListUserSystem, stateUpdateOneUserSystem } = useSelector(
    (state: AppState) => state.userReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    loadListUser();
    loadListRole();
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateGetListUserSystem;
    if (success) {
      setLoading(false);
      setDataUsers(data.users);
      setPaging(data.paging);
    } else if (success === false || error) {
      setLoading(false);
      notifyError(getMessageV1(message));
    }
  }, [stateGetListUserSystem.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateUpdateOneUserSystem;
    if (success) {
      loadListUser();
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
                "modify-user-system-info"
              ) {
                fakeRoles.push("modify-user-system-info");
              }
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "add-user-system-account"
              ) {
                fakeRoles.push("add-user-system-account");
              }
            }
            break;
          }
        }
      }
      const _checkRoleSystem = ROLES_SYSTEM.includes(_dataUser?.userData?.roles);
      setIsRoleSystem(_checkRoleSystem)
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
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

  const loadListUser = (isDefault = false) => {
    const _paramsListUser = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(defaultFilter);
    }
    dispatch(
      getListUserSystem({
        status: _paramsListUser.status,
        page: _paramsListUser.currentPage,
        limit: _paramsListUser.sizePage,
        search: _paramsListUser.q,
      })
    );
  };
  const loadListRole = () => {
    dispatch(getListRole());
  };

  const btnVisbleCreate = () => {
    setVisible(true);
    setUserId(0);
    setIsCreate(true);
  };

  const btnVisbleUpdate = (data: any) => {
    setUserId(data.id);
    setIsCreate(false);
    setVisible(true);
  };

  const btnUpdatePassword = (data: any) => {
    // setDataUser(data);
    // setIsCreate(false);
    // setVisible(true);
  };

  const btnChangeStatus = (values: any) => {
    setLoading(true);
    let params = {
      status: values.status ? "A" : "D",
    };
    dispatch(updateOneUserSystem(values.id, params));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setLoading(true);
      loadListUser();
    }
  };
  const onChangeTable = (page: any) => {
    setLoading(true);
    dispatch(
      getListUserSystem({
        status: paramsFilter.status,
        page: page.current,
        limit: page.pageSize,
        search: paramsFilter.q,
      })
    );
  };

  const onFinish = () => {
    setVisible(false);
    loadListUser(true);
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderSearch = () => {
    return (
      <div className="flex mb-4">
        <div className="w-full">
          <Row gutter={[10, 0]}>
            <Col span={16}>
              <Input
                onChange={(e) =>
                  setParamsFilter({
                    ...paramsFilter,
                    q: e.target.value,
                  })
                }
                allowClear
                style={{ borderRadius: "5px" }}
                placeholder="Tìm kiếm tên người dùng, email, sđt"
                size="small"
                prefix={<SvgIconSearch />}
              />
            </Col>
            <Col span={4}>
              <Select
                allowClear
                showSearch
                onChange={(val) =>
                  setParamsFilter({
                    ...paramsFilter,
                    status: val,
                  })
                }
                size="large"
                suffixIcon={<img src={arrow} alt="" />}
                placeholder="Chọn trạng thái"
                className="w-full"
                filterOption={(input: any, option: any) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input?.toLowerCase()) >= 0
                }
              >
                {dataOptionsStatus.map((e) => {
                  return (
                    <Select.Option value={e.value} key={e.value}>
                      {e.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <ButtonTMS
                type="light"
                className="w-full"
                icon="search"
                // fillIcon={colors.neutral_color_1_4}
                onClick={() => handleKeyDown({ key: "Enter" })}
              >
                <span className="text-neutral_color_1_3">Tìm kiếm</span>
              </ButtonTMS>
            </Col>
            {/* <Col span={3}>
              <ButtonTMS
                onClick={btnVisbleFilter}
                type="light"
                className='w-full'
                icon="filter">
                <span className="text-neutral_color_1_3">Lọc nâng cao</span>
              </ButtonTMS>
            </Col> */}
          </Row>
        </div>
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
        columns={columnsData({
          btnChangeStatus,
          btnOpenModal: btnVisbleUpdate,
          btnOpenUpdatePassword: btnUpdatePassword,
          roles,
        })}
        dataSource={dataUsers}
        // rowSelection={{
        //   type: 'checkbox',
        //   ...rowSelection,
        // }}
        loading={false}
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
      {visible && (
        <Modal
          centered
          visible={visible}
          title={isCreate ? "Thêm mới tài khoản" : "Chỉnh sửa tài khoản"}
          onCancel={() => setVisible(false)}
          footer={false}
          width="70%"
        >
          <UserSystem isCreate={isCreate} userId={userId} isRoleSystem={isRoleSystem} onFinish={onFinish} />
        </Modal>
      )}
      {roles.find((x) => x === "add-user-system-account") ? (
        <CustomBreadcrumb
          rootPath="Quản trị người dùng"
          currentPath="Người dùng hệ thống"
          nameBtn="Thêm người dùng"
          onClickButton={btnVisbleCreate}
        />
      ) : (
        <CustomBreadcrumb
          rootPath="Quản trị người dùng"
          currentPath="Người dùng hệ thống"
        />
      )}
      <Spin spinning={loading}>
        <Col className="contentBody mt-3">
          {_renderSearch()}
          {_renderTable()}
        </Col>
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default UserList;
