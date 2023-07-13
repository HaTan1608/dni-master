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
/* eslint-disable */
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Layout, Popover } from "antd";
import Sidenav from "./Sidenav";
import Footer from "./Footer";
import routerNames from "src/utils/data/routerName";
import UserIcon from "../../assets/images/UserIcon.svg";
import SignOutIcon from "../../assets/images/SignOut.svg";
import imageMenuIcon from "../../assets/images/MenuIcon.svg";

import "./styles.less";
import { localGetAccount } from "src/utils/localStorage";
import SvgIconBell from "src/assets/svg/SvgIconBell";
import IconAvatar from "src/assets/images/avatar.png";
import { useDispatch } from "react-redux";
import { putSignIn } from "src/services/actions/global.actions";
import SvgAXIS from "src/assets/svg/SvgAXIS";
import { signOut } from "src/services/actions/account.actions";
const { Header: AntHeader, Content, Sider } = Layout; // eslint-disable-line @typescript-eslint/no-unused-vars

function Main(props: { children: any }) {
  const { children } = props;
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [openNav, setOpenNav] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState<string>("");
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  /****************************START**************************/
  /*                         Life Cycle                      */

  // useEffect(() => {
  //   if (pathname === "rtl") {
  //     setPlacement("left");
  //   } else {
  //     setPlacement("right");
  //   }
  // }, [pathname]);
  const submitSearch = (values: any) => {
    if (values?.search !== undefined) {
      setInputSearch(values.search);
    }
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const _renderBody = () => {
    return (
      <Layout style={{ marginLeft: "20px" }}>
        {/* {fixed ? (
          <Affix offsetTop={0} >
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                placement={undefined}
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <div className={`mt-12 w-full`}>
            <Header
              placement={undefined}
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </div>
        )} */}
        {/* <Content className="content-ant" style={{marginTop:50}}>{children}</Content> */}
        <div className="w-full h-full mt-16">{children}</div>
        <Footer />
      </Layout>
    );
  };

  const _renderSideMenu = () => {
    return (
      <Sider
        collapsible
        collapsed={false}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {}}
        trigger={null}
        width={240}
        theme="light"
        id="siderStyled"
        className={`sider-primary ant-layout-sider-primary ${
          openNav ? "" : "closeNav"
        }`}
        style={{ background: "transparent", padding: 0 }}
      >
        {openNav && <Sidenav inputSearch={inputSearch} color="#1890ff" />}
      </Sider>
    );
  };

  const btnSignOut = () => {
    setVisiblePopover(false);
    dispatch(signOut({ history }));
  };
  const btnProfile = () => {
    setVisiblePopover(false);
    history.push({
      pathname: routerNames.PROFILE,
    });
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                      Return Component                   */
  const content = () => {
    return (
      <div className="flex flex-col">
        {/* <button
          onClick={btnChangePass}
          className="flex items-center justify-start my-1"
        >
          <SvgIconKey />
          <p className="text-14 px-2">Đổi mật khẩu</p>
        </button> */}
        <button
          onClick={btnProfile}
          className="flex items-center justify-start my-1"
        >
          <img src={UserIcon} alt="" />
          <p className="text-14 px-2">Tài khoản</p>
        </button>
        <button
          onClick={btnSignOut}
          className="flex items-center justify-start my-1"
        >
          <img src={SignOutIcon} alt="" />
          <p className="text-14 px-2">Đăng xuất</p>
        </button>
      </div>
    );
  };
  const _renderProfile = () => {
    let _account = localGetAccount();
    let _name = "";
    if (_account) {
      let _user = JSON.parse(_account);
      _name =
        _user.userData && _user.userData.full_name
          ? _user.userData.full_name
          : "Tài khoản";
    }
    return (
      <div className="flex items-center justify-end">
        <SvgIconBell className="cursor-pointer" />
        <Popover
          content={content}
          title=""
          trigger="click"
          visible={visiblePopover}
          onVisibleChange={(e) => setVisiblePopover(e)}
        >
          <button className="flex items-center ml-2">
            <img src={IconAvatar} className="mr-2" alt="avatarUser" />
            <p className="text-16 text-neutral_color_1_8">{_name}</p>
          </button>
        </Popover>
      </div>
    );
  };
  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <div
        className="fixed w-full z-50 flex items-center justify-between bg-accent_color_5_5 top-0 left-0 right-0 border-b border-border px-2"
        style={{ height: 50 }}
      >
        <div className="flex items-center h-full">
          <div
            className="contentHeader-left mr-4"
            onClick={() => setOpenNav(!openNav)}
          >
            <img src={imageMenuIcon} alt="" />
          </div>
          <SvgAXIS />
        </div>
        {_renderProfile()}
      </div>
      {_renderSideMenu()}
      {_renderBody()}
    </Layout>
  );

  /**************************** END **************************/
}

export default Main;
