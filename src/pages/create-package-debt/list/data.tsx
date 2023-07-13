/* eslint-disable */
import moment from "moment";
import { Link } from "react-router-dom";
import { RenderColTable } from "src/components/table/RenderColTable";
import { DATEFULLTIME } from "src/constants";
import routerNames from "src/utils/data/routerName";
import { typePropsColumn } from "./interfaces";
const colorLabel = "rgb(128,138,148)";
export const columnsData = (props: typePropsColumn) => {
  return [
    {
      title: "Thông tin cơ bản",
      dataIndex: "customer_code",
      key: "customer_code",
      render: (text: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span className="text-neutral_color_1_3">
                Mã - Tên KH:{" "}
                <span className="text-neutral_color_1_2">
                  {record.customer_code ? (
                    <span>
                      <span
                      // onClick={() => props.btnOpenModal(record)}
                      // className="text-accent_color_5_2 cursor-pointer"
                      >
                        {record.customer_code} -{" "}
                      </span>{" "}
                      {record.customer_name}
                    </span>
                  ) : (
                    text
                  )}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Nhóm KH:{" "}
                <span className="text-neutral_color_1_2">
                  {record.customer_group}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Loại KH:{" "}
                <span className="text-neutral_color_1_2">
                  {record.customer_type}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                SĐT:{" "}
                <span
                  className="text-neutral_color_1_2"
                  // onClick={() => props.btnOpenModal(record)}
                  // className="text-accent_color_5_2 cursor-pointer"
                >
                  {record.customer_phone}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Email:{" "}
                <span className="text-neutral_color_1_2">{record.email}</span>
              </span>
            ),
          },
        ];
        return <RenderColTable data={newData} />;
      },
    },
    {
      title: "Thông tin đơn hàng",
      dataIndex: "bill_code",
      key: "bill_code",
      render: (bill_code: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span className="text-neutral_color_1_3">
                Mã đơn hàng:{" "}
                <span
                  className="text-neutral_color_1_2"
                  style={{ ...link }}
                  onClick={() => props.openModalCallback(4, record)}
                >
                  {bill_code ? bill_code : "-"}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Mã tham chiếu:{" "}
                <span className="text-neutral_color_1_2">
                  {record.ref_code ? record.ref_code : "-"}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Ngày tạo:{" "}
                <span className="text-neutral_color_1_2">
                  {moment(record.created_at).format(DATEFULLTIME)}
                </span>
              </span>
            ),
          },
        ];
        return <RenderColTable data={newData} />;
      },
    },
    {
      title: "Ngày giao thành công",
      dataIndex: "address",
      key: "delivery_at",
      align: "delivery_at",
      render: (text: string, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {moment(record.delivery_at).format(DATEFULLTIME)}
          </span>
        );
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "bill_status_name",
      key: "bill_status_name",
      align: "center",
      render: (text: string, record: any, index: number) => {
        return (
          <div
            style={{
              background: getStatusColor(record.payment_status_id)?.color,
              color: "#fff",
              borderRadius: "5px",
              display: "inline-block",
              padding: "4px 9px",
              width: "120px",
            }}
          >
            {record.payment_status_name}
          </div>
        );
      },
    },
    {
      title: "Thời gian",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Ngày tạo:</span>&nbsp;
              {record.created_at}
            </div>

            <div>
              <span style={{ color: colorLabel }}>Ngày hoàn thành:</span>
              &nbsp;
              {record.delivery_at}
            </div>
            <div>
              <span style={{ color: colorLabel }}>
                Ngày thanh toán công nợ:
              </span>
              &nbsp;
              {record.payment_at}
            </div>
          </div>
        );
      },
    },
    {
      title: "Bảng kê công nợ",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text: string, record: any, index: number) => {
        return (
          <Link
            to={`${routerNames.PACKAGE_DEBT_LIST}/${record.package_debt_id}`}
            style={{ ...link }}
          >
            {record.package_debt_code}
          </Link>
          // <span>

          //   {record.package_debt_code ? record.package_debt_code : "-"}
          // </span>
        );
      },
    },
  ];
};
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};
export const defaultFilter = {
  to_delivery_at: undefined,
  from_delivery_at: undefined,
  customer_type_id: undefined,
  payment_status_id: undefined,
  customer_group_id: undefined,
  page: 1,
  limit: 10,
  search: "",
};
export const getStatusColor = (e?: any) => {
  if (e === 1) {
    return {
      label: "Chờ lấy hàng",
      color: "rgb(128,138,148)",
    };
  }
  if (e === 2) {
    return {
      label: "Chờ đóng gói",
      color: "rgb(45,156,219)",
    };
  }
  if (e === 3) {
    return {
      label: "Đã thanh toán",
      color: "rgb(60,174,164)",
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
  if (e === 16) {
    return {
      label: "Giao thành công",
      color: "rgb(66,174,164)",
    };
  }
};
