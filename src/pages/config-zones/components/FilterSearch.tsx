import axios from "axios";
import React, { useEffect, useState } from "react";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconGroupBy from "src/assets/svg/SvgIconGroupBy";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import {
  defaultBtnStyles,
  defaultStyles,
} from "src/components/inputComponentsStyled/defaultStyles";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import styled from "styled-components";
import arrow from "../../../assets/images/arrow.svg";
import { dataStatus } from "../list/data";

const FilterSearch = ({ getFilterCallback }: any) => {
  const [cities, setCities] = useState<any[]>([]);
  const [optionsDistrictsFrom, setOptionsDistrictsFrom] = useState<any[]>([]);
  const [optionsDistrictsTo, setOptionsDistrictsTo] = useState<any[]>([]);

  const [paramsFilter, setParamsFilter] = useState<any>({
    fromProvince: undefined,
    toProvince: undefined,
    fromDistrict: undefined,
    toDistrict: undefined,
    status: undefined,
  });
  useEffect(() => {
    const getCities = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data) {
          let cities = data?.data?.provinces;
          let fakeCities = [];
          for (var i = 0; i < cities.length; i++) {
            fakeCities.push({
              label: cities[i]?.province_name,
              value: cities[i]?.id,
            });
          }
          setCities(fakeCities);
        }
      } catch (error) {}
    };
    getCities();
  }, []);
  useEffect(() => {
    if (paramsFilter.fromProvince) {
      const getCities = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/districts?province_id=${paramsFilter.fromProvince}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (data) {
            let districts = data?.data?.districts;
            let fakeDistricts = [];
            for (var i = 0; i < districts.length; i++) {
              fakeDistricts.push({
                label: districts[i]?.district_name,
                value: districts[i]?.id,
              });
            }
            setOptionsDistrictsFrom(fakeDistricts);
          }
        } catch (error) {}
      };

      getCities();
    }
  }, [paramsFilter.fromProvince]);

  useEffect(() => {
    if (paramsFilter.toProvince) {
      const getCities = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/${ROOT_VERSION}/districts?province_id=${paramsFilter.toProvince}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (data) {
            let districts = data?.data?.districts;
            let fakeDistricts = [];
            for (var i = 0; i < districts.length; i++) {
              fakeDistricts.push({
                label: districts[i]?.district_name,
                value: districts[i]?.id,
              });
            }
            setOptionsDistrictsTo(fakeDistricts);
          }
        } catch (error) {}
      };

      getCities();
    }
  }, [paramsFilter.toProvince]);

  const handleChangeProvinceFrom = (e: any) => {
    setParamsFilter({
      ...paramsFilter,
      fromProvince: e,
      fromDistrict: undefined,
    });
  };

  const handleChangeProvinceTo = (e: any) => {
    setParamsFilter({
      ...paramsFilter,
      toProvince: e,
      toDistrict: undefined,
    });
  };

  const handleSearch = () => {
    getFilterCallback(paramsFilter);
  };

  const handleRefresh = () => {
    setParamsFilter({
      fromProvince: undefined,
      toProvince: undefined,
      fromDistrict: undefined,
      toDistrict: undefined,
      status: undefined,
    });
    getFilterCallback({
      fromProvince: undefined,
      toProvince: undefined,
      fromDistrict: undefined,
      toDistrict: undefined,
      status: undefined,
    });
  };
  return (
    <FilterSearchComponent>
      <div className="filterSearch-filters">
        <DropdownSelectLabel
          label="Từ tỉnh thành:"
          {...defaultStyles}
          placeholder="Chọn tỉnh thành"
          suffixIcon={<img src={arrow} alt="" />}
          onChangeSelect={(e: any) => handleChangeProvinceFrom(e)}
          value={paramsFilter.fromProvince}
          options={cities}
          width="12%"
          margin="0 16px 0 0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
        />
        <DropdownSelectLabel
          label="Từ quận huyện:"
          {...defaultStyles}
          placeholder="Chọn quận huyện"
          suffixIcon={<img src={arrow} alt="" />}
          onChangeSelect={(e: any) =>
            setParamsFilter({
              ...paramsFilter,
              fromDistrict: e,
            })
          }
          value={paramsFilter.fromDistrict}
          options={optionsDistrictsFrom}
          width="12%"
          margin="0 16px 0 0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
        />
        <DropdownSelectLabel
          label="Đến tỉnh thành:"
          {...defaultStyles}
          placeholder="Chọn tỉnh thành"
          suffixIcon={<img src={arrow} alt="" />}
          onChangeSelect={(e: any) => handleChangeProvinceTo(e)}
          value={paramsFilter.toProvince}
          options={cities}
          width="12%"
          margin="0 16px 0 0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
        />
        <DropdownSelectLabel
          label="Đến quận huyện:"
          {...defaultStyles}
          placeholder="Chọn quận huyện"
          suffixIcon={<img src={arrow} alt="" />}
          onChangeSelect={(e: any) =>
            setParamsFilter({
              ...paramsFilter,
              toDistrict: e,
            })
          }
          value={paramsFilter.toDistrict}
          options={optionsDistrictsTo}
          width="12%"
          margin="0 16px 0 0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
        />
        <DropdownSelectLabel
          label="Trạng thái"
          {...defaultStyles}
          placeholder="Chọn trạng thái"
          suffixIcon={<img src={arrow} alt="" />}
          onChangeSelect={(e: any) =>
            setParamsFilter({
              ...paramsFilter,
              status: e,
            })
          }
          value={paramsFilter.status}
          options={dataStatus}
          width="12%"
          margin="0 16px 0 0"
        />
        <ButtonStyled
          {...defaultBtnStyles}
          text="Tìm kiếm"
          svg={<SvgIconSearch />}
          svgMargin="0 4px 0 0"
          border="1px solid #000"
          svgColor="#000"
          onClick={handleSearch}
          width="120px"
          margin="0 16px 0 0"
        />
        <ButtonStyled
          {...defaultBtnStyles}
          text="Làm mới"
          svg={<SvgIconRefresh />}
          svgColor="#000"
          svgMargin="0 4px 0 0"
          border="1px solid #000"
          onClick={handleRefresh}
          width="120px"
        />
      </div>
      <div className="filterSearch-action">
        <ActionsHeader
          actions={[
            { text: "Xuất file", svg: <SvgIconExportFile />, scale: true },
            { text: "Nhập file", svg: <SvgIconImportFile />, scale: true },
            { text: "Sắp xếp", svg: <SvgIconGroupBy />, scale: true },
          ]}
        />
      </div>
    </FilterSearchComponent>
  );
};

export default FilterSearch;

const FilterSearchComponent = styled.div`
  position: relative;
  height: 50px;
  margin-top: 16px;

  .filterSearch-action {
    position: absolute;
    top: 0;
    right: 0;
    width: 33%;
    margin-bottom: 10px;
  }
  .filterSearch-filters {
    position: absolute;
    top: 0;
    left: 0;
    width: 67%;
    height: 41px;
    display: flex;
  }
`;
