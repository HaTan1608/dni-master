/* eslint-disable */
import { useState } from "react";
import styled from "styled-components";

interface SelectNewStyledInterface {
  name?: any;
  id?: any;
  type?: string;
  placeholder?: string;
  value?: any;
  onFocus?: any;
  onChange?: any;
  onBlur?: any;
  border?: string;
  borderRadius?: string;
  color?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  textAlign?: string;
  defaultValue?: any;
  label?: any;
  labelFontSize?: any;
  labelFontWeight?: any;
  labelLeft?: any;
  labelRight?: any;
  labelColor?: any;
  disabled?: any;
  suffixIcon?: any;
  suffixLeft?: any;
  suffixRight?: any;
  suffixColor?: any;
  suffixPadding?: any;
  suffixBackground?: any;
  suffixWidth?: any;
  suffixBorder?: any;
  suffixBorderRadius?: any;
  suffixFontSize?: any;
  suffixFontWeight?: any;
  suffixScale?: any;
  suffixSvgColor?: any;
  convertNumber?: any;
  important?: any;
  options?: any;
}
const SelectNewStyled = ({
  name,
  id,
  type,
  defaultValue,
  onBlur,
  onChange,
  onFocus,
  width,
  height,
  padding,
  margin,
  color,
  border,
  borderRadius,
  textAlign,
  value,
  label,
  labelFontSize,
  labelFontWeight,
  labelLeft,
  labelRight,
  labelColor,
  disabled,
  suffixIcon,
  suffixLeft,
  suffixRight,
  suffixColor,
  suffixPadding,
  suffixBackground,
  suffixWidth,
  suffixBorder,
  suffixBorderRadius,
  suffixFontSize,
  suffixFontWeight,
  suffixScale,
  suffixSvgColor,
  convertNumber,
  important,
  options,
}: any) => {
  const [selectedValue, setSelectedValue] = useState<any>({
    label: "",
    value: "",
  });
  const [visibleOptions, setVisibleOptions] = useState<any>(false);
  return (
    <SelectContainer
      tabIndex={0}
      onFocus={() => setVisibleOptions(true)}
      onBlur={() => setVisibleOptions(false)}
    >
      <input
        className="selectInput"
        value={selectedValue.label}
        onChange={(e: any) =>
          setSelectedValue({ ...selectedValue, label: e.target.value })
        }
        onInput={() => setVisibleOptions(true)}
      />
      {visibleOptions && (
        <div className="optionContainer">
          {options.length > 0
            ? options.map((option: any, index: any) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedValue({
                      label: option.label,
                      value: option.value,
                    });
                  }}
                  className="selectOption"
                >
                  {option.label}
                </div>
              ))
            : "null"}
        </div>
      )}
    </SelectContainer>
  );
};
export default SelectNewStyled;

const SelectContainer = styled.div<any>`
  height: 41px;
  width: 300px;
  position: relative;
  .selectInput {
    height: 100%;
    top: 0;
    width: 100%;
    padding: 12px;
  }
  .optionContainer {
    top: 100%;

    width: 100%;
    background: #fff;
    .selectOption {
      text-align: right;
      width: 100%;
      height: 41px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 4px 12px;
      cursor: pointer;
      transition: background 0.5s;
    }
    .selectOption:hover {
      background: rgb(0, 0, 0, 0.2);
      transition: background 0.5s;
    }
  }
`;
