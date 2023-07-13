/* eslint-disable */
import { Row, Col, Form, Input,Spin } from "antd";
import FormSelect from "src/components/form/FormSelect";
import FormInput from "src/components/form/FormInput";
import {
  dataGroupCustomer,
  dataTypeCustomer,
  selectOptionsValue,
} from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import {
  selectOptionsValueProvince,
  selectOptionsValueDistrict,
  selectOptionsValueWard,
} from "./data";
import {
  getListDistrict,
  getListWard,
} from "src/services/actions/masterData.actions";
import { useEffect, useState } from "react";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { genCodeCustomerById, getListCustomerGroup } from "src/services/actions/customer.actions";
import { notifyError } from "src/components/notification";

const InfoForm = (props: any) => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const { isCreate, dataUser, form, tab, keyTab,spin } = props;
  const { stateProvince, stateDistrict, stateWard } = useSelector(
    (state: AppState) => state.masterDataReducer
  );
  const { stateGenCodeCustomerById } = useSelector(
    (e: AppState) => e.customerReducer
  );
  const { stateGetCustomerGroup } = useSelector(
    (e: AppState) => e.customerReducer
  );
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);
  const [loading, setLoading] = useState<any>(spin);
  const [customerGroups, setCustomerGroups] = useState<any>([]);
  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    if (isCreate) setLoading(false);
    dispatch(getListCustomerGroup({}))
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateDistrict;
    if (success && tab === keyTab) {
      setDistricts(data.districts);
    }
  }, [stateDistrict.isLoading, tab]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateWard;
    if (success && tab === keyTab) {
      setWards(data.wards);
    }
  }, [stateWard.isLoading, tab]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
      stateGenCodeCustomerById;
    if (success) {
      form.setFieldsValue({
        customer_code: data.customer.customer_code,
      });
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateGenCodeCustomerById.isLoading]);
  //
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } =
    stateGetCustomerGroup;
    if (data) {
      const _newData=data.customerGroups.map((item:any)=>{
        return {
          name:item.description,
          value:item.id,
          customer_group:item.customer_group,
        }
      })
      setCustomerGroups(_newData)
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateGetCustomerGroup.isLoading]);
  useEffect(() => {
    const { data, message, success, isLoading, error } = stateProvince;
    if (success) {
      setProvinces(data.provinces);
    }
    if (!isCreate && form.getFieldValue("province_id") && tab === keyTab) {
      loadListDistrict(form.getFieldValue("province_id"));
      loadListWard(form.getFieldValue("district_id"));
      setLoading(false)
    }
  }, [tab]);
  

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const loadListDistrict = (province_id: number) => {
    dispatch(getListDistrict({ province_id }));
  };
  const loadListWard = (district_id: number) => {
    dispatch(getListWard({ district_id }));
  };

  const onChangeProvice = (province_id: any) => {
    setDistricts([]);
    setWards([]);
    form.setFieldsValue({
      district_id: undefined,
      ward_id: undefined,
    });
    loadListDistrict(province_id);
    const _name = provinces.find((e: any) => e.id === province_id);
    _name &&
      form.setFieldsValue({
        province_name: _name.province_name,
      });
  };
  const onChangeDistrict = (district_id: any) => {
    setWards([]);
    form.setFieldsValue({
      ward_id: undefined,
    });
    loadListWard(district_id);
    const _name = districts.find((e: any) => e.id === district_id);
    _name &&
      form.setFieldsValue({
        district_name: _name.district_name,
      });
  };
  const onChangeWard = (ward_id: any) => {
    const _name = wards.find((e: any) => e.id === ward_id);
    _name &&
      form.setFieldsValue({
        ward_name: _name.ward_name,
      });
  };

  const openGenCodeCustomer = () => {
    if (!isCreate) {
      dispatch(genCodeCustomerById(dataUser.id));
    }
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div>
      <Spin spinning={loading}>
      <Row className="w-full mt-3" gutter={8}>
        <Form.Item
          label="Tên tỉnh thành"
          name="province_name"
          hidden
        ><Input/></Form.Item>
        <Form.Item
          label="Tên quận huyện"
          name="district_name"
          hidden
        ><Input/></Form.Item>
        <Form.Item label="Tên phường xã" name="ward_name" hidden><Input/></Form.Item>
        <Form.Item label="Tên ngân hàng" name="bank_name" hidden><Input/></Form.Item>
        <Form.Item
          label="Tên chi nhánh ngân hàng"
          name="brank_branch_name"
          hidden
        ><Input/></Form.Item>
        <Col span={6}>
          <Form.Item label="Mã khách hàng">
            <Row gutter={6}>
              <Col span={24}>
                <FormInput
                  id="form-customer_code"
                  name="customer_code"
                  type="text"
                  size="small"
                  placeholder="Mã khách hàng"
                  classItem="mb-0"
                />
              </Col>
              
            </Row>
          </Form.Item>
        </Col>
        <Col span={6}>
          <FormSelect
            id="form-customer_group_id"
            name="customer_group_id"
            label="Nhóm khách hàng"
            dataSource={customerGroups}
            placeholder="Chọn nhóm khách hàng"
            slOption={selectOptionsValue}
            onChange={(e,values)=>props.getCustomerCode(e,values.obj)}
          />
        </Col>
        <Col span={6}>
          <FormSelect
            id="form-customer_type_id"
            name="customer_type_id"
            label="Loại khách hàng"
            dataSource={dataTypeCustomer}
            placeholder="Chọn loại khách hàng"
            slOption={selectOptionsValue}
          />
        </Col>
        <Col span={6}>
          <FormInput
            id="form-customer_name"
            name="customer_name"
            label="Tên tài khoản"
            type="text"
            size="small"
            placeholder="Nhập tên tài khoản"
            classItem="mb-0"
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            id="form-email"
            name="email"
            label="Email"
            type="email"
            placeholder="Nhập email"
            size="small"
            disabled={isCreate ? false : true}
            classItem="mb-0"
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            id="form-phone"
            name="phone"
            label="Số điện thoại"
            type="phone"
            placeholder="Nhập số điện thoại"
            disabled={isCreate ? false : true}
            classItem="mb-0"
            size="small"
            required
          />
        </Col>
      </Row>

      <p className="text-16 font-medium mt-3">Thông tin địa chỉ</p>
      <Row className="w-full mt-3" gutter={8}>
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
          />
        </Col>
        <Col span={24}>
          <FormInput
            id="form-address"
            name="address"
            label="Địa chỉ"
            size="small"
            type="text"
            placeholder="Nhập địa chỉ"
          />
        </Col>
      </Row>
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default InfoForm;
