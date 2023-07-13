/* eslint-disable */
import React from "react";
import { Form, DatePicker } from "antd";
import ConfigProvider from "../configProvider/index";
import { NamePath } from "antd/lib/form/interface";
import { FormInstance } from "./FormPattern";

const { Item } = Form;
const { RangePicker } = DatePicker;

interface RangePickProps {
  name?: NamePath | undefined;
  label?: string;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  classItem?: string;
  classRangePicker?: string;
  format?: string;
  showTime?: boolean;
  required?: boolean;
}

const FormRangePicker: React.FC<RangePickProps> = ({
  name,
  label,
  placeholder,
  allowClear,
  disabled,
  classItem,
  classRangePicker,
  format,
  showTime,
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
        <RangePicker
          className={classRangePicker}
          disabled={disabled}
          style={{ width: "100%" }}
          allowClear={allowClear}
          format={format}
          showTime={showTime}
        />
      </Item>
    </ConfigProvider>
  );
};

export default FormRangePicker;
