/* eslint-disable */
import CustomTable from "src/components/table/CustomTable";
import { useEffect, useState } from "react";
import { columnsDataPrice, defaultFilter } from "./data";
import { IParamsFilter } from "./interfaces";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/types";
import { getListCustomerPrice } from "src/services/actions/customerPrice.action";
import { Spin } from "antd";

const PriceForm = (props: any) => {
  const {dataUser,spin}= props
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const [paging, setPaging] = useState<object>({});
  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);
  const [customerPrice, setCustomerPrice] = useState<any>([]);
  const [loading, setLoading] = useState<any>(spin);
  useEffect(() => {
    loadListCustomerPrice();
  }, []);
  /****************************START**************************/
  /*                         Life Cycle                      */
  const { stateGetListCustomerPrice } = useSelector(
    (state: AppState) => state.customerPriceReducer
  );
  useEffect(() => {
    if (isMount) return;
    const { data, success } = stateGetListCustomerPrice;
    setLoading(false)
    if (success) {
      setCustomerPrice(data.customerPrices);
    }
  }, [stateGetListCustomerPrice.isLoading]);

  //   const [checkedListProduct, setCheckedListProduct] = useState<any>([1, 2]);
  const loadListCustomerPrice = () => {
    dispatch(getListCustomerPrice({customer_id:dataUser.id}));
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */
  const btnChangeStatus = () => {};

  const btnVisbleUpdate = () => {};

  const onChangeTable = (page: any) => {
    const _filter = {
      ...paramsFilter,
      currentPage: page.current,
      sizePage: page.pageSize,
      isDispatch: true,
    };
    setParamsFilter(_filter);
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    
    <div className="mt-3 mb-3">
      <Spin spinning={loading}>
      <CustomTable
        rowKey={"pricelist_id"}
        bordered
        isRowLight={true}
        paging={paging}
        columns={columnsDataPrice({
          btnChangeStatus,
          btnOpenModal: btnVisbleUpdate,
        })}
        dataSource={customerPrice}
        // rowSelection={{
        //   type: 'checkbox',
        //   ...rowSelection,
        // }}
        loading={false}
        pagination={true}
        onChange={onChangeTable}
      />
      </Spin>
    </div>
  );

  /**************************** END **************************/
};

export default PriceForm;
