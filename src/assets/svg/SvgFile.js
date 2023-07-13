import * as React from "react";

const SvgFile = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M14.978 3.181h-9.8a.55.55 0 0 1-.55-.55v-.274a.56.56 0 0 0-.56-.56H1.121A1.118 1.118 0 0 0 0 2.916v9.432l1.438-6.997a.55.55 0 0 1 .539-.44h14.122v-.61a1.12 1.12 0 0 0-1.12-1.12z"
    />
    <path
      fill="#fff"
      d="M17.879 6.012H2.425L.262 16.535a.557.557 0 0 0 .545.669H16.89c.571 0 1.051-.43 1.114-.998l.99-8.95a1.12 1.12 0 0 0-1.114-1.244z"
    />
  </svg>
);

export default SvgFile;
