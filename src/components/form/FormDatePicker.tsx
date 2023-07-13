/* eslint-disable */
import React from "react";
import { Form, DatePicker } from "antd";
import ConfigProvider from "../configProvider/index";
import { FormInstance } from "./FormPattern";

const { Item } = Form;

interface DatePickerProps {
  name?: string;
  label?: string;
  placeholder?: string;
  allowClear?: boolean;
  format?: string | string[];
  showTime?: boolean;
  classItem?: string;
  classDatePicker?: string;
  disabled?: boolean;
  disabledDate?: (date: any) => boolean;
  required?: boolean;
}

const FormDatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  placeholder,
  allowClear = false,
  format,
  showTime,
  classItem,
  classDatePicker,
  disabled,
  disabledDate,
  required,
  ...rest
}) => {
  const validator = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.validate();
  };
  return (
    <ConfigProvider>
      <Item
        name={name}
        label={label}
        className={classItem}
        rules={required && validator("text")}
        {...rest}
      >
        <DatePicker
          className={classDatePicker}
          size="middle"
          placeholder={placeholder}
          style={{ width: "100%" }}
          allowClear={allowClear}
          format={format || "DD/MM/YYYY"}
          showTime={showTime}
          disabled={disabled}
          disabledDate={disabledDate}
        />
      </Item>
    </ConfigProvider>
  );
};

export default FormDatePicker;
