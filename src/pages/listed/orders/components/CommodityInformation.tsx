/* eslint-disable */
import { useState } from "react";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import { Input } from "antd";
import arrow from "../../../../assets/images/arrow.svg";
import "./styles.less";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
const CommodityInformation = ({
  handleChangeServicesCallback,
  typeService,
}: any) => {
  const [type, setType] = useState(typeService);
  const handleChangeServices = (e: any) => {
    setType(e);
    handleChangeServicesCallback(e);
  };
  return (
    <div className="commodityInformation ">
      <div className="commodityInformation-row" style={{ marginTop: "24px" }}>
        <div
          style={{
            width: "calc(50% - 4px)",
            position: "relative",
          }}
        >
          <div className="services-label">Dịch vụ:</div>
          <div className="commodityInformation-services">
            <div
              className={`service ${type === 1 ? "activeService" : ""}`}
              onClick={() => handleChangeServices(1)}
            >
              36 giờ
            </div>
            <div
              className={`service ${type === 2 ? "activeService" : ""}`}
              onClick={() => handleChangeServices(2)}
            >
              48 giờ
            </div>
          </div>
        </div>
        <FormInputAntd
          {...defaultStyles}
          label="Giá trị hàng hoá (VNĐ)"
          type="number"
          width="calc(50% - 4px)"
          labelFontWeight="500"
        />
      </div>
      <div className="commodityInformation-row" style={{ marginTop: "32px" }}>
        <div
          style={{
            width: "calc(50% - 4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormInputAntd
            {...defaultStyles}
            label="Trọng lượng hàng hoá (kg):"
            type="number"
            width="calc(((100% - 8px) /3) * 2 + 4px)"
            textAlign="right"
            labelFontWeight="500"
          />
          <FormInputAntd
            {...defaultStyles}
            label="Số kiện"
            type="number"
            width="calc((100% - 8px) /3)"
            textAlign="right"
            labelFontWeight="500"
          />
        </div>
        <FormInputAntd
          {...defaultStyles}
          label="Tiền thu hộ (VNĐ)"
          type="number"
          width="calc(50% - 4px)"
          labelFontWeight="500"
        />
      </div>
      <div className="commodityInformation-row" style={{ marginTop: "32px" }}>
        <div
          style={{
            width: "calc(50% - 4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormInputAntd
            {...defaultStyles}
            label="Kích thước"
            type="number"
            width="calc((100% - 8px) /3)"
            placeholder="Dài"
            textAlign="right"
            labelFontWeight="500"
          />
          <FormInputAntd
            {...defaultStyles}
            label="&nbsp;"
            type="number"
            width="calc((100% - 8px) /3)"
            placeholder="Rộng"
            textAlign="right"
          />
          <FormInputAntd
            {...defaultStyles}
            label="&nbsp;"
            type="number"
            width="calc((100% - 8px) /3)"
            placeholder="Cao"
            textAlign="right"
          />
        </div>
        <FormSelectAntd
          {...defaultStyles}
          options={[]}
          label="Loại hàng hoá:"
          margin="0"
          fontSizeLabel="14px"
          fontWeightLabel="500"
          width="calc(50% - 4px)"
          suffixIcon={<img src={arrow} alt="" />}
        />
      </div>
      <div style={{ marginTop: "16px", fontWeight: "500" }}>
        Nội dung hàng hóa:
      </div>
      <Input.TextArea rows={4} />
      <div className="btnSubmitEdit">
        <button>
          <SvgIconStorage />
          &nbsp;&nbsp;Lưu
        </button>
      </div>
    </div>
  );
};

export default CommodityInformation;
