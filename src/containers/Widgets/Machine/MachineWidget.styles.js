import styled from "styled-components";
import { borderRadius } from "../../../library/helpers/style_utils";
import { colorStatus, fontColor } from "./Machine.config";

const MachineWidgetWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 260px;
  overflow: hidden;
  ${borderRadius("5px")};
  color: ${fontColor};
  background-color: #fff;
  box-shadow: 0px 0px 35px -11px rgba(128,128,128,1);

  .isoIconWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    flex-shrink: 0;
    background-color: rgba(0, 0, 0, 0.1);

    i {
      font-size: 30px;
    }
  }

  .isoContentWrapper {
    width: 100%;
    padding: 10px 15px 10px 10px;
    display: flex;
    flex-direction: column;

    .isoTitle {
      display: flex;
      flex-direction: column;
      color: ${fontColor};
      font-size: 18px;
      font-weight: 800;
      line-height: 1.1;
      margin: 0 0 5px;
    }
  }

  .isoSubTitleWrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .isoCode {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.1;
      margin: 0 0 5px;
    }
    .isoDate {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.1;
      opacity: 0.7;
      margin: 0 0 5px;
    }
  }
`;

const MachineModalWrapper = styled.div`
    width: 100%;
    height: 350px;
    position: relative;

    .backgroundMachine {
      with: 100%;
      height: 200px;
      background-image: url('https://img.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg?size=626&ext=jpg');
      display: flex;
      align-items: flex-end;
      
      .infoMachine {
        padding: 5px 10px;
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.493);
        color: #fff;

        .nameMachine {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }

    .detail-info {
      padding: 10px;
      color: #8c8c8c;
    }

    .footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      justify-content: space-between;
      padding: 5px 10px;
      background-color: #f0f0f0;
      color: #262626;
      display: flex;
      align-items: center;
    }
`;

const Status = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    background-color: ${(props) => {
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
`;

const MachineStatus = styled.div`
  position: relative;
  width: 100%;
  padding: 5px 10px;
  background-color: ${(props) => {
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

  .nameMachine {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .codeMachine {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LabelProgress = styled.div`
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
`;
export { MachineWidgetWrapper, MachineModalWrapper, MachineStatus, LabelProgress, Status };
