import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import "./styles.less";
interface AddZoneBodyInterfaces {
  type?: any;
  form?: any;
}

const AddZoneBody = ({ type }: AddZoneBodyInterfaces) => {
  return (
    <div className="modalAddCustomer__content">
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã tuyến",
            },
          ]}
          label="Mã tuyến:"
          placeholder="Nhập mã tuyến:"
          name="configZonesValue"
          margin="0 8px 0 0"
          width="calc(50% - 4px)"
          disabled={type === 1 ? false : true}
        />
        <FormInputAntd
          {...defaultStyles}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tuyến",
            },
          ]}
          label="Tên tuyến:"
          placeholder="Nhập tên tuyến:"
          name="configZonesName"
          margin="0 8px 0 0"
          width="calc(50% - 4px)"
        />
      </div>
    </div>
  );
};

export default AddZoneBody;
