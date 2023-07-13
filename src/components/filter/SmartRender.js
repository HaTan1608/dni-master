/* eslint-disable */
import { useState } from "react";
import { Select, Input, Button, DatePicker, InputNumber } from "antd";
import suffixIcon from "./icon/arrowIcon";
import calendar from "./icon/calendar";
import Constants from "../../constants/index";

const { Option } = Select;
const { RangePicker } = DatePicker;

export const SmartRender = (props) => {
  const {
    id,
    type,
    data = props.data ? props.data : [],
    dataOption = props.dataOption
      ? props.dataOption
      : {
          value: "value",
          name: "name",
        },
    placeholder = props.placeholder ? props.placeholder : "",
    classFilter = props.classFilter ? props.classFilter : "",
    name = props.name ? props.name : "Tạo mới",
    disable = props.disable ? props.disable : false,
    icon = props.icon ? props.icon : false,
    suffix = props.suffix ? props.suffix : false,
    width = props.width ? props.width : 180,
    nameEvent = props.nameEvent ? props.nameEvent : false,
  } = props;
  const [disabled, setDisabled] = useState(
    props.isNotDefaultDate ? false : true
  );
  const [timeValue, setTimeValue] = useState(
    props.isNotDefaultDate
      ? Constants.arrSelectDate[6].result
      : Constants.arrSelectDate[0].result
  );

  const onHandlingEvent = (e) => {
    props.onHandlingEvent && props.onHandlingEvent(nameEvent, e);
  };

  const dateChange = (value) => {
    let newData = Constants.arrSelectDate
      .filter((el) => el.key === value)
      .pop();
    if (newData.result.length > 0) {
      setTimeValue(newData.result);

      // props.dateChange && props.dateChange(newData.result);
    }
    setDisabled(newData.disabled);
  };

  switch (type) {
    case "input":
      return (
        <Input
          id={id}
          disabled={disable}
          className={`tms-mr-5 ${classFilter}`}
          placeholder={placeholder}
          suffix={suffix}
          onChange={(e) => onHandlingEvent(e.target.value)}
        />
      );
    case "inputNumber":
      return (
        <InputNumber
          id={id}
          formatter={(value) =>
            `${value}`
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              .replace(/[a-zA-Z\^!@#$%^&*()_?-{};:'"/.<>+=-|ƠƯ]/, "")
          }
          parser={(value) => value.replace(/-+|\$\s?|(,*)/g, "")}
          placeholder={placeholder}
          suffix={suffix}
          disabled={disable}
          onChange={onHandlingEvent}
          className={`ntx-input tms-mr-5 tms-w100 tms-input-number ${classFilter}`}
        />
      );
    case "select":
      return (
        <div
          id={`getPopupContainer_${id}`}
          className={`tms-mr-5 ${classFilter}`}
        >
          <Select
            id={id}
            size="large"
            suffixIcon={suffixIcon}
            placeholder={placeholder}
            disabled={disable}
            style={{ width: width }}
            showSearch
            allowClear
            optionFilterProp="children"
            onChange={(val, o) => onHandlingEvent(val, o)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            getPopupContainer={() =>
              document.getElementById(`getPopupContainer_${id}`)
            }
          >
            {data.map((item, idx) => (
              <Option value={item[dataOption.value]} key={idx}>
                {item[dataOption.name]}
              </Option>
            ))}
          </Select>
        </div>
      );
    case "datePicker":
      return (
        <DatePicker
          id={id}
          suffixIcon={calendar}
          className={`date-picker ntx-date tms-mr-5 ${classFilter}`}
          placeholder={placeholder}
          disabled={disable}
          onChange={onHandlingEvent}
          format={Constants.dateFormat}
        />
      );
    case "rangePicker":
      return (
        <RangePicker
          id={id}
          suffixIcon={calendar}
          className={`tms-w-150-230 tms-picker-40 tms-datepicker tms-icon-align-center tms-mr-5 ${classFilter}`}
          placeholder={placeholder}
          disabled={disable}
          onChange={onHandlingEvent}
          format={Constants.dateFormat}
        />
      );
    case "rangePickerSelect":
      return (
        <>
          <div id="select_selectDate" className="b-r-7 tms-mr-5">
            <Select
              size="large"
              className="tms-w-100-120"
              id="filterTrip2_select_selectDate"
              getPopupContainer={() =>
                document.getElementById("select_selectDate")
              }
              onChange={dateChange}
              suffixIcon={suffixIcon}
              defaultValue={
                props.isNotDefaultDate
                  ? Constants.arrSelectDate[6].key
                  : Constants.arrSelectDate[0].key
              }
            >
              {Constants.arrSelectDate.map((option) => {
                return <Option value={option.key}>{option.title}</Option>;
              })}
            </Select>
          </div>
          <RangePicker
            id={id}
            className={`b-r-7 tms-mr-5 tms-w-150-230 tms-picker-40 tms-datepicker tms-icon-align-center ${classFilter}`}
            disabled={disabled}
            value={timeValue}
            onChange={onHandlingEvent}
            format={Constants.dateFormat}
          />
        </>
      );
    case "button":
      return (
        <Button
          size="large"
          id={id}
          onClick={onHandlingEvent}
          className={`btn-excel tms-mr-5 ${classFilter}`}
        >
          {icon} {name}
        </Button>
      );
    default:
      return <div></div>;
  }
};
