/* eslint-disable */
import { Tag, Tooltip } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import SvgArrow from "src/assets/svg/SvgArrow";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgOpen from "src/assets/svg/SvgOpen";
import SvgTrash from "src/assets/svg/SvgTrash";
import { PAGE_SIZE_DEFAULT, statusTag } from "src/constants";
import routerNames from "src/utils/data/routerName";
import {
  convertNumberWithCommas,
  convertweightWithCommas,
  formatNumber,
  getAddressString,
} from "src/utils/helpers/functions/textUtils";
import { typePropsColumn } from "./interfaces";

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

const colorLabel = "rgb(128,138,148)";
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};

export const columnsDataDetail = (props: typePropsColumn) => {
  return [
    {
      title: "Mã vận đơn",
      dataIndex: "bill",
      key: "bill",
      width: "20%",
      render: (text: string, record: any, index: number) => {
        return (
          <Link
            to={(location) => ({
              ...location,
              pathname: `${routerNames.LISTED_EDIT}/${text}`,
              state: record,
            })}
          >
            <span className="text-Blue_2">{text}</span>
          </Link>
          // <span
          //   onClick={() => props.btnOpenModal(record)}
          //   className="text-accent_color_5_2 cursor-pointer">{text}
          // </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (text: number, record: any, index: number) => {
        return (
          <Tag color={statusTag[text].color} className="tms-tag">
            {statusTag[text].name}
          </Tag>
        );
      },
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
      width: "20%",
      render: (service: string, record: any, index: number) => {
        return { service };
      },
    },
    {
      title: "Hình thức vận chuyển",
      dataIndex: "transport_method",
      key: "transport_method",
      width: "20%",
      render: (transport_method: string, record: any, index: number) => {
        return { transport_method };
      },
    },
    {
      title: "Trọng lượng (Kg)",
      dataIndex: "total_weight",
      key: "total_weight",
      align: "right",
      width: "10%",
      render: (total_weight: number, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {record.total_weight ? record.total_weight : 0}
          </span>
        );
      },
    },
    {
      title: "Tiền COD (vnđ)",
      dataIndex: "cod_amount",
      key: "cod_amount",
      align: "right",
      width: "20%",
      render: (text: number, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">{formatNumber(text)}</span>
        );
      },
    },
    {
      title: "Số kiện",
      dataIndex: "package_qty",
      key: "package_qty",
      align: "right",
      width: "10%",
      render: (text: number, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">{formatNumber(text)}</span>
        );
      },
    },

    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text: string, record: any, index: number) => {
        return (
          <button>
            <SvgTrash />
          </button>
        );
      },
    },
  ];
};
export const columnsData = ({
  handleChangeSinglePackageStatus2,
  selectPackageCallback,
  handleExportListBill,
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
              {record.cont}
            </div>

            <div
              style={{
                display: "inline-block",
                borderRadius: "5px",
                background:
                  record.package_status_id === 1
                    ? "#808a94"
                    : record.package_status_id === 2
                    ? "#f2994a"
                    : record.package_status_id === 3
                    ? "#40baff"
                    : "#38c173",
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
      title: "Nhà cung cấp",
      dataIndex: "supplier_code",
      key: "supplier_code",
      align: "supplier_code",
      render: (supplier_code: number, record: any, index: number) => {
        return <span className="text-neutral_color_1_2">{supplier_code}</span>;
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
      title: "Chi tiết tàu",
      dataIndex: "supplier_code",
      key: "supplier_code",
      ellipsis: {
        showTitle: false,
      },
      render: (description: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Mã đối tác:&nbsp;</span>
              {record.supplier_code}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Tên đối tác:&nbsp;</span>
              {record.supplier_name}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Số hiệu tàu:&nbsp;</span>
              {record.train_number}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Số CONT:&nbsp;</span>
              {record.vehicle_number}
            </div>
          </div>
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
            {record.package_status_id === 1 &&
              roles.find((x: any) => x === "export") && (
                <Tooltip title="Xuất kho" placement="left">
                  <div
                    className="addMore"
                    style={{ ...styleButton }}
                    onClick={() => handleChangeSinglePackageStatus2(record)}
                  >
                    <SvgOpen fill="#414141" />
                  </div>
                </Tooltip>
              )}
            {roles.find((x: any) => x === "export-excel") && (
              <Tooltip title="Xuất excel" placement="left">
                {" "}
                <div
                  style={{ ...styleButton }}
                  className="addMore"
                  onClick={() => handleExportListBill(record)}
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
                background: "#40baff",
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
  ];
};

export const defaultFilter = {
  warehouseId: undefined,
  listedType: undefined,
  q: "",
  fromDate: undefined,
  toDate: undefined,
  currentPage: 1,
  sizePage: PAGE_SIZE_DEFAULT,
  isDispatch: false,
  status: 1,
};

export const defaultData = [
  {
    listed_code: "BK0921212",
    created_at: "22/02/2022 06:30 ",
    to_warehouse: "Ga Yên Viên",
    weight: 1200,
    bill_qty: 35,
    note: "Các vận đơn có giá trị cao, chú ý lên xuống hàng",
  },
  {
    listed_code: "BK0921213",
    created_at: "22/02/2022 06:30 ",
    to_warehouse: "Ga Yên Viên",
    weight: 100,
    bill_qty: 12,
    note: "Các đơn hàng thực phẩm nhớ gio đúng hẹn cho khách",
  },
  {
    listed_code: "BK0921214",
    created_at: "25/02/2022 06:30 ",
    to_warehouse: "Ga Hồng Ngự",
    weight: 750,
    bill_qty: 23,
    note: "Xuất ga trả hàng",
  },
];

export const defaultDataDetail = [
  {
    bill: "VD82727377822",
    status: 1,
    weight: 10,
    transport_method: "Ga - Kho",
    cod_amount: 5000000,
    service: "48 Giờ",
    package_qty: 3,
  },
  {
    bill: "VD82727377823",
    status: 2,
    weight: 3.3,
    transport_method: "Kho - Kho",
    service: "48 Giờ",
    cod_amount: 1500000,
    package_qty: 1,
  },
  {
    bill: "VD82727377822",
    status: 1,
    weight: 2.4,
    transport_method: "Ga - Ga",
    service: "48 Giờ",
    cod_amount: 3400000,
    package_qty: 2,
  },
];
