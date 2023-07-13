/* eslint-disable */
import React from "react";
import { Form, Radio } from "antd";
import { geneUniqueKey } from "../../utils/helpers/functions/textUtils";
import { FormInstance } from "./FormPattern";

const { Item } = Form;

interface OptionProps {
  name: string;
  value: string;
  disabled?: boolean;
}

interface FormButtonGroupProps {
  name?: string;
  label?: string;
  dataSource: Array<any>;
  id?: string;
  option: OptionProps;
  classItem?: string;
  classGroupRadio?: string;
  classButton?: string;
  defaultValue?: string | number;
  initialValue?: string | number;
  disableAll?: boolean | null | undefined;
  required?: boolean;
  disabled?: boolean | null;
}

const FormButtonGroup: React.FC<FormButtonGroupProps> = ({
  name,
  label,
  dataSource,
  id,
  option,
  classItem,
  classGroupRadio,
  classButton,
  defaultValue,
  initialValue,
  disableAll,
  required,
  disabled,
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
        buttonStyle="solid"
        className={`styleButtonTMS flex px-2 mx-2 ${classGroupRadio}`}
        id={id}
        defaultValue={defaultValue}
        disabled={Boolean(disableAll)}
      >
        {(dataSource ?? []).map((i, index) => {
          return (
            <Radio.Button
              key={geneUniqueKey()}
              value={i[option?.value]}
              disabled={i.disabled}
              className=" text-white border-0 h-full bg-neutral_color_1_3 flex items-center z-50 active:bg-neutral_color_1_3"
              style={{ height: 30 }}
            >
              <p className="text-white h-full">{i[option?.name]}</p>
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </Item>
  );
};

export default FormButtonGroup;
