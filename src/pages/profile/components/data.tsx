/* eslint-disable */
import { Checkbox, Switch } from "antd";
import moment from "moment";
import { DATETIME, PAGE_SIZE_DEFAULT } from "src/constants";
import { getAddressString } from "src/utils/helpers/functions/textUtils";

export const columnsData = (props: any) => {
  return [
    {
      title: "Mã địa chỉ",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (text: string, record: any, index: number) => (
        <span
          className="text-accent_color_5_2 cursor-pointer"
          onClick={() => props.btnOpenModal(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "30%",
      render: (text: string, record: any, index: number) => {
        return (
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
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
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
      width: "10%",
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
            defaultChecked={text === "A" ? true : false}
            onChange={(e) => props.btnChangeStatus({ data: record, status: e })}
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
        return (
          <Checkbox
            defaultChecked={text}
            onChange={(e) =>
              props.btnChangeIsMain({ data: record, is_main: e.target.checked })
            }
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

export const typeScreenFormCustomer = {
  INFO: 1,
  CONTRACT: 2,
  WAREHOUSE: 3,
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

export const selectOptionsValueBank = {
  name: "short_name",
  value: "id",
};

export const selectOptionsValueBranchBank = {
  name: "branch_name",
  value: "id",
};
