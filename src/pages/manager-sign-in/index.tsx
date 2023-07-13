/* eslint-disable */
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import imageBG from "../../assets/images/BGLogin.jpg";
import SignInPage from "./components/signIn";
import Register from "./components/register";
import ForgetPassword from "./components/forgetPassword";
import CreateAccountSuccess from "./components/createAccountSuccess";
import ActiveAccountSuccess from "./components/activeAccountSuccess";
import ChangeAccountSuccess from "./components/changeAccountSuccess";
import ChangePassword from "./components/changePassword";
import Otp from "./components/otp";
import "./styles.less";
import { typeScreenManagerSignIn } from "src/constants";
import imageLogo from "../../assets/images/LogoTransportNew.svg";

const ManagerSignIn = (props: any) => {
  const [renderType, setRenderType] = useState(typeScreenManagerSignIn.SIGN_IN);
  // const refForm = createRef<FormInstance>();

  // const auth = useAuth();
  // const dispatch = useDispatch();
  // const isMount = useIsMount();
  // let history = useHistory();
  // const { width, height } = useWindowDimensions();

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    const _checkConfirm =
      props.location && props.location.state && props.location.state.typeScreen;
    console.log(_checkConfirm);
    if (_checkConfirm) {
      setRenderType(+_checkConfirm);
    }
  }, []);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */
  const changeType = (values: number) => {
    setRenderType(values);
  };

  const _renderForm = () => {
    switch (renderType) {
      case typeScreenManagerSignIn.REGISTER:
        return <Register changeType={changeType} />;
      case typeScreenManagerSignIn.FORGET_PASSWORD:
        return <ForgetPassword changeType={changeType} />;
      case typeScreenManagerSignIn.CREATE_ACCOUNT_SUCCESS:
        return <CreateAccountSuccess />;
      case typeScreenManagerSignIn.OTP:
        return <Otp />;
      case typeScreenManagerSignIn.CHANGE_PASSWORD:
        return <ChangePassword changeType={changeType} />;
      case typeScreenManagerSignIn.ACTIVE_ACCOUNT_SUCCESS:
        return <ActiveAccountSuccess changeType={changeType} />;
      case typeScreenManagerSignIn.CHANGE_PASSWORD_SUCCESS:
        return <ChangeAccountSuccess changeType={changeType} />;

      default:
        return <SignInPage changeType={changeType} />;
    }
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <Row style={{ height: "100vh", overflow: "hidden" }}>
      <Col xs={0} sm={0} md={14} lg={14} xl={14}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
            }}
          >
            <img
              src={imageBG}
              alt=""
              style={{ minHeight: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ position: "absolute", top: "3%", left: "3%" }}>
            <img src={imageLogo} alt="" />
          </div>
        </div>
      </Col>

      <Col
        xs={24}
        sm={24}
        md={10}
        lg={10}
        xl={10}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        {_renderForm()}
      </Col>
    </Row>
  );

  /**************************** END **************************/
};

export default ManagerSignIn;
