import { useEffect } from "react";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import arrow from "src/assets/images/arrow.svg";
import "./styles.less";
interface AddPriceBodyInterfaces {
  type?: any;
  form?: any;
  configZones: any[];
  applyTypes: any[];
}

const AddPriceBody = ({
  type,
  form,
  configZones,
  applyTypes,
}: AddPriceBodyInterfaces) => {
  useEffect(() => {
    if (type === 1) {
    }
  }, [type]);

  return (
    <div className="modalAddCustomer__content">
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <FormSelectAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn tỉnh/ thành phố",
            },
          ]}
          label="Mã vùng:"
          options={configZones}
          name="configPriceZones"
          width="33%"
          placeholder="Chọn mã vùng"
          margin="-20px 8px 0 0 "
          borderRadius="5px"
          padding="0"
          fontSizeLabel="14px"
          suffixIcon={<img src={arrow} alt="" />}
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
        />
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập TL từ",
            },
          ]}
          label="TL từ (Lũy  tiến):"
          placeholder="Nhập TL từ"
          name="configPriceFrom"
          margin="0 8px 0 0"
          width="33%"
        />
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập TL đến",
            },
          ]}
          label="TL đến (Lũy  tiến):"
          placeholder="Nhập TL đến"
          name="configPriceTo"
          margin="0"
          width="33%"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "36px",
        }}
      >
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập bước giá",
            },
          ]}
          label="Bước giá:"
          placeholder="Nhập bước giá"
          labelFontWeight="400"
          name="configPriceStep"
          margin="0 8px 0 0"
          width="33%"
        />
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đơn giá",
            },
          ]}
          label="Đơn giá:"
          placeholder="Nhập đơn giá"
          labelFontWeight="400"
          name="configPriceUnit"
          margin="0 8px 0 0"
          width="33%"
        />
        <FormSelectAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Chọn kiểu đơn giá",
            },
          ]}
          padding="0"
          label="Kiểu đơn giá:"
          options={applyTypes}
          name="configPriceApply"
          width="33%"
          placeholder="Chọn kiểu đơn giá"
          suffixIcon={<img src={arrow} alt="" />}
          margin="-20px 0 0 0 "
          borderRadius="5px"
          fontSizeLabel="14px"
          showSearch
          optionFilterProp="label"
          filterOption={(input: any, option: any) =>
            option.label.includes(input)
          }
        />
      </div>
    </div>
  );
};

export default AddPriceBody;
