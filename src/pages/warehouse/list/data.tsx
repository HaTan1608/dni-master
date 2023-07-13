import { Switch } from "antd";
import { Link } from "react-router-dom";
import SvgBannerEdit from "src/assets/svg/SvgBannerEdit";
import routerNames from "src/utils/data/routerName";
import { getAddressString } from "src/utils/helpers/functions/textUtils";
// import { typePropsColumn } from "./interfaces";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};

export const columnsData = ({
  handleChangeWareHouseStatus,
  handleEditWareHouse,
  roles
}: any) => {
  return [
    {
      title: "Mã kho",
      dataIndex: "ws_code",
      key: "ws_code",
      render: (id: string, record: any, index: number) => {
        return (
          <span
            className="text-Blue_2"
            onClick={() => handleEditWareHouse(record)}
            style={link}
          >
            {id}
          </span>
        );
      },
    },
    {
      title: "Tên kho",
      dataIndex: "ws_name",
      key: "ws_name",
      render: (name: string, record: any, index: number) => {
        return <div>{record.ws_name}</div>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "vehicle_name",
      key: "vehicle_name",
      render: (name: string, record: any, index: number) => {
        return getAddressString(record.address,record.ward_name,record.district_name,record.province_name);
      },
    },
    {
      title: "Người liên hệ",
      dataIndex: "contact_name",
      key: "contact_name",
      render: (name: string, record: any, index: number) => {
        return <div>{record.contact_name||''}</div>;
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
            disabled={roles.find((x:any) => x === "modify-warehouse")?false:true}
            onChange={() => handleChangeWareHouseStatus(record)}
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
            <Link to={`${routerNames.WAREHOUSE}/${record.id}`} >
              <SvgBannerEdit fill="#ADB4BB"/>
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
