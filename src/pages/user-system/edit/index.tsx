/* eslint-disable */
import { Row, Col, Form, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import { notifyError, notifySuccess } from "src/components/notification";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import FormSelect from "src/components/form/FormSelect";
import FormInput from "src/components/form/FormInput";
import {
  createOneUserSystem,
  getUserSystemById,
  updateOneUserSystem,
} from "src/services/actions/user.actions";
import { ROLES_CUSTOMER, ROLES_SYSTEM, selectOptionsValue } from "src/constants";
import {
  IFormUserSystem,
  IPropsUserSystem,
  selectOptionsRole,
} from "./interfaces";
import FormSwitch from "src/components/form/FormSwitch";
import { localGetAccount } from "src/utils/localStorage";

const UserSystem = (props: IPropsUserSystem) => {
  const { isCreate, userId, isRoleSystem } = props;
  const dispatch = useDispatch();
  const isMount = useIsMount();

  const accountLocal = localGetAccount();
  // const refForm = createRef<FormInstance>();
  const [userSystemForm] = Form.useForm();
  const [dataRoles, setDataRoles] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const {
    stateUpdateOneUserSystem,
    stateCreateOneUserSystem,
    stateGetUserSystemById,
  } = useSelector((e: AppState) => e.userReducer);
  const { stateRole } = useSelector(
    (state: AppState) => state.masterDataReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    const { data, message, success, isLoading, error } = stateRole;
    if (success) {
      setDataRoles(data.roles);
    }
    if (userId) {
      loadUser(userId);
    }
  }, []);

  useEffect(() => {
    const { data, message, success, isLoading, error } = stateGetUserSystemById;
    if (success) {
      setDataUser(data.user);
    }
  }, [stateGetUserSystemById.isLoading]);

  useEffect(() => {
    if (isMount) return;
    userSystemForm.setFieldsValue({
      status: !isCreate ? (dataUser.status === "A" ? true : false) : true,
      fullname: !isCreate && dataUser.full_name ? dataUser.full_name : "",
      phone: !isCreate && dataUser.phone ? dataUser.phone : "",
      email: !isCreate && dataUser.email ? dataUser.email : "",
      role_id:
        !isCreate && dataUser.role_id
          ? dataUser.role_id
          : dataRoles[0] && dataRoles[0].id,
    });
  }, [dataUser, dataRoles]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateCreateOneUserSystem;
    if (success) {
      notifySuccess(message || "");
      setLoading(false)
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      setLoading(false)
      return notifyError(msg);
    }
  }, [stateCreateOneUserSystem.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateUpdateOneUserSystem;
    if (success) {
      // notifySuccess(message || '');
      setLoading(false)
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      setLoading(false)
      return notifyError(msg);
    }
  }, [stateUpdateOneUserSystem.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const loadUser = (id: number) => {
    dispatch(getUserSystemById(id));
  };

  const submitForm = (values: IFormUserSystem) => {
    setLoading(true)
    const _accountLocal = JSON.parse(accountLocal || "");
    const _paramsUser = {
      full_name: values.fullname.trim(),
      email: values.email.trim(),
      password: values.password,
      phone: values.phone.trim(),
      role_id: values.role_id,
      status: values.status ? "A" : "D",
    };
    dispatch(
      isCreate
        ? createOneUserSystem(_paramsUser)
        : updateOneUserSystem(dataUser.id, _paramsUser)
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderContent = () => {
    return (
      <div className="w-full bg-white">
        <Spin spinning={loading}>
        <p className="text-16 font-medium">Thông tin tài khoản</p>
        <Row className="w-full mt-3" gutter={8}>
          <Col span={12}>
            <FormInput
              id="form-fullname"
              name="fullname"
              label="Tên tài khoản"
              type="text"
              size="small"
              placeholder="Nhập tên tài khoản"
              classItem="mb-0"
              required
            />
          </Col>
          <Col span={12}>
            <FormInput
              id="form-password"
              name="password"
              label="Mật khẩu"
              type="password"
              size="small"
              placeholder="Nhập mật khẩu"
              disabled={isCreate ? false : true}
              classItem="mb-0"
              required={isCreate ? true : false}
            />
          </Col>
          <Col span={12}>
            <FormInput
              id="form-phone"
              name="phone"
              label="Số điện thoại"
              type="phone"
              size="small"
              placeholder="Nhập số điện thoại"
              disabled={isCreate ? false : true}
              classItem="mb-0"
              required
            />
          </Col>
          <Col span={12}>
            <FormInput
              id="form-email"
              name="email"
              label="Email"
              type="email"
              size="small"
              placeholder="Nhập email"
              disabled={isCreate ? false : true}
              classItem="mb-0"
              required
            />
          </Col>
        </Row>
        {
          isRoleSystem && (
            <>
              <p className="text-16 font-medium mt-3">Vai trò</p>
              <Row className="w-full mt-3" gutter={8}>
                  <Col span={12}>
                    <FormSelect
                      name="role_id"
                      label="Chức vụ"
                      dataSource={dataRoles}
                      placeholder="Chọn chức vụ"
                      slOption={selectOptionsRole}
                    />
                
                  </Col>
                {/* <Col span={12}>
                  <FormSelect
                  name="station"
                  label="Nơi làm việc"
                  dataSource={[]}
                  placeholder="Chọn nơi làm việc"
                  slOption={selectOptionsValue}
                  />
                </Col> */}
              </Row>
            </>
          )
        }
        <Row>
          <Col span={12} className="flex">
            <span className="text-16 font-medium mr-2">
              Trạng thái hoạt động
            </span>
            <FormSwitch
              name="status"
              checkedChildren="Bật"
              unCheckedChildren="Tắt"
            />
          </Col>
          <Col span={12} className="text-right">
            <ButtonTMS
              id="form-button-signin"
              type="tms"
              htmlType="submit"
              icon="storage"
              loading={
                isCreate
                  ? stateCreateOneUserSystem.isLoading
                  : stateUpdateOneUserSystem.isLoading
              }
            >
              Lưu
            </ButtonTMS>
          </Col>
        </Row>
        </Spin>
      </div>
    );
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className="w-full h-full pl-4 pr-4">
      <Form
        name="formUserSystem"
        requiredMark={false}
        layout="vertical"
        onFinish={submitForm}
        onFinishFailed={onFinishFailed}
        form={userSystemForm}
        className="mt-3"
      >
        <Spin
          spinning={(!isCreate && stateGetUserSystemById.isLoading) || false}
        >
          {_renderContent()}
        </Spin>
      </Form>
    </div>
  );

  /**************************** END **************************/
};

export default UserSystem;
