import * as React from "react";

const SvgZone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M10 0C6.7 0 4 2.7 4 6s6 11 6 11 6-7.7 6-11-2.7-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
    />
    <path
      fill="#fff"
      d="M16.3 11.1c-.3.6-.6 1.2-1 1.8 1.7.6 2.7 1.4 2.7 2.1 0 1.2-3.2 3-8 3s-8-1.8-8-3c0-.7 1-1.5 2.7-2.2-.4-.6-.7-1.2-1-1.8C1.4 12 0 13.4 0 15c0 2.8 4.2 5 9.8 5 5 0 10.2-1.7 10.2-5 0-1.6-1.4-3-3.7-3.9z"
    />
  </svg>
);

export default SvgZone;
