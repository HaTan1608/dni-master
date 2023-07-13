/* eslint-disable */
import { Row, Col } from "antd";
import FormSelect from "src/components/form/FormSelect";
import FormInput from "src/components/form/FormInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import {
  getListBank,
  getListBranchBank,
} from "src/services/actions/masterData.actions";
import {
  selectOptionsValueBank,
  selectOptionsValueBranchBank,
} from "src/pages/profile/components/data";
import {
  getListDistrict,
  getListWard,
} from "src/services/actions/masterData.actions";
import {
  selectOptionsValueDistrict,
  selectOptionsValueProvince,
  selectOptionsValueWard,
} from "./data";
import FormInputNumber from "src/components/form/FormInputNumber";

const ContractForm = (props: any) => {
  const { isCreate, data, form, tab, keyTab } = props;

  const dispatch = useDispatch();
  const isMount = useIsMount();

  const [banks, setBanks] = useState<any>([]);
  const [branchBanks, setBranchBanks] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);

  const {
    stateProvince,
    stateDistrict,
    stateWard,
    stateBanks,
    stateBranchBanks,
  } = useSelector((state: AppState) => state.masterDataReducer);

  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    loadListBank();
    form.getFieldValue("bank_id") &&
      loadListBranchBank(form.getFieldValue("bank_id"));
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateBanks;
    if (success) {
      setBanks(data.banks);
    }
  }, [stateBanks.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateBranchBanks;
    if (success) {
      setBranchBanks(data.bankBranchs);
    }
  }, [stateBranchBanks.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateDistrict;
    if (success && tab === keyTab) {
      setDistricts([...data.districts]);
    }
  }, [stateDistrict.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateWard;
    if (success && tab === keyTab) {
      setWards([...data.wards]);
    }
  }, [stateWard.isLoading]);

  useEffect(() => {
    const { data, message, success, isLoading, error } = stateProvince;
    if (success) {
      setProvinces(data.provinces);
    }
    if (!isCreate && form.getFieldValue("province_id_2") && tab === keyTab) {
      loadListDistrict(form.getFieldValue("province_id_2"));
      loadListWard(form.getFieldValue("district_id_2"));
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

  const onChangeBank = (bank_id: any) => {
    const _name = banks.find((e: any) => e.id === bank_id);
    _name &&
      form.setFieldsValue({
        bank_name: _name.bank_name,
      });
    setBranchBanks([]);
    form.setFieldsValue({
      brank_branch_id: undefined,
    });
    loadListBranchBank(bank_id);
  };

  const onChangeBranchBank = (branch_bank_id: any) => {
    const _name = branchBanks.find((e: any) => e.id === branch_bank_id);
    _name &&
      form.setFieldsValue({
        brank_branch_name: _name.branch_name,
      });
  };

  const onChangeProvice = (province_id: any) => {
    setDistricts([]);
    setWards([]);
    form.setFieldsValue({
      district_id_2: undefined,
      ward_id_2: undefined,
    });
    loadListDistrict(province_id);
    // const _name = provinces.find((e: any) => e.id === province_id);
    // _name && form.setFieldsValue({
    //   province_name: _name.province_name,
    // });
  };
  const onChangeDistrict = (district_id: any) => {
    setWards([]);
    form.setFieldsValue({
      ward_id_2: undefined,
    });
    loadListWard(district_id);
    // const _name = districts.find((e: any) => e.id === district_id);
    // _name && form.setFieldsValue({
    //   district_name: _name.district_name,
    // });
  };

  const loadListBank = () => {
    dispatch(getListBank());
  };

  const loadListBranchBank = (bank_id: number) => {
    dispatch(getListBranchBank({ bank_id }));
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div>
      <Row className="w-full mt-3" gutter={8}>
        <Col span={8}>
          <FormInput
            id="form-tax_code"
            name="tax_code"
            label="Mã số thuế"
            type="text"
            size="small"
            placeholder="Nhập mã số thuế"
            classItem="mb-0"
          />
        </Col>
        <Col span={8}>
          <FormInput
            id="form-other_name"
            name="other_name"
            label="Họ tên người đại diện pháp lý"
            type="text"
            size="small"
            placeholder="Nhập tên người đại diện pháp lý"
            classItem="mb-0"
          />
        </Col>
        <Col span={8}>
          <FormInput
            id="form-phone2"
            name="phone2"
            label="Số điện thoại"
            type="phone"
            size="small"
            placeholder="Nhập số điện thoại"
            classItem="mb-0"
          />
        </Col>
      </Row>

      <p className="text-16 font-medium mt-3">
        Thông tin thuế & chuyển khoản ngân hàng
      </p>
      <Row className="w-full mt-3" gutter={8}>
        <Col span={6}>
          <FormSelect
            name="bank_id"
            label="Ngân hàng"
            dataSource={banks}
            placeholder="Chọn ngân hàng"
            slOption={selectOptionsValueBank}
            onChange={onChangeBank}
            showSearch
            optionFilterProp="children"
          />
        </Col>
        <Col span={6}>
          <FormInput
            id="form-bank_account_name"
            name="bank_account_name"
            label="Tên chủ khoản"
            type="text"
            size="small"
            placeholder="Nhập tên chủ khoản"
            classItem="mb-0"
          />
        </Col>
        <Col span={6}>
          <FormInputNumber
            id="form-bank_account_number"
            name="bank_account_number"
            label="Số tài khoản ngân hàng"
            type="text"
            // size="middle"
            placeholder="Nhập số tài khoản ngân hàng"
            classItem="mb-0"
            classInput="w-full h-10 rounded-md"
          />
        </Col>
        <Col span={6}>
          <FormSelect
            name="brank_branch_id"
            label="Chi nhánh ngân hàng"
            dataSource={branchBanks}
            placeholder="Chọn chi nhánh"
            slOption={selectOptionsValueBranchBank}
            onChange={onChangeBranchBank}
            showSearch
            optionFilterProp="children"
          />
        </Col>
      </Row>
      <p className="text-16 font-medium mt-3">Địa chỉ công ty</p>
      <Row className="w-full mt-3" gutter={8}>
        <Col span={8}>
          <FormSelect
            name="province_id_2"
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
            name="district_id_2"
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
            name="ward_id_2"
            label="Phường xã"
            dataSource={wards}
            placeholder="Chọn phường xã"
            slOption={selectOptionsValueWard}
            // onChange={onChangeWard}
            showSearch
            optionFilterProp="children"
          />
        </Col>
        <Col span={24}>
          <FormInput
            id="form-address_2"
            name="address_2"
            label="Địa chỉ"
            size="small"
            type="text"
            placeholder="Nhập địa chỉ"
          />
        </Col>
      </Row>
    </div>
  );

  /**************************** END **************************/
};

export default ContractForm;
