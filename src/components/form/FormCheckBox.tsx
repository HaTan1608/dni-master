/* eslint-disable */
import React from "react";
import { Form, Checkbox } from "antd";
import { NamePath } from "antd/lib/form/interface";

const { Item } = Form;

interface CheckBoxProps {
  name?: NamePath;
  label?: string;
  onChange?: (e: any) => void;
  id?: string;
  children?: JSX.Element[] | JSX.Element | string;
  disabled?: boolean;
  classItem?: string;
  classCheckbox?: string;
  initialValue?: boolean;
  defaultChecked?: boolean;
}

const FormCheckBox: React.FC<CheckBoxProps> = ({
  name,
  label,
  onChange,
  id,
  children,
  disabled,
  classItem,
  classCheckbox,
  initialValue,
  defaultChecked,
  ...rest
}) => {
  return (
    <Item
      name={name}
      className={classItem}
      label={label}
      initialValue={initialValue}
      valuePropName="checked"
      {...rest}
    >
      <Checkbox
        id={id}
        className={classCheckbox}
        style={{ height: 34 }}
        onChange={onChange}
        disabled={disabled}
        defaultChecked={defaultChecked}
      >
        {children}
      </Checkbox>
    </Item>
  );
};

export default FormCheckBox;
