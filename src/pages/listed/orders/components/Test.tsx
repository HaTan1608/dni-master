/* eslint-disable */
import { DatePicker, Empty, Form, Spin } from "antd";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import styled from "styled-components";
import arrow from "src/assets/images/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifyWarning } from "src/components/notification";
import { getListWarehouse } from "src/services/actions/warehouse.actions";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import moment from "moment";
import { createPackage } from "src/services/actions/package.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import axios from "axios";
import _debounce from "lodash/debounce";
import { convertweightWithCommas } from "src/utils/helpers/functions/textUtils";
const CreatePackage = ({ selectedBills }: any) => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const [warehouseList, setWarehouseList] = useState<any[]>([]);
  const [formCreatePackage] = Form.useForm();
  const [trains, setTrains] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedSupply, setSelectedSuppy] = useState<any>(undefined);
  const [dropdownSupplies, setDropdownSupplies] = useState(false);

  const [suppliesLoaded, setSuppliesLoaded] = useState(1);
  const [suppliesParams, setSuppliesParams] = useState({
    search: "",
    status: "A",
  });
  const [suppliesData, setSuppliesData] = useState<any>({
    data: [],
    total: 0,
    loading: false,
  });

  const stateListWarehouse = useSelector(
    (e: AppState) => e.warehouseReducer.stateGetListWarehouse
  );

  const stateCreatePackage = useSelector(
    (e: AppState) => e.packageReducer.stateCreatePackage
  );
  const observer = useRef<any>();
  useEffect(() => {
    dispatch(getListWarehouse());
  }, []);

  useEffect(() => {
    const getSupplies = async () => {
      setSuppliesData({ ...suppliesData, loading: true });
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      let uuid = localGetAuthUUID();
      if (token) {
        headers.Authorization = token;
        headers["x-auth-uuid"] = uuid;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/suppliers?status=${
            suppliesParams.status
          }&limit=${suppliesLoaded * 20}&search=${suppliesParams.search}`,
          {
            headers: headers,
          }
        );
        if (data) {
          setSuppliesData({
            data: data.data?.suppliers,
            total: data.data?.paging?.total,
            loading: false,
          });
          console.log("123123", data);
        }
      } catch (error) {
        setSuppliesData({ ...suppliesData, loading: false });
        console.log(error);
      }
    };
    getSupplies();
    return () => {
      // setVehicles([]);
    };
  }, [suppliesParams, suppliesLoaded]);
  useEffect(() => {
    const getConts = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      let uuid = localGetAuthUUID();
      if (token) {
        headers.Authorization = token;
        headers["x-auth-uuid"] = uuid;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/vehicles?search=&vehicle_type=1&status=A`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeData = [];

          for (let i = 0; i < data?.data?.vehicles.length; i++) {
            fakeData.push({
              value: data?.data?.vehicles[i].id,
              label: data?.data?.vehicles[i].vehicle_name,
            });
          }

          setVehicles(fakeData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConts();
    return () => {
      setVehicles([]);
    };
  }, []);

  useEffect(() => {
    const getTrains = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/trains?search=&status=A`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeData = [];
          for (let i = 0; i < data?.data?.trains.length; i++) {
            fakeData.push({
              value: data?.data?.trains[i].id,
              label: data?.data?.trains[i].train_number,
            });
          }

          setTrains(fakeData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTrains();
    return () => {
      setTrains([]);
    };
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateListWarehouse;
    if (!isLoading) {
      if (success) {
        let fakeArray = [];
        for (var i = 0; i < data?.warehouses?.length; i++) {
          fakeArray.push({
            label: data?.warehouses[i]?.ws_name,
            value: data?.warehouses[i]?.id,
          });
        }
        setWarehouseList(fakeArray);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateListWarehouse.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateCreatePackage;
    if (!isLoading) {
      if (success) {
        formCreatePackage.resetFields();
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateCreatePackage.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const getTotalWeight = () => {
    let totalWeight = 0;
    for (var i = 0; i < selectedBills.length; i++) {
      totalWeight += selectedBills[i].real_weight;
    }
    return totalWeight;
  };
  const handleSubmitCreatePackage = (values: any) => {
    if (values.to_date.isBefore(values.start_date)) {
      notifyWarning("Vui lòng chọn ngày đến xa hơn ngày đi");
    } else {
      let params = {
        listBill: [],
        total_weight: 0,
        number_of_bill: selectedBills?.length,
        from_warehouse_id: values.from_warehouse_id,
        from_warehouse: warehouseList.find(
          (x) => x.value === values.from_warehouse_id
        )?.label,
        to_warehouse_id: values.to_warehouse_id,
        to_warehouse: warehouseList.find(
          (x) => x.value === values.to_warehouse_id
        )?.label,
        start_date: values.start_date
          ? moment(values.start_date).format("YYYY-MM-DD")
          : undefined,
        to_date: values.to_date
          ? moment(values.to_date).format("YYYY-MM-DD")
          : undefined,
        train_id: 1,
        train_number: 1,
        vehicle_id: 1,
        vehicle_number: 1,
        description: values.description,
      } as any;
      for (var i = 0; i < selectedBills.length; i++) {
        params.listBill.push(selectedBills[i].bill_code);
        params.total_weight =
          params.total_weight + selectedBills[i].real_weight;
      }

      dispatch(createPackage(params));
    }
  };

  const debounceDropDown = useCallback(
    _debounce(
      (nextValue: any) =>
        setSuppliesParams({ ...suppliesParams, search: nextValue }),
      200
    ),
    []
  );
  //Store
  const handleChangeStoreInput = (e: any) => {
    debounceDropDown(e);
    setSuppliesLoaded(1);
    setSelectedSuppy(e);
  };

  const handleSupplyClick = (e: any) => {
    setSelectedSuppy(e.supplier_name);
  };

  const loadInfinitiSupply = (node: any) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (
          suppliesData?.data?.length < suppliesData?.total &&
          suppliesData.loading === false
        ) {
          setSuppliesLoaded((suppliesLoaded) => suppliesLoaded + 1);
        }
      }
    });
    if (node) observer.current.observe(node);
  };
  return (
    <Form
      id="formCreatePackage"
      form={formCreatePackage}
      onFinish={handleSubmitCreatePackage}
      initialValues={{
        description: "",
      }}
    >
      <CreatePackageComponent>
        <div
          className="dropdownProducts"
          style={{ width: "calc((( 100% - 16px ) / 3) + 10%)" }}
          onMouseLeave={(e: any) => setDropdownSupplies(false)}
        >
          <InputNewStyled
            {...defaultStyles}
            label="Nhà cung cấp"
            width="100%"
            placeholder={"Chọn nhà cung cấp"}
            placeholderColor={selectedSupply ? "#000" : ""}
            padding="0px 12px"
            onChange={(e: any) => handleChangeStoreInput(e)}
            labelFontSize="12px"
            onMouseOver={(e: any) => setDropdownSupplies(true)}
            value={selectedSupply}
          />
          {dropdownSupplies && suppliesData.data && (
            <div className="dropdownProducts__content">
              <div className="dropdownProducts__content__body">
                {suppliesData.data.length > 0 ? (
                  suppliesData.data.map((supply: any, index: any) => (
                    <div
                      className="dropdownProducts__content__body__product"
                      key={index}
                      onClick={() => handleSupplyClick(supply)}
                    >
                      {supply?.supplier_name}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      height: "300px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
                <div
                  ref={loadInfinitiSupply}
                  style={{ marginTop: "20px" }}
                ></div>

                {suppliesData.loading && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "40px",
                      width: "100%",
                    }}
                  >
                    <Spin />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          className="dropdownProducts"
          style={{ width: "calc((( 100% - 16px ) / 3) - 5%)" }}
          onMouseLeave={(e: any) => setDropdownSupplies(false)}
        >
          <InputNewStyled
            {...defaultStyles}
            label="Nhà cung cấp"
            width="100%"
            placeholder={"///////////"}
            placeholderColor={selectedSupply ? "#000" : ""}
            padding="0px 12px"
            onChange={(e: any) => handleChangeStoreInput(e)}
            labelFontSize="12px"
            onMouseOver={(e: any) => setDropdownSupplies(true)}
            value={selectedSupply}
          />
          {dropdownSupplies && suppliesData.data && (
            <div className="dropdownProducts__content">
              <div className="dropdownProducts__content__body">
                {suppliesData.data.length > 0 ? (
                  suppliesData.data.map((supply: any, index: any) => (
                    <div
                      className="dropdownProducts__content__body__product"
                      key={index}
                      onClick={() => handleSupplyClick(supply)}
                    >
                      {supply?.supplier_name}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      height: "300px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
                <div
                  ref={loadInfinitiSupply}
                  style={{ marginTop: "20px" }}
                ></div>

                {suppliesData.loading && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "40px",
                      width: "100%",
                    }}
                  >
                    <Spin />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <FormSelectAntd
          {...defaultStyles}
          name="train_id"
          label="Số hiệu tàu"
          placeholder="Chọn số hiệu"
          suffixIcon={<img src={arrow} alt="" />}
          width="calc((( 100% - 16px ) /3) - 5%)"
          padding="0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
          options={trains}
          margin="-20px 0 0 0"
        />
        <FormSelectAntd
          {...defaultStyles}
          name="vehicle_id"
          label="Số CONT"
          placeholder="Chọn số cont"
          suffixIcon={<img src={arrow} alt="" />}
          width="calc((( 100% - 16px )) /3 - 5%)"
          padding="0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
          options={vehicles}
          margin="-20px 0 0 0"
        />

        <FormSelectAntd
          {...defaultStyles}
          name="from_warehouse_id"
          label="Kho đi"
          placeholder="Chọn kho đi"
          suffixIcon={<img src={arrow} alt="" />}
          width="calc(50% - 4px)"
          padding="0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
          options={warehouseList}
          margin="12px 0 0 0"
        />
        <div className="dateHaveLabel" style={{ marginTop: "32px" }}>
          <span className="dateLabel">Ngày đi</span>
          <Form.Item name="start_date" style={{ width: "100%" }}>
            <DatePicker
              showTime
              onChange={(e: any) =>
                formCreatePackage.setFieldsValue({
                  start_date: e,
                })
              }
            />
          </Form.Item>
        </div>
        <FormSelectAntd
          {...defaultStyles}
          name="to_warehouse_id"
          label="Kho đến"
          placeholder="Chọn kho đến"
          suffixIcon={<img src={arrow} alt="" />}
          width="calc(50% - 4px)"
          padding="0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
          options={warehouseList}
          margin="-12px 0 0 0"
        />
        <div className="dateHaveLabel" style={{ marginTop: "8px" }}>
          <span className="dateLabel">Ngày đến</span>

          <Form.Item name="to_date" style={{ width: "100%" }}>
            <DatePicker
              showTime
              onChange={(e: any) =>
                formCreatePackage.setFieldsValue({
                  to_date: e,
                })
              }
            />
          </Form.Item>
        </div>

        <Form.Item name="description" style={{ width: "100%" }}>
          <InputNewStyled
            {...defaultStyles}
            width="100%"
            label="Ghi chú"
            placeholder="Nhập ghi chú"
            margin="8px 0 0 0"
          />
        </Form.Item>
        <div className="footerCreatePackage">
          <div className="footerCreatePackage-information">
            <div>
              Tổng vận đơn:{" "}
              <span style={{ fontWeight: "700" }}>{selectedBills?.length}</span>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              Khối lượng (Kg):{" "}
              <span style={{ fontWeight: "700" }}>
                {selectedBills?.length > 0
                  ? convertweightWithCommas(getTotalWeight().toString())
                  : 0}
              </span>
            </div>
          </div>
          <button className="footerCreatePackage-button">
            <SvgIconStorage />
            &nbsp;Lưu
          </button>
        </div>
      </CreatePackageComponent>
    </Form>
  );
};

export default CreatePackage;

const CreatePackageComponent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .dateHaveLabel {
    width: calc(50% - 4px);
    position: relative;
    .dateLabel {
      position: absolute;
      bottom: 100%;
      font-size: 12px;
    }
    .ant-picker {
      width: 100%;
      height: 41px;
      border-radius: 5px;
    }
  }
  .footerCreatePackage {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .footerCreatePackage-information {
      display: flex;
      align-items: center;
    }
  }
  .footerCreatePackage-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 41px;
    width: 120px;
    border-radius: 5px;
    background: #2d9cdb;
    color: #fff;
    font-size: 14px;
  }
  .dropdownProducts {
    position: relative;
    &__content {
      position: absolute;
      padding: 8px;
      z-index: 99;
      height: auto;
      max-height: 240px;
      width: 100%;
      background: #fff;
      border: solid 1px rgb(191, 196, 201);
      border-top: none;
      border-radius: 0 0 5px 5px;
      overflow-y: unset;
      &__body {
        &__product {
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          &-image {
            width: 50px;
            height: 50px;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
          &-name {
            width: calc(100% - 140px);
            padding: 0 12px;
            display: flex;
            flex-direction: column;
            :nth-child(1) {
              color: #414141;
            }
            :nth-child(2) {
              color: #808a94;
            }
          }
          &-price {
            width: 100px;
            display: flex;
            flex-direction: column;
            :nth-child(1) {
              text-align: right;
            }
            :nth-child(2) {
              color: rgb(128, 138, 148);
              text-align: right;
            }
          }
        }
      }
    }
  }
`;
