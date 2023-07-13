/* eslint-disable */
import React from "react";
import { Checkbox, Col, Form } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormInstance } from "./FormPattern";
import { NamePath } from "antd/lib/form/interface";

const { Item } = Form;

interface OptionProp {
  name: string;
  value: string;
  disabled?: boolean;
}
interface SelectProp {
  name?: NamePath;
  label?: string;
  dataSource?: Array<any>;
  onChange?: () => void;
  placeholder?: string;
  slOption: OptionProp;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean | null | undefined;
  onSelect?: () => void;
  id?: string;
  classItem?: string;
  classTree?: string;
  size?: SizeType;
  required?: boolean;
  mode?: any;
  defaultValue?: string | undefined;
  treeDefaultExpandAll?: boolean;
  multiple?: boolean;
  treeCheckableItem?: boolean;
  initialValue?: any[];
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
}

const FormListCheckbox: React.FC<SelectProp> = ({
  name,
  label,
  dataSource,
  onChange,
  placeholder,
  slOption,
  showSearch,
  allowClear,
  disabled,
  onSelect,
  id,
  classTree,
  size,
  classItem,
  required,
  defaultValue,
  treeDefaultExpandAll,
  multiple,
  treeCheckableItem,
  initialValue,
  dropdownRender,
  ...rest
}) => {
  const validator = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.validate();
  };

  const _renderChildren = (arr: any[]) => {
    return (arr ?? []).map((e: any, index: number) => {
      return (
        <Col className="ml-6">
          <Item
            className="mb-0"
            id={e[slOption?.value]}
            name={[e[slOption?.value], name]}
          >
            <Checkbox
              id={e[slOption?.value]}
              defaultChecked={initialValue?.includes(e[slOption?.value])}
            >
              {e[slOption?.name]}
            </Checkbox>
          </Item>

          {e?.children?.length > 0 && _renderChildren(e?.children)}
        </Col>
      );
    });
  };

  return (
    <Item
      // className={classItem}
      name={name}
      label={label}
      {...rest}
      rules={required && validator("text")}
    >
      <div className="mx-2" style={{ maxHeight: 400, overflow: "auto" }}>
        {(dataSource ?? []).map((e: any, index: number) => {
          return (
            <Col className="mx-2">
              <Item
                className="mb-0"
                id={e[slOption?.value]}
                name={[e[slOption?.value], name]}
              >
                <Checkbox
                  id={e[slOption?.value]}
                  defaultChecked={initialValue?.includes(e[slOption?.value])}
                >
                  {e[slOption?.name]}
                </Checkbox>
              </Item>

              {e?.children?.length > 0 && _renderChildren(e?.children)}
            </Col>
          );
        })}
      </div>
    </Item>
  );
};

export default FormListCheckbox;
