/* eslint-disable */
import { Switch } from "antd";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};

export const columnsMaChuyen = ({
  handleChangeDoiXeStatus,
  handleEditDoiXe,
  roles
}: any) => {
  return [
    {
      title: "Mã tàu",
      dataIndex: "train_number",
      key: "train_number",
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
      title: "Tên chuyến",
      dataIndex: "description",
      key: "description",
      render: (name: string, record: any, index: number) => {
        return <div>{record.description}</div>;
      },
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier_id",
      key: "supplier_id",
      render: (name: string, record: any, index: number) => {
        return <div>{record.supplier_name}</div>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any, index: number) => {
        return <div>{record.created_at}</div>;
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: null,
      key: null,
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
            disabled={roles.find((x:any) => x === "modify-ma-chuyen")?false:true}
            onChange={() => handleChangeDoiXeStatus(record)}
          />
        );
      },
    },
  ];
};

export const dataStatus = [
  { label: "Đang hoạt động", value: "A" },
  { label: "Tạm dừng", value: "D" },
];

export const defaultFilter = {
  status: undefined,
  q: "",
  vehicle_type: "1",
  currentPage: 1,
  sizePage: 20,
};
