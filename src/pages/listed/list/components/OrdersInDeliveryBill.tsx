/* eslint-disable */
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import { notifyError, notifyWarning } from "src/components/notification";
import {
  changeStatusBillInDelivery,
  getListBillPackage,
} from "src/services/actions/package.actions";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import OrderInformations from "../../orders/components/OrderInformations";
import { getStatusColor } from "../../orders/data";
import { columnsTableBangKe } from "../data";

const OrdersInDeliveryBill = ({ data }: any) => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
  const [singleBill, setSingleBill] = useState<any[]>([]);
  const [statusValue, setStatusValue] = useState(false);
  const [openInformationOrder, setOpenInformationOrder] = useState(false);
  const [orderInformation, setOrderInformation] = useState<any>({});

  const [selectedEditBills, setSelectedEditBills] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [paramsFilter, setParamsFilter] = useState<any>({
    limit: 5,
    page: 1,
  });
  const { stateListBillPackage } = useSelector(
    (state: AppState) => state.packageReducer
  );
  useEffect(() => {
    if (data.id) {
      dispatch(getListBillPackage(data.id));
    }
  }, [data.id]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error, isLoading } = stateListBillPackage;
    if (!isLoading) {
      if (success) {
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateListBillPackage.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const rowSelection = {
    selectedRowKeys: selectedEditBills,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedEditBills(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  const onChangePaging = (page: number, pageSize: number) => {
    setParamsFilter({ ...paramsFilter, page: page, limit: pageSize });
  };

  const handleChangeSingleBillStatus = (e: any, status: any) => {
    setOpenModalChangeStatus(true);
    setSingleBill([e.bill_code]);
  };

  const handleCloseChangeStatusBills = () => {
    setOpenModalChangeStatus(false);
    setSingleBill([]);
  };

  const handleChangeStatusListBill = (e: any) => {
    if (selectedEditBills.length > 0) {
      setOpenModalChangeStatus(true);
      setStatusValue(e);
    } else {
      notifyWarning("Vui lòng chọn vận đơn");
    }
  };
  const handleChangeStatusBills = () => {
    let params = {
      isDoneDelivery: statusValue,
      listBill: singleBill.length > 0 ? singleBill : selectedEditBills,
    };
    dispatch(changeStatusBillInDelivery(data.id, params));
  };
  const openModalCallback = (e: any, data: any) => {
    if (e === 4) {
      setOpenInformationOrder(true);
      setOrderInformation(data);
    }
  };
  return (
    <>
      <Modal
        visible={openModalChangeStatus}
        centered
        title={null}
        className="modalEditSender"
        onCancel={() => handleCloseChangeStatusBills()}
        onOk={() => handleChangeStatusBills()}
        width={700}
      >
        <div>
          Xác nhận đổi trạng thái của{" "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {singleBill.length > 0 ? singleBill.length : selectedRows?.length}
          </span>{" "}
          phiếu {" -> "}
          <span style={{ color: "red", fontWeight: "700" }}>
            {!statusValue ? "Nhập kho không phát được" : "Giao hàng thành công"}{" "}
          </span>
        </div>
      </Modal>
      <Modal
        visible={openInformationOrder}
        centered
        title={
          <div className="orderInformationHeader">
            Mã vận đơn:&nbsp;
            <span className="orderInformationHeader-code">
              {orderInformation?.bill_code}
            </span>
            <span
              className="orderInformationHeader-status"
              style={{
                background: getStatusColor(orderInformation.bill_status_id)
                  ?.color,
              }}
            >
              {orderInformation.bill_status_name}
            </span>
          </div>
        }
        onCancel={() => setOpenInformationOrder(false)}
        footer={null}
        width={1300}
      >
        <OrderInformations dataOrder={orderInformation} />
      </Modal>
      <div style={{ maxHeight: "calc(100vh - 150px)", marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <InputNewStyled
              {...defaultStyles}
              label="Tìm kiếm"
              suffixIcon={<SvgIconSearch />}
              suffixLeft="12px"
              padding="0 0 0 36px"
              placeholder="Mã vận đơn"
              onChange={(e: any) => setSearch(e)}
            />
          </div>
          <div></div>
        </div>
        <TableStyledAntd
          style={{
            maxHeight: "calc(100vh - 210px)",
            overflowY: "scroll",
          }}
          className="ordersTable"
          rowKey={"bill_code"}
          rowSelection={rowSelection}
          columns={columnsTableBangKe({
            openModalCallback,
            handleChangeSingleBillStatus,
            package_code: data.package_code,
          })}
          dataSource={
            stateListBillPackage.data
              ? stateListBillPackage.data?.packageList?.listBill
                  .filter((x: any) => x.bill_code.includes(search))
                  .slice(
                    (paramsFilter.page - 1) * paramsFilter.limit,
                    paramsFilter.page * paramsFilter.limit
                  )
              : []
          }
          loading={stateListBillPackage.isLoading}
          pagination={false}
          bordered
          widthCol1="5%"
          widthCol2="16%"
          widthCol3="16%"
          widthCol4="16%"
          widthCol5="16%"
          widthCol6="16%"
          widthCol7="15%"
          paddingItemBody="8px 16px"
        />
        <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilter.page}
          pageSize={paramsFilter.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() =>
            `Tổng ${
              stateListBillPackage.data
                ? stateListBillPackage.data?.packageList?.listBill?.length
                : 0
            } vận đơn `
          }
          total={
            stateListBillPackage.data
              ? stateListBillPackage.data?.packageList?.listBill?.length
              : 0
          }
        />
      </div>
    </>
  );
};

export default OrdersInDeliveryBill;
