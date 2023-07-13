/* eslint-disable */
import { DatePicker, Form } from "antd";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import styled from "styled-components";
import arrow from "src/assets/images/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import { useEffect, useState } from "react";
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
import { convertweightWithCommas } from "src/utils/helpers/functions/textUtils";

const CreatePackage = ({ selectedBills, open }: any) => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const [warehouseList, setWarehouseList] = useState<any[]>([]);
  const [formCreatePackage] = Form.useForm();
  const [trains, setTrains] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [supplies, setSupplies] = useState<any[]>([]);
  const [selectedSupply, setSelectedSupply] = useState(0);
  const [dataSelectedSupply, setDataSelectedSupply] = useState<any>([]);
  const [warehouseAccount, setWarehouseAccount] = useState<any>();

  const stateListWarehouse = useSelector(
    (e: AppState) => e.warehouseReducer.stateGetListWarehouse
  );

  const stateCreatePackage = useSelector(
    (e: AppState) => e.packageReducer.stateCreatePackage
  );

  useEffect(() => {
    dispatch(getListWarehouse());
  }, []);

  useEffect(() => {
    if (!open) {
      formCreatePackage.resetFields();
    }
  }, [open]);
  useEffect(() => {
    const parseData = JSON.parse(
      localStorage.getItem("ACCOUNT") || ""
    )?.warehouse;
    console.log(localStorage.getItem("ACCOUNT"));
    if (parseData) {
      formCreatePackage.setFieldsValue({
        from_warehouse_id: parseData[0]?.id || null,
      });
      let fakeArray = [];
      for (let i = 0; i < parseData.length; i++) {
        fakeArray.push({
          label: parseData[i].ws_name,
          value: parseData[i].id,
        });
      }
      setWarehouseAccount(fakeArray);
    }
  }, []);

  useEffect(() => {
    const getSupplies = async () => {
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
          `${API_URL}/${ROOT_VERSION}/suppliers`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeArray = [];
          for (let i = 0; i < data?.data?.suppliers?.length; i++) {
            fakeArray.push({
              label: data?.data?.suppliers[i]?.supplier_name,
              value: data?.data?.suppliers[i]?.id,
              code: data?.data?.suppliers[i]?.supplier_code,
            });
          }
          setSupplies(fakeArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSupplies();
    return () => {
      setSupplies([]);
    };
  }, []);
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
              label: data?.data?.vehicles[i].vehicle_number,
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
          `${API_URL}/${ROOT_VERSION}/trains?search=&status=A&supplier_id=${selectedSupply}`,
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
  }, [selectedSupply]);

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
    const supplier = supplies.filter((item: any) => {
      return values.supply_id == item.value;
    });
    const train = trains.filter((item: any) => {
      return values.train_id == item.value;
    });
    const vehicle = vehicles.filter((item: any) => {
      return values.vehicle_id == item.value;
    });
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
        train_id: train[0].value,
        train_number: train[0].label,
        vehicle_id: vehicle[0]?.value ? vehicle[0].value : 0,
        vehicle_number: vehicle[0]?.label
          ? vehicle[0].label
          : values.vehicle_id[0],
        supplier_id: dataSelectedSupply.value,
        supplier_name: dataSelectedSupply.label,
        supplier_code: dataSelectedSupply.code,
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
  return (
    <Form
      id="formCreatePackage"
      form={formCreatePackage}
      onFinish={handleSubmitCreatePackage}
      initialValues={{
        description: "",
        start_date: moment(new Date(), "YYYY-MM-DD HH:mm:ss"),
      }}
    >
      <CreatePackageComponent>
        <FormSelectAntd
          {...defaultStyles}
          name="supply_id"
          label="Nhà cung cấp"
          placeholder="Nhà cung cấp"
          suffixIcon={<img src={arrow} alt="" />}
          width="calc(33% - 5px)"
          padding="0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
          onChange={(e: any, value: any) => {
            setSelectedSupply(e);
            setDataSelectedSupply(value);
          }}
          options={supplies}
          margin="-20px 0 0 0"
          rules={[
            {
              required: true,
              message: "Vui lòng không bỏ trống",
            },
          ]}
        />
        <FormSelectAntd
          {...defaultStyles}
          name="train_id"
          label="Số hiệu tàu"
          placeholder="Chọn số hiệu"
          suffixIcon={<img src={arrow} alt="" />}
          width="calc(33% - 5px)"
          padding="0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
          options={trains}
          margin="-20px 0 0 0"
          disabled={selectedSupply > 0 ? false : true}
          rules={[
            {
              required: true,
              message: "Vui lòng không bỏ trống",
            },
          ]}
        />
        <FormSelectAntd
          {...defaultStyles}
          className="selectCont"
          mode="tags"
          name="vehicle_id"
          label="Số CONT"
          placeholder="Chọn số cont"
          suffixIcon={<img src={arrow} alt="" />}
          width="calc(33% - 6px)"
          padding="0"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
          onChange={(e: any) => {
            e.length > 1 &&
              formCreatePackage.setFieldsValue({ vehicle_id: e.slice(-1) });
          }}
          options={vehicles}
          margin="-20px 0 0 0"
          rules={[
            {
              required: true,
              message: "Vui lòng không bỏ trống",
            },
          ]}
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
          options={warehouseAccount || []}
          margin="16px 0 0 0"
          rules={[
            {
              required: true,
              message: "Vui lòng không bỏ trống",
            },
          ]}
        />
        <div className="dateHaveLabel" style={{ marginTop: "36px" }}>
          <span className="dateLabel">Ngày đi</span>
          <Form.Item
            name="start_date"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống",
              },
            ]}
          >
            <DatePicker
              showTime={{
                format: "HH:mm",
              }}
              minuteStep={15}
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
          margin="-8px 0 0 0"
          rules={[
            {
              required: true,
              message: "Vui lòng không bỏ trống",
            },
          ]}
        />
        <div className="dateHaveLabel" style={{ marginTop: "12px" }}>
          <span className="dateLabel">Ngày đến</span>

          <Form.Item
            name="to_date"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống",
              },
            ]}
          >
            <DatePicker
              showTime={{
                format: "HH:mm",
              }}
              minuteStep={15}
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
            margin="12px 0 0 0"
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
`;
