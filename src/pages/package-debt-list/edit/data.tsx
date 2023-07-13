import { Tooltip } from "antd";
import moment from "moment";
import SvgTrash from "src/assets/svg/SvgTrash";
import { DATE } from "src/constants";
import { getStatusColor } from "src/pages/create-package-debt/list/data";
import { convertNumberWithCommas, formatNumber } from "src/utils/helpers/functions/textUtils";

const colorLabel = "rgb(128,138,148)";

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
const link = {
  color: "rgb(53,157,217)",
  textDecoration: "underline",
  cursor: "pointer",
};
export const columnsZones = ({
  handleDeleteOneBill,
  openModalCallback
}: any) => {
  return [
    {
      title: "Bảng kê",
      dataIndex: "bill_code",
      key: "bill_code",
      render: (bill_code: string, record: any, index: number) => {
        return (
          <div>
            <div style={{ display: "flex" }}>
              <span style={{ color: colorLabel }}>Mã đơn hàng:&nbsp;</span>
              <div style={{ ...link }} onClick={() => openModalCallback(4, record)}>
                {/* <Link to={`${routerNames.PACKAGEDEBTLIST}/15`}  style={{ ...link }}>{bill_code}</Link> */}
                {bill_code}
              </div>
            </div>
            <div>
              <span style={{ color: colorLabel }}>Mã tham chiếu:&nbsp;</span>
              <span>{record.ref_code}</span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>Ngày tạo:</span>&nbsp;
              {moment(record.created_bill_at).format(DATE)}
            </div>
          </div>
        );
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "payment_status_name",
      key: "payment_status_name",
      align: "center",
      render: (payment_status_name: string, record: any, index: number) => {
        return (
          <div
            style={{
              background: getStatusColor(record.payment_status_id)?.color,
              color: "#fff",
              borderRadius: "5px",
              display: "inline-block",
              padding: "4px 9px",
              width:'130px'
            }}
          >
            {record.payment_status_name}
          </div>
        );
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
      dataIndex: "main_fee_vat_ex",
      align: "right",
      key: "main_fee_vat_ex",
      render: (main_fee_vat_ex: string, record: any, index: number) => {
        return <div style={{ color: colorLabel}}>{main_fee_vat_ex?convertNumberWithCommas(main_fee_vat_ex.toString()):0}</div>;
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
      dataIndex: "main_fee",
      align: "right",
      key: "main_fee",
      render: (main_fee: string, record: any, index: number) => {
        return <div style={{ color: colorLabel}}>{main_fee?convertNumberWithCommas(main_fee.toString()):0}</div>;
      },
    },
    {
      title: "COD (VNĐ)",
      dataIndex: "cod_amount",
      align: "right",
      key: "cod_amount",
      render: (cod_amount: string, record: any, index: number) => {
        return <div style={{ color: colorLabel}}>{cod_amount?convertNumberWithCommas(cod_amount.toString()):0}</div>;
      },
    },
    {
      title: "Phí COD (VNĐ)",
      dataIndex: "cod_fee",
      align: "right",
      key: "cod_fee",
      render: (cod_fee: string, record: any, index: number) => {
        return <div style={{ color: colorLabel}}>{cod_fee?convertNumberWithCommas(cod_fee.toString()):cod_fee}</div>;
      },
    },
    {
      title: "Công nợ (VNĐ)",
      dataIndex: "detb_amount",
      align: "right",
      key: "detb_amount",
      render: (detb_amount: string, record: any, index: number) => {
        return <div style={{ color: colorLabel}}>{detb_amount?convertNumberWithCommas(detb_amount.toString()):0}</div>;
      },
    },
    {
      title: "Tổng chi (VNĐ)",
      dataIndex: "payable_amount",
      key: "payable_amount",
      align: "right",
      render: (payable_amount: string, record: any, index: number) => {
        return <div style={{ color: colorLabel}}>{payable_amount?convertNumberWithCommas(payable_amount.toString()):0}</div>;
      },
    },
    // {
    //   title: null,
    //   dataIndex: 'delete',
    //   key: '',
    //   render: (text: string, record: any, index: number) => {
    //     return (
    //       <div
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           flexDirection: "column",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <Tooltip title="Xóa bảng kê" placement="left">
    //           <div
    //             style={{ ...styleButton }}
    //             onClick={() => handleDeleteOneBill(record)}
    //           >
    //             <SvgTrash fill="#000" scale="0.7" />
    //           </div>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];
};
