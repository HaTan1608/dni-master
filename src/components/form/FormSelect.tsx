/* eslint-disable */
import React from "react";
import { Form, Select } from "antd";
import { geneUniqueKey, removeSign } from "../../utils/helpers/functions/textUtils";
import arrow from "../../assets/images/arrow.svg";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormInstance } from "./FormPattern";
import { NamePath } from "antd/lib/form/interface";

const { Item } = Form;
const { Option } = Select;

interface OptionProp {
  name: string;
  value?: string;
  disabled?: boolean;
}
interface SelectProp {
  name?: NamePath;
  label?: string;
  dataSource?: Array<any>;
  onChange?: (value: any, option: any) => void;
  placeholder?: string;
  slOption: OptionProp;
  showSearch?: boolean;
  optionFilterProp?: string;
  allowClear?: boolean;
  disabled?: boolean | null | undefined;
  onSelect?: () => void;
  id?: string;
  classSelect?: string;
  classOption?: string;
  size?: SizeType;
  required?: boolean;
  classItem?: string;
  mode?: "multiple" | "tags";
  defaultValue?: any;
  onSearch?: (val: string) => void;
  suffixIcon?: string | JSX.Element;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  itemChild?: (value: any) => React.ReactElement;
  filterOption?: (input: any, option: any) => boolean;
  onBlur?: () => void;
  value?: any;
}

const FormSelect: React.FC<SelectProp> = ({
  name,
  label,
  dataSource,
  onChange,
  placeholder,
  slOption,
  showSearch,
  optionFilterProp,
  allowClear,
  disabled,
  onSelect,
  id,
  classSelect,
  classOption,
  size,
  classItem,
  mode,
  required,
  onSearch,
  defaultValue,
  suffixIcon,
  dropdownRender,
  itemChild,
  filterOption,
  onBlur,
  value,
  ...rest
}) => {
  const validator = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.validate();
  };
  return (
    <Item
      className={classItem}
      name={name}
      label={label}
      {...rest}
      rules={required && validator("text")}
    >
      <Select
        className={classSelect}
        id={id}
        mode={mode}
        size={size || "large"}
        // size='large'
        disabled={Boolean(disabled)}
        allowClear={allowClear}
        showSearch={showSearch}
        placeholder={placeholder}
        onSelect={onSelect}
        onChange={onChange}
        onSearch={onSearch}
        optionFilterProp={optionFilterProp || "children"}
        suffixIcon={suffixIcon || <img src={arrow} alt="" />}
        // filterOption={filterOption}
        filterOption={(input: any, option: any) =>
          (removeSign(option.props.children.toLowerCase()).indexOf(removeSign(input.toLowerCase())) >= 0)
        }
        defaultValue={defaultValue}
        dropdownRender={dropdownRender}
        onBlur={onBlur}
        value={value}
      >
        {(dataSource ?? []).map((i: any, index: number) => {
          return (
            <Option
              key={geneUniqueKey()}
              // id={[i[slOption?.value], id].join("_")}
              value={slOption?.value ? i[slOption?.value] : JSON.stringify(i)}
              obj={i}
              className={classOption}
              disabled={i?.disabled}
            >
              {itemChild ? (
                <div key={index}>{itemChild(i)}</div>
              ) : (
                i[slOption?.name]
              )}
            </Option>
          );
        })}
      </Select>
    </Item>
  );
};

export default FormSelect;
