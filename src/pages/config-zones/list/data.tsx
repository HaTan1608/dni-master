import { Switch } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import SvgBannerEdit from "src/assets/svg/SvgBannerEdit";
import routerNames from "src/utils/data/routerName";

export const columnsZones = ({
  handleChangeZoneStatus,
  handleEditZone,
  roles
}: any) => {
  return [
    {
      title: "ID",
      dataIndex: "zone_id",
      key: "zone_id",
      render: (zone_id: string, record: any, index: number) => {
        return (
          <span
            className="text-Blue_2"
            onClick={() => handleEditZone(record)}
            style={{ cursor: "pointer" }}
          >
            {zone_id}
          </span>
        );
      },
    },
    {
      title: "Mã tuyến",
      dataIndex: "value",
      key: "value",
      render: (value: string, record: any, index: number) => {
        return <span>{value}</span>;
      },
    },
    {
      title: "Tên tuyến",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any, index: number) => {
        return <span>{name}</span>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
      key: "created",
      render: (created: string, record: any, index: number) => {
        return <span>{moment(created).format("YYYY-MM-DD HH:mm:ss")}</span>;
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated",
      key: "updated",
      render: (updated: string, record: any, index: number) => {
        return <span>{moment(updated).format("YYYY-MM-DD HH:mm:ss")}</span>;
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
            onChange={() => handleChangeZoneStatus(record)}
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
            {roles.find((x:any) => x === "config-zones") &&<Link to={`${routerNames.CONFIG_ZONES_EDIT}/${record.zone_id}`}>
              <SvgBannerEdit />
            </Link>}
          </div>
        );
      },
    },
  ];
};

export const dataStatus = [
  { label: "Đang hoạt động", value: "A" },
  { label: "Tạm dừng", value: "D" },
];
