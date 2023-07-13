/* eslint-disable */
import styled from "styled-components";

interface TypingAnimationInterface {
  texts: string[];
  fontSize: string;
  lineHeight: string;
  timeTyping: string;
  border: string;
  backgroundTyping: string;
}
const TypingAnimation = ({
  texts,
  fontSize,
  lineHeight,
  timeTyping,
  border,
  backgroundTyping,
}: TypingAnimationInterface) => {
  // const totalHeight = Number(lineHeight. * text.length
  const totalHeight =
    Number(lineHeight.substring(0, lineHeight.indexOf("px"))) * texts.length;
  return (
    <TypingAnimationComponents
      length={texts.length}
      fontsize={fontSize}
      lineheight={lineHeight}
      totalheight={totalHeight}
      timetyping={timeTyping}
      border={border}
      backgroundtyping={backgroundTyping}
    >
      <div className="textStylingAnimations">
        <div className="wrapper">
          <div className="static-txt">I'm</div>
          <ul className="dynamic-txts">
            {texts.length > 0 &&
              texts.map((text, index) => (
                <li key={index}>
                  <span>{text}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </TypingAnimationComponents>
  );
};

export default TypingAnimation;

const TypingAnimationComponents = styled.div<any>`
  .wrapper {
    display: flex;
  }
  .wrapper .static-txt {
    color: #fff;
    font-size: ${(props) => props.fontsize};
    font-weight: 400;
  }
  .wrapper .dynamic-txts {
    margin-left: 15px;
    line-height: ${(props) => props.lineheight};
    height: ${(props) => props.lineheight};
    background: transparent;
    overflow: hidden;
  }

  .dynamic-txts li {
    list-style: none;
    color: red;
    font-size: ${(props) => props.fontsize};
    font-weight: 500;
    top: 0;
    position: relative;
    animation: slide ${(props) => props.length * props.timetyping}s
      steps(${(props) => props.length}) infinite;
    width: auto;
  }

  @keyframes slide {
    100% {
      top: -${(props) => props.totalheight}px;
    }
  }
  .dynamic-txts li::after {
    position: absolute;
    content: "";
    left: 0;
    height: 100%;
    width: 100%;
    border-left: ${(props) => props.border};
    background: ${(props) => props.backgroundtyping};
    animation: typing ${(props) => props.timetyping}s steps(10) infinite;
  }

  @keyframes typing {
    40%,
    60% {
      left: calc(100%);
    }
    100% {
      left: 0;
    }
  }
`;
