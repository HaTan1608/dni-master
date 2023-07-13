/* eslint-disable */
import imageLock from "../../../assets/images/Lock.svg";
import "../styles.less";
import { screenSignIn } from "src/constants";

const Otp = () => {
  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div
      className="flex-col flex items-center justify-start px-8 py-8"
      style={{ width: screenSignIn }}
    >
      <div>
        <img src={imageLock} alt="" />
      </div>
      <div className="text-center">
        <span className="text-18 font-bold">Lấy lại mật khẩu</span>
      </div>
      <div className="text-center">
        <span>
          Vui lòng kiểm tra email và làm theo hướng dẫn để lấy lại mật khẩu
        </span>
      </div>
    </div>
  );

  /**************************** END **************************/
};

export default Otp;
