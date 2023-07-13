/* eslint-disable */
import { Row, Col, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import { notifyError, notifySuccess } from "src/components/notification";
import { changePassByUser } from "src/services/actions/user.actions";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { IPropsChangePass } from "./interfaces";
import FormInput from "src/components/form/FormInput";

const ChangePass = (props: IPropsChangePass) => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [changePassForm] = Form.useForm();

  const { stateChangePassByUser } = useSelector(
    (state: AppState) => state.userReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateChangePassByUser;
    if (success) {
      notifySuccess(message || "");
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateChangePassByUser.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const submitForm = (values: any) => {
    const _params = {
      password_old: values.password_old.trim(),
      password: values.password.trim(),
    };
    dispatch(changePassByUser(_params));
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderContent = () => {
    return (
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={submitForm}
        // onFinishFailed={onFinishFailed}
        form={changePassForm}
        className="mt-3"
        initialValues={{}}
      >
        <FormInput
          id="form-password_old"
          name="password_old"
          label="Mật khẩu cũ"
          type="password"
          placeholder="Nhập mật khẩu cũ"
          classItem="mt-3 mb-0"
          required
        />
        <FormInput
          id="form-password"
          name="password"
          label="Mật khẩu mới"
          type="password"
          placeholder="Nhập mật khẩu mới"
          classItem="mt-3 mb-0"
          required
        />
        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Nhập lại mật khẩu không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
        <Row>
          <Col span={24} className="text-right">
            <ButtonTMS
              id="form-button-signin"
              type="tms"
              htmlType="submit"
              icon="storage"
              loading={stateChangePassByUser.isLoading}
            >
              Lưu
            </ButtonTMS>
          </Col>
        </Row>
      </Form>
    );
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <Modal
      visible={props.visible}
      title={"Thay đổi mật khẩu"}
      onCancel={props.onCancel}
      footer={false}
      width="30%"
    >
      {_renderContent()}
    </Modal>
  );

  /**************************** END **************************/
};

export default ChangePass;
