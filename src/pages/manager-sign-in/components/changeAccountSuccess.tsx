/* eslint-disable */
import imageTickCheck from "../../../assets/images/TickCheck.svg";
import "../styles.less";
import { typeScreenManagerSignIn, screenSignIn } from "src/constants";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import { IPropsSignIn } from "../interfaces";

const ChangeAccountSuccess = (props: IPropsSignIn) => {
  const changeDirector = (values: number) => {
    props.changeType(values);
  };
  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div
      className="flex-col flex items-center justify-start px-8 py-8"
      style={{ width: screenSignIn }}
    >
      <div>
        <img src={imageTickCheck} alt="" />
      </div>
      <div className="text-center">
        <span className="text-18 font-bold">Tạo mật khẩu mới thành công</span>
      </div>
      <div className="text-center">
        <span>
          Chúc mừng bạn đã tạo mới mật khẩu thành công, bạn có thể tiến hành
          đăng nhập ngay bây giờ
        </span>
      </div>
      <ButtonTMS
        id="form-button-signin"
        type="tms"
        className="mt-3 w-full"
        onClick={() => changeDirector(typeScreenManagerSignIn.SIGN_IN)}
      >
        Đăng nhập
      </ButtonTMS>
    </div>
  );

  /**************************** END **************************/
};

export default ChangeAccountSuccess;
