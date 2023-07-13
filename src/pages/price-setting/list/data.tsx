import { Switch } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import SvgBannerEdit from "src/assets/svg/SvgBannerEdit";
import routerNames from "src/utils/data/routerName";

export const columnsZones = ({ handleChangePriceStatus,roles }: any) => {
  return [
    {
      title: "Mã bảng giá",
      dataIndex: "pricelist_id",
      key: "pricelist_id",
      render: (pricelist_id: string, record: any, index: number) => {
        return (
          // <Link
          //   to={(location) => ({
          //     ...location,
          //     pathname: `${routerNames.PRICE_SETTING_EDIT}/${record.pricelist_id}`,
          //     state: record,
          //   })}
          // >
            <span>{pricelist_id}</span>
          // </Link>
        );
      },
    },
    {
      title: "Tên bảng giá",
      dataIndex: "description",
      key: "description",
      render: (description: string, record: any, index: number) => {
        return <span>{description}</span>;
      },
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
      render: (service: string, record: any, index: number) => {
        return <span>{service}</span>;
      },
    },
    {
      title: "PT vận chuyển",
      dataIndex: "transport_method",
      key: "transport_method",
      render: (transport_method: string, record: any, index: number) => {
        return <span>{transport_method}</span>;
      },
    },
    {
      title: "Quy tắc áp giá",
      dataIndex: "calculation_type_name",
      key: "calculation_type_name",
      render: (calculation_type_name: string, record: any, index: number) => {
        return <span>{calculation_type_name}</span>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
      key: "created",
      render: (created: string, record: any, index: number) => {
        return (
          <span>
            {" "}
            {created ? moment(created).format("YYYY-MM-DD hh:mm:ss") : ""}
          </span>
        );
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated",
      key: "updated",
      render: (updated: string, record: any, index: number) => {
        return (
          <span>
            {updated ? moment(updated).format("YYYY-MM-DD hh:mm:ss") : ""}
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
            checked={status === "A" ? true : false}
            disabled={roles.find((x:any) => x === "modify-price-list")?false:true}
            onChange={() => handleChangePriceStatus(record)}
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
            {roles.find((x:any) => x === "config-price-detail")&&<Link
              to={`${routerNames.PRICE_SETTING_EDIT}/${record.pricelist_id}`}
            >
              <SvgBannerEdit />
            </Link>}
          </div>
        );
      },
    },
  ];
};

export const dataZone = [
  {
    price_id: "066282836",
    price_code: "HCM0001",
    price_name: "Hồ Chí Minh Khu vực A",
    price_service: "36H",
    price_method: "Kho - Kho",
    price_quytac: "Quy tắc 1",

    created_at: "2022/12/12 06:30",
    updated_at: "2022/12/12 06:30",
    status: "A",
  },
  {
    price_id: "066282837",
    price_code: "HCM0001",
    price_name: "Hồ Chí Minh Khu vực A",
    price_service: "36H",
    price_method: "Kho - Kho",
    price_quytac: "Quy tắc 1",

    created_at: "2022/12/12 06:30",
    updated_at: "2022/12/12 06:30",
    status: "A",
  },
  {
    price_id: "066282838",
    price_code: "HCM0001",
    price_name: "Hồ Chí Minh Khu vực A",
    price_service: "36H",
    price_method: "Kho - Kho",
    price_quytac: "Quy tắc 1",

    created_at: "2022/12/12 06:30",
    updated_at: "2022/12/12 06:30",
    status: "A",
  },
];
