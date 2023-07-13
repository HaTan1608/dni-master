/* eslint-disable */
import styled from "styled-components";
import { StyledCss } from "./styled.interfaces";

interface ButtonStyledInterfaces {
  svg?: any;
  text?: string;
  onClick?: any;
  key?: any;
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
  form?: any;
  htmlFor?: any;
  type?: any;
  name?: string;
  id?: string;
  className?: string;
  label?: any;
  topLabel?: string;
  leftLabel?: string;
  colorLabel?: string;
  fontSizeLabel?: string;
  minWidth?: string;
  maxWidth?: string;
  color?: string;
  svgMargin?: string;
  svgPadding?: string;
  svgScale?: string;
  svgColor?: string;
  disabled?:boolean;
}

const ButtonStyled = ({
  className,
  svg,
  text,
  mainBackground,
  fontWeight,
  fontSize,
  width,
  minWidth,
  maxWidth,
  padding,
  margin,
  height,
  border,
  borderTop,
  borderLeft,
  borderBottom,
  borderRight,
  borderRadius,
  color,
  svgMargin,
  svgPadding,
  svgScale,
  svgColor,
  form,
  type,
  htmlFor,
  onClick,
  disabled,
  key,
}: ButtonStyledInterfaces) => {
  return (
    <ButtonStyledComponent
      className={className}
      mainbackground={mainBackground}
      form={form}
      htmlFor={htmlFor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      border={border}
      bordertop={borderTop}
      borderleft={borderLeft}
      borderbottom={borderBottom}
      borderright={borderRight}
      borderradius={borderRadius}
      color={color}
      svgmargin={svgMargin}
      svgpadding={svgPadding}
      svgscale={svgScale}
      svgcolor={svgColor}
      onClick={onClick}
      minwidth={minWidth}
      maxwidth={maxWidth}
      key={key}
      type={type}
      disabled={disabled}
    >
      {svg}
      {text}
    </ButtonStyledComponent>
  );
};

ButtonStyled.defaultProps = {
  width: "auto",
  height: "auto",
  margin: "0",
  padding: "0",
  mainBackground: "transparent",
  topLabel: "0px",
  leftLabel: "0px",
  fontSizeLabel: "12px",
  colorLabel: "#000",
  border: "none",
  fontWeight: 400,
  fontSize: "14px",
};

export default ButtonStyled;

const ButtonStyledComponent = styled.div<StyledCss>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${(props) => props.mainbackground}!important;
  font-size: ${(props) => props.fontSize}!important;
  font-weight: ${(props) => props.fontWeight}!important;
  padding: ${(props) => props.padding}!important;
  margin: ${(props) => props.margin}!important;
  width: ${(props) => props.width}!important;
  min-width: ${(props) => props.minwidth || "unset"}!important;
  max-width: ${(props) => props.maxwidth || "unset"}!important;
  height: ${(props) => props.height}!important;
  border: ${(props) => props.border}!important;
  border-top: ${(props) => props.bordertop}!important;
  border-right: ${(props) => props.borderright}!important;
  border-bottom: ${(props) => props.borderbottom}!important;
  border-left: ${(props) => props.borderleft}!important;
  border-radius: ${(props) => props.borderradius}!important;
  color: ${(props) => props.color}!important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  svg {
    margin: ${(props) => props.svgmargin}!important;
    padding: ${(props) => props.svgpadding}!important;
    transform: scale(${(props) => props.svgscale}) !important;
    path {
      fill: ${(props) => props.svgcolor}!important;
    }
  }
`;
