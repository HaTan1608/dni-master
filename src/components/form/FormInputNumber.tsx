/* eslint-disable */
import React from "react";
import { Form, InputNumber } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormInstance } from "./FormPattern";
import { NamePath } from "antd/lib/form/interface";

const { Item } = Form;

interface TextProp {
  name?: NamePath;
  label?: string;
  placeholder?: string;
  disabled?: boolean | null | undefined;
  type?: string;
  id?: string | number;
  classItem?: string;
  classInput?: string;
  iconLeft?: JSX.Element;
  iconRight?: string;
  size?: SizeType;
  required?: boolean | null | undefined;
  style?: React.CSSProperties;
  // rules: ?: Rule[];
  parser?: any;
  formatter?: any;
  defaultValue?: number;
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (e: any) => void;
}
const FormInputNumber: React.FC<TextProp> = ({
  name,
  label,
  placeholder,
  disabled,
  type = "text",
  id,
  classInput,
  classItem,
  iconLeft,
  iconRight,
  size,
  style,
  required,
  parser,
  formatter,
  defaultValue,
  initialValue,
  onChange,
  min,
  max,
  ...rest
}) => {
  const onKeyPress = (event: any): void => {
    let keyStrict = ["-", "+", "e", "E"];
    let check = keyStrict.includes(event.key);
    if (check) {
      event.preventDefault();
    }
  };
  const validator = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.validate();
  };
  return (
    <Item
      name={name}
      initialValue={initialValue}
      label={label}
      className={classItem}
      rules={required && validator(type)}
      {...rest}
      style={style}
    >
      <InputNumber
        // required={Boolean(required)}
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        className={classInput}
        prefix={iconLeft}
        addonAfter={iconRight}
        type={type}
        disabled={Boolean(disabled)}
        placeholder={placeholder ?? ""}
        size={size}
        parser={parser}
        formatter={formatter}
        {...(type === "number" && { onKeyPress: onKeyPress })}
      />
    </Item>
  );
};

export default FormInputNumber;
