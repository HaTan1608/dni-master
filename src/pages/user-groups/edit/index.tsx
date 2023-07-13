// import { CATEGORIES_MOCK } from "./json";
// import TableCate from "./TableCate";
/* eslint-disable */
import { Row, Col, Breadcrumb, Checkbox, Form, FormInstance, Spin } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import FormText from "src/components/form/FormText";
import { notifyError, notifySuccess } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import {
  getListUserGroupPrivilege,
  getUserGroupById,
  updateOneUserGroup,
} from "src/services/actions/user.actions";
import { AppState, RouteParams } from "src/types";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { geneUniqueKey } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import "./styles.less";
const UserGroupEdit = ({}: any) => {
  const refFormUpdate = createRef<FormInstance>();
  const [formUpdate] = Form.useForm();
  const [mainChecked, setMainChecked] = useState<any[]>([]);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const isMount = useIsMount();
  const paramsURL = useParams<RouteParams>();
  const [functions, setFunctions] = useState<any[]>([]);
  const stateGetListUserGroupsPrivilege = useSelector(
    (e: AppState) => e.userReducer.stateGetListUserGroupsPrivilege
  );
  const stateGetUserGroupsByid = useSelector(
    (e: AppState) => e.userReducer.stateGetUserGroupsByid
  );
  const stateUpdateOneUserGroups = useSelector(
    (e: AppState) => e.userReducer.stateUpdateOneUserGroups
  );

  /****************************START**************************/
  /*                         Life Cycle                      */
  const [roles, setRoles] = useState<any>([]);
  const pathName = useHistory().location.pathname.slice(1,12);
  useEffect(() => {
    let _dataUser = JSON.parse(localStorage.getItem("ACCOUNT") || "");
    let fakeRoles = [];
    if (_dataUser?.menu) {
      for (let i = 0; i < _dataUser.menu.length; i++) {
        for (let j = 0; j < _dataUser.menu[i].children.length; j++) {
          if (
            _dataUser.menu[i].children[j].funct_code === pathName.toString()
          ) {
            for (
              let k = 0;
              k < _dataUser.menu[i].children[j].children.length;
              k++
            ) {
              if (
                _dataUser.menu[i].children[j].children[k].funct_code ===
                "update-user-group"
              ) {
                fakeRoles.push("update-user-group");
              }
            }
            break;
          }
        }
      }
      setRoles(fakeRoles);
    }
  }, [localStorage.getItem("ACCOUNT")]);
  useEffect(() => {
    dispatch(getListUserGroupPrivilege());
    dispatch(getUserGroupById(paramsURL.id));
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { data, message, success, error } = stateGetListUserGroupsPrivilege;
    if (success) {
      let fakeFunctions = [
        ...data?.sort(
          (a: any, b: any) => b?.children.length - a?.children.length
        ),
      ];
      let convertArray = [];
      for (var i = 0; i < fakeFunctions.length; i++) {
        let convertLevel1 = {
          children: [] as any,
          value: fakeFunctions[i]?.funct_id,
          label: fakeFunctions[i]?.funct_name,
          id: fakeFunctions[i]?.funct_id,
        };
        for (var j = 0; j < fakeFunctions[i]?.children.length; j++) {
          let convertLevel2 = {
            children: [] as any,
            value: fakeFunctions[i]?.children[j].funct_id,
            label: fakeFunctions[i]?.children[j].funct_name,
            id: fakeFunctions[i]?.children[j].funct_id,
          };
          for (
            var k = 0;
            k < fakeFunctions[i]?.children[j].children.length;
            k++
          ) {
            convertLevel2.children.push({
              value: fakeFunctions[i]?.children[j].children[k].funct_id,
              label: fakeFunctions[i]?.children[j].children[k].funct_name,
            });
          }
          convertLevel1.children.push(convertLevel2);
        }
        convertArray.push(convertLevel1);
      }
      setFunctions(convertArray);
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateGetListUserGroupsPrivilege.isLoading]);

  useEffect(() => {
    if (isMount) return;
    if (functions.length === 0) return;
    const { data, message, success, error } = stateGetUserGroupsByid;
    if (success) {
      let arrayChecked = [] as any;
      for (var i = 0; i < data?.functs?.length; i++) {
        for (var j = 0; j < functions.length; j++) {
          if (
            data.functs[i].funct_id === functions[j].value &&
            functions[j].children.length === 0
          ) {
            let fakeMainChecked = [...mainChecked];
            let a = fakeMainChecked.find((x) => x.id === data.functs[i]);
            if (!a) {
              fakeMainChecked.push({
                id: data.functs[i].funct_id,
                checkAll: true,
                ilu: false,
              });
              setMainChecked(fakeMainChecked);
            }
          }
          for (var k = 0; k < functions[j]?.children.length; k++) {
            if (
              functions[j]?.children[k].value === data.functs[i].funct_id &&
              functions[j]?.children[k].children.length === 0
            ) {
              let a = arrayChecked.find(
                (x: any) => x.id === functions[j].children[k].id
              );

              if (a) {
                a.listLabel = [];
                a.value = [];
                a.indeterminate = false;
                a.checkAll = true;
                arrayChecked = arrayChecked.map((x: any) =>
                  x.id === functions[j].children[k].id ? a : x
                );
              } else {
                arrayChecked.push({
                  checkAll: true,
                  id: functions[j].children[k].id,
                  indeterminate: false,
                  listLabel: [],
                  parent_id: functions[j].id,
                  value: [],
                });
              }
            }
            for (var l = 0; l < functions[j].children[k].children.length; l++) {
              if (
                data.functs[i]?.funct_id ==
                functions[j].children[k].children[l].value
              ) {
                let a = arrayChecked.find(
                  (x: any) => x.id === functions[j].children[k].id
                );
                if (a) {
                  a.listLabel.push(functions[j].children[k].children[l]);
                  a.value.push(data.functs[i]?.funct_id);
                  a.indeterminate =
                    functions[j]?.children[k]?.children.length >
                      a.value.length && a.value.length > 0
                      ? true
                      : false;
                  a.checkAll =
                    functions[j]?.children[k]?.children.length ===
                    a.value.length
                      ? true
                      : false;
                  arrayChecked = arrayChecked.map((x: any) =>
                    x.id === functions[j].children[k].id ? a : x
                  );
                } else {
                  arrayChecked.push({
                    checkAll:
                      functions[j].children[k].children.length == 1
                        ? true
                        : false,
                    id: functions[j].children[k].id,
                    indeterminate: false,
                    listLabel: [functions[j].children[k].children[l]],
                    parent_id: functions[j].id,
                    value: [data.functs[i]?.funct_id],
                  });
                }
              }
            }
          }
        }
      }
      setCheckedList(arrayChecked);
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateGetUserGroupsByid.isLoading, functions]);

  useEffect(() => {
    if (isMount) return;
    const { message, success, error } = stateUpdateOneUserGroups;
    if (success) {
      notifySuccess("Cập nhật thành công !");
      return history.push({
        pathname: routerNames.USER_GROUPS,
      });
    }
    if (success === false || error) {
      let msg = getMessageV1(message, ", ");
      return notifyError(msg);
    }
  }, [stateUpdateOneUserGroups.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const btnCreatePrivilege = () => {
    let arrayId = [] as any;
    for (var i = 0; i < checkedList.length; i++) {
      if (checkedList[i].value.length > 0) {
        arrayId.push(checkedList[i].id);
        arrayId = arrayId.concat(checkedList[i].value);
      }
    }
    for (var i = 0; i < mainChecked.length; i++) {
      if (mainChecked[i].checkAll || mainChecked[i].ilu) {
        arrayId.push(mainChecked[i].id);
      }
    }
    let params = {
      role_name: stateGetUserGroupsByid?.data?.role_name || "",
      funct_ids: arrayId,
    };
    dispatch(updateOneUserGroup(paramsURL.id, params));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onCheckAllChange = (id: any, parent_id: any) => {
    let fakeCate = [] as any;
    let listHaveValue = [] as any[];

    let listCate = functions
      ?.find((a) => a.children.find((x: any) => x.id === id))
      ?.children?.find((x: any) => x.value === id)?.children;
    for (var c = 0; c < listCate.length; c++) {
      fakeCate.push(listCate[c].value);
      listHaveValue.push(listCate[c]);
    }
    for (var i = 0; i < checkedList.length; i++) {
      if (checkedList[i].id === id) {
        let fakeList = [...checkedList];
        setCheckedList(
          fakeList.map((obj) =>
            obj.id === id
              ? obj.checkAll === false
                ? {
                    parent_id: parent_id,

                    id: id,
                    value: fakeCate,
                    listLabel: listHaveValue,

                    checkAll: true,
                    indeterminate: false,
                  }
                : {
                    parent_id: parent_id,

                    id: id,
                    value: [],
                    checkAll: false,
                    indeterminate: false,
                  }
              : obj
          )
        );
        return;
      } else {
        continue;
      }
    }
    setCheckedList([
      ...checkedList,
      {
        parent_id: parent_id,

        id: id,
        value: fakeCate,
        listLabel: listHaveValue,

        checkAll: true,
        indeterminate: false,
      },
    ]);
  };
  const onChange = (list: any, id: any, parent_id: any) => {
    let listCate = functions
      ?.find((a) => a.children.find((x: any) => x.id === id))
      ?.children?.find((x: any) => x.value === id)?.children;
    let listHaveValue = [] as any[];
    for (var x = 0; x < list.length; x++) {
      listHaveValue.push(listCate?.find((cate: any) => cate.value === list[x]));
    }
    for (var i = 0; i < checkedList.length; i++) {
      if (checkedList[i].id === id) {
        let fakeList = [...checkedList];
        setCheckedList(
          fakeList.map((obj) =>
            obj.id === id
              ? {
                  parent_id: parent_id,

                  id: id,
                  value: list,
                  listLabel: listHaveValue,

                  checkAll: list.length === listCate.length,
                  indeterminate: !!list.length && list.length < listCate.length,
                }
              : obj
          )
        );
        return;
      } else {
        continue;
      }
    }
    setCheckedList([
      ...checkedList,
      {
        parent_id: parent_id,
        id: id,
        value: list,
        listLabel: listHaveValue,
        checkAll: list.length === listCate.length,
        indeterminate: !!list.length && list.length < listCate.length,
      },
    ]);
  };
  useEffect(() => {
    let arrayTest = [...mainChecked];
    const handleCheckLevel1True = (id: any) => {
      let fakeArray = [...checkedList].filter((x) => x.parent_id === id);
      let lengthArray = [...functions].find((x) => x.id === id);
      let array = arrayTest;
      if (lengthArray.children.length === 0) {
      } else if (
        (fakeArray && fakeArray.length === 0) ||
        (fakeArray.length === 1 && fakeArray[0].value.length === 0)
      ) {
        let item = {
          checkAll: false,
          ilu: false,
          id: id,
        };

        if (array.find((x) => x.id === id)) {
          array = array.map((x) => (x.id === id ? item : x));
        } else {
          array.push(item);
        }
      } else if (
        fakeArray.find((x) => x.checkAll === false) ||
        fakeArray.length < lengthArray?.children?.length
      ) {
        let item = {
          checkAll: false,
          ilu: true,
          id: id,
        };
        if (array.find((x) => x.id === id)) {
          array = array.map((x) => (x.id === id ? item : x));
        } else {
          array.push(item);
        }
      } else {
        for (var i = 0; i < fakeArray.length; i++) {
          if (!fakeArray[i].checkAll) {
            let item = {
              checkAll: false,
              ilu: true,
              id: id,
            };
            if (array.find((x) => x.id === id)) {
              array = array.map((x) => (x.id === id ? item : x));
            } else {
              array.push(item);
            }
            return;
          }
        }
        let item = {
          checkAll: true,
          ilu: false,
          id: id,
        };
        if (array.find((x) => x.id === id)) {
          array = array.map((x) => (x.id === id ? item : x));
        } else {
          array.push(item);
        }
      }
      arrayTest = array;
    };
    for (var i = 0; i < functions.length; i++) {
      handleCheckLevel1True(functions[i].id);
    }
    setMainChecked(arrayTest);
  }, [checkedList]);

  const handleCheckLevel1 = (e: any, id: any) => {
    let lengthArray = [...functions].find((x) => x.id === id);
    let convertChecked = [...checkedList];
    if (e) {
      for (var i = 0; i < lengthArray.children.length; i++) {
        let value = [] as any;
        let listLabel = [] as any;
        for (var j = 0; j < lengthArray.children[i].children.length; j++) {
          value.push(lengthArray.children[i].children[j].value);
          listLabel.push({
            value: lengthArray.children[i].children[j].value,
            label: lengthArray.children[i].children[j].label,
          });
        }
        let item = {
          parent_id: id,
          id: lengthArray.children[i].id,
          value: value,
          listLabel: listLabel,
          checkAll: true,
          indeterminate: false,
        };
        convertChecked = convertChecked.map((x) =>
          x.id === item.id ? item : x
        );
        if (!convertChecked.find((x) => x.id === item.id)) {
          convertChecked.push(item);
        }
        setCheckedList(convertChecked);
      }
      let item2 = {
        checkAll: true,
        ilu: false,
        id: id,
      };
      if (mainChecked.find((x) => x.id === id)) {
        setMainChecked(mainChecked.map((x) => (x.id === id ? item2 : x)));
      } else {
        setMainChecked([...mainChecked, item2]);
      }
    } else {
      for (var i = 0; i < lengthArray.children.length; i++) {
        convertChecked = convertChecked.filter(
          (x) => x.id !== lengthArray.children[i].id
        );
      }
      setCheckedList(convertChecked);
      setMainChecked(mainChecked.filter((x) => x.id !== id));
    }
  };
  /**************************** END **************************/

  const _renderSetting = () => {
    return (
      <div
        style={{
          background: "#fff",
          padding: "16px",
          marginTop: "16px",
          borderRadius: "5px",
        }}
      >
        <p className="text-16 font-medium">
          Cấu hình phân quyền{" "}
          <span style={{ color: colors.accent_color_5_2 }}>
            {stateGetUserGroupsByid?.data?.role_name}
          </span>
        </p>

        <div
          className="w-full bg-white p-2 mt-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {functions &&
            functions.length > 0 &&
            functions.map((functionLevel1) => (
              <div
                style={{ width: "33%", marginBottom: "16px" }}
                key={geneUniqueKey()}
              >
                <Checkbox
                  key={geneUniqueKey()}
                  indeterminate={
                    mainChecked.find((x) => x.id === functionLevel1.id)?.ilu
                  }
                  onChange={(e: any) =>
                    handleCheckLevel1(e.target.checked, functionLevel1?.id)
                  }
                  checked={
                    mainChecked.find((x) => x.id === functionLevel1.id)
                      ?.checkAll
                  }
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: colors.primary_color_1_1,
                    }}
                  >
                    {functionLevel1.label}
                  </div>
                </Checkbox>
                {functionLevel1.children &&
                  functionLevel1.children.map((functionLevel2: any) => (
                    <div key={geneUniqueKey()}>
                      <Checkbox
                        key={geneUniqueKey()}
                        indeterminate={
                          checkedList.find(
                            (element) => element.id === functionLevel2?.id
                          )?.indeterminate
                        }
                        onChange={() =>
                          onCheckAllChange(
                            functionLevel2?.id,
                            functionLevel1.id
                          )
                        }
                        checked={
                          checkedList.find(
                            (element) => element.id === functionLevel2?.id
                          )?.checkAll
                        }
                        className="checkboxUserGroup"
                      >
                        <div
                          key={geneUniqueKey()}
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: colors.primary_color_1_3,
                          }}
                        >
                          {functionLevel2.label}
                        </div>
                        {functionLevel2.children.length > 0 && (
                          <Checkbox.Group
                            className="endChild"
                            key={geneUniqueKey()}
                            options={functionLevel2.children}
                            value={
                              checkedList.find(
                                (element) => element.id === functionLevel2?.id
                              )?.value
                            }
                            onChange={(e: any) =>
                              onChange(
                                e,
                                functionLevel2?.id,
                                functionLevel1?.id
                              )
                            }
                          />
                        )}
                      </Checkbox>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full  pl-4 pr-4 mt-3">
      <SubHeader
        breadcrumb={[
          { text: "Quản trị người dùng" },
          { text: "Nhóm người dùng" },
          { text: "Chi tiết" },
        ]}
        button={roles.find((x:any) => x === "update-user-group")&&[
          {
            text: "Cập nhật",
            class: "mainBtn plusSvg",
            svg: <SvgIconStorage />,
            form: "formUpdate",
          },
        ]}
      />
      <div className="mt-3">
        <Form
          name="formUpdate"
          layout="vertical"
          form={formUpdate}
          onFinish={btnCreatePrivilege}
          onFinishFailed={onFinishFailed}
        >
          {stateGetListUserGroupsPrivilege.isLoading ? (
            <div className="h-full w-full flex justify-center">
              <div style={{ marginTop: "20%" }}>
                <Spin />
              </div>
            </div>
          ) : (
            <>{_renderSetting()}</>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UserGroupEdit;
/* eslint-disable */
