/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import { Row, Col, Empty } from "antd";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./styles.less";
import DIcon from "../icons/DIcon";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { change_alias } from "src/utils/helpers/functions/textUtils";
import SvgIconMoveRight from "src/assets/svg/SvgIconMoveRight";
import SvgCreateDet from "src/assets/svg/SvgCreateDet";
import SvgListDet from "src/assets/svg/SvgListDet";
import SvgIconCreateBill from "src/assets/svg/SvgIconCreateBill";
import SvgCreateByFile from "src/assets/svg/SvgCreateByFile";
import SvgIconListProduct from "src/assets/svg/SvgIconListProduct";
import SvgIconCustomer from "src/assets/svg/SvgIconCustomer";
import SvgUserSetting from "src/assets/svg/SvgUseSetting";
import SvgGroupUser from "src/assets/svg/SvgGroupUser";
import SvgZone from "src/assets/svg/SvgZone";
import SvgSetting from "src/assets/svg/SvgSetting";
import SvgXuatKhoTraHang from "src/assets/svg/SvgXuatKhoTraHang";
import SvgTrainNumber from "src/assets/svg/SvgTrainNumber";
import SvgWarehouseIcon from "src/assets/svg/SvgWarehouseIcon";
import SvgCont1 from "src/assets/svg/SvgCont1";
import SvgListed from "src/assets/svg/SvgListed";
import SvgHoanTatDonHang from "src/assets/svg/SvgHoanTatDonHang";
import SvgTraHang from "src/assets/svg/SvgTraHang";
import SvgRouting from "src/assets/svg/SvgRouting";
import SvgReason from "src/assets/svg/SVGReason";
import SvgSupplier from "src/assets/svg/SvgSupplier";

function Sidenav(props: { inputSearch: string; color: any }) {
  const { inputSearch } = props;

  const isMount = useIsMount();

  const { pathname } = useLocation();
  // const page = pathname.replace("/", "");
  const page = pathname.split("/");
  const [dataMenu, setDataMenu] = useState<any[]>([]);

  /****************************START**************************/
  /*                         Life Cycle                      */
  // useEffect(() => {
  //   setDataMenu(listMenu)
  // },[typeRole])
  useEffect(() => {
    let _dataUser = localStorage.getItem("ACCOUNT")
      ? JSON.parse(localStorage.getItem("ACCOUNT") || "")
      : "";

    if (_dataUser?.menu) {
      console.log(_dataUser?.menu);
      let resultMenu = _dataUser?.menu?.map((e: any) => ({
        ...e,
        showAll: false,
      }));
      setDataMenu(resultMenu);
    }
  }, []);

  useEffect(() => {
    if (isMount) return;

    let _dataUser = JSON.parse(localStorage.getItem("ACCOUNT") || "");
    if (_dataUser?.menu) {
      let resultMenu = _dataUser?.menu?.map((e: any) => ({
        ...e,
        showAll: false,
      }));
      let arrMenu: any[] = [];
      resultMenu.forEach((e: any) => {
        if (
          change_alias(e.funct_name || "")?.search(
            change_alias(inputSearch)
          ) !== -1
        ) {
          arrMenu.push(e);
        } else {
          let childrenMenu = e.children.filter(
            (item: any) =>
              change_alias(item.funct_name || "")?.search(
                change_alias(inputSearch)
              ) !== -1
          );
          if (childrenMenu.length > 0) {
            let itemMenu = { ...e, children: [] };
            itemMenu.children = childrenMenu;
            arrMenu.push(itemMenu);
          }
        }
      });
      setDataMenu(arrMenu);
    }
  }, [inputSearch]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  const btnShowAll = (index: number) => {
    const _listMenu = [...dataMenu];
    _listMenu[index] = {
      ..._listMenu[index],
      showAll: !_listMenu[index].showAll,
    };
    setDataMenu(_listMenu);
    console.log(dataMenu);
  };

  /*const resizeAnimation = () => {
  const a = document.getElementById("siderStyled");
  if (window.innerWidth < 1401) {
    a?.classList.add("width0");
  } else {
    a?.classList.remove("width0");
  }
};
const handleCloseNav = () => {
  if (window.innerWidth < 1401) {
    const a = document.getElementById("siderStyled");
 
    a?.classList.add("width0");
  }
};
useEffect(() => {
  const a = document.getElementById("siderStyled");
  if (window.innerWidth < 1401) {
    a?.classList.add("width0");
  } else {
    a?.classList.remove("width0");
  }
  window.addEventListener("resize", resizeAnimation);
}, []);*/

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                      Return Component                   */
  const renderIconMenu = (e: any) => {
    console.log(e);
    switch (e) {
      case "create-package-debt":
        return <SvgCreateDet fill="#fff" />;
      case "package-debt-list":
        return <SvgListDet fill="#fff" />;
      case "orders-create":
        return <SvgIconCreateBill fill="#fff" />;
      case "create-by-file":
        return <SvgCreateByFile fill="#fff" />;
      case "orders":
        return <SvgIconListProduct fill="#fff" />;
      case "customers":
        return <SvgIconCustomer fill="#fff" />;
      case "user-system":
        return <SvgUserSetting fill="#fff" />;
      case "user-groups":
        return <SvgGroupUser fill="#fff" />;
      case "config-zones":
        return <SvgZone fill="#fff" />;
      case "price-setting":
        return <SvgSetting fill="#fff" />;
      case "doi-xe":
        return <SvgXuatKhoTraHang fill="#fff" />;
      case "ma-chuyen":
        return <SvgTrainNumber fill="#fff" />;
      case "so-cont":
        return <SvgCont1 fill="red" />;
      case "warehouse":
        return <SvgWarehouseIcon fill="#fff" />;
      case "routing":
        return <SvgRouting fill="#fff" />;
      case "supplier":
        return <SvgSupplier fill="#fff" />;
      case "reason":
        return <SvgReason fill="#fff" />;
      case "listed-orders/import":
        return <SvgIconListProduct fill="#fff" />;
      case "listed":
        return <SvgListed fill="#fff" />;
      case "listed-orders/export":
        return <SvgIconListProduct fill="#fff" />;
      case "get-statement":
        return <SvgListed fill="#fff" />;
      case "export-bills":
        return <SvgXuatKhoTraHang fill="#fff" />;
      case "delivery-bill":
        return <SvgHoanTatDonHang fill="#fff" />;
      case "inventory":
        return <SvgTraHang fill="#fff" style={{ transform: "scale(1.2)" }} />;
      default:
        return null;
    }
  };
  return (
    <div id="sidenav" className="h-full sidenav bg-accent_color_5_6">
      {dataMenu && dataMenu?.length > 0 ? (
        dataMenu.map((e, index) =>
          e?.children?.length === 0 && e?.route?.length > 0 ? (
            <Link
              key={index}
              to={`/${e.route}`}
              className={`dashboardLink ${
                pathname === "/dashboard" ? "activeLink" : ""
              }`}
            >
              <DIcon icon={e.icon} />
              <span className="db-title">{e.funct_name}</span>
            </Link>
          ) : (
            e.children.length !== 0 && (
              <Col key={index}>
                <div
                  className="button_navBar"
                  onClick={(e) => {
                    e.preventDefault();
                    btnShowAll(index);
                  }}
                >
                  <Row align="middle" className="parent-menu">
                    <span className="icon">
                      <div
                        className={`${
                          !e.showAll ? " iconLeft" : "iconLeft active"
                        }`}
                      >
                        <SvgIconMoveRight />
                      </div>
                      {/* {e.showAll ? (
                        <div className="iconLeft">
                          <SvgIconMoveRight />
                        </div>
                      ) : (
                        <div className="iconLeft">
                          <SvgIconDown />
                        </div>
                      )} */}
                    </span>
                    <span className="titleParentMenu">{e?.funct_name}</span>
                  </Row>
                </div>

                {e.showAll &&
                  e.children.map((item: any, indexItem: number) => (
                    <NavLink key={indexItem} to={`/${item.route}`}>
                      <Row
                        align="middle"
                        className={`${
                          page.length > 0 &&
                          page[1] + page[2] ===
                            item.route.split("/")[0] + item.route.split("/")[1]
                            ? "child-menu-click"
                            : "child-menu"
                        }`}
                        style={{ background: page === item.route ? "red" : "" }}
                      >
                        <span className="icon">
                          <div className="iconLeft">
                            {renderIconMenu(item.icon)}
                          </div>
                        </span>
                        <span className="titleMenu">{item?.funct_name}</span>
                      </Row>
                    </NavLink>
                  ))}
                {index === dataMenu.length - 1 && (
                  <div style={{ marginTop: 50 }}>
                    <div className="copyright flex justify-center"></div>
                  </div>
                )}
              </Col>
            )
          )
        )
      ) : (
        <div className="mt-10">
          <Empty />
        </div>
      )}
    </div>
  );

  /**************************** END **************************/
}

export default Sidenav;
