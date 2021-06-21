import styled from "styled-components";
import { palette } from "styled-theme";
import { borderRadius } from "../../../library/helpers/style_utils";

const TopicWidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;
  border: 1px solid ${palette("border", 2)};

  ${borderRadius("5px")};

  .isoWidgetLabel {
    font-size: 18px;
    color: ${palette("text", 0)};
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 5px 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .isoTopicsWidgetBar {
    display: flex;
    flex-direction: column;

    .isoSingleProgressBar {
      margin-bottom: 2px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .isoDescription {
    font-size: 13px;
    color: ${palette("text", 2)};
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
    padding: 15px;
  }

  .isoChartBtn {
    font-size: 24px;
    border: 0.5;
    margin-left: 1em;
    color: ${palette("secondary", 0)};

    &:hover {
      border: 0;
      color: ${palette("primary", 2)};
    }
  }
  .isoTableBtn {
    font-size: 24px;
    border: 0.5;
    margin-right: 1em;
    float: right;
    color: ${palette("secondary", 0)};

    &:hover {
      border: 0;
      color: ${palette("primary", 2)};
    }
  }

  .isoTopicWidgetFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 25px;
    color: ${palette("text", 0)};
    font-weight: 400;
    line-height: 1.2;
    padding: 2px 10px 2px 10px;
    background-color: #fff;
    
  }
`;

export { TopicWidgetWrapper };
