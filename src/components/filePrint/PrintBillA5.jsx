import React from "react";
import SvgCheckComplete from "src/assets/svg/SvgCheckComplete";
import SvgPrintFile1 from "src/assets/svg/SvgPrintFile1";
import SvgPrintFile2 from "src/assets/svg/SvgPrintFile2";
import {
  convertNumberWithCommas,
  convertStringWithCommas,
  getAddressString,
  numberWithDot,
} from "src/utils/helpers/functions/textUtils";
import AxisSvg from "src/assets/images/AxisSvg.svg";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
const PrintBillA5 = ({ selectedOrders }) => {
  return (
    <>
      {selectedOrders &&
        selectedOrders.length > 0 &&
        selectedOrders.map((selectedOrder, index) => {
          const senderAddress = getAddressString(
            selectedOrder.sender_address,
            selectedOrder.sender_ward,
            selectedOrder.sender_district,
            selectedOrder.sender_province
          );

          const receiverAddress = getAddressString(
            selectedOrder.receiver_address,
            selectedOrder.receiver_ward,
            selectedOrder.receiver_district,
            selectedOrder.receiver_province
          );

          return (
            <div className="page " style={{ marginBottom: "16px" }} key={index}>
              <div className="backgroundPrint"></div>
              <div className="flexPrint">
                <div
                  className="flexPrint width50 borderLeft borderRight borderBottom borderTop padding4"
                  style={{
                    height: "60px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SvgPrintFile1 />
                    &nbsp;&nbsp;0888 480 505
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "8px",
                    }}
                  >
                    <SvgPrintFile2 />
                    &nbsp;&nbsp;www.duongtruc.vn
                  </div>
                </div>
                <div
                  className="flexPrint width50  borderRight borderBottom borderTop padding4"
                  style={{
                    height: "60px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "75%",
                      padding: "0 20px",
                    }}
                    className="barcodePrint"
                  >
                    {selectedOrder.bill_code && (
                      <Barcode
                        className="barcodePrint"
                        value={selectedOrder.bill_code}
                        width="1"
                        height="28px"
                        format="CODE128"
                        displayValue="true"
                        font="unset"
                        fontSize="12px"
                        background="transparent"
                        lineColor="#000000"
                        textAlign="justify"
                        textMargin="4px"
                      />
                    )}
                    {selectedOrder.bill_code && (
                      <QRCode value={selectedOrder.bill_code} size="45" />
                    )}
                  </div>
                  <div
                    className="borderLeft"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      width: "25%",
                      marginLeft: "10px",
                      paddingRight: "-10px",
                    }}
                  >
                    <div
                      style={{
                        height: "50px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={AxisSvg}
                        alt=""
                        style={{
                          height: "60px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="flexPrint">
                <div className="flexPrint width50 borderLeft borderRight borderBottom padding4">
                  <span className="stt">01</span>
                  <span className="sttTitle">
                    Mã khách hàng:{selectedOrder.customer_code}
                  </span>
                </div>
                <div className="flexPrint width50 borderRight borderBottom padding4">
                  <span className="stt">02</span>
                  <span className="sttTitle">
                    Mã tham chiếu:{selectedOrder.ref_code}
                  </span>
                </div>
              </div>
              {/*  */}
              <div
                className="flexPrint"
                style={{ height: "90px", overflow: "hidden" }}
              >
                <div className=" width50 borderLeft borderRight borderBottom padding4">
                  <div
                    className="sttTitle mr0 threeDot"
                    style={{ position: "relative" }}
                  >
                    Người gửi:&nbsp;
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "18px",
                        right: "0px",
                        width: "calc(100% - 70px)",
                      }}
                    />
                    <span style={{ fontWeight: "400" }}>
                      {selectedOrder.sender_name}
                    </span>
                  </div>
                  <div className="threeDot" style={{ position: "relative" }}>
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "18px",
                        right: "0px",
                        width: "calc(100% - 70px)",
                      }}
                    />
                    Điện thoại:&nbsp;{selectedOrder.sender_phone}
                  </div>
                  <div className="width100" style={{ position: "relative" }}>
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "18px",
                        right: "0px",
                        width: "calc(100% - 48px)",
                      }}
                    />
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "40px",
                        right: "0px",
                        width: "100%",
                      }}
                    />
                    <span className="threeDot2Lines">
                      Địa chỉ:&nbsp;{senderAddress}
                    </span>
                  </div>
                </div>
                <div className=" width50 borderRight borderBottom padding4 ">
                  <div
                    className="sttTitle mr0 threeDot"
                    style={{ position: "relative" }}
                  >
                    Người nhận:&nbsp;
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "18px",
                        right: "0px",
                        width: "calc(100% - 80px)",
                      }}
                    />
                    <span style={{ fontWeight: "400" }}>
                      {selectedOrder.receiver_name}
                    </span>
                  </div>
                  <div className="threeDot" style={{ position: "relative" }}>
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "18px",
                        right: "0px",
                        width: "calc(100% - 70px)",
                      }}
                    />
                    Điện thoại:&nbsp;{selectedOrder.receiver_phone}
                  </div>
                  <div className="width100" style={{ position: "relative" }}>
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "18px",
                        right: "0px",
                        width: "calc(100% - 48px)",
                      }}
                    />
                    <div
                      style={{
                        border: ".5px dotted #000",
                        position: "absolute",
                        top: "40px",
                        right: "0px",
                        width: "100%",
                      }}
                    />
                    <p className="threeDot2Lines">
                      Địa chỉ:&nbsp;{receiverAddress}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flexPrint">
                <div className=" width75">
                  <div className="flexPrint width100">
                    <div className=" width33">
                      <div
                        className="width100 padding4  borderLeft borderBottom"
                        style={{ height: "60px" }}
                      >
                        <div className="flexPrint width100 ">
                          <span className="stt">03</span>
                          <span className="sttTitle">Dịch vụ:</span>
                        </div>
                        <div
                          className="flexPrint width100"
                          style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "4px",
                          }}
                        >
                          <div className="flexPrint width50">
                            <span className="checkboxPrint">
                              {selectedOrder.service === "36H" && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">36H</span>
                          </div>
                          <div className="flexPrint width50">
                            <span className="checkboxPrint">
                              {selectedOrder.service === "48H" && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">48H</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="width100 padding4   borderLeft borderBottom"
                        style={{ height: "85px" }}
                      >
                        <div className="flexPrint width100 ">
                          <span className="stt">04</span>
                          <span className="sttTitle">
                            Hình thức vận chuyển:
                          </span>
                        </div>
                        <div
                          className="flexPrint width100"
                          style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "4px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div className="flexPrint width50">
                            <span className="checkboxPrint">
                              {" "}
                              {selectedOrder.transportation_method_id === 1 && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">Ga - Ga</span>
                          </div>
                          <div className="flexPrint width50">
                            <span className="checkboxPrint">
                              {" "}
                              {selectedOrder.transportation_method_id === 2 && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">Kho - Ga</span>
                          </div>
                          <div className="flexPrint width50  mt4">
                            <span className="checkboxPrint">
                              {" "}
                              {selectedOrder.transportation_method_id === 3 && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">Ga - Kho</span>
                          </div>
                          <div className="flexPrint width50 mt4">
                            <span className="checkboxPrint">
                              {" "}
                              {selectedOrder.transportation_method_id === 4 && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">Kho - Kho</span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ height: "110px" }}
                        className="width100 padding4  borderLeft borderBottom"
                      >
                        <div className="flexPrint width100 ">
                          <span className="stt">05</span>
                          <span className="sttTitle">
                            Hình thức thanh toán:
                          </span>
                        </div>
                        <div
                          className="flexPrint width100"
                          style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "4px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div className="flexPrint width100">
                            <span className="checkboxPrint">
                              {" "}
                              {selectedOrder.payment_method_id === 1 && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">Công nợ</span>
                          </div>
                          <div className="flexPrint width100  mt4">
                            <span className="checkboxPrint">
                              {" "}
                              {selectedOrder.payment_method_id === 2 && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">
                              Người gửi thanh toán
                            </span>
                          </div>
                          <div className="flexPrint width100  mt4">
                            <span className="checkboxPrint">
                              {" "}
                              {selectedOrder.payment_method_id === 3 && (
                                <div>
                                  <SvgCheckComplete fill="#000" scale="0.5" />
                                </div>
                              )}
                            </span>
                            <span className="checkboxValue">
                              Người nhận thanh toán
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flexPrint width66 borderLeft borderBottom padding4"
                      style={{ flexWrap: "wrap", height: "255px" }}
                    >
                      <div className="flexPrint width100 ">
                        <span className="stt">06</span>
                        <span className="sttTitle">Thông tin hàng hóa:</span>
                      </div>
                      <div
                        className="flexPrint width100"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="flexPrint">
                          <span className="checkboxValue">Loại hàng hóa:</span>
                        </div>
                        <div className="flexPrint">
                          <span className="radioPrint">
                            {selectedOrder.cargo_type_id === 1 && (
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  background: "#000",
                                }}
                              ></div>
                            )}
                          </span>
                          <span className="checkboxValue">
                            Hàng giá trị cao
                          </span>
                        </div>
                        <div className="flexPrint">
                          <span className="radioPrint">
                            {selectedOrder.cargo_type_id === 2 && (
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  background: "#000",
                                }}
                              ></div>
                            )}
                          </span>
                          <span className="checkboxValue">
                            Hàng giá trị thường
                          </span>
                        </div>
                      </div>

                      <div
                        className="flexPrint width100"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 141px)",
                          }}
                        />
                        <div style={{ width: "100%" }} className="threeDot">
                          Giá trị hàng hóa (VNĐ):&nbsp;
                        </div>

                        <span
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          {selectedOrder.cargo_value &&
                            "***," +
                              selectedOrder.cargo_value
                                .toString()
                                .slice(
                                  selectedOrder.cargo_value.toString().length -
                                    3,
                                  selectedOrder.cargo_value.toString().length
                                )}
                        </span>
                      </div>
                      <div
                        className="flexPrint width100"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 116px)",
                          }}
                        />
                        <div style={{ width: "100%" }} className="threeDot">
                          Tiền thu hộ (VNĐ):&nbsp;
                        </div>

                        <span
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          {selectedOrder.cod_amount &&
                            "***," +
                              selectedOrder.cod_amount
                                .toString()
                                .slice(
                                  selectedOrder.cod_amount.toString().length -
                                    3,
                                  selectedOrder.cod_amount.toString().length
                                )}
                        </span>
                      </div>
                      <div className="flexPrint width100 ">
                        <div
                          className="flexPrint width50"
                          style={{ position: "relative" }}
                        >
                          <div
                            style={{
                              border: ".5px dotted #000",
                              position: "absolute",
                              top: "18px",
                              right: "0px",
                              width: "calc(100% - 113px)",
                            }}
                          />
                          <div style={{ width: "100%" }} className="threeDot">
                            TL hàng hóa (Kg):&nbsp;
                          </div>

                          <span
                            style={{
                              textAlign: "right",
                              fontWeight: "bold",
                              marginRight: "4px",
                            }}
                          >
                            {selectedOrder.weight &&
                              numberWithDot(selectedOrder.weight)}
                          </span>
                        </div>
                        <div
                          className="flexPrint width50"
                          style={{ position: "relative" }}
                        >
                          <div
                            style={{
                              border: ".5px dotted #000",
                              position: "absolute",
                              top: "18px",
                              right: "0px",
                              width: "calc(100% - 88px)",
                            }}
                          />
                          <div style={{ width: "100%" }} className="threeDot">
                            Thể tích (m3):&nbsp;
                          </div>

                          <span
                            style={{
                              textAlign: "right",
                              fontWeight: "bold",
                            }}
                          >
                            {selectedOrder.volume && selectedOrder.volume}
                          </span>
                        </div>
                      </div>
                      <div
                        className="flexPrint width50"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 48px)",
                          }}
                        />
                        <div style={{ width: "100%" }} className="threeDot">
                          Số kiện:&nbsp;
                        </div>

                        <span
                          style={{
                            textAlign: "right",
                            fontWeight: "bold",
                            marginRight: "4px",
                          }}
                        >
                          {selectedOrder.package_qty &&
                            selectedOrder.package_qty}
                        </span>
                      </div>
                      <div
                        className="flexPrint width50"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 98px)",
                          }}
                        />
                        <div style={{ width: "100%" }} className="threeDot">
                          TL quy đổi (Kg):&nbsp;
                        </div>

                        <span
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          {selectedOrder.dimension_weight &&
                            numberWithDot(selectedOrder.dimension_weight)}
                        </span>
                      </div>
                      <div
                        className="flexPrint width100"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 110px)",
                          }}
                        />
                        <div style={{ width: "100%" }} className="threeDot">
                          TL tính cước (Kg):&nbsp;
                        </div>

                        <span
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          {selectedOrder.real_weight &&
                            numberWithDot(selectedOrder.real_weight)}
                        </span>
                      </div>

                      <div
                        className="flexPrint width100"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 113px)",
                          }}
                        />
                        <div style={{ width: "100%" }} className="threeDot">
                          Cước chính (VNĐ):&nbsp;
                        </div>

                        <span
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          {selectedOrder.main_fee_vat_ex &&
                            "***," +
                              selectedOrder.main_fee_vat_ex
                                .toString()
                                .slice(
                                  selectedOrder.main_fee_vat_ex.toString().length - 3,
                                  selectedOrder.main_fee_vat_ex.toString().length
                                )}
                        </span>
                      </div>
                      <div
                        className="flexPrint width100"
                        style={{ position: "relative" }}
                      >
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 100px)",
                          }}
                        />
                        <div style={{ width: "100%" }} className="threeDot">
                          Phí COD (VNĐ):&nbsp;
                        </div>

                        <span
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          {selectedOrder.cod_fee &&
                            "***," +
                              selectedOrder.cod_fee
                                .toString()
                                .slice(
                                  selectedOrder.cod_fee.toString().length - 3,
                                  selectedOrder.cod_fee.toString().length
                                )}
                        </span>
                      </div>

                      <div
                        className="flexPrint width100"
                        style={{ position: "relative" }}
                      >
                        <div style={{ width: "100%" }} className="threeDot">
                          Tổng cước (VNĐ):&nbsp;
                        </div>
                        <div
                          style={{
                            border: ".5px dotted #000",
                            position: "absolute",
                            top: "18px",
                            right: "0px",
                            width: "calc(100% - 110px)",
                          }}
                        />
                        <span
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          {selectedOrder.total_fee_vat_ex &&
                            "***," +
                              selectedOrder.total_fee_vat_ex
                                .toString()
                                .slice(
                                  selectedOrder.total_fee_vat_ex.toString().length - 3,
                                  selectedOrder.total_fee_vat_ex.toString().length
                                )}
                        </span>
                      </div>

                      <div
                        className="flexPrint width100 "
                        style={{
                          justifyContent: "flex-end",
                          fontSize: "12px",
                          fontStyle: "italic",
                        }}
                      >
                        (Chưa bao gồm VAT)
                      </div>
                    </div>
                  </div>
                  <div className="width100 borderLeft borderBottom padding4">
                    <div className="width100 flexPrint">
                      {" "}
                      <span className="stt">07</span>
                      <span className="sttTitle">Ghi chú:</span>
                    </div>
                    <div
                      className="width100 mt4"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          border: ".5px dotted #000",
                          position: "absolute",
                          top: "18px",
                          right: "0px",
                          width: "100%",
                        }}
                      />
                      <div
                        style={{
                          border: ".5px dotted #000",
                          position: "absolute",
                          top: "40px",
                          right: "0px",
                          width: "100%",
                        }}
                      />
                      <p className="threeDot2Lines">{selectedOrder.note}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="flexPrint width25 borderLeft borderRight borderBottom"
                  style={{ flexWrap: "wrap" }}
                >
                  <div
                    className="width100  borderBottom padding4"
                    style={{ height: "50%", position: "relative" }}
                  >
                    <div className="width100" style={{ textAlign: "center" }}>
                      ........ giờ ........ ; ......../......../20.......
                    </div>
                    <div
                      className="width100"
                      style={{ textAlign: "center", fontWeight: "700" }}
                    >
                      Người gửi
                    </div>
                    <div
                      className="width100"
                      style={{
                        textAlign: "center",
                        fontSize: "10px",
                        marginTop: "-4px",
                      }}
                    >
                      (Đồng ý với điều khoản sử dụng dịch vụ)
                    </div>
                    <div
                      className="borderBottom"
                      style={{
                        width: "70%",
                        marginLeft: "15%",
                        position: "absolute",
                        bottom: "36px",
                      }}
                    ></div>
                    <div
                      className="flexPrint width100"
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        fontSize: "12px",
                      }}
                    >
                      NV nhận (MSNV):&nbsp;
                      <span
                        style={{
                          border: "1px solid #000",
                          width: "80px",
                          fontSize: "14px",
                          borderRadius: "3px",
                          height: "20px",
                        }}
                      ></span>{" "}
                    </div>
                  </div>
                  <div
                    className="width100   padding4"
                    style={{ height: "50%", position: "relative" }}
                  >
                    <div className="width100" style={{ textAlign: "center" }}>
                      ........ giờ ........ ; ......../......../20.......
                    </div>
                    <div
                      className="width100"
                      style={{ textAlign: "center", fontWeight: "700" }}
                    >
                      Người nhận
                    </div>
                    <div
                      className="width100"
                      style={{
                        textAlign: "center",
                        fontSize: "10px",
                        marginTop: "-4px",
                      }}
                    >
                      (Đã kiểm kĩ hàng hóa và không khiếu nại)
                    </div>
                    <div
                      className="borderBottom"
                      style={{
                        width: "70%",
                        marginLeft: "15%",
                        position: "absolute",
                        bottom: "36px",
                      }}
                    ></div>
                    <div
                      className="flexPrint width100"
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        fontSize: "12px",
                      }}
                    >
                      NV giao (MSNV):&nbsp;
                      <span
                        style={{
                          border: "1px solid #000",
                          width: "80px",
                          fontSize: "14px",
                          borderRadius: "3px",
                          height: "20px",
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PrintBillA5;
