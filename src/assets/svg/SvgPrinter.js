import * as React from "react";

const SvgPrinter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g fill="#414141">
      <path d="M14.871 4.031H13.08V1.105a.484.484 0 0 0-.484-.484h-9.19a.484.484 0 0 0-.484.484v2.926H1.129A1.13 1.13 0 0 0 0 5.16v6.207a1.13 1.13 0 0 0 1.129 1.128H2.92v2.4c0 .267.217.484.484.484h9.19a.484.484 0 0 0 .484-.484v-2.4h1.792A1.13 1.13 0 0 0 16 11.367V5.16a1.13 1.13 0 0 0-1.13-1.13zM3.888 1.59h8.223v2.44H3.888V1.59zm8.223 12.822H3.888v-4.8h8.223v4.8zm2.921-3.044a.164.164 0 0 1-.16.16h-1.793V9.129a.484.484 0 0 0-.484-.483h-9.19a.484.484 0 0 0-.484.483v2.4H1.129a.163.163 0 0 1-.161-.162V5.16c0-.088.073-.161.16-.161h13.744c.088 0 .161.073.161.16v6.208z" />
      <path d="M12.595 7.51a.688.688 0 1 0 0-1.376.688.688 0 0 0 0 1.376zM10.2 10.567H5.8a.484.484 0 1 0 0 .967h4.4a.484.484 0 1 0 0-.967zm0 1.922H5.8a.484.484 0 1 0 0 .967h4.4a.484.484 0 1 0 0-.967z" />
    </g>
  </svg>
);

export default SvgPrinter;