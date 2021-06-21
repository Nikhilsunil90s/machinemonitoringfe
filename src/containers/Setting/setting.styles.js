import styled from "styled-components";
import { palette } from "styled-theme";
import BoxComponent from "../../components/utility/box";
import WithDirection from "../../library/helpers/rtl";

const BoxWrapper = styled(BoxComponent)`
  .isoSettingTableBtn {
    display: flex;
    margin-bottom: 20px;
    a {
      margin-left: auto;
    }
  }
`;
const FromWrap = styled.div`
  display: block;
  position: relative;
  margin-left: 1.5em;
  margin-right: 1.5em;
`;

const CardWrapper = styled.div`
  width: auto;
  overflow: inherit;
  position: relative;
  .isoSettingTable {
    table {
      tbody {
        tr {
          td {
            .isoSettingBtnView {
              display: flex;
              flex-direction: row;
              > a {
                margin: ${(props) =>
                  props["data-rtl"] === "rtl" ? "0 0 0 15px" : "0 15px 0 0"};
              }
            }
          }
          &:hover {
            .isoSettingBtnView {
              ${"" /* opacity: 1; */};
            }
          }
        }
      }
    }
  }

  .SettingListTable {
    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      &:hover {
        background-color: ${palette("secondary", 1)};
      }
    }

    .SettingViewBtn {
      font-size: 18px;
      margin-right: 12px;
      color: ${palette("text", 3)};

      &:hover {
        color: ${palette("primary", 0)};
      }
    }

    .SettingDltBtn {
      font-size: 18px;
      border: 0;
      color: ${palette("error", 0)};

      &:hover {
        border: 0;
        color: ${palette("error", 2)};
      }
    }
    .SettinConnectBtn {
      font-size: 18px;
      border: 0;
      color: ${palette("warning", 0)};

      &:hover {
        border: 0;
        color: ${palette("primary", 2)};
      }
    }
  }
`;

const Box = WithDirection(BoxWrapper);
export { Box };
const FormWrapper = WithDirection(FromWrap);
export { FormWrapper };
export default WithDirection(CardWrapper);
