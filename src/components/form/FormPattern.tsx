/* eslint-disable */
import { typeMess } from "../../types";
import {
  MESSAGE_VALIDATE,
  PHONE,
  EMAIL,
  PHONEANDEMAIL,
  PASSWORD,
  TEXT,
} from "../../constants/index";
import {
  validateEmail,
  isVietnamesePhoneNumber,
  validatePassword,
} from "../../utils/helpers/functions/textUtils";

const strageties: any = {
  phone: function () {
    return [
      {
        required: true,
        message: MESSAGE_VALIDATE[PHONE].message,
      },
      () => ({
        validator(_: any, value: any) {
          if (!value || isVietnamesePhoneNumber(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(MESSAGE_VALIDATE[PHONE].errorMess));
        },
      }),
    ];
  },
  email: function () {
    return [
      {
        required: true,
        message: MESSAGE_VALIDATE[EMAIL].message,
      },
      () => ({
        validator(_: any, value: any) {
          if (!value || validateEmail(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(MESSAGE_VALIDATE[EMAIL].errorMess));
        },
      }),
    ];
  },
  phoneAndEmail: function () {
    return [
      {
        required: true,
        message: MESSAGE_VALIDATE[PHONEANDEMAIL].message,
      },
      () => ({
        validator(_: any, value: any) {
          if (value && value.search("@") === -1) {
            if (!value || isVietnamesePhoneNumber(value)) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(MESSAGE_VALIDATE[PHONE].errorMess));
          } else {
            if (!value || validateEmail(value)) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(MESSAGE_VALIDATE[EMAIL].errorMess));
          }
        },
      }),
    ];
  },
  password: function () {
    return [
      {
        required: true,
        message: MESSAGE_VALIDATE[PASSWORD].message,
      },
      () => ({
        validator(_: any, value: any) {
          const validatePass = validatePassword(value);
          if (!value || validatePass) return Promise.resolve();
          const PASS_REQUIRED_LENGTH = 8;
          if (value.length < PASS_REQUIRED_LENGTH) {
            return Promise.reject(
              new Error(MESSAGE_VALIDATE[PASSWORD].atleast)
            );
          }
          return Promise.reject(
            new Error(MESSAGE_VALIDATE[PASSWORD].character)
          );
        },
      }),
    ];
  },
  // rePassword: function () {
  //   return [
  //     {
  //       required: true,
  //       message: MESSAGE_VALIDATE[REPASSWORD].message,
  //     },
  //     ({ getFieldValue }) => ({
  //       validator(_: any, value: any) {
  //         const valueCompare = getFieldValue('password');

  //         if (!value) return Promise.resolve();
  //         // if (!value || getFieldValue('password') === value) {
  //         //   return Promise.resolve();
  //         // }
  //         // return Promise.reject(new Error('The two passwords that you entered do not match!'));
  //         Promise.resolve();
  //         // if (value) {
  //         //   return Promise.reject(
  //         //     new Error(MESSAGE_VALIDATE[REPASSWORD].atleast)
  //         //   );
  //         // }
  //         // return Promise.reject(
  //         //   new Error(MESSAGE_VALIDATE[REPASSWORD].character)
  //         // );
  //       },
  //     }),
  //   ];
  // },
  text: function () {
    return [
      {
        required: true,
        message: MESSAGE_VALIDATE[TEXT].message,
      },
      // () => ({
      //   validator(_: any, value: any) {
      //     if (!value || isVietnamesePhoneNumber(value)) {
      //       return Promise.resolve();
      //     }
      //     return Promise.reject(new Error(MESSAGE_VALIDATE["phone"].errorMess));
      //   },
      // }),
    ];
  },
};

export function FormInstance(
  this: any,
  type: string | any,
  value: string = ""
) {
  this.type = type;
  this.value = value ?? "";
  const checkStrageties = type in strageties;
  this.noValidate = function () {
    return [];
  };
  this.validate = function () {
    if (!checkStrageties) return [];
    return strageties[this.type]();
  };
  this.placeholder = function () {
    if (!checkStrageties) return "Nhập nội dung";
    // return MESSAGE_VALIDATE[this?.type ?? "empty"]?.placeholder;
    let messValid: typeMess = this?.type || "empty";
    return MESSAGE_VALIDATE[messValid]?.placeholder;
  };
}
