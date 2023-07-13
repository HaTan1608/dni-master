/* eslint-disable */
import { SwapRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import SvgIconShop from "src/assets/svg/SvgIconShop";
import SvgServices from "src/assets/svg/SvgServices";
import SvgTransport from "src/assets/svg/SvgTransport";
import { ROLES_SYSTEM } from "src/constants";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import colors from "src/utils/colors";
import { localGetAccount, localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import styled from "styled-components";
const ShipMethod = ({
  getShipMethodCallback,
  getServiceCallback,
  disable,
  dataMethods,
}: any) => {
  const [phone, setPhone] = useState<any>();
  const [settings, dataSettings] = useState<any>([]);
  const [transport36, setTransport36] = useState<any>([]);
  const [transport48, setTransport48] = useState<any>([]);
  useEffect(() => {
    _renderProfile();
  }, []);
  useEffect(() => {
    checkUserFunction(phone);
  }, [phone]);
  useEffect(() => {
    if (settings.length > 0) {
      const TRANSPORTATION_METHODS_48H = settings.filter((item: any) => {
        return (
          item.object_key === "48H_TRANSPORTATION_METHODS" &&
          item.status === "A"
        );
      });
      setTransport48(TRANSPORTATION_METHODS_48H);
      const TRANSPORTATION_METHODS_36H = settings.filter((item: any) => {
        return (
          item.object_key === "36H_TRANSPORTATION_METHODS" &&
          item.status === "A"
        );
      });
      setTransport36(TRANSPORTATION_METHODS_36H);
      if (dataMethods.service === 1) {
        getShipMethodCallback(1);
      } else if (dataMethods.service === 2) {
        getShipMethodCallback(1);
      } else {
        getShipMethodCallback(TRANSPORTATION_METHODS_48H[0]?.object_id);
      }
    }
  }, [settings, dataMethods.service]);
  const _renderProfile = () => {
    let _account = localGetAccount();
    if (_account) {
      let _user = JSON.parse(_account);
      if (!ROLES_SYSTEM.includes(_user.userData.roles)) {
        setPhone(_user.userData.phone);
      }
    }
  };
  const checkUserFunction = async (phone: any) => {
    let headers: any = {
      "Content-Type": "application/json,text/plain, */*",
    };

    let token = localGetToken();
    let uuid = localGetAuthUUID();
    if (token) {
      headers.Authorization = token;
      headers['x-auth-uuid']= uuid;
    }

    try {
      const { data } = await axios.get(
        `${API_URL}/${ROOT_VERSION}/customers?search=${phone}&status=A`,
        {
          headers: headers,
        }
      );
      if (data) {
        if (data?.data?.users.length > 0) {
          dataSettings(data?.data?.users[0].settings);
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ShipMethodComponent>
        <div>
          <h4>Dịch vụ</h4>

          <div className="mainInformation-services">
            {settings.length === 0 && (
              <>
                <div
                  className={`mainInformation-services__item  ${
                    dataMethods.service == 1 && "activeShipMethod"
                  }`}
                  style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                  onClick={() => {
                    disable.length === 0 && getServiceCallback(1);
                  }}
                >
                  <SvgServices />
                  &nbsp;36 giờ
                </div>
                <div
                  className={`mainInformation-services__item  ${
                    dataMethods.service == 2 && "activeShipMethod"
                  }`}
                  style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                  onClick={() => disable.length === 0 && getServiceCallback(2)}
                >
                  <SvgServices />
                  &nbsp;48 giờ
                </div>
              </>
            )}
            {settings.length > 0 && (
              <>
                {transport36.length > 0 && (
                  <div
                    className={`mainInformation-services__item  ${
                      dataMethods.service == 1 && "activeShipMethod"
                    }`}
                    style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                    onClick={() => {
                      disable.length === 0 && getServiceCallback(1);
                    }}
                  >
                    <SvgServices />
                    &nbsp;36 giờ
                  </div>
                )}
                {transport48.length > 0 && (
                  <div
                    className={`mainInformation-services__item  ${
                      dataMethods.service == 2 && "activeShipMethod"
                    }`}
                    style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                    onClick={() =>
                      disable.length === 0 && getServiceCallback(2)
                    }
                  >
                    <SvgServices />
                    &nbsp;48 giờ
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div style={{ marginLeft: "16px" }}>
          <h4>Hình thức vận chuyển</h4>
          {settings.length === 0 && (
            <div className="mainInformation-shipMethod">
              <div
                className={`mainInformation-shipMethod__item ${
                  dataMethods.shipMethod === 1 && "activeShipMethod"
                }`}
                style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                onClick={() => disable.length === 0 && getShipMethodCallback(1)}
              >
                <SvgTransport />
                &nbsp;Ga&nbsp;
                <SwapRightOutlined />
                &nbsp;
                <SvgTransport />
                &nbsp;Ga
              </div>
              {dataMethods.service === 2 && (
                <>
                  <div
                    className={`mainInformation-shipMethod__item ${
                      dataMethods.shipMethod === 2 && "activeShipMethod"
                    }`}
                    style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                    onClick={() =>
                      disable.length === 0 && getShipMethodCallback(2)
                    }
                  >
                    <SvgTransport />
                    &nbsp;Ga&nbsp;
                    <SwapRightOutlined />
                    &nbsp;
                    <SvgIconShop className="svgShop" />
                    &nbsp;Kho
                  </div>
                  <div
                    className={`mainInformation-shipMethod__item ${
                      dataMethods.shipMethod === 3 && "activeShipMethod"
                    }`}
                    style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                    onClick={() =>
                      disable.length === 0 && getShipMethodCallback(3)
                    }
                  >
                    <SvgIconShop className="svgShop" />
                    &nbsp;Kho&nbsp;
                    <SwapRightOutlined />
                    &nbsp;
                    <SvgIconShop className="svgShop" />
                    &nbsp;Ga
                  </div>
                  <div
                    className={`mainInformation-shipMethod__item ${
                      dataMethods.shipMethod === 4 && "activeShipMethod"
                    }`}
                    style={disable.length > 0 ? { cursor: "not-allowed" } : {}}
                    onClick={() =>
                      disable.length === 0 && getShipMethodCallback(4)
                    }
                  >
                    <SvgIconShop className="svgShop" />
                    &nbsp;Kho&nbsp;
                    <SwapRightOutlined />
                    &nbsp;
                    <SvgTransport />
                    &nbsp;Kho
                  </div>
                </>
              )}
            </div>
          )}
          {settings.length > 0 && (
            <div className="mainInformation-shipMethod">
              {dataMethods.service === 1 &&
                transport48.map((item: any, index: any) => {
                  return item.object_value === "GA-GA" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        dataMethods.shipMethod === 1 && "activeShipMethod"
                      }`}
                      style={
                        disable.length > 0 ? { cursor: "not-allowed" } : {}
                      }
                      onClick={() =>
                        disable.length === 0 && getShipMethodCallback(1)
                      }
                    >
                      <SvgTransport />
                      &nbsp;Ga&nbsp;
                      <SwapRightOutlined />
                      &nbsp;
                      <SvgTransport />
                      &nbsp;Ga
                    </div>
                  ) : (
                    ""
                  );
                })}
              {dataMethods.service === 2 && (
                <>
                  {transport48.map((item: any, index: any) => {
                    return item.object_value === "GA-GA" ? (
                      <div
                        className={`mainInformation-shipMethod__item ${
                          dataMethods.shipMethod === 1 && "activeShipMethod"
                        }`}
                        style={
                          disable.length > 0 ? { cursor: "not-allowed" } : {}
                        }
                        onClick={() =>
                          disable.length === 0 && getShipMethodCallback(1)
                        }
                      >
                        <SvgTransport />
                        &nbsp;Ga&nbsp;
                        <SwapRightOutlined />
                        &nbsp;
                        <SvgTransport />
                        &nbsp;Ga
                      </div>
                    ) : (
                      ""
                    );
                  })}
                  {transport48.map((item: any, index: any) => {
                    return item.object_value === "GA-KHO" ? (
                      <div
                        className={`mainInformation-shipMethod__item ${
                          dataMethods.shipMethod === 2 && "activeShipMethod"
                        }`}
                        style={
                          disable.length > 0 ? { cursor: "not-allowed" } : {}
                        }
                        onClick={() =>
                          disable.length === 0 && getShipMethodCallback(2)
                        }
                      >
                        <SvgTransport />
                        &nbsp;Ga&nbsp;
                        <SwapRightOutlined />
                        &nbsp;
                        <SvgIconShop className="svgShop" />
                        &nbsp;Kho
                      </div>
                    ) : (
                      ""
                    );
                  })}
                  {transport48.map((item: any, index: any) => {
                    return item.object_value === "KHO-GA" ? (
                      <div
                        className={`mainInformation-shipMethod__item ${
                          dataMethods.shipMethod === 3 && "activeShipMethod"
                        }`}
                        style={
                          disable.length > 0 ? { cursor: "not-allowed" } : {}
                        }
                        onClick={() =>
                          disable.length === 0 && getShipMethodCallback(3)
                        }
                      >
                        <SvgIconShop className="svgShop" />
                        &nbsp;Kho&nbsp;
                        <SwapRightOutlined />
                        &nbsp;
                        <SvgIconShop className="svgShop" />
                        &nbsp;Ga
                      </div>
                    ) : (
                      ""
                    );
                  })}
                  {transport48.map((item: any, index: any) => {
                    return item.object_value === "KHO-KHO" ? (
                      <div
                        className={`mainInformation-shipMethod__item ${
                          dataMethods.shipMethod === 4 && "activeShipMethod"
                        }`}
                        style={
                          disable.length > 0 ? { cursor: "not-allowed" } : {}
                        }
                        onClick={() =>
                          disable.length === 0 && getShipMethodCallback(4)
                        }
                      >
                        <SvgIconShop className="svgShop" />
                        &nbsp;Kho&nbsp;
                        <SwapRightOutlined />
                        &nbsp;
                        <SvgTransport />
                        &nbsp;Kho
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </ShipMethodComponent>
    </>
  );
};

export default ShipMethod;

const ShipMethodComponent = styled.div`
padding: 0 16px 16px 16px;
margin-top:-16px;

  display: flex;
  .mainInformation-shipMethod {
    display: flex;

    &__item {
      display: flex;
      align-items: center;
      border-radius: 5px;
      border: solid 1px #808a94;
      padding: 4px 8px;
      margin-right: 8px;
      svg path {
        fill: #808a94;
      }
      cursor: pointer;
      transition: all 0.2s;
    }
    .activeShipMethod {
      border: 1px solid ${colors.accent_color_5_6};
      background: ${colors.accent_color_5_6};
      color: ${colors.neutral_color_1_8};
      svg path {
        fill: ${colors.neutral_color_1_8};
      }
      transition: all 0.2s;
    }
    .svgShop {
      transform: scale(0.7);
    }
  }
  .mainInformation-services {
    display: flex;
    align-items: flex-start;
    margin: 0;
    &__item {
      display: flex;
      align-items: center;
      border-radius: 5px;
      border: solid 1px #808a94;
      padding: 4px 8px;
      margin-right: 8px;
      svg path {
        fill: #808a94;
      }
      cursor: pointer;
      transition: all 0.2s;
    }
    .activeShipMethod {
      border: 1px solid ${colors.accent_color_5_6};
      background: ${colors.accent_color_5_6};
      color: ${colors.neutral_color_1_8};
      svg path {
        fill: ${colors.neutral_color_1_8};
      }
      transition: all 0.2s;
    }
    .svgShop {
      transform: scale(0.7);
    }
  }
  }
`;
