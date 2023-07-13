/* eslint-disable */
import { useState } from "react";
import styled from "styled-components";
import { StyledCss } from "./styled.interfaces";

interface DropdownCss {
  placeholder?: any;

  subBackground?: string;
  subBorderRadius?: string;
  subPadding?: string;
  checkedColor?: string;
  widthImage?: number;
  iconSvg?: any;
  children?: any;
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
}

const DropdownContent = ({
  placeholder,
  mainBackground,
  colorPlaceholder,
  label,
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
  subBackground,
  subBorderRadius,
  subPadding,
  checkedColor,
  iconSvg,
  iconSvgTop,
  iconSvgRight,
  children,
  fontSizeLabel,
  name,
}: DropdownCss) => {
  const [openContent, setOpenContent] = useState(false);

  return (
    <>
      <DropdownStyled
        mainbackground={mainBackground}
        colorplaceholder={colorPlaceholder}
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
        subbackground={subBackground}
        subborderradius={subBorderRadius}
        subpadding={subPadding}
        iconsvgtop={iconSvgTop}
        iconsvgright={iconSvgRight}
        checkedcolor={checkedColor}
        fontsizelabel={fontSizeLabel}
        label={label}
        name={name}
        onMouseLeave={() => setOpenContent(false)}
      >
        {iconSvg && (
          <label
            className="dropdownSvg"
            htmlFor={name}
            onClick={() => setOpenContent(!openContent)}
          >
            {iconSvg}
          </label>
        )}
        <span className="dropdownContentLabel">{label}</span>
        <div className="content" onClick={() => setOpenContent(!openContent)}>
          {placeholder}
        </div>
        <div
          className={
            openContent
              ? "checkTree-container openTree"
              : "checkTree-container closeTree"
          }
        >
          {children}
        </div>
      </DropdownStyled>
    </>
  );
};
DropdownContent.defaultProps = {
  width: "300px",
  height: "50px",
  margin: "0px",
  padding: "0px",
  mainBackground: "transparent",
  topLabel: "0px",
  leftLabel: "0px",
  fontSizeLabel: "12px",
  colorLabel: "#000",
  border: "none",
  fontWeight: 400,
  fontSize: "14px",
  borderRadius: "5px 5px 0 0",
};
export default DropdownContent;

const DropdownStyled = styled.div<StyledCss>`
  position: relative;
  width: ${(props) => props.width || "300px"}!important;
  height: ${(props) => props.height || "50px"}!important;
  margin: ${(props) => props.margin || "0"}!important;
  padding: ${(props) => props.padding}!important;
  border-top: ${(props) => props.bordertop}!important;
  border-bottom: ${(props) => props.borderbottom}!important;
  border-right: ${(props) => props.borderright}!important;
  border-left: ${(props) => props.borderleft}!important;
  border-radius: ${(props) => props.borderradius || "10px"}!important;
  background: ${(props) => props.mainbackground}!important;
  display: flex;
  align-items: center;
  margin-top: ${(props) =>
    props.label &&
    `calc(${props.fontsizelabel} + ${props.margin?.split(" ")[0]})`}!important;

  .dropdownContentLabel {
    position: absolute !important;
    bottom: 100%;
    left: 0;
    font-size: ${(props) => props.fontsizelabel + "!important" || "12px"};
    color: ${(props) => props.colorlabel}!important;

    z-index: 1;
  }
  .checkTree-container {
    width: 100%;
    top: calc(100% + 2px);
    left: 0;
    width: 100%;
    position: absolute;
    border: solid 1px #f0f2f5;
    overflow-y: scroll;
    z-index: 97;
    background: ${(props) => props.subbackground || "#fff"}!important;
    border: ${(props) => props.subborderradius}!important;
  }
  .openTree {
    padding: ${(props) => props.subpadding}!important;
    max-height: 300px;
    transition: all 0.2s;
    border: ${(props) => props.subborderradius}!important;
  }
  .closeTree {
    padding: 0;
    max-height: 0px;
    transition: all 0.2s;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .dropdownSvg {
    position: absolute;
    right: ${(props) => props.iconsvgright}!important;
    top: ${(props) => props.iconsvgtop}!important;
    width: 0px !important;
    height: 0px !important;
    svg {
      width: 16px;
      height: 16px;
    }
  }

  .ant-checkbox-wrapper {
    margin: 0;
    width: 100%;
  }

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }
  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: ${(props) => props.checkedcolor} !important;
  }
`;
