import routerNames from "src/utils/data/routerName";

export const PHONE = "phone";
export const TEXT = "text";
export const PASSWORD = "password";
export const REPASSWORD = "rePassword";
export const EMAIL = "email";
export const URL = "url";
export const EMPTY = "empty";
export const NEW_PASSWORD = "new-password";
export const PHONEANDEMAIL = 'phoneAndEmail';
export const NUMBER = 'number';
export const OFF = "off";

export const DATE = "DD/MM/YYYY";
export const DATETIME = "DD/MM/YYYY HH:mm";
export const DATEFULLTIME = "DD/MM/YYYY HH:mm:ss";

export const MESSAGE_VALIDATE = {
  text: {
    type: "text",
    placeholder: "",
    message: "Không được bỏ trống!",
  },
  phone: {
    type: "number",
    placeholder: "Nhập số điện thoại",
    message: "Vui lòng nhập số điện thoại!",
    errorMess: "Số điện thoại chưa đúng định dạng!",
  },
  email: {
    placeholder: "Nhập email",
    message: "Vui lòng nhập email!",
    errorMess: "Email chưa đúng định dạng!",
  },
  phoneAndEmail: {
    // placeholder: "Nhập số điện thoại hoặc email",
    message: "Vui lòng nhập số điện thoại hoặc email!",
    // errorMess: "Email chưa đúng định dạng!",
  },
  password: {
    placeholder: "Nhập password",
    message: "Vui lòng nhập password!",
    atleast: "Mật khẩu tối thiểu tám ký tự",
    character:
      "Mật khẩu chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt",
  },
  rePassword: {
    placeholder: "Nhập lại password",
    message: "Vui lòng nhập password!",
    atleast: "Mật khẩu tối thiểu tám ký tự",
    character:
      "Mật khẩu chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt",
  },
  url: {
    placeholder: "Nhập url",
    message: "Vui lòng nhập url!",
    errorMess: "URL chưa đúng định dạng",
  },
  empty: {
    placeholder: '',
    message: "Vui lòng nhập đầy đủ!",
  }
};
export const dataTypeCustomer=[
  {value: 1,name: 'Cá nhân'},
  {value: 2,name: 'Doanh nghiệp'},
];
export const dataGroupCustomer=[
  {value: 1,name: 'Khách hàng chuẩn'},
];
export const dataGender = [
  { name: 'Nam', value: '0' },
  { name: 'Nữ', value: '1' },
]

export const selectOptionsId = {
  name: 'name',
  value: 'id'
}

export const selectOptionsValue = {
  name: 'name',
  value: 'value'
}
export const screenSignIn = 445;
export const typeScreenManagerSignIn={
  SIGN_IN: 1,
  REGISTER: 2,
  FORGET_PASSWORD: 3,
  CREATE_ACCOUNT_SUCCESS: 4,
  ACTIVE_ACCOUNT_SUCCESS: 5,
  OTP: 6,
  CHANGE_PASSWORD: 7,
  CHANGE_PASSWORD_SUCCESS: 8,
};
export const EXPORT_TEMPLATE_TYPE = {
  TEMPLATE_BILL_BY_ONE_CUSTOMER: 'CBO',
  TEMPLATE_CUSTOMER_BY_ADMIN: 'CCBS'
};
export const PAGE_SIZE_DEFAULT = 10;
export const dataOptionsStatus = [{ name: 'Hiển thị', value: 'A' }, { name: 'Ẩn', value: 'D' }];
export const routerNotAuth = [routerNames.ACTIVE_OTP];
export const statusTag: any = {
  1: {
    color: '#808A94',
    name: 'Chờ lấy hàng'
  },
  2: {
    color: '#38C173',
    name: 'Đã lấy hàng'
  }
}
export const ROLES_SYSTEM = ["A","E"];
export const ROLES_CUSTOMER = ["C"];