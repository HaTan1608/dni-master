/* eslint-disable */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAccount } from "../../../services/actions/account.actions";
import { AppState } from "../../../types";
import FormInput from "src/components/form/FormInput";

import { IFormChangePass } from "../interfaces";
import ButtonTMS from "../../../components/buttons/ButtonTMS";
import LogoSignIn from "./logoSignIn";
import { notifyError, notifySuccess } from "src/components/notification";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import "../styles.less";

import { typeScreenManagerSignIn, screenSignIn } from "src/constants";

const ChangePassword = (props: any) => {
  const [changePassForm] = Form.useForm();

  const dispatch = useDispatch();
  const isMount = useIsMount();
  const { stateChangePass, phone, email, activationCode } = useSelector(
    (state: AppState) => state.accountReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateChangePass;
    if (success) {
      notifySuccess(message || "");
      changeDirector(typeScreenManagerSignIn.CHANGE_PASSWORD_SUCCESS);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateChangePass.isLoading]);
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const btnChagePassword = (values: IFormChangePass) => {
    const params = {
      activation_code: activationCode,
      username: phone || email,
      password: values.password.trim(),
    };
    dispatch(changeAccount(params));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const changeDirector = (values: number) => {
    props.changeType(values);
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div
      className="flex-col flex items-center justify-start px-8 py-8"
      style={{ width: screenSignIn }}
    >
      <LogoSignIn />
      <Form
        form={changePassForm}
        requiredMark={false}
        layout="vertical"
        onFinish={btnChagePassword}
        onFinishFailed={onFinishFailed}
        initialValues={{
          username: phone || email || "",
        }}
        className="w-full h-full flex justify-between flex-col "
      >
        <div>
          <FormInput
            id="form-password"
            name="password"
            label="Mật khẩu mới"
            type="password"
            placeholder="Nhập mật khẩu mới"
            disabled={stateChangePass.isLoading}
            classItem="mt-3 mb-0"
            required
          />
          {/* <FormInput
            id='form-rePassword'
            name='rePassword'
            label='Nhập lại mật khẩu mới'
            type='rePassword'
            placeholder="Nhập lại mật khẩu mới"
            disabled={stateForgetPass.isLoading}
            classItem='mt-3'
            // required
          /> */}
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
        </div>

        <ButtonTMS
          id="form-button-signin"
          type="tms"
          htmlType="submit"
          loading={stateChangePass.isLoading}
        >
          Hoàn tất
        </ButtonTMS>
      </Form>
    </div>
  );

  /**************************** END **************************/
};

export default ChangePassword;
