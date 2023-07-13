/* eslint-disable */
import { useState } from "react";
import arrow from "../../../../assets/images/arrow.svg";

import SvgIconShop from "src/assets/svg/SvgIconShop";
import SvgTransport from "src/assets/svg/SvgTransport";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import "./styles.less";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
const SenderInformation = ({ getDataEditSenderCallback }: any) => {
  const [senderType, setSenderType] = useState(1);

  return (
    <div className="senderInformation">
      <div className="btnGroupOrdersCreate">
        <div
          className={`defaultBtn
                   ${senderType === 1 ? "activeBtn " : ""}
                  `}
          onClick={() => setSenderType(1)}
        >
          <SvgTransport /> Gửi hàng tại ga
        </div>
        <div
          className={`defaultBtn
                   ${senderType === 2 ? "activeBtn" : ""}
                 `}
          onClick={() => setSenderType(2)}
        >
          <SvgIconShop className="svgShop" /> Gửi hàng tại kho
        </div>
      </div>
      <div className="senderInformation-row">
        <FormInputAntd
          {...defaultStyles}
          name="editSenderName"
          label="Họ tên:"
          placeholder="Nhập họ tên"
          width="calc((100% - 16px) /3)"
          margin="0 8px 0 0"
          labelFontWeight="500"
        />
        <FormInputAntd
          {...defaultStyles}
          name="editSenderPhone"
          label="Số điện thoại:"
          placeholder="Nhập số điện thoại"
          width="calc((100% - 16px) /3)"
          margin="0 8px 0 0"
          labelFontWeight="500"
        />
        <FormInputAntd
          {...defaultStyles}
          name="editSenderCode"
          label="Mã khách hàng:"
          placeholder="Nhập mã khách hàng"
          width="calc((100% - 16px) /3)"
          labelFontWeight="500"
        />
      </div>
      {senderType === 1 && (
        <div className="senderInformation-row">
          <FormSelectAntd
            {...defaultStyles}
            options={[]}
            suffixIcon={<img src={arrow} alt="" />}
            name="editSenderPlaceCity"
            label="Ga gửi hàng:"
            placeholder="Khu vực"
            width="calc((100% - 16px) /3)"
            margin="0 8px 0 0"
            fontSizeLabel="14px"
            fontWeightLabel="500"
          />
          <FormSelectAntd
            {...defaultStyles}
            options={[]}
            suffixIcon={<img src={arrow} alt="" />}
            name="editSenderPlaceDistrict"
            label="&nbsp;"
            placeholder="Chọn tỉnh thành"
            width="calc((100% - 16px) /3)"
            margin="0 8px 0 0"
            fontSizeLabel="14px"
          />
          <FormSelectAntd
            {...defaultStyles}
            options={[]}
            suffixIcon={<img src={arrow} alt="" />}
            name="editSenderPlace"
            label="&nbsp;"
            placeholder="Chọn ga"
            width="calc((100% - 16px) /3)"
            margin="0"
            fontSizeLabel="14px"
          />
        </div>
      )}

      {senderType === 2 && (
        <>
          <div className="senderInformation-row">
            <FormSelectAntd
              {...defaultStyles}
              options={[]}
              suffixIcon={<img src={arrow} alt="" />}
              name="editSenderPlaceCity"
              label="Địa chỉ:"
              placeholder="Chọn tỉnh thành"
              width="calc((100% - 16px) /3)"
              margin="0 8px 0 0"
              fontSizeLabel="14px"
              fontWeightLabel="500"
            />
            <FormSelectAntd
              {...defaultStyles}
              options={[]}
              suffixIcon={<img src={arrow} alt="" />}
              name="editSenderPlaceDistrict"
              label="&nbsp;"
              placeholder="Chọn quận huyện"
              width="calc((100% - 16px) /3)"
              margin="0 8px 0 0"
              fontSizeLabel="14px"
            />
            <FormSelectAntd
              {...defaultStyles}
              options={[]}
              suffixIcon={<img src={arrow} alt="" />}
              name="editSenderPlace"
              label="&nbsp;"
              placeholder="Chọn phường xã"
              width="calc((100% - 16px) /3)"
              margin="0"
              fontSizeLabel="14px"
            />
          </div>
          <FormInputAntd
            {...defaultStyles}
            name="editSenderAddress"
            placeholder="Nhập địa chỉ"
            width="100%"
            margin="8px 0 0 0"
          />
        </>
      )}
      <div className="btnSubmitEdit">
        <button>
          <SvgIconStorage />
          &nbsp;&nbsp;Lưu
        </button>
      </div>
    </div>
  );
};

export default SenderInformation;
