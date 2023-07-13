/* eslint-disable */
import imageEmail from "../../../assets/images/Email.svg";
import "../styles.less";
import { screenSignIn } from "src/constants";

const CreateAccountSuccess = () => {
  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div
      className="flex-col flex items-center justify-start px-8 py-8"
      style={{ width: screenSignIn }}
    >
      <div>
        <img src={imageEmail} alt="" />
      </div>
      <div className="text-center">
        <span className="text-18 font-bold">Tạo tài khoản thành công</span>
      </div>
      <div className="text-center">
        <span>Vui lòng kiểm tra Email để kích hoạt tài khoản</span>
      </div>
    </div>
  );

  /**************************** END **************************/
};

export default CreateAccountSuccess;
