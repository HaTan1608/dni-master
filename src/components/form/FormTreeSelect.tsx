/* eslint-disable */
import React from "react";
import { Form, TreeSelect } from "antd";
import arrow from "../../assets/images/arrow.svg";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormInstance } from "./FormPattern";
import { NamePath } from "antd/lib/form/interface";
import { TreeNode } from "antd/lib/tree-select";

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
  onChange?: (val: any) => void;
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
  treeCheckable?: boolean;
  showCheckedStrategy?: "SHOW_ALL" | "SHOW_PARENT" | "SHOW_CHILD";
  treeCheckStrictly?: boolean;
  initialValue?: any[];
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface IItemCheck {
  id: number | string;
  title: string;
  initialValue?: any[];
}

const FormTreeSelect: React.FC<SelectProp> = ({
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
  showCheckedStrategy,
  treeCheckStrictly,
  size,
  classItem,
  required,
  defaultValue,
  treeDefaultExpandAll,
  multiple,
  treeCheckable,
  initialValue,
  dropdownRender,
  onFocus,
  onBlur,
  ...rest
}) => {
  const validator = (type: string | number) => {
    const item = new (FormInstance as any)(type);
    return item.validate();
  };

  const _renderChildren = (arr: any[]) => {
    return (arr ?? []).map((e: any, index: number) => {
      return (
        <TreeNode
          key={e[slOption?.value]}
          // id={[e[slOption?.value], id].join("_")}
          value={e[slOption?.value]}
          title={e[slOption?.name]}
          obj={e}
          disabled={e?.disabled}
        >
          {e?.children?.length > 0 && _renderChildren(e?.children)}
        </TreeNode>
      );
    });
  };

  return (
    <Item
      className={classItem}
      name={name}
      label={label}
      {...rest}
      rules={required && validator("text")}
    >
      <TreeSelect
        className={classTree}
        showSearch={showSearch}
        allowClear={allowClear}
        treeCheckable={treeCheckable}
        showCheckedStrategy={showCheckedStrategy}
        treeCheckStrictly={treeCheckStrictly}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder={placeholder}
        multiple={multiple}
        treeDefaultExpandAll={treeDefaultExpandAll}
        onChange={onChange}
        onSelect={onSelect}
        disabled={Boolean(disabled)}
        suffixIcon={<img src={arrow} alt="" />}
        size={size}
        filterTreeNode={(inputValue, treeNode) => {
          return (
            String(treeNode.title)
              .toLowerCase()
              .indexOf(inputValue.toLowerCase()) >= 0
          );
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {(dataSource ?? []).map((i, index) => {
          return (
            <TreeNode
              key={i[slOption?.value]}
              // id={[i[slOption?.value], id].join("_")}
              value={i[slOption?.value]}
              title={i[slOption?.name]}
              obj={i}
              disabled={i?.disabled}
            >
              {i?.children?.length > 0 && _renderChildren(i.children)}
            </TreeNode>
          );
        })}
      </TreeSelect>
    </Item>
  );
};

export default FormTreeSelect;
