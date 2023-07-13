import {Switch, Select } from "antd";
export const columnsDataZone = ({
  handleChangeWareHouseZoneStatus,
  roles
}: any) => {
  return [
    {
      title: "Tỉnh thành",
      dataIndex: "province_id",
      key: "province_id",
      width:"25%",
      render: (name: string, record: any, index: number) => {
        return <Select style={{width:"70%"}} value={record.province_name} disabled></Select>;
      },
    },
    {
      title: "Quận huyện",
      dataIndex: "district_id",
      key: "district_id",
      width:"25%",
      render: (name: string, record: any, index: number) => {
        return <Select style={{width:"70%"}} value={record.district_name} disabled></Select>;
      },
    },
    {
        title: "Ngày thêm",
        dataIndex: "created_at",
        key: "created_at",
        render: (created: string, record: any, index: number) => {
          return (
            <div>{record.created_at}</div>
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
            disabled={roles.find((x:any) => x === "update-routing-area")?false:true}
            onChange={() => handleChangeWareHouseZoneStatus(record)}
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