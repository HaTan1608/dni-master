/* eslint-disable */
import { Popover, Switch, Popconfirm } from "antd";
import moment from "moment";
import SvgIcon3Dot from "src/assets/svg/SvgIcon3Dot";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import { RenderColTable } from "src/components/table/RenderColTable";
import { DATEFULLTIME, PAGE_SIZE_DEFAULT } from "src/constants";
import { typePropsColumn } from "./interfaces";

export const columnsData = (props: any) => {
  return [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        return (
          <button
            onClick={() =>
              props.roles.find((x: any) => x === "modify-user-system-info") &&
              props.btnOpenModal(record)
            }
          >
            {/* <Link to={location => ({ ...location, pathname: `${routerNames.USER_SYSTEM_EDIT}/${record.user_id}`, state: record })}> */}
            <span
              className={
                props.roles.find((x: any) => x === "modify-user-system-info") &&
                "text-accent_color_5_2"
              }
            >
              {text}
            </span>
            {/* </Link> */}
          </button>
        );
      },
    },
    {
      title: "Tên tài khoản",
      dataIndex: "full_name",
      key: "full_name",
      width: "25%",
      render: (text: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span className="text-neutral_color_1_3">
                Họ tên: <span className="text-neutral_color_1_2">{text}</span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                SĐT:{" "}
                <span className="text-neutral_color_1_2">{record.phone}</span>
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
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: "25%",
      render: (text: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span className="text-neutral_color_1_3">
                Ngày tạo:{" "}
                <span className="text-neutral_color_1_2">
                  {moment(text).format(DATEFULLTIME)}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Đăng nhập cuối:{" "}
                <span className="text-neutral_color_1_2">
                  {record.last_login
                    ? moment(record.last_login).format(DATEFULLTIME)
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
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role_name ",
      width: "15%",
      render: (text: string, record: any, index: number) => {
        const newData = [
          {
            name: (
              <span className="text-neutral_color_1_3">
                Chức vụ:{" "}
                <span className="text-neutral_color_1_2">
                  {text ? text : "-"}
                </span>
              </span>
            ),
          },
          {
            name: (
              <span className="text-neutral_color_1_3">
                Nơi làm việc: <span className="text-neutral_color_1_2">-</span>
              </span>
            ),
          },
        ];
        return <RenderColTable data={newData} />;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      render: (text: string, record: any, index: number) => {
        const _checked = text === "A" ? true : false;
        return props.roles.find((x: any) => x === "modify-user-system-info") ? (
          <Popconfirm
            title="Bạn có chắc muốn đổi trạng thái"
            onConfirm={(e) =>
              props.btnChangeStatus({ id: record.id, status: !_checked })
            }
          >
            <Switch checked={_checked} />
          </Popconfirm>
        ) : (
          <Switch
            checked={_checked}
            disabled={
              !props.roles.find((x: any) => x === "modify-user-system-info")
            }
          />
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any, index: number) => {
        return (
          props.roles.find((x: any) => x === "modify-user-system-info") && (
            <Popover
              content={content(props, record)}
              placement="bottom"
              title=""
              trigger="focus"
            >
              <button>
                <SvgIcon3Dot />
              </button>
            </Popover>
          )
        );
      },
    },
  ];
};
const content = (props: typePropsColumn, record: any) => (
  <div className="px-1" style={{ width: 200 }}>
    {/* <button
      onClick={() => props.btnOpenUpdatePassword(record)}
      className='flex items-center justify-start my-1'>
      <DIcon icon="lock" />
      <p className='text-14 px-2'>Đổi mật khẩu</p>
    </button> */}
    <button
      onClick={() => props.btnOpenModal(record)}
      className="flex items-center justify-start my-1"
    >
      <SvgIconEdit />
      <p className="text-14 px-2">Chỉnh sửa</p>
    </button>
  </div>
);

export const selectOptions = {
  name: "name",
  value: "value",
};

export const dataOptionsOnline = [
  { name: "Hiển thị", value: "A" },
  { name: "Ẩn", value: "D" },
];

export const defaultFilter = {
  status: undefined,
  q: "",
  currentPage: 1,
  sizePage: PAGE_SIZE_DEFAULT,
  isDispatch: false,
};
