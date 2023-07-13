/* eslint-disable */
import { Popconfirm, Switch } from "antd";
import moment from "moment";
import { RenderColTable } from "src/components/table/RenderColTable";
import { DATEFULLTIME, PAGE_SIZE_DEFAULT } from "src/constants";
import { getAddressString } from "src/utils/helpers/functions/textUtils";
import { typePropsColumn } from "./interfaces";

export const columnsData = (props: any) => {
  return [
    {
      title: "Thông tin cơ bản",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span className="text-neutral_color_1_3">
                Mã - Tên KH:{" "}
                <span className="text-neutral_color_1_2">
                  {record.customer_code ? (
                    <span>
                      <span
                        onClick={() => props.btnOpenModal(record)}
                        className="text-accent_color_5_2 cursor-pointer"
                      >
                        {record.customer_code} -{" "}
                      </span>{" "}
                      {text}
                    </span>
                  ) : (
                    text
                  )}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Nhóm KH:{" "}
                <span className="text-neutral_color_1_2">
                  {record.customer_group}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Loại KH:{" "}
                <span className="text-neutral_color_1_2">
                  {record.customer_type}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                SĐT:{" "}
                <span
                  onClick={() => props.btnOpenModal(record)}
                  className="text-accent_color_5_2 cursor-pointer"
                >
                  {record.phone}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Email:{" "}
                <span className="text-neutral_color_1_2">{record.email}</span>
              </span>
            ),
          },
        ];
        return <RenderColTable data={newData} />;
      },
    },
    {
      title: "Thông tin thuế",
      dataIndex: "tax_code",
      key: "tax_code",
      render: (text: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span className="text-neutral_color_1_3">
                Mã số thuế:{" "}
                <span className="text-neutral_color_1_2">
                  {text ? text : "-"}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Ngân hàng:{" "}
                <span className="text-neutral_color_1_2">
                  {record.bank_name ? record.bank_name : "-"}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                STK:{" "}
                <span className="text-neutral_color_1_2">
                  {record.bank_account_number
                    ? record.bank_account_number
                    : "-"}
                </span>
              </span>
            ),
          },
        ];
        return <RenderColTable data={newData} />;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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
      render: (text: string, record: any, index: number) => {
        return (
          <span className="text-neutral_color_1_2">
            {moment(text).format(DATEFULLTIME)}
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text: string, record: any, index: number) => {
        const _checked = text === "A" ? true : false;
        return props.roles.find((x: any) => x === "modify-customer-info") ? (
          <Popconfirm
            title="Bạn có chắc muốn đổi trạng thái"
            onConfirm={(e) =>
              props.btnChangeStatus({
                id: record.user_id,
                status: !_checked,
              })
            }
          >
            <Switch checked={_checked} />
          </Popconfirm>
        ) : (
          <Switch
            checked={_checked}
            disabled={
              !props.roles.find((x: any) => x === "modify-customer-info")
            }
          />
        );
      },
    },
  ];
};

export const defaultFilter = {
  status: undefined,
  province: undefined,
  customerType: undefined,
  q: "",
  currentPage: 1,
  sizePage: PAGE_SIZE_DEFAULT,
  isDispatch: false,
};
