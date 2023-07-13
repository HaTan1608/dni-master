import { convertNumberWithCommas, convertweightWithCommas, getAddressString } from "src/utils/helpers/functions/textUtils";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import SvgCloseIcon from "src/assets/svg/SvgCloseIcon";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
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
  handleEditOrder,
  handleDeleteOrder,
  warehouseCustomer,
  dataMethods,
  handleChangeSenderWarehouse,
  listWarehouseByAdmin,
}: any) => {
  console.log(listWarehouseByAdmin);
  return [
    {
      title: "Đơn hàng",
      dataIndex: "bill_code",
      key: "bill_code",
      render: (bill_code: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Mã khách hàng:</span>&nbsp;
              <span
                style={{ ...link }}
                onClick={() => openModalCallback(4, record)}
              >
                {record?.customer_code}
              </span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>Mã tham chiếu:</span>&nbsp;
              <span style={{ ...link }}>{record?.ref_code}</span>
            </div>
            {dataMethods.shipMethod == 3 || dataMethods.shipMethod == 4 ? (
              <>
                {" "}
                <div>
                  <span style={{ color: colorLabel }}>Kho đi:</span>&nbsp;
                  {record.created_at}
                </div>
                <DropdownSelectLabel
                  {...defaultStyles}
                  style={{ maxWidth: "300px", minWidth: "100%" }}
                  className="wrapSelect"
                  height="41px"
                  width="350px"
                  options={
                    listWarehouseByAdmin.find(
                      (x: any) => x.customer_code === record.customer_code
                    ).warehouse || []
                  }
                  defaultValue={
                    listWarehouseByAdmin.find(
                      (x: any) => x.customer_code === record.customer_code
                    ).warehouse[0]?.value
                  }
                  onChangeSelect={(e: any) =>
                    handleChangeSenderWarehouse(e, record)
                  }
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                />
              </>
            ) : (
              record.sender_station_name && (
                <div>
                  <span style={{ color: colorLabel }}>Ga:</span>&nbsp;
                  <span>{record.sender_station_name} </span>
                </div>
              )
            )}
          </div>
        );
      },
    },

    {
      title: "Thông tin người nhận",
      dataIndex: "zone_name",
      key: "zone_name",
      render: (zone_name: string, record: any, index: number) => {
        return (
          <div>
            <div style={{ display: "flex" }}>
              <span style={{ color: colorLabel }}>Họ tên:</span>&nbsp;
              <span>{record.receiver_name}</span>
              {/* <span
                className="editIconOrders"
                onClick={() => openModalCallback(2, record)}
              >
                <SvgBannerEdit />
              </span> */}
            </div>
            <div>
              <span style={{ color: colorLabel }}>SĐT:</span>&nbsp;
              <span style={{ ...link }}>{record.receiver_phone}</span>
            </div>
            {record.receiver_station_name && (
              <div>
                <span style={{ color: colorLabel }}>Ga:</span>&nbsp;
                <span>{record.receiver_station_name} </span>
              </div>
            )}

            <div>
              <span style={{ color: colorLabel }}>Đ/C:</span>&nbsp;
              {getAddressString(record.receiver_address, record.receiver_ward,record.receiver_district,record.receiver_province)}
            </div>
          </div>
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
      title: "Thông tin khác",
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
      title: "Tổng cước ",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <div>
            <div>
              <span style={{ color: colorLabel }}>Cước chính:</span>&nbsp;
              <span>
                {record.main_fee_vat_ex > 0
                  ? convertNumberWithCommas(record.main_fee_vat_ex.toString())
                  : record.main_fee_vat_ex}
              </span>
            </div>
            <div>
              <span style={{ color: colorLabel }}>Phí COD:</span>&nbsp;
              <span>
                {record.cod_fee > 0
                  ? convertNumberWithCommas(record.cod_fee.toString())
                  : record.cod_fee}
              </span>
            </div>{" "}
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "#ADB4BB",
                margin: "8px 0",
              }}
            ></div>
            <div>
              <span style={{ color: colorLabel }}>Tổng cước:</span>
              &nbsp;
              <span style={{ fontWeight: "700" }}>
                {record.total_fee_vat_ex > 0
                  ? convertNumberWithCommas(record.total_fee_vat_ex.toString())
                  : record.total_fee_vat_ex}
              </span>
            </div>
            <div style={{ fontStyle: "italic", color: "red" }}>
              (Chưa bao gồm VAT)
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
            <div
              style={{ ...styleButton }}
              onClick={() => handleEditOrder(record)}
            >
              <SvgIconEdit fill="#414141" style={{ transform: "scale(0.7)" }} />
            </div>
            <div
              style={{ ...styleButton }}
              onClick={() => handleDeleteOrder(record)}
            >
              <SvgCloseIcon
                fill="#414141"
                style={{ transform: "scale(0.8)" }}
              />
            </div>
          </div>
        );
      },
    },
  ];
};

export const mainStatus = [
  {
    label: "Chờ xử lý",
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
  if (e === 15) {
    return {
      label: "Giao thành công",
      color: "rgb(66,174,164)",
    };
  }
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
