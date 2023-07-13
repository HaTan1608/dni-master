/* eslint-disable */
import React from "react";
import { Form, Radio } from "antd";
import { geneUniqueKey } from "../../utils/helpers/functions/textUtils";
import { FormInstance } from "./FormPattern";

const { Item } = Form;

interface OptionProps {
  name: string | any;
  value: string | any;
}

interface RadioProps {
  name?: string;
  label?: string;
  dataSource: Array<any>;
  id?: string;
  option?: OptionProps;
  classItem?: string;
  classGroupRadio?: string;
  classRadio?: string;
  defaultValue?: string | number;
  initialValue?: string | number;
  disableAll?: boolean | null | undefined;
  required?: boolean;
}

const FormRadio: React.FC<RadioProps> = ({
  name,
  label,
  dataSource,
  id,
  option,
  classItem,
  classGroupRadio,
  classRadio,
  defaultValue,
  initialValue,
  disableAll,
  required,
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
      {...rest}
      rules={required && validator("text")}
      className={classItem}
      initialValue={initialValue}
    >
      <Radio.Group
        className={classGroupRadio}
        id={id}
        defaultValue={defaultValue}
        disabled={Boolean(disableAll)}
      >
        {(dataSource ?? []).map((i, index) => {
          return (
            <Radio
              className={classRadio}
              disabled={i.disabled}
              key={geneUniqueKey()}
              value={i[option?.value]}
              checked
            >
              {i[option?.name]}
            </Radio>
          );
        })}
      </Radio.Group>
    </Item>
  );
};

export default FormRadio;
