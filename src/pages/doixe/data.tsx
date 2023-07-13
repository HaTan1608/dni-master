import { Switch } from "antd";
const colorLabel = "rgb(128,138,148)";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};

export const columnsDoiXe = ({
  handleChangeDoiXeStatus,
  handleEditDoiXe,
  roles,
}: any) => {
  return [
    {
      title: "Mã xe",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      render: (maxe: string, record: any, index: number) => {
        return (
          <span
            className="text-Blue_2"
            onClick={() => handleEditDoiXe(record)}
            style={link}
          >
            {maxe}
          </span>
        );
      },
    },
    {
      title: "Thông tin xe",
      dataIndex: "value",
      key: "value",
      render: (value: string, record: any, index: number) => {
        return (
          <>
            {record.vehicle_id == 0 && (
              <div>
                <span style={{ color: colorLabel }}>Tên xe:</span> Xe thuê ngoài
              </div>
            )}
            {record.vehicle_id != 0 && (
              <div>
                <span style={{ color: colorLabel }}>Tên xe:</span>{" "}
                {record.vehicle_name}
              </div>
            )}
            <div>
              <span style={{ color: colorLabel }}>Biển số xe:</span>{" "}
              {record.vehicle_number}
            </div>
          </>
        );
      },
    },
    {
      title: "Tên tài xế",
      dataIndex: "user_name",
      key: "user_name",
      render: (name: string, record: any, index: number) => {
        return (
          <>
            {" "}
            <div>
              <span style={{ color: colorLabel }}>Họ tên:</span>{" "}
              {record.user_name}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Mã nhân viên:</span>{" "}
              {record.user_id}
            </div>{" "}
            <div>
              <span style={{ color: colorLabel }}>SĐT:</span>{" "}
              <span style={link}>{record.user_phone}</span>
            </div>
          </>
        );
      },
    },
    {
      title: "Ngày tạo",
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
          <>
            <div>
              <span style={{ color: colorLabel }}>Ngày tạo: </span>
              {record.created_at}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Cập nhật cuối: </span>
              {record.updated_at}
            </div>
          </>
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
            disabled={roles.find((x:any) => x === "modify-doi-xe")?false:true}
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
export const typeCar = [
  { label: "Xe cont", value: "1" },
  { label: "Xe tải", value: "2" },
];