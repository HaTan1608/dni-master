import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import "./styles.less";
interface AddTablePriceFooterInterfaces {
  onClickCallback?: any;
  type: any;
  status: any;
}
const AddTablePriceFooter = ({
  status,
  onClickCallback,
  type,
}: AddTablePriceFooterInterfaces) => {
  return (
    <div className="addStores__footer">
      <div style={{ display: "flex", alignItems: "center" }}>
        Trạng thái hoạt động
        <div className="statusBtn">
          <span
            className={status === "A" ? "mainBtn" : ""}
            onClick={() => onClickCallback("A")}
          >
            Bật
          </span>
          <span
            className={status === "D" ? "falseBtn" : ""}
            onClick={() => onClickCallback("D")}
          >
            Tắt
          </span>
        </div>
      </div>
      <button
        type="submit"
        form="formTablePrice"
        className={
          type === 1
            ? "addStores__footer__btn addBtn"
            : "addStores__footer__btn editBtn"
        }
      >
        {type === 1 ? (
          <>
            <SvgIconPlus /> Thêm
          </>
        ) : (
          <>
            {" "}
            <SvgIconStorage /> Lưu
          </>
        )}
      </button>
    </div>
  );
};

export default AddTablePriceFooter;
