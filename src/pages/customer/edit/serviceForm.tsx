/* eslint-disable */
import { Row, Col, Checkbox, Form } from "antd";
import { useEffect, useState } from "react";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import arrow from "../../../assets/images/arrow.svg";
import axios from "axios";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { localGetToken } from "src/utils/localStorage";
import { useDispatch } from "react-redux";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";

const serviceForm = (props: any) => {
  const {
    provinces,
    toProvinces,
    zones,
    fromTrains,
    toTrains,
    transtationMethods,
    form,
    cargoTypes,
    paymentMethods,
    dataService36,
    dataService48,
    dataCargo,
    dataPayMethod,
    getZone,
  } = props;

  const dispatch = useDispatch();
  const [dataService48h, setDataService48h] = useState<any>(dataService48);
  const [dataService36h, setDataService36h] = useState<any>(dataService36);
  const [propCargo, setPropCargo] = useState<any>(dataCargo);
  const [propayMethod, setPropPayMethod] = useState<any>(dataPayMethod);
  const [indeterminateService48, setIndeterminateService48] = useState(false);
  const [checkAllService36, setCheckAllService36] = useState(false);
  const [indeterminateService36, setIndeterminateService36] = useState(false);
  const [indeterminateTypeService, setIndeterminateTypeService] =
    useState(false);
  const [indeterminateTypePay, setIndeterminateTypePay] = useState(false);
  const [dataAddRoute, setDataAddRoute] = useState({
    form_zone: undefined,
    form_zone_name: undefined,
    from_province: undefined,
    from_province_name: undefined,
    from_district: undefined,
    from_district_name: undefined,
    to_zone: undefined,
    to_zone_name: undefined,
    to_province: undefined,
    to_province_name: undefined,
    to_district: undefined,
    to_district_name: undefined,
  });
  const [from_Trains, setFromTrains] = useState<any>(fromTrains);
  const [to_Trains, setToTrains] = useState<any>(toTrains);
  const [to_Provinces, setToProvinces] = useState<any>(toProvinces);
  const [_zones, setZones] = useState<any>(zones);
  const [_provinces, setProvinces] = useState<any>(provinces);
  useEffect(() => {
    setDataService48h(dataService48);
    setDataService36h(dataService36);
    setPropCargo(dataCargo);
    setPropPayMethod(dataPayMethod);
    setFromTrains(fromTrains);
    setToTrains(toTrains);
    setToProvinces(toProvinces);
    setZones(zones), setProvinces(provinces);
    setIndeterminateService36(
      form.getFieldValue("services") === false && dataService36.length > 0
        ? true
        : false
    );
    setIndeterminateService48(
      form.getFieldValue("services48") === false && dataService48.length > 0
        ? true
        : false
    );
    setIndeterminateTypeService(
      form.getFieldValue("typeService") === false && dataCargo.length > 0
        ? true
        : false
    );
    setIndeterminateTypePay(
      form.getFieldValue("paymentMethod") === false && dataPayMethod.length > 0
        ? true
        : false
    );
  }, []);
  useEffect(() => {
    const getZone = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(`${API_URL}/${ROOT_VERSION}/zones`, {
          headers: headers,
        });
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.zones.length; i++) {
            fakeZones.push({
              label: data?.data?.zones[i].zone,
              value: data?.data?.zones[i].id,
            });
          }
          setZones(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getZone();
    return () => {
      setZones([]);
    };
  }, []);
  useEffect(() => {
    const getSenderProvinces = async (idzone: any, state: any) => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces?zone_id=${idzone}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeProvinces = [];
          for (var i = 0; i < data?.data?.provinces.length; i++) {
            fakeProvinces.push({
              label: data?.data?.provinces[i].province_name,
              value: data?.data?.provinces[i].id,
            });
          }
          state(fakeProvinces);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (dataAddRoute.form_zone) {
      getSenderProvinces(dataAddRoute.form_zone, setProvinces);
    }
    if (dataAddRoute.to_zone) {
      getSenderProvinces(dataAddRoute.to_zone, setToProvinces);
    }
    return () => {
      setProvinces([]);
      setToProvinces([]);
    };
  }, [dataAddRoute.form_zone, dataAddRoute.to_zone]);
  useEffect(() => {
    const getSenderTrain = async (idProvince: any, state: any) => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/train-stations?province=${idProvince}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeTrain = [];
          for (var i = 0; i < data?.data?.trainStations.length; i++) {
            fakeTrain.push({
              label: data?.data?.trainStations[i].station,
              value: data?.data?.trainStations[i].id,
            });
          }
          state(fakeTrain);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (dataAddRoute.from_province) {
      getSenderTrain(dataAddRoute.from_province, setFromTrains);
    }
    if (dataAddRoute.to_province) {
      getSenderTrain(dataAddRoute.to_province, setToTrains);
    }
    return () => {
      setFromTrains([]);
      setToTrains([]);
    };
  }, [dataAddRoute.from_province, dataAddRoute.to_province]);
  const onCheckAllChange = (e: any, key: any) => {
    switch (key) {
      case "O": {
        const _checkedList = e.target.checked
          ? cargoTypes.map((e: any) => e.value)
          : [];
        setPropCargo(_checkedList);
        form.setFieldsValue({
          typeServiceItem:_checkedList,
        });
        setIndeterminateTypeService(false);
        break;
      }
      case "C": {
        const _checkedList = e.target.checked
          ? paymentMethods.map((e: any) => e.value)
          : [];
        setPropPayMethod(_checkedList);
        form.setFieldsValue({
          paymentMethodItem:_checkedList,
        });
        setIndeterminateTypePay(false);
        break;
      }
      case "48": {
        const _checkedList48 = e.target.checked
          ? transtationMethods.map((e: any) => e.value)
          : [];
        setDataService48h(_checkedList48);
        form.setFieldsValue({
          servicesItem48:_checkedList48,
        });
        setIndeterminateService48(false);
        break;
      }
      default: {
        const _checkedList36 = e.target.checked
          ? transtationMethods.map((e: any) => e.value)
          : [];
        setDataService36h(_checkedList36);
        form.setFieldsValue({
          servicesItem:_checkedList36,
        });
        setIndeterminateService36(false);
        setCheckAllService36(e.target.checked);
        break;
      }
    }
  };
  const onChange = (list: any, key: any) => {
    console.log(list);
    switch (key) {
      case "O": {
        setPropCargo(list);
        setIndeterminateTypeService(
          !!list.length && list.length < cargoTypes.length
        );
        form.setFieldsValue({
          typeService: list.length === cargoTypes.length,
        });
        break;
      }
      case "C": {
        setPropPayMethod(list);
        setIndeterminateTypePay(
          !!list.length && list.length < paymentMethods.length
        );
        form.setFieldsValue({
          paymentMethod: list.length === paymentMethods.length,
        });
        break;
      }
      case "48": {
        setDataService48h(list);
        setIndeterminateService48(
          !!list.length && list.length < transtationMethods.length
        );
        form.setFieldsValue({
          services48: list.length === transtationMethods.length,
        });
        break;
      }
      default: {
        setDataService36h(list);
        setIndeterminateService36(
          !!list.length && list.length < transtationMethods.length
        );
        form.setFieldsValue({
          services: list.length === transtationMethods.length,
        });

        break;
      }
    }
  };
  const changeZone = (e: any, value: any) => {
    setDataAddRoute({
      ...dataAddRoute,
      form_zone: e,
      form_zone_name:value.label,
    });
    setProvinces([]);
    setFromTrains([]);
    form.setFieldsValue({
      senderProvince: undefined,
      senderDistrict: undefined,
    });
  };
  const changeToZone = (e: any, value: any) => {
    setDataAddRoute({
      ...dataAddRoute,
      to_zone: e,
      to_zone_name:value.label,
    });
    setToProvinces([]);
    setToTrains([]);
    form.setFieldsValue({
      reciverProvince: undefined,
      reciverDistrict: undefined,
    });
  };
  getZone(dataAddRoute)
  return (
    <div className="w-full bg-white">
      <p className="text-16 font-medium mt-3">Dịch vụ đăng kí</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Row className="w-full mt-3" gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="services"
              valuePropName="checked"
              style={{ height: "0px" }}
            >
              <Checkbox
                indeterminate={indeterminateService36}
                onChange={(e) => onCheckAllChange(e, "36")}
                checked={checkAllService36}
              >
                36 Giờ
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={24} className="ml-4">
            <Form.Item
              name="servicesItem"
              valuePropName="checked"
              style={{ height: "0px" }}
            >
              <Checkbox.Group
                // className="tms-checkbox-group"
                options={transtationMethods.filter((item:any)=>{return item.label=='GA-GA'})}
                value={dataService36h}
                onChange={(e) => onChange(e, "P")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full mt-3" gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="services48"
              valuePropName="checked"
              style={{ height: "0px" }}
            >
              <Checkbox
                indeterminate={indeterminateService48}
                onChange={(e) => onCheckAllChange(e, "48")}
                // checked={checkAllService48}
                className="font-medium"
              >
                48 Giờ
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={24} className="ml-4">
            <Form.Item
              name="servicesItem48"
              valuePropName="checked"
              style={{ height: "0px" }}
            >
              <Checkbox.Group
                className="tms-checkbox-group"
                options={transtationMethods}
                value={dataService48h}
                onChange={(e) => onChange(e, "48")}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Row className="w-full mt-3" gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            name="typeService"
            valuePropName="checked"
            style={{ height: "0px" }}
          >
            <Checkbox
              indeterminate={indeterminateTypeService}
              onChange={(e) => onCheckAllChange(e, "O")}
              // checked={checkAllTypeService}
              className="font-medium"
            >
              Loại hàng hóa
            </Checkbox>
          </Form.Item>
        </Col>
        <Col span={24} className="ml-4">
          <Form.Item
            name="typeServiceItem"
            valuePropName="checked"
            style={{ height: "0px" }}
          >
            <Checkbox.Group
              className="tms-checkbox-group"
              options={cargoTypes}
              value={propCargo}
              onChange={(e) => onChange(e, "O")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row className="w-full mt-3" gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            name="paymentMethod"
            valuePropName="checked"
            style={{ height: "0px" }}
          >
            <Checkbox
              indeterminate={indeterminateTypePay}
              onChange={(e) => onCheckAllChange(e, "C")}
              // checked={checkAllTypePay}
              className="font-medium"
            >
              Hình thức thanh toán
            </Checkbox>
          </Form.Item>
        </Col>
        <Col span={24} className="ml-4">
          <Form.Item
            name="paymentMethodItem"
            valuePropName="checked"
            style={{ height: "0px" }}
          >
            <Checkbox.Group
              className="tms-checkbox-group"
              options={paymentMethods}
              value={propayMethod}
              onChange={(e) => onChange(e, "C")}
            />
          </Form.Item>
        </Col>
      </Row>
      <div>
        <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
          Ga gửi hàng
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item style={{ width: "calc((100% - 16px)/3)" }}>
            <FormSelectAntd
              label="Khu vực:"
              {...defaultStyles}
              placeholder="Chọn khu vực gửi"
              suffixIcon={<img src={arrow} alt="" />}
              name="senderZone"
              onChange={(e: any, value: any) => changeZone(e, value)}
              options={zones}
              width="100%"
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </Form.Item>
          <Form.Item style={{ width: "calc((100% - 16px)/3)" }}>
            <FormSelectAntd
              label="Tỉnh thành:"
              {...defaultStyles}
              name="senderProvince"
              placeholder="Chọn quận huyện"
              suffixIcon={<img src={arrow} alt="" />}
              onChange={(e: any, value: any) =>
                setDataAddRoute({
                  ...dataAddRoute,
                  from_province: e,
                  from_province_name:value.label,
                })
              }
              options={_provinces}
              width="100%"
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </Form.Item>
          <Form.Item style={{ width: "calc((100% - 16px)/3)" }}>
            <FormSelectAntd
              label="Ga đi:"
              {...defaultStyles}
              name="senderDistrict"
              placeholder="Chọn ga đi"
              suffixIcon={<img src={arrow} alt="" />}
              options={from_Trains}
              width="100%"
              showSearch
              onChange={(e: any, value: any) =>
                setDataAddRoute({
                  ...dataAddRoute,
                  from_district: e,
                  from_district_name:value.label,
                })
              }
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </Form.Item>
        </div>
        <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
          Ga nhận hàng
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item style={{ width: "calc((100% - 16px)/3)" }}>
            <FormSelectAntd
              label="Khu vực:"
              {...defaultStyles}
              name="reciverZone"
              placeholder="Khu vực nhận"
              suffixIcon={<img src={arrow} alt="" />}
              onChange={(e: any, value: any) => {
                changeToZone(e, value);
              }}
              options={zones}
              // value={dataAddRoute.to_zone}
              width="100%"
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </Form.Item>
          <Form.Item style={{ width: "calc((100% - 16px)/3)" }}>
            <FormSelectAntd
              label="Tỉnh thành:"
              name="reciverProvince"
              {...defaultStyles}
              placeholder="Chọn quận huyện"
              suffixIcon={<img src={arrow} alt="" />}
              onChange={(e: any, value: any) =>
                setDataAddRoute({
                  ...dataAddRoute,
                  to_province: e,
                  to_province_name:value.label,
                })
              }
              options={to_Provinces}
              width="100%"
              showSearch
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </Form.Item>
          <Form.Item style={{ width: "calc((100% - 16px)/3)" }}>
            <FormSelectAntd
              label="Ga nhận:"
              name="reciverDistrict"
              {...defaultStyles}
              placeholder="Chọn ga nhận"
              suffixIcon={<img src={arrow} alt="" />}
              options={to_Trains}
              width="100%"
              showSearch
              onChange={(e: any, value: any) =>
                setDataAddRoute({
                  ...dataAddRoute,
                  to_district: e,
                  to_district_name:value.label,
                })
              }
              optionFilterProp="label"
              filterOption={(input: any, option: any) =>
                option.label.includes(input)
              }
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};
export default serviceForm;
