/* eslint-disable */
import { Popover, Tooltip } from "antd";
import moment from "moment";
import ReactToPrint from "react-to-print";
import SvgArrow from "src/assets/svg/SvgArrow";
import SvgHoanTatDonHang from "src/assets/svg/SvgHoanTatDonHang";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgPrinter from "src/assets/svg/SvgPrinter";
import SvgTraHang from "src/assets/svg/SvgTraHang";
import {
  convertNumberWithCommas,
  convertweightWithCommas,
  getAddressString,
} from "src/utils/helpers/functions/textUtils";
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
  openModalCallback,
  handleChangeSingleBillStatus,
  exportBillDeliveryCallback,
  roles,
}: any) => {
  return [
    {
      title: "Mã phiếu",
      dataIndex: "package_delivery_code",
      key: "package_delivery_code",
      render: (bill_code: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Mã phiếu:</span>&nbsp;
              <span
                style={{ ...link }}
                onClick={() => openModalCallback(record)}
              >
                {record.package_delivery_code}
              </span>
            </div>
            {record?.completed_at ? (
              <div
                style={{
                  background: "#38c173",
                  color: "#fff",
                  borderRadius: "5px",
                  display: "inline-block",
                  padding: "4px 9px",
                }}
              >
                Hoàn thành
              </div>
            ) : (
              <div
                style={{
                  background: "#808a94",
                  color: "#fff",
                  borderRadius: "5px",
                  display: "inline-block",
                  padding: "4px 9px",
                }}
              >
                Chưa hoàn thành
              </div>
            )}
          </div>
        );
      },
    },

    {
      title: "Thông tin xe",
      dataIndex: "zone_name",
      key: "zone_name",
      render: (zone_name: string, record: any, index: number) => {
        return (
          <div>
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
              <span style={{ color: "rgb(128,138,148)" }}>Biển số xe:</span>{" "}
              {record?.vehicle_number}
            </div>
          </div>
        );
      },
    },
    {
      title: "Tên tài xế",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: "rgb(128,138,148)" }}>Họ tên:</span>{" "}
              {record.driver_name}
            </div>
            <div>
              <span style={{ color: "rgb(128,138,148)" }}>Mã nhân viên:</span>{" "}
              {record.driver_id}
            </div>{" "}
            <div>
              <span style={{ color: "rgb(128,138,148)" }}>SĐT:</span>{" "}
              <span>{record.driver_phone}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Tổng đơn",
      dataIndex: "status",
      key: "status",
      align: "right",
      render: (status: string, record: any, index: number) => {
        return <div>{record.number_of_bill}</div>;
      },
    },
    {
      title: "Tổng Kg",
      dataIndex: "status",
      key: "status",
      align: "right",
      render: (status: string, record: any, index: number) => {
        return (
          <div>
            {record.total_weight > 0
              ? convertweightWithCommas(record.total_weight.toString())
              : record.total_weight}
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
          <>
            {" "}
            <div>
              {" "}
              <span style={{ color: "rgb(128,138,148)" }}> Ngày tạo:</span>{" "}
              &nbsp;
              {record.created_at &&
                moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </div>{" "}
            <div>
              {" "}
              <span style={{ color: "rgb(128,138,148)" }}>
                {" "}
                Ngày xuất kho:
              </span>{" "}
              &nbsp;
              {record.export_at &&
                moment(record.export_at).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            <div>
              {" "}
              <span style={{ color: "rgb(128,138,148)" }}>
                {" "}
                Ngày hoàn thành:
              </span>{" "}
              &nbsp;
              {record.completed_at &&
                moment(record.completed_at).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </>
        );
      },
    },

    {
      dataIndex: null,
      key: null,
      render: (text: string, record: any, index: number) => {
        return (
          <div
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {!record?.completed_at &&
              roles.find((x: any) => x === "complete-note") && (
                <Tooltip title="Hoàn thành đơn hàng" placement="left">
                  <div
                    style={{ ...styleButton }}
                    className="addMore"
                    onClick={() => handleChangeSingleBillStatus(record, 16)}
                  >
                    <SvgHoanTatDonHang
                      fill="#414141"
                      style={{ transform: "scale(0.9)" }}
                    />
                  </div>
                </Tooltip>
              )}

            {/* <div
              style={{ ...styleButton }}
              onClick={() => handleChangeSingleBillStatus(record, 15)}
            >
              <SvgTraHang fill="#414141" style={{ transform: "scale(1.2)" }} />
            </div> */}
            {roles.find((x: any) => x === "load-excel") && (
              <Tooltip title="Xuất excel" placement="left">
                <div
                  style={{ ...styleButton }}
                  className="addMore"
                  onClick={() => exportBillDeliveryCallback(record)}
                >
                  <SvgIconImportFile
                    fill="#414141"
                    style={{ transform: "scale(0.8)" }}
                  />
                </div>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];
};

export const columnsOrdersOfBill = ({
  openModalCallback,
  handleChangeSingleBillStatus,
  driver,
  componentRef,
  printDataCallback,
  roles,
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
                background: getStatusColor(record.bill_status_id)?.color,
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
      title: "Mã bảng kê/ Tuyến",
      dataIndex: "zone_name",
      key: "zone_name",
      render: (zone_name: string, record: any, index: number) => {
        return (
          <>
            {record.package_code && (
              <div style={{ ...link }}>{record.package_code}</div>
            )}
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
            <Popover
              content={() => content({ driver })}
              title={`Tài xế: ${driver.driver_name}`}
              style={{ width: "300px" }}
            >
              <div
                style={{
                  borderRadius: "5px",
                  background: "#27aae1",
                  display: "inline-block",
                  textAlign: "center",
                  padding: "2px 7px",
                  color: "#fff",
                }}
              >
                Xe trả hàng: {driver?.vehicle_number}
              </div>
            </Popover>
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
              <span style={{ color: colorLabel }}>Ngày xác nhận:</span>&nbsp;
              {record.confirmed_at}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ngày rời kho đi:</span>&nbsp;
              {record.export_warehouse_at}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ngày đến kho nhận:</span>
              &nbsp;
              {record.received_warehouse_at}
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
      dataIndex: null,
      key: null,
      render: (text: string, record: any, index: number) => {
        return (
          <div
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {record.bill_status_id !== 16 && (
              <>
                <div
                  style={{ ...styleButton }}
                  className="addMore"
                  title="Hoàn thành"
                  onClick={() => handleChangeSingleBillStatus(record, 16)}
                >
                  <SvgHoanTatDonHang
                    fill="#414141"
                    style={{ transform: "scale(0.9)" }}
                  />
                </div>
                {roles.find((x: any) => x === "import-cannot-ship") && (
                  <div
                    style={{ ...styleButton }}
                    className="addMore"
                    title="Nhập kho không phát được"
                    onClick={() => handleChangeSingleBillStatus(record, 6)}
                  >
                    <SvgTraHang
                      fill="#414141"
                      style={{ transform: "scale(1.2)" }}
                    />
                  </div>
                )}
              </>
            )}
            {roles.find((x: any) => x === "print-bill-export-note") && (
              <div
                style={{ ...styleButton }}
                onClick={() => printDataCallback(record)}
              >
                <ReactToPrint
                  trigger={() => (
                    <SvgPrinter
                      fill="#414141"
                      style={{ transform: "scale(1)" }}
                    />
                  )}
                  content={() => componentRef.current}
                />
              </div>
            )}
          </div>
        );
      },
    },
  ];
};

const content = ({ driver }: any) => {
  return (
    <div style={{ width: "200px" }}>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100px" }}>Mã nhân viên:</div>
        <div style={{ width: "100px" }}> {driver?.driver_id}</div>
      </div>{" "}
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100px" }}>Số điện thoại:</div>
        <div style={{ width: "100px" }}> {driver?.driver_phone}</div>
      </div>{" "}
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100px" }}>Biển số xe:</div>
        <div style={{ width: "100px" }}> {driver?.vehicle_number}</div>
      </div>
    </div>
  );
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
