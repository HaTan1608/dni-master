/* eslint-disable */
import { Row, Col, Select,  Modal, } from "antd";
import {  dataOptionsStatus } from "src/constants";
import colors from "src/utils/colors";
import arrow from "src/assets/images/arrow.svg";
import CustomTable from "src/components/table/CustomTable";
import { useEffect, useState } from "react";
import { columnsData, defaultFilter } from "./data";
import { IParamsFilter } from "./interfaces";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import CustomerAddressCreateForm from "./customerAddressCreateForm";
import { useDispatch, useSelector } from "react-redux";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { AppState } from "src/types";
import { notifyError, notifySuccess } from "src/components/notification";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import {
  getListCustomerAddress,
  updateOneCustomerAddress,
} from "src/services/actions/customerAddress.actions";

const CustomerAddressForm = (props: any) => {
  const dispatch = useDispatch();
  const isMount = useIsMount();

  const [isCreate, setIscreate] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);
  const [customerAddress, setCustomerAddresss] = useState([]);
  const [wsId, setWhId] = useState(0);
  const [paging, setPaging] = useState<object>({});
  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);

  const { stateGetListCustomerAddress, stateUpdateOneCustomerAddress } =
    useSelector((state: AppState) => state.customerAddressReducer);

  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListCustomerAddress();
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, data } = stateGetListCustomerAddress;
    if (success) {
      setCustomerAddresss(data.listCustomerAddress);
      setPaging(data.paging);
    }
  }, [stateGetListCustomerAddress.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateUpdateOneCustomerAddress;
    if (success && !flag) {
      notifySuccess(message || "");
      loadListCustomerAddress();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneCustomerAddress.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const loadListCustomerAddress = (isDefault = false) => {
    const _paramsListCustomerAddress = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(defaultFilter);
    }
    dispatch(
      getListCustomerAddress({
        status: _paramsListCustomerAddress.status,
        page: _paramsListCustomerAddress.currentPage,
        limit: _paramsListCustomerAddress.sizePage,
        search: _paramsListCustomerAddress.q,
      })
    );
    setCustomerAddresss([]);
  };

  const btnChangeStatus = (params: any) => {
    dispatch(
      updateOneCustomerAddress(params.data.id, {
        ws_code: params.data.ws_code,
        is_main: params.data.is_main,
        status: params.status ? "A" : "D",
      })
    );
    setCustomerAddresss([]);
  };
  const btnChangeIsMain = (params: any) => {
    dispatch(
      updateOneCustomerAddress(params.data.id, {
        ws_code: params.data.ws_code,
        status: params.data.status,
        is_main: params.is_main ? 1 : 0,
      })
    );
    setCustomerAddresss([]);
  };

  const btnVisbleUpdate = (data: any) => {
    setIscreate(false);
    setVisible(true);
    setFlag(true);
    setWhId(data.id);
  };

  const btnVisbleCreate = () => {
    setIscreate(true);
    setVisible(true);
    setWhId(0);
  };

  const onChangeTable = (page: any) => {
    const _filter = {
      ...paramsFilter,
      currentPage: page.current,
      sizePage: page.pageSize,
      isDispatch: true,
    };
    setParamsFilter(_filter);
  };

  const onFinish = () => {
    setVisible(false);
    loadListCustomerAddress(true);
    setFlag(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      loadListCustomerAddress();
    }
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderSearch = () => {
    return (
      <div className="flex mb-4">
        {visible && (
          <Modal
            visible={visible}
            // maskClosable={false}
            title={isCreate ? "Thêm địa chỉ" : "Chỉnh sửa địa chỉ"}
            onCancel={() => setVisible(false)}
            footer={false}
            width="70%"
          >
            <CustomerAddressCreateForm
              isCreate={isCreate}
              wsId={wsId}
              onFinish={onFinish}
            />
          </Modal>
        )}
        <div className="w-full">
          <Row gutter={[10, 0]}>
            <Col span={12}>
              {/* <Input
                onChange={(e) => setParamsFilter({
                  ...paramsFilter,
                  q: e.target.value
                })}
                placeholder='Mã địa chỉ, tên địa chỉ'
                size='small'
                prefix={<SvgIconSearch/>}
              /> */}
            </Col>
            {/* <Col span={5}>
              <DatePicker.RangePicker className="w-full" size='large'/>
            </Col> */}
            <Col span={4}>
              <Select
                allowClear
                onChange={(val) =>
                  setParamsFilter({
                    ...paramsFilter,
                    status: val,
                  })
                }
                size="large"
                suffixIcon={<img src={arrow} alt="" />}
                placeholder="Trạng thái"
                className="w-full"
              >
                {dataOptionsStatus.map((e) => {
                  return (
                    <Select.Option value={e.value} key={e.value}>
                      {e.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <ButtonTMS
                type="light"
                className="w-full bg-neutral_color_1_6"
                icon="search"
                fillIcon={colors.neutral_color_1_4}
                onClick={() => handleKeyDown({ key: "Enter" })}
              >
                <span className="text-neutral_color_1_3">Tìm kiếm</span>
              </ButtonTMS>
            </Col>

            <Col span={4}>
              <ButtonTMS
                type="primary"
                className="w-full bg-neutral_color_1_6"
                icon="plus"
                fillIcon={colors.neutral_color_1_8}
                onClick={btnVisbleCreate}
              >
                <span className="text-neutral_color_1_8">Thêm địa chỉ</span>
              </ButtonTMS>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  const _renderTable = () => {
    return (
      <CustomTable
        rowKey={"id"}
        bordered
        isRowLight={true}
        paging={paging}
        columns={columnsData({
          btnChangeStatus,
          btnChangeIsMain,
          btnOpenModal: btnVisbleUpdate,
        })}
        dataSource={customerAddress}
        // rowSelection={{
        //   type: 'checkbox',
        //   ...rowSelection,
        // }}
        loading={false}
        pagination={true}
        onChange={onChangeTable}
      />
    );
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className="mt-3 mb-3">
      {_renderSearch()}
      {_renderTable()}
    </div>
  );

  /**************************** END **************************/
};

export default CustomerAddressForm;
