import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import "./styles.less";
const AddTablePriceBody = ({
  calculationTypes,
  services,
  transportMethods,
}: any) => {
  return (
    <div className="modalAddCustomer__content">
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã bảng giá",
            },
          ]}
          label="Mã bảng giá:"
          name="tableCode"
          margin="0 8px 0 0"
          width="33%"
        />
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên bảng giá",
            },
          ]}
          label="Tên bảng giá:"
          name="tableName"
          margin="0 8px 0 0"
          width="33%"
        />
        <FormSelectAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn dịch vụ",
            },
          ]}
          label="Dịch vụ:"
          options={services}
          name="services"
          padding="0"
          width="33%"
          placeholder="Chọn dịch vụ"
          margin="-22px 0 0 0 "
          borderRadius="5px"
          fontSizeLabel="14px"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "32px",
        }}
      >
        <FormSelectAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phương thức",
            },
          ]}
          label="Phương thức vận chuyển:"
          options={transportMethods}
          name="transportMethods"
          width="33%"
          padding="0"
          placeholder="Chọn phương thức"
          margin="-20px 8px 0 0 "
          borderRadius="5px"
          fontSizeLabel="14px"
        />
        <FormSelectAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn quy tắc",
            },
          ]}
          label="Quy tắc áp giá:"
          options={calculationTypes}
          padding="0"
          name="calculationTypes"
          width="33%"
          placeholder="Chọn quy tắc"
          margin="-20px 0 0 0 "
          borderRadius="5px"
          fontSizeLabel="14px"
        />
      </div>
    </div>
  );
};

export default AddTablePriceBody;
