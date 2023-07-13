/* eslint-disable */
import { Col, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { ROLES_CUSTOMER, ROLES_SYSTEM } from "src/constants";
import { getCustomerById } from "src/services/actions/customer.actions";
import {
  getListBank,
  getListProvince
} from "src/services/actions/masterData.actions";
import { AppState } from "src/types";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAccount } from "src/utils/localStorage";
import CustomerAddressForm from "./components/customerAddressForm";
import InfoProfileForm from "./components/infoForm";
import "./styles.less";
const { TabPane } = Tabs;

const Profile = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const accountLocal = localGetAccount();

  const [tab, setTab] = useState("1");
  const [dataCustomer, setDataCustomer] = useState<any>({});
  const [isRoleCustomer, setIsRoleCustomer] = useState<any>(false);
  const { stateGetCustomerById } = useSelector(
    (e: AppState) => e.customerReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    loadCustomer();
    loadListProvince();
    loadListBank();
    const _accountLocal = JSON.parse(accountLocal || "");
    if (_accountLocal && _accountLocal.userData && _accountLocal.userData.roles) {
      const _checkRoleSystem = ROLES_CUSTOMER.includes(_accountLocal.userData.roles);
      setIsRoleCustomer(_checkRoleSystem);
    }
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, isLoading, error } = stateGetCustomerById;
    if (success) {
      setDataCustomer(data.customer);
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateGetCustomerById.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */
  const loadCustomer = () => {
    dispatch(getCustomerById('info'));
  };

  const loadListProvince = () => {
    dispatch(getListProvince());
  };

  const loadListBank = () => {
    dispatch(getListBank());
  };

  const callback = (key: any) => {
    setTab(key);
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderContent = () => {
    return (
      <Tabs
        onChange={callback}
        type="card"
        defaultActiveKey={tab}
        className="tms-tabs"
      >
        <TabPane tab="Thông tin chung" key="1">
          <InfoProfileForm tab={tab} keyTab="1" />
        </TabPane>
        {isRoleCustomer && (
          <TabPane tab="Danh sách địa chỉ" key="2">
            <CustomerAddressForm tab={tab} keyTab="2" />
          </TabPane>
        )}
      </Tabs>
    );
  };
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className="w-full h-full pl-4 pr-4">
      <SubHeader
        breadcrumb={[
          { text: "Quản lý tài khoản" },
          { text: "Thông tin tài khoản" },
        ]}
      />
      <Col className="contentBody mt-3">{_renderContent()}</Col>
    </div>
  );

  /**************************** END **************************/
};

export default Profile;
