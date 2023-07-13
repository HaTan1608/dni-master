/* eslint-disable */
import { Form, Input } from "antd";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";

import styled from "styled-components";
import arrow from "../../../assets/images/arrow.svg";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import { useEffect, useState } from "react";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import axios from "axios";
const rules = [
  {
    required: true,
    message: "Không bỏ trống",
  },
];

const typeTest = [
  {
    label: "Hàng thường",
    value: 1,
  },
  {
    label: "Hàng giá trị cao",
    value: 2,
  },
];
const SubLeftInfomation = ({
  data,
  theTich,
  getTotalWeightCallback,
  getActualWeightCallback,
  getCODCallback,
  getCargoValueCallback,
  getCargoType,
  getSoKienCallback,
  getTlQuyDoiCallback,
}: any) => {
  const [cargo, setCargo] = useState<any>([]);
  const [cargoTypes, setCargoTypes] = useState<any>([]);
  useEffect(() => {
    const getCargoTypes = async () => {
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
    getCargoType(cargo);
  }, [cargo]);
  return (
    <SubLeftInfomationComponent>
      <h4>Thông tin hàng hoá</h4>
      <div className="subRow" style={{ marginTop: "-24px" }}>
        <Form.Item
          name="mathamchieu"
          style={{ width: "calc((100% - 24px) /4)" }}
        >
          <InputNewStyled
            {...defaultStyles}
            label="Mã tham chiếu"
            margin="42px 0 0 0"
            width="100%"
          />
        </Form.Item>

        <FormSelectAntd
          {...defaultStyles}
          name="loaihanghoa"
          label="Loại hàng hoá"
          placeholder="Chọn loại hàng hoá"
          width="calc(100% / 4)"
          options={cargoTypes}
          height="42px"
          padding="0"
          onChange={(e: any, value: any) => setCargo(value)}
          fontSizeLabel="12px"
          suffixIcon={<img src={arrow} alt="" />}
        />
        <Form.Item
          name="giatrihanghoa"
          style={{ width: "calc((100% - 24px) /4)" }}
          rules={rules}
        >
          <InputNewStyled
            {...defaultStyles}
            label="Giá trị hàng hoá (vnđ)"
            textAlign="right"
            margin="42px 0 0 0"
            type="number"
            width="100%"
            onBlur={(e: any) =>
              data?.cargo_value !== e && getCargoValueCallback(e)
            }
            convertNumber
          />
        </Form.Item>

        <Form.Item
          name="tienthuho"
          style={{ width: "calc((100% - 24px) /4)" }}
          rules={rules}
        >
          <InputNewStyled
            {...defaultStyles}
            label="Tiền thu hộ"
            textAlign="right"
            margin="42px 0 0 0"
            type="number"
            width="100%"
            onBlur={(e: any) => data?.cod_amount !== e && getCODCallback(e)}
            convertNumber
          />
        </Form.Item>
      </div>
      <div className="subRow" style={{ marginTop: "-24px" }}>
        <Form.Item
          name="tlhanghoa"
          style={{ width: "calc((100% - 24px) /5)" }}
          rules={[
            ...rules,
            {
              validator: async (_, tlhanghoa) => {
                if (!tlhanghoa || Number(tlhanghoa) < 1) {
                  return Promise.reject(new Error("TL >0"));
                }
              },
            },
          ]}
        >
          <InputNewStyled
            {...defaultStyles}
            label="TL hàng hoá (kg)"
            textAlign="right"
            margin="42px 0 0 0"
            type="number"
            width="100%"
            onBlur={(e: any) =>
              data?.actual_weight !== e && getActualWeightCallback(e)
            }
            important
            convertWeight
          />
        </Form.Item>
        <Form.Item
          name="sokien"
          style={{ width: "calc((100% - 24px) /5)" }}
          rules={rules}
        >
          <InputNewStyled
            {...defaultStyles}
            label="Số kiện"
            textAlign="right"
            margin="42px 0 0 0"
            type="number"
            width="100%"
            onBlur={(e: any) =>
              data?.number_of_package !== e && getSoKienCallback(e)
            }
            important
            convertWeight
          />
        </Form.Item>
        <Form.Item
          name="thetich"
          style={{ width: "calc((100% - 24px) /5)" }}
          rules={rules}
        >
          <InputNewStyled
            {...defaultStyles}
            label="Thể tích (m3)"
            textAlign="right"
            margin="42px 0 0 0"
            type="number"
            width="100%"
            onBlur={(e: any) => theTich && getTotalWeightCallback(e)}
            convertWeight
          />
        </Form.Item>
        <Form.Item
          name="tlquydoi"
          style={{ width: "calc((100% - 24px) /5)" }}
          rules={rules}
        >
          <InputNewStyled
            {...defaultStyles}
            label="TL quy đổi (Kg)"
            textAlign="right"
            margin="42px 0 0 0"
            width="100%"
            type="number"
            onBlur={(e: any) => data?.tl_quydoi !== e && getTlQuyDoiCallback(e)}
            convertWeight
          />
        </Form.Item>
        <Form.Item
          name="tltinhgia"
          style={{ width: "calc((100% - 24px) /5)" }}
          rules={rules}
        >
          <InputNewStyled
            {...defaultStyles}
            label="TL tính cước"
            textAlign="right"
            margin="42px 0 0 0"
            width="100%"
            type="number"
            convertWeight
            disabled
          />
        </Form.Item>
      </div>
      <div>
        <div className="informationNote">
          <h4>Ghi chú đơn hàng</h4>
          <Form.Item
            style={{ margin: "0", padding: "0 0 8px 0" }}
            name="orderNote"
          >
            <Input.TextArea rows={3} placeholder="Nhập ghi chú" />
          </Form.Item>
        </div>
      </div>
    </SubLeftInfomationComponent>
  );
};

export default SubLeftInfomation;

const SubLeftInfomationComponent = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 5px;
  width: calc(50% - 8px);
  h4 {
    font-size: 16px;
    font-weight: 500;
  }
  .subRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex50 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(50% - 4px);
  }
  .trongluongquydoi__container {
    background: #f0f2f5;
    border-radius: 5px;
    padding: 8px;
  }
  .trongluongquydoi__table {
    background: #f0f2f5;
    height: 150px;
    width: 100%;
    overflow-y: scroll;
    padding: 0px 8px;
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .trongluongquydoi__summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 8px;
  }
`;
