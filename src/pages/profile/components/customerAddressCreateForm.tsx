/* eslint-disable */
import { Row, Col, Form, Spin, Input, } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import { notifyError, notifySuccess } from "src/components/notification";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import FormSelect from "src/components/form/FormSelect";
import FormInput from "src/components/form/FormInput";
import FormSwitch from "src/components/form/FormSwitch";
import FormCheckBox from "src/components/form/FormCheckBox";
import {
  getListDistrict,
  getListWard,
} from "src/services/actions/masterData.actions";
import {
  selectOptionsValueDistrict,
  selectOptionsValueProvince,
  selectOptionsValueWard,
} from "./data";
import {
  createOneCustomerAddress,
  getCustomerAddressById,
  updateOneCustomerAddress,
} from "src/services/actions/customerAddress.actions";

const CustomerAddressCreateForm = (props: any) => {
  const { isCreate, wsId } = props;

  const dispatch = useDispatch();
  const isMount = useIsMount();
  // const refForm = createRef<FormInstance>();
  const [wsForm] = Form.useForm();
  const [dataCustomerAddress, setDataCustomerAddress] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);

  const { stateUpdateOneCustomerAddress, stateCreateOneCustomerAddress, stateGetCustomerAddressById } = useSelector((e: AppState) => e.customerAddressReducer);
  const { stateProvince, stateDistrict, stateWard } = useSelector((state: AppState) => state.masterDataReducer);

  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    if (!isCreate && wsId) {
      loadCustomerAddress(wsId);
    }
  }, []);

  useEffect(() => {
    const { data, success } = stateGetCustomerAddressById;
    if (success) {
      setDataCustomerAddress(data.customerAddress);
    }
  }, [stateGetCustomerAddressById.isLoading]);

  useEffect(() => {
    wsForm.setFieldsValue({
      status: !isCreate ? (dataCustomerAddress.status === 'A' ? true : false) : true,
      province_id: !isCreate && dataCustomerAddress.province_id ? dataCustomerAddress.province_id : undefined,
      district_id: !isCreate && dataCustomerAddress.district_id ? dataCustomerAddress.district_id : undefined,
      ward_id: !isCreate && dataCustomerAddress.ward_id ? dataCustomerAddress.ward_id : undefined,
      address: !isCreate && dataCustomerAddress.address ? dataCustomerAddress.address : '',
      is_main: !isCreate && dataCustomerAddress.is_main ? true : false,
    })
    if (!isCreate && dataCustomerAddress.province_id) {
      loadListDistrict(dataCustomerAddress.province_id)
    }
    if (!isCreate && dataCustomerAddress.district_id) {
      loadListWard(dataCustomerAddress.district_id)
    }
  }, [dataCustomerAddress]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateCreateOneCustomerAddress;
    if (success) {
      notifySuccess(message || "");
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateCreateOneCustomerAddress.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateUpdateOneCustomerAddress;
    if (success) {
      notifySuccess(message || "");
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneCustomerAddress.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateDistrict;
    if (success) {
      setDistricts(data.districts);
    }
  }, [stateDistrict.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateWard;
    if (success) {
      setWards(data.wards);
    }
  }, [stateWard.isLoading]);

  useEffect(() => {
    const { data, success } = stateProvince;
    if (success) {
      setProvinces(data.provinces);
    }
  }, []);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const submitForm = (values: any) => {
    const _paramsCustomerAddress = {
      is_main: values.is_main ? 1 : 0,
      province_id: values.province_id,
      province_name: values.province_name,
      district_id: values.district_id,
      district_name: values.district_name,
      ward_id: values.ward_id,
      ward_name: values.ward_name,
      address: values.address,

      status: values.status ? 'A' : 'D',
    }
    dispatch(isCreate ? createOneCustomerAddress(_paramsCustomerAddress) : updateOneCustomerAddress(dataCustomerAddress.id, _paramsCustomerAddress));
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loadCustomerAddress = (id: number) => {
    dispatch(getCustomerAddressById(id));
  }

  const loadListDistrict = (province_id: number) => {
    dispatch(getListDistrict({ province_id }));
  }
  const loadListWard = (district_id: number) => {
    dispatch(getListWard({ district_id }));
  }

  const onChangeProvice = (province_id: any) => {
    setDistricts([]);
    setWards([]);
    wsForm.setFieldsValue({
      district_id: undefined,
      ward_id: undefined,
    });
    loadListDistrict(province_id);
    const _name = provinces.find((e: any) => e.id === province_id);
    _name &&
      wsForm.setFieldsValue({
        province_name: _name.province_name,
      });
  };
  const onChangeDistrict = (district_id: any) => {
    setWards([]);
    wsForm.setFieldsValue({
      ward_id: undefined,
    });
    loadListWard(district_id);
    const _name = districts.find((e: any) => e.id === district_id);
    _name &&
      wsForm.setFieldsValue({
        district_name: _name.district_name,
      });
  };
  const onChangeWard = (ward_id: any) => {
    const _name = wards.find((e: any) => e.id === ward_id);
    _name &&
      wsForm.setFieldsValue({
        ward_name: _name.ward_name,
      });
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderContent = () => {
    return (
      <div className='w-full bg-white'>
        <Form.Item label='Tên tỉnh thành' name="province_name" hidden><Input /></Form.Item>
        <Form.Item label='Tên quận huyện' name="district_name" hidden><Input /></Form.Item>
        <Form.Item label='Tên phường xã' name="ward_name" hidden><Input /></Form.Item>
        <p className='text-16 font-medium'>Thông tin tài khoản</p>
        <Row className='w-full mt-3' gutter={8}>
          <Col span={8}>
            <FormSelect
              name="province_id"
              label="Tỉnh thành"
              dataSource={provinces}
              placeholder="Chọn tỉnh thành"
              slOption={selectOptionsValueProvince}
              onChange={onChangeProvice}
              showSearch
              optionFilterProp="children"
              required
            />
          </Col>
          <Col span={8}>
            <FormSelect
              name="district_id"
              label="Quận huyện"
              dataSource={districts}
              placeholder="Chọn quận huyện"
              slOption={selectOptionsValueDistrict}
              onChange={onChangeDistrict}
              showSearch
              optionFilterProp="children"
              required
            />
          </Col>
          <Col span={8}>
            <FormSelect
              name="ward_id"
              label="Phường xã"
              dataSource={wards}
              placeholder="Chọn phường xã"
              slOption={selectOptionsValueWard}
              onChange={onChangeWard}
              showSearch
              optionFilterProp="children"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormInput
              id="form-address"
              name="address"
              label="Địa chỉ"
              size="small"
              type="text"
              placeholder="Nhập địa chỉ"
              required
            />
          </Col>
        </Row>
        <Row className="w-full" gutter={8}>
          <Col span={24}>
            <FormCheckBox name="is_main" children="Đặt làm địa chỉ mặc định" />
          </Col>
        </Row>
        <Row>
          <Col span={12} className="flex">
            <span className="text-16 font-medium mr-2">
              Trạng thái hoạt động
            </span>
            <FormSwitch
              name="status"
              checkedChildren="Bật"
              unCheckedChildren="Tắt"
            />
          </Col>
          <Col span={12} className="text-right">
            <ButtonTMS
              id="form-button-signin"
              type="tms"
              htmlType="submit"
              icon="storage"
              loading={
                isCreate
                  ? stateCreateOneCustomerAddress.isLoading
                  : stateUpdateOneCustomerAddress.isLoading
              }
            >
              Lưu
            </ButtonTMS>
          </Col>
        </Row>
      </div>
    );
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className="w-full h-full pl-4 pr-4">
      <Form
        name="formUserSystem"
        requiredMark={false}
        layout="vertical"
        onFinish={submitForm}
        onFinishFailed={onFinishFailed}
        form={wsForm}
      >
        <Spin
          spinning={
            (!isCreate && stateGetCustomerAddressById.isLoading) || false
          }
        >
          {_renderContent()}
        </Spin>
      </Form>
    </div>
  );

  /**************************** END **************************/
};

export default CustomerAddressCreateForm;
