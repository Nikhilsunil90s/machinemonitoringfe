import styled from "styled-components";
import { palette } from "styled-theme";
import WithDirection from "../../../library/helpers/rtl";
import { colorStatus, fontColor } from "../Machine/Machine.config";

const VarTopicDetailWidgetBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

const FromWrap = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid ${palette("border", 2)};

  .isoLabels {
    align-content: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 1;
    color: ${palette("text", 3)};
    width: 95%;
    margin: 0 0 0 1em;
  }
  .isoIndicator {
    line-height: 1.5;
    font-size: 24px;
    font-weight: 600;
  }
  .isoInput {
    font-size: 18px;
    font-weight: 400;
  }
`;

const ProdWidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid ${palette("border", 2)};

  .isorRunTimeLabel {
    align-content: center;
    text-align: center;
    margin-left: 10px;
    h1 {
      font-size: 18px;
      color: ${palette("text", 3)};
      font-weight: 500;
      background-color: ${colorStatus.running};
      color: ${fontColor};
    }
  }
  .isorStopTimeLabel {
    align-content: center;
    text-align: center;
    margin-right: 10px;
    h1 {
      font-size: 20px;
      color: ${palette("text", 3)};
      font-weight: 600;
      background-color: ${colorStatus.stopped};
      color: ${fontColor};
    }
  }

  .isoProdRatioCircleProgress {
    text-align: center;
    align-content: center;
    h1 {
      font-size: 24px;
      color: ${palette("text", 3)};
      font-weight: 300;
      background-color: blue;
    }
  }
  .isoProdOEEProgress {
    padding: 0 20px 0 10px;
    align-content: center;
    margin: 5px;

    .ant-progress.ant-progress-line {
      .ant-progress-text {
        font-size: 15px;
        font-weight: 600;
        line-height: 1;
        color: ${palette("text", 3)};
      }
    }
  }

  .isoProdCountLabel {
    text-align: center;
    width: 100%;
    margin: 0 0 5px;
    h1 {
      font-size: 24px;
      color: ${palette("text", 3)};
      font-weight: 500;
    }
  }
  .isoScrapCountLabel {
    text-align: center;
    width: 100%;
    margin: 0 0 5px;
    h1 {
      font-size: 24px;
      color: ${palette("text", 3)};
      font-weight: 500;
      color: ${colorStatus.alarm};
    }
  }
  .isoMachineStatusLabel {
    text-align: center;
    align-content: center;
    width: 100%;
    margin: 0 0 5px;
    h1 {
      font-size: 24px;
      color: ${palette("text", 3)};
      font-weight: 500;
      color: ${(props) => {
        switch (props.style.status) {
          case 1:
            return colorStatus.stopped;
          case 2:
            return colorStatus.running;
          case 3:
            return colorStatus.alarm;
          case 4:
            return colorStatus.plannedStop;
          case 9:
            return colorStatus.comError;
          default:
            return colorStatus.default;
        }
      }};
    }
  }
`;

const ErrorWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0;
  margin: 0;

  background-color: #fff;
  overflow: hidden;
  .isoErrorList {
    background-color: red;
    color: white;
  }
  .isoAlarmList {
    background-color: orange;
    color: white;
  }
  .isoWarningList {
    background-color: yellow;
    color: black;
  }
`;

const TopicDetailWidgetBar = WithDirection(VarTopicDetailWidgetBar);
const FormWrapper = WithDirection(FromWrap);
const ErrorWrapper = WithDirection(ErrorWrap);

export { TopicDetailWidgetBar, ProdWidgetWrapper, FormWrapper, ErrorWrapper };
