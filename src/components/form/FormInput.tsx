/* eslint-disable */
import React from "react";
import { Form, Input } from "antd";
import { FormInstance } from "./FormPattern";
import { PASSWORD, NEW_PASSWORD, REPASSWORD, OFF } from "../../constants";
import { typeInput } from "../../types";
import { SizeType } from "antd/lib/config-provider/SizeContext";

const { Item } = Form;

interface ItemProps {
  type: typeInput;
  name?: string;
  label?: string;
  required?: boolean;
  key?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean | null | undefined;
  size?: SizeType;
  id?: string;
  hasFeedback?: boolean;
  validateStatus?: "" | "success" | "warning" | "error" | "validating";
  help?: string;
  classItem?: string;
  classInput?: string;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  defaultValue?: string | number;
  initialValue?: string | number;
  suffix?: any;
  addonAfter?: any;
}

const FormInput: React.FC<ItemProps> = ({
  type,
  name,
  label,
  required,
  className,
  placeholder,
  disabled,
  size,
  id,
  hasFeedback,
  validateStatus,
  help,
  classItem,
  classInput,
  onFocus,
  onBlur,
  defaultValue,
  initialValue,
  suffix,
  ...rest
}) => {
  const renderPlaceHolder = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.placeholder();
  };
  const validator = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.validate();
  };
  const renderInput = (type: string | number) => {
    return type === PASSWORD || type === REPASSWORD ? (
      <Input.Password
        id={id}
        size={size}
        style={!size ? { height: "48px", borderRadius: "6px" } : {}}
        placeholder={placeholder || renderPlaceHolder(type)}
        autoComplete={NEW_PASSWORD}
        disabled={Boolean(disabled)}
        className={classInput || ""}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
      />
    ) : (
      <Input
        id={id}
        size={size}
        style={!size ? { height: "48px", borderRadius: "6px" } : {}}
        placeholder={placeholder ?? renderPlaceHolder(type)}
        autoComplete={OFF}
        disabled={Boolean(disabled)}
        className={classInput || ""}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        suffix={suffix}
      />
    );
  };
  return (
    <Item
      name={name}
      initialValue={initialValue}
      label={label}
      rules={required ? validator(type) : undefined}
      hasFeedback={hasFeedback}
      validateStatus={validateStatus}
      help={help}
      className={className || classItem || ""}
      {...rest}
    >
      {renderInput(type)}
    </Item>
  );
};

export default FormInput;
