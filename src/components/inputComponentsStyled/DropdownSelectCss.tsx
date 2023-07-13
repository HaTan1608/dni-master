/* eslint-disable */
import { useState } from "react";
import styled from "styled-components";

interface DropdownCss {
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
  subBackground?: string;
  subBorderRadius?: string;
  subColorHover?: string;
  subColorBackgroundHover?: string;
  paddingOptionItem?: string;
  widthImage?: number;
  iconSvg?: any;
  iconSvgTop?: any;
  iconSvgRight?: any;
}

interface StyledCss {
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
  subBackground?: string;
  subBorderRadius?: string;
  subColorHover?: string;
  subColorBackgroundHover?: string;
  paddingOptionItem?: string;
  widthImage?: number;
  iconSvg?: any;
  iconSvgTop?: any;
  iconSvgRight?: any;
}

const DropdownSelectCss = ({
  placeholder,
  options,
  onChangeSelect,
  mainBackground,
  colorPlaceholder,
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
  subColorHover,
  subColorBackgroundHover,
  paddingOptionItem,
  widthImage,
  iconSvg,
  iconSvgTop,
  iconSvgRight,
}: DropdownCss) => {
  const [open, setOpen] = useState(false);
  const [valueSelect, setValueSelect] = useState("");
  const handleOnChange = async (e: any) => {
    setValueSelect(e.label);
    onChangeSelect(e.value);
  };
  return (
    <>
      <DropdownStyled
        mainBackground={mainBackground}
        colorPlaceholder={colorPlaceholder}
        borderRadius={borderRadius}
        border={border}
        borderTop={borderTop}
        borderRight={borderRight}
        borderBottom={borderBottom}
        borderLeft={borderLeft}
        width={width}
        height={height}
        margin={margin}
        padding={padding}
        subBackground={subBackground}
        subBorderRadius={subBorderRadius}
        subColorHover={subColorHover}
        subColorBackgroundHover={subColorBackgroundHover}
        paddingOptionItem={paddingOptionItem}
        widthImage={widthImage}
        iconSvgTop={iconSvgTop}
        iconSvgRight={iconSvgRight}
        className={open ? "dropdownStyled active" : "dropdownStyled"}
        onClick={() => setOpen(!open)}
      >
        <input
          type="text"
          className="textBox"
          placeholder={placeholder}
          value={valueSelect}
          readOnly
        />
        {iconSvg && <span className="dropdownSvg">{iconSvg}</span>}

        <div className="option">
          {options.length > 0 &&
            options.map((option, index) => (
              <div
                className="optionItem"
                onClick={() => handleOnChange(option)}
              >
                {option.icons && (
                  <span className="optionImage">
                    <img src={option.icons} alt={`option${index}`} />
                  </span>
                )}

                {option.label}
              </div>
            ))}
        </div>
      </DropdownStyled>
    </>
  );
};

export default DropdownSelectCss;

const DropdownStyled = styled.div<StyledCss>`
  position: relative;
  width: ${(props) => props.width || "300px"}!important;
  height: ${(props) => props.height || "50px"}!important;
  margin: ${(props) => props.margin || "0"}!important;

  border-top: ${(props) => props.borderTop}!important;
  border-bottom: ${(props) => props.borderBottom}!important;
  border-right: ${(props) => props.borderRight}!important;
  border-left: ${(props) => props.borderLeft}!important;
  border-radius: ${(props) => props.borderRadius || "10px"}!important;
  display: flex;
  align-items: center;
  .dropdownSvg {
    position: absolute;
    right: ${(props) => props.iconSvgRight}!important;
    top: ${(props) => props.iconSvgTop}!important;
  }
  .textBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    outline: none;
    box-shadow: 0 5px 20 rgb(0, 0, 0, 0.05);
    padding: ${(props) => props.padding || "12px 20px"}!important;
    border: ${(props) => props.border || "none"}!important;
    background: ${(props) => props.mainBackground}!important;
    ::placeholder {
      color: ${(props) => props.colorPlaceholder}!important;
      opacity: 1;
    }
  }

  .option {
    position: absolute;
    top: ${(props) => props.height || "50px"}!important;
    width: 100%;
    background: ${(props) => props.subBackground || "#fff"}!important;
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.05);
    border-radius: ${(props) => props.subBorderRadius || "10px"}!important;
    overflow: hidden;
    max-height: 0px;
    transition: all 0.3s;
    z-index: 50;
    .optionItem {
      padding: ${(props) => props.paddingOptionItem || "12px 20px"}!important;
      cursor: pointer;
      display: flex;
      align-items: center;
      :hover {
        background: ${(props) =>
          props.subColorBackgroundHover || "#62baea"}!important;
        color: ${(props) => props.subColorHover || "#fff"}!important;
      }
      .optionImage {
        width: ${(props) =>
          (props.widthImage ? props.widthImage : 0) + 4 + "px!important" ||
          "36px"}!important;
        height: ${(props) =>
          (props.widthImage ? props.widthImage : 0) + 4 + "px!important" ||
          "36px"}!important;
        margin-right: 8px;
        border: 1px solid #bfc4c9;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: ${(props) =>
            props.widthImage + "px!important" || "36px"}!important;
          height: ${(props) =>
            props.widthImage + "px!important" || "36px"}!important;
          object-fit: contain;
        }
      }
    }
  }
  &.active .option {
    max-height: 250px;
    overflow-y: scroll;
    transition: all 0.3s;
  }
`;
