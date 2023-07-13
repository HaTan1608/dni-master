import * as React from "react"

const SvgTwoPage = (props) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)" fill={props.fill?props.fill:"#000"}>
      <path d="M17.519 4.032H3.163a.946.946 0 0 0-.945.945v19.078c0 .521.424.945.945.945h14.356c.52 0 .944-.424.944-.945V4.977a.946.946 0 0 0-.944-.945ZM14.315 17.34H6.653a.806.806 0 1 1 0-1.613h7.662a.806.806 0 1 1 0 1.613Zm0-3.226H6.653a.806.806 0 1 1 0-1.613h7.662a.806.806 0 1 1 0 1.613Zm0-3.226H6.653a.806.806 0 1 1 0-1.613h7.662a.806.806 0 1 1 0 1.613Z" />
      <path d="M22.782 2.42V20.16c0 1.218-.98 2.42-2.706 2.42V4.977A2.56 2.56 0 0 0 17.52 2.42H4.924C4.924 1.085 6.074 0 7.486 0H20.22c1.413 0 2.562 1.085 2.562 2.42Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgTwoPage