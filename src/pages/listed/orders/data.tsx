/* eslint-disable */
import SvgPrinter from "src/assets/svg/SvgPrinter";
import {
  convertNumberWithCommas,
  convertweightWithCommas,
  getAddressString,
} from "src/utils/helpers/functions/textUtils";
import SvgArrow from "src/assets/svg/SvgArrow";
import SvgBanTayNangHang from "src/assets/svg/SvgBanTayNangHang";
import SvgPencil from "src/assets/svg/SvgPencil";
import ReactToPrint from "react-to-print";
import { Tooltip } from "antd";
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

export const columnsOrders = ({
  openModalCallback,
  handleChangeStatusBills,
  handleEditOrder,
  printDataCallback,
  componentRef,
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

            <div
              style={{
                background: `${getStatusColor(record.bill_status_id)?.color}`,
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
      title: "Tuyến",
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
            {record.bill_status_id === 1 && (
              <>
                {roles.find((x: any) => x === "receive-package") && (
                  <Tooltip title="Nhận hàng" placement="left">
                    <div
                      style={{ ...styleButton }}
                      onClick={() => handleChangeStatusBills(record)}
                    >
                      <SvgBanTayNangHang fill="#414141" />
                    </div>
                  </Tooltip>
                )}
                {roles.find((x: any) => x === "modify-order") && (
                  <Tooltip title="Chỉnh sửa đơn" placement="left">
                    <div
                      style={{ ...styleButton }}
                      onClick={() => handleEditOrder(record)}
                    >
                      <SvgPencil fill="#414141" />
                    </div>
                  </Tooltip>
                )}
              </>
            )}
            {roles.find((x: any) => x === "print-bill") && (
              <Tooltip title="In bill" placement="left">
                <div
                  style={{ ...styleButton }}
                  className="addMore"
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
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];
};

export const mainStatus = [
  {
    label: "Chờ nhận hàng",
    value: 1,
  },
  {
    label: "Đang xử lý",
    value: 2,
  },
  {
    label: "Thành công",
    value: 3,
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
  return {
    label: "Giao thành công",
    color: "rgb(66,174,164)",
  };
};

export const ordersDataGroup1 = [
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 1,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 1,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 1,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
];

export const ordersDataGroup2 = [
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 4,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 4,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 6,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 5,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 6,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 5,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 4,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
];

export const ordersDataGroup3 = [
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 11,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 12,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 13,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
];

export const ordersDataGroup4 = [
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 15,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
  {
    madon: "300000953",
    mathamchieu: "844232345",
    ngaytao: "2022/12/31",
    dichvu: "36 giờ",
    status: 15,
    hotennguoigui: "Đỗ Minh Châu",
    sdtnguoigui: "0909375467",
    diachinguoigui:
      "59/20/28, Liên khu 10-11 Phường Bình Trị Đông, Quận Bình Tân, TP. Hồ Chí Minh",
    guihanhtaikho: true,
    hotennguoinhan: "Lê Bá Khiêm",
    sdtnguoinhan: "0298023454",
    ga: "Hà Nội - Ga A",
    diachinhan: "Số 120, phố Lê Duẩn, phường Cửa Nam, quận Hoàn Kiếm, Hà Nội",
    nhanhangtaikho: false,
    loạihanghoa: "Hàng điện tử",
    giatrihanghoa: "50.000.000",
    cod: "5000000",
    sokien: "5",
    tlquydoi: "30",
    tlhanghoa: "33",
    hinhthucthanhtoan: "NGTTN",
    ghichu: "Cho xem hàng",
    cuocchinh: "5.000.000",
    phicod: "5.000.000",
    tongcuoc: "6.000.000",
  },
];
