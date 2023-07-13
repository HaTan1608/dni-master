/* eslint-disable */
import { Select } from "antd";
import styled from "styled-components";

interface DropdownSelectAntdInterfaces {
  placeholder?: string;
  options: any[];
  onChangeSelect?: any;
  mainBackground?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  fontWeight?: string;
  borderRadius?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  suffixIcon?: any;
  iconSvgTop?: string;
  iconSvgRight?: string;
  leftHolder?: string;
  topHolder?: string;
  defaultValue?: any;
}

interface StyledCss {
  mainbackground?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  borderradius?: string;
  border?: string;
  bordertop?: string;
  borderright?: string;
  fontWeight?: string;
  borderbottom?: string;
  borderleft?: string;
  iconsvgtop?: string;
  iconsvgright?: string;
  leftholder?: string;
  topholder?: string;
  label?: string;
}

const DropdownSelectAntd = ({
  placeholder,
  options,
  onChangeSelect,
  mainBackground,
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
  defaultValue,
  fontWeight,
  ...rest
}: DropdownSelectAntdInterfaces) => {
  return (
    <DropdownStyled
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
      iconsvgtop={iconSvgTop}
      iconsvgright={iconSvgRight}
      options={options}
      suffixIcon={suffixIcon}
      placeholder={placeholder}
      onChange={onChangeSelect}
      leftholder={leftHolder}
      fontWeight={fontWeight}
      topholder={topHolder}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default DropdownSelectAntd;

const DropdownStyled = styled(Select)<StyledCss>`
  position: relative;
  width: ${(props) => props.width || "300px"}!important;
  height: ${(props) => props.height || "50px"}!important;
  margin: ${(props) => props.margin || "0"}!important;
  padding: ${(props) => props.padding}!important;

  background: ${(props) => props.mainbackground}!important;

  display: flex;
  align-item: center;

  .ant-select-selector {
    height: 100% !important;
    width: 100%;
    border: ${(props) => props.border}!important;

    border-top: ${(props) => props.bordertop}!important;
    border-bottom: ${(props) => props.borderbottom}!important;
    border-right: ${(props) => props.borderright}!important;
    border-left: ${(props) => props.borderleft}!important;
    border-radius: ${(props) => props.borderradius || "10px"}!important;
  }
  input {
    height: 100% !important;
    display: flex;
    align-items: center;
    font-weight: ${(props) => props.fontWeight};
  }
  .ant-select-selection-item {
    height: 100% !important;
    display: flex;
    align-items: center;
    position: unset !important;
    font-weight: ${(props) => props.fontWeight};
  }
  .ant-select-selection-placeholder {
    height: 100% !important;
    display: flex;
    align-items: center;
    margin: 0;
    position: unset !important;
    font-weight: ${(props) => props.fontWeight};
  }
  .ant-select-arrow {
    top: ${(props) => props.iconsvgtop}!important;
    right: ${(props) => props.iconsvgright}!important;
  }
`;
