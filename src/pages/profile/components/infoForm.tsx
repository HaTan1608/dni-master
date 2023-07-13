/* eslint-disable */
import { Row, Col, Form, Input, } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import { notifyError, notifySuccess } from "src/components/notification";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import FormSelect from "src/components/form/FormSelect";
import FormInput from "src/components/form/FormInput";
import { updateOneUserSystem } from "src/services/actions/user.actions";
import { dataGroupCustomer, dataTypeCustomer, selectOptionsValue } from "src/constants";
import { IFormInfoProfile } from "./interfaces";
import { localGetAccount } from "src/utils/localStorage";
import ChangePass from "./changePassForm";
import { updateOneCustomer } from "src/services/actions/customer.actions";
import {
  getListBranchBank,
  getListDistrict,
  getListWard,
} from "src/services/actions/masterData.actions";
import {
  selectOptionsValueBank,
  selectOptionsValueBranchBank,
  selectOptionsValueDistrict,
  selectOptionsValueProvince,
  selectOptionsValueWard,
} from "./data";
import { putSignIn } from "src/services/actions/global.actions";

const InfoProfileForm = (props: any) => {
  const { tab, keyTab } = props;
  const dispatch = useDispatch();
  const isMount = useIsMount();

  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataCustomer, setDataCustomer] = useState<any>({});;
  // const refForm = createRef<FormInstance>();
  const [profileForm] = Form.useForm();
  const [provinces, setProvinces] = useState<any>([]);
  const [banks, setBanks] = useState<any>([]);
  const [branchBanks, setBranchBanks] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);

  const { stateUpdateOneUserSystem } = useSelector((e: AppState) => e.userReducer);
  const { stateGetCustomerById, stateUpdateOneCustomer } = useSelector((e: AppState) => e.customerReducer);
  const { stateProvince, stateDistrict, stateWard, stateBanks, stateBranchBanks } = useSelector((state: AppState) => state.masterDataReducer);

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    if (isMount) return;
    profileForm.setFieldsValue({
      customer_code: dataCustomer.customer_code
        ? dataCustomer.customer_code
        : undefined,
      customer_group_id: dataCustomer.customer_group_id,
      customer_type_id: dataCustomer.customer_type_id,
      customer_name: dataCustomer.full_name,
      phone: dataCustomer.phone,
      email: dataCustomer.email,
      province_id: dataCustomer.province_id || undefined,
      district_id: dataCustomer.district_id || undefined,
      ward_id: dataCustomer.ward_id || undefined,
      address: dataCustomer.address,
      tax_code: dataCustomer.tax_code,
      bank_id: dataCustomer.bank_id,
      // bank_name: dataCustomer.bank_name,
      bank_account_name: dataCustomer.bank_account_name,
      bank_account_number: dataCustomer.bank_account_number,
      brank_branch_id: dataCustomer.brank_branch_id,
      // brank_branch_name: dataCustomer.brank_branch_name,
    });
    dataCustomer.province_id && loadListDistrict(dataCustomer.province_id);
    dataCustomer.district_id && loadListWard(dataCustomer.district_id);
    dataCustomer.bank_id && loadListBranchBank(dataCustomer.bank_id);
  }, [dataCustomer]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateBranchBanks;
    if (success) {
      setBranchBanks(data.bankBranchs);
    }
  }, [stateBranchBanks.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateGetCustomerById;
    if (success) {
      setDataCustomer(data.customer);
    }
  }, [stateGetCustomerById.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateUpdateOneUserSystem;
    if (success) {
      setLoading(false)
      notifySuccess(message || '');
      //   props.onFinish()
    }
    if (success === false || error) {
      setLoading(false);
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneUserSystem.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateUpdateOneCustomer;
    if (success) {
      setLoading(false)
      notifySuccess(message || '');
      //   props.onFinish()
    }
    if (success === false || error) {
      setLoading(false);
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneCustomer.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateDistrict;
    if (success && (tab === keyTab)) {
      setDistricts(data.districts);
    }
  }, [stateDistrict.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateWard;
    if (success && (tab === keyTab)) {
      setWards(data.wards);
    }
  }, [stateWard.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateProvince;
    if (success) {
      setProvinces(data.provinces);
    }
  }, [stateProvince.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateBanks;
    if (success) {
      setBanks(data.banks);
    }
  }, [stateBanks.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const submitForm = (values: IFormInfoProfile) => {
    const _paramsUser = {
      // ...values,
      customer_name: values.customer_name.trim(),
      full_name: values.customer_name.trim(),
      tax_code: values.tax_code,
      bank_id: values.bank_id,
      bank_name: values.bank_name,
      brank_branch_id: values.brank_branch_id,
      brank_branch_name: values.brank_branch_name,
      bank_account_name: values.bank_account_name,
      bank_account_number: values.bank_account_number,
      province_id: values.province_id,
      district_id: values.district_id,
      ward_id: values.ward_id,
      address: values.address,
      province_name: values.province_name,
      district_name: values.district_name,
      ward_name: values.ward_name,
      customer_group_id: values.customer_group_id,
      customer_type_id: values.customer_type_id,
      phone: values.phone,
      email: values.email,
    };
    // delete _paramsUser.customer_code
    setLoading(true)
    if (dataCustomer.customer_id > 0) {
      dispatch(updateOneCustomer(dataCustomer.customer_id, _paramsUser))
    } else {
      dispatch(updateOneUserSystem(dataCustomer.id, _paramsUser))
    }
  };

  const loadListDistrict = (province_id: number) => {
    dispatch(getListDistrict({ province_id }));
  }
  const loadListWard = (district_id: number) => {
    dispatch(getListWard({ district_id }));
  }

  const loadListBranchBank = (bank_id: number) => {
    dispatch(getListBranchBank({ bank_id }));
  }

  const onChangeProvice = (province_id: any) => {
    setDistricts([]);
    setWards([]);
    profileForm.setFieldsValue({
      district_id: undefined,
      ward_id: undefined,
    });
    loadListDistrict(province_id);
    const _name = provinces.find((e: any) => e.id === province_id);
    _name &&
      profileForm.setFieldsValue({
        province_name: _name.province_name,
      });
  };
  const onChangeDistrict = (district_id: any) => {
    setWards([]);
    profileForm.setFieldsValue({
      ward_id: undefined,
    });
    loadListWard(district_id);
    const _name = districts.find((e: any) => e.id === district_id);
    _name &&
      profileForm.setFieldsValue({
        district_name: _name.district_name,
      });
  };
  const onChangeWard = (ward_id: any) => {
    const _name = wards.find((e: any) => e.id === ward_id);
    _name &&
      profileForm.setFieldsValue({
        ward_name: _name.ward_name,
      });
  };
  const onChangeBank = (bank_id: any) => {
    const _name = banks.find((e: any) => e.id === bank_id);
    _name &&
      profileForm.setFieldsValue({
        bank_name: _name.bank_name,
      });
    setBranchBanks([]);
    profileForm.setFieldsValue({
      brank_branch_id: undefined,
    });
    loadListBranchBank(bank_id);
  };

  const onChangeBranchBank = (branch_bank_id: any) => {
    const _name = branchBanks.find((e: any) => e.id === branch_bank_id);
    _name &&
      profileForm.setFieldsValue({
        brank_branch_name: _name.branch_name,
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const openChangePass = () => {
    setVisiblePass(true);
  };

  const onFinishChangePass = () => {
    setVisiblePass(false);
    dispatch(putSignIn(false));
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
        <Form.Item label='Tên ngân hàng' name="bank_name" hidden><Input /></Form.Item>
        <Form.Item label='Tên chi nhánh ngân hàng' name="brank_branch_name" hidden><Input /></Form.Item>
        {
          dataCustomer.customer_id > 0 &&
          (<Row className='w-full mt-3' gutter={8}>
            <Col span={6}>
              <FormInput
                id="form-customer_code"
                name="customer_code"
                label="Mã khách hàng"
                placeholder="Mã khách hàng chỉ dành cho đối tác"
                type="text"
                size="small"
                classItem="mb-0"
                disabled
              />
            </Col>
            <Col span={6}>
              <FormSelect
                name="customer_group_id"
                label="Nhóm khách hàng"
                dataSource={dataGroupCustomer}
                placeholder="Chọn nhóm khách hàng"
                slOption={selectOptionsValue}
                disabled
              />
            </Col>
            <Col span={6}>
              <FormSelect
                id='form-customer_type_id'
                name="customer_type_id"
                label="Loại khách hàng"
                dataSource={dataTypeCustomer}
                placeholder="Chọn loại khách hàng"
                slOption={selectOptionsValue}
                disabled
              />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        <Row className="w-full mt-3" gutter={8}>
          <Col span={6}>
            <FormInput
              id="form-customer_name"
              name="customer_name"
              label="Tên khách hàng"
              type="text"
              size="small"
              placeholder="Nhập tên"
              classItem="mb-0"
              required
            />
          </Col>
          <Col span={6}>
            <FormInput
              id="form-email"
              name="email"
              label="Email"
              type="email"
              size="small"
              placeholder="Nhập email"
              disabled
              classItem="mb-0"
            />
          </Col>
          <Col span={12}>
            <Form.Item label="Số điện thoại">
              <Row gutter={6}>
                <Col span={12}>
                  <FormInput
                    id="form-phone"
                    name="phone"
                    type="phone"
                    size="small"
                    placeholder="Nhập số điện thoại"
                    disabled
                    classItem="mb-0"
                  />
                </Col>
                <Col span={12}>
                  <ButtonTMS
                    id="form-button-change-pass"
                    type="secondGreen"
                    icon="lock"
                    onClick={openChangePass}
                    //   loading={stateCreateOneUserSystem.isLoading}
                  >
                    Đổi mật khẩu
                  </ButtonTMS>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        {
          dataCustomer.customer_id > 0 &&
          (<>
            <p className='text-16 font-medium mt-3'>Thông tin thuế & chuyển khoản ngân hàng</p>
            <Row className='w-full mt-3' gutter={8}>
              <Col span={4}>
                <FormInput
                  id='form-tax_code'
                  name='tax_code'
                  label='Mã số thuế'
                  type='text'
                  size='small'
                  placeholder="Nhập mã số thuế"
                  classItem='mb-0'
                />
              </Col>
              <Col span={4}>
                <FormSelect
                  name="bank_id"
                  label='Ngân hàng'
                  dataSource={banks}
                  placeholder="Chọn ngân hàng"
                  slOption={selectOptionsValueBank}
                  onChange={onChangeBank}
                  showSearch
                  optionFilterProp='children'
                />
              </Col>
              <Col span={6}>
                <FormSelect
                  name="brank_branch_id"
                  label='Chi nhánh ngân hàng'
                  dataSource={branchBanks}
                  placeholder="Chọn chi nhánh"
                  slOption={selectOptionsValueBranchBank}
                  onChange={onChangeBranchBank}
                  showSearch
                  optionFilterProp='children'
                />
              </Col>
              <Col span={4}>
                <FormInput
                  id='form-bank_account_name'
                  name='bank_account_name'
                  label='Tên chủ khoản'
                  type='text'
                  size='small'
                  placeholder="Nhập tên chủ khoản"
                  classItem='mb-0'
                />
              </Col>
              <Col span={6}>
                <FormInput
                  id='form-bank_account_number'
                  name='bank_account_number'
                  label='Số tài khoản ngân hàng'
                  type='text'
                  size='small'
                  placeholder="Nhập số tài khoản"
                  classItem='mb-0'
                />
              </Col>
            </Row>
            <p className='text-16 font-medium mt-3'>Thông tin địa chỉ</p>
            <Row className='w-full mt-3' gutter={8}>
              <Col span={8}>
                <FormSelect
                  name="province_id"
                  label='Tỉnh thành'
                  dataSource={provinces}
                  placeholder="Chọn tỉnh thành"
                  slOption={selectOptionsValueProvince}
                  onChange={onChangeProvice}
                  showSearch
                  optionFilterProp='children'
                />
              </Col>
              <Col span={8}>
                <FormSelect
                  name="district_id"
                  label='Quận huyện'
                  dataSource={districts}
                  placeholder="Chọn quận huyện"
                  slOption={selectOptionsValueDistrict}
                  onChange={onChangeDistrict}
                  showSearch
                  optionFilterProp='children'
                />
              </Col>
              <Col span={8}>
                <FormSelect
                  name="ward_id"
                  label='Phường xã'
                  dataSource={wards}
                  placeholder="Chọn phường xã"
                  slOption={selectOptionsValueWard}
                  onChange={onChangeWard}
                  showSearch
                  optionFilterProp='children'
                />
              </Col>
              <Col span={24}>
                <FormInput
                  id='form-address'
                  name='address'
                  label='Địa chỉ'
                  type='text'
                  size='small'
                  placeholder="Nhập địa chỉ"
                  classItem='mb-0'
                />
              </Col>
            </Row>
          </>)
        }
        <Row>
          <Col span={24} className="text-right mt-3">
            <ButtonTMS
              id="form-button-signin"
              type="tms"
              htmlType="submit"
              icon="storage"
              loading={loading}
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
    <div className='w-full h-full pl-4 pr-4'>
      {
        visiblePass &&
        <ChangePass visible={visiblePass}
          onFinish={onFinishChangePass}
          onCancel={() => setVisiblePass(false)}
        />
      }
      <Form
        name="formUserSystem"
        requiredMark={false}
        layout='vertical'
        onFinish={submitForm}
        onFinishFailed={onFinishFailed}
        form={profileForm}
        className='mt-3'
        initialValues={{
          customer_group_id: 1
        }}
      >
        {_renderContent()}
      </Form>
    </div>
  );

  /**************************** END **************************/
};

export default InfoProfileForm;
