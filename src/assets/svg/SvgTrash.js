import * as React from "react";

const SvgTrash = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 3H1a1 1 0 0 0 0 2h2v12a3.001 3.001 0 0 0 3 3h8a3 3 0 0 0 3-3V5h2a1 1 0 1 0 0-2ZM9 14a1 1 0 1 1-2 0V9a1 1 0 0 1 2 0v5Zm4 0a1 1 0 1 1-2 0V9a1 1 0 0 1 2 0v5ZM8 2h4a1 1 0 1 0 0-2H8a1 1 0 1 0 0 2Z"
      fill={props.fill?props.fill:"#E46463"}
    />
  </svg>
);

export default SvgTrash;
