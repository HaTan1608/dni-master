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

const ReceiverInformation = () => {
  const [receiverType, setReceiverType] = useState(1);

  return (
    <div className="receiverInformation ">
      <h4>Thông tin người gửi</h4>
      <div className="btnGroupOrdersCreate">
        <div
          className={`defaultBtn
                   ${receiverType === 1 ? "activeBtn " : ""}
                  `}
          onClick={() => setReceiverType(1)}
        >
          <SvgTransport /> Nhận hàng tại ga
        </div>
        <div
          className={`defaultBtn
                   ${receiverType === 2 ? "activeBtn" : ""}
                 `}
          onClick={() => setReceiverType(2)}
        >
          <SvgIconShop className="svgShop" /> Nhận hàng tại kho
        </div>
      </div>
      <div className="receiverInformation-row">
        <FormInputAntd
          {...defaultStyles}
          name="editReceiverName"
          label="Họ tên:"
          placeholder="Nhập họ tên"
          width="calc((100% - 16px) /3)"
          margin="0 8px 0 0"
          labelFontWeight="500"
        />
        <FormInputAntd
          {...defaultStyles}
          name="editReceiverPhone"
          label="Số điện thoại:"
          placeholder="Nhập số điện thoại"
          width="calc((100% - 16px) /3)"
          margin="0 8px 0 0"
          labelFontWeight="500"
        />
      </div>
      {receiverType === 1 && (
        <div className="receiverInformation-row">
          <FormSelectAntd
            {...defaultStyles}
            options={[]}
            suffixIcon={<img src={arrow} alt="" />}
            name="editReceiverPlaceCity"
            label="Ga nhận hàng:"
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
            name="editReceiverPlace"
            label="&nbsp;"
            placeholder="Chọn ga"
            width="calc(((100% - 16px) /3 ) * 2)"
            margin="0 8px 0 0"
            fontSizeLabel="14px"
            fontWeightLabel="500"
          />
        </div>
      )}

      {receiverType === 2 && (
        <>
          <div className="receiverInformation-row">
            <FormSelectAntd
              {...defaultStyles}
              options={[]}
              suffixIcon={<img src={arrow} alt="" />}
              name="editReceiverAddressCity"
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
              name="editReceiverAddressDistrict"
              label="&nbsp;"
              placeholder="Chọn quận huyện"
              width="calc((100% - 16px) /3)"
              margin="0 8px 0 0"
              fontSizeLabel="14px"
              fontWeightLabel="500"
            />
            <FormSelectAntd
              {...defaultStyles}
              options={[]}
              suffixIcon={<img src={arrow} alt="" />}
              name="editReceiverAddressWards"
              label="&nbsp;"
              placeholder="Chọn phường xã"
              width="calc((100% - 16px) /3)"
              margin="0"
              fontSizeLabel="14px"
              fontWeightLabel="500"
            />
          </div>
          <FormInputAntd
            {...defaultStyles}
            name="editReceiverAddress"
            placeholder="Nhập địa chỉ"
            width="100%"
            margin="8px 0 0 0"
            labelFontWeight="500"
          />
        </>
      )}
      <div className="btnSubmitEdit">
        <button type="submit" form="formEditReceiver">
          <SvgIconStorage />
          &nbsp;&nbsp;Lưu
        </button>
      </div>
    </div>
  );
};

export default ReceiverInformation;
