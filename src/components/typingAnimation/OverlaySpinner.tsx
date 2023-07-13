/* eslint-disable */
import { Spin } from "antd";
import "./styles.less";
interface OverlaySpinnerInterfaces {
  spin?: any;
  onClickCallback?: any;
  position?: any;
  text?: any;
}
const OverlaySpinner = ({ spin, text, position }: OverlaySpinnerInterfaces) => {
  return (
    <div
      className="overlaySpinner12"
      style={{ position: position ? position : "fixed" }}
    >
      <div>{spin && <Spin size="large" />}</div>
      {text && (
        <>
          <div className="waveLoading12">
            <div style={{ ["--c" as any]: 1 }}>Abc</div>
            <div style={{ ["--c" as any]: 2 }}>efg</div>
            <div style={{ ["--c" as any]: 3 }}>hjk</div>
          </div>
          <div className="waveLoading12">
            <div style={{ ["--c" as any]: 4 }}>{"->"}</div>
            <div style={{ ["--c" as any]: 4 }}>{"->"}</div>
            <div style={{ ["--c" as any]: 4 }}>{"->"}</div>
          </div>
          <div className="waveLoading12">
            <div style={{ ["--c" as any]: 5 }}>Abc</div>
            <div style={{ ["--c" as any]: 6 }}>efg</div>
            <div style={{ ["--c" as any]: 7 }}>hjk</div>
          </div>
          <div className="waveLoading12">
            <div style={{ ["--c" as any]: 8 }}>{"->"}</div>
            <div style={{ ["--c" as any]: 8 }}>{"->"}</div>
            <div style={{ ["--c" as any]: 8 }}>{"->"}</div>
          </div>
          <div className="waveLoading12">
            <div style={{ ["--c" as any]: 9 }}>Abc</div>
            <div style={{ ["--c" as any]: 10 }}>efg</div>
            <div style={{ ["--c" as any]: 11 }}>hjk</div>
          </div>
          <div className="finishAnimation">
           Okela
          </div>
        </>
      )}
    </div>
  );
};

export default OverlaySpinner;
