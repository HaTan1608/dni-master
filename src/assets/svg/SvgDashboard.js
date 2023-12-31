const SvgDashboard = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={22}
    fill="none"
    {...props}
    style={{ ...props?.styles, transform: `scale(${props.scale})` }}
  >
    <g fill={`${props.fill} ? ${props.fill} : "#414141"`}>
      <path d="M3.392 18.507C5.158 20.127 7.467 21.1 10 21.1c5.517 0 10-4.633 10-10.333C20 5.281 15.85.786 10.625.459V4.78c2.925.32 5.208 2.885 5.208 5.985 0 3.324-2.616 6.028-5.833 6.028a5.69 5.69 0 0 1-3.658-1.335l-2.95 3.048z" />
      <path d="M.025 11.412a10.333 10.333 0 0 0 2.483 6.182l2.95-3.048a6.038 6.038 0 0 1-1.25-3.134H.025zm0-1.292h4.183c.284-2.807 2.45-5.046 5.167-5.339V.46C4.358.769.325 4.936.025 10.12z" />
    </g>
  </svg>
);

export default SvgDashboard;
