const SvgCont = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
    style={{ ...props?.styles, transform: `scale(${props.scale})` }}
  >
    <path
      d="M4.583 4.314.461 5.438A.626.626 0 0 0 0 6.042v8.75c0 .281.19.529.46.603l4.123 1.124V4.314zM19.43 5.42 5.833 4.22v12.394l13.597-1.2a.625.625 0 0 0 .57-.622v-8.75a.625.625 0 0 0-.57-.623zM8.75 13.541a.625.625 0 0 1-1.25 0v-6.25a.625.625 0 0 1 1.25 0v6.25zm3.333-.417a.625.625 0 0 1-1.25 0V7.708a.625.625 0 0 1 1.25 0v5.417zm3.334-.417a.625.625 0 0 1-1.25 0V8.125a.625.625 0 0 1 1.25 0v4.583zm2.916-.208a.625.625 0 0 1-1.25 0V8.542a.625.625 0 0 1 1.25 0V12.5z"
      fill={`${props.fill} ? ${props.fill} : "#fff"`}
    />
  </svg>
);

export default SvgCont;
