/* eslint-disable */
import { Button, Row } from "antd";
import React from "react";
import SvgIconLoading from "src/assets/svg/SvgIconLoading";
import { typeButtonUI } from "src/types";
import DIcon from "../icons/DIcon";
import { typeIconUI } from "../icons/typesIcon";
import { ButtonUI } from "./ButtonPattern";
import "./styles.less";

interface IButtonTMS {
  className?: string;
  classItem?: string;
  type?: typeButtonUI;
  icon?: typeIconUI;
  fillIcon?: string;
  style?: any;
  loading?: boolean | null | undefined;
  htmlType?: "submit";
  id?: string;
  children?: JSX.Element[] | JSX.Element | string | React.ReactNode;
  onClick?: (e: any) => void;
  form?: string;
  key?: string;
  noneBorder?: boolean;
  disable?: boolean;
  iconRight?: boolean;
}

const ButtonTMS = (props: IButtonTMS) => {
  const {
    form,
    key,
    className,
    classItem,
    type,
    icon,
    fillIcon,
    style,
    id,
    loading,
    htmlType,
    children,
    onClick,
    noneBorder,
    disable,
    iconRight,
  } = props;

  const renderType = (type: typeButtonUI) => {
    const item = new (ButtonUI as any)(type);
    return item.render();
  };

  return (
    <Button
      id={id}
      form={form}
      key={key}
      onClick={onClick}
      className={`
        ${type && renderType(type)}
        ${loading ? `opacity-60` : ""} 
        ${className ? className : ""}
        ${noneBorder ? "none_border" : ""}
      `}
      style={style}
      // loading={Boolean(loading)}
      disabled={Boolean(loading) || disable}
      htmlType={htmlType}
    >
      {icon ? (
        <div className={`flex justify-center ${classItem || ""}`}>
          {iconRight ? (
            <>
              {children || ""}
              <div className={children ? `flex items-center ml-5` : ""}>
                {!loading ? (
                  <DIcon icon={icon} fill={fillIcon} />
                ) : (
                  <SvgIconLoading />
                )}
              </div>
            </>
          ) : (
            <>
              <div className={children ? `flex items-center mr-5` : ""}>
                {!loading ? (
                  <DIcon icon={icon} fill={fillIcon} />
                ) : (
                  <SvgIconLoading />
                )}
              </div>
              {children || ""}
            </>
          )}
        </div>
      ) : (
        <Row align="middle" className={`flex justify-center ${classItem}`}>
          {loading ? <SvgIconLoading /> : ""}
          {children || ""}
        </Row>
      )}
    </Button>
  );
};

export default ButtonTMS;
