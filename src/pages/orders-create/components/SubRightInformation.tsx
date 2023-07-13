/* eslint-disable */
import { Form, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import SvgIconInformation from "src/assets/svg/SvgIconInformation";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";
import styled from "styled-components";
const SubRightInformation = ({ calTotalPrice, paymentMethods,dataUserSetting,form }: any) => {
  const [invisibleInformation, setInvisibleInformation] = useState(false);
  const [dataPayment, setDataPayment] = useState<any[]>([]);
  useEffect(() => {
    const PAYMENT_METHODS = dataUserSetting.filter((item: any) => {
      if (
        item.object_key === "PAYMENT_METHODS" && item.status === "A"
      ){
        return{
          payment_name:item.object_key,
          id:item.object_id,
        }
      }
    });
    setDataPayment(PAYMENT_METHODS)
    form.setFieldsValue({
      paymentMethod:PAYMENT_METHODS[0]?.object_id,
    })
  }, [dataUserSetting]);
  return (
    <SubLeftInfomationComponent>
      <div className="informationPayment">
        <h4>Thông tin thanh toán</h4>
        <div className="bold500">Hình thức thanh toán</div>
        {dataUserSetting.length===0&&
        (<Form.Item
          name="paymentMethod"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình thức thanh toán",
            },
          ]}
          style={{ margin: "8px 0" }}
        >
          <Radio.Group>
            <Space direction="horizontal">
              {paymentMethods &&
                paymentMethods.length > 0 &&
                paymentMethods.map((x: any, index: any) => (
                  <Radio value={x.id} key={index}>
                    {x.payment_name}
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </Form.Item>)}
        {dataUserSetting.length>0&&
        (<Form.Item
          name="paymentMethod"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình thức thanh toán",
            },
          ]}
          style={{ margin: "8px 0" }}
        >
          <Radio.Group>
            <Space direction="horizontal">
              {dataPayment &&
                dataPayment.length > 0 &&
                dataPayment.map((x: any, index: any) => (
                  <Radio value={x.object_id} key={index}>
                    {x.object_value}
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </Form.Item>)}
        <div className="bold500">Thông tin cước</div>
        <div className="rowBetween" style={{ marginTop: "2px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            Cước chính (Vnđ)&nbsp;{" "}
            {/* <span
              className="informationSvg"
              onClick={() => setInvisibleInformation(!invisibleInformation)}
            >
              {invisibleInformation && (
                <div className="information">
                  <div
                    style={{
                      textAlign: "left",
                      width: "100%",
                      fontWeight: "500",
                    }}
                  >
                    Cước chính bao gồm:
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Phí vận chuyển (Vnđ):</div>
                    <div>{calTotalPrice?.delivery_fee}</div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Phí bảo hiểm (Vnđ):</div>
                    <div>{calTotalPrice?.insurance_fee}</div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Phí ngoại thành xa (Vnđ):</div>
                    <div>{calTotalPrice?.remote_area_fee}</div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Phí khác (Vnđ):</div>
                    <div>{calTotalPrice?.other_fee}</div>
                  </div>
                </div>
              )}

              <SvgIconInformation />
            </span> */}
            &nbsp;:
          </div>
          <div>
            {calTotalPrice?.main_fee_vat_ex > 0
              ? convertNumberWithCommas(calTotalPrice?.main_fee_vat_ex.toString())
              : calTotalPrice?.main_fee_vat_ex}
            &nbsp; VNĐ
          </div>
        </div>
        <div className="rowBetween" style={{ marginTop: "2px" }}>
          <div>Phí COD (Vnđ):</div>
          <div>
            {calTotalPrice?.cod_fee > 0
              ? convertNumberWithCommas(calTotalPrice?.cod_fee.toString())
              : calTotalPrice?.cod_fee}
            &nbsp; VNĐ
          </div>
        </div>
        <div className="rowBetween sumTotal">
          <div>Tổng cước ( chưa VAT ):</div>
          <div>
            {calTotalPrice?.total_fee_vat_ex > 0
              ? convertNumberWithCommas(calTotalPrice?.total_fee_vat_ex.toString())
              : calTotalPrice?.total_fee_vat_ex}
            &nbsp; VNĐ
          </div>
        </div>
        <div className="rowBetween" style={{ marginTop: "2px" }}>
          <div>Thời gian giao hàng dự kiến:</div>
          <div>-</div>
        </div>
      </div>
    </SubLeftInfomationComponent>
  );
};

export default SubRightInformation;

const SubLeftInfomationComponent = styled.div`
  width: calc(50% - 8px);
  .informationPayment {
    padding: 16px;
    background: #fff;
    border-radius: 5px;
    h4 {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .bold500 {
    font-weight: 500;
  }
  .rowBetween {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sumTotal {
    font-weight: 500;
    font-size: 16px;
    border-top: 1px solid #adb4bb;
    padding-top: 8px;
    margin-top: 8px;
  }
  .informationNote {
    padding: 16px;

    background: #fff;
    border-radius: 5px;
    margin-top: 16px;
    h4 {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .informationSvg {
    position: relative;
    cursor: pointer;
    .information {
      position: absolute;
      width: 300px;
      background: #fff;
      padding: 8px;
      bottom: calc(100% + 4px);
      border: solid 1px #000;
      border-radius: 5px;
    }
  }
`;
