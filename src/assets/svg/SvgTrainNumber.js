import * as React from "react"

const SvgTrainNumber = (props) => (
    <svg
      width={25}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.166 14.599V9.053h-2.061V5.535h.04l2.1-2.1-.77-3.08h-6.452l-.77 3.08 2.1 2.1h.04v3.518H9.958V3.412h1.39V1.947H0v15.531h1.183a4.468 4.468 0 0 1 4.46-4.303c1.552 0 2.921.797 3.72 2.003a4.462 4.462 0 0 1 3.722-2.003 4.468 4.468 0 0 1 4.46 4.303h1.213v3.167H25v-2.74l-2.834-3.306ZM8.493 6.597v2.456H4.65V6.597h3.843Z"
        fill={props.fill?props.fill:"#fff"}
      />
      <path
        d="M13.085 14.64c-1.402 0-2.58.963-2.907 2.265H8.55a2.999 2.999 0 1 0 0 1.464h1.63a2.999 2.999 0 1 0 2.906-3.73Z"
        fill={props.fill?props.fill:"#fff"}
      />
    </svg>
  )

export default SvgTrainNumber
