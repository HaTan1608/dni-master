/* eslint-disable */
import { Select, Form } from "antd";
import styled from "styled-components";
import { StyledSelectCss } from "../styled.interfaces";

interface FormSelectAntdInterfaces {
  placeholder?: string;
  options: any[];
  onChange?: any;
  color?: any;
  suffixIcon?: any;
  disabled?: boolean;
  leftHolder?: string;
  topHolder?: string;
  rules?: any;
  mainBackground?: string;
  colorPlaceholder?: string;
  iconSvgTop?: string;
  iconSvgRight?: string;
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
  fontSize?: string;
  fontWeight?: number;
  name?: string;
  id?: string;
  className?: string;
  label?: any;
  topLabel?: string;
  leftLabel?: string;
  colorLabel?: string;
  fontSizeLabel?: string;
  fontWeightLabel?: string;
  defaultValue?: any;
  showSearch?: any;
  optionFilterProp?: any;
  filterOption?: any;
  filterSort?: any;
  keyPhone?: boolean;
  mode?: any;
}

const FormSelectAntd = ({
  placeholder,
  options,
  onChange,
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
  leftHolder,
  topHolder,
  name,
  id,
  className,
  rules,
  label,
  topLabel,
  leftLabel,
  colorLabel,
  fontSizeLabel,
  fontWeightLabel,
  disabled,
  color,
  defaultValue,
  showSearch,
  optionFilterProp,
  filterOption,
  filterSort,
  keyPhone,
  mode,
}: FormSelectAntdInterfaces) => {
  return (
    <ContainerStyled
      className={className}
      id={id}
      mainbackground={mainBackground}
      borderradius={borderRadius}
      border={border}
      bordertop={borderTop}
      borderright={borderRight}
      borderbottom={borderBottom}
      borderleft={borderLeft}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      toplabel={topLabel}
      leftlabel={leftLabel}
      colorlabel={colorLabel}
      fontsizelabel={fontSizeLabel}
      fontweightlabel={fontWeightLabel}
      label={label}
    >
      <span className="labelSelect">{label}</span>

      <ItemStyled name={name} rules={rules}>
        <DropdownStyled
          height={height}
          colorplaceholder={colorPlaceholder}
          iconsvgtop={iconSvgTop}
          iconsvgright={iconSvgRight}
          options={options}
          suffixIcon={suffixIcon}
          placeholder={placeholder}
          onChange={onChange}
          leftholder={leftHolder}
          topholder={topHolder}
          toplabel={topLabel}
          leftlabel={leftLabel}
          colorlabel={colorLabel}
          fontsizelabel={fontSizeLabel}
          label={label}
          disabled={disabled}
          color={color}
          defaultValue={defaultValue}
          showSearch={showSearch}
          optionFilterProp={optionFilterProp}
          filterOption={filterOption}
          filterSort={filterSort}
          mode={mode}
        />
      </ItemStyled>
    </ContainerStyled>
  );
};

FormSelectAntd.defaultProps = {
  width: "300px",
  height: "50px",
  margin: "0px",
  padding: "0px",
  mainBackground: "transparent",
  topLabel: "0px",
  leftLabel: "0px",
  fontSizeLabel: "12px",
  colorLabel: "#000",
};

export default FormSelectAntd;

const ContainerStyled = styled.div<StyledSelectCss>`
  position: relative;
  width: ${(props) => props.width}!important;
  height: ${(props) => props.height}!important;
  margin: ${(props) => props.margin}!important;
  background: ${(props) => props.mainbackground}!important;

  display: flex;
  align-item: center;
  margin-top: ${(props) =>
    props.label &&
    `calc(${props.fontsizelabel} + ${
      props.margin?.split(" ")[0]
    } + 8px)`}!important;
  .ant-select-selector {
    border-top: ${(props) => props.bordertop}!important;
    border-bottom: ${(props) => props.borderbottom}!important;
    border-right: ${(props) => props.borderright}!important;
    border-left: ${(props) => props.borderleft}!important;
    border-radius: ${(props) => props.borderradius || "10px"}!important;
  }
  .labelSelect {
    position: absolute !important;
    bottom: 100%;
    left: ${(props) => props.leftlabel}!important;
    font-size: ${(props) => props.fontsizelabel}!important;
    color: ${(props) => props.colorlabel}!important;
    font-weight: ${(props) => props.fontweightlabel}!important;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
  }
  .ant-form-item-explain.ant-form-item-explain-connected {
    position: absolute;
    top: 100%;
  }
`;
const ItemStyled = styled(Form.Item)<StyledSelectCss>`
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: ${(props) => props.padding}!important;

  display: flex;
  align-item: center;
`;
const DropdownStyled = styled(Select)<StyledSelectCss>`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  display: flex;
  align-item: center;
  width: 100%;
  height: ${(props) => props.height}!important;
  .ant-select-selector {
    height: 100% !important;
    width: 100%;
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
    position: unset !important;
    margin: 0 !important;
    color: ${(props) => props.color};
  }
  .ant-select-selection-placeholder {
    height: 100% !important;
    display: flex;
    align-items: center;
    margin: 0 !important;
    position: unset !important;
  }
  .ant-select-arrow {
    top: ${(props) => props.iconsvgtop}!important;
    right: ${(props) => props.iconsvgright}!important;
  }
`;
