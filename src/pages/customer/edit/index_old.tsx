// import { CATEGORIES_MOCK } from "./json";
// import TableCate from "./TableCate";
/* eslint-disable */
import { Row, Col, Form, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonTMS from "src/components/buttons/ButtonTMS";
import { notifyError, notifySuccess } from "src/components/notification";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { IFormCustomer, IPropsCustomer } from "./interfaces";
import FormSwitch from "src/components/form/FormSwitch";
import InfoForm from "./infoForm";
import ContractForm from "./contractForm";
import { typeScreenFormCustomer } from "./data";
import WarehouseForm from "./warehouseForm";
import PriceForm from "./priceForm";
import "../list/styles.less";

const Customers = (props: IPropsCustomer) => {
  const { isCreate, data } = props;
  const [renderType, setRenderType] = useState(typeScreenFormCustomer.INFO);
  const isMount = useIsMount();

  const [allValuesForm, setAllValuesForm] = useState({});
  // const refForm = createRef<FormInstance>();
  const [customerForm] = Form.useForm();

  const { stateCreateOneCustomer, stateUpdateOneCustomer } = useSelector(
    (e: AppState) => e.customerReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateCreateOneCustomer;
    if (success) {
      notifySuccess(message || "");
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateCreateOneCustomer.isLoading]);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateUpdateOneCustomer;
    if (success) {
      notifySuccess(message || "");
      props.onFinish();
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneCustomer.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const submitForm = (values: IFormCustomer) => {
    // const _accountLocal = JSON.parse(accountLocal || '');
    // const _paramsUser = {
    //   full_name: values.fullname.trim(),
    //   email: values.email.trim(),
    //   phone: values.phone.trim(),
    //   // password: isCreate ? values.password.trim() : undefined,
    //   status: values.status ? 'A' : 'D',
    //   // user_parent_id: _accountLocal && _accountLocal.userData && _accountLocal.userData.id,
    //   customer_type_id: values.customer_group_id,
    //   province_id: values.province_id,
    //   district_id: values.district_id,
    //   address: values.address,
    // }
    const _a = {
      ...allValuesForm,
      ...values,
    };
    // debugger
    // dispatch(isCreate ? createOneCustomer(_paramsUser) : updateOneCustomer(data.id,_paramsUser));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderContent = () => {
    switch (renderType) {
      case typeScreenFormCustomer.CONTRACT:
        return <ContractForm isCreate={isCreate} form={customerForm} />;
      case typeScreenFormCustomer.WAREHOUSE:
        return <WarehouseForm isCreate={isCreate} form={customerForm} />;
      case typeScreenFormCustomer.PRICE:
        return <PriceForm isCreate={isCreate} form={customerForm} />;

      default:
        return <InfoForm isCreate={isCreate} form={customerForm} />;
    }
  };

  const changeType = (type: number) => {
    customerForm
      .validateFields()
      .then((values) => {
        setAllValuesForm({
          ...allValuesForm,
          ...values,
        });
        setRenderType(type);
      })
      .catch((errorInfo) => {});
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
        form={customerForm}
        className="mt-3"
        initialValues={{
          customer_code:
            !isCreate && data.customer_code ? data.customer_code : undefined,
          customer_group_id:
            !isCreate && data.customer_group_id
              ? data.customer_group_id
              : undefined,
          customer_type_id:
            !isCreate && data.customer_type_id
              ? data.customer_type_id
              : undefined,
          customer_name:
            !isCreate && data.customer_name ? data.customer_name : "",
          email: !isCreate && data.email ? data.email : "",
          phone: !isCreate && data.phone ? data.phone : "",
          province_id:
            !isCreate && data.province_id ? data.province_id : undefined,
          district_id:
            !isCreate && data.district_id ? data.district_id : undefined,
          ward_id: !isCreate && data.ward_id ? data.ward_id : undefined,
          address: !isCreate && data.address ? data.address : undefined,
          orther_name:
            !isCreate && data.orther_name ? data.orther_name : undefined,
          phone2: !isCreate && data.phone2 ? data.phone2 : undefined,

          status: !isCreate ? (data.status === "A" ? true : false) : true,
        }}
      >
        <div className="w-full bg-white">
          <p className="text-16 font-medium">Thông tin khách hàng</p>
          <Row className="w-full mt-3" gutter={8}>
            <Col span={24}>
              <Space size={[8, 16]} wrap>
                <ButtonTMS
                  id="form-button-info"
                  type={
                    renderType === typeScreenFormCustomer.INFO ? "tms" : "light"
                  }
                  onClick={(e) => changeType(typeScreenFormCustomer.INFO)}
                  // loading={stateCreateOneCustomer.isLoading}
                >
                  Thông tin chung
                </ButtonTMS>
                <ButtonTMS
                  id="form-button-contract"
                  type={
                    renderType === typeScreenFormCustomer.CONTRACT
                      ? "tms"
                      : "light"
                  }
                  onClick={(e) => changeType(typeScreenFormCustomer.CONTRACT)}
                  // loading={stateCreateOneCustomer.isLoading}
                >
                  Hợp đồng
                </ButtonTMS>
                <ButtonTMS
                  id="form-button-warehouse"
                  type={
                    renderType === typeScreenFormCustomer.WAREHOUSE
                      ? "tms"
                      : "light"
                  }
                  onClick={(e) => changeType(typeScreenFormCustomer.WAREHOUSE)}
                  // loading={stateCreateOneCustomer.isLoading}
                >
                  Danh sách kho
                </ButtonTMS>
                <ButtonTMS
                  id="form-button-price"
                  type={
                    renderType === typeScreenFormCustomer.PRICE
                      ? "tms"
                      : "light"
                  }
                  onClick={(e) => changeType(typeScreenFormCustomer.PRICE)}
                  // loading={stateCreateOneCustomer.isLoading}
                >
                  Bảng giá
                </ButtonTMS>
              </Space>
            </Col>
          </Row>
          {_renderContent()}
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
                // loading={stateCreateOneUserSystem.isLoading}
              >
                Lưu
              </ButtonTMS>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );

  /**************************** END **************************/
};

export default Customers;
