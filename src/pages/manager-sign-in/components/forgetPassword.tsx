/* eslint-disable */
import { Form } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetAccount } from "../../../services/actions/account.actions";
import { AppState } from "../../../types";
import FormInput from "src/components/form/FormInput";

import { IFormForgetPass, IPropsSignIn } from "../interfaces";
import ButtonTMS from "../../../components/buttons/ButtonTMS";
import LogoSignIn from "./logoSignIn";
import { notifyError, notifySuccess } from "src/components/notification";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import "../styles.less";

import { typeScreenManagerSignIn, screenSignIn } from "src/constants";
import { localGetFormLogin } from "src/utils/localStorage";

const ForgetPassword = (props: IPropsSignIn) => {
  const [registerForm] = Form.useForm();

  const dispatch = useDispatch();
  const isMount = useIsMount();
  const { stateForgetPass, phone, email } = useSelector(
    (state: AppState) => state.accountReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    let _formLogin = localGetFormLogin();
    if (!phone && !email && _formLogin) {
      let _dataUser = JSON.parse(_formLogin);
      registerForm.setFieldsValue({
        username: _dataUser.username,
      });
    }
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateForgetPass;
    if (success) {
      notifySuccess(message || "");
      changeDirector(typeScreenManagerSignIn.OTP);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateForgetPass.isLoading]);
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const btnForgetPassword = (values: IFormForgetPass) => {
    let params;

    if (values.username.search("@") !== -1) {
      params = {
        email: values.username.trim(),
        username: values.username.trim(),
      };
    } else {
      params = {
        phone: values.username.trim(),
        username: values.username.trim(),
      };
    }
    dispatch(forgetAccount(params));
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
        form={registerForm}
        requiredMark={false}
        layout="vertical"
        onFinish={btnForgetPassword}
        onFinishFailed={onFinishFailed}
        initialValues={{
          username: phone || email || "",
        }}
        className="w-full h-full flex justify-between flex-col "
      >
        <div>
          <FormInput
            id="form-username"
            name="username"
            label="Email/ Số điện thoại đã đăng ký"
            type="phoneAndEmail"
            placeholder="Nhập Email/ Số điện thoại đã đăng ký"
            disabled={stateForgetPass.isLoading}
            className="mt-5 w-full"
            required
          />
        </div>

        <ButtonTMS
          id="form-button-signin"
          type="tms"
          htmlType="submit"
          loading={stateForgetPass.isLoading}
        >
          Tiếp tục
        </ButtonTMS>
        <hr className="mt-2 mb-2 border-neutral_color_1_2" />
      </Form>
      <div className="t-a-end">
        <span className="text-14 font-medium text-neutral_color_1_2">
          Bạn đã có tài khoản ?{" "}
          <a
            className="text-sm text-link text-left font-bold cursor-pointer"
            onClick={(e) => changeDirector(typeScreenManagerSignIn.SIGN_IN)}
          >
            {" "}
            Đăng nhập tại đây
          </a>
        </span>
      </div>
    </div>
  );

  /**************************** END **************************/
};

export default ForgetPassword;
