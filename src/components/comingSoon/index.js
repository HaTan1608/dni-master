/* eslint-disable */
import ComingSoonIcon from "src/assets/images/ComingSoon.svg";
import "./styles.less";

export const ComingSoon = () => {
  return (
    <div className="flex-col flex items-center justify-start">
      <div>
        <img src={ComingSoonIcon} alt="" />
      </div>
      <div className="tms-comingsoon-text">
        <span className="text-20 text-neutral_color_1_2">
          Tính năng hiện chưa khả dụng. Vui lòng quay lại sau
        </span>
      </div>
    </div>
  );
};
