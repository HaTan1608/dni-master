import {Switch } from "antd";
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
      title: "ID",
      dataIndex: "user_id",
      key: "user_id",
      render: (id: string, record: any, index: number) => {
        return (
          <span
            className="text-Blue_2"
            style={link}
          >
            {id}
          </span>
        );
      },
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
      key: "full_name",
      render: (full_name: string, record: any, index: number) => {
        return <div>{record.full_name}</div>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
        title: "Ngày thêm",
        dataIndex: "created_at",
        key: "created_at",
      },
    {
      title: "TT hoạt động",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <Switch
            checked={status === "A" ? true : false}
            disabled={roles.find((x:any) => x === "update-warehouse-user")?false:true}
            onChange={() => handleChangeWareHouseStatus(record)}
          />
        );
      },
    },
  ];
}
export const dataStatus = [
  { label: "Đang hoạt động", value: "A" },
  { label: "Tạm dừng", value: "D" },
];