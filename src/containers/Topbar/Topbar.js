import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import appActions from "../../redux/app/actions";
import TopbarNotification from "./TopbarNotification";
import { MenuOutlined } from "@ant-design/icons";
import TopbarUser from "./TopbarUser";

import TopbarWrapper from "./Topbar.styles";
import { menuIcon } from "../../assets/Icons";

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const [, setSelectedItem] = React.useState("");
  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.topbarTheme
  );
  const { collapsed, openDrawer } = useSelector((state) => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: "fixed",
    width: "100%",
    height: 70,
  };

  const getCustomerName = () => {
    // const custmer = JSON.parse(localStorage.getItem("profile"));
    // return custmer.customerName;
    return ''
  };

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
        }
      >
        <div className="isoLeft">
          <span 
          onClick={handleToggle}
          >
            {menuIcon}
          </span>
          {/* <MenuOutlined
            className={
              isCollapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
            }
            style={{ color: customizedTheme.textColor, fontSize: "18px" }}
            onClick={handleToggle}
          /> */}
          {/* <button /> */}
        </div>

        <div>
          <h1> {getCustomerName()}</h1>
        </div>
        <ul className="isoRight">
          <li
            onClick={() => setSelectedItem("notification")}
            className="isoNotify"
          >
            <TopbarNotification />
          </li>

          <li onClick={() => setSelectedItem("user")} className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
