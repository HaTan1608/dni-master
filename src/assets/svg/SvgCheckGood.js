import * as React from "react"

const SvgCheckGood = (props) => (
  <svg
    width={25}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.304 11.423a2.44 2.44 0 0 0-1.886 3.98l6.199 7.593a2.215 2.215 0 0 0 1.852.822c.752-.04 1.431-.443 1.864-1.104L24.21 1.976l.006-.01c.121-.185.082-.553-.168-.784a.684.684 0 0 0-1.008.086L10.054 15.94a.565.565 0 0 1-.8.043l-4.31-3.922a2.43 2.43 0 0 0-1.64-.638Z"
      fill={props.fill?props.fill:"#001529"}
    />
  </svg>
)

export default SvgCheckGood