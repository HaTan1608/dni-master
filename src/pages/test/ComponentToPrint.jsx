import { forwardRef } from "react";
import "./stylesPrint.less";
const ComponentToPrint = forwardRef((props, ref) => {
  console.log(props);
  return <div ref={ref}>{props.children}</div>;
});
export default ComponentToPrint;
