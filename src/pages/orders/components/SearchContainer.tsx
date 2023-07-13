/* eslint-disable */
import { CloseCircleOutlined } from "@ant-design/icons";
import { DatePicker, Form } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import SvgIconFilter from "src/assets/svg/SvgIconFilter";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import styled from "styled-components";
import arrow from "../../../assets/images/arrow.svg";
import { services, shippingMethod } from "./data";

const styles = {
  width: "calc(((100% - 40px) /8) - 2%)",
  fontWeightLabel: "500",
  fontSizeLabel: "14px",
};

const SearchContainer = ({ getFilterCallback, getFilterAdCallback }: any) => {
  const [filterOrdersForm] = Form.useForm();
  const [filterOrdersAdForm] = Form.useForm();
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [cargoTypes, setCargoTypes] = useState<any>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedFromProvince, setSelectedFromProvince] =
    useState<any>(undefined);
  const [selectedToProvince, setSelectedToProvince] = useState<any>(undefined);
  const [fromDistricts, setFromDistricts] = useState<any[]>([]);
  const [toDistricts, setToDistricts] = useState<any[]>([]);

  useEffect(() => {
    const getPaymentMethods = async () => {
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
          `${API_URL}/${ROOT_VERSION}/payment-methods`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeDistricts = [];
          for (var i = 0; i < data?.data?.paymentMethods.length; i++) {
            fakeDistricts.push({
              label: data?.data?.paymentMethods[i].payment_name,
              value: data?.data?.paymentMethods[i].id,
            });
          }
          setPaymentMethods(fakeDistricts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentMethods();
    return () => {
      setPaymentMethods([]);
    };
  }, []);

  useEffect(() => {
    const getProvinces = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeDistricts = [];
          for (var i = 0; i < data?.data?.provinces.length; i++) {
            fakeDistricts.push({
              label: data?.data?.provinces[i].province_name,
              value: data?.data?.provinces[i].id,
            });
          }
          setProvinces(fakeDistricts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProvinces();
    return () => {
      setProvinces([]);
    };
  }, []);
  useEffect(() => {
    const getCargoTypes = async () => {
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
          `${API_URL}/${ROOT_VERSION}/cargo-types`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeWards = [];
          for (var i = 0; i < data?.data?.cargoTypes.length; i++) {
            fakeWards.push({
              label: data?.data?.cargoTypes[i].description,
              value: data?.data?.cargoTypes[i].id,
            });
          }
          setCargoTypes(fakeWards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCargoTypes();
    return () => {
      setCargoTypes([]);
    };
  }, []);
  useEffect(() => {
    const getFromDistricts = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/districts?province_id=${selectedFromProvince}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeDistricts = [];
          for (var i = 0; i < data?.data?.districts.length; i++) {
            fakeDistricts.push({
              label: data?.data?.districts[i].district_name,
              value: data?.data?.districts[i].id,
            });
          }
          setFromDistricts(fakeDistricts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedFromProvince > 0) {
      getFromDistricts();
    }
    return () => {
      setFromDistricts([]);
    };
  }, [selectedFromProvince]);

  useEffect(() => {
    const getToDistricts = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/districts?province_id=${selectedToProvince}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeWards = [];
          for (var i = 0; i < data?.data?.districts.length; i++) {
            fakeWards.push({
              label: data?.data?.districts[i].district_name,
              value: data?.data?.districts[i].id,
            });
          }
          setToDistricts(fakeWards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedToProvince > 0) {
      getToDistricts();
    }
    return () => {
      setToDistricts([]);
    };
  }, [selectedToProvince]);

  const handleFinishSearch = (values: any) => {
    getFilterCallback(values);
  };

  const handleResetSearch = async () => {
    filterOrdersForm.resetFields();
    getFilterCallback({
      filterOrdersDate: undefined,
      filterOrdersService: undefined,
      filterOrdersShipping: undefined,
      filterOrdersCommoType: undefined,
      search: undefined,
    });
  };

  const handleResetSearchAd = () => {
    filterOrdersAdForm.resetFields();
    getFilterAdCallback({});
  };

  const handleFinishSearchAd = (values: any) => {
    getFilterAdCallback(values);
  };

  const handleChangeFromProvince = (e: any) => {
    setSelectedFromProvince(e);
    filterOrdersAdForm.setFieldsValue({
      fromDistrict: undefined,
    });
  };

  const handleChangeToProvince = (e: any) => {
    setSelectedToProvince(e);
    filterOrdersAdForm.setFieldsValue({
      toDistrict: undefined,
    });
  };
  return (
    <SearchContainerComponents>
      <Form
        form={filterOrdersForm}
        id="filterOrdersForm"
        onFinish={handleFinishSearch}
      >
        <div className="filterOrdersFormRow">
          {/* <FormInputAntd
              {...defaultStyles}
              name="search"
              placeholder="Mã đối tác"
              suffixIcon={<SvgIconSearch />}
              suffixLeft="12px"
              padding="0px 12px 0px 36px"
              width="calc(55% - 24px)"
              onChange={(e: any) => handleChangeSearchInput(e)}
            /> */}
          <FormInputAntd
            {...defaultStyles}
            {...styles}
            name="search"
            label="Tìm kiếm"
            placeholder="Nhập mã đơn"
            suffixIcon={<SvgIconSearch />}
            suffixLeft="12px"
            padding="0px 12px 0px 36px"
            margin="22px 5px 0px 0px"
            labelFontSize="14px"
            labelFontWeight="500"
            width="calc(((100% - 16px) / 5)*1.5)"
            // onChange={(e: any) => handleChangeSearchInput(e)}
          />
          <div className="dateRangePicker">
            <div className="labelDateRangePicker">Thời gian tạo đơn</div>
            <Form.Item name="filterOrdersDate">
              <DatePicker.RangePicker />
            </Form.Item>
          </div>
          <FormSelectAntd
            {...defaultStyles}
            {...styles}
            options={services}
            name="filterOrdersService"
            placeholder="Chọn dịch vụ"
            padding="0"
            margin="0px 0 0 5px"
            label="Dịch vụ"
            suffixIcon={<img src={arrow} alt="" />}
          />
          <FormSelectAntd
            {...defaultStyles}
            {...styles}
            options={shippingMethod}
            name="filterOrdersShipping"
            placeholder="Chọn hình thức vận chuyển"
            width="calc(((80% - 16px) /5))"
            padding="0"
            margin="0px 0 0 5px"
            label="Hình thức vận chuyển"
            suffixIcon={<img src={arrow} alt="" />}
          />

          <FormSelectAntd
            {...defaultStyles}
            {...styles}
            options={cargoTypes}
            name="filterOrdersCommoType"
            placeholder="Chọn loại hàng hoá"
            padding="0"
            margin="0px 5px 0 5px"
            label="Loại hàng hoá"
            width="calc(((60% - 16px) /5))"
            suffixIcon={<img src={arrow} alt="" />}
          />
          <div className="btnGroup">
            <button
              className="buttonSubmit"
              type="submit"
              form="filterOrdersForm"
            >
              <SvgIconSearch />
              Tìm kiếm
            </button>
            <div className="buttonRefresh" onClick={() => handleResetSearch()}>
              <SvgIconRefresh />
              Làm mới
            </div>
            <div className="buttonOpen" onClick={() => setVisibleFilter(true)}>
              <SvgIconFilter />
              Lọc nâng cao
            </div>
          </div>
        </div>
      </Form>
      <div className={`filterContainer ${visibleFilter ? "activeFilter" : ""}`}>
        <div className="filterHeader">
          <h4>
            <SvgIconFilter />
            &nbsp;&nbsp; Lọc nâng cao
          </h4>
          <div
            onClick={() => setVisibleFilter(false)}
            style={{ cursor: "pointer" }}
          >
            <CloseCircleOutlined />
          </div>
        </div>
        <Form
          form={filterOrdersAdForm}
          id="filterOrdersAdForm"
          onFinish={handleFinishSearchAd}
        >
          <FormSelectAntd
            {...defaultStyles}
            name="paymentMethod"
            label="Hình thức thanh toán"
            options={paymentMethods}
            fontSizeLabel="14px"
            fontWeightLabel="500"
            width="100%"
            margin="8px 0 0 0"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            <FormSelectAntd
              {...defaultStyles}
              name="fromProvince"
              label="Khu vực gửi hàng"
              options={provinces}
              fontSizeLabel="14px"
              fontWeightLabel="500"
              width="calc(50% - 4px)"
              showSearch
              placeholder="Tỉnh thành"
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
              onChange={(e: any) => handleChangeFromProvince(e)}
            />
            <FormSelectAntd
              {...defaultStyles}
              name="fromDistrict"
              label="&nbsp;"
              options={fromDistricts}
              fontSizeLabel="14px"
              fontWeightLabel="500"
              width="calc(50% - 4px)"
              showSearch
              placeholder="Quận/ huyện"
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            <FormSelectAntd
              {...defaultStyles}
              name="toProvince"
              label="Khu vực nhận hàng"
              options={provinces}
              fontSizeLabel="14px"
              fontWeightLabel="500"
              width="calc(50% - 4px)"
              placeholder="Tỉnh thành"
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
              onChange={(e: any) => handleChangeToProvince(e)}
            />
            <FormSelectAntd
              {...defaultStyles}
              name="toDistrict"
              label="&nbsp;"
              options={toDistricts}
              fontSizeLabel="14px"
              fontWeightLabel="500"
              width="calc(50% - 4px)"
              showSearch
              placeholder="Quận/ huyện"
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              className="buttonSubmit"
              type="submit"
              form="filterOrdersAdForm"
              style={{ width: "calc(50% - 4px)" }}
            >
              <SvgIconSearch />
              Tìm kiếm
            </button>
            <div
              className="buttonRefresh"
              style={{ width: "calc(50% - 4px)" }}
              onClick={() => handleResetSearchAd()}
            >
              <SvgIconRefresh />
              Làm mới
            </div>
          </div>
        </Form>
      </div>
      <OverlaySpinner
        open={visibleFilter}
        onClickCallback={() => setVisibleFilter(false)}
      />
    </SearchContainerComponents>
  );
};

export default SearchContainer;

const SearchContainerComponents = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 5px;
  .filterOrdersFormRow {
    display: flex;
    justify-content: space-between;
  }
  .dateRangePicker {
    width: calc((((100% - 40px) / 6) * 2) - 4%);
    .ant-row.ant-form-item {
      margin: 0;
      width: 100%;
      height: 41px;
    }
    .labelDateRangePicker {
      font-weight: 500;
      font-size: 14px;
    }
    .ant-picker.ant-picker-range {
      width: 100%;
      height: 41px;
      border-radius: 5px;
    }
  }
  .btnGroup {
    width: calc(((100% - 40px) / 6) + 10%);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .buttonSubmit,
  .buttonRefresh,
  .buttonOpen {
    border: 1px solid #001529;
    width: calc((100% - 16px) / 3);
    height: 39px;
    margin-top: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    svg {
      margin-right: 8px;
      path {
        fill: #000;
      }
    }
  }
  .filterContainer {
    padding: 16px;
    background: #fff;
    position: fixed;
    right: -400px;
    top: 0;
    width: 400px;
    height: 100vh;
    z-index: 102;
    transition: all 0.2s;
    .filterHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h4 {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        svg path {
          fill: #000;
        }
      }
    }
  }
  .activeFilter {
    right: 0;
    transition: all 0.2s;
  }
`;
