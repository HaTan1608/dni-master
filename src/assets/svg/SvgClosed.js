const SvgClosed = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
    style={{ ...props?.styles, transform: `scale(${props.scale})` }}
  >
    <g fill={`${props.fill} ? ${props.fill} : "#000"`}>
      <path d="M13.477 25H1.22A1.22 1.22 0 0 1 0 23.78V1.22A1.22 1.22 0 0 1 1.22 0h12.257a1.22 1.22 0 0 1 0 2.441H2.44V22.56h11.036a1.22 1.22 0 0 1 0 2.441z" />
      <path d="M9.45 11.265h14.33a1.22 1.22 0 1 1 0 2.441H9.45a1.22 1.22 0 1 1 0-2.441z" />
      <path d="M15.329 5.087a1.22 1.22 0 0 1 .862 2.085l-5.33 5.313 5.33 5.313a1.223 1.223 0 0 1 .018 1.742 1.222 1.222 0 0 1-1.742-.013L8.27 13.35a1.22 1.22 0 0 1 0-1.73l6.198-6.177a1.217 1.217 0 0 1 .862-.356z" />
    </g>
  </svg>
);

export default SvgClosed;
