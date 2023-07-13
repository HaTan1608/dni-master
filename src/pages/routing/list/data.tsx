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
  handleChangeRoutingStatus,
  handleEditRouting,
  roles
}: any) => {
  return [
    {
      title: "Mã tuyến đường",
      dataIndex: "routing_code",
      key: "routing_code",
      render: (id: string, record: any, index: number) => {
        return (
          <span
            className="text-Blue_2"
            onClick={() => handleEditRouting(record)}
            style={link}
          >
            {id}
          </span>
        );
      },
    },
    {
      title: "Tên tuyến đường",
      dataIndex: "routing_name",
      key: "routing_name",
      render: (name: string, record: any, index: number) => {
        return <div>{record.routing_name}</div>;
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
      title: "TT hoạt động",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <Switch
            checked={status === "A" ? true : false}
            disabled={roles.find((x:any) => x === "modify-route")?false:true}
            onChange={() => handleChangeRoutingStatus(record)}
          />
        );
      },
    },
    {
      dataIndex: null,
      key: null,
      render: (text: string, record: any, index: number) => {
        return (
          <div className="bannerAction">
            <Link to={`${routerNames.ROUTING}/${record.id}`}>
              <SvgBannerEdit />
            </Link>
          </div>
        );
      },
    },
  ];
}
export const dataStatus = [
  { label: "Đang hoạt động", value: "A" },
  { label: "Tạm dừng", value: "D" },
];
