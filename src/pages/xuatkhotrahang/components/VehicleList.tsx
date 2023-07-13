/* eslint-disable */
import { DatePicker, Form, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SvgCheckComplete from "src/assets/svg/SvgCheckComplete";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import DropdownSelectLabel from "src/components/inputComponentsStyled/DropdownSelectLabel";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import { convertweightWithCommas } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import styled from "styled-components";

const VehicleList = ({
  handleSubmitCallback,
  params,
  total,
  chooseVehicleCallback,
  chooseStartdateCallback,
  callbackVehicleType2,
  callbackSubName,
  form,
  type,
  typeCallback,
}: any) => {
  const isMount = useIsMount();
  const [vehicleList, setVehicleList] = useState<any>({});

  const [paramsFilter, setParamsFilter] = useState({
    search: "",
    status: "A",
    page: 1,
    limit: 5,
  });

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getVehicleList = async () => {
      setIsLoading(true);
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
          `${API_URL}/${ROOT_VERSION}/vehicles?vehicle_type=2&page=${paramsFilter.page}&limit=${paramsFilter.limit}&search=${paramsFilter.search}&status=A`,

          {
            headers: headers,
          }
        );
        if (data) {
          setVehicleList(data?.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    const timer = setTimeout(() => {
      getVehicleList();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [paramsFilter]);

  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilter({
      ...paramsFilter,

      page: page,
      limit: pageSize,
    });
  };

  const handleChooseVehicle = (id: any) => {
    chooseVehicleCallback(id);
  };

  const handleSubmitForm = (values: any) => {
    callbackVehicleType2(values);
  };
  return (
    <VehicleListComponent>
      <div className="row col-12">
        <DropdownSelectLabel
          {...defaultStyles}
          label="Chọn loại xe"
          width="calc(50% - 4px)"
          options={[
            { label: "Xe công ty", value: 1 },
            { label: "Xe ngoài", value: 2 },
          ]}
          margin="0 0 24px 0"
          onChangeSelect={(e: any) => typeCallback(e)}
          value={type}
        />
        <div className="datepickerVehicle">
          <span>Ngày xuất kho</span>
          <DatePicker
            showTime={{
              format: "HH:mm",
            }}
            minuteStep={15}
            className="datepickerVehicle-select"
            onChange={(e: any) => chooseStartdateCallback(e)}
            defaultValue={moment(new Date(), "YYYY-MM-dd HH:mm:ss")}
            value={params.startDate}
          />
        </div>
      </div>
      {type === 1 ? (
        <>
          <div className="row col-12">
            <InputNewStyled
              {...defaultStyles}
              suffixIcon={<SvgIconSearch />}
              label="Tìm kiếm"
              suffixRight="12px"
              width="calc(60% - 4px)"
              placeholder="Nhập mã xe, tên xe, tên tài xế, biển số xe"
              onChange={(e: any) => {
                setParamsFilter({ ...paramsFilter, search: e });
              }}
              value={paramsFilter.search}
            />
            <InputNewStyled
              {...defaultStyles}
              label="Tên phụ xe"
              width="calc(40% - 4px)"
              placeholder="Nhập tên phụ xe"
              onChange={(e: any) => {
                callbackSubName(e);
              }}
              value={params.subName}
            />
          </div>
          {/* <div className="tableVehicle">
        <TableStyledAntd
          rowKey={"id"}
          columns={columnsDoiXe({})}
          dataSource={vehicleList.vehicles}
          loading={false}
          pagination={false}
          bordered
          widthCol1="20%"
          widthCol2="30%"
          widthCol3="50%"
          paddingItemBody="8px 16px"
        />
      </div> */}

          <div className="tableVehicle">
            <div className="row col-12">
              {/* <div style={{ width: "30%", fontWeight: "600", padding: "8px" }}>
            Mã xe
          </div> */}
              <div style={{ width: "45%", fontWeight: "600", padding: "8px" }}>
                Thông tin xe
              </div>

              <div style={{ width: "45%", fontWeight: "600", padding: "8px" }}>
                Tên tài xế
              </div>
            </div>
            {!isLoading ? (
              vehicleList.vehicles?.length > 0 ? (
                vehicleList.vehicles.map((item: any, index: any) => (
                  <div
                    className={`row col-12 mainRowVehicle ${
                      params.selectedVehicle === item.id &&
                      "selectedMainRowVehicle"
                    }`}
                    key={index}
                    onClick={() => handleChooseVehicle(item.id)}
                  >
                    {/* <div style={{ width: "30%" }} className="rowTableVehicle">
                {item.id}
              </div> */}
                    <div style={{ width: "45%" }} className="rowTableVehicle">
                      <div>
                        <span style={{ color: "rgb(128,138,148)" }}>
                          Tên xe:
                        </span>{" "}
                        {item.vehicle_name}
                      </div>
                      <div>
                        <span style={{ color: "rgb(128,138,148)" }}>
                          Biển số xe:
                        </span>{" "}
                        {item.vehicle_number}
                      </div>
                    </div>

                    <div style={{ width: "45%" }} className="rowTableVehicle">
                      {" "}
                      <div>
                        <span style={{ color: "rgb(128,138,148)" }}>
                          Họ tên:
                        </span>{" "}
                        {item.user_name}
                      </div>
                      <div>
                        <span style={{ color: "rgb(128,138,148)" }}>
                          Mã nhân viên:
                        </span>{" "}
                        {item.user_id}
                      </div>{" "}
                      <div>
                        <span style={{ color: "rgb(128,138,148)" }}>SĐT:</span>{" "}
                        <span>{item.user_phone}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )
            ) : (
              <div
                style={{
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin />
              </div>
            )}
          </div>

          <PanigationAntStyled
            style={{ marginTop: "8px" }}
            current={paramsFilter.page}
            pageSize={paramsFilter.limit}
            showSizeChanger
            onChange={onChangePaging}
            showTotal={() => `Tổng ${vehicleList?.paging?.totalPage} xe `}
            total={vehicleList?.paging?.totalPage}
          />
          <div className="row col-12" style={{ marginTop: "8px" }}>
            <div className="totalInformationVehicle">
              <div>
                Tổng đơn:
                <span style={{ fontWeight: "600" }}> {total.total}</span>{" "}
              </div>
              <div style={{ marginLeft: "16px" }}>
                Tổng khối lượng (Kg):{" "}
                <span style={{ fontWeight: "600" }}>
                  {convertweightWithCommas(total.weight?.toString())}
                </span>
              </div>
            </div>
            <div
              className="buttonSubmit"
              onClick={() => handleSubmitCallback()}
            >
              <SvgCheckComplete />
              &nbsp;&nbsp; Hoàn tất
            </div>
          </div>
        </>
      ) : (
        <div>
          <Form
            form={form}
            id="formDriver"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
            onFinish={handleSubmitForm}
            initialValues={{
              supply: "",
              biensoxe: "",
              name: "",
              phone: "",
              nameSub: "",
            }}
          >
            <FormInputAntd
              {...defaultStyles}
              name="supply"
              label="Nhà cung cấp"
              width="calc(50% - 4px)"
              margin="16px  0"
              placeholder="Nhập tên nhà cung cấp"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            />
            <FormInputAntd
              {...defaultStyles}
              name="biensoxe"
              label="Biển số xe"
              width="calc(50% - 4px)"
              margin="16px  0"
              placeholder="Nhập biển số xe"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            />

            <FormInputAntd
              {...defaultStyles}
              name="name"
              label="Tên tài xế"
              width="calc(50% - 4px)"
              margin="16px  0"
              placeholder="Nhập tên tài xế"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            />
            <FormInputAntd
              {...defaultStyles}
              name="phone"
              label="Số điện thoại"
              width="calc(50% - 4px)"
              margin="16px  0"
              placeholder="Nhập số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            />
            <FormInputAntd
              {...defaultStyles}
              name="nameSub"
              label="Tên phụ xe"
              width="calc(50% - 4px)"
              margin="16px  0"
              placeholder="Nhập tên phụ xe  "
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            />
            <div className="row col-12" style={{ marginTop: "8px" }}>
              <div className="totalInformationVehicle">
                <div>
                  Tổng đơn:
                  <span style={{ fontWeight: "600" }}> {total.total}</span>{" "}
                </div>
                <div style={{ marginLeft: "16px" }}>
                  Tổng khối lượng (Kg):{" "}
                  <span style={{ fontWeight: "600" }}>
                  {convertweightWithCommas(total.weight?.toString())}
                  </span>
                </div>
              </div>
              <button className="buttonSubmit" type="submit">
                <SvgCheckComplete />
                &nbsp;&nbsp; Hoàn tất
              </button>
            </div>
          </Form>
        </div>
      )}
    </VehicleListComponent>
  );
};

export default VehicleList;

const VehicleListComponent = styled.div`
  .datepickerVehicle {
    width: calc(50% - 4px);
    margin-top: -22px;
    span {
      font-size: 12px;
    }
    .datepickerVehicle-select {
      width: 100%;
      height: 41px;
      border-radius: 5px;
    }
  }
  .tableVehicle {
    margin: 8px 0;
    border-radius: 5px;
    max-height: 470px;
    overflow-y: scroll;
    border: 1px solid #bfc4c9;
    position: relative;
  }
  .totalInformationVehicle {
    display: flex;
    align-items: center;
  }
  .mainRowVehicle {
    cursor: pointer;
    border-top: 1px solid #bfc4c9;
    :hover {
      background: #bfc4c9;
    }
  }
  .selectedMainRowVehicle {
    background: #2d9cdb !important;
    color: white;
    span {
      color: white !important;
    }
  }
  .rowTableVehicle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
  }
  .buttonSubmit {
    display: flex;
    border-radius: 5px;
    background: #2d9cdb;
    height: 41px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    svg {
      transform: scale(0.8);
      path {
        fill: #fff;
      }
    }
  }
`;
