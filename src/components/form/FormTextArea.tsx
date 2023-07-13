/* eslint-disable */
import React from "react";
import { Form, Input } from "antd";
import { FormInstance } from "./FormPattern";

const { Item } = Form;
const { TextArea } = Input;

interface TextAreaProp {
  name?: string;
  label?: string;
  placeholder: string;
  classItem?: string;
  classInput?: string;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
  styleInput?: any;
}

const FormTextArea: React.FC<TextAreaProp> = ({
  name,
  label,
  placeholder,
  classItem,
  classInput,
  required,
  maxLength,
  disabled,
  styleInput,
  ...rest
}) => {
  const validator = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.validate();
  };
  return (
    <Item
      name={name}
      label={label}
      rules={required && validator("text")}
      className={classItem}
      {...rest}
    >
      <TextArea
        className={classInput}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        style={styleInput}
      />
    </Item>
  );
};
export default FormTextArea;
