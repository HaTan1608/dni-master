/* eslint-disable */
import { IconUI } from "./IconPattern";
import { typeIconUI } from "./typesIcon";

interface IIconCustom {
  icon: typeIconUI;
  fill?: string;
  className?: string;
}

const DIcon = (props: IIconCustom) => {
  const { icon, fill, className } = props;

  const renderIcon = (icon: typeIconUI, fill?: string) => {
    const item = new (IconUI as any)({ icon, fill });
    return item.renderIcon();
  };

  return (
    <div className={`${className ? className : ""}`}>
      {renderIcon(icon, fill)}
    </div>
  );
};

export default DIcon;
