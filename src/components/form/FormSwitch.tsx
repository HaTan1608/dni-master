/* eslint-disable */
import React from "react";
import { Form, Switch } from "antd";
import { FormInstance } from "./FormPattern";
import { NamePath } from "antd/lib/form/interface";

const { Item } = Form;

interface SwitchProp {
  name?: NamePath | undefined;
  label?: string;
  type?: string;
  onChange?: (ev: any) => void;
  disabled?: boolean;
  required?: boolean;
  classItem?: string;
  classSwitch?: string;
  defaultChecked?: boolean;
  initialValue?: boolean;
  checkedChildren?: string;
  unCheckedChildren?: string;
}

const FormSwitch: React.FC<SwitchProp> = ({
  name,
  label,
  type = "text",
  onChange,
  required,
  disabled,
  classItem,
  classSwitch,
  defaultChecked,
  initialValue,
  checkedChildren,
  unCheckedChildren,
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
      valuePropName="checked"
      rules={required && validator(type)}
      className={classItem || ""}
      initialValue={initialValue}
      {...rest}
    >
      <Switch
        defaultChecked={defaultChecked}
        className={classSwitch || ""}
        disabled={disabled}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        onChange={(ev) => {
          if (onChange) onChange(ev);
        }}
      />
    </Item>
  );
};

export default FormSwitch;
