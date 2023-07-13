import { Switch } from "antd";
import moment from "moment";
import SvgBannerEdit from "src/assets/svg/SvgBannerEdit";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsPrice = ({
  handleChangeStatusPriceDetail,
  openEditPriceDetails,
  applyTypes,
  roles,
}: any) => {
  return [
    {
      title: "ID",
      dataIndex: "pricelist_detail_id",
      key: "pricelist_detail_id",
      render: (pricelist_detail_id: string, record: any, index: number) => {
        return <span className="text-Blue_2">{pricelist_detail_id}</span>;
      },
    },
    {
      title: "Mã vùng",
      dataIndex: "value",
      key: "value",
      render: (value: string, record: any, index: number) => {
        return <span className="text-Blue_2">{value}</span>;
      },
    },
    {
      title: "TL từ (Lũy tiến)",
      dataIndex: "from_point",
      key: "from_point",
      render: (from_point: string, record: any, index: number) => {
        return <span>{from_point}</span>;
      },
    },
    {
      title: "TL đến (Lũy tiến)",
      dataIndex: "to_point",
      key: "to_point",
      render: (to_point: string, record: any, index: number) => {
        return <span>{to_point}</span>;
      },
    },
    {
      title: "Kiểu đơn giá",
      dataIndex: "apply_type_id",
      key: "apply_type_id",
      render: (apply_type_id: string, record: any, index: number) => {
        return (
          <span>
            {apply_type_id
              ? applyTypes.find((x: any) => x.value === apply_type_id)?.label
              : ""}
          </span>
        );
      },
    },
    {
      title: "Bước giá",
      dataIndex: "step",
      key: "step",
      render: (step: string, record: any, index: number) => {
        return <span>{step}</span>;
      },
    },
    {
      title: "Đơn giá (Vnđ)",
      dataIndex: "unitprice",
      key: "unitprice",
      render: (unitprice: string, record: any, index: number) => {
        return (
          <span>
            {Number(unitprice) > 0
              ? convertNumberWithCommas(unitprice.toString())
              : unitprice}
          </span>
        );
      },
    },

    {
      title: "TT hoạt động",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <Switch
            onChange={() => handleChangeStatusPriceDetail(record)}
            disabled={roles.find((x:any) => x === "update-list-config-price")?false:true}
            checked={status === "A" ? true : false}
          />
        );
      },
    },
    {
      dataIndex: null,
      key: null,
      render: (text: string, record: any, index: number) => {
        return (
          <div className="bannerAction">
            <SvgBannerEdit onClick={() => openEditPriceDetails(record)} />
          </div>
        );
      },
    },
  ];
};

export const columnsCustomers = ({
  handleChangeStatusPriceApply,
  openEditPriceApplys,
  roles
}: any) => {
  return [
    {
      title: "ID",
      dataIndex: "pricelist_apply_id",
      key: "pricelist_apply_id",
      render: (pricelist_apply_id: string, record: any, index: number) => {
        return <span className="text-Blue_2">{pricelist_apply_id}</span>;
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer: string, record: any, index: number) => {
        return <span>{customer}</span>;
      },
    },
    {
      title: "Nhóm KH",
      dataIndex: "customer_group",
      key: "customer_group",
      render: (customer_group: string, record: any, index: number) => {
        return <span>{customer_group}</span>;
      },
    },
    {
      title: "Chiết khấu (%)",
      dataIndex: "discount_rate",
      key: "discount_rate",
      render: (discount_rate: string, record: any, index: number) => {
        return <span>{discount_rate}</span>;
      },
    },
    {
      title: "Phụ phí cộng thêm (%)",
      dataIndex: "surcharge_rate",
      key: "surcharge_rate",
      render: (surcharge_rate: string, record: any, index: number) => {
        return <span>{surcharge_rate}</span>;
      },
    },
    {
      title: "VAT (%)",
      dataIndex: "vat_rate",
      key: "vat_rate",
      render: (vat_rate: string, record: any, index: number) => {
        return <span>{vat_rate}</span>;
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "start_date",
      render: (start_date: string, record: any, index: number) => {
        return (
          <span>
            {start_date ? moment(start_date).format("YYYY-MM-DD hh:mm:ss") : ""}
          </span>
        );
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
      render: (end_date: string, record: any, index: number) => {
        return (
          <span>
            {" "}
            {end_date ? moment(end_date).format("YYYY-MM-DD hh:mm:ss") : ""}
          </span>
        );
      },
    },
    {
      title: "TT hoạt động",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any, index: number) => {
        return (
          <Switch
            onChange={() => handleChangeStatusPriceApply(record)}
            disabled={roles.find((x:any) => x === "update-list-config-apply")?false:true}
            checked={status === "A" ? true : false}
          />
        );
      },
    },
    {
      dataIndex: null,
      key: null,
      render: (text: string, record: any, index: number) => {
        return (
          <div className="bannerAction">
            <SvgBannerEdit onClick={() => openEditPriceApplys(record)} />
          </div>
        );
      },
    },
  ];
};
export const dataPrice = [
  {
    price_id: "066282836",
    zone_code: "HCM0001",
    tl_from: "0.5",
    tl_to: "1",
    buocgia: "0.5",
    dongia: "1.000",
    vat: "10",
    kieudongia: "Kiểu đơn giá 1",
  },
  {
    price_id: "066282837",
    zone_code: "HCM0001",
    tl_from: "0.5",
    tl_to: "1",
    buocgia: "0.5",
    dongia: "1.000",
    vat: "10",
    kieudongia: "Kiểu đơn giá 1",
  },
  {
    price_id: "066282838",
    zone_code: "HCM0001",
    tl_from: "0.5",
    tl_to: "1",
    buocgia: "0.5",
    dongia: "1.000",
    vat: "10",
    kieudongia: "Kiểu đơn giá 1",
  },
  {
    price_id: "066282839",
    zone_code: "HCM0001",
    tl_from: "0.5",
    tl_to: "1",
    buocgia: "0.5",
    dongia: "1.000",
    vat: "10",
    kieudongia: "Kiểu đơn giá 1",
  },
];

export const dataCustomers = [
  {
    id_customer: "066282836",
    name_customer: "CTY TNHH CTO",
    group_customer: "Chuẩn",
    discount: "10",
    extra_surcharge: "10",
    vat: "10",
    start_at: "2022/12/12",
    end_at: "2022/12/12",
    status: "A",
  },
  {
    id_customer: "066282837",
    name_customer: "CTY TNHH CTO",
    group_customer: "Chuẩn",
    discount: "10",
    extra_surcharge: "10",
    vat: "10",
    start_at: "2022/12/12",
    end_at: "2022/12/12",
    status: "A",
  },
  {
    id_customer: "066282838",
    name_customer: "CTY TNHH CTO",
    group_customer: "Chuẩn",
    discount: "10",
    extra_surcharge: "10",
    vat: "10",
    start_at: "2022/12/12",
    end_at: "2022/12/12",
    status: "A",
  },
];

export const dataStatus = [
  { label: "Đang hiển thị", value: "A" },
  { label: "Tạm ẩn", value: "D" },
];
