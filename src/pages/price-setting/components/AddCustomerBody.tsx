import { Form, DatePicker } from "antd";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import arrow from "src/assets/images/arrow.svg";
import "./styles.less";

const AddCustomerBody = ({ customers, dataGroupCustomer }: any) => {
  return (
    <div className="modalAddCustomer__content">
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <FormSelectAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhóm khách hàng",
            },
          ]}
          label="Nhóm khách hàng:"
          options={dataGroupCustomer}
          name="customerGroup"
          width="33%"
          placeholder="Chọn nhóm khách hàng"
          padding="0"
          margin="-20px 8px 0 0 "
          borderRadius="5px"
          showSearch
          optionFilterProp="label"
          suffixIcon={<img src={arrow} alt="" />}
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
        />
        <FormSelectAntd
          {...defaultStyles}
          label="Tên khách hàng:"
          options={customers}
          name="customerName"
          width="33%"
          placeholder="Chọn khách hàng"
          margin="-20px 0 0 0 "
          padding="0"
          borderRadius="5px"
          suffixIcon={<img src={arrow} alt="" />}
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.phone.includes(input)
          }
          keyPhone={true}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "36px",
        }}
      >
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chiết khấu",
            },
          ]}
          label="Chiết khấu (%)"
          name="customerChietKhau"
          placeholder="Nhập chiết khấu"
          margin="0 8px 0 0"
          width="33%"
          type="number"
        />
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập phụ phí",
            },
          ]}
          label="Phụ phí cộng thêm (%):"
          placeholder="Nhập phụ phí"
          name="customerPhuPhi"
          margin="0 8px 0 0"
          width="33%"
          type="number"
        />
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập % VAT",
            },
          ]}
          label="VAT (%)"
          placeholder="Nhập % VAT"
          name="customerVAT"
          margin="0"
          width="33%"
          type="number"
        />
      </div>

      <div className="rangepickertime">
        <div className="rangepickertime__label" style={{ marginTop: "4px" }}>
          Ngày bắt đầu - ngày kết thúc
        </div>
        <Form.Item
          name="customerTime"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày bắt đầu, ngày kết thúc",
            },
          ]}
        >
          <DatePicker.RangePicker />
        </Form.Item>
      </div>
    </div>
  );
};

export default AddCustomerBody;
