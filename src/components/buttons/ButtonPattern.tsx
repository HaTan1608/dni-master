/* eslint-disable */
import { typeButtonUI } from "src/types";

const CONFIGBUTTON = {
  default: { className: "btn__tms" },
  tms: { className: "btn__tms" },

  primary: { className: "btn__primary" },
  secondary: { className: "btn__secondary" },
  danger: { className: "btn__danger" },
  light: { className: "btn__light" },
  green: { className: "btn__green" },
  secondGreen: { className: "btn__second_green" },
};

export function ButtonUI(this: any, type: typeButtonUI) {
  this.type = type;
  this.check = function () {
    const checkInClude = type in CONFIGBUTTON;
    return checkInClude;
  };
  this.render = function () {
    let _configuration: typeButtonUI = this?.type || "default";
    return CONFIGBUTTON[_configuration].className;
  };
}
