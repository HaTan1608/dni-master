/* eslint-disable */
import { Form } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface InputNewStyledInterface {
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
  display?: any;
  rules?: any;
  onKeyPress?: any;
}
const FormInputAntd = ({
  name,
  id,
  type,
  defaultValue,
  placeholder,
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
  display,
  rules,
  onKeyPress,
}: InputNewStyledInterface) => {
  const [inputValue, setInputValue] = useState<Number | String | undefined>(
    value ? value : ""
  );

  useEffect(() => {
    if (value) {
      if (type === "number" && convertNumber) {
        setInputValue(
          value
            .toString()
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      } else {
        setInputValue(value);
      }
    }
  }, [value]);
  // const addCommas = (num: any) =>
  //   num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num: any) =>
    num.toString().replace(/[^0-9\.]/g, "");

  const handleChange = (e: any) => {
    if (onChange) {
      if (type === "number") {
        onChange(Number(removeNonNumeric(e.target.value)));
      } else {
        onChange(e.target.value === "" ? undefined : e.target.value);
      }
    } else {
      return;
    }
  };

  const handleBlur = (e: any) => {
    if (onBlur) {
      if (type === "number") {
        onBlur(Number(removeNonNumeric(e.target.value)));
      } else {
        onBlur(e.target.value);
      }
    } else {
      return;
    }
  };
  const setTwoNumberDecimal = (e: any) => {
    convertNumber
      ? setInputValue(
          e.target.value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      : setInputValue(e.target.value.replace(/[^0-9\.]/g, ""));
  };
  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
        margin: margin,
        display: display,
      }}
    >
      {label && (
        <InputLabel
          fontsize={labelFontSize}
          fontweight={labelFontWeight}
          labelLeft={labelLeft}
          labelRight={labelRight}
          color={labelColor}
        >
          {important && <span style={{ color: "red" }}>*&nbsp;</span>}
          {label}
        </InputLabel>
      )}
      {suffixIcon && (
        <InputSuffix
          suffixleft={suffixLeft}
          suffixright={suffixRight}
          color={suffixColor}
          padding={suffixPadding}
          background={suffixBackground}
          width={suffixWidth}
          border={suffixBorder}
          borderradius={suffixBorderRadius}
          fontsize={suffixFontSize}
          fontweight={suffixFontWeight}
          suffixscale={suffixScale}
          suffixsvgcolor={suffixSvgColor}
        >
          {suffixIcon}
        </InputSuffix>
      )}

      <FormItemContainer
        rules={rules}
        name={name}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <InputStyled
          defaultValue={defaultValue}
          placeholder={placeholder}
          id={id}
          value={inputValue}
          disabled={disabled}
          onBlur={(e: any) => handleBlur(e)}
          onChange={(e: any) => handleChange(e)}
          onInput={(e: any) =>
            type === "number"
              ? setTwoNumberDecimal(e)
              : setInputValue(e.target.value)
          }
          onKeyPress={
            onKeyPress
              ? onKeyPress
              : (e: any) => {
                  e.key === "Enter" && e.preventDefault();
                }
          }
          onFocus={onFocus}
          color={color}
          border={border}
          borderradius={borderRadius}
          padding={padding}
          textalign={textAlign}
          suffix={suffixIcon}
          suffixwidth={suffixWidth}
        />
      </FormItemContainer>
    </div>
  );
};

export default FormInputAntd;

FormInputAntd.defaultProps = {
  width: "300px",
  height: "41px",
  margin: "0px",
  padding: "6px",
  background: "transparent",

  border: "none",
  fontWeight: 400,
  fontSize: "14px",
  borderRadius: "5px",
  textAlign: "left",
  type: "text",
  disabled: false,
  labelLeft: "0px",
  labelFontSize: "12px",
  labelColor: "#000",
  suffixColor: "#000",
  suffixWidth: "20px",
  suffixFontSize: "12px",
  suffixFontWeight: "400",
  suffixScale: "1",
  suffixSvgColor: "#000",
};

const FormItemContainer = styled(Form.Item)`
  .ant-form-item-control-input {
    height: 100%;
  }
  .ant-form-item-control-input-content {
    height: 100%;
  }
  .ant-form-item-explain.ant-form-item-explain-connected {
    position: absolute;
    top: 100%;
    font-size: 12px;
  }
`;
const InputLabel = styled.span<any>`
  position: absolute;
  font-size: ${(props) => props.fontsize};
  font-weight: ${(props) => props.fontweight};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  width: 100%;
  bottom: 100%;
  left: ${(props) => props.labelleft};
  right: ${(props) => props.labelright};
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
`;
const InputStyled = styled.input<any>`
  position: absolute;

  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderradius};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  text-align: ${(props) => props.textalign};
  height: 100%;
  width: 100%;
  :focus {
    outline: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputSuffix = styled.div<any>`
  position: absolute;
  top: 0;
  left: ${(props) => props.suffixleft};
  right: ${(props) => props.suffixright};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderradius};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  height: 100%;
  width: ${(props) => props.width};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: ${(props) => props.fontsize};
  font-weight: ${(props) => props.fontweight};
  svg {
    transform: scale(${(props) => props.suffixscale});
     {
      path {
        fill: ${(props) => props.suffixsvgcolor};
      }
    }
  }
`;
