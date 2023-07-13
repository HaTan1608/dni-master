/* eslint-disable */
import React from "react";
import { Form, Input } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";

const { Item } = Form;
const { Search } = Input;

interface SearchProps {
  onSearch?: () => void;
  form?: any;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  icon?: JSX.Element;
  titleButton?: string;
  loading?: boolean;
  classItem?: string;
  suffixIcon?: string | JSX.Element;
  size?: SizeType;
}

const FormSearch: React.FC<SearchProps> = ({
  onSearch,
  form,
  name = "q",
  label,
  placeholder,
  className,
  classItem,
  titleButton,
  loading,
  size,
  ...rest
}) => {
  return (
    <Item name={name} label={label} className={className} {...rest}>
      <Search
        className={classItem}
        placeholder={placeholder || "Nhập thông tin tìm kiếm"}
        enterButton={titleButton || "Tìm kiếm"}
        size={size || "large"}
        loading={Boolean(loading)}
      />
    </Item>
  );
};
export default FormSearch;
