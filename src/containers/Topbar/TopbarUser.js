import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Popover from "../../components/uielements/popover";
import IntlMessages from "../../components/utility/intlMessages";
import userpic from "../../assets/images/User.png";
import { Auth } from "../../service/Auth";
import TopbarDropdownWrapper from "./TopbarDropdown.styles";
import { ArrowDownIcon } from "../../assets/Icons";

// const { logout } = authAction;

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link className="isoDropdownLink" to={"/dashboard/my-profile"}>
        <IntlMessages id="topbar.myprofile" />
      </Link>
      {/* <a className="isoDropdownLink" href="# ">
        <IntlMessages id="themeSwitcher.settings" />
      </a>
      <a className="isoDropdownLink" href="# ">
        <IntlMessages id="sidebar.feedback" />
      </a> */}
      <a className="isoDropdownLink" href="# ">
        <IntlMessages id="topbar.help" />
      </a>
      <a className="isoDropdownLink" onClick={Auth.logout.bind(this)} href="# ">
        <IntlMessages id="topbar.logout" />
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    
      <div className=" isoUser shadow-sm clear-fix p-2"> 
        <div className="row">
          <div className="col-2">
            <img src={userpic} height="30" width="30" alt="user"/>
          </div>
          <div className="col-7">
              <div className="flex">
                <span className="font-weight-bolder">
                  Muhammad Iqbal
                </span>
                <span>
                  Buyer
                </span>
              </div>
          </div>
          <div className="col-3">
          <Popover
            content={content}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            arrowPointAtCenter={true}
            placement="bottomLeft"
          >
            {ArrowDownIcon}
          </Popover>


          </div>

        </div>
      </div>
  );
}
