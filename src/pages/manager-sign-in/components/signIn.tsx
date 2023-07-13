/* eslint-disable */
import { Form } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAccount } from "../../../services/actions/account.actions";
import { AppState } from "../../../types";
import FormInput from "src/components/form/FormInput";

import { IFormSignIn, IPropsSignIn } from "../interfaces";
import ButtonTMS from "../../../components/buttons/ButtonTMS";
import LogoSignIn from "./logoSignIn";
import { notifyError, notifySuccess } from "src/components/notification";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import {
  localGetFormLogin,
  localSaveAccount,
  localSaveAuthUUID,
  localSaveFormLogin,
  localSaveToken,
} from "src/utils/localStorage";
import { useHistory } from "react-router-dom";
import "../styles.less";
import { useAuth } from "src/services/authorRouter";
import { textVersion } from "src/utils/text";
import { typeScreenManagerSignIn, screenSignIn } from "src/constants";

const SignIn = (props: IPropsSignIn) => {
  const [signInForm] = Form.useForm();

  const auth = useAuth();
  const dispatch = useDispatch();
  const isMount = useIsMount();
  let history = useHistory();
  const { stateSignIn, phone, email } = useSelector(
    (state: AppState) => state.accountReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    let _formLogin = localGetFormLogin();
    if (!phone && !email && _formLogin) {
      let _dataUser = JSON.parse(_formLogin);
      signInForm.setFieldsValue({
        username: _dataUser.username,
        // password: _dataUser.password
      });
    }
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateSignIn;
    if (success) {
      localSaveAccount(JSON.stringify(data));
      localSaveToken(data.token || "");
      localSaveAuthUUID(data.uuid || "");
      localSaveFormLogin(
        JSON.stringify({
          username: phone || email || signInForm.getFieldValue("username"),
          warehouse: data.warehouse,
          // password: signInForm.getFieldValue('password'),
        })
      );
      auth.signIn(data.token || "", JSON.stringify(data), () => {
        console.log("Save authorization!");
        notifySuccess("Đăng nhập thành công");
        history.push({
          pathname: "dashboard",
        });
      });
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateSignIn.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const btnSignIn = (values: IFormSignIn) => {
    let params;
    if (values.username.search("@") !== -1) {
      params = {
        email: values.username.trim(),
        password: values.password.trim(),
        username: values.username.trim(),
      };
    } else {
      params = {
        phone: values.username.trim(),
        password: values.password.trim(),
        username: values.username.trim(),
      };
    }
    dispatch(signInAccount(params));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const changeDirector = (values: number) => {
    if (stateSignIn.isLoading) return;
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
        form={signInForm}
        requiredMark={false}
        layout="vertical"
        onFinish={btnSignIn}
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
            label="Email/ Số điện thoại"
            type="phoneAndEmail"
            placeholder="Nhập Email/ Số điện thoại"
            disabled={stateSignIn.isLoading}
            className="mt-1 mb-0 w-full"
            required
          />
          <FormInput
            id="form-password"
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            classItem="mt-1 mb-0"
            disabled={stateSignIn.isLoading}
            type="password"
            required
          />

          <div className="w-full mt-1 mb-4">
            <a
              className="text-sm text-link text-left font-normal cursor-pointer"
              onClick={(e) =>
                changeDirector(typeScreenManagerSignIn.FORGET_PASSWORD)
              }
            >
              Quên mật khẩu
            </a>
          </div>
        </div>

        <ButtonTMS
          id="form-button-signin"
          type="tms"
          htmlType="submit"
          loading={stateSignIn.isLoading}
        >
          Đăng nhập
        </ButtonTMS>
        <div className="t-a-end">
          <span className="text-14 font-medium text-neutral_color_1_4">
            {textVersion}
          </span>
        </div>
        <hr className="mt-2 mb-2 border-neutral_color_1_2" />
      </Form>
      <div className="t-a-end">
        <span className="text-14 font-medium text-neutral_color_1_2">
          Bạn chưa có tài khoản ?{" "}
          <a
            className="text-sm text-link text-left font-bold cursor-pointer"
            onClick={(e) => changeDirector(typeScreenManagerSignIn.REGISTER)}
          >
            {" "}
            Đăng ký tại đây
          </a>
        </span>
      </div>
    </div>
  );

  /**************************** END **************************/
};

export default SignIn;
