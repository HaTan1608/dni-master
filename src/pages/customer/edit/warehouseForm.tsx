/* eslint-disable */
import CustomTable from "src/components/table/CustomTable";
import { useEffect, useState } from "react";
import { columnsDataWarehouse, defaultFilter } from "./data";
import { IParamsFilter } from "./interfaces";
import { useDispatch, useSelector } from "react-redux";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { AppState } from "src/types";
import { getListCustomerAddress } from "src/services/actions/customerAddress.actions";

const WarehouseForm = (props: any) => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const { isCreate, dataUser } = props;
  const [warehouses, setWarehouses] = useState([]);
  const [paging, setPaging] = useState<object>({});
  const [paramsFilter, setParamsFilter] =
    useState<IParamsFilter>(defaultFilter);

  const { stateGetListCustomerAddress } = useSelector(
    (state: AppState) => state.customerAddressReducer
  );

  /****************************START**************************/
  /*                         Life Cycle                      */
  useEffect(() => {
    if (!isCreate && dataUser.id) {
      loadListWarehouse();
    }
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateGetListCustomerAddress;
    if (success) {
      setWarehouses(data.listCustomerAddress);
      setPaging(data.paging);
    }
  }, [stateGetListCustomerAddress.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const onChangeTable = (page: any) => {
    const _filter = {
      ...paramsFilter,
      currentPage: page.current,
      sizePage: page.pageSize,
      isDispatch: true,
    };
    setParamsFilter(_filter);
  };

  const loadListWarehouse = (isDefault = false) => {
    const _paramsListWarehouse = isDefault ? defaultFilter : paramsFilter;
    if (isDefault) {
      setParamsFilter(defaultFilter);
    }
    dispatch(
      getListCustomerAddress({
        customer_id: dataUser.id,
        page: _paramsListWarehouse.currentPage,
        limit: _paramsListWarehouse.sizePage,
      })
    );
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className="mt-3 mb-3">
      <CustomTable
        rowKey={"id"}
        bordered
        isRowLight={true}
        paging={paging}
        columns={columnsDataWarehouse()}
        dataSource={warehouses}
        // rowSelection={{
        //   type: 'checkbox',
        //   ...rowSelection,
        // }}
        loading={false}
        pagination={true}
        onChange={onChangeTable}
        // scroll={{ x: 1500, y: 300 }}
      />
    </div>
  );

  /**************************** END **************************/
};

export default WarehouseForm;
