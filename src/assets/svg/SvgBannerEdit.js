const SvgBannerEdit = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
    style={{ ...props?.styles, transform: `scale(${props.scale})` }}
  >
    <g fill="#ADB4BB">
      <path d="M9.142 10.172a1.413 1.413 0 0 1-.55.34l-1.988.663a1.397 1.397 0 0 1-1.44-.34 1.4 1.4 0 0 1-.34-1.439l.664-1.988c.068-.206.186-.396.34-.55l4.295-4.295H1.719A1.72 1.72 0 0 0 0 4.28v10A1.72 1.72 0 0 0 1.719 16h10a1.72 1.72 0 0 0 1.719-1.719V5.877l-4.296 4.295z" />
      <path d="M6.49 7.522a.469.469 0 0 0-.113.183l-.663 1.989a.469.469 0 0 0 .593.593l1.989-.663a.468.468 0 0 0 .183-.114l5.856-5.855-1.989-1.989L6.49 7.522zM14.887.229a.781.781 0 0 0-1.105 0l-.773.773 1.989 1.989.773-.773a.781.781 0 0 0 0-1.105l-.884-.884z" />
    </g>
  </svg>
);

export default SvgBannerEdit;
