/* eslint-disable */
import { useEffect, useState } from "react";
import colors from "src/utils/colors";
import styled from "styled-components";
const StatusTabs = ({ status, getStatusCallback }: any) => {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    setActiveTab(status[0]?.value);
  }, [status]);
  const getStatus = (e: any) => {
    getStatusCallback(e);
    setActiveTab(e);
  };
  return (
    <StatusTabsComponents>
      {status.length > 0 &&
        status.map((x: any, index: any) => (
          <div
            className={`statusTab ${
              activeTab === x.value && "activeStatusTab"
            }`}
            key={index}
            onClick={() => getStatus(x.value)}
          >
            {x.label}
          </div>
        ))}
    </StatusTabsComponents>
  );
};

export default StatusTabs;

const StatusTabsComponents = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .statusTab {
    color: ${colors.neutral_color_1_3};
    border: 1px solid ${colors.neutral_color_1_3};
    background: ${colors.neutral_color_1_8};
    padding: 4px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .activeStatusTab {
    color: ${colors.neutral_color_1_8};
    border: 1px solid #137ec1;
    background: #137ec1;
    transition: all 0.2s;
  }
`;
