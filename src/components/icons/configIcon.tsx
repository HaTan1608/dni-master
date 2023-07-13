/* eslint-disable */
import { typeIconUI } from "./typesIcon";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgIconHide from "src/assets/svg/SvgIconHide";
import SvgIconFilter from "src/assets/svg/SvgIconFilter";
import SvgIconDisplay from "src/assets/svg/SvgIconDisplay";
import SvgIconBan from "src/assets/svg/SvgIconBan";
import SvgIconKey from "src/assets/svg/SvgIconKey";
import SvgIconLock from "src/assets/svg/SvgIconLock";
import SvgIconMoveLeft from "src/assets/svg/SvgIconMoveLeft";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";

const CONFIG_ICON = (icon: typeIconUI, fill?: string) => {
  return {
    default: null,
    show: <SvgIconDisplay fill={fill} />,
    hide: <SvgIconHide fill={fill} />,
    ban: <SvgIconBan fill={fill} />,
    key: <SvgIconKey fill={fill} />,
    lock: <SvgIconLock fill={fill} />,
    plus: <SvgIconPlus fill={fill} />,
    search: <SvgIconSearch fill={fill} />,
    storage: <SvgIconStorage fill={fill} />,
    moveLeft: <SvgIconMoveLeft fill={fill} />,
    filter: <SvgIconFilter fill={fill} />,
    moveLeft2: <SvgIconMoveLeft fill={fill} />,
    moveRight: <SvgIconMoveLeft fill={fill} />,
    down: <SvgIconMoveLeft fill={fill} />,
  };
};

export default CONFIG_ICON;
