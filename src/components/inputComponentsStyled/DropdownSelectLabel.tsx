/* eslint-disable */
import { Select } from "antd";
import styled from "styled-components";
import { StyledCss } from "./styled.interfaces";

interface DropdownSelectLabelInterfaces {
  placeholder?: string;
  options: any[];
  onChangeSelect?: any;
  mainBackground?: string;
  colorPlaceholder?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  suffixIcon?: any;
  iconSvgTop?: string;
  iconSvgRight?: string;
  label?: any;
  labelSize?: string;
  labelTop?: string;
  labelLeft?: string;
  labelColor?: string;
  value?: any;
  disabled?: any;
  showSearch?: any;
  optionFilterProp?: any;
  filterOption?: any;
  filterSort?: any;
  defaultValue?: any;
  className?: any;
  style?: any;
}

const DropdownSelectLabel = ({
  placeholder,
  options,
  onChangeSelect,
  mainBackground,
  colorPlaceholder,
  iconSvgTop,
  iconSvgRight,
  width,
  height,
  margin,
  padding,
  borderRadius,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  suffixIcon,
  label,
  labelSize,
  labelTop,
  labelLeft,
  labelColor,
  value,
  disabled,
  showSearch,
  optionFilterProp,
  filterOption,
  filterSort,
  defaultValue,
  className,
  style,
}: DropdownSelectLabelInterfaces) => {
  return (
    <ContainerDropdownSelect
      labelsize={labelSize}
      labeltop={labelTop}
      labelleft={labelLeft}
      labelcolor={labelColor}
      width={width}
      margin={margin}
      height={height}
      borderradius={borderRadius}
      style={style}
    >
      <DropdownStyled
        mainbackground={mainBackground}
        colorplaceholder={colorPlaceholder}
        borderradius={borderRadius}
        border={border}
        bordertop={borderTop}
        borderright={borderRight}
        borderbottom={borderBottom}
        borderleft={borderLeft}
        height={height}
        iconsvgtop={iconSvgTop}
        iconsvgright={iconSvgRight}
        options={options}
        suffixIcon={suffixIcon}
        placeholder={placeholder}
        labelsize={labelSize}
        onChange={onChangeSelect}
        value={value}
        disabled={disabled}
        showSearch={showSearch}
        optionFilterProp={optionFilterProp}
        filterOption={filterOption}
        filterSort={filterSort}
        padding={padding}
        defaultValue={defaultValue}
      >
        {options.length > 0 &&
          options.map((x, index) => (
            <Select.Option value={x.value} key={index} className={className}>
              {x.label}
            </Select.Option>
          ))}
      </DropdownStyled>
      {label && <span className="containerDropdownLabel">{label}</span>}
    </ContainerDropdownSelect>
  );
};

export default DropdownSelectLabel;

const ContainerDropdownSelect = styled.div<StyledCss>`
  position: relative;
  margin: ${(props) => props.margin || "0"}!important;
  padding: ${(props) => props.padding}!important;
  width: ${(props) => props.width}!important;
  border-radius: ${(props) => props.borderradius || "10px"}!important;

  .containerDropdownLabel {
    position: absolute;
    bottom: 100% !important;
    left: ${(props) => props.labelleft}!important;
    font-size: ${(props) => props.labelsize || "12px"}!important;
    color: ${(props) => props.labelcolor || "#000"}!important;
  }
`;
const DropdownStyled = styled(Select)<StyledCss>`
  position: relative;
  width: 100% !important;
  height: ${(props) => props.height || "50px"}!important;

  background: ${(props) => props.mainbackground}!important;
  border-top: ${(props) => props.bordertop}!important;
  border-bottom: ${(props) => props.borderbottom}!important;
  border-right: ${(props) => props.borderright}!important;
  border-left: ${(props) => props.borderleft}!important;
  border-radius: ${(props) => props.borderradius || "10px"}!important;

  display: flex;
  align-item: center;

  .ant-select-selector {
    padding-top: ${(props) =>
      props.labelsize ? `calc(${props.labelsize})!important` : "0!important"};
    height: 100% !important;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: ${(props) => props.borderradius || "10px"}!important;
  }
  input {
    height: 100% !important;
    display: flex;
    align-items: center;
  }
  .ant-select-selection-item {
    height: 100% !important;
    display: flex;

    align-items: center;
  }
  .ant-select-selection-placeholder {
    height: 100% !important;
    display: flex;
    align-items: center;
    top: 0 !important;
    left: 0 !important;
  }
  .ant-select-arrow {
    top: ${(props) => props.iconsvgtop}!important;
    right: ${(props) => props.iconsvgright}!important;
  }
`;
