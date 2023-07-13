/* eslint-disable */
import { Switch } from "antd";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};

export const columnsSoCont = ({
  handleChangeDoiXeStatus,
  handleEditDoiXe,
  roles
}: any) => {
  return [
    {
      title: "Biển số xe",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      render: (id: string, record: any, index: number) => {
        return (
          <span
            className="text-Blue_2"
            onClick={() => handleEditDoiXe(record)}
            style={link}
          >
            {id}
          </span>
        );
      },
    },
    {
      title: "Tên cont",
      dataIndex: "vehicle_name",
      key: "vehicle_name",
      render: (name: string, record: any, index: number) => {
        return <div>{record.vehicle_name}</div>;
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
          // <>
          //   <div>
          //     <span style={{ color: colorLabel }}>Ngày tạo:</span>
          //     {moment(record.created_at).format("DD-MM-YYYY HH:mm:ss")}
          //   </div>
          //   <div>
          //     <span style={{ color: colorLabel }}>Cập nhật cuối:</span>
          //     {moment(record.updated_at).format("DD-MM-YYYY HH:mm:ss")}
          //   </div>
          // </>

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
            disabled={roles.find((x:any) => x === "modify-cont")?false:true}
            onChange={() => handleChangeDoiXeStatus(record)}
          />
        );
      },
    },
    // {
    //   dataIndex: null,
    //   key: null,
    //   render: (text: string, record: any, index: number) => {
    //     return (
    //       <div className="bannerAction">
    //         <Link to={`${routerNames.CONFIG_ZONES_EDIT}/${record.zone_id}`}>
    //           <SvgBannerEdit />
    //         </Link>
    //       </div>
    //     );
    //   },
    // },
  ];
};

export const dataStatus = [
  { label: "Đang hoạt động", value: "A" },
  { label: "Tạm dừng", value: "D" },
];

export const defaultData = [
  {
    id: "JAR002",
    name: "JAR002",
    status: "A",
    created_at: "22-04-2021 03:30:22",
    updated_at: "15-08-2021 03:03:03",
  },
  {
    id: "JAV003",
    name: "JAV003",

    status: "D",
    created_at: "22-04-2021 03:30:22",
    updated_at: "15-08-2021 03:03:03",
  },
];
