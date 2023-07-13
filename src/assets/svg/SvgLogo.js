import * as React from "react";

const SvgLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={42}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h62v42H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use transform="translate(-.027 -.25) scale(.00051)" />
      </pattern>
    </defs>
  </svg>
);

export default SvgLogo;
