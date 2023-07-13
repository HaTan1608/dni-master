/* eslint-disable */
import { Tooltip } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import SvgArrow from "src/assets/svg/SvgArrow";
import SvgCheckGood from "src/assets/svg/SvgCheckGood";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgPrinter from "src/assets/svg/SvgPrinter";
import { DATEFULLTIME } from "src/constants";
import routerNames from "src/utils/data/routerName";
import {
  convertNumberWithCommas,
  convertweightWithCommas,
  formatNumber,
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
  handleCompleteOneDebt,
  componentRef,
  exportCallback,
  roles,
}: any) => {
  return [
    {
      title: "Bảng kê",
      dataIndex: "package_debt_code",
      key: "package_debt_code",
      render: (package_debt_code: string, record: any, index: number) => {
        return (
          <div>
            <div style={{ display: "flex" }}>
              <span style={{ color: colorLabel }}>Mã bảng kê:&nbsp;</span>
              {roles.find((x: any) => x === "package-debt-list") ? (
                <div>
                  <Link
                    to={`${routerNames.PACKAGE_DEBT_LIST}/${record.id}`}
                    style={{ ...link }}
                  >
                    {package_debt_code}
                  </Link>
                </div>
              ) : (
                <div>{package_debt_code}</div>
              )}
            </div>

            <div>
              <span style={{ color: colorLabel }}>Người tạo:</span>&nbsp;
              {record.created_by}
            </div>
            <div
              style={{
                background: getStatusColor(record.status)?.color,
                color: "#fff",
                borderRadius: "5px",
                display: "inline-block",
                padding: "4px 9px",
              }}
            >
              {record.status_name}
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
      title: "Thông tin khách hàng",
      dataIndex: "from_warehouse",
      key: "from_warehouse",
      render: (from_warehouse: string, record: any, index: number) => {
        return (
          <div>
            <div>{from_warehouse}</div>
            <div>
              <span style={{ color: colorLabel }}>Mã - Tên KH:&nbsp;</span>
              {record.customer_code} - {record.customer_name}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Nhóm KH:&nbsp;</span>
              {record.customer_group}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Loại KH:&nbsp;</span>
              {record.customer_type}
            </div>
            <div>
              <span style={{ color: colorLabel }}>SDT:&nbsp;</span>
              {record.created_by}
            </div>
            <div>
              <span style={{ color: colorLabel }}>Email:&nbsp;</span>
              {record.email}
            </div>
          </div>
        );
      },
    },
    {
      title: "Thời gian",
      dataIndex: "total_bill",
      key: "total_bill",
      render: (total_bill: string, record: any, index: number) => {
        return (
          <>
            {" "}
            <div>
              <span style={{ color: colorLabel }}>Ngày tạo:&nbsp;</span>
              {record.created_at
                ? moment(record.created_at).format(DATEFULLTIME)
                : ""}
            </div>{" "}
            <div>
              <span style={{ color: colorLabel }}>Ngày thanh toán:&nbsp;</span>
              {record.payment_at
                ? moment(record.payment_at).format(DATEFULLTIME)
                : ""}
            </div>
          </>
        );
      },
    },
    {
      title: "Tổng đơn",
      dataIndex: "total_bill",
      key: "total_bill",
      align: "right",
      render: (total_bill: string, record: any, index: number) => {
        return <span style={{ color: colorLabel }}>{total_bill}</span>;
      },
    },
    {
      title: (
        <div>
          <div>Tổng cước (VNĐ)</div>
          <div style={{ color: "red", fontStyle: "italic", fontWeight: 500 }}>
            Chưa VAT
          </div>
        </div>
      ),
      dataIndex: "total_fee_vat_ex",
      key: "total_fee_vat_ex",
      align: "right",
      render: (total_fee_vat_ex: string, record: any, index: number) => {
        return (
          <span style={{ color: colorLabel }}>
            {total_fee_vat_ex
              ? convertNumberWithCommas(total_fee_vat_ex.toString())
              : total_fee_vat_ex}
          </span>
        );
      },
    },
    {
      title: "VAT (%)",
      dataIndex: "vat",
      align: "right",
      key: "vat",
      render: (vat: number, record: any, index: number) => {
        return <span style={{ color: colorLabel }}>{formatNumber(vat)}</span>;
      },
    },
    {
      title: (
        <div>
          <div>Tổng cước (VNĐ)</div>
          <div style={{ color: "red", fontStyle: "italic", fontWeight: 500 }}>
            Sau VAT
          </div>
        </div>
      ),
      dataIndex: "total_fee",
      key: "total_fee",
      align: "right",
      render: (total_fee: number, record: any, index: number) => {
        return (
          <span style={{ color: colorLabel }}>
            {total_fee
              ? convertNumberWithCommas(total_fee.toString())
              : total_fee}
          </span>
        );
      },
    },
    {
      title: "Tổng COD (VNĐ)",
      dataIndex: "total_cod",
      align: "right",
      key: "total_cod",
      render: (total_cod: number, record: any, index: number) => {
        return (
          <span style={{ color: colorLabel }}>
            {total_cod
              ? convertNumberWithCommas(total_cod.toString())
              : total_cod}
          </span>
        );
      },
    },
    {
      title: "Tổng phí COD (VNĐ)",
      dataIndex: "total_cod_fee",
      align: "right",
      key: "total_cod_fee",
      render: (total_cod_fee: number, record: any, index: number) => {
        return (
          <span style={{ color: colorLabel }}>
            {total_cod_fee
              ? convertNumberWithCommas(total_cod_fee.toString())
              : total_cod_fee}
          </span>
        );
      },
    },
    {
      title: "Công nợ (VNĐ)",
      dataIndex: "total_detb",
      align: "right",
      key: "total_detb",
      render: (total_detb: number, record: any, index: number) => {
        return (
          <span style={{ color: colorLabel }}>
            {total_detb
              ? convertNumberWithCommas(total_detb.toString())
              : total_detb}
          </span>
        );
      },
    },
    {
      title: "Tổng chi (VNĐ)",
      dataIndex: "total_payable",
      align: "right",
      key: "total_payable",
      render: (total_payable: number, record: any, index: number) => {
        return (
          <span style={{ color: colorLabel }}>
            {total_payable
              ? convertNumberWithCommas(total_payable.toString())
              : total_payable}
          </span>
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
            {roles.find((x: any) => x === "update-package-debt") && (
              <Tooltip title="Xác nhận thanh toán" placement="left">
                <div
                  style={{ ...styleButton }}
                  onClick={() => handleCompleteOneDebt(record, "C")}
                >
                  <SvgCheckGood
                    fill="#414141"
                    style={{ transform: "scale(0.7)" }}
                  />
                </div>
              </Tooltip>
            )}

            {roles.find((x: any) => x === "export-package-debt-detail") && (
              <Tooltip title="Xuất Excel" placement="left">
                <div
                  style={{ ...styleButton }}
                  className="addMore"
                  onClick={() => exportCallback(record.id)}
                >
                  <ReactToPrint
                    trigger={() => (
                      <SvgIconImportFile
                        fill="#414141"
                        style={{ transform: "scale(1)" }}
                      />
                    )}
                    content={() => componentRef.current}
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

export const getStatusColor = (e?: any) => {
  if (e === "O") {
    return {
      label: "Chờ lấy hàng",
      color: "rgb(128,138,148)",
    };
  }
  if (e === "P") {
    return {
      label: "Chờ đóng gói",
      color: "rgb(60,174,164)",
    };
  }
  if (e === "C") {
    return {
      label: "Đã đóng gói",
      color: "rgb(60,174,164)",
    };
  }
  if (e === "R") {
    return {
      label: "Đã nhận hàng",
      color: "rgb(240,153,82)",
    };
  }
};
export const dataStatusDebt = [
  { label: "Chưa thanh toán", value: "O" },
  { label: "Chờ xử lý", value: "P" },
  { label: "Đã thanh toán", value: "C" },
  { label: "Từ chối", value: "R" },
];
