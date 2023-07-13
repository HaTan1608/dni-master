import { Form, Modal } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgExcel from "src/assets/svg/SvgExcel";
import SvgFile from "src/assets/svg/SvgFile";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconListProduct from "src/assets/svg/SvgIconListProduct";
import ActionsHeader from "src/components/actionsHeader/ActionsHeader";
import PanigationAntStyled from "src/components/inputComponentsStyled/PanigationAntStyled";
import TableStyledAntd from "src/components/inputComponentsStyled/TableStyled";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import { EXPORT_TEMPLATE_TYPE } from "src/constants";
import {
  getExportTemplate,
  getLinkDownload,
} from "src/services/actions/export.actions";
import {
  createOrderArrayByFile,
  createOrderByFile,
} from "src/services/actions/orders.actions";
import { API_URL } from "src/services/api/config";
import { ROOT_VERSION } from "src/services/api/url.index";
import { AppState } from "src/types";
import { geneUniqueKey } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import styled from "styled-components";
import EditOrder from "./components/EditOrder";
import ShipMethod from "./components/ShipMethod";
import { columnsOrders } from "./data";
const CreateByFile = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const [fileTest, setFileTest] = useState<any>(undefined);
  const [dataList, setDataList] = useState<any[]>([]);
  const [openImport, setOpenImport] = useState(false);
  const [formEditOrder] = Form.useForm();
  const [dataTest, setDataTest] = useState<any>({
    volume: 0,
    actual_weight: 0,
  });
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmReset, setOpenConfirmReset] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [dataMethods, setDataMethods] = useState({
    shipMethod: 1,
    service: 1,
  });
  const [dataTransportMethods, setDataTransportMethods] = useState<any[]>([]);
  const [listWarehouseByAdmin, setListWarehouseByAdmin] = useState<any[]>([]);
  const [loadingCalTotalPrice, setLoadingCalTotalPrice] = useState(false);
  const [volume, setVolume] = useState();
  const [paramsFilter, setParamsFilter] = useState({
    page: 1,
    limit: 10,
  });
  const stateImportFile = useSelector(
    (e: AppState) => e.ordersReducer.stateCreateOrdersByFile
  );

  const stateCreateOrdersArray = useSelector(
    (e: AppState) => e.ordersReducer.stateCreateOrdersArrayByFile
  );
  const stateExportTemplate = useSelector(
    (e: AppState) => e.exportReducer.stateExportTemplate
  );
  useEffect(() => {
    const getReasons = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/transportation-methods`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeArray = [];
          for (let i = 0; i < data?.data?.transportationMethods?.length; i++) {
            fakeArray.push({
              label: data?.data?.transportationMethods[i]?.transportation_name,
              value: data?.data?.transportationMethods[i]?.id,
            });
          }
          setDataTransportMethods(fakeArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReasons();
    return () => {
      setDataTransportMethods([]);
    };
  }, []);

  const getShipMethodCallback = (e: any) => {
    setDataMethods({ ...dataMethods, shipMethod: e });
  };
  const getServiceCallback = (e: any) => {
    if (e === 1) {
      setDataMethods({ shipMethod: 1, service: 1 });
    } else {
      setDataMethods({ ...dataMethods, service: e });
    }
  };

  const handleChangeFile = (e: any) => {
    setFileTest(e.target.files[0]);
  };

  const handleCloseOpenImport = () => {
    setOpenImport(false);
    setFileTest(undefined);
  };

  const onFinishImportFile = () => {
    if (!fileTest) {
      notifyWarning("Vui lòng chọn file");
    } else {
      let params = {
        file: fileTest,
        type: EXPORT_TEMPLATE_TYPE.TEMPLATE_BILL_BY_ONE_CUSTOMER,
        transportation_method_id: dataMethods.shipMethod,
        transportation_method: dataTransportMethods.find(
          (x) => x.value == dataMethods.shipMethod
        )?.label,
        service_id: dataMethods.service,
        service: dataMethods.service === 1 ? "36H" : "48H",
      };
      dispatch(createOrderByFile(params));
    }
  };
  const exportFileCallback = () => {};
  const importFileCallback = () => {
    setOpenImport(true);
  };

  const downFileCallback = () => {
    setIsLoading(true);
    dispatch(
      getExportTemplate({
        name: "MAU_FILE_TAO_DON_",
        type: EXPORT_TEMPLATE_TYPE.TEMPLATE_BILL_BY_ONE_CUSTOMER,
      })
    );
  };
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateCreateOrdersArray;
    if (!isLoading) {
      if (success) {
        setDataList([]);
        setDataMethods({
          shipMethod: 1,
          service: 1,
        });
        return notifySuccess(`Tạo thành công ${dataList.length} đơn !`);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateCreateOrdersArray.isLoading]);
  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error, isLoading } = stateImportFile;
    if (!isLoading) {
      if (success) {
        notifySuccess(
          `Nhập file thành công, có ${data?.successList.length} đơn thành công và ${data?.errorList.length} đơn lỗi`
        );
        setDataList([]);
        // let roleUser = JSON.parse(localStorage.getItem("ACCOUNT") as any)
        //   ?.userData?.roles;
        // if (roleUser === "C" || roleUser === "F") {
        //   const fakeSuccessList = data?.successList || [];
        //   const fakeCalPrices = data?.calcPrices?.calcPrices || [];
        //   let convertSuccessList = [];
        //   let a = Object.values(data?.customerAddress)[0] as any;
        //   let fakeWarehouseCustomer = [];
        //   let fakeWarehouseFullInfoCustomer = [];
        //   for (let i = 0; i < a.length; i++) {
        //     fakeWarehouseFullInfoCustomer.push(a[i]);
        //     fakeWarehouseCustomer.push({
        //       label:
        //         a[i].address +
        //         ", " +
        //         a[i].ward_name +
        //         ", " +
        //         a[i].district_name +
        //         ", " +
        //         a[i].province_name,
        //       value: a[i]?.id,
        //     });
        //   }
        //   for (let i = 0; i < fakeSuccessList.length; i++) {
        //     let bill = {
        //       ...fakeSuccessList[i]?.data,
        //       ...fakeCalPrices[i]?.output,
        //       keyRow: geneUniqueKey(),
        //       sender_address: a[0]?.address,
        //       sender_province_id: a[0]?.province_id,
        //       sender_province: a[0]?.province_name,
        //       sender_district_id: a[0]?.district_id,
        //       sender_district: a[0]?.district_name,
        //       sender_ward_id: a[0]?.ward_id,
        //       sender_ward: a[0]?.ward_name,
        //     };
        //     delete bill.sender_group;
        //     delete bill.receiver_group;
        //     delete bill.volumne;
        //     delete bill.other_fee;
        //     delete bill.remote_area_fee;
        //     delete bill.pricing_weight;
        //     convertSuccessList.push(bill);
        //   }
        //   setDataList(convertSuccessList);
        //   setWarehouseCustomer(fakeWarehouseCustomer);
        //   setWarehouseFullInfoCustomer(fakeWarehouseFullInfoCustomer);
        // } else {
        if (data?.successList.length > 0) {
          const fakeSuccessList = data?.successList || [];
          const fakeCalPrices = data?.calcPrices?.calcPrices || [];
          let convertSuccessList = [];
          let a = Object.values(data?.customerAddress) as any;
          if (dataMethods.shipMethod === 1 || dataMethods.shipMethod === 2) {
            for (let i = 0; i < fakeSuccessList.length; i++) {
              let bill = {
                ...fakeSuccessList[i]?.data,
                ...fakeCalPrices[i]?.output,
                keyRow: geneUniqueKey(),
                sender_address: fakeSuccessList[i]?.data?.sender_address,
                sender_province_id:
                  fakeSuccessList[i]?.data?.sender_province_id,
                sender_province: fakeSuccessList[i]?.data?.sender_province,
                sender_district_id:
                  fakeSuccessList[i]?.data?.sender_district_id,
                sender_district: fakeSuccessList[i]?.data?.sender_district,
                sender_ward_id: fakeSuccessList[i]?.data?.sender_ward_id,
                sender_ward: fakeSuccessList[i]?.data?.sender_ward,
              };
              delete bill.sender_group;
              delete bill.receiver_group;
              delete bill.volumne;
              delete bill.other_fee;
              delete bill.remote_area_fee;
              delete bill.pricing_weight;
              convertSuccessList.push(bill);
            }
          } else {
            let fakeWarehouseCustomers = [];
            for (let i = 0; i < a.length; i++) {
              let fakeWarehouse = a[i].warehose.map((x: any) => ({
                ...x,
                value: x.id,
                label:
                  x.address +
                  ", " +
                  x.ward_name +
                  ", " +
                  x.district_name +
                  ", " +
                  x.province_name,
              }));

              let fakeCustomer = {
                customer_code: a[i].customer_code,
                warehouse: fakeWarehouse,
              } as any;

              fakeWarehouseCustomers.push(fakeCustomer);
            }
            for (let i = 0; i < fakeSuccessList.length; i++) {
              let myWarehouse = fakeWarehouseCustomers.find(
                (x: any) =>
                  x.customer_code === fakeSuccessList[i]?.data?.customer_code
              )?.warehouse;
              let bill = {
                ...fakeSuccessList[i]?.data,
                ...fakeCalPrices[i]?.output,
                keyRow: geneUniqueKey(),
                sender_address: myWarehouse[0]?.address,
                sender_province_id: myWarehouse[0]?.province_id,
                sender_province: myWarehouse[0]?.province_name,
                sender_district_id: myWarehouse[0]?.district_id,
                sender_district: myWarehouse[0]?.district_name,
                sender_ward_id: myWarehouse[0]?.ward_id,
                sender_ward: myWarehouse[0]?.ward_name,
              };
              delete bill.sender_group;
              delete bill.receiver_group;
              delete bill.volumne;
              delete bill.other_fee;
              delete bill.remote_area_fee;
              delete bill.pricing_weight;
              convertSuccessList.push(bill);
            }
            setListWarehouseByAdmin(fakeWarehouseCustomers);
          }

          setDataList(convertSuccessList);
        }

        // }

        if (data?.errorList?.length > 0) {
          dispatch(
            getLinkDownload({
              file_name: data.fileUrlError,
            })
          );
        }
        setOpenImport(false);
      } else if (success === false || error) {
        return notifyError("Có lỗi!" + message);
      }
    }
  }, [stateImportFile.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const componentRef = useRef();
  const openModalCallback = () => {};
  const handleDeleteOrder = (record: any) => {
    setOpenConfirmDelete(true);
    setSelectedOrder(record.keyRow);
  };
  const handleSubmitDeleteOrder = () => {
    setDataList(dataList.filter((x) => x.keyRow !== selectedOrder));
    setOpenConfirmDelete(false);
  };
  const onChangePaging = (page: any, pageSize: any) => {
    setParamsFilter({
      page: page,
      limit: pageSize,
    });
  };
  const handleCreateOrdersArray = () => {
    let convertDataList = [];
    for (let i = 0; i < dataList.length; i++) {
      let data = dataList[i];
      delete data.keyRow;
      convertDataList.push(data);
    }
    dispatch(createOrderArrayByFile({ listBill: convertDataList }));
  };
  const printDataCallback = () => {};
  const handleClear = () => {
    if (dataList.length === 0) {
      notifyWarning("Không có vận đơn");
    } else {
      setOpenConfirmReset(true);
    }
  };
  const getPricesByWarehouse = async (infoWarehouse: any, record: any) => {
    setLoadingCalTotalPrice(true);
    let headers: any = {
      "Content-Type": "application/json",
    };
    let token = localGetToken();
    let uuid = localGetAuthUUID();
    if (token) {
      headers.Authorization = token;
      headers["x-auth-uuid"] = uuid;
    }
    try {
      let params = {
        actual_weight: record.weight,
        cargo_value: record.cargo_value,
        cod_amount: record.cod_amount,
        number_of_package: record.package_qty,
        payment_method: record.payment_method_id,
        receiver: 661,
        receiver_district: record.receiver_district_id,
        receiver_province: record.receiver_province_id,
        sender: record.customer_id,
        sender_district: infoWarehouse.district_id,
        sender_province: infoWarehouse.province_id,
        sequence: 1,
        service: record.service_id,
        transport_method: record.transportation_method_id,
        volumetric_weight: Number(record.volume) * 250,
      };
      const { data } = await axios.post(
        `${API_URL}/${ROOT_VERSION}/calc-price`,
        params,
        {
          headers: headers,
        }
      );
      if (data) {
        let editOrder = dataList.find((x) => x.keyRow == selectedOrder.keyRow);
        editOrder.cod_fee = data?.data?.calcPrices[0]?.output?.cod_fee;
        editOrder.counting_fee =
          data?.data?.calcPrices[0]?.output?.counting_fee;
        editOrder.delivery_fee =
          data?.data?.calcPrices[0]?.output?.delivery_fee;
        editOrder.insurance_fee =
          data?.data?.calcPrices[0]?.output?.insurance_fee;
        editOrder.lifting_fee = data?.data?.calcPrices[0]?.output?.lifting_fee;
        editOrder.main_fee = data?.data?.calcPrices[0]?.output?.main_fee;
        editOrder.packing_fee = data?.data?.calcPrices[0]?.output?.packing_fee;

        editOrder.total_fee = data?.data?.calcPrices[0]?.output?.total_fee;
        editOrder.receiver_district_id = infoWarehouse.district_id;
        editOrder.receiver_province_id = infoWarehouse.province_id;
        dataList.map((x) => (x.keyRow == selectedOrder.keyRow ? editOrder : x));
        setLoadingCalTotalPrice(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingCalTotalPrice(false);
    }
  };

  const getPricesByValue = async (values: any, record: any) => {
    setLoadingCalTotalPrice(true);
    let headers: any = {
      "Content-Type": "application/json",
    };
    let token = localGetToken();
    let uuid = localGetAuthUUID();
    if (token) {
      headers.Authorization = token;
      headers["x-auth-uuid"] = uuid;
    }
    try {
      let params = {
        actual_weight: values.tlhanghoa,
        cargo_value: record.cargo_value,
        cod_amount: record.cod_amount,
        number_of_package: values.sokien,
        payment_method: record.payment_method_id,
        receiver: 661,
        receiver_district: record.receiver_district_id,
        receiver_province: record.receiver_province_id,
        sender: record.customer_id,
        sender_district: record.sender_district_id,
        sender_province: record.sender_province_id,
        sequence: 1,
        service: record.service_id,
        transport_method: record.transportation_method_id,
        volumetric_weight: Number(values.thetich) * 250,
      };
      const { data } = await axios.post(
        `${API_URL}/${ROOT_VERSION}/calc-price`,
        params,
        {
          headers: headers,
        }
      );
      if (data) {
        let editOrder = dataList.find((x) => x.keyRow == selectedOrder.keyRow);
        console.log('editOrder',editOrder);
        editOrder.cod_fee = data?.data?.calcPrices[0]?.output?.cod_fee;
        editOrder.counting_fee =
          data?.data?.calcPrices[0]?.output?.counting_fee;
        editOrder.delivery_fee =
          data?.data?.calcPrices[0]?.output?.delivery_fee;
        editOrder.insurance_fee =
          data?.data?.calcPrices[0]?.output?.insurance_fee;
        editOrder.lifting_fee = data?.data?.calcPrices[0]?.output?.lifting_fee;
        editOrder.main_fee = data?.data?.calcPrices[0]?.output?.main_fee;
        editOrder.packing_fee = data?.data?.calcPrices[0]?.output?.packing_fee;
        editOrder.volume = volume;
        editOrder.main_fee_vat_ex = data?.data?.calcPrices[0]?.output?.main_fee_vat_ex;
        editOrder.total_fee_vat_ex = data?.data?.calcPrices[0]?.output?.total_fee_vat_ex;
        editOrder.dimension_weight = Number(values.thetich) * 250;
        editOrder.weight = values.tlhanghoa;
        editOrder.package_qty = values.sokien;
        console.log('dataList.map',dataList.map((x) => (x.keyRow == selectedOrder.keyRow ? editOrder : x)));
        dataList.map((x) => (x.keyRow == selectedOrder.keyRow ? editOrder : x));
        setLoadingCalTotalPrice(false);
        setOpenEditOrder(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingCalTotalPrice(false);
    }
  };
  const handleChangeSenderWarehouse = (value: any, record: any) => {
    setSelectedOrder(record);
    const infoWarehouse = listWarehouseByAdmin.find(
      (x) => x.customer_code === record.customer_code
    )?.warehouse;
    if (infoWarehouse.length > 0) {
      let info = infoWarehouse.find((x: any) => x.value === value);
      getPricesByWarehouse(info, record);
    }
  };

  const onFinishEditOrder = (values: any) => {
    console.log(selectedOrder);
    getPricesByValue(values, selectedOrder);
  };

  const getTotalWeightCallback = (e: any) => {
    setVolume(e)
    formEditOrder.setFieldsValue({
      thetich: e,
      tlquydoi: e == 0 ? "0" : e * 250,
      tltinhgia:
        e * 250 > formEditOrder.getFieldValue("tlhanghoa")
          ? e * 250
          : formEditOrder.getFieldValue("tlhanghoa"),
    });
  };

  const handleEditOrder = (e: any) => {
    setOpenEditOrder(true);
    setSelectedOrder(e);
    formEditOrder.setFieldsValue({
      tienthuho: e.cod_amount,
      tlhanghoa: e.weight,
      sokien: e.package_qty,
      thetich: e.volume,
      tlquydoi: e.dimension_weight,
      tltinhgia: e.weight > e.dimension_weight ? e.weight : e.dimension_weight,
    });
  };
  return (
    <div className="mainPages">
      <OverlaySpinner
        text="Đang tính cước phí ..."
        open={loadingCalTotalPrice}
      />
      <OverlaySpinner
        open={stateExportTemplate.isLoading}
        text="Đang tải file mẫu ..."
      />
      <OverlaySpinner
        text="Đang xử lý file ..."
        open={stateImportFile.isLoading}
      />
      <OverlaySpinner
        text="Đang tạo đơn ..."
        open={stateCreateOrdersArray.isLoading}
      />
      <Modal
        visible={openEditOrder}
        title="Thông tin hàng hóa"
        className="modalEditSender"
        onCancel={() => {
          setOpenEditOrder(false);
          formEditOrder.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={formEditOrder}
          id="formEditOrder"
          onFinish={onFinishEditOrder}
        >
          <EditOrder
            data={dataTest}
            getTotalWeightCallback={getTotalWeightCallback}
            getActualWeightCallback={(e: any) =>
              setDataTest({
                ...dataTest,
                actual_weight: Number(e),
              })
            }
          />
        </Form>
      </Modal>
      <Modal
        visible={openConfirmReset}
        title={null}
        className="modalEditSender"
        onCancel={() => setOpenConfirmReset(false)}
        onOk={() => {
          setOpenConfirmReset(false);
          setDataList([]);
          setDataMethods({ shipMethod: 1, service: 1 });
        }}
        width={420}
      >
        <div style={{ color: "red" }}>Xác nhận đặt lại dữ liệu</div>
      </Modal>
      <Modal
        visible={openConfirmDelete}
        title={null}
        className="modalEditSender"
        onCancel={() => setOpenConfirmDelete(false)}
        onOk={() => handleSubmitDeleteOrder()}
        width={420}
      >
        <div style={{ color: "red" }}>Xác nhận xóa đơn</div>
      </Modal>
      <Modal
        visible={openImport}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <SvgExcel /> <span style={{ marginLeft: "8px" }}>Nhập file</span>
          </div>
        }
        className="modalEditSender"
        onCancel={() => handleCloseOpenImport()}
        footer={null}
        width={420}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label
            htmlFor="importFile"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              background: "#259c58",
              height: "41px",
              width: "calc(50% - 4px)",
            }}
          >
            <SvgFile />
            <span style={{ marginLeft: "8px", color: "#fff" }}>Chọn file</span>
          </label>
          <input
            type="file"
            id="importFile"
            onChange={(e) => handleChangeFile(e)}
            style={{ display: "none" }}
          />

          <div
            onClick={() => onFinishImportFile()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              background: "#27aae1",
              height: "41px",
              width: "calc(50% - 4px)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Xác nhận
          </div>
        </div>
        {fileTest && <div>{fileTest.name}</div>}
      </Modal>
      <SubHeader
        breadcrumb={[{ text: "Quản lý đơn hàng" }, { text: "Tạo đơn từ file" }]}
      />
      <InformationService>
        <div>
          <ActionsHeader
            header="Thông tin dịch vụ"
            background="#fff"
            padding="16px"
            borderRadius="5px"
            actions={[
              {
                text: "Nhập file",
                callback: importFileCallback,
                svg: <SvgIconImportFile />,
                scale: true,
              },
              {
                text: "Tải file mẫu",
                callback: downFileCallback,
                svg: <SvgIconListProduct />,
                scale: true,
              },
            ]}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ShipMethod
            disable={dataList}
            dataMethods={dataMethods}
            getServiceCallback={getServiceCallback}
            getShipMethodCallback={getShipMethodCallback}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              onClick={() => handleClear()}
              className="globalButton"
              style={{
                border: "solid 1px #27aae1",
                background: "#27aae1",
                color: "#fff",
                height: "32px",
                marginBottom: "8px",
                marginRight: "16px",
              }}
            >
              Đặt lại
            </div>
            <div
              onClick={() => handleCreateOrdersArray()}
              className="globalButton"
              style={{
                border: "solid 1px #27aae1",
                background: "#27aae1",
                color: "#fff",
                height: "32px",
                marginBottom: "8px",
                marginRight: "16px",
              }}
            >
              Tạo đơn
            </div>
          </div>
        </div>
      </InformationService>
      <div className="ordersList" style={{ marginTop: "16px" }}>
        <h4>Danh sách vận đơn</h4>
        <TableStyledAntd
          className="ordersTable"
          rowKey={"keyRow"}
          rowSelection={false}
          columns={columnsOrders({
            openModalCallback,
            handleEditOrder,
            handleDeleteOrder,
            componentRef,
            printDataCallback,
            dataMethods: dataMethods,
            handleChangeSenderWarehouse,
            listWarehouseByAdmin: listWarehouseByAdmin,
          })}
          dataSource={[
            ...dataList.slice(
              (paramsFilter.page - 1) * paramsFilter.limit,
              paramsFilter.page * paramsFilter.limit
            ),
          ]}
          loading={false}
          pagination={false}
          bordered
          widthCol1="29%"
          widthCol2="18%"
          widthCol3="16%"
          widthCol4="16%"
          widthCol5="16%"
          widthCol6="5%"
          paddingItemBody="8px 16px"
        />
        <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilter.page}
          pageSize={paramsFilter.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() => `Tổng ${dataList.length} vận đơn `}
          total={dataList.length}
        />
      </div>
    </div>
  );
};

export default CreateByFile;

const InformationService = styled.div`
  margin-top: -16px;
  background: #fff;
  border-radius: 5px;
`;
