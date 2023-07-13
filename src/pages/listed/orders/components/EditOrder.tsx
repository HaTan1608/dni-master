/* eslint-disable */
import { Form } from "antd";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import styled from "styled-components";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
const rules = [
  {
    required: true,
    message: "Không bỏ trống",
  },
];

const EditOrder = ({
  getTotalWeightCallback,
  getActualWeightCallback,
  getCargoValueCallback,
  getCODCallback,
  getSoKienCallback,
  getTlQuyDoiCallback,
  data,
}: any) => {
  return (
    <EditOrderComponent>
      <div className="subRow" style={{ marginTop: "-24px" }}>
        <Form.Item
          name="tlhanghoa"
          style={{ width: "calc((100% - 24px) /5)" }}
          rules={rules}
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
            onBlur={(e: any) => getTotalWeightCallback(e)}
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
            onBlur={(e: any) => getTlQuyDoiCallback(e)}
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
            name="tltinhgia"
            label="TL tính cước"
            textAlign="right"
            margin="42px 0 0 0"
            width="100%"
            type="number"
            disabled
            convertWeight
          />
        </Form.Item>
      </div>
      <div className="buttonSubmitEditOrder">
        <div></div>
        <button form="formEditOrder" type="submit">
          <SvgIconStorage />
          &nbsp;&nbsp;Lưu
        </button>
      </div>
    </EditOrderComponent>
  );
};

export default EditOrder;

const EditOrderComponent = styled.div`
  background: #fff;
  border-radius: 5px;
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
  .buttonSubmitEditOrder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      width: 120px;
      height: 41px;
      border-radius: 5px;
      background: #2d9cdb;
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
