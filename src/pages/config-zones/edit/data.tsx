import { Switch } from "antd";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import arrow from "../../../assets/images/arrow.svg";

export const columnsZones = ({
  cities,
  handleChangeFromProvinceDetail,
  handleChangeToProvinceDetail,
  handleChangeFromDistrictDetail,
  handleChangeToDistrictDetail,
  handleChangeStatusDetail,
  roles
}: any) => {
  return [
    {
      title: "ID",
      dataIndex: "zone_detail_id",
      key: "zone_detail_id",
      render: (zone_detail_id: string, record: any, index: number) => {
        return (
          <span className="text-Blue_2">
            {Number(zone_detail_id) ? zone_detail_id : ""}
          </span>
        );
      },
    },
    {
      title: "Từ tỉnh",
      dataIndex: "from_province_id",
      key: "from_province_id",
      render: (from_province_id: string, record: any, index: number) => {
        return (
          <DropdownSelectLabel
            {...defaultStyles}
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) =>
              handleChangeFromProvinceDetail(e, record)
            }
            value={record.from_province_id}
            disabled={roles.find((x:any) => x === "update-list-zone-details")?false:true}
            options={cities}
            width="100%"
            margin="0 16px 0 0"
            showSearch
            optionFilterProp="label"
            filterOption={(input: any, option: any) =>
              option.label.includes(input)
            }
          />
        );
      },
    },
    {
      title: "Từ quận huyện",
      dataIndex: "zone_name",
      key: "zone_name",
      render: (zone_name: string, record: any, index: number) => {
        return (
          <DropdownSelectLabel
            {...defaultStyles}
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) =>
              handleChangeFromDistrictDetail(e, record)
            }
            options={record.from_options_district || []}
            value={record.from_district_id}
            disabled={roles.find((x:any) => x === "update-list-zone-details")?false:true}
            width="100%"
            margin="0 16px 0 0"
            showSearch
            optionFilterProp="label"
            filterOption={(input: any, option: any) =>
              option.label.includes(input)
            }
          />
        );
      },
    },
    {
      title: "Đến tỉnh",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string, record: any, index: number) => {
        return (
          <DropdownSelectLabel
            {...defaultStyles}
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) => handleChangeToProvinceDetail(e, record)}
            options={cities}
            disabled={roles.find((x:any) => x === "update-list-zone-details")?false:true}
            value={record.to_province_id}
            width="100%"
            margin="0 16px 0 0"
            showSearch
            optionFilterProp="label"
            filterOption={(input: any, option: any) =>
              option.label.includes(input)
            }
          />
        );
      },
    },
    {
      title: "Đến quận huyện",
      dataIndex: null,
      key: null,
      render: (updated_at: string, record: any, index: number) => {
        return (
          <DropdownSelectLabel
            {...defaultStyles}
            suffixIcon={<img src={arrow} alt="" />}
            onChangeSelect={(e: any) => handleChangeToDistrictDetail(e, record)}
            options={record.to_options_district || []}
            value={record.to_district_id}
            disabled={roles.find((x:any) => x === "update-list-zone-details")?false:true}
            width="100%"
            margin="0 16px 0 0"
            showSearch
            optionFilterProp="label"
            filterOption={(input: any, option: any) =>
              option.label.includes(input)
            }
          />
        );
      },
    },
    {
      title: "TT hoạt động",
      dataIndex: null,
      key: null,
      render: (text: string, record: any, index: number) => {
        return (
          <Switch
            onChange={(e: any) => handleChangeStatusDetail(e, record)}
            disabled={roles.find((x:any) => x === "update-list-zone-details")?false:true}
            checked={record.status === "A" ? true : false}
          />
        );
      },
    },
  ];
};

export const dataZone = [
  {
    zone_id: "066282836",
    zone_code: "HCM0001",
    zone_name: "Hồ Chí Minh Khu vực A",
    created_at: "2022/12/12 06:30",
    updated_at: "2022/12/12 06:30",
    status: "A",
  },
  {
    zone_id: "066282836",
    zone_code: "HCM0001",
    zone_name: "Hồ Chí Minh Khu vực A",
    created_at: "2022/12/12 06:30",
    updated_at: "2022/12/12 06:30",
    status: "A",
  },
  {
    zone_id: "066282836",
    zone_code: "HCM0001",
    zone_name: "Hồ Chí Minh Khu vực A",
    created_at: "2022/12/12 06:30",
    updated_at: "2022/12/12 06:30",
    status: "A",
  },
  {
    zone_id: "066282836",
    zone_code: "HCM0001",
    zone_name: "Hồ Chí Minh Khu vực A",
    created_at: "2022/12/12 06:30",
    updated_at: "2022/12/12 06:30",
    status: "A",
  },
];
