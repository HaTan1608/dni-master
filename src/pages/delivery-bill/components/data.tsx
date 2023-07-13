/* eslint-disable */
import moment from "moment";

const colorLabel = "rgb(128,138,148)";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};

export const columnsDoiXe = ({}: any) => {
  return [
    {
      title: "Mã xe",
      dataIndex: "id",
      key: "id",
      render: (id: string, record: any, index: number) => {
        return <span className="text-Blue_2">{id}</span>;
      },
    },
    {
      title: "Thông tin xe",
      dataIndex: "value",
      key: "value",
      render: (value: string, record: any, index: number) => {
        return (
          <>
            {record.vehicle_id === 0 && (
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
export const typeCar = [
  { label: "Xe cont", value: "1" },
  { label: "Xe tải", value: "2" },
];

export const columnsLogs = [
  {
    title: "Vận hành",
    dataIndex: "action_name",
  },
  {
    title: "Ga/Kho",
    dataIndex: "location",
  },

  {
    title: "Thời gian",
    dataIndex: "created_at",
  },
];

export const columnsTrouble = [
  {
    title: "Chi tiết sự cố",
    dataIndex: "issue_name",
  },
  {
    title: "Admin",
    dataIndex: "created_by",
    render: (created_by: string, record: any, index: number) => {
      return <div>{record?.created_by}</div>;
    },
  },

  {
    title: "Thời gian",
    dataIndex: "updated_at",
    render: (confirmed_at: string, record: any, index: number) => {
      return (
        <span>
          {record?.updated_at &&
            moment(record?.updated_at).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      );
    },
  },
];

export const getStatusColor = (e?: any) => {
  if (e === 1) {
    return {
      label: "Chờ lấy hàng",
      color: "rgb(128,138,148)",
    };
  }
  if (e === 2) {
    return {
      label: "Đã nhận hàng",
      color: "rgb(53,157,217)",
    };
  }
  if (e === 3) {
    return {
      label: "Nằm tại kho",
      color: "rgb(64,186,255)",
    };
  }
  if (e === 4) {
    return {
      label: "Đã nhận hàng",
      color: "rgb(53,157,217)",
    };
  }
  if (e === 5) {
    return {
      label: "Nhập kho",
      color: "rgb(53,157,217)",
    };
  }
  if (e === 6) {
    return {
      label: "Đang luân chuyển",
      color: "rgb(22,93,149)",
    };
  }
  if (e === 7) {
    return {
      label: "Đang giao hàng",
      color: "rgb(22,93,149)",
    };
  }
  if (e === 8) {
    return {
      label: "Chờ giao lại",
      color: "rgb(240,153,82)",
    };
  }
  if (e === 9) {
    return {
      label: "Đang chuyển hoàn",
      color: "rgb(22,93,149)",
    };
  }
  if (e === 10) {
    return {
      label: "Đã duyệt hoàn",
      color: "rgb(53,157,217)",
    };
  }
  if (e === 11) {
    return {
      label: "Hủy",
      color: "rgb(218,50,54)",
    };
  }
  if (e === 12) {
    return {
      label: "Lỗi lấy hàng",
      color: "rgb(137,55,223)",
    };
  }
  if (e === 13) {
    return {
      label: "Lỗi giao hàng",
      color: "rgb(216,76,87)",
    };
  }
  if (e === 14) {
    return {
      label: "Chuyển hoàn thành công",
      color: "rgb(64,192,118)",
    };
  }
  if (e === 15) {
    return {
      label: "Giao thành công",
      color: "rgb(66,174,164)",
    };
  }
  return {
    label: "Giao thành công",
    color: "rgb(66,174,164)",
  };
};
