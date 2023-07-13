import * as React from "react";

const SvgLogout = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M8.625 16H.781A.781.781 0 0 1 0 15.219V.78A.781.781 0 0 1 .781 0h7.844a.781.781 0 0 1 0 1.563H1.562v12.874h7.063a.781.781 0 1 1 0 1.563Z"
        fill="#414141"
      />
      <path
        d="M15.015 8.781H5.844a.781.781 0 0 1 0-1.562h9.17a.781.781 0 1 1 0 1.562Z"
        fill="#414141"
      />
      <path
        d="M11.252 12.735a.78.78 0 0 1-.551-1.334L14.112 8 10.701 4.6a.78.78 0 1 1 1.103-1.107l3.967 3.954a.78.78 0 0 1 0 1.107l-3.967 3.953a.78.78 0 0 1-.552.228Z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgLogout;
