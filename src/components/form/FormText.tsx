/* eslint-disable */
import React from "react";
import { Form, Input } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormInstance } from "./FormPattern";
import { NamePath } from "antd/lib/form/interface";

const { Item } = Form;

interface TextProp {
  name?: NamePath;
  label?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean | null | undefined;
  type?: string;
  id?: string | number;
  classItem?: string;
  classInput?: string;
  iconLeft?: JSX.Element;
  size?: SizeType;
  required?: boolean | null | undefined;
  loading?: boolean | null | undefined;
  refInput?: any;
  onKeyDown?: (value: any) => void;
  maxLength?: number;
  key?: number;
  hidden?: boolean;
  initialValue?: string | number;
  defaultValue?: string | number;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (val: any) => void;
  // formatter?:(val:string)=>void;
  // parser?:(val:string)=>void
}
const FormText: React.FC<TextProp> = ({
  name,
  key,
  label,
  placeholder,
  disabled,
  type = "text",
  id,
  classInput,
  classItem,
  iconLeft,
  size,
  required,
  refInput,
  onKeyDown,
  maxLength,
  hidden,
  initialValue,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  // formatter,
  // parser,
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
      key={key}
      hidden={hidden}
      {...rest}
    >
      <Input
        ref={refInput}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        className={classInput}
        prefix={iconLeft}
        type={type}
        disabled={Boolean(disabled)}
        placeholder={placeholder ?? ""}
        style={!size ? { height: "48px", borderRadius: "6px" } : {}}
        maxLength={maxLength}
        {...(type === "number" && { onKeyPress: onKeyPress })}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    </Item>
  );
};

export default FormText;
