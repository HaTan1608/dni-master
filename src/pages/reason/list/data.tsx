/* eslint-disable */
import {Switch } from "antd";
import { Link } from "react-router-dom";
import SvgBannerEdit from "src/assets/svg/SvgBannerEdit";
import routerNames from "src/utils/data/routerName";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};

export const columnsData = ({
  handleChangeReasonStatus,
  handleEditReason,
  roles
}: any) => {
  return [
    {
      title: "Mã sự cố",
      dataIndex: "reason_code",
      key: "reason_code",
      render: (reason_code: string, record: any, index: number) => {
        return (
          <span
            className="text-Blue_2"
            onClick={() => handleEditReason(record)}
            style={link}
          >
            {reason_code}
          </span>
        );
      },
    },
    {
      title: "Tên sự cố",
      dataIndex: "reason_name",
      key: "reason_name",
      render: (name: string, record: any, index: number) => {
        return <div>{record.reason_name}</div>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (name: string, record: any, index: number) => {
        return <div>{record.created_at}</div>;
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (created: string, record: any, index: number) => {
        return (
          <div>{record.updated_at}</div>
        );
      },
    },
    {
      title: "Loại sự cố",
      dataIndex: "reason_type",
      key: "reason_type",
      render: (reason_type: string, record: any, index: number) => {
        return (
          <div>{reason_type === "P" ? "Sự cố nhận hàng" : "Sự cố trả hàng"}</div>
          // <Switch
          //   checked={status === "P" ? true : false}
          //   onChange={() => handleChangeReasonStatus(record)}
          // />
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <Switch
            checked={status === "A" ? true : false}
            disabled={roles.find((x:any) => x === "modify-reason")?false:true}
            onChange={() => handleChangeReasonStatus(record)}
          />
        );
      },
    },
  ];
}
export const dataReasonType = [
  { label: "Sự cố nhận", value: "P" },
  { label: "Sự cố trả", value: "D" },
];
export const dataStatus = [
  { label: "Đang hoạt động", value: "A" },
  { label: "Tạm dừng", value: "D" },
];