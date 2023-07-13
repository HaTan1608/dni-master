import moment from "moment";

export const paymentMethod = [
  {
    label: "Người gửi thanh toán trước (NGTTN)",
    value: 1,
  },
  {
    label: "Người nhận thanh toán sau (NNTTS)",
    value: 2,
  },
  {
    label: "Người gửi thanh toán sau (NGTTS)",
    value: 3,
  },
];

export const commoType = [
  {
    label: "Hàng điện tử",
    value: 1,
  },
  {
    label: "Hàng dễ vỡ",
    value: 2,
  },
  {
    label: "Hàng thời trang",
    value: 3,
  },
  {
    label: "Thực phẩm",
    value: 4,
  },

  {
    label: "Khác",
    value: 5,
  },
];

export const shippingMethod = [
  {
    label: "Từ Ga đến Ga",
    value: 1,
  },
  {
    label: "Từ Ga đến Kho",
    value: 2,
  },
  {
    label: "Từ Kho đến Ga",
    value: 3,
  },
  {
    label: "Từ Kho đến Kho",
    value: 4,
  },
];

export const services = [
  {
    label: "36 giờ",
    value: 1,
  },
  {
    label: "48 giờ",
    value: 2,
  },
];

export const sortBy = [
  {
    label: "Mã đơn hàng (A-Z)",
    value: 1,
  },
  {
    label: "Mã đơn hàng (Z-A)",
    value: 2,
  },
  {
    label: "Ngày tạo (Mới-Cũ)",
    value: 3,
  },
  {
    label: "Ngày tạo (Cũ-Mới))",
    value: 4,
  },
  {
    label: "Trạng thái đơn (Thấp-Cao)",
    value: 5,
  },
  {
    label: "Trạng thái đơn (Cao-Thấp)",
    value: 6,
  },
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

