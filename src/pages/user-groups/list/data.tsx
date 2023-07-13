/* eslint-disable */
import { Switch, Popconfirm } from "antd";
import moment from "moment";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import { DATEFULLTIME, PAGE_SIZE_DEFAULT } from "src/constants";
import routerNames from "src/utils/data/routerName";
import { typePropsColumn } from "./interfaces";
import { Link } from "react-router-dom";
export const columnsData = ({ btnOpenModal, handleChangeReasonStatus,roles }: any) => {
  return [
    {
      title: "Mã nhóm",
      dataIndex: "id",
      key: "id",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return (
          roles.find((x:any) => x === "get-user-group-functions")?<Link
            to={(location) => ({
              ...location,
              pathname: `${routerNames.USER_GROUPS}/${record.id}`,
              state: record,
            })}
          >
            <span className="text-accent_color_5_2">{text}</span>
          </Link>:<span>{text}</span>
        );
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role_name",
      width: "25%",
      render: (text: string, record: any, index: number) => (
        <span className="text-neutral_color_1_2">{text}</span>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: "25%",
      render: (text: string, record: any, index: number) => (
        <span className="text-neutral_color_1_2">
          {moment(text).format(DATEFULLTIME)}
        </span>
      ),
    },
    {
      title: "Ngày cập nhật cuối",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "25%",
      render: (text: string, record: any, index: number) => (
        <span className="text-neutral_color_1_2">
          {moment(text).format(DATEFULLTIME)}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      render: (status: string, record: any, index: number) => {
        return (
            <Switch checked={status === "A" ? true : false} onChange={() => handleChangeReasonStatus(record)} disabled={roles.find((x:any) => x === "update-user-group")?false:true} />
        );
      },
    },
  ];
};
const content = (props: typePropsColumn, record: any) => (
  <div className="px-1" style={{ width: 200 }}>
    {/* <button
      onClick={() => props.btnOpenUpdatePassword(record)}
      className='flex items-center justify-start my-1'>
      <DIcon icon="lock" />
      <p className='text-14 px-2'>Đổi mật khẩu</p>
    </button> */}
    <button
      onClick={() => props.btnOpenModal(record)}
      className="flex items-center justify-start my-1"
    >
      <SvgIconEdit />
      <p className="text-14 px-2">Chỉnh sửa</p>
    </button>
  </div>
);

export const selectOptions = {
  name: "name",
  value: "value",
};

export const dataOptionsOnline = [
  { name: "Hiển thị", value: "A" },
  { name: "Ẩn", value: "D" },
];

export const defaultFilter = {
  status: undefined,
  q: "",
  currentPage: 1,
  sizePage: PAGE_SIZE_DEFAULT,
  isDispatch: false,
};

export const dataDefault = [
  {
    id: "QL00000001",
    roles_name: "Admin",
    created_at: 1651167240000,
    updated_at: 1651167240000,
    status: "A",
  },
  {
    id: "QL00000002",
    roles_name: "Care hàng",
    created_at: 1651167240000,
    updated_at: 1651167240000,
    status: "A",
  },
];
