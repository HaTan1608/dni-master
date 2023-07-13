/* eslint-disable */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../../../services/actions/account.actions";
import { AppState } from "../../../types";
import FormInput from "src/components/form/FormInput";
import FormSelect from "src/components/form/FormSelect";

import { IFormRegister, IPropsSignIn } from "../interfaces";
import ButtonTMS from "../../../components/buttons/ButtonTMS";
import LogoSignIn from "./logoSignIn";
import { notifyError, notifySuccess } from "src/components/notification";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import "../styles.less";
import { defaultData } from "../data";

import {
  dataTypeCustomer,
  selectOptionsValue,
  typeScreenManagerSignIn,
  screenSignIn,
} from "src/constants";
import { localGetFormLogin } from "src/utils/localStorage";

const Register = (props: IPropsSignIn) => {
  const [registerForm] = Form.useForm();

  const dispatch = useDispatch();
  const isMount = useIsMount();
  const { stateRegister, phone, email } = useSelector(
    (state: AppState) => state.accountReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    let _formLogin = localGetFormLogin();
    if (!phone && !email && _formLogin) {
      let _dataUser = JSON.parse(_formLogin);
      if (_dataUser.username.search("@") !== -1) {
        registerForm.setFieldsValue({
          email: _dataUser.username,
        });
      } else {
        registerForm.setFieldsValue({
          phone: _dataUser.username,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateRegister;
    if (success) {
      notifySuccess("Đăng ký thành công");
      changeDirector(typeScreenManagerSignIn.CREATE_ACCOUNT_SUCCESS);
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateRegister.isLoading]);
  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const btnRegister = (values: IFormRegister) => {
    let params;
    params = {
      full_name: values.fullname.trim(),
      customer_type_id: values.groupUser,
      email: values.email.trim(),
      phone: values.phone.trim(),
      password: values.password.trim(),
    };
    dispatch(registerAccount(params));
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
        onFinish={btnRegister}
        onFinishFailed={onFinishFailed}
        initialValues={{
          email: email || "",
          phone: phone || "",
          groupUser: defaultData.typeCustomer,
        }}
        className="w-full h-full flex justify-between flex-col "
      >
        <div>
          <FormInput
            id="form-fullname"
            name="fullname"
            label="Tên khách hàng"
            type="text"
            placeholder="Họ tên đầy đủ khách hàng"
            disabled={stateRegister.isLoading}
            className="mt-1 mb-0 w-full"
            required
          />
          <FormSelect
            name="groupUser"
            label="Loại khách hàng"
            dataSource={dataTypeCustomer}
            placeholder="Chọn loại khách hàng"
            slOption={selectOptionsValue}
            classItem="mt-1 mb-0"
            disabled={stateRegister.isLoading}
          />
          <FormInput
            id="form-email"
            name="email"
            label="Email"
            type="email"
            placeholder="Nhập email"
            disabled={stateRegister.isLoading}
            classItem="mt-1 mb-0"
            required
          />
          <FormInput
            id="form-phone"
            name="phone"
            label="Số điện thoại"
            type="phone"
            placeholder="Nhập số điện thoại"
            disabled={stateRegister.isLoading}
            classItem="mt-1 mb-0"
            required
          />
          <FormInput
            id="form-password"
            name="password"
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            disabled={stateRegister.isLoading}
            classItem="mt-1 mb-0"
            required
          />
          {/* <FormInput
            id='form-rePassword'
            name='rePassword'
            label='Nhập lại mật khẩu'
            type='rePassword'
            placeholder="Nhập lại mật khẩu"
            disabled={stateRegister.isLoading}
            classItem='mt-3'
            required
          /> */}
          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            className="mt-1 mb-0"
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
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
        </div>

        <ButtonTMS
          id="form-button-signin"
          type="tms"
          htmlType="submit"
          loading={stateRegister.isLoading}
        >
          Đăng ký
        </ButtonTMS>
        <div className="text-center">
          <span>
            Bằng việc bạn bấm chọn đăng ký tức là bạn đã đồng ý với những chính
            sách & điều khoản của Nhất Tín
          </span>
        </div>
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

export default Register;
