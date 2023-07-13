/* eslint-disable */
import { useState } from "react";
import { Row, Col, Button, Spin, Affix } from "antd";

import { FILTER_TOP } from "src/constants/AppConst";
import "./style.scss";
import { SmartRender } from "./SmartRender";
import { IonSearch } from "src/constants/Icon-svg";

// tên id
// filter_input_search
// filter_input_search2
// filter_select_rpType
// filter_select_operationType
// filter_select_cBPGroup
// filter_select_cODType
// filter_select_reportType
// filter_select_delivered
// filter_select_docReceived
// filter_select_service
// filter_select_post
// filter_select_selectWarehouseFrom
// filter_select_selectWarehouseTo
// filter_select_selectBranch
// filter_select_selectBranchTo
// filter_select_selectDate
// filter_rangePicker_onChangeDate
// filter_button_onSearch
// filter_button_onExport

const SmartFilter = (props) => {
  const [filterOnTop, setFilterOnTop] = useState("");

  const onSearch = (e) => {
    props.onSearch && props.onSearch(e);
  };

  const onHandlingEvent = (key, value) => {
    props.onChangeFilter && props.onChangeFilter(key, value);
  };
  const onHandlingEventBtn = (key, e) => {
    props.onClickButton && props.onClickButton(key, e);
  };

  return (
    <Affix
      offsetTop={FILTER_TOP}
      onChange={(ev) =>
        ev !== filterOnTop && setFilterOnTop(ev ? "on-top" : "")
      }
    >
      <Row className={`page-filter ${filterOnTop}`}>
        <Col
          span={24}
          className="tms-d-flex tms-justify-between tms-alignItem-center"
        >
          <div className="tms-d-flex tms-alignItem-center">
            {(props.optionFilter || []).map((e) => {
              return (
                <SmartRender
                  id={e.id}
                  type={e.type}
                  suffix={e.suffix}
                  width={e.width}
                  data={e.data}
                  nameEvent={e.nameEvent}
                  disable={e.disable}
                  dataOption={e.dataOption}
                  onHandlingEvent={onHandlingEvent}
                  classFilter={e.classFilter}
                  placeholder={e.placeholder}
                />
              );
            })}
            {props.isBtnSearch && (
              <Spin spinning={props.spin ? props.spin : false}>
                <Button
                  id="filter_button_onSearch"
                  size="large"
                  className="tms-btn-search"
                  onClick={onSearch}
                >
                  {IonSearch} {props.noSearchText || "Tìm kiếm"}
                </Button>
              </Spin>
            )}
          </div>
          <div className="tms-d-flex tms-alignItem-center">
            <Spin spinning={props.spin ? props.spin : false}>
              {(props.optionButton || []).map((e) => {
                return (
                  <SmartRender
                    id={e.id}
                    type={e.type}
                    onHandlingEvent={onHandlingEventBtn}
                    name={e.name}
                    nameEvent={e.nameEvent}
                    classFilter={e.classFilter}
                    icon={e.icon}
                  />
                );
              })}
            </Spin>
          </div>
        </Col>
      </Row>
    </Affix>
  );
};

export default SmartFilter;
