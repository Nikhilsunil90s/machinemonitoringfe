import styled from "styled-components";
import BoxComponent from "../../../components/utility/box";
import { palette } from "styled-theme";
import WithDirection from "../../../library/helpers/rtl";

const BoxWrapper = styled(BoxComponent)`
  margin: 2px;
  .isoSettingTableBtn {
    display: flex;
    margin-bottom: 20px;
    a {
      margin-left: auto;
    }
  }
  h1 {
    font-weight: 500;
  }
  .isoPageHeader {
    font-weight: 800;
  }
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
  }
`;

const Box = WithDirection(BoxWrapper);
export { Box };

export default WithDirection(CardWrapper);
