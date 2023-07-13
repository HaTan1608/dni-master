import { useEffect, useState } from "react";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import ButtonStyled from "src/components/inputComponentsStyled/ButtonStyled";
import {
  defaultBtnStyles,
  defaultStyles,
} from "src/components/inputComponentsStyled/defaultStyles";
import DropdownSelectAntd from "src/components/inputComponentsStyled/DropdownSelectAntd";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import colors from "src/utils/colors";
import styled from "styled-components";
import arrow from "../../../assets/images/arrow.svg";
import { dataStatus } from "../edit/data";

const FilterPrice = ({
  onClickBtnAddCallback,
  getValuesFilterCallback,
  applyTypes,
  roles
}: any) => {
  const [filterPriceDetails, setFilterPriceDetails] = useState<any>({
    filterName: undefined,
    filterStatus: undefined,
    filterApplyType: undefined,
  });
  useEffect(() => {
    getValuesFilterCallback(filterPriceDetails);
  }, [filterPriceDetails]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <FilterPriceComponent>
      <div className="filterCustomer-filters">
        <InputNewStyled
          {...defaultStyles}
          placeholder="Mã vùng "
          suffixIcon={<SvgIconSearch />}
          suffixLeft="12px"
          padding="0px 12px 0px 36px"
          width="20%"
          margin="0 8px 0 0"
          onChange={(e: any) =>
            setFilterPriceDetails({ ...filterPriceDetails, filterName: e })
          }
        />

        <DropdownSelectAntd
          {...defaultStyles}
          placeholder="Kiểu đơn giá"
          suffixIcon={<img src={arrow} alt="" />}
          onChangeSelect={(e: any) =>
            setFilterPriceDetails({ ...filterPriceDetails, filterApplyType: e })
          }
          options={applyTypes}
          margin="0 8px 0 0"
          padding="0"
          width="20%"
        />
        <DropdownSelectAntd
          {...defaultStyles}
          placeholder="TT Hoạt động"
          suffixIcon={<img src={arrow} alt="" />}
          onChangeSelect={(e: any) =>
            setFilterPriceDetails({ ...filterPriceDetails, filterStatus: e })
          }
          options={dataStatus}
          padding="0"
          margin="0 8px 0 0"
          width="20%"
        />
        <ButtonStyled
          {...defaultStyles}
          text="Tìm kiếm"
          svg={<SvgIconSearch />}
          svgMargin="0 8px 0 0"
          width="160px"
        />
      </div>
      {roles.find((x:any) => x === "update-list-config-price")&&<div className="filterCustomer-button">
        <ButtonStyled
          {...defaultBtnStyles}
          text="Thêm mới"
          svg={<SvgIconPlus />}
          svgColor="#fff"
          svgScale="0.9"
          svgMargin="0 4px 0 0"
          width="140px"
          mainBackground={colors.accent_color_5_2}
          color="#fff"
          onClick={() => onClickBtnAddCallback()}
        />
      </div>}
    </FilterPriceComponent>
  );
};

export default FilterPrice;

const FilterPriceComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  .filterCustomer-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 140px;
  }
  .filterCustomer-filters {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: calc(100% - 240px);
  }
  .ant-picker.ant-picker-range {
    width: 30%;
    height: 41px;
    border-radius: 5px;
    margin-right: 8px;
  }
`;
