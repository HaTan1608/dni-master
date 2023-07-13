/* eslint-disable */
import "./styles.less";
import styled from "styled-components";

const ActionsHeader = ({
  border,
  padding,
  header,
  borderRadius,
  background,
  actions,
}: any) => {
  // actions={[
  //   { text: "Xuất file", svg: <SvgIconExportFile />, scale: true },
  //   { text: "Nhập file", svg: <SvgIconImportFile />, scale: true },
  //   { text: "Sắp xếp", svg: <SvgIconGroupBy />, scale: true },
  // ]}
  console.log(actions);
  return (
    <ActionHeaderComponents
      background={background}
      padding={padding}
      borderradius={borderRadius}
    >
      <h4>{header || " "}</h4>
      <div className="actions">
        {actions?.length > 0 &&
          actions.map(
            (action: any, index: any) =>
              action && (
                <div
                  className={`actions__item ${action.scale ? "scaleSvg" : ""}`}
                  onClick={action.callback}
                  key={index}
                >
                  {action.svg}
                  &nbsp;{action.text}
                </div>
              )
          )}
      </div>
    </ActionHeaderComponents>
  );
};

export default ActionsHeader;

const ActionHeaderComponents = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  padding: ${(props) => props.padding || "0"};
  background: ${(props) => props.background || ""};
  border-radius: ${(props) => props.borderradius || "0"};
  h4 {
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 20px !important;
  }
  .actions {
    display: flex;
    align-items: center;

    &__item {
      display: flex;
      align-items: center;
      margin-left: 16px;
      cursor: pointer;
      justify-content: center;
      transition: all 0.2s;
      border: 1px solid #b0b6bc;
      border-radius: 5px;
      padding: 4px 9px;
      min-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      svg {
        margin-right: 4px;
        transform: scale(1.4);

        path {
          fill: #adb4bb !important;
          transition: all 0.2s;
        }
      }
      :hover {
        color: #000;
        border-color: #000;
        transition: all 0.2s;
        svg {
          path {
            transition: all 0.2s;

            fill: #000 !important;
          }
        }
      }
    }
    &__item.scaleSvg {
      svg {
        transform: scale(0.8);
      }
    }
    &__item.plusSvg {
      svg {
        transform: scale(0.7);
        margin-top: -3px;
      }
    }
  }
`;
