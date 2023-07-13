/* eslint-disable */
import { useEffect, useState } from "react";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import FormInputAntd from "src/components/inputComponentsStyled/formStyled/FormInputAntd";
import FormSelectAntd from "src/components/inputComponentsStyled/formStyled/FormSelectAntd";
import styled from "styled-components";
import ShipMethod from "./ShipMethod";
import arrow from "src/assets/images/arrow.svg";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import colors from "src/utils/colors";
import SvgIconShop from "src/assets/svg/SvgIconShop";
import { Form, Modal, Spin } from "antd";
import axios from "axios";
import { ROOT_VERSION } from "src/services/api/url.index";
import { API_URL } from "src/services/api/config";
import { localGetAccount, localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import "./styles.less";
import InputNewStyled from "src/components/inputComponentsStyled/InputNewStyled";
import { ROLES_SYSTEM } from "src/constants";
const rules = [
  {
    required: true,
    message: "Không bỏ trống",
  },
];
const MainInformation = ({
  form,
  getMethodCallback,
  getNameCallback,
  getCustomerCallback,
  getNameSenderCallback,
  getNameReceiverCallback,
  getDataSenderUser,
}: any) => {
  const [totalWarehouses, setTotalWarehouses] = useState<any[]>([]);
  const [shipMethod, setShipMethod] = useState(1);
  const [zones, setZones] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [senderProvinceId, setSenderProvinceId] = useState(0);
  const [senderTrainStations, setSenderTrainStations] = useState<any[]>([]);
  const [receiverProvinceId, setReceiverProvinceId] = useState(0);
  const [receiverTrainStations, setReceiverTrainStations] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const [checkUser, setCheckUser] = useState(false);
  const [loading, setLoading] = useState(false);
  //
  const [senderProvinceIdAddress, setSenderProvinceIdAddress] = useState(0);
  const [senderDistrict, setSenderDistrict] = useState<any[]>([]);
  const [senderDistrictIdAddress, setSenderDistrictIdAddress] = useState(0);
  const [senderWards, setSenderWards] = useState<any[]>([]);
  const [receiverProvinceIdAddress, setReceiverProvinceIdAddress] = useState(0);
  const [receiverDistrict, setReceiverDistrict] = useState<any[]>([]);
  const [receiverDistrictIdAddress, setReceiverDistrictIdAddress] = useState(0);
  const [receiverWards, setReceiverWards] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [senderPlace, setSenderPlace] = useState(0);
  const [onChangeAdress, setOnChangeAdress] = useState();
  const [onChangeSenderAdress, setOnChangeSenderAdress] = useState();
  const [senderProvinces, setSenderProvinces] = useState<any[]>([]);
  const [isSetting, setIsSetting] = useState<any>(true);
  const [receiverPlace, setReceiverPlace] = useState(0);
  const [receiverProvinces, setReceiverProvinces] = useState<any[]>([]);

  //
  const [service, setService] = useState(1);
  const [visibleList, setVisibleList] = useState(false);
  const [visibleTotalList, setVisibleTotalList] = useState(false);

  //

  const [selectedNameValues, setSelectedNameValues] = useState({
    sender_province: undefined,
    sender_province_id: undefined,
    sender_district: undefined,
    sender_district_id: undefined,
    sender_ward_id: undefined,
    sender_ward: undefined,
    sender_train: undefined,
    sender_province_train: undefined,
    receiver_province: undefined,
    receiver_province_id: undefined,
    receiver_district: undefined,
    receiver_district_id: undefined,
    receiver_ward_id: undefined,
    receiver_ward: undefined,
    receiver_train: undefined,
    receiver_province_train: undefined,
  });
  const getShipMethodCallback = (e: any) => {
    setShipMethod(e);
  };
  useEffect(() => {
    _renderProfile();
  }, []);
  useEffect(() => {
    getMethodCallback({ shipMethod: shipMethod, service: service });
    // checkUserFunction(phoneDataUser)
  }, [shipMethod, service]); // eslint-disable-line react-hooks/exhaustive-deps
  const getServiceCallback = (e: any) => {
    setService(e);
  };
  const openListStore = () => {
    setVisibleList(true);
  };
  const _renderProfile = () => {
    let _account = localGetAccount();
    if (_account) {
      let _user = JSON.parse(_account);
      if (!ROLES_SYSTEM.includes(_user.userData.roles)) {
        setSearchKey(_user.userData.phone);
        form.setFieldsValue({
          senderPhone: _user.userData.phone,
        });
      }
    }
  };
  const openListTotalStore = () => {
    setVisibleTotalList(true);
  };

  useEffect(() => {
    getNameCallback(selectedNameValues);
  }, [selectedNameValues]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getZone = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(`${API_URL}/${ROOT_VERSION}/zones`, {
          headers: headers,
        });
        if (data) {
          let fakeZones = [];
          for (var i = 0; i < data?.data?.zones.length; i++) {
            fakeZones.push({
              label: data?.data?.zones[i].zone,
              value: data?.data?.zones[i].id,
            });
          }
          setZones(fakeZones);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getZone();
    return () => {
      setZones([]);
    };
  }, []);

  useEffect(() => {
    const getSenderProvinces = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces?zone_id=${senderPlace}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeProvinces = [];
          for (var i = 0; i < data?.data?.provinces.length; i++) {
            fakeProvinces.push({
              label: data?.data?.provinces[i].province_name,
              value: data?.data?.provinces[i].id,
            });
          }
          setSenderProvinces(fakeProvinces);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSenderProvinces();
    return () => {
      setSenderProvinces([]);
    };
  }, [senderPlace]);

  useEffect(() => {
    const getReceiverProvinces = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces?zone_id=${receiverPlace}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeProvinces = [];
          for (var i = 0; i < data?.data?.provinces.length; i++) {
            fakeProvinces.push({
              label: data?.data?.provinces[i].province_name,
              value: data?.data?.provinces[i].id,
            });
          }
          setReceiverProvinces(fakeProvinces);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReceiverProvinces();
    return () => {
      setReceiverProvinces([]);
    };
  }, [receiverPlace]);

  useEffect(() => {
    const getProvinces = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/provinces`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeProvinces = [];
          for (var i = 0; i < data?.data?.provinces.length; i++) {
            fakeProvinces.push({
              label: data?.data?.provinces[i].province_name,
              value: data?.data?.provinces[i].id,
            });
          }
          setProvinces(fakeProvinces);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProvinces();
    return () => {
      setProvinces([]);
    };
  }, []);

  useEffect(() => {
    const getSenderTrain = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/train-stations?province=${senderProvinceId}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeTrain = [];
          for (var i = 0; i < data?.data?.trainStations.length; i++) {
            fakeTrain.push({
              label: data?.data?.trainStations[i].station,
              value: data?.data?.trainStations[i].id,
              province_id: data?.data?.trainStations[i].province_id,
              province: data?.data?.trainStations[i].province,
              district_id: data?.data?.trainStations[i].district_id,
              district: data?.data?.trainStations[i].district,
              ward_id: data?.data?.trainStations[i].ward_id,
              ward: data?.data?.trainStations[i].ward,
            });
          }
          setSenderTrainStations(fakeTrain);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (senderProvinceId > 0) {
      getSenderTrain();
    }
    return () => {
      setSenderTrainStations([]);
    };
  }, [senderProvinceId]);

  useEffect(() => {
    const getReceiverTrain = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/train-stations?province=${receiverProvinceId}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeTrain = [];
          for (var i = 0; i < data?.data?.trainStations.length; i++) {
            fakeTrain.push({
              label: data?.data?.trainStations[i].station,
              value: data?.data?.trainStations[i].id,
              province_id: data?.data?.trainStations[i].province_id,
              province: data?.data?.trainStations[i].province,
              district_id: data?.data?.trainStations[i].district_id,
              district: data?.data?.trainStations[i].district,
              ward_id: data?.data?.trainStations[i].ward_id,
              ward: data?.data?.trainStations[i].ward,
            });
          }
          setReceiverTrainStations(fakeTrain);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (receiverProvinceId > 0) {
      getReceiverTrain();
    }
    return () => {
      setReceiverTrainStations([]);
    };
  }, [receiverProvinceId]);

  useEffect(() => {
    const getReceiverDistrict = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/districts?province_id=${receiverProvinceIdAddress}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeDistricts = [];
          for (var i = 0; i < data?.data?.districts.length; i++) {
            fakeDistricts.push({
              label: data?.data?.districts[i].district_name,
              value: data?.data?.districts[i].id,
            });
          }
          setReceiverDistrict(fakeDistricts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (receiverProvinceIdAddress > 0) {
      getReceiverDistrict();
    }
    return () => {
      setReceiverDistrict([]);
    };
  }, [receiverProvinceIdAddress]);

  useEffect(() => {
    const getReceiverWards = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/wards?district_id=${receiverDistrictIdAddress}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeWards = [];
          for (var i = 0; i < data?.data?.wards.length; i++) {
            fakeWards.push({
              label: data?.data?.wards[i].ward_name,
              value: data?.data?.wards[i].id,
            });
          }
          setReceiverWards(fakeWards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (receiverDistrictIdAddress > 0) {
      getReceiverWards();
    }
    return () => {
      setReceiverWards([]);
    };
  }, [receiverDistrictIdAddress]);

  useEffect(() => {
    const getSenderDistrict = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/districts?province_id=${senderProvinceIdAddress}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeDistricts = [];
          for (var i = 0; i < data?.data?.districts.length; i++) {
            fakeDistricts.push({
              label: data?.data?.districts[i].district_name,
              value: data?.data?.districts[i].id,
            });
          }
          setSenderDistrict(fakeDistricts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (senderProvinceIdAddress > 0) {
      getSenderDistrict();
    }
    return () => {
      setSenderDistrict([]);
    };
  }, [senderProvinceIdAddress]);

  useEffect(() => {
    const getSenderWards = async () => {
      let headers: any = {
        "Content-Type": "application/json,text/plain, */*",
      };
      let token = localGetToken();
      if (token) {
        headers.Authorization = token;
      }
      try {
        const { data } = await axios.get(
          `${API_URL}/${ROOT_VERSION}/wards?district_id=${senderDistrictIdAddress}`,
          {
            headers: headers,
          }
        );
        if (data) {
          let fakeWards = [];
          for (var i = 0; i < data?.data?.wards.length; i++) {
            fakeWards.push({
              label: data?.data?.wards[i].ward_name,
              value: data?.data?.wards[i].id,
            });
          }
          setSenderWards(fakeWards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (senderDistrictIdAddress > 0) {
      getSenderWards();
    }
    return () => {
      setSenderWards([]);
    };
  }, [senderDistrictIdAddress]);

  useEffect(() => {
    getMethodCallback({ shipMethod: shipMethod, service: service });
  }, [shipMethod, service]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeSenderPlace = (e: any) => {
    setSenderPlace(e);
    form.setFieldsValue({
      senderStationProvince: undefined,
      senderTransport: undefined,
    });
  };

  const onChangeReceiverPlace = (e: any) => {
    setReceiverPlace(e);
    form.setFieldsValue({
      receiverStationProvince: undefined,
      receiverTransport: undefined,
    });
  };

  const onChangeSenderProvince = (e: any) => {
    setSenderProvinceId(e);
    setSelectedNameValues({
      ...selectedNameValues,
      sender_province_train: senderProvinces.find((x) => x.value === e)?.label,
      sender_province_id: e,
    });
    form.setFieldsValue({
      senderTransport: undefined,
    });
  };

  const onChangeReceiverProvince = (e: any) => {
    setReceiverProvinceId(e);
    setSelectedNameValues({
      ...selectedNameValues,
      receiver_province_train: receiverProvinces.find((x) => x.value === e)
        ?.label,
      receiver_province_id: e,
    });
    form.setFieldsValue({
      receiverTransport: undefined,
    });
  };

  const onChangeSenderProvinceAddress = (e: any) => {
    setSenderProvinceIdAddress(e);
    setSelectedNameValues({
      ...selectedNameValues,
      sender_province: provinces.find((x) => x.value === e)?.label,
      sender_province_id: e,
    });
    form.setFieldsValue({
      senderDistrict: undefined,
      senderWard: undefined,
    });
  };

  const onChangeSenderDistrictAddress = (e: any) => {
    setSenderDistrictIdAddress(e);
    setSelectedNameValues({
      ...selectedNameValues,
      sender_district: senderDistrict.find((x) => x.value === e)?.label,
      sender_district_id: e,
    });
    form.setFieldsValue({
      senderWard: undefined,
    });
  };

  const onChangeReceiverProvinceAddress = (e: any) => {
    setReceiverProvinceIdAddress(e);
    setSelectedNameValues({
      ...selectedNameValues,
      receiver_province: provinces.find((x) => x.value === e)?.label,
      receiver_province_id: e,
    });
    form.setFieldsValue({
      receiverDistrict: undefined,
      receiverWard: undefined,
    });
  };

  const onChangeReceiverDistrictAddress = (e: any) => {
    setReceiverDistrictIdAddress(e);
    setSelectedNameValues({
      ...selectedNameValues,
      receiver_district: receiverDistrict.find((x) => x.value === e)?.label,
      receiver_district_id: e,
    });
    form.setFieldsValue({
      receiverWard: undefined,
    });
  };

  const onChangeSenderWardsAddress = (e: any) => {
    getNameSenderCallback({
      sender_ward: senderWards.find((x) => x.value === e)?.label,
      sender_ward_id: e,
    });
  };

  const onChangeReceiverWardsAddress = (e: any) => {
    getNameReceiverCallback({
      receiver_ward: receiverWards.find((x) => x.value === e)?.label,
      receiver_ward_id: e,
    });
  };

  const onChangeSenderStation = (e: any) => {
    let station = senderTrainStations.find((x) => x.value === e);
    getNameSenderCallback({
      sender_ward: station.ward,
      sender_ward_id: station.ward_id,
    });

    setSelectedNameValues({
      ...selectedNameValues,
      sender_train: station.label,
      sender_province_id: station.province_id,
      sender_district_id: station.district_id,
      // sender_ward_id: station.ward_id,

      sender_province: station.province,
      sender_district: station.district,
      // sender_ward: station.ward,
    });
  };

  const onChangeReceiverStation = (e: any) => {
    let station = receiverTrainStations.find((x) => x.value === e);
    getNameReceiverCallback({
      receiver_ward: station.ward,
      receiver_ward_id: station.ward_id,
    });
    setSelectedNameValues({
      ...selectedNameValues,
      receiver_train: station.label,
      receiver_province_id: station.province_id,
      receiver_district_id: station.district_id,
      // receiver_ward_id: station.ward_id,

      receiver_province: station.province,
      receiver_district: station.district,
      //  receiver_ward: station.ward,
    });
  };

  const handleChangeInput = (e: any) => {
    setSearchKey(e);
  };

  useEffect(() => {
    if (searchKey.length === 10) {
      checkUserFunction(searchKey);
    }
    if (searchKey.length === 0) {
      setCheckUser(false);
    }
  }, [searchKey]);
  // const handleAddItem = (e: any) => {
  //   setSearchKey(e.phone);
  //   setCheckUser(false);
  //   setSenderProvinceIdAddress(e.province_id);
  //   setSenderDistrictIdAddress(e.district_id);
  //   getCustomerCallback(e.id);
  //   getWarehouse(e.id);
  //   setSelectedNameValues({
  //     ...selectedNameValues,
  //     sender_province: e.province_name,
  //     sender_province_id: e.province_id,
  //     sender_district: e.district_name,
  //     sender_district_id: e.district_id,
  //   });
  //   form.setFieldsValue({
  //     senderName: e.customer_name,
  //     senderCode: e.customer_code,
  //     senderPhone: e.phone,
  //     senderID: e.id,
  //     senderProvince: e.province_id,
  //     senderDistrict: e.district_id,
  //     senderWard: e.ward_id,
  //   });
  // };

  const checkUserFunction = async (phone: any) => {
    setLoading(true);
    let headers: any = {
      "Content-Type": "application/json,text/plain, */*",
    };
    let token = localGetToken();
    let uuid = localGetAuthUUID();
    if (token) {
      headers.Authorization = token;
      headers["x-auth-uuid"] = uuid;
    }

    try {
      const { data } = await axios.get(
        `${API_URL}/${ROOT_VERSION}/customers?search=${phone}&status=A`,
        {
          headers: headers,
        }
      );
      if (data) {
        if (data?.data?.users.length > 0) {
          // if (data?.data?.users[0].phone === phone) {
          const zone = data?.data?.users[0].settings.filter((item: any) => {
            return item.object_key == "SENDER_ZONE" && item.status != "D";
          });
          zone && setSenderPlace(zone[0]?.object_id);
          const province = data?.data?.users[0].settings.filter((item: any) => {
            return item.object_key == "SENDER_PROVINCE" && item.status != "D";
          });
          province && setSenderProvinceId(province[0]?.object_id);
          const train = data?.data?.users[0].settings.filter((item: any) => {
            return (
              item.object_key == "SENDER_TRAIN_STATIONS" && item.status != "D"
            );
          });
          const receiverZone = data?.data?.users[0].settings.filter(
            (item: any) => {
              return item.object_key == "RECEIVER_ZONE" && item.status != "D";
            }
          );
          receiverZone && setReceiverPlace(receiverZone[0]?.object_id);
          const receiverProvince = data?.data?.users[0].settings.filter(
            (item: any) => {
              return (
                item.object_key == "RECEIVER_PROVINCE" && item.status != "D"
              );
            }
          );
          receiverProvince &&
            setReceiverProvinceId(receiverProvince[0]?.object_id);
          const receiverTrain = data?.data?.users[0].settings.filter(
            (item: any) => {
              return (
                item.object_key == "RECEIVER_TRAIN_STATIONS" &&
                item.status != "D"
              );
            }
          );
          setCheckUser(false);
          form.setFieldsValue({
            senderName: data?.data?.users[0].customer_name,
            senderCode: data?.data?.users[0].customer_code,
            senderPhone: data?.data?.users[0].phone,
            senderID: data?.data?.users[0].id,
            senderPlace: zone[0]?.object_id,
            senderStationProvince: province[0]?.object_id,
            senderTransport: train[0]?.object_id,
            receiverPlace: receiverZone[0]?.object_id,
            receiverStationProvince: receiverProvince[0]?.object_id,
            receiverTransport: receiverTrain[0]?.object_id,
          });
          getWarehouse(data?.data?.users[0].id);
          getCustomerCallback(data?.data?.users[0].id);
          setSelectedNameValues({
            ...selectedNameValues,
            sender_province: province[0]?.object_value,
            sender_province_id: province[0]?.object_id,
            sender_train: train[0]?.object_value,
            sender_province_train: province[0]?.object_value,
            receiver_province: receiverProvince[0]?.object_value,
            receiver_province_id: receiverProvince[0]?.object_id,
            receiver_train: receiverTrain[0]?.object_value,
            receiver_province_train: receiverProvince[0]?.object_value,
          });
          getDataSenderUser(data?.data?.users[0].settings);
          setDataUser(data?.data?.users[0].settings);
          console.log(data?.data?.users[0].settings.length);
          if (data?.data?.users[0].settings.length === 0) {
            setIsSetting(false);
          }
          else setIsSetting(true)
          setLoading(false);
          return true;
        } else {
          setLoading(false);
          setIsSetting(true)
          setCheckUser(true);
          return false;
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getWarehouse = async (id: any) => {
    let headers: any = {
      "Content-Type": "application/json,text/plain, */*",
    };
    let token = localGetToken();
    let uuid = localGetAuthUUID();
    if (token) {
      headers.Authorization = token;
      headers["x-auth-uuid"] = uuid;
    }
    try {
      const { data } = await axios.get(
        `${API_URL}/${ROOT_VERSION}/customer-address?customer_id=${id}`,
        {
          headers: headers,
        }
      );
      if (data) {
        setWarehouses(data?.data?.listCustomerAddress);
        setTotalWarehouses(data?.data?.listCustomerAddress);

        for (var i = 0; i < data?.data?.listCustomerAddress.length; i++) {
          if (Number(data?.data?.listCustomerAddress[i].is_main) === 1) {
            setSenderProvinceIdAddress(
              data?.data?.listCustomerAddress[i].province_id
            );
            setSenderDistrictIdAddress(
              data?.data?.listCustomerAddress[i].district_id
            );
            form.setFieldsValue({
              senderProvince: data?.data?.listCustomerAddress[i].province_id,
              senderDistrict: data?.data?.listCustomerAddress[i].district_id,
              senderWard: data?.data?.listCustomerAddress[i].ward_id,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickStore = (e: any) => {
    setOnChangeSenderAdress(e.id);
    setSenderProvinceIdAddress(e.province_id);
    setSenderDistrictIdAddress(e.district_id);
    setSelectedNameValues({
      ...selectedNameValues,
      sender_province_id: e.province_id,
      sender_district_id: e.district_id,
      // sender_ward_id: e.ward_id,

      sender_province: e.province_name,
      sender_district: e.district_name,
      // sender_ward: e.ward_name,
    });
    form.setFieldsValue({
      senderProvince: e.province_id,
      senderDistrict: e.district_id,
      senderWard: e.ward_id,
      senderAddress: e.address,
    });
  };

  const handleClickTotalStore = (e: any) => {
    setOnChangeAdress(e.id);
    setReceiverProvinceIdAddress(e.province_id);
    setReceiverDistrictIdAddress(e.district_id);
    setSelectedNameValues({
      ...selectedNameValues,
      receiver_province_id: e.province_id,
      receiver_district_id: e.district_id,
      //receiver_ward_id: e.ward_id,

      receiver_province: e.province_name,
      receiver_district: e.district_name,
      //receiver_ward: e.ward_name,
    });
    form.setFieldsValue({
      receiverProvince: e.province_id,
      receiverDistrict: e.district_id,
      receiverWard: e.ward_id,
      receiverAddress: e.address,
    });
  };

  return (
    <MainInformationComponent>
      <Modal
        title="Danh sách kho"
        visible={visibleList}
        onCancel={() => setVisibleList(false)}
        onOk={() => setVisibleList(false)}
        width="40%"
      >
        <VehicleListComponent>
          <div className="tableVehicle">
            <div className="row col-12">
              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Địa chỉ
              </div>
              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Phường/xã
              </div>

              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Quận/huyện
              </div>
              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Thành phố/tỉnh
              </div>
            </div>
            {warehouses?.length > 0 ? (
              warehouses.map((item: any, index: any) => (
                <div
                  className={`row col-12 mainRowVehicle ${
                    onChangeSenderAdress === item.id && "selectedMainRowVehicle"
                  }`}
                  key={index}
                  onClick={() => handleClickStore(item)}
                >
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    <div>{item.address}</div>
                  </div>
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    <div>{item.ward_name}</div>
                  </div>
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    {" "}
                    <div>{item.district_name}</div>
                  </div>
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    <div>{item.province_name}</div>{" "}
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </VehicleListComponent>
      </Modal>
      <Modal
        title="Danh sách kho"
        visible={visibleTotalList}
        onCancel={() => setVisibleTotalList(false)}
        onOk={() => setVisibleTotalList(false)}
        width="40%"
      >
        <VehicleListComponent>
          <div className="tableVehicle">
            <div className="row col-12">
              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Địa chỉ
              </div>
              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Phường/xã
              </div>

              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Quận/huyện
              </div>
              <div style={{ width: "25%", fontWeight: "600", padding: "8px" }}>
                Thành phố/tỉnh
              </div>
            </div>
            {totalWarehouses?.length > 0 ? (
              totalWarehouses.map((item: any, index: any) => (
                <div
                  className={`row col-12 mainRowVehicle ${
                    onChangeAdress === item.id && "selectedMainRowVehicle"
                  }`}
                  key={index}
                  onClick={() => handleClickTotalStore(item)}
                >
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    <div>{item.address}</div>
                  </div>
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    <div>{item.ward_name}</div>
                  </div>
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    {" "}
                    <div>{item.district_name}</div>
                  </div>
                  <div style={{ width: "25%" }} className="rowTableVehicle">
                    <div>{item.province_name}</div>{" "}
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </VehicleListComponent>
      </Modal>
      {isSetting && (
        <button className="submitBtnAddOrder" type="submit" form="formAddOrder">
          <SvgIconPlus />
          &nbsp; Tạo đơn
        </button>
      )}
      {!isSetting && (
        <div style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
          <span>
            <SvgIconPlus />
            &nbsp; Tài khoản chưa đăng ký dịch vụ! Vui lòng liên hệ nhà cung cấp
          </span>
        </div>
      )}
      <h4 className="mainInformation-mainHeader">Thông tin dịch vụ</h4>
      <ShipMethod
        getShipMethodCallback={getShipMethodCallback}
        getServiceCallback={getServiceCallback}
        dataUser={dataUser}
      />
      <Spin spinning={loading}>
        <div className="mainInformation-container">
          <div className="mainInformation-container-left">
            {shipMethod === 1 || shipMethod === 2 ? (
              <h4>Thông tin người gửi</h4>
            ) : (
              <div className="headerHaveStore" onClick={() => openListStore()}>
                <h4>Thông tin người gửi</h4>
                <div className="haveStore">
                  <SvgIconShop />
                  &nbsp;Danh sách kho
                </div>
              </div>
            )}
            <div
              className="mainInformation-container-left__info"
              style={{ marginTop: "16px" }}
            >
              <div
                className="dropdownProducts"
                style={{ width: "calc((100% - 16px) /3)" }}
                // onMouseLeave={(e: any) => setDropdownUsers(false)}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Số điện thoại"
                  width="100%"
                  placeholder="Nhập số điện thoại"
                  padding="0 12px"
                  name="senderPhone"
                  onChange={(e: any) => handleChangeInput(e)}
                  // onMouseOver={(e: any) => setDropdownUsers(true)}
                  // onBlur={(e: any) =>
                  //   searchKey.length > 0
                  //     ? checkUserFunction(searchKey)
                  //     : //   setDropdownUsers(false);

                  //       setCheckUser(false)
                  // }
                  value={searchKey}
                />
                {/* {dropdownUsers && dataUsers && (
                <div className="dropdownProducts__content">
                  <div className="dropdownProducts__content__body">
                    <div ref={topContainer} style={{ height: "0px" }}></div>
                    {dataUsers.length > 0 ? (
                      dataUsers.map((user, index) => (
                        <div
                          className="dropdownProducts__content__body__user"
                          key={index}
                          onClick={() => handleAddItem(user)}
                        >
                          <div>{user.phone}</div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          height: "300px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Empty image={Empty.PRESENTED_IiMAGE_SIMPLE} />
                      </div>
                    )}
                    <div ref={loadInfiniti} style={{ marginTop: "20px" }}></div>

                    {loading && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "40px",
                          width: "100%",
                        }}
                      >
                        <Spin />
                      </div>
                    )}
                  </div>
                </div>
              )} */}
                {checkUser && (
                  <div
                    style={{
                      position: "absolute",

                      color: "rgb(254,70,70)",
                    }}
                  >
                    Không tồn tại số điện thoại
                  </div>
                )}
              </div>
              <Form.Item
                style={{ width: "calc((100% - 16px) /3)" }}
                name="senderName"
                rules={rules}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Họ tên"
                  placeholder="Nhập họ tên"
                  width="100%"
                />
              </Form.Item>
              <Form.Item
                style={{ width: "calc((100% - 16px) /3)", display: "none" }}
                name="senderPhone"
                rules={rules}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Mã khách hàng"
                  placeholder="Nhập mã khách hàng"
                  width="calc((100% - 16px) /3)"
                  display="none"
                />
              </Form.Item>
              <FormInputAntd
                {...defaultStyles}
                label="Mã khách hàng"
                name="senderID"
                placeholder="Nhập mã khách hàng"
                width="calc((100% - 16px) /3)"
                display="none"
              />

              <Form.Item
                style={{ width: "calc((100% - 16px) /3)" }}
                name="senderCode"
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Mã khách hàng"
                  placeholder="Nhập mã khách hàng"
                  width="100%"
                />
              </Form.Item>
            </div>
            {shipMethod === 1 || shipMethod === 2 ? (
              <div
                className="mainInformation-container-left__shipAddressTransport"
                style={{ marginTop: "-24px" }}
              >
                <FormSelectAntd
                  {...defaultStyles}
                  name="senderPlace"
                  label="Ga gửi hàng"
                  placeholder="Khu vực"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={zones}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeSenderPlace(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    {console.log('option',option);
                    
                      return option.label.includes(input)}
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn khu vực",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="senderStationProvince"
                  label="&nbsp;"
                  placeholder="Chọn tỉnh thành"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={senderProvinces}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeSenderProvince(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tỉnh/ thành",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="senderTransport"
                  label="&nbsp;"
                  placeholder="Chọn ga"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={senderTrainStations}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeSenderStation(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ga",
                    },
                  ]}
                />
              </div>
            ) : (
              <div
                className="mainInformation-container-left__shipAddressStore"
                style={{ marginTop: "-24px" }}
              >
                <FormSelectAntd
                  {...defaultStyles}
                  name="senderProvince"
                  label="Địa chỉ"
                  placeholder="Chọn tỉnh thành"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={provinces}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeSenderProvinceAddress(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tỉnh/ thành",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="senderDistrict"
                  label="&nbsp;"
                  placeholder="Chọn quận huyện"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={senderDistrict}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeSenderDistrictAddress(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn quận/ huyện",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="senderWard"
                  label="&nbsp;"
                  placeholder="Chọn phường xã"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={senderWards}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeSenderWardsAddress(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                />
                <FormInputAntd
                  {...defaultStyles}
                  name="senderAddress"
                  placeholder="Nhập địa chỉ"
                  width="100%"
                  margin="20px 0 0 0"
                  rules={rules}
                />
              </div>
            )}
          </div>
          <div className="mainInformation-container-right">
            {shipMethod === 1 || shipMethod === 3 ? (
              <h4>Thông tin người nhận</h4>
            ) : (
              <div
                className="headerHaveStore"
                onClick={() => openListTotalStore()}
              >
                <h4>Thông tin người nhận</h4>
                <div className="haveStore">
                  <SvgIconShop />
                  &nbsp;Danh sách kho
                </div>
              </div>
            )}

            <div
              className="mainInformation-container-left__info"
              style={{ marginTop: "16px" }}
            >
              <Form.Item
                style={{ width: "calc((100% - 16px) /3)" }}
                name="receiverName"
                rules={rules}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Họ tên"
                  placeholder="Nhập họ tên"
                  width="100%"
                />
              </Form.Item>
              <Form.Item
                style={{ width: "calc((100% - 16px) /3)" }}
                name="receiverPhone"
                rules={rules}
              >
                <InputNewStyled
                  {...defaultStyles}
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  width="100%"
                />
              </Form.Item>

              <div style={{ width: "calc((100% - 16px) /3)" }} />
            </div>
            {shipMethod === 1 || shipMethod === 3 ? (
              <div
                className="mainInformation-container-right__shipAddressTransport"
                style={{ marginTop: "-24px" }}
              >
                <FormSelectAntd
                  {...defaultStyles}
                  name="receiverPlace"
                  label="Ga nhận hàng"
                  placeholder="Khu vực"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={zones}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeReceiverPlace(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn khu vực",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="receiverStationProvince"
                  label="&nbsp;"
                  placeholder="Chọn tỉnh thành"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={receiverProvinces}
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeReceiverProvince(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tỉnh/ thành",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="receiverTransport"
                  label="&nbsp;"
                  placeholder="Chọn ga"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={receiverTrainStations}
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeReceiverStation(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ga",
                    },
                  ]}
                />
              </div>
            ) : (
              <div
                className="mainInformation-container-right__shipAddressStore"
                style={{ marginTop: "-24px" }}
              >
                <FormSelectAntd
                  {...defaultStyles}
                  name="receiverProvince"
                  label="Địa chỉ"
                  placeholder="Chọn tỉnh thành"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={provinces}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeReceiverProvinceAddress(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tỉnh/ thành",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="receiverDistrict"
                  label="&nbsp;"
                  placeholder="Chọn quận huyện"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={receiverDistrict}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeReceiverDistrictAddress(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn quận/ huyện",
                    },
                  ]}
                />
                <FormSelectAntd
                  {...defaultStyles}
                  name="receiverWard"
                  label="&nbsp;"
                  placeholder="Chọn phường xã"
                  width="calc((100% - 16px) /3)"
                  margin="16px 0 0 0"
                  padding="0"
                  options={receiverWards}
                  fontSizeLabel="12px"
                  suffixIcon={<img src={arrow} alt="" />}
                  onChange={(e: any) => onChangeReceiverWardsAddress(e)}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input: any, option: any) =>
                    option.label.includes(input)
                  }
                />
                <FormInputAntd
                  {...defaultStyles}
                  name="receiverAddress"
                  placeholder="Nhập địa chỉ"
                  width="100%"
                  margin="20px 0 0 0"
                  rules={rules}
                />
              </div>
            )}
          </div>
        </div>
      </Spin>
    </MainInformationComponent>
  );
};

export default MainInformation;

const MainInformationComponent = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  padding: 16px 16px 24px 16px;
  .submitBtnAddOrder {
    position: absolute;
    right: 16px;
    top: 16px;
    border-radius: 5px;
    width: 120px;
    color: #fff;
    background: ${colors.accent_color_5_6};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
  }
  .mainInformation-mainHeader {
    font-weight: 500;
    font-size: 16px;
  }
  .mainInformation-container {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    h4 {
      font-size: 14px;
      font-weight: 500;
    }
    .mainInformation-container-left {
      width: calc(50% - 24px);
      &__info {
        display: flex;
        justify-content: space-between;
      }

      &__shipAddressTransport {
        display: flex;
        justify-content: space-between;
      }
      &__shipAddressStore {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
    .mainInformation-container-right {
      width: calc(50% - 24px);
      &__info {
        display: flex;
        justify-content: space-between;
      }
      &__shipAddressTransport {
        display: flex;
        justify-content: space-between;
      }
      &__shipAddressStore {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
  .headerHaveStore {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .haveStore {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.accent_color_5_6};
    font-weight: 600;
    cursor: pointer;
    svg path {
      fill: ${colors.accent_color_5_6};
      transform: scale(0.9);
    }
  }
`;

const VehicleListComponent = styled.div`
  .datepickerVehicle {
    width: calc(35% - 4px);
    margin-top: -22px;
    span {
      font-size: 12px;
    }
    .datepickerVehicle-select {
      width: 100%;
      height: 41px;
      border-radius: 5px;
    }
  }
  .tableVehicle {
    margin: 8px 0;
    border-radius: 5px;
    max-height: 470px;
    overflow-y: scroll;
    border: 1px solid #bfc4c9;
    position: relative;
  }
  .totalInformationVehicle {
    display: flex;
    align-items: center;
  }
  .mainRowVehicle {
    cursor: pointer;
    border-top: 1px solid #bfc4c9;
    :hover {
      background: #bfc4c9;
    }
  }
  .selectedMainRowVehicle {
    background: #2d9cdb !important;
    color: white;
    span {
      color: white !important;
    }
  }
  .rowTableVehicle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
  }
  .buttonSubmit {
    display: flex;
    border-radius: 5px;
    background: #2d9cdb;
    height: 41px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    svg {
      transform: scale(0.8);
      path {
        fill: #fff;
      }
    }
  }
`;
