import { useState } from "react";
import styled from "styled-components";

const HeaderPriceSetting = ({ getActiveTabCallback }: any) => {
  const [activeTab, setActiveTab] = useState(1);
  const handleChangeTab = (e: any) => {
    getActiveTabCallback(e);
    setActiveTab(e);
  };
  return (
    <HeaderPriceSettingComponent>
      <div className="headerPriceSetting-tab">
        <div
          className={`headerPriceSetting-tab__item ${
            activeTab === 1 ? "activeTabPriceSetting" : ""
          }`}
          onClick={() => handleChangeTab(1)}
        >
          Chi tiết đơn giá
        </div>
        <div
          className={`headerPriceSetting-tab__item ${
            activeTab === 2 ? "activeTabPriceSetting" : ""
          } `}
          onClick={() => handleChangeTab(2)}
        >
          Khách hàng
        </div>
      </div>
    </HeaderPriceSettingComponent>
  );
};

export default HeaderPriceSetting;

const HeaderPriceSettingComponent = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
  justify-content: space-between;
  .headerPriceSetting-tab {
    display: flex;
    width: 50%;
    height: 100%;
  }
  .headerPriceSetting-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    height: 100%;
  }
  .headerPriceSetting-tab__item {
    width: 120px;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 5px 0 0;
    color: #808a94;
    cursor: pointer;
  }
  .activeTabPriceSetting {
    background: #fff;
    color: #000;
    font-weight: 600;
  }
`;
