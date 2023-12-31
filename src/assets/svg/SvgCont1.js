const SvgCont1 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
    style={{ ...props?.styles, transform: `scale(${props.scale})` }}
  >
    <path
      d="M5.73 5.393.575 6.798A.783.783 0 0 0 0 7.552V18.49c0 .352.236.661.576.754l5.153 1.405V5.393zm18.558 1.381-16.996-1.5v15.494l16.995-1.5A.78.78 0 0 0 25 18.49V7.552a.78.78 0 0 0-.712-.778zm-13.35 10.153a.782.782 0 0 1-1.563 0V9.115a.782.782 0 0 1 1.563 0v7.812zm4.166-.52a.782.782 0 0 1-1.562 0V9.634a.782.782 0 0 1 1.562 0v6.771zm4.167-.522a.782.782 0 0 1-1.563 0v-5.729a.782.782 0 0 1 1.563 0v5.73zm3.646-.26a.782.782 0 0 1-1.563 0v-4.948a.782.782 0 0 1 1.563 0v4.948z"
      fill={props.fill ? props.fill : "#fff"}
    />
  </svg>
);

export default SvgCont1;
