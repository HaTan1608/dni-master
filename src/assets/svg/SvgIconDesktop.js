import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M27.314 2.552a2.246 2.246 0 0 0-1.647-.685H2.333c-.641 0-1.19.228-1.648.685A2.247 2.247 0 0 0 0 4.2v15.867c0 .642.228 1.19.685 1.648a2.247 2.247 0 0 0 1.648.685h7.934c0 .37-.078.749-.234 1.138-.155.389-.31.729-.466 1.02-.156.292-.233.506-.233.642 0 .253.092.472.277.656a.897.897 0 0 0 .656.278h7.466a.896.896 0 0 0 .657-.278.895.895 0 0 0 .277-.656c0-.126-.078-.338-.234-.634a10.719 10.719 0 0 1-.466-1.036 3.073 3.073 0 0 1-.233-1.13h7.933c.641 0 1.19-.228 1.647-.685A2.247 2.247 0 0 0 28 20.067V4.2c0-.642-.229-1.19-.686-1.648Zm-1.18 13.782a.448.448 0 0 1-.14.328.45.45 0 0 1-.327.138H2.333a.449.449 0 0 1-.328-.138.45.45 0 0 1-.138-.328V4.2c0-.126.046-.236.138-.328a.45.45 0 0 1 .328-.138h23.334c.126 0 .236.046.328.138a.448.448 0 0 1 .138.328v12.134Z"
        // fill="#BE1E2D"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h28v28H0z" />
      </clipPath>
    </defs>
  </svg>
)

const SvgIconDesktop = memo(SvgComponent)
export default SvgIconDesktop
