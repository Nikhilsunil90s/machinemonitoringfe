import React, { Component } from "react";
import { connect } from "react-redux";
import Actions from "../../redux/themeSwitcher/actions";
import Switcher from "../../components/ThemeSwitcher/ThemeSwitcher";

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Themes from "./config";
import bucketSVG from "../../assets/images/bucket.svg";
import IntlMessages from "../../components/utility/intlMessages";
import ThemeSwitcherStyle from "./ThemeSwitcher.styles";

const { switchActivation, changeTheme } = Actions;

class ThemeSwitcher extends Component {
  render() {
    const {
      isActivated,
      // changeThemes,
      topbarTheme,
      sidebarTheme,
      layoutTheme,
      switchActivation,
      changeTheme,
    } = this.props;

    const styleButton = { background: sidebarTheme.buttonColor };

    return (
      <ThemeSwitcherStyle
        className={isActivated ? "isoThemeSwitcher active" : "isoThemeSwitcher"}
      >
        <div className="componentTitleWrapper" style={styleButton}>
          <h3 className="componentTitle">
            <IntlMessages id="themeSwitcher.settings" />
          </h3>
        </div>

        <div className="SwitcherBlockWrapper">
          {/*<Switcher
            config={Themes.changeThemes}
            changeTheme={changeTheme}
            selectedId={changeThemes.themeName}
          />*/}
          <Switcher
            config={Themes.sidebarTheme}
            changeTheme={changeTheme}
            selectedId={sidebarTheme.themeName}
          />

          <Switcher
            config={Themes.topbarTheme}
            changeTheme={changeTheme}
            selectedId={topbarTheme.themeName}
          />

          <Switcher
            config={Themes.layoutTheme}
            changeTheme={changeTheme}
            selectedId={layoutTheme.themeName}
          />
          <LanguageSwitcher />
        </div>

        <button
          type="primary"
          className="switcherToggleBtn"
          style={styleButton}
          onClick={() => {
            switchActivation();
          }}
        >
          <img src={bucketSVG} alt="bucket" />
        </button>
      </ThemeSwitcherStyle>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.ThemeSwitcher,
    LanguageSwitcher: state.LanguageSwitcher,
  };
}
export default connect(mapStateToProps, {
  switchActivation,
  changeTheme,
})(ThemeSwitcher);
