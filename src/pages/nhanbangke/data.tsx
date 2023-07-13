/* eslint-disable */
import { Tooltip } from "antd";
import {
  convertNumberWithCommas,
  convertweightWithCommas,
  formatNumber,
  getAddressString,
} from "src/utils/helpers/functions/textUtils";
import SvgArrow from "src/assets/svg/SvgArrow";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgClosed from "src/assets/svg/SvgClosed";
import moment from "moment";

const colorLabel = "rgb(128,138,148)";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};
const styleButton = {
  border: "1px solid #BFC4C9",
  borderRadius: "5px",
  background: "#F0F2F5",
  width: "35px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginBottom: "4px",
};
export const columnsHoanTatDonHang = ({
  handleChangeSinglePackageStatus,
  selectPackageCallback,
  exportBillDeliveryCallback,
  roles,
}: any) => {
  return [
    {
      title: "Mã bảng kê",
      dataIndex: "package_code",
      key: "package_code",
      render: (package_code: string, record: any, index: number) => {
        return (
          <div>
            <div
              style={{ ...link }}
              onClick={() => selectPackageCallback(record)}
            >
              {package_code}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Số CONT:&nbsp;</span>
              {record.train_number}
            </div>

            <div
              style={{
                display: "inline-block",
                borderRadius: "5px",
                background: "#f2994a",
                color: "#fff",
                padding: "4px 9px",
                textAlign: "center",
              }}
            >
              {record.package_status_name}
            </div>
          </div>

          // <span
          //   onClick={() => props.btnOpenModal(record)}
          //   className="text-accent_color_5_2 cursor-pointer">{text}
          // </span>
        );
      },
    },
    {
      title: "Kho đi",
      dataIndex: "from_warehouse",
      key: "from_warehouse",
      render: (from_warehouse: string, record: any, index: number) => {
        return (
          <div>
            <div>{from_warehouse}</div>

            <div>
              <span style={{ color: colorLabel }}>Người tạo:&nbsp;</span>
              {record.created_by}
            </div>
          </div>
        );
      },
    },
    {
      title: "Kho đến",
      dataIndex: "to_warehouse",
      key: "to_warehouse",
      render: (to_warehouse: string, record: any, index: number) => {
        return (
          <div>
            <div>{to_warehouse}</div>
          </div>
        );
      },
    },
    {
      title: "Trọng lượng (Kg)",
      dataIndex: "total_weight",
      key: "total_weight",
      align: "right",
      render: (total_weight: number, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {formatNumber(total_weight)}
          </span>
        );
      },
    },
    {
      title: "Số vận đơn",
      dataIndex: "number_of_bill",
      key: "number_of_bill",
      align: "right",
      render: (number_of_bill: number, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {formatNumber(number_of_bill)}
          </span>
        );
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (description: string, record: any, index: number) => {
        return (
          <Tooltip placement="topLeft" title={description}>
            <span className="text-neutral_color_1_2">{description}</span>
          </Tooltip>
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
              <span style={{ color: colorLabel }}>Ngày đi dự kiến:</span>&nbsp;
              {record.start_date}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ngày đến dự kiến:</span>&nbsp;
              {record.to_date}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ngày rời kho đi:</span>&nbsp;
              {record.export_at}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ngày đến kho nhận:</span>
              &nbsp;
              {record.received_at}
            </div>
          </div>
        );
      },
    },
    {
      title: null,
      dataIndex: null,
      key: null,
      render: (text: string, record: any, index: number) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {roles.find((x: any) => x === "import") && (
              <Tooltip title="Nhập kho" placement="left">
                <div
                  style={{ ...styleButton }}
                  onClick={() => handleChangeSinglePackageStatus(record)}
                >
                  <SvgClosed fill="#414141" scale="0.7" />
                </div>
              </Tooltip>
            )}

            <Tooltip title="Xuất excel" placement="left">
              <div
                style={{ ...styleButton }}
                onClick={() => exportBillDeliveryCallback(record)}
              >
                <SvgIconImportFile
                  fill="#414141"
                  style={{ transform: "scale(0.8)" }}
                />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
};

export const columnsTableBangKe = ({
  openModalCallback,
  handleChangeSingleBillStatus,
  package_code,
}: any) => {
  return [
    {
      title: "Đơn hàng",
      dataIndex: "bill_code",
      key: "bill_code",
      render: (bill_code: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Mã đơn:</span>&nbsp;
              <span
                style={{ ...link }}
                onClick={() => openModalCallback(4, record)}
              >
                {record.bill_code}
              </span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>Mã tham chiếu:</span>&nbsp;
              <span style={{ ...link }}>{record.ref_code}</span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ngày tạo:</span>&nbsp;
              {record.created_at}
            </div>

            <div
              style={{
                background: "rgb(240,153,82)",
                color: "#fff",
                borderRadius: "5px",
                display: "inline-block",
                padding: "4px 9px",
              }}
            >
              {record.bill_status_name}
            </div>
          </div>
        );
      },
    },

    {
      title: "",
      dataIndex: "zone_name",
      key: "zone_name",
      render: (zone_name: string, record: any, index: number) => {
        return (
          <>
            <div style={link}>{package_code}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {record.sender_routing}&nbsp;&nbsp; <SvgArrow />
              &nbsp;&nbsp; {record.receiver_routing}
            </div>
          </>
        );
      },
    },
    {
      title: "Thông tin hàng hoá",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string, record: any, index: number) => {
        return (
          <div>
            <div style={{ display: "flex" }}>
              <span style={{ color: colorLabel }}>Loại hàng hoá:</span>&nbsp;
              <span>{record.cargo_type}</span>
              {/* <span
                  className="editIconOrders"
                  onClick={() => openModalCallback(3, record)}
                >
                  <SvgBannerEdit />
                </span> */}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Giá trị hàng hoá (Vnđ):</span>
              &nbsp;
              <span>
                {record.cargo_value > 0
                  ? convertNumberWithCommas(record.cargo_value.toString())
                  : record.cargo_value}
              </span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>COD (Vnđ):</span>&nbsp;
              {record.cod_amount > 0
                ? convertNumberWithCommas(record.cod_amount.toString())
                : record.cod_amount}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Số kiện:</span>&nbsp;
              {record.package_qty > 0
                ? convertweightWithCommas(record.package_qty.toString())
                : record.package_qty}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Thể tích (m3):</span>&nbsp;
              {record.volume > 0
                ? convertweightWithCommas(record.volume.toString())
                : record.volume}
            </div>
            <div>
              <span style={{ color: colorLabel }}>TL quy đổi (Kg):</span>&nbsp;
              {record.dimension_weight > 0
                ? convertweightWithCommas(record.dimension_weight.toString())
                : record.dimension_weight}
            </div>
            <div>
              <span style={{ color: colorLabel }}>TL hàng hoá (Kg):</span>&nbsp;
              {record.weight > 0
                ? convertweightWithCommas(record.weight.toString())
                : record.weight}
            </div>
          </div>
        );
      },
    },
    {
      title: "Thông tin dịch vụ",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Hình thức thanh toán:</span>
              &nbsp;
              <span>{record.payment_method}</span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>Dịch vụ:</span>&nbsp;
              {record.service}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ghi chú:</span>&nbsp;
              <span>{record.note}</span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>HTVC:</span>&nbsp;
              <span>{record.transportation_method}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Thông tin người nhận",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Họ tên:</span>
              &nbsp;
              <span>{record.receiver_name}</span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>SĐT:</span>&nbsp;
              {record.receiver_phone}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Đ/C:</span>&nbsp;
              {getAddressString(
                record.receiver_address,
                record.receiver_ward,
                record.receiver_district,
                record.receiver_province
              )}
            </div>
          </div>
        );
      },
    },
  ];
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
      color: "rgb(65,65,65)",
    };
  }
  if (e === 3) {
    return {
      label: "Đã đóng gói",
      color: "rgb(1,21,40)",
    };
  }
  if (e === 4) {
    return {
      label: "Đã nhận hàng",
      color: "rgb(240,153,82)",
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
};
