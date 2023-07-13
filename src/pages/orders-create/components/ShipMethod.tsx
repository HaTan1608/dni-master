/* eslint-disable */
import { useEffect, useState } from "react";
import styled from "styled-components";
import SvgIconShop from "src/assets/svg/SvgIconShop";
import SvgTransport from "src/assets/svg/SvgTransport";
import { SwapRightOutlined } from "@ant-design/icons";
import colors from "src/utils/colors";
import SvgServices from "src/assets/svg/SvgServices";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
const ShipMethod = (props: any) => {
  const { getShipMethodCallback, getServiceCallback, dataUser } = props;
  const isMount = useIsMount();
  const TRANSPORTATION_METHODS_48H = dataUser.filter((item: any) => {
    return (
      item.object_key === "48H_TRANSPORTATION_METHODS" && item.status === "A"
    );
  });
  const TRANSPORTATION_METHODS_36H = dataUser.filter((item: any) => {
    return (
      item.object_key === "36H_TRANSPORTATION_METHODS" && item.status === "A"
    );
  });
  const [shipMethod, setShipMethod] = useState(1);
  const [service, setService] = useState(1);
  useEffect(() => {
    getShipMethodCallback(shipMethod);
  }, [shipMethod]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isMount) return;
    setService(1);
  }, [dataUser]);
  useEffect(() => {
    getServiceCallback(service);
    if (dataUser) {
      if (service === 1) {
        setShipMethod(1);
      }
      else if (service === 2) {
        setShipMethod(1);
      } else {
        setShipMethod(TRANSPORTATION_METHODS_48H[0]?.object_id);
      }
    }
  }, [service]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ShipMethodComponent>
      <div>
        <h4>Dịch vụ</h4>
        <div className="mainInformation-services">
          {dataUser.length === 0 && (
            <>
              <div
                className={`mainInformation-services__item  ${
                  service === 1 && "activeShipMethod"
                }`}
                onClick={() => {
                  setService(1);
                  setShipMethod(1);
                }}
              >
                <SvgServices />
                &nbsp;36 giờ
              </div>
              <div
                className={`mainInformation-services__item  ${
                  service === 2 && "activeShipMethod"
                }`}
                onClick={() => setService(2)}
              >
                <SvgServices />
                &nbsp;48 giờ
              </div>
            </>
          )}
          {dataUser.length > 0 && (
            <>
              {TRANSPORTATION_METHODS_36H.length > 0 && (
                <div
                  className={`mainInformation-services__item  ${
                    service === 1 && "activeShipMethod"
                  }`}
                  onClick={() => {
                    setService(1);
                    setShipMethod(1);
                  }}
                >
                  <SvgServices />
                  &nbsp;36 giờ
                </div>
              )}
              {TRANSPORTATION_METHODS_48H.length > 0 && (
                <div
                  className={`mainInformation-services__item  ${
                    service === 2 && "activeShipMethod"
                  }`}
                  onClick={() => {
                    setService(2);
                  }}
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
        {dataUser.length == 0 && (
          <div className="mainInformation-shipMethod">
            <div
              className={`mainInformation-shipMethod__item ${
                shipMethod === 1 && "activeShipMethod"
              }`}
              onClick={() => setShipMethod(1)}
            >
              <SvgTransport />
              &nbsp;Ga&nbsp;
              <SwapRightOutlined />
              &nbsp;
              <SvgTransport />
              &nbsp;Ga
            </div>
            {service === 2 && (
              <>
                <div
                  className={`mainInformation-shipMethod__item ${
                    shipMethod === 2 && "activeShipMethod"
                  }`}
                  onClick={() => setShipMethod(2)}
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
                    shipMethod === 3 && "activeShipMethod"
                  }`}
                  onClick={() => setShipMethod(3)}
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
                    shipMethod === 4 && "activeShipMethod"
                  }`}
                  onClick={() => setShipMethod(4)}
                >
                  <SvgIconShop className="svgShop" />
                  &nbsp;Kho&nbsp;
                  <SwapRightOutlined />
                  &nbsp;
                  <SvgIconShop className="svgShop" />
                  &nbsp;Kho
                </div>
              </>
            )}
          </div>
        )}
        {dataUser.length > 0 && (
          <div className="mainInformation-shipMethod">
            {service === 1 && (
              <>
                {TRANSPORTATION_METHODS_36H.map((item: any, index: any) => {
                  return item.object_value === "GA-GA" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 1 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(1)}
                      key={index}
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
                {TRANSPORTATION_METHODS_36H.map((item: any, index: any) => {
                  return item.object_value === "GA-KHO" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 2 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(2)}
                      key={index}
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
                {TRANSPORTATION_METHODS_36H.map((item: any, index: any) => {
                  return item.object_value === "KHO-GA" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 3 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(3)}
                      key={index}
                    >
                      <SvgIconShop className="svgShop" />
                      &nbsp;Kho&nbsp;
                      <SwapRightOutlined />
                      &nbsp;
                      <SvgTransport />
                      &nbsp;Ga
                    </div>
                  ) : (
                    ""
                  );
                })}
                {TRANSPORTATION_METHODS_36H.map((item: any, index: any) => {
                  return item.object_value === "KHO-KHO" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 4 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(4)}
                      key={index}
                    >
                      <SvgIconShop className="svgShop" />
                      &nbsp;Kho&nbsp;
                      <SwapRightOutlined />
                      &nbsp;
                      <SvgIconShop className="svgShop" />
                      &nbsp;Kho
                    </div>
                  ) : (
                    ""
                  );
                })}
              </>
            )}
            {service === 2 && (
              <>
                {TRANSPORTATION_METHODS_48H.map((item: any, index: any) => {
                  return item.object_value === "GA-GA" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 1 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(1)}
                      key={index}
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
                {TRANSPORTATION_METHODS_48H.map((item: any, index: any) => {
                  return item.object_value === "GA-KHO" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 2 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(2)}
                      key={index}
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
                {TRANSPORTATION_METHODS_48H.map((item: any, index: any) => {
                  return item.object_value === "KHO-GA" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 3 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(3)}
                      key={index}
                    >
                      <SvgIconShop className="svgShop" />
                      &nbsp;Kho&nbsp;
                      <SwapRightOutlined />
                      &nbsp;
                      <SvgTransport />
                      &nbsp;Ga
                    </div>
                  ) : (
                    ""
                  );
                })}
                {TRANSPORTATION_METHODS_48H.map((item: any, index: any) => {
                  return item.object_value === "KHO-KHO" ? (
                    <div
                      className={`mainInformation-shipMethod__item ${
                        shipMethod === 4 && "activeShipMethod"
                      }`}
                      onClick={() => setShipMethod(4)}
                      key={index}
                    >
                     <SvgIconShop className="svgShop" />
                      &nbsp;Kho&nbsp;
                      <SwapRightOutlined />
                      &nbsp;
                      <SvgIconShop className="svgShop" />
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
  );
};

export default ShipMethod;

const ShipMethodComponent = styled.div`
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
