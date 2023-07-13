/* eslint-disable */
import { Checkbox, Switch, Tooltip } from "antd";
import moment from "moment";
import { RenderColTable } from "src/components/table/RenderColTable";
import { DATETIME, PAGE_SIZE_DEFAULT } from "src/constants";
import { getAddressString } from "src/utils/helpers/functions/textUtils";

export const columnsDataWarehouse = () => {
  return [
    // {
    //   title: 'Kho',
    //   dataIndex: 'ws_code',
    //   key: 'ws_code',
    //   width: '20%',
    //   render: (text: string, record: any, index: number) => {
    //     const newData = [
    //       {
    //         name: <span className="text-neutral_color_1_3">Mã kho: <span
    //         //   onClick={() => props.btnOpenModal(record)}
    //           className="text-accent_color_5_2">{text}</span>
    //         </span>,
    //       },
    //       {
    //         name: <span className="text-neutral_color_1_3">Tên kho: <span
    //           className="text-neutral_color_1_2">
    //             {record.ws_name}
    //           </span>
    //         </span>,
    //       },
    //     ]
    //     return (
    //       <RenderColTable data={newData} />
    //     );
    //   },
    // },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "30%",
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any, index: number) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <span className="text-neutral_color_1_2">
              {text
                ? getAddressString(
                    text,
                    record.ward_name,
                    record.district_name,
                    record.province_name
                  )
                : "-"}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {moment(text).format(DATETIME)}
          </span>
        );
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {moment(text).format(DATETIME)}
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      render: (text: string, record: any, index: number) => {
        return (
          <Switch
            checked={text === "A" ? true : false}
            // onChange={(e) => props.btnChangeStatus({ id: record.id, status: e })}
          />
        );
      },
    },
    {
      title: "Đ/c mặc định",
      dataIndex: "is_main",
      key: "is_main",
      width: "10%",
      align: "center",
      render: (text: any, record: any, index: number) => {
        return <Checkbox checked={text} />;
      },
    },
  ];
};

export const columnsDataPrice = (props: any) => {
  return [
    {
      title: "Bảng giá",
      dataIndex: "value",
      key: "value",
      width: "20%",
      render: (text: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span
                //   onClick={() => props.btnOpenModal(record)}
                className="text-accent_color_5_2"
              >
                {text}
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_2">
                {record.price_name}
              </span>
            ),
          },
        ];
        return <RenderColTable data={newData} />;
      },
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
      width: "10%",
      render: (text: string, record: any, index: number) => {
        return <span className="text-neutral_color_1_2">{text}</span>;
      },
    },
    {
      title: "PT vận chuyển",
      dataIndex: "transport_method",
      key: "transport_method",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return <span className="text-neutral_color_1_2">{text}</span>;
      },
    },
    {
      title: "Quy tắc áp giá",
      dataIndex: "calculation_type_name",
      key: "calculation_type_name",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">{record.calculation_type_name}</span>
        );
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {moment(text).format(DATETIME)}
          </span>
        );
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {moment(text).format(DATETIME)}
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      render: (text: string, record: any, index: number) => {
        return (
          <Switch
          checked={record.status === "A" ? true : false}
            // onChange={(e) => props.btnChangeStatus({ id: record.id, status: e })}
          />
        );
      },
    },
  ];
};

export const defaultFilter = {
  status: undefined,
  q: "",
  currentPage: 1,
  sizePage: PAGE_SIZE_DEFAULT,
  isDispatch: false,
};

export const typeScreenFormCustomer = {
  INFO: 1,
  CONTRACT: 2,
  WAREHOUSE: 3,
  PRICE: 4,
  SERVICE: 5,
};

export const selectOptionsValueProvince = {
  name: "province_name",
  value: "id",
};

export const selectOptionsValueDistrict = {
  name: "district_name",
  value: "id",
};

export const selectOptionsValueWard = {
  name: "ward_name",
  value: "id",
};
export const selectOptionsType = [
  { label: "Ga - Ga", value: "1" },
  { label: "Ga - Kho", value: "2" },
  { label: "Kho - Kho", value: "3" },
  { label: "Kho - Ga", value: "4" },
];
export const selectOptionsTypeCategories = [
  { label: "Hàng thường", value: "1" },
  { label: "Hàng giá trị cao", value: "2" },
];
export const selectOptionsTypePay = [
  { label: "Công nợ", value: "1" },
  { label: "Người gửi thanh toán", value: "2" },
  { label: "Người nhận thanh toán", value: "3" },
];
export const defaultData = [
  {
    warehouse_code: "HCM001",
    warehouse_name: "Kho Tân Bình - HCM",
    warehouse_address:
      "253A Cộng Hòa Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    created_at: 1651167240000,
    updated_at: 1651167240000,
    status: "A",
    isDefault: true,
  },
  {
    warehouse_code: "HCM001",
    warehouse_name: "Kho Quận 3 - HCM",
    warehouse_address:
      "Hẻm, 95 A2 Đ. Trần Quốc Toản Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh",
    created_at: 1651167240000,
    updated_at: 1651167240000,
    status: "A",
    isDefault: false,
  },
];
