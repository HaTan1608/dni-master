/* eslint-disable */
import SvgHome from "src/assets/svg/SvgHome";
import SvgTelephone from "src/assets/svg/SvgTelephone";
import SvgUser from "src/assets/svg/SvgUser";
import styled from "styled-components";
import { columnsTrouble, columnsLogs } from "./data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersById } from "src/services/actions/orders.actions";
import { AppState } from "src/types";
import { Row, Col } from "antd";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";
import moment from "moment";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";

const OrderInformations = ({ dataOrder, stateUpdateOrder }: any) => {
  const dispatch = useDispatch();
  const stateOrderById = useSelector(
    (e: AppState) => e.ordersReducer.stateGetOrdersById
  );

  useEffect(() => {
    if (dataOrder.id) {
      dispatch(getOrdersById(dataOrder.id));
    }
  }, [dataOrder.id, stateUpdateOrder]);

  const dataUser = stateOrderById?.data?.bill || {};
  const [activeTab, setActiveTab] = useState(1);
  return (
    <OrderInformationsComponent>
      <div className="orderInformation-left">
        <div className="orderInformation-address">
          <h4>Thông tin địa chỉ:</h4>
          <div className="orderInformation-address-content">
            <div className="orderInformation-address-sender">
              <div style={{ display: "flex", alignItems: "center" }}>
                Người gửi:
              </div>
              <div className="centerRow">
                <SvgUser /> {dataUser?.sender_name}
              </div>
              <div className="centerRow">
                <SvgTelephone /> {dataUser?.sender_phone}
              </div>
              <div className="centerRow addressHome">
                <SvgHome style={{ marginRight: "8px" }} />{" "}
                <span className="addressHome-content">
                  {dataUser?.sender_address +
                    ", " +
                    dataUser?.sender_ward +
                    ", " +
                    dataUser?.sender_district +
                    ", " +
                    dataUser?.sender_province}
                </span>
              </div>
            </div>
            <div className="orderInformation-address-receiver">
              <div style={{ display: "flex", alignItems: "center" }}>
                Người nhận:{" "}
              </div>
              <div className="centerRow">
                <SvgUser /> {dataUser?.receiver_name}
              </div>
              <div className="centerRow">
                <SvgTelephone /> {dataUser?.receiver_phone}
              </div>
              <div className="centerRow addressHome">
                <SvgHome style={{ marginRight: "8px" }} />
                <span className="addressHome-content">
                  {" "}
                  {dataUser?.receiver_address +
                    ", " +
                    dataUser?.receiver_ward +
                    ", " +
                    dataUser?.receiver_district +
                    ", " +
                    dataUser?.receiver_province}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="orderInformation-commo">
          <div className="orderInformation-commo-commo">
            <h4>Thông tin hàng hoá</h4>
            <div className="rowBetween">
              <span className="rowLabel">Dịch vụ:</span>
              <span className="rowValue">{dataUser?.service}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Hình thức vận chuyển:</span>
              <span className="rowValue">
                {dataUser?.transportation_method}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Mã tham chiếu:</span>
              <span className="rowValue">{dataUser?.ref_code}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Giá trị hàng hóa (Vnđ):</span>
              <span className="rowValue">
                {dataUser?.cargo_value &&
                  convertNumberWithCommas(dataUser?.cargo_value.toString())}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Loại hàng hóa:</span>
              <span className="rowValue">{dataUser?.cargo_type}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Số kiện:</span>
              <span className="rowValue">{dataUser?.package_qty}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Trọng lượng hàng hóa (kg):</span>
              <span className="rowValue">{dataUser?.weight}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Thể tích (m3):</span>
              <span className="rowValue">{dataUser?.volume}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Trọng lượng quy đổi (kg):</span>
              <span className="rowValue">{dataUser?.dimension_weight}</span>
            </div>

            <div className="rowBetween">
              <span className="rowLabel">Trọng lượng tính cước (kg):</span>
              <span className="rowValue">{dataUser?.real_weight}</span>
            </div>
            <div></div>
            <div className="rowBetween">
              <span className="rowLabel">Ngày tạo đơn:</span>
              <span className="rowValue">{dataUser?.created_at}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Ngày xác nhận:</span>
              <span className="rowValue">
                {moment(
                  dataUser?.confirmed_at,
                  "YYYY-MM-DD HH-mm-ss"
                ).isValid() &&
                  moment(dataUser?.confirmed_at).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Ngày rời kho đi:</span>
              <span className="rowValue">{dataUser?.export_warehouse_at}</span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Ngày đến kho nhận:</span>
              <span className="rowValue">
                {dataUser?.received_warehouse_at}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Ngày hoàn thành:</span>
              <span className="rowValue">
                {moment(
                  dataUser?.delivery_at,
                  "YYYY-MM-DD HH-mm-ss"
                ).isValid() &&
                  moment(dataUser?.delivery_at).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Ngày thanh toán công nợ:</span>
              <span className="rowValue">{dataUser?.payment_at}</span>
            </div>
          </div>
          <div className="orderInformation-commo-payment">
            <h4>Thông tin thanh toán</h4>
            <div
              className="rowBetween"
              style={{ fontWeight: "600", color: "#000" }}
            >
              <span className="rowLabel">Tổng cước ( chưa VAT ):</span>
              <span className="rowValue">
                {dataUser?.total_fee_vat_ex &&
                  convertNumberWithCommas(
                    dataUser?.total_fee_vat_ex.toString()
                  )}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Cước chính:</span>
              <span className="rowValue">
                {dataUser?.main_fee_vat_ex &&
                  convertNumberWithCommas(dataUser?.main_fee_vat_ex.toString())}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Phí bảo hiểm:</span>
              <span className="rowValue">
                {dataUser?.insurance_fee &&
                  convertNumberWithCommas(dataUser?.insurance_fee.toString())}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Phí khác:</span>
              <span className="rowValue">
                {convertNumberWithCommas(
                  (
                    Number(dataUser?.lifting_fee) +
                    Number(dataUser?.insurance_fee) +
                    Number(dataUser?.packing_fee)
                  ).toString()
                )}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">&nbsp;</span>
              <span className="rowValue">&nbsp;</span>
            </div>
            <div
              className="rowBetween"
              style={{ fontWeight: "600", color: "#000" }}
            >
              <span className="rowLabel">Tiền thu hộ (COD):</span>
              <span className="rowValue">
                {dataUser?.cod_amount &&
                  convertNumberWithCommas(dataUser?.cod_amount.toString())}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Phí thu hộ (COD):</span>
              <span className="rowValue">
                {" "}
                {dataUser?.cod_fee &&
                  convertNumberWithCommas(dataUser?.cod_fee.toString())}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">Hình thức thanh toán:</span>
              <span className="rowValue">
                {dataUser?.payment_method_id === 1
                  ? "Công nợ"
                  : dataUser?.payment_method_id === 2
                  ? "NGTT"
                  : dataUser?.payment_method_id === 3
                  ? "NNTT"
                  : dataUser?.payment_method}
              </span>
            </div>
            <div className="rowBetween">
              <span className="rowLabel">&nbsp;</span>
              <span className="rowValue">&nbsp;</span>
            </div>
            <div>
              <span
                className="rowLabel"
                style={{ fontWeight: "600", color: "#000" }}
              >
                Ghi chú:
              </span>
              <div className="rowValue">{dataUser?.note}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="orderInformation-right">
        {/* <div className="orderInformation-employ">
          <div className="employReceiver">
            <div className="employReceiver-body">
              <h4>Nhân viên lấy hàng</h4>
              <div className="rowBetween">
                <span>Mã NV:</span>
                <span>-</span>
              </div>
              <div className="rowBetween">
                <span>Họ tên:</span>
                <span>-</span>
              </div>
              <div className="rowBetween">
                <span>Số điện thoại:</span>
                <span>-</span>
              </div>
            </div>
            <div className="employReceiver-footer">
              <div className="employReceiver-footer-phone">Gọi điện</div>
              <div className="employReceiver-footer-noti">Gửi thông báo</div>
            </div>
          </div>
          <div className="employShipping">
            <div className="employShipping-body">
              <h4>Nhân viên giao hàng</h4>
              <div className="rowBetween">
                <span>Mã NV:</span>
                <span>-</span>
              </div>
              <div className="rowBetween">
                <span>Họ tên:</span>
                <span>-</span>
              </div>
              <div className="rowBetween">
                <span>Số điện thoại:</span>
                <span>-</span>
              </div>
            </div>
            <div className="employShipping-footer">
              <div className="employShipping-footer-phone">Gọi điện</div>
              <div className="employShipping-footer-noti">Gửi thông báo</div>
            </div>
          </div>
        </div> */}
        <Row>
          <Col span={24}>
            <div className="orderInformation-trouble">
              <div className="orderInformation-trouble-header">
                <div
                  className={`headerItem ${activeTab === 1 && "activeItem"}`}
                  onClick={() => setActiveTab(1)}
                >
                  Sự cố giao hàng
                </div>
                <div
                  className={`headerItem ${activeTab === 2 && "activeItem"}`}
                  onClick={() => setActiveTab(2)}
                >
                  Sự cố nhận hàng
                </div>
              </div>
              {activeTab == 1 && (
                <div className="orderInformation-trouble-table">
                  <TableStyledAntd
                    rowKey={"id"}
                    columns={columnsTrouble}
                    dataSource={dataUser?.bill_history_issue?.filter(
                      (item: any) => {
                        return item?.issue_type == "D";
                      }
                    )}
                    pagination={false}
                    scroll={{ y: 160 }}
                    widthCol1="33%"
                    widthCol2="33%"
                    widthCol3="33%"
                  />
                </div>
              )}
              {activeTab == 2 && (
                <div className="orderInformation-trouble-table">
                  <TableStyledAntd
                    rowKey={"id"}
                    columns={columnsTrouble}
                    dataSource={dataUser?.bill_history_issue?.filter(
                      (item: any) => {
                        return item?.issue_type == "P";
                      }
                    )}
                    pagination={false}
                    scroll={{ y: 160 }}
                    widthCol1="33%"
                    widthCol2="33%"
                    widthCol3="33%"
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col span={24}>
            <div className="orderInformation-log">
              <h4>Log hành trình</h4>
              <div className="orderInformation-log-table">
                <TableStyledAntd
                  rowKey={"id"}
                  columns={columnsLogs}
                  dataSource={dataUser?.bill_logs}
                  pagination={false}
                  scroll={{ y: 220 }}
                  widthCol1="33%"
                  widthCol2="33%"
                  widthCol3="33%"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </OrderInformationsComponent>
  );
};

export default OrderInformations;

const OrderInformationsComponent = styled.div`
  display: flex;
  justify-content: space-between;

  .orderInformation-left {
    width: 50%;
    background: rgb(192, 232, 254);
    height: 100%;
    padding: 16px;
    .orderInformation-address {
      padding: 8px;
      border: 1px solid rgb(109, 153, 188);
      border-radius: 5px;
      background: #fff;
      h4 {
        font-weight: 600;
        font-size: 14px;
      }
      .orderInformation-address-content {
        display: flex;
        justify-content: space-between;
      }
      .orderInformation-address-sender {
        width: calc(50% - 16px);
      }
      .orderInformation-address-receiver {
        width: calc(50% - 16px);
      }
    }
    .orderInformation-commo {
      margin-top: 8px;
      padding: 8px;
      border: 1px solid rgb(109, 153, 188);
      border-radius: 5px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      .orderInformation-commo-commo {
        width: calc(50% - 16px);
        h4 {
          font-weight: 600;
          font-size: 14px;
        }
      }
      .orderInformation-commo-payment {
        width: calc(50% - 16px);
        h4 {
          font-weight: 600;
          font-size: 14px;
        }
      }
    }
  }
  .orderInformation-right {
    width: 50%;
    background: rgb(255, 255, 255);
    height: 100%;
    padding: 16px;
    .orderInformation-employ {
      display: flex;
      justify-content: space-between;
      .employReceiver {
        width: calc(50% - 16px);
        border: 1px solid #0f5c97;
        border-radius: 5px;
        background: #e5f6ff;
        h4 {
          font-weight: 600;
          font-size: 14px;
        }
        .employReceiver-body {
          padding: 8px;
        }
        .employReceiver-footer {
          display: flex;
          justify-content: space-between;
          margin: 0 !important;
          .employReceiver-footer-phone {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #137ec1;
            color: #fff;
            padding: 2px 0;
            border-right: 0.5px solid #000;
            border-top: 1px solid #000;
          }
          .employReceiver-footer-noti {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #137ec1;
            color: #fff;
            padding: 2px 0;
            border-top: 1px solid #000;
          }
        }
      }

      .employShipping {
        width: calc(50% - 16px);
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        background: #fff;
        h4 {
          font-weight: 600;
          font-size: 14px;
        }
        .employShipping-body {
          padding: 8px;
        }
        .employShipping-footer {
          display: flex;
          justify-content: space-between;
          margin: 0 !important;
          .employShipping-footer-phone {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #e8e8e8;
            color: #000000;
            padding: 2px 0;
            border-top: 1px solid #c4c4c4;
            border-right: 0.5px solid #c4c4c4;
          }
          .employShipping-footer-noti {
            cursor: pointer;
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #e8e8e8;
            border-top: 1px solid #c4c4c4;
            color: #000000;
            padding: 2px 0;
          }
        }
      }
    }

    .orderInformation-trouble {
      height: 50%;
      .orderInformation-trouble-header {
        display: flex;
        .headerItem {
          padding: 4px 9px;
          cursor: pointer;
        }
        .activeItem {
          color: #df5252;
          font-weight: 600;
          border: 1px solid #ffa7a7;
          border-bottom: none;
          border-top-left-radius: 5px;

          border-top-right-radius: 5px;
        }
      }
      .orderInformation-trouble-table {
        border: 1px solid #ffa7a7;
        border-radius: 5px;
        height: 200px;
        border-top-left-radius: 0;
        .ant-table-thead {
          background: #ffeeee !important;
          .ant-table-cell {
            color: #df5252;
          }
        }
      }
    }
    .orderInformation-log {
      margin-top: -4px;
      min-height: 200px;
      h4 {
        font-weight: 600;
        font-size: 14px;
      }
      .orderInformation-log-table {
        border: 1px solid #bfc4c9;
        border-radius: 5px;
      }
    }
  }
  .centerRow {
    display: flex;
    align-items: center;
    svg {
      width: 22px;
      height: 14px;
    }
  }
  .addressHome {
    position: relative;
    svg {
      position: absolute;
      top: 4px;
    }
    .addressHome-content {
      margin-left: 22px;
    }
  }
  .orderPlace {
    display: flex;
    align-items: center;
    background: rgb(0, 146, 210);
    padding: 2px 12px;
    color: #fff;
    width: 160px;
    margin-left: 4px;
    text-align: center;
    border-radius: 5px;
    svg path {
      fill: #fff;
    }
  }
  .rowBetween {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .rowLabel {
    color: #757575;
  }
  .rowValue {
  }
`;
